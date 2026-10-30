// What each element looks like on a given day of the 2015 build. Pure
// functions over model/twin.json, so the tests can check them without a browser.
//
// An element's state on day D, from the tasks that built it (planned dates):
//   none      no task in the schedule touches it (shown as a faint ghost)
//   waiting   its first task hasn't started (ghost)
//   active    one of its tasks is under way on D
//   done      its tasks so far are finished and the as-built check found them on time
//   late      the as-built check flagged one of its finished tasks as late
// The dataset says *whether* an element went in late, not by how much, so
// "late" colours an element once its planned work is done.

export const STATES = ['none', 'waiting', 'active', 'done', 'late'];

export const COLOURS = {
  none: [110, 118, 140, 10],
  waiting: [110, 118, 140, 14],
  active: [201, 123, 30, 255],
  done: [62, 124, 120, 255],
  late: [181, 68, 47, 255],
};

/** 'YYYY-MM-DD' plus n days. */
export function addDays(iso, n) {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a, b) {
  return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000);
}

export function stateOf(element, tasks, day) {
  const ts = element.t;
  if (!ts.length) return 'none';
  if (day < tasks[ts[0][0]].start) return 'waiting';
  let late = false;
  for (const [i, flag] of ts) {
    const t = tasks[i];
    if (t.start <= day && day <= t.finish) return 'active';
    if (t.finish < day && flag === 1) late = true;
  }
  return late ? 'late' : 'done';
}

/** RGBA bytes for every element on `day`; `focus` (a task index) dims everything else. */
export function colours(twin, day, { focus = -1, selected = -1 } = {}) {
  const out = new Uint8Array(twin.elements.length * 4);
  const counts = Object.fromEntries(STATES.map(s => [s, 0]));
  twin.elements.forEach((e, i) => {
    if (e.s === '0000') { out.set([0, 0, 0, 0], i * 4); return; }   // the survey datum, not a part of the building
    const s = stateOf(e, twin.tasks, day);
    counts[s]++;
    let c = COLOURS[s];
    if (focus >= 0) {
      const inTask = e.t.some(([k]) => k === focus);
      c = inTask ? COLOURS[s === 'waiting' || s === 'none' ? 'active' : s] : [110, 118, 140, 10];
    }
    if (i === selected) c = [58, 67, 102, 255];
    out.set(c, i * 4);
  });
  return { rgba: out, counts };
}

/** Tasks under way on `day`, for the caption under the model. */
export function activeTasks(twin, day) {
  return twin.tasks.filter(t => t.start <= day && day <= t.finish);
}
