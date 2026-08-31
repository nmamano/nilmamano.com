// Generates the 4-node rhombus diagram: User / Agent / Just-in-time App / State.
import { writeFileSync } from "node:fs";

const W = 1000, H = 700;
const CX = 500, CY = 350;

const nodes = {
  user:  { x: 140, y: 350, w: 145, h: 64, label: "User",             tw: 37.8,  icon: "person",  stroke: "#2b6cb0", fill: "#e7f2ff" },
  agent: { x: 500, y: 105, w: 152, h: 64, label: "Agent",            tw: 48.2,  icon: "robot",   stroke: "#6b46c1", fill: "#f0e9ff" },
  app:   { x: 500, y: 595, w: 242, h: 64, label: "Just-in-time App", tw: 134.1, icon: "window",  stroke: "#1f9550", fill: "#e6f6ec" },
  state: { x: 860, y: 350, w: 145, h: 64, label: "State",            tw: 41.6,  icon: "cylinder",stroke: "#b45309", fill: "#fdf0e0" },
};

// 20x20 icons drawn around a local origin of (0, 0)
function icon(kind, color) {
  const s = `fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
  if (kind === "person")
    return `<circle cx="0" cy="-4.5" r="3.4" ${s}/><path d="M -6.5 7.5 C -6.5 1, 6.5 1, 6.5 7.5" ${s}/>`;
  if (kind === "robot")
    return `<path d="M 0 -10.2 V -7.6" ${s}/><circle cx="0" cy="-11.2" r="1.3" fill="${color}"/>` +
           `<rect x="-7.5" y="-7.5" width="15" height="13" rx="3.5" ${s}/>` +
           `<circle cx="-3.2" cy="-2.8" r="1.5" fill="${color}"/><circle cx="3.2" cy="-2.8" r="1.5" fill="${color}"/>` +
           `<path d="M -3 2.2 H 3" ${s}/>`;
  if (kind === "window")
    return `<rect x="-9.5" y="-8" width="19" height="16" rx="2.5" ${s}/><path d="M -9.5 -3.2 H 9.5" ${s}/>` +
           `<circle cx="-6.6" cy="-5.6" r="1" fill="${color}"/><circle cx="-3.4" cy="-5.6" r="1" fill="${color}"/>`;
  // cylinder
  return `<ellipse cx="0" cy="-6" rx="7.5" ry="3" ${s}/><path d="M -7.5 -6 V 6" ${s}/><path d="M 7.5 -6 V 6" ${s}/>` +
         `<path d="M -7.5 0 A 7.5 3 0 0 0 7.5 0" ${s}/><path d="M -7.5 6 A 7.5 3 0 0 0 7.5 6" ${s}/>`;
}

// from, to, label lines, which side of the line-pair (+1 / -1 along perp), label gap
const edges = [
  { from: "user",  to: "agent", side: +1, rot: true, lines: ["Natural language inputs"] },
  { from: "agent", to: "user",  side: -1, rot: true, lines: ["Natural language outputs"] },
  { from: "user",  to: "app",   side: +1, rot: true, lines: ["Interactive inputs"] },
  { from: "app",   to: "user",  side: -1, rot: true, lines: ["Interactive outputs"] },
  { from: "agent", to: "app",   side: +1, gap: 72, lines: ["Implementation"] },
  { from: "app",   to: "agent", side: +1, gap: 66, lines: ["Notifications"] },
  { from: "agent", to: "state", side: +1, rot: true, gap: 50, size: 15, lines: ["Natural language requests", "mapped to structured", "state updates"] },
  { from: "state", to: "agent", side: -1, rot: true, lines: ["Data to base answers on"] },
  { from: "app",   to: "state", side: +1, rot: true, lines: ["State updates"] },
  { from: "state", to: "app",   side: -1, rot: true, lines: ["Data to display"] },
];

// exit point of a ray (from a point inside the box) through the box border
function exit(box, px, py, ux, uy) {
  const tx = ux === 0 ? Infinity : ((ux > 0 ? box.w / 2 : -box.w / 2) - (px - box.x)) / ux;
  const ty = uy === 0 ? Infinity : ((uy > 0 ? box.h / 2 : -box.h / 2) - (py - box.y)) / uy;
  const t = Math.min(tx, ty);
  return [px + ux * t, py + uy * t];
}

const r2 = (n) => Math.round(n * 10) / 10;
const OFF = 11;      // half-distance between the two antiparallel lines
const HEAD = 11;     // arrowhead length
const HALFW = 4.6;   // arrowhead half-width
const GAP = 5;       // gap between node border and line end

let body = "";
for (const e of edges) {
  const a = nodes[e.from], b = nodes[e.to];
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  // perpendicular, sign chosen so that side=+1 points away from the rhombus centre
  let px = -uy, py = ux;
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  if ((mx + px - CX) ** 2 + (my + py - CY) ** 2 < (mx - CX) ** 2 + (my - CY) ** 2) { px = -px; py = -py; }
  const ox = px * OFF * e.side, oy = py * OFF * e.side;

  const [sx, sy] = exit(a, a.x + ox, a.y + oy, ux, uy);
  const [ex, ey] = exit(b, b.x + ox, b.y + oy, -ux, -uy);
  const x1 = sx + ux * GAP, y1 = sy + uy * GAP;
  const x2 = ex - ux * GAP, y2 = ey - uy * GAP;
  const bx = x2 - ux * HEAD, by = y2 - uy * HEAD; // arrowhead base

  const color = a.stroke;
  body += `  <line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(bx)}" y2="${r2(by)}" stroke="${color}" stroke-width="2"/>\n`;
  body += `  <polygon points="${r2(x2)},${r2(y2)} ${r2(bx + px * HALFW)},${r2(by + py * HALFW)} ${r2(bx - px * HALFW)},${r2(by - py * HALFW)}" fill="${color}"/>\n`;

  const gap = e.gap ?? (e.rot ? 26 : 30);
  const lx = (x1 + x2) / 2 + px * gap * e.side;
  const ly = (y1 + y2) / 2 + py * gap * e.side;
  const lh = (e.size ?? 17) + 3;
  const top = ly - ((e.lines.length - 1) * lh) / 2 + 4.5;
  const spans = e.lines
    .map((t, i) => `<tspan x="${r2(lx)}" y="${r2(top + i * lh)}">${t}</tspan>`)
    .join("");
  let rot = "";
  if (e.rot) {
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (deg > 90) deg -= 180;
    if (deg < -90) deg += 180;
    rot = ` transform="rotate(${r2(deg)} ${r2(lx)} ${r2(ly)})"`;
  }
  body += `  <text text-anchor="middle" font-size="${e.size ?? 17}" font-weight="600" fill="${color}"${rot}>${spans}</text>\n\n`;
}

