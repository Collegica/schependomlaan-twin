// Schependomlaan Twin: replay the 2015 build of a real Dutch housing project,
// element by element. The building is the contractor's as-planned model; each
// element is coloured by the schedule (waiting, under way, finished) and by the
// as-built check (on time or late). Everything loads from this app's folder.

import { CollegicaApp, baseStyles } from './collegica.js';
import { Viewer } from './viewer.js';
import { STATES, COLOURS, colours, activeTasks, addDays, daysBetween } from './timeline.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LABEL = {
  none: 'Not in the schedule', waiting: 'Not started', active: 'Under way',
  done: 'Finished on time', late: 'Finished, flagged late',
};
const longDate = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-CA',
  { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const isoWeek = iso => {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((d - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
};
const short = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-CA', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const span = t => t.start === t.finish ? short(t.start) : `${short(t.start)} – ${short(t.finish)}`;
const swatch = s => `rgb(${COLOURS[s].slice(0, 3).join(',')})`;

class SchependomlaanTwin extends CollegicaApp {
  async render() {
    this.root.innerHTML = `
      <style>
        ${baseStyles}
        :host { --line: var(--cg-line, #E2E5EE); }
        .stage { position: relative; border: 1px solid var(--line); background: #F9F8F5; }
        canvas { display: block; width: 100%; height: min(68vh, 34rem); cursor: grab; }
        canvas:active { cursor: grabbing; }
        .views { position: absolute; top: .5rem; right: .5rem; display: flex; gap: .25rem; }
        .views button { padding: .25rem .55rem; font-size: .8rem; background: rgba(251,250,247,.9); }
        .status { position: absolute; left: .75rem; bottom: .5rem; font-size: .8rem; color: #4C5782; }
        .bar { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin: .75rem 0 .25rem; }
        .bar input[type=range] { flex: 1 1 16rem; accent-color: var(--cg-accent, #C97B1E); }
        .date { font-weight: 600; }
        .under { font-size: .88rem; min-height: 1.4em; }
        .legend { display: flex; flex-wrap: wrap; gap: .4rem 1rem; font-size: .85rem; margin: .5rem 0 1rem; padding: 0; list-style: none; }
        .legend i { display: inline-block; width: .8rem; height: .8rem; margin-right: .35rem; vertical-align: -1px; border: 1px solid rgba(0,0,0,.15); }
        .cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); gap: 1rem; }
        .panel { border: 1px solid var(--line); padding: .75rem .9rem; font-size: .9rem; min-width: 0; }
        .panel h3 { font-size: 1.05rem; margin-bottom: .4rem; }
        .panel table { border-collapse: collapse; width: 100%; font-size: .85rem; }
        .panel td, .panel th { text-align: left; padding: .25rem .3rem; border-bottom: 1px solid var(--line); vertical-align: top; }
        .late-list button { display: flex; width: 100%; justify-content: space-between; gap: .5rem; text-align: left;
          padding: .35rem .5rem; margin: 0 0 .3rem; font-weight: 400; font-size: .85rem; }
        .late-list button[aria-pressed=true] { background: #F6E3DE; color: #1E2333; border-color: rgb(181,68,47); }
        .tag { font-variant-numeric: tabular-nums; font-weight: 600; color: rgb(181,68,47); }
        .fine { font-size: .8rem; }
        .when { white-space: nowrap; }
      </style>
      <h2>Schependomlaan Twin</h2>
      <p class="muted">A real housing project in Nijmegen, built in 2015, replayed day by day. The building is the
      contractor's planned model; every element is coloured by the schedule and by whether the as-built check found
      it on time. Drag to turn it, scroll or pinch to zoom, click an element for its story.</p>
      <div class="stage">
        <canvas aria-label="3D model of the Schependomlaan building, coloured by construction progress"></canvas>
        <div class="views" role="group" aria-label="Views">
          <button type="button" data-view="iso">3D</button>
          <button type="button" data-view="front">Front</button>
          <button type="button" data-view="top">Top</button>
          <button type="button" data-zoom="0.8" aria-label="Zoom in">+</button>
          <button type="button" data-zoom="1.25" aria-label="Zoom out">−</button>
        </div>
        <div class="status" aria-live="polite">Loading the model…</div>
      </div>
      <div class="bar">
        <button type="button" class="primary" data-play>Play</button>
        <input type="range" min="0" value="0" step="1" aria-label="Day of the build">
        <span class="date"></span>
      </div>
      <div class="under muted"></div>
      <ul class="legend"></ul>
      <div class="cols">
        <section class="panel detail"><h3>Element</h3><p class="muted">Click an element in the model.</p></section>
        <section class="panel">
          <h3>Where it ran late</h3>
          <p class="muted fine">Tasks whose elements the as-built check flagged late. Click one to show its elements.</p>
          <div class="late-list"></div>
        </section>
      </div>
      <p class="muted fine">Data: the Schependomlaan dataset (TU Eindhoven, Stijn van Schaijk, with Hendriks Bouw en
      Ontwikkeling, ROOT, TNO and RAAMAC), from buildingSMART's
      <a href="https://github.com/buildingsmart-community/Community-Sample-Test-Files">Community Sample Test Files</a>,
      under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>; converted, linked and translated from
      Dutch by Collegica. The model shows planned dates; the dataset records whether
      work was late, not by how much.</p>`;

    const $ = s => this.root.querySelector(s);
    this.status = $('.status');
    try {
      const base = new URL('../model/', import.meta.url);
      const [meta, twin, bin] = await Promise.all([
        fetch(new URL('model.json', base)).then(r => r.json()),
        fetch(new URL('twin.json', base)).then(r => r.json()),
        fetch(new URL('model.bin', base)).then(r => r.arrayBuffer()),
      ]);
      this.twin = twin;
      this.viewer = new Viewer($('canvas'), meta, bin);
    } catch (err) {
      this.status.textContent = `Couldn't show the model: ${err.message}`;
      return;
    }
    this.status.textContent = '';
    this.focus = -1;
    this.selected = -1;

    const { start, finish } = this.twin.range;
    this.first = addDays(start, -3);
    const slider = $('input[type=range]');
    slider.max = daysBetween(this.first, addDays(finish, 3));
    slider.value = daysBetween(this.first, '2015-06-01');
    slider.addEventListener('input', () => { this.stop(); this.update(); });
    this.slider = slider;

    $('[data-play]').addEventListener('click', () => this.timer ? this.stop() : this.play());
    $('.views').addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.zoom) this.viewer.zoom(Number(b.dataset.zoom));
      const v = { iso: [-0.8, 0.45], front: [0, 0.05], top: [0, 1.5] }[b.dataset.view];
      if (v) this.viewer.view(...v);
    });
    $('canvas').addEventListener('pick', e => { this.selected = e.detail; this.update(); this.showDetail(); });
    this.renderLateList();
    this.update();
  }

  get day() { return addDays(this.first, Number(this.slider.value)); }

  play() {
    if (Number(this.slider.value) >= Number(this.slider.max)) this.slider.value = 0;
    this.root.querySelector('[data-play]').textContent = 'Pause';
    this.timer = setInterval(() => {
      this.slider.value = Number(this.slider.value) + 1;
      this.update();
      if (Number(this.slider.value) >= Number(this.slider.max)) this.stop();
    }, 70);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = 0;
    const b = this.root.querySelector('[data-play]');
    if (b) b.textContent = 'Play';
  }

  update() {
    const day = this.day;
    const { rgba, counts } = colours(this.twin, day, { focus: this.focus, selected: this.selected });
    this.viewer.setColours(rgba);
    this.root.querySelector('.date').textContent = `${longDate(day)} · week ${isoWeek(day)}`;
    const now = activeTasks(this.twin, day);
    this.root.querySelector('.under').textContent = now.length
      ? `Under way: ${now.map(t => t.en).join('; ')}`
      : 'No scheduled work on the model this day.';
    this.root.querySelector('.legend').innerHTML = STATES.map(s =>
      `<li><i style="background:${swatch(s)};opacity:${s === 'none' || s === 'waiting' ? .35 : 1}"></i>${LABEL[s]}: <b>${counts[s].toLocaleString('en-CA')}</b></li>`).join('');
  }

  showDetail() {
    const box = this.root.querySelector('.detail');
    const e = this.twin.elements[this.selected];
    if (!e) {
      box.innerHTML = '<h3>Element</h3><p class="muted">Click an element in the model.</p>';
      return;
    }
    const code = this.twin.codes[e.s];
    const rows = e.t.map(([i, flag]) => {
      const t = this.twin.tasks[i];
      const st = flag === 1 ? '<span class="tag">late</span>' : flag === 0 ? 'on time' : '';
      return `<tr><td>${esc(t.en)}<br><span class="muted fine">${esc(t.nl)}</span></td><td class="when">${span(t)}</td><td>${st}</td></tr>`;
    }).join('');
    box.innerHTML = `<h3>${esc(this.twin.classes[e.c] || 'Element')}</h3>
      <p>${code ? `${esc(e.s)} ${esc(code.en)} <span class="muted fine">(${esc(code.nl)})</span>` : esc(e.s)}<br>
      <span class="muted fine">Material: ${esc(e.m) || '—'}</span></p>
      ${rows ? `<table><thead><tr><th>Task</th><th>Planned</th><th>As built</th></tr></thead><tbody>${rows}</tbody></table>`
        : '<p class="muted">No task in the schedule is linked to this element.</p>'}`;
  }

  renderLateList() {
    const late = new Map();
    for (const e of this.twin.elements) for (const [i, flag] of e.t) if (flag === 1) late.set(i, (late.get(i) || 0) + 1);
    const list = [...late].sort((a, b) => b[1] - a[1]);
    const box = this.root.querySelector('.late-list');
    box.innerHTML = list.map(([i, n]) => {
      const t = this.twin.tasks[i];
      return `<button type="button" data-task="${i}" aria-pressed="false"><span>${esc(t.en)}<br>
        <span class="muted fine">${span(t)} 2015</span></span><span class="tag">${n}</span></button>`;
    }).join('');
    box.addEventListener('click', ev => {
      const b = ev.target.closest('button[data-task]');
      if (!b) return;
      const i = Number(b.dataset.task);
      this.focus = this.focus === i ? -1 : i;
      box.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(Number(x.dataset.task) === this.focus)));
      if (this.focus >= 0) this.slider.value = daysBetween(this.first, addDays(this.twin.tasks[i].finish, 1));
      this.stop();
      this.update();
    });
  }
}

customElements.define('schependomlaan-twin', SchependomlaanTwin);
