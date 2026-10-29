// Samuel Ayinla portfolio

// Play Store links. Leave empty to hide the button on that project.
const STORE = {
  voicebox: "https://play.google.com/store/apps/details?id=com.moodifyvoicebox.app",
  paperclip: "",
};

// Timeline data. end: null means it's still running today.
const WORK = [
  { id: "koktailz", name: "Koktailz", sub: "Product manager", start: "2021-08-01", end: "2023-12-31", kind: "done",
    inBar: "Shipped Clink here",
    when: "Aug 2021 to Dec 2023, full time",
    body: "Led a remote team and took Clink, a location based discovery feature, from first research to release." },
  { id: "moodify", name: "Moodify", sub: "Technical PM", start: "2023-03-01", end: "2026-02-28", kind: "done",
    tip: "Six consumer apps",
    when: "Mar 2023 to Feb 2026",
    body: "Technical project manager and product manager. Ran delivery across six consumer utility apps with internal developers and an outside technology partner." },
  { id: "sdk", name: "MoodifySDK", sub: "Built and integrated", start: "2025-12-01", end: "2026-10-25", kind: "hand",
    tip: "Handed to client",
    when: "Dec 2025 to Oct 2026",
    body: "The after call SDK I proposed and built when Moodify's ad partnership ended. Built for VoiceBox, PaperClip and Shuffl, now owned by the client.",
    go: "#case", goLabel: "Read the case study" },
  { id: "circle", name: "Circle", sub: "Own product", start: "2026-07-29", end: null, kind: "hold",
    tip: "On hold",
    when: "Started Jul 2026, on hold",
    body: "An app that lets founders hand routine messages to an AI. Telegram integration, schema and onboarding are built.",
    go: "#p-circle", goLabel: "See the project" },
  { id: "outsyde", name: "Outsyde", sub: "Own product", start: "2026-08-29", end: null, kind: "build",
    tip: "About 90% done",
    when: "Started Aug 2026, about 90% done",
    body: "A hyperlocal discovery app for Osogbo, starting with events, hangouts and places to go.",
    go: "#p-outsyde", goLabel: "See the project" },
  { id: "smokecity", name: "Smoke City", sub: "Client build", start: "2026-10-22", end: null, kind: "done",
    tip: "Ready to launch",
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
function x(d) {
  const t = d.getTime();
  if (t < ZOOM_START) return ((t - START) / (ZOOM_START - START)) * (1 - ZOOM_SHARE);
  return (1 - ZOOM_SHARE) + Math.min(1, (t - ZOOM_START) / (END - ZOOM_START)) * ZOOM_SHARE;
}
const pc = v => (v * 100).toFixed(3) + "%";
const day = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

function laneBackground() {
  let h = "";
  for (let y = 2022; y <= LAST_YEAR; y++) {
    h += `<i class="gridline${y === LAST_YEAR ? " zoom" : ""}" style="left:${pc(x(new Date(y, 0, 1)))}"></i>`;
  }
  h += `<i class="zoomband" style="left:${pc(x(ZOOM_START))}"></i>`;
  h += `<i class="today" style="left:${pc(x(today))}"></i>`;
  return h;
}

function buildChart() {
  const chart = document.getElementById("chart");
  let html = "";
  WORK.forEach((w, i) => {
    const s = day(w.start), e = w.end ? day(w.end) : today;
    const left = x(s), width = Math.max(0, x(e) - left);
    const label = `${w.name}, ${w.when}`;
    const inner = w.inBar ? `<span class="on">${w.inBar}</span>` : "";
    const tip = w.tip ? `<span class="tip" style="right:calc(${pc(1 - left)} + 10px);--d:${(i * 0.09).toFixed(2)}s">${w.tip}</span>` : "";
    html += `<div class="lane-label"><div>${w.name}<small>${w.sub}</small></div></div>`;
    html += `<div class="lane">${laneBackground()}${tip}<button type="button" class="bar ${w.kind}" data-id="${w.id}" aria-pressed="false" aria-label="${label}" style="left:${pc(left)};width:${pc(width)};--d:${(i * 0.09).toFixed(2)}s">${inner}</button></div>`;
  });
  // axis
  let ax = "";
  for (let y = 2021; y < LAST_YEAR; y++) {
    const mid = x(new Date(y, 6, 1));
    ax += `<span class="${(y - 2021) % 2 || y === LAST_YEAR - 1 ? "mob-hide" : ""}" style="left:${pc(mid)}">${y}</span>`;
  }
  [0, 3, 6, 9].forEach(m => {
    const pos = x(new Date(LAST_YEAR, m, 15));
    ax += `<span class="${m ? (m === 3 ? "mob-hide" : "") : "zy"}" style="left:${pc(pos)}">${m ? MONTHS[m] : MONTHS[m] + " " + LAST_YEAR}</span>`;
  });
  ax += `<span class="now" style="left:${pc(x(today))}">Today</span>`;
  html += `<div class="axis" aria-hidden="true">${ax}</div>`;
  chart.innerHTML = html;

  chart.addEventListener("click", ev => {
    const b = ev.target.closest(".bar");
    if (b) select(b.dataset.id, true);
  });
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

// The diagram signal only runs while the diagram is on screen.
function watchFlow() {
  const svg = document.getElementById("flow");
  if (!svg || !svg.pauseAnimations) return;
  svg.pauseAnimations();
  if (reduce || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(entries => {
    entries.forEach(en => en.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations());
  }, { threshold: 0.4 }).observe(svg);
}

function storeLinks() {
  document.querySelectorAll("[data-store]").forEach(a => {
    const url = STORE[a.dataset.store];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; }
  });
}

document.getElementById("yr").textContent = today.getFullYear();
storeLinks();
buildChart();
select(DEFAULT, false);
watchFlow();

// One load sequence: the name settles, then the bars draw in, then today's line drops.
if (document.documentElement.classList.contains("anim")) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add("go");
    setTimeout(() => document.querySelectorAll(".bar").forEach(b => b.classList.add("ready")), 1500);
  }));
}
