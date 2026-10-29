// Samuel Ayinla portfolio

// Play Store links. Leave empty to hide the button on that project.
const STORE = {
  voicebox: "https://play.google.com/store/apps/details?id=com.moodifyvoicebox.app",
  paperclip: "https://play.google.com/store/apps/details?id=com.moodifypaperclip.app",
};

// Timeline data. end: null means it's still running today.
// label is the callout next to the bar; progress adds a small meter to it.
const WORK = [
  { id: "koktailz", name: "Koktailz", sub: "Product manager", start: "2021-08-01", end: "2023-12-31", kind: "done",
    label: "Shipped Clink",
    when: "Aug 2021 to Dec 2023, full time",
    body: "Led a remote team and took Clink, a location based discovery feature, from first research to release." },
  { id: "moodify", name: "Moodify", sub: "Technical PM", start: "2023-03-01", end: "2026-02-28", kind: "done",
    label: "Six consumer apps",
    when: "Mar 2023 to Feb 2026",
    body: "Technical project manager and product manager. Ran delivery across six consumer utility apps with internal developers and an outside technology partner." },
  { id: "sdk", name: "MoodifySDK", sub: "Built and integrated", start: "2025-12-01", end: "2026-10-25", kind: "hand",
    label: "Handed to client",
    when: "Dec 2025 to Oct 2026",
    body: "The after call SDK I proposed and built when Moodify's ad partnership ended. Built for VoiceBox, PaperClip and Shuffl, now owned by the client.",
    go: "#case", goLabel: "Read the case study" },
  { id: "circle", name: "Circle", sub: "Own product", start: "2026-07-29", end: null, kind: "hold",
    label: "On hold",
    when: "Started Jul 2026, on hold",
    body: "An app that lets founders hand routine messages to an AI. Telegram integration, schema and onboarding are built.",
    go: "#p-circle", goLabel: "See the project" },
  { id: "outsyde", name: "Outsyde", sub: "Own product", start: "2026-08-29", end: null, kind: "build",
    label: "90% built", progress: 0.9,
    when: "Started Aug 2026, about 90% done",
    body: "A hyperlocal discovery app for Osogbo, starting with events, hangouts and places to go.",
    go: "#p-outsyde", goLabel: "See the project" },
  { id: "smokecity", name: "Smoke City", sub: "Client build", start: "2026-10-22", end: null, kind: "done",
    label: "Ready to launch",
    when: "Started Oct 2026, ready to launch",
    body: "A full rebuild of an online store for a Nigerian retailer, with Paystack checkout and an owner only staff area.",
    go: "#p-smokecity", goLabel: "See the project" },
];
const DEFAULT = "sdk";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const today = new Date();

// Scale: earlier years share the left part, the current year is zoomed in on the right.
const START = new Date(2021, 0, 1);
const LAST_YEAR = Math.max(2026, today.getFullYear());
const ZOOM_START = new Date(LAST_YEAR, 0, 1);
const END = new Date(LAST_YEAR + 1, 0, 1);
const ZOOM_SHARE = 0.42;
const SPLIT = 1 - ZOOM_SHARE;
function x(d) {
  const t = d.getTime();
  if (t < ZOOM_START) return ((t - START) / (ZOOM_START - START)) * SPLIT;
  return SPLIT + Math.min(1, (t - ZOOM_START) / (END - ZOOM_START)) * ZOOM_SHARE;
}
function dateAt(f) {
  f = Math.max(0, Math.min(1, f));
  if (f < SPLIT) return new Date(+START + (f / SPLIT) * (ZOOM_START - START));
  return new Date(+ZOOM_START + ((f - SPLIT) / ZOOM_SHARE) * (END - ZOOM_START));
}
const pc = v => (v * 100).toFixed(3) + "%";
const day = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const span = w => [day(w.start), w.end ? day(w.end) : today];
const TODAY_X = x(today);

