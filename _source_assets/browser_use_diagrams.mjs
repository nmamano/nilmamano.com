// Generates the diagram for the "Browser Use Implementation Guide" post.
//   architecture.svg  - the extension bridge (server runs Playwright, the user's Chrome runs the tab)
// Run from the repo root: node _source_assets/browser_use_diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/blog/browser-use";
const FONT = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";

const gray = { stroke: "#4a5568", fill: "#f4f5f7" };
const purple = { stroke: "#6b46c1", fill: "#f0e9ff" };
const blue = { stroke: "#2b6cb0", fill: "#e7f2ff" };
const green = { stroke: "#2f855a", fill: "#e8f6ee" };
const ink = "#1a202c";
const arrow = "#4a5568";

function canvas() {
  let body = "";
  const api = {
    rect: (x, y, w, h, c, { rx = 14, sw = 2, dashed = false, fill } = {}) =>
      (body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill ?? c.fill}" stroke="${c.stroke}" stroke-width="${sw}"${dashed ? ' stroke-dasharray="7 5"' : ""}/>\n`),
    text: (x, y, s, { size = 16, weight = 500, fill = ink, anchor = "start", opacity = 1, mono = false } = {}) =>
      (body += `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${opacity < 1 ? ` opacity="${opacity}"` : ""}${mono ? ` font-family="${MONO}"` : ""}>${s}</text>\n`),
    line: (d, { color = arrow, dashed = false, start = false, end = true, sw = 2 } = {}) =>
      (body += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}"${dashed ? ' stroke-dasharray="7 5"' : ""}${end ? ' marker-end="url(#arrow)"' : ""}${start ? ' marker-start="url(#arrow)"' : ""}/>\n`),
    raw: (s) => (body += s + "\n"),
    svg: (W, H) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="${FONT}">
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="${arrow}"/>
  </marker>
</defs>
<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>
${body}</svg>
`,
  };
  return api;
}

function architecture() {
  const c = canvas();
  const W = 1000, H = 440;

  // Server.
  c.rect(20, 20, 470, 400, purple);
  c.text(44, 54, "Isomux server", { size: 21, weight: 700, fill: purple.stroke });
  c.text(44, 78, "in the cloud", { fill: purple.stroke, opacity: 0.78 });

  // Agents.
  c.rect(44, 100, 190, 220, gray, { fill: "#ffffff", sw: 1.5, rx: 12 });
  c.text(62, 130, "Agents", { size: 18, weight: 700, fill: gray.stroke });
  [["Claude Code"], ["Codex"], ["OpenCode"]].forEach(([h], i) => {
    const y = 148 + i * 54;
    c.rect(60, y, 158, 42, gray, { rx: 9, sw: 1.2 });
    c.text(139, y + 27, h, { size: 15, weight: 600, anchor: "middle" });
  });

  // Browser API + Playwright.
  c.rect(290, 100, 176, 96, purple, { fill: "#ffffff", sw: 1.5, rx: 12 });
  c.text(378, 136, "Browser API", { size: 17, weight: 700, fill: purple.stroke, anchor: "middle" });
  c.text(378, 162, "POST /api/agents/:id", { size: 11.5, fill: purple.stroke, anchor: "middle", mono: true });
  c.text(378, 178, "/browser", { size: 11.5, fill: purple.stroke, anchor: "middle", mono: true });
  c.rect(290, 224, 176, 96, purple, { fill: "#ffffff", sw: 1.5, rx: 12 });
  c.text(378, 262, "Playwright", { size: 17, weight: 700, fill: purple.stroke, anchor: "middle" });
  c.text(378, 286, "selectors, waiting,", { size: 13, fill: purple.stroke, anchor: "middle", opacity: 0.85 });
  c.text(378, 303, "snapshots", { size: 13, fill: purple.stroke, anchor: "middle", opacity: 0.85 });

  c.line("M 234 210 L 286 150");
  c.text(240, 168, "curl", { size: 13, fill: arrow, mono: true });
  c.line("M 378 196 L 378 220");
  c.text(44, 360, "Screenshots go straight into the agent's chat.", { size: 14, fill: purple.stroke, opacity: 0.85 });
  c.text(44, 384, "The server refuses file:// URLs and other bad input.", { size: 14, fill: purple.stroke, opacity: 0.85 });

  // The user's computer.
  c.rect(590, 20, 390, 400, blue);
  c.text(614, 54, "User's computer", { size: 21, weight: 700, fill: blue.stroke });
  c.text(614, 78, "their own Chrome, already logged in", { fill: blue.stroke, opacity: 0.78 });

  c.rect(614, 100, 342, 96, blue, { fill: "#ffffff", sw: 1.5, rx: 12 });
  c.text(785, 136, "Isomux extension", { size: 17, weight: 700, fill: blue.stroke, anchor: "middle" });
  c.text(785, 162, "relays CDP commands", { size: 13, fill: blue.stroke, anchor: "middle", opacity: 0.85 });
  c.text(785, 179, "with chrome.debugger", { size: 12, fill: blue.stroke, anchor: "middle", mono: true });

  // Tabs.
  c.rect(614, 230, 164, 110, green, { rx: 12 });
  c.text(696, 262, "Offered tab", { size: 16, weight: 700, fill: green.stroke, anchor: "middle" });
  c.rect(674, 276, 44, 22, green, { rx: 5, sw: 0, fill: green.stroke });
  c.text(696, 292, "ON", { size: 13, weight: 800, fill: "#ffffff", anchor: "middle" });
  c.text(696, 322, "agents can act here", { size: 13, fill: green.stroke, anchor: "middle" });

  c.rect(792, 230, 164, 110, gray, { rx: 12, dashed: true });
  c.text(874, 262, "Other tabs", { size: 16, weight: 700, fill: gray.stroke, anchor: "middle" });
  c.text(874, 296, "invisible", { size: 13, fill: gray.stroke, anchor: "middle" });
  c.text(874, 314, "to agents", { size: 13, fill: gray.stroke, anchor: "middle" });

  c.line("M 696 196 L 696 226");
  c.text(614, 384, "The user turns on agent control per tab.", { size: 14, fill: blue.stroke, opacity: 0.85 });

  // WebSocket, dialed out by the extension.
  c.line("M 470 272 L 540 272 L 540 148 L 610 148", { start: true });
  c.raw(`<rect x="486" y="185" width="108" height="50" rx="9" fill="#ffffff" stroke="${arrow}" stroke-width="1.5"/>`);
  c.text(540, 207, "WebSocket", { size: 14, weight: 700, fill: arrow, anchor: "middle" });
  c.text(540, 225, "extension dials out", { size: 11.5, fill: arrow, anchor: "middle" });

  return c.svg(W, H);
}

mkdirSync(OUT, { recursive: true });
for (const [file, svg] of [["architecture.svg", architecture()]]) {
  writeFileSync(`${OUT}/${file}`, svg);
  console.log(file, svg.length, "bytes");
}
