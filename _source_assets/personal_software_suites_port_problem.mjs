// Generates the "one meta-harness, two runtimes" diagram: the meta-harness runs
// agents and apps side by side, and both inherit the same host, accounts and
// cross-device access. Between them, the outbound leg (register, runs) sits above
// the return leg (calls, delivers) so the closed loop reads as a circuit.
// Run from the repo root: node _source_assets/personal_software_suites_port_problem.mjs
import { writeFileSync } from "node:fs";

const W = 1000, H = 498;

const C = {
  meta:  { s: "#4a5568", f: "#f7f9fc" },
  agent: { s: "#6b46c1", f: "#f0e9ff" },
  app:   { s: "#1f9550", f: "#e6f6ec" },
  orch:  { s: "#b45309", f: "#fdf0e0" },
  user:  { s: "#2b6cb0", f: "#e7f2ff" },
  msg:   { s: "#0f766e", f: "#e0f5f2" },
};

const r2 = (n) => Math.round(n * 10) / 10;
let out = "";

const rect = (x, y, w, h, c, rx = 12, dash = false) =>
  (out += `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${c.f}" stroke="${c.s}" stroke-width="2"${dash ? ' stroke-dasharray="7 5"' : ""}/>\n`);

const text = (x, y, s, color, { size = 15, weight = 700, anchor = "middle", opacity = 1 } = {}) =>
  (out += `  <text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${s}</text>\n`);

const arrow = (x1, y1, x2, y2, color) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len, px = -uy, py = ux;
  const HEAD = 11, HALF = 4.6;
  const bx = x2 - ux * HEAD, by = y2 - uy * HEAD;
  out += `  <line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(bx)}" y2="${r2(by)}" stroke="${color}" stroke-width="2"/>\n`;
  out += `  <polygon points="${r2(x2)},${r2(y2)} ${r2(bx + px * HALF)},${r2(by + py * HALF)} ${r2(bx - px * HALF)},${r2(by - py * HALF)}" fill="${color}"/>\n`;
};

// ---- the meta-harness, and what both runtimes inherit from it ----
rect(40, 30, 920, 326, C.meta, 16);
out += `  <text x="66" y="62" font-size="17" font-weight="700" fill="${C.meta.s}">Meta-harness<tspan font-size="14" font-weight="500" opacity="0.8" dx="9">(always-on host)</tspan></text>\n`;

// ---- the two runtimes ----
const RUNTIME_Y = 96, RUNTIME_H = 232;
const chipYs = [165, 220, 275];

rect(76, RUNTIME_Y, 220, RUNTIME_H, C.agent, 13, true);
text(186, RUNTIME_Y + 32, "Agents", C.agent.s, { size: 17 });
["Agent 1", "Agent 2", "Agent 3"].forEach((name, i) => {
  rect(101, chipYs[i] - 22, 170, 44, C.agent, 9);
  text(186, chipYs[i] + 5, name, C.agent.s, { size: 14.5 });
});

rect(704, RUNTIME_Y, 220, RUNTIME_H, C.app, 13, true);
text(814, RUNTIME_Y + 32, "Apps", C.app.s, { size: 17 });
["todo", "commit-plot", "business-health"].forEach((name, i) => {
  rect(724, chipYs[i] - 22, 180, 44, C.app, 9);
  text(814, chipYs[i] + 5, name, C.app.s, { size: 14.5 });
});

// ---- between the two runtimes: outbound on top, the return leg below ----
rect(380, 136, 240, 68, C.orch, 12);
text(500, 164, "App orchestrator", C.orch.s, { size: 17 });
text(500, 187, "assigns ports, keeps apps alive", C.orch.s, { size: 13, weight: 500, opacity: 0.82 });

arrow(298, 170, 376, 170, C.agent.s);
text(337, 154, "register", C.agent.s, { size: 13, weight: 600 });
arrow(622, 170, 700, 170, C.orch.s);
text(661, 154, "runs", C.orch.s, { size: 13, weight: 600 });

// the closed loop: an app calls in, the queue wakes the agent
rect(380, 246, 240, 68, C.msg, 12);
text(500, 274, "Message queueing", C.msg.s, { size: 17 });
text(500, 297, "queues if the agent is busy", C.msg.s, { size: 13, weight: 500, opacity: 0.82 });

arrow(700, 280, 622, 280, C.app.s);
text(661, 264, "calls", C.app.s, { size: 13, weight: 600 });
arrow(376, 280, 298, 280, C.msg.s);
text(337, 264, "delivers", C.msg.s, { size: 13, weight: 600 });

// ---- the user, reaching both through the same door ----
rect(415, 408, 170, 56, C.user, 12);
text(500, 442, "Users", C.user.s, { size: 17 });
arrow(452, 406, 240, 332, C.user.s);
arrow(548, 406, 760, 332, C.user.s);
text(500, 486, "one login, any device", C.user.s, { size: 13.5, weight: 500 });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

${out}</svg>
`;

writeFileSync("public/blog/personal-software-suites/port-problem.svg", svg);
console.log("written", svg.length, "bytes");