let introDone = false;

function laneBackground() {
  let h = "";
  for (let y = 2022; y <= LAST_YEAR; y++) {
    h += `<i class="gridline${y === LAST_YEAR ? " zoom" : ""}" style="left:${pc(x(new Date(y, 0, 1)))}"></i>`;
  }
  h += `<i class="zoomband" style="left:${pc(x(ZOOM_START))}"></i>`;
  h += `<i class="today" style="left:${pc(TODAY_X)}"></i><i class="scrub"></i>`;
  return h;
}

function buildChart() {
  const chart = document.getElementById("chart");
  let html = "";
  WORK.forEach(w => {
    const [s, e] = span(w);
    const left = x(s), width = Math.max(0, x(e) - left);
    const meter = w.progress ? `<span class="meter" aria-hidden="true"><span style="width:${w.progress * 100}%"></span></span>` : "";
    html += `<div class="lane-label" data-lane="${w.id}"><div>${w.name}<small>${w.sub}</small></div></div>`;
    html += `<div class="lane" data-lane="${w.id}">${laneBackground()}` +
      `<button type="button" class="bar ${w.kind}" data-id="${w.id}" aria-pressed="false" aria-label="${w.name}, ${w.when}" style="left:${pc(left)};width:${pc(width)}"></button>` +
      `<span class="callout ${w.kind}" data-for="${w.id}" aria-hidden="true">${meter}${w.label}</span></div>`;
  });
  let ax = "";
  for (let y = 2021; y < LAST_YEAR; y++) {
    const mid = x(new Date(y, 6, 1));
    ax += `<span class="${(y - 2021) % 2 || y === LAST_YEAR - 1 ? "mob-hide" : ""}" style="left:${pc(mid)}">${y}</span>`;
  }
  [0, 3, 6, 9].forEach(m => {
    const pos = x(new Date(LAST_YEAR, m, 15));
    ax += `<span class="${m ? (m === 3 ? "mob-hide" : "") : "zy"}" style="left:${pc(pos)}">${m ? MONTHS[m] : MONTHS[m] + " " + LAST_YEAR}</span>`;
  });
  ax += `<span class="now" style="left:${pc(TODAY_X)}"><i class="pulse"></i>Today</span><span class="scrub-date"></span>`;
  html += `<div class="axis" aria-hidden="true">${ax}</div>`;
  chart.innerHTML = html;

  chart.addEventListener("click", ev => {
    const b = ev.target.closest(".bar");
    if (b) select(b.dataset.id, true);
  });
  placeCallouts();
  addScrub(chart);
}

// Each callout sits right after its bar when there's room, otherwise just before it.
function placeCallouts() {
  document.querySelectorAll(".lane").forEach(lane => {
    const bar = lane.querySelector(".bar"), c = lane.querySelector(".callout");
    const lw = lane.clientWidth, gap = 10;
    const bl = bar.offsetLeft, br = bl + Math.max(bar.offsetWidth, 12), cw = c.offsetWidth;
    c.classList.remove("after", "before", "inside");
    if (br + gap + cw <= lw) { c.style.left = (br + gap) + "px"; c.classList.add("after"); }
    else if (bl - gap - cw >= 0) { c.style.left = (bl - gap - cw) + "px"; c.classList.add("before"); }
    else { c.style.left = (bl + 6) + "px"; c.classList.add("inside"); }
  });
}