let boxes = "";
for (const n of Object.values(nodes)) {
  boxes += `  <rect x="${n.x - n.w / 2}" y="${n.y - n.h / 2}" width="${n.w}" height="${n.h}" rx="10" fill="${n.fill}" stroke="${n.stroke}" stroke-width="2"/>\n`;
  const ICON = 25, PAD = 11;
  const left = n.x - (ICON + PAD + n.tw) / 2;
  boxes += `  <g transform="translate(${r2(left + ICON / 2)} ${n.y}) scale(${ICON / 20})">${icon(n.icon, n.stroke)}</g>\n`;
  boxes += `  <text x="${r2(left + ICON + PAD)}" y="${n.y + 6}" font-size="17" font-weight="700" fill="${n.stroke}">${n.label}</text>\n`;
}

// Crop to the nodes plus a margin, so the figure carries no dead border.
const MARGIN = 22;
const xs = Object.values(nodes).flatMap((n) => [n.x - n.w / 2, n.x + n.w / 2]);
const ys = Object.values(nodes).flatMap((n) => [n.y - n.h / 2, n.y + n.h / 2]);
const vx = r2(Math.min(...xs) - MARGIN);
const vy = r2(Math.min(...ys) - MARGIN);
const vw = r2(Math.max(...xs) + MARGIN - vx);
const vh = r2(Math.max(...ys) + MARGIN - vy);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" font-family="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#ffffff"/>

  <!-- ===== Edges ===== -->
${body}  <!-- ===== Nodes ===== -->
${boxes}</svg>
`;

// Run from the repo root: node _source_assets/personal_software_suites_agent_app_loop.mjs
writeFileSync("public/blog/personal-software-suites/agent-app-loop.svg", svg);
console.log("written", svg.length, "bytes");
