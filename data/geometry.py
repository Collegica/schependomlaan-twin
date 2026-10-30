"""Pack the building's geometry for the web viewer.

    python3 data/geometry.py path/to/schependomlaan-planned.glb

Input: the as-planned IFC model converted to glTF by IfcOpenShell's IfcConvert
(`IfcConvert --use-element-guids -j 8 "IFC Schependomlaan incl planningsdata.ifc"
schependomlaan-planned.glb`), one node per element, named by its IFC GUID.

Output, in model/ (served with the app, read by src/viewer.js):

  model.bin   one buffer: positions (int16 x3, quantised over the bounding box),
              element index per vertex (uint16), triangle indices (uint32)
  model.json  the layout of model.bin, the quantisation, and per element its
              GUID, original colour and index range

Node transforms are baked in, so the viewer draws everything in one call.
Standard library only.
"""
from __future__ import annotations

import json
import struct
import sys
from array import array
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "model"
COMPONENT = {5126: ("f", 4), 5125: ("I", 4), 5123: ("H", 2), 5121: ("B", 1)}


def read_glb(path: Path) -> tuple[dict, bytes]:
    data = path.read_bytes()
    magic, version, _ = struct.unpack_from("<III", data, 0)
    assert magic == 0x46546C67 and version == 2, "not a glTF 2 binary"
    offset, gltf, binary = 12, None, b""
    while offset < len(data):
        length, kind = struct.unpack_from("<II", data, offset)
        chunk = data[offset + 8: offset + 8 + length]
        if kind == 0x4E4F534A:
            gltf = json.loads(chunk)
        elif kind == 0x004E4942:
            binary = chunk
        offset += 8 + length
    return gltf, binary


def accessor(gltf: dict, binary: bytes, i: int) -> list:
    a = gltf["accessors"][i]
    view = gltf["bufferViews"][a["bufferView"]]
    fmt, size = COMPONENT[a["componentType"]]
    n = {"SCALAR": 1, "VEC3": 3}[a["type"]]
    start = view.get("byteOffset", 0) + a.get("byteOffset", 0)
    stride = view.get("byteStride", size * n)
    if stride == size * n:
        return list(struct.unpack_from(f"<{a['count'] * n}{fmt}", binary, start))
    out = []
    for k in range(a["count"]):
        out.extend(struct.unpack_from(f"<{n}{fmt}", binary, start + k * stride))
    return out


def transform(m: list[float], x: float, y: float, z: float) -> tuple[float, float, float]:
    # glTF matrices are column-major
    return (m[0] * x + m[4] * y + m[8] * z + m[12],
            m[1] * x + m[5] * y + m[9] * z + m[13],
            m[2] * x + m[6] * y + m[10] * z + m[14])


def main(glb: Path) -> None:
    gltf, binary = read_glb(glb)
    identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    materials = [m.get("pbrMetallicRoughness", {}).get("baseColorFactor", [0.8, 0.8, 0.8, 1])
                 for m in gltf.get("materials", [])]

    world: list[float] = []          # float positions, quantised once the box is known
    elem_of_vertex = array("H")
    indices = array("I")
    elements = []
    for e, node in enumerate(gltf["nodes"]):
        m = node.get("matrix", identity)
        first_index = len(indices)
        colour = None
        for prim in gltf["meshes"][node["mesh"]]["primitives"]:
            base = len(world) // 3
            pos = accessor(gltf, binary, prim["attributes"]["POSITION"])
            for k in range(0, len(pos), 3):
                world.extend(transform(m, pos[k], pos[k + 1], pos[k + 2]))
            elem_of_vertex.extend([e] * (len(pos) // 3))
            indices.extend(base + i for i in accessor(gltf, binary, prim["indices"]))
            if colour is None and "material" in prim:
                colour = materials[prim["material"]]
        rgba = colour or [0.8, 0.8, 0.8, 1]
        elements.append({"guid": node["name"], "first": first_index,
                         "count": len(indices) - first_index,
                         "rgba": [round(c, 3) for c in rgba]})

    lo = [min(world[i::3]) for i in range(3)]
    hi = [max(world[i::3]) for i in range(3)]
    scale = [(hi[i] - lo[i]) / 65534 or 1 for i in range(3)]
    q = array("h", (round((world[k] - lo[k % 3]) / scale[k % 3]) - 32767 for k in range(len(world))))

    OUT.mkdir(exist_ok=True)
    with (OUT / "model.bin").open("wb") as f:
        layout = {}
        for name, arr in (("position", q), ("element", elem_of_vertex), ("index", indices)):
            pad = (-f.tell()) % 4          # keep each typed array 4-byte aligned
            f.write(b"\0" * pad)
            layout[name] = {"offset": f.tell(), "count": len(arr), "type": arr.typecode}
            f.write(arr.tobytes())         # little-endian on every machine we build on
    assert sys.byteorder == "little"
    meta = {
        "source": glb.name, "up": "y", "units": "m",
        "min": [round(v, 4) for v in lo], "max": [round(v, 4) for v in hi],
        "scale": scale, "offset": [lo[i] + 32767 * scale[i] for i in range(3)],
        "layout": layout, "vertices": len(elem_of_vertex), "triangles": len(indices) // 3,
        "elements": elements,
    }
    (OUT / "model.json").write_text(json.dumps(meta, separators=(",", ":")) + "\n")
    print(f"{len(elements)} elements, {meta['vertices']} vertices, {meta['triangles']} triangles, "
          f"{(OUT / 'model.bin').stat().st_size / 1e6:.1f} MB; box {meta['min']} to {meta['max']}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
