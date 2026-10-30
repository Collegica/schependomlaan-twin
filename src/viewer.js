// A small WebGL2 viewer for one building: model/model.bin drawn in a single
// call, each element's colour and opacity read from a texture the app updates,
// flat shading from screen-space derivatives, an orbit camera, and picking by
// rendering element ids to an offscreen buffer. No dependencies.

const VS = `#version 300 es
in vec3 a_pos;
in uint a_elem;
uniform vec3 u_scale, u_offset;
uniform mat4 u_viewProj;
flat out uint v_elem;
out vec3 v_world;
void main() {
  vec3 p = a_pos * u_scale + u_offset;
  v_world = p;
  v_elem = a_elem;
  gl_Position = u_viewProj * vec4(p, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
flat in uint v_elem;
in vec3 v_world;
uniform sampler2D u_colours;
uniform int u_pass;          // 0 opaque, 1 translucent, 2 pick
uniform vec3 u_light;
out vec4 o;
void main() {
  int i = int(v_elem);
  vec4 c = texelFetch(u_colours, ivec2(i % 64, i / 64), 0);
  if (c.a == 0.0) discard;
  if (u_pass == 2) {
    if (c.a < 0.5) discard;   // ghosts can't be picked
    int id = i + 1;
    o = vec4(float(id & 255), float((id >> 8) & 255), float((id >> 16) & 255), 255.0) / 255.0;
    return;
  }
  bool opaque = c.a > 0.99;
  if ((u_pass == 0) != opaque) discard;
  vec3 n = normalize(cross(dFdx(v_world), dFdy(v_world)));
  float d = abs(dot(n, u_light));
  float shade = 0.55 + 0.45 * d;
  o = vec4(c.rgb * shade, c.a);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

const mul = (a, b) => {
  const o = new Float32Array(16);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
};

function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(eye, target, up) {
  const z = norm(sub(eye, target)), x = norm(cross(up, z)), y = cross(z, x);
  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]);
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

export class Viewer {
  constructor(canvas, meta, buffer) {
    this.canvas = canvas;
    this.meta = meta;
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false, preserveDrawingBuffer: true });
    if (!gl) throw new Error('This browser has no WebGL2.');
    this.gl = gl;
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    this.program = p;
    this.u = Object.fromEntries(['u_scale', 'u_offset', 'u_viewProj', 'u_colours', 'u_pass', 'u_light']
      .map(n => [n, gl.getUniformLocation(p, n)]));

    const L = meta.layout;
    const pos = new Int16Array(buffer, L.position.offset, L.position.count);
    const elem = new Uint16Array(buffer, L.element.offset, L.element.count);
    const idx = new Uint32Array(buffer, L.index.offset, L.index.count);
    this.count = idx.length;
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    const attr = (name, data, size, type, integer) => {
      const loc = gl.getAttribLocation(p, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      if (integer) gl.vertexAttribIPointer(loc, size, type, 0, 0);
      else gl.vertexAttribPointer(loc, size, type, false, 0, 0);
    };
    attr('a_pos', pos, 3, gl.SHORT, false);
    attr('a_elem', elem, 1, gl.UNSIGNED_SHORT, true);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

    const n = meta.elements.length;
    this.rows = Math.ceil(n / 64);
    this.colours = new Uint8Array(64 * this.rows * 4);
    this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, 64, this.rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.colours);

    // Orbit camera around the model's centre.
    const c = [0, 1, 2].map(i => (meta.min[i] + meta.max[i]) / 2);
    this.radius = Math.hypot(...[0, 1, 2].map(i => meta.max[i] - meta.min[i])) / 2;
    this.cam = { target: c, yaw: -0.8, pitch: 0.45, dist: this.radius * 2.4 };
    this.#controls();
    new ResizeObserver(() => this.draw()).observe(canvas);
  }

  /** colours: Uint8Array, 4 bytes per element (alpha 0 hides, below 255 is translucent). */
  setColours(rgba) {
    this.colours.set(rgba);
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 64, this.rows, gl.RGBA, gl.UNSIGNED_BYTE, this.colours);
    this.draw();
  }

  #matrices() {
    const { target, yaw, pitch, dist } = this.cam;
    const eye = [target[0] + dist * Math.cos(pitch) * Math.sin(yaw), target[1] + dist * Math.sin(pitch),
      target[2] + dist * Math.cos(pitch) * Math.cos(yaw)];
    const w = this.canvas.clientWidth || 1, h = this.canvas.clientHeight || 1;
    this.light = norm(sub(eye, target));
    // Keep the same horizontal view on a tall, narrow screen.
    const fovy = w >= h ? 0.8 : 2 * Math.atan(Math.tan(0.4) * h / w);
    return mul(perspective(fovy, w / h, this.radius / 100, this.radius * 20), lookAt(eye, target, [0, 1, 0]));
  }

  #pass(pass, viewProj) {
    const gl = this.gl;
    gl.uniform1i(this.u.u_pass, pass);
    gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_INT, 0);
  }

  #setup(viewProj) {
    const gl = this.gl, m = this.meta;
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);
    gl.uniform3fv(this.u.u_scale, m.scale);
    gl.uniform3fv(this.u.u_offset, m.offset);
    gl.uniformMatrix4fv(this.u.u_viewProj, false, viewProj);
    gl.uniform3fv(this.u.u_light, norm([0.4, 0.8, 0.3]));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.uniform1i(this.u.u_colours, 0);
  }

  draw() {
    if (this.pending) return;
    this.pending = requestAnimationFrame(() => {
      this.pending = 0;
      const gl = this.gl, c = this.canvas, dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      gl.viewport(0, 0, w, h);
      const bg = this.background || [0.98, 0.98, 0.97];
      gl.clearColor(bg[0], bg[1], bg[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const vp = this.#matrices();
      this.#setup(vp);
      gl.enable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.depthMask(true);
      this.#pass(0, vp);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
      gl.depthMask(false);
      this.#pass(1, vp);
      gl.depthMask(true);
    });
  }

  /** The element under a point in CSS pixels, or -1. */
  pick(x, y) {
    const gl = this.gl, c = this.canvas, dpr = c.width / (c.clientWidth || 1);
    if (!this.fbo) {
      this.fbo = gl.createFramebuffer();
      this.fboColour = gl.createRenderbuffer();
      this.fboDepth = gl.createRenderbuffer();
    }
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.fboColour);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA8, c.width, c.height);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.fboDepth);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, c.width, c.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.fboColour);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.fboDepth);
    gl.viewport(0, 0, c.width, c.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const vp = this.#matrices();
    this.#setup(vp);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    this.#pass(2, vp);
    const px = new Uint8Array(4);
    gl.readPixels(Math.round(x * dpr), Math.round(c.height - y * dpr), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.draw();
    return (px[0] | (px[1] << 8) | (px[2] << 16)) - 1;
  }

  #controls() {
    const c = this.canvas, pointers = new Map();
    let moved = 0, pinch = 0;
    c.style.touchAction = 'none';
    c.addEventListener('pointerdown', e => {
      c.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      moved = 0;
      if (pointers.size === 2) pinch = this.#spread(pointers);
    });
    c.addEventListener('pointermove', e => {
      const last = pointers.get(e.pointerId);
      if (!last) return;
      const dx = e.clientX - last[0], dy = e.clientY - last[1];
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      moved += Math.abs(dx) + Math.abs(dy);
      if (pointers.size === 2) {
        const s = this.#spread(pointers);
        if (pinch) this.zoom(pinch / s);
        pinch = s;
      } else if (e.shiftKey || e.buttons === 2) {
        this.#pan(dx, dy);
      } else {
        this.cam.yaw -= dx * 0.006;
        this.cam.pitch = Math.max(-0.2, Math.min(1.5, this.cam.pitch + dy * 0.006));
        this.draw();
      }
    });
    const up = e => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = 0;
      if (moved < 4 && e.type === 'pointerup') {
        const r = c.getBoundingClientRect();
        c.dispatchEvent(new CustomEvent('pick', { detail: this.pick(e.clientX - r.left, e.clientY - r.top) }));
      }
    };
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
    c.addEventListener('contextmenu', e => e.preventDefault());
    c.addEventListener('wheel', e => { e.preventDefault(); this.zoom(Math.exp(e.deltaY * 0.001)); }, { passive: false });
  }

  #spread(pointers) {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
  }

  #pan(dx, dy) {
    const { yaw } = this.cam, k = this.cam.dist * 0.0015;
    const right = [Math.cos(yaw), 0, -Math.sin(yaw)];
    this.cam.target = [this.cam.target[0] - right[0] * dx * k, this.cam.target[1] + dy * k, this.cam.target[2] - right[2] * dx * k];
    this.draw();
  }

  zoom(f) {
    this.cam.dist = Math.max(this.radius * 0.2, Math.min(this.radius * 8, this.cam.dist * f));
    this.draw();
  }

  view(yaw, pitch) {
    Object.assign(this.cam, { yaw, pitch });
    this.draw();
  }
}
