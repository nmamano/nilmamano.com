// Renders the "commits per week/month" chart for the isomux blog post, annotated
// with the Yegge levels. Data comes from the commit-plot app (~/nil/commit-plot),
// which runs `git log` over every repo under ~/nil that has a GitHub remote.
//
//   node _source_assets/isomux_commits_per_week.mjs           # uses the live app
//   node _source_assets/isomux_commits_per_week.mjs weeks.json # uses a saved dump
//
// Writes _source_assets/out/commits-per-{week,month}.svg. Rasterize with
// _source_assets/isomux_commits_per_week.sh.

import fs from "fs";
import path from "path";

const APP = "http://127.0.0.1:21003/api/weeks";
const START = "2024-11-04"; // first full week of Nov 2024; Cursor was already the daily driver
const OUT = path.join(process.cwd(), "_source_assets", "out");

// Yegge-level bands. `from` is inclusive, the next band's `from` ends it.
const BANDS = [
  { from: "2024-11-04", label: ["Level 4", "Daily driver: Cursor"], fill: "#fadfd2" },
  { from: "2025-11-03", label: ["Level 5", "Daily driver: Claude Code"], fill: "#dcecd8" },
  { from: "2026-03-23", label: ["Levels 6-8", "Daily driver: Isomux"], fill: "#e8dcf0" },
];

const BAR = "#a8cbe2";
const LINE = "#c0392b";
const INK = "#333333";

async function load(arg) {
  if (arg) return JSON.parse(fs.readFileSync(arg, "utf8")).weeks;
  const res = await fetch(APP);
  if (!res.ok) throw new Error(`commit-plot app returned ${res.status}`);
  return (await res.json()).weeks;
}

const monthKey = (iso) => iso.slice(0, 7);

function toMonths(weeks) {
  // A week belongs to the month its Monday falls in.
  const by = new Map();
  for (const w of weeks) {
    const k = monthKey(w.week);
    by.set(k, (by.get(k) ?? 0) + w.count);
  }
  return [...by.entries()].sort().map(([month, count]) => ({ week: `${month}-01`, count }));
}

