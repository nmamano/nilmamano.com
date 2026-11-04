// Generates the conceptual diagrams for "Loop Engineering and the End of Agents":
// the EDA loop, gates vs. one Decision Node, and the black hole.
// Same style as the other site diagrams (personal_software_suites_layers.mjs).
// Run from the repo root: node _source_assets/end_of_agents_diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/blog/end-of-agents";
const FONT = `Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const C = {
  blue: { s: "#2b6cb0", f: "#e7f2ff" },
  purple: { s: "#6b46c1", f: "#f0e9ff" },
  green: { s: "#1f9550", f: "#e6f6ec" },
  orange: { s: "#b45309", f: "#fdf0e0" },
  gray: { s: "#4a5568", f: "#f4f5f7" },
};

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" font-family="${FONT}">
  <rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff"/>
${body}</svg>
`;
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f1 = (v) => +v.toFixed(1);
const box = (x, y, w, h, c, rx = 14, sw = 2) =>
  `  <rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${c.f}" stroke="${c.s}" stroke-width="${sw}"/>\n`;
const text = (x, y, t, { size = 17, weight = 500, fill = "#1a202c", anchor = "middle", opacity = 1 } = {}) =>
  `  <text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${esc(t)}</text>\n`;
// A straight arrow from (x1,y1) to (x2,y2), head at the end.
function arrow(x1, y1, x2, y2, color, width = 2) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 11, W = 5;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  const p = (dx, dy) => `${f1(bx + dx)},${f1(by + dy)}`;
  return `  <line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${color}" stroke-width="${width}"/>\n` +
    `  <polygon points="${f1(x2)},${f1(y2)} ${p(-W * Math.sin(a), W * Math.cos(a))} ${p(W * Math.sin(a), -W * Math.cos(a))}" fill="${color}"/>\n`;
}
// A polyline arrow through points, head at the last point.
function path(points, color) {
  const [x1, y1] = points[points.length - 2], [x2, y2] = points[points.length - 1];
  const pts = points.slice(0, -1).map(([x, y]) => `${x},${y}`).join(" ");
  return `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2"/>\n` + arrow(x1, y1, x2, y2, color);
}

mkdirSync(OUT, { recursive: true });

// 1. The EDA loop: Event -> Policy (Decider) -> Action (Actor) -> new events.
{
  const W = 1000, H = 400, y = 40, h = 230, bw = 270;
  const cols = [
    { x: 40, c: C.blue, title: "Event", sub: "A past fact", lines: ['"task filed"', '"merged at sha X"', '"I decided go, P1"'] },
    { x: 365, c: C.purple, title: "Policy", sub: "Whenever event X happens,", sub2: "decide", slot: "Decider" },
    { x: 690, c: C.green, title: "Action", sub: "Take action Y", slot: "Actor" },
  ];
  let b = "";
  for (const k of cols) {
    const cx = k.x + bw / 2;
    b += box(k.x, y, bw, h, k.c);
    b += text(cx, y + 42, k.title, { size: 22, weight: 700, fill: k.c.s });
    b += text(cx, y + 74, k.sub, { size: 16, fill: k.c.s, opacity: 0.85 });
    if (k.sub2) b += text(cx, y + 96, k.sub2, { size: 16, fill: k.c.s, opacity: 0.85 });
    if (k.lines) k.lines.forEach((l, i) => (b += text(cx, y + 120 + i * 28, l, { size: 16, fill: "#2d3748" })));
    if (k.slot) {
      // The slot: who fills it is pluggable.
      b += `  <rect x="${cx - 105}" y="${y + 120}" width="210" height="84" rx="12" fill="#ffffff" stroke="${k.c.s}" stroke-width="1.5"/>\n`;
      b += text(cx, y + 150, k.slot, { size: 17, weight: 700, fill: k.c.s });
      b += text(cx, y + 182, "code · agent · human", { size: 15, weight: 600, fill: "#4a5568" });
    }
  }
  b += arrow(310, y + h / 2, 365, y + h / 2, C.purple.s);
  b += arrow(635, y + h / 2, 690, y + h / 2, C.green.s);
  b += path([[825, y + h], [825, 340], [175, 340], [175, y + h]], C.blue.s);
  b += `  <rect x="395" y="326" width="210" height="28" fill="#ffffff"/>\n`;
  b += text(500, 346, "results in new events", { size: 16, weight: 600, fill: C.blue.s });
  writeFileSync(`${OUT}/eda-loop.svg`, svg(W, H, b));
}