// Drag or hover across the chart to see what was running at that moment.
function addScrub(chart) {
  const lanes = [...chart.querySelectorAll(".lane")];
  const label = chart.querySelector(".scrub-date");
  let clearTimer;
  function show(clientX) {
    if (!introDone) return;
    const r = lanes[0].getBoundingClientRect();
    const f = (clientX - r.left) / r.width;
    if (f < 0 || f > 1) return hide();
    const d = f > TODAY_X ? today : dateAt(f);
    const fx = Math.min(f, TODAY_X);
    chart.classList.add("scrubbing");
    lanes.forEach(l => {
      const w = WORK.find(v => v.id === l.dataset.lane);
      const [s, e] = span(w);
      const live = d >= s && d <= e;
      l.classList.toggle("live", live);
      chart.querySelector(`.lane-label[data-lane="${w.id}"]`).classList.toggle("live", live);
      l.querySelector(".scrub").style.left = pc(fx);
    });
    label.style.left = pc(fx);
    label.textContent = f > TODAY_X ? "Today" : `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  function hide() {
    chart.classList.remove("scrubbing");
    chart.querySelectorAll(".live").forEach(el => el.classList.remove("live"));
  }
  chart.addEventListener("pointermove", ev => {
    if (ev.pointerType === "mouse" || ev.buttons) { clearTimeout(clearTimer); show(ev.clientX); }
  });
  chart.addEventListener("pointerdown", ev => { if (ev.pointerType !== "mouse") show(ev.clientX); });
  chart.addEventListener("pointerleave", hide);
  chart.addEventListener("pointerup", ev => {
    if (ev.pointerType !== "mouse") { clearTimeout(clearTimer); clearTimer = setTimeout(hide, 900); }
  });
}

// Opening moment: a playhead sweeps from 2021 to today, drawing each bar as it passes.
function playIntro() {
  const chart = document.getElementById("chart");
  const bars = [...chart.querySelectorAll(".bar")];
  const heads = [...chart.querySelectorAll(".today")];
  const now = chart.querySelector(".now");
  const finish = () => {
    bars.forEach(b => b.style.clipPath = "");
    heads.forEach(h => h.style.left = pc(TODAY_X));
    now.style.left = pc(TODAY_X);
    chart.querySelectorAll(".callout").forEach(c => c.classList.add("in"));
    chart.classList.remove("sweeping");
    chart.classList.add("swept");
    introDone = true;
  };
  if (reduce) return finish();
  chart.classList.add("sweeping");
  const geo = bars.map(b => {
    const w = WORK.find(v => v.id === b.dataset.id);
    const [s, e] = span(w);
    return { b, l: x(s), r: x(e), c: chart.querySelector(`.callout[data-for="${w.id}"]`) };
  });
  geo.forEach(g => g.b.style.clipPath = "inset(0 100% 0 0 round 6px)");
  const DUR = 2400, ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let t0;
  function frame(ts) {
    t0 = t0 || ts;
    const k = Math.min(1, (ts - t0) / DUR), head = ease(k) * TODAY_X;
    heads.forEach(h => h.style.left = pc(head));
    now.style.left = pc(head);
    geo.forEach(g => {
      const v = Math.max(0, Math.min(1, (head - g.l) / Math.max(g.r - g.l, 0.002)));
      g.b.style.clipPath = `inset(0 ${((1 - v) * 100).toFixed(2)}% 0 0 round 6px)`;
      if (v >= 1) g.c.classList.add("in");
    });
    if (k < 1) requestAnimationFrame(frame); else finish();
  }
  requestAnimationFrame(frame);
}

function select(id, fromTap) {
  const w = WORK.find(v => v.id === id);
  if (!w) return;
  document.querySelectorAll(".bar").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
  const box = document.getElementById("inspect");
  box.innerHTML =
    `<div class="i-name">${w.name}</div>` +
    `<div><p class="i-when">${w.when}</p><p class="i-body">${w.body}</p></div>` +
    (w.go ? `<a class="i-go press" href="${w.go}">${w.goLabel}</a>` : "<span></span>");
  if (fromTap && !reduce) {
    box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
  }
}

// Jumping to a project briefly highlights it so you can see where you landed.
function flash(el) {
  if (!el || reduce) return;
  el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
}
document.addEventListener("click", ev => {
  const a = ev.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute("href"));
  if (target && target.matches(".p, .case, .contact")) setTimeout(() => flash(target), reduce ? 0 : 450);
});

// Make :active presses show on touch screens.
document.addEventListener("touchstart", () => {}, { passive: true });

// Diagram: a signal steps through the flow. Each step lights up while the signal is in it,
// steps it has passed stay marked, and the signal is only drawn on the arrows between them.
function runFlow() {
  const svg = document.getElementById("flow");
  if (!svg) return;
  const ball = svg.getElementById("ball"), ring = svg.getElementById("ring");
  const perm = svg.getElementById("perm"), unlock = svg.getElementById("unlock");
  const nodes = [...svg.querySelectorAll(".node[data-x0]")];
  const edges = [...svg.querySelectorAll(".edge[data-x0]")];
  if (reduce) { ball.style.display = "none"; return; }
  const CX = nodes.map(n => (+n.dataset.x0 + +n.dataset.x1) / 2);
  const DWELL = 520, MOVE = 380, REST = 1100;
  const CYCLE = nodes.length * DWELL + edges.length * MOVE + REST;
  let running = false, t0 = 0, raf;
  function state(t) {
    for (let i = 0; i < nodes.length; i++) {
      if (t < DWELL) return { node: i, edge: -1, x: CX[i] };
      t -= DWELL;
      if (i === nodes.length - 1) return { node: i, edge: -1, x: CX[i], rest: true };
      if (t < MOVE) {
        const p = t / MOVE, e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        return { node: -1, edge: i, from: i, x: CX[i] + (CX[i + 1] - CX[i]) * e };
      }
      t -= MOVE;
    }
  }
  function frame(ts) {
    if (!running) return;
    t0 = t0 || ts;
    const s = state((ts - t0) % CYCLE);
    const reached = s.node >= 0 ? s.node : s.from;
    nodes.forEach((n, i) => {
      n.classList.toggle("on", i === s.node && !s.rest);
      n.classList.toggle("done", i < reached || (s.rest && i <= reached) || (s.node < 0 && i === s.from));
    });
    nodes[nodes.length - 1].classList.toggle("on", s.node === nodes.length - 1 && !s.rest);
    edges.forEach((e, i) => e.classList.toggle("on", i === s.edge));
    const rx = s.x, onEdge = s.edge >= 0 && edges[s.edge] && rx > +edges[s.edge].dataset.x0 && rx < +edges[s.edge].dataset.x1;
    ball.setAttribute("cx", rx.toFixed(1));
    ball.classList.toggle("off", !onEdge);
    const atReceiver = s.node === 1 && !s.rest;
    perm.classList.toggle("on", atReceiver);
    unlock.classList.toggle("on", atReceiver);
    ring.classList.toggle("go", s.node === nodes.length - 1 && !s.rest);
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; t0 = 0; raf = requestAnimationFrame(frame); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); nodes.concat(edges).forEach(el => el.classList.remove("on", "done")); };
  if (!("IntersectionObserver" in window)) return start();
  new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? start() : stop()), { threshold: 0.35 }).observe(svg);
}

function storeLinks() {
  document.querySelectorAll("[data-store]").forEach(a => {
    const url = STORE[a.dataset.store];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; }
    else a.remove();
  });
}

document.getElementById("yr").textContent = today.getFullYear();
storeLinks();
buildChart();
select(DEFAULT, false);
runFlow();

// The name settles once on load.
if (document.documentElement.classList.contains("anim")) {
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("go")));
}

// The timeline plays its sweep the first time it comes into view.
(function () {
  const road = document.getElementById("work");
  if (reduce || !("IntersectionObserver" in window)) return playIntro();
  const io = new IntersectionObserver(es => {
    if (es.some(e => e.isIntersecting)) { io.disconnect(); playIntro(); }
  }, { threshold: 0.35 });
  io.observe(road);
})();

let rt;
window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(placeCallouts, 120); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeCallouts);