function rolling(rows, n) {
  return rows.map((_, i) => {
    const from = Math.max(0, i - n + 1);
    const slice = rows.slice(from, i + 1);
    return slice.reduce((a, r) => a + r.count, 0) / slice.length;
  });
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function render(rows, { title, avgLabel, avgWindow, barLabel, monthEvery, unit }) {
  const W = 1800, H = 512;
  const M = { top: 54, right: 22, bottom: 42, left: 62 };
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;

  const avg = rolling(rows, avgWindow);
  const peak = Math.max(...rows.map((r) => r.count));
  const yMax = Math.ceil(peak / 50) * 50;
  const step = plotW / rows.length;
  const x = (i) => M.left + (i + 0.5) * step;
  const y = (v) => M.top + plotH - (v / yMax) * plotH;

  // Map a real date onto the axis. Each row covers one unit (a week or a month),
  // so a date lands at its fractional row position, and month ticks come out
  // where the month actually starts.
  const DAY = 86400000;
  const t0 = Date.parse(`${rows[0].week}T00:00:00Z`);
  const rowIndex = (iso) => {
    const t = Date.parse(`${iso}T00:00:00Z`);
    if (unit === "week") return (t - t0) / (7 * DAY);
    const a = new Date(t0), b = new Date(t);
    const whole = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    const days = new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth() + 1, 0)).getUTCDate();
    return whole + (b.getUTCDate() - 1) / days;
  };
  const xDate = (iso) =>
    Math.min(Math.max(M.left + rowIndex(iso) * step, M.left), M.left + plotW);
  const bandStart = (from) => xDate(from);

  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif">`);
  out.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`);
  out.push(`<text x="${W / 2}" y="30" text-anchor="middle" font-size="25" font-weight="700" fill="#111111">${esc(title)}</text>`);

  // level bands
  BANDS.forEach((b, i) => {
    const x0 = bandStart(b.from);
    const x1 = i + 1 < BANDS.length ? bandStart(BANDS[i + 1].from) : M.left + plotW;
    if (x1 <= x0) return;
    out.push(`<rect x="${x0}" y="${M.top}" width="${x1 - x0}" height="${plotH}" fill="${b.fill}"/>`);
    if (i > 0) out.push(`<line x1="${x0}" y1="${M.top}" x2="${x0}" y2="${M.top + plotH}" stroke="#9a9a9a" stroke-width="1.5" stroke-dasharray="7 5"/>`);
    b.label.forEach((line, k) => {
      const size = k === 0 ? 20 : 17;
      const half = (line.length * size * 0.52) / 2; // rough text half-width
      const cx = Math.min(Math.max((x0 + x1) / 2, M.left + half + 4), M.left + plotW - half - 4);
      out.push(`<text x="${cx}" y="${M.top + 30 + k * 24}" text-anchor="middle" font-size="${size}" font-weight="700" fill="#4a3f55">${esc(line)}</text>`);
    });
  });

  // y gridlines + labels
  for (let v = 0; v <= yMax; v += yMax / 5) {
    out.push(`<line x1="${M.left}" y1="${y(v)}" x2="${M.left + plotW}" y2="${y(v)}" stroke="#cccccc" stroke-width="1" opacity="0.6"/>`);
    out.push(`<text x="${M.left - 10}" y="${y(v) + 5}" text-anchor="end" font-size="15" fill="${INK}">${v}</text>`);
  }
  out.push(`<text x="18" y="${M.top + plotH / 2}" text-anchor="middle" font-size="16" fill="${INK}" transform="rotate(-90 18 ${M.top + plotH / 2})">Commits</text>`);

  // bars
  const bw = Math.max(2, (plotW / rows.length) * 0.68);
  rows.forEach((r, i) => {
    if (!r.count) return;
    out.push(`<rect x="${x(i) - bw / 2}" y="${y(r.count)}" width="${bw}" height="${M.top + plotH - y(r.count)}" fill="${BAR}"/>`);
  });

  // rolling average
  out.push(`<path d="${avg.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")}" fill="none" stroke="${LINE}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`);

  // axes: one tick on the first row of every `monthEvery`-th calendar month, so
  // labels stay aligned to months instead of drifting with the row index
  out.push(`<line x1="${M.left}" y1="${M.top + plotH}" x2="${M.left + plotW}" y2="${M.top + plotH}" stroke="#333333" stroke-width="1.4"/>`);
  const first = new Date(t0), last = new Date(`${rows[rows.length - 1].week}T00:00:00Z`);
  let y0 = first.getUTCFullYear(), m0 = first.getUTCMonth();
  if (first.getUTCDate() > 1) { m0 += 1; if (m0 > 11) { m0 = 0; y0 += 1; } }
  for (let n = 0; ; n++) {
    const yy = y0 + Math.floor((m0 + n) / 12), mm = (m0 + n) % 12;
    const iso = `${yy}-${String(mm + 1).padStart(2, "0")}-01`;
    if (Date.parse(`${iso}T00:00:00Z`) > last.getTime()) break;
    const tx = xDate(iso);
    // every month gets a tick; only every `monthEvery`-th one gets a label
    const labelled = n % monthEvery === 0;
    out.push(`<line x1="${tx}" y1="${M.top + plotH}" x2="${tx}" y2="${M.top + plotH + (labelled ? 10 : 6)}" stroke="#333333" stroke-width="${labelled ? 1.6 : 1.3}" opacity="${labelled ? 1 : 0.75}"/>`);
    if (!labelled) continue;
    out.push(`<text x="${tx}" y="${M.top + plotH + 28}" text-anchor="middle" font-size="14" fill="${INK}">${MONTHS[mm]} ${yy}</text>`);
  }

  // legend
  const lx = M.left + 16, ly = M.top + 12;
  out.push(`<rect x="${lx}" y="${ly}" width="240" height="52" rx="5" fill="#ffffff" fill-opacity="0.92" stroke="#bbbbbb"/>`);
  out.push(`<line x1="${lx + 14}" y1="${ly + 18}" x2="${lx + 44}" y2="${ly + 18}" stroke="${LINE}" stroke-width="2.6"/>`);
  out.push(`<text x="${lx + 52}" y="${ly + 23}" font-size="14" fill="${INK}">${esc(avgLabel)}</text>`);
  out.push(`<rect x="${lx + 20}" y="${ly + 31}" width="18" height="13" fill="${BAR}"/>`);
  out.push(`<text x="${lx + 52}" y="${ly + 43}" font-size="14" fill="${INK}">${esc(barLabel)}</text>`);

  out.push(`</svg>`);
  return out.join("\n");
}

const all = await load(process.argv[2]);
const weeks = all.filter((r) => r.week >= START);
const months = toMonths(weeks);

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "commits-per-week.svg"), render(weeks, {
  title: "Commits per week", avgLabel: "4-week rolling avg", avgWindow: 4,
  barLabel: "Weekly commits", monthEvery: 2, unit: "week",
}));
fs.writeFileSync(path.join(OUT, "commits-per-month.svg"), render(months, {
  title: "Commits per month", avgLabel: "3-month rolling avg", avgWindow: 3,
  barLabel: "Monthly commits", monthEvery: 2, unit: "month",
}));
console.log(`weeks ${weeks[0].week}..${weeks[weeks.length - 1].week} (${weeks.length}) | months ${months.length}`);