// 2. Two projects: four human queues vs. one Decision Node.
{
  const W = 1000;
  const stages = ["Filed", "Triage", "Work", "Merge", "Sign-off", "Push"];
  const gates = [1, 4]; // Triage and Sign-off need the human.
  const sw = 112, gap = 30, x0 = 140, rh = 46;
  const sx = (i) => x0 + i * (sw + gap);
  const mid = (i) => sx(i) + sw / 2;
  const row = (y, name) => {
    let r = text(24, y + rh / 2 + 6, name, { size: 17, weight: 700, anchor: "start", fill: "#2d3748" });
    stages.forEach((s, i) => {
      const c = gates.includes(i) ? C.orange : C.gray;
      r += box(sx(i), y, sw, rh, c, 10);
      r += text(mid(i), y + rh / 2 + 6, s, { size: 16, weight: 700, fill: c.s });
      if (i > 0) r += arrow(sx(i - 1) + sw, y + rh / 2, sx(i), y + rh / 2, "#718096");
    });
    return r;
  };
  const you = (x, y) =>
    `  <circle cx="${x}" cy="${y}" r="26" fill="#1a1530"/>\n` + text(x, y + 6, "You", { size: 15, weight: 700, fill: "#ffffff" });

  let b = "";
  // Before: you sit at each gate of each project.
  const top = 60;
  b += text(24, top - 22, "Before: 4 human gates", { size: 20, weight: 700, anchor: "start" });
  const aY = top, bY = top + 200;
  b += row(aY, "Project A") + row(bY, "Project B");
  for (const i of gates) {
    b += you(mid(i), aY + rh + 36);
    b += you(mid(i), bY - 36);
  }

  const sep = bY + rh + 40;
  b += `  <line x1="24" y1="${sep}" x2="976" y2="${sep}" stroke="#e2e8f0" stroke-width="2"/>\n`;

  // After: every gate sends to the one Decision Node.
  const top2 = sep + 70;
  b += text(24, top2 - 22, "After: 1 Decision Node", { size: 20, weight: 700, anchor: "start" });
  const a2 = top2, b2 = top2 + 250;
  b += row(a2, "Project A") + row(b2, "Project B");
  const nw = 300, nh = 70, nx = (mid(1) + mid(4)) / 2 - nw / 2, ny = (a2 + rh + b2) / 2 - nh / 2;
  for (const i of gates) {
    const tx = i === 1 ? nx + 70 : nx + nw - 70;
    b += arrow(mid(i), a2 + rh, tx, ny, C.orange.s);
    b += arrow(mid(i), b2, tx, ny + nh, C.orange.s);
  }
  b += box(nx, ny, nw, nh, C.orange, 12);
  b += text(nx + nw / 2, ny + 30, "Decision Node", { size: 20, weight: 700, fill: C.orange.s });
  b += text(nx + nw / 2, ny + 53, "every decision, one queue", { size: 14, weight: 500, fill: C.orange.s, opacity: 0.85 });
  b += you(nx + nw + 44, ny + nh / 2);
  writeFileSync(`${OUT}/single-decision-node.svg`, svg(W, b2 + rh + 30, b));
}

// 3. The black hole: a gravity well. Event sources slide down into the Decision Node.
{
  const W = 1000, H = 500, cx = 500, top = 150, R = 440, rMin = 46, tilt = 0.26;
  // Depth of the well at radius r: flat at the rim, steep near the center.
  const depth = (r) => top + 30 * (R / r - 1);
  const P = (r, th) => [cx + r * Math.cos(th), depth(r) + r * tilt * Math.sin(th)];
  let b = "";
  // Rings.
  const rings = [];
  for (let r = R; r > rMin + 1; r *= 0.8) rings.push(r);
  for (const r of rings) {
    const ry = r * tilt, cy = depth(r);
    b += `  <ellipse cx="${cx}" cy="${f1(cy)}" rx="${f1(r)}" ry="${f1(ry)}" fill="none" stroke="#d6cdf0" stroke-width="1.5"/>\n`;
  }
  // Radial lines.
  for (let k = 0; k < 24; k++) {
    const th = (k / 24) * 2 * Math.PI, pts = [];
    for (let r = R; r >= rMin; r *= 0.97) pts.push(P(r, th).map(f1).join(","));
    pts.push(P(rMin, th).map(f1).join(","));
    b += `  <polyline points="${pts.join(" ")}" fill="none" stroke="#e4ddf5" stroke-width="1.2"/>\n`;
  }
  // The hole.
  const hy = depth(rMin);
  b += `  <defs><radialGradient id="glow"><stop offset="0.4" stop-color="#6b46c1" stop-opacity="0.45"/><stop offset="1" stop-color="#6b46c1" stop-opacity="0"/></radialGradient></defs>\n`;
  b += `  <ellipse cx="${cx}" cy="${f1(hy)}" rx="${rMin * 2.1}" ry="${f1(rMin * tilt * 2.6)}" fill="url(#glow)"/>\n`;
  b += `  <ellipse cx="${cx}" cy="${f1(hy)}" rx="${rMin}" ry="${f1(rMin * tilt)}" fill="#1a1530" stroke="${C.orange.s}" stroke-width="2.5"/>\n`;
  b += box(cx - 95, hy + 28, 190, 40, C.orange, 20);
  b += text(cx, hy + 54, "Decision Node", { size: 17, weight: 700, fill: C.orange.s });
  // Event sources on the slope, each with a short arrow down the well. The ones it ate first are deepest.
  const items = [
    ["Group chats", C.purple, 400, 0.3], ["Online shopping", C.green, 390, 2.85],
    ["Bills", C.green, 240, 0.55], ["Email", C.purple, 240, 2.6],
    ["Project B", C.blue, 98, 0.25], ["Project A", C.blue, 98, 2.9],
  ];
  for (const [label, c, r, th] of items) {
    const [x, y] = P(r, th), w = label.length * 9 + 30;
    // An arrow from the pill's edge toward the center, a short way down the well.
    const [tx, ty] = P(r * 0.55, th), dx = tx - x, dy = ty - y, len = Math.hypot(dx, dy);
    const out = Math.min((w / 2 + 6) / Math.abs(dx / len || 1e-9), 22 / Math.abs(dy / len || 1e-9));
    b += arrow(x + (dx / len) * out, y + (dy / len) * out, x + (dx / len) * (out + 44), y + (dy / len) * (out + 44), c.s);
    b += `  <rect x="${f1(x - w / 2)}" y="${f1(y - 16)}" width="${f1(w)}" height="32" rx="16" fill="${c.f}" stroke="${c.s}" stroke-width="1.5"/>\n`;
    b += text(x, y + 6, label, { size: 15, weight: 600, fill: c.s });
  }
  writeFileSync(`${OUT}/black-hole.svg`, svg(W, H, b));
}

console.log("written to", OUT);
