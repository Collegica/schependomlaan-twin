import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stateOf, colours, addDays, daysBetween, activeTasks } from '../src/timeline.js';

const twin = JSON.parse(readFileSync(new URL('../model/twin.json', import.meta.url)));
const meta = JSON.parse(readFileSync(new URL('../model/model.json', import.meta.url)));

test('dates: whole days in UTC, both ways', () => {
  assert.equal(addDays('2015-02-26', 3), '2015-03-01');
  assert.equal(addDays('2015-03-29', 1), '2015-03-30', 'across the clock change');
  assert.equal(daysBetween('2015-02-26', '2015-10-15'), 231);
});

test('the twin and the geometry describe the same elements, in the same order', () => {
  assert.equal(twin.elements.length, meta.elements.length);
  assert.equal(twin.elements.length, 3505);
  const tasks = twin.elements.filter(e => e.t.length).length;
  assert.equal(tasks, 2358, 'elements linked to the schedule');
});

test('each element passes waiting → active → done or late, never back', () => {
  const order = { waiting: 0, active: 1, done: 2, late: 2 };
  for (const e of twin.elements.filter(e => e.t.length)) {
    let last = -1;
    for (let d = addDays(twin.range.start, -1); d <= addDays(twin.range.finish, 1); d = addDays(d, 7)) {
      const s = stateOf(e, twin.tasks, d);
      if (s === 'active') continue;          // an element can wait between two of its tasks
      assert.ok(order[s] >= Math.min(last, 2) || last === 1, `${s} after ${last}`);
      last = Math.max(last, order[s]);
    }
  }
});

test('at the end, everything scheduled is finished, and the late count matches the as-built check', () => {
  const { counts } = colours(twin, addDays(twin.range.finish, 1));
  assert.equal(counts.waiting + counts.active, 0);
  assert.equal(counts.late, 119);
  assert.equal(counts.done + counts.late, 2358);
});

test('before the first task nothing is built; on 1 June 2015 the build is under way', () => {
  const before = colours(twin, addDays(twin.range.start, -1)).counts;
  assert.equal(before.done + before.late + before.active, 0);
  const june = colours(twin, '2015-06-01').counts;
  assert.ok(june.done > 0 && june.waiting > 0);
  assert.ok(activeTasks(twin, '2015-06-01').length > 0);
});

test('focusing on a task hides everything else', () => {
  const i = twin.tasks.findIndex(t => t.id === 'ST01060');
  const { rgba } = colours(twin, addDays(twin.tasks[i].finish, 1), { focus: i });
  twin.elements.forEach((e, k) => {
    const opaque = rgba[k * 4 + 3] === 255;
    assert.equal(opaque, e.t.some(([t]) => t === i));
  });
});
