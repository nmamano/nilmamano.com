// Stages the build into .image/, one folder per image layer (the Dockerfile copies
// each folder in this order). public/ is 393 MB, so it goes in its own layers, split
// by the year of each blog post and feed post. A new post changes only the layer of
// its year, and the VPS pulls only that layer, the newer ones and the app again.
// Every file and folder gets one fixed mtime, so an unchanged layer has the same
// digest in every build.
// Usage (after `bun run build`): node ops/self-host/stage-image.mjs
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, utimesSync } from "node:fs";
import { join } from "node:path";

// Keep in step with the COPY lines in the Dockerfile.
export const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];
export const LAYERS = ["public-base", "public-old", ...YEARS.map((y) => `public-${y}`), "public-misc", "app"];
const FIXED_TIME = new Date("2000-01-01T00:00:00Z");

// The year in a post's frontmatter `date:` line, or null.
export function postYear(file) {
  if (!existsSync(file)) return null;
  const head = readFileSync(file, "utf8").split(/^---\s*$/m)[1] ?? "";
  const match = /^date:\s*['"]?(\d{4})-/m.exec(head);
  return match ? Number(match[1]) : null;
}

// The layer of public/<section>/<name>, from the date of the post it belongs to.
export function layerFor(root, section, name) {
  const source = section === "blog" ? join(root, "blog", `${name}.mdx`) : join(root, "posts", `${name}.md`);
  const year = postYear(source);
  if (year === null) return "public-misc";
  if (year <= 2024) return "public-old";
  if (!YEARS.includes(year)) throw new Error(`${section}/${name}: no layer for ${year}; add it to YEARS and the Dockerfile`);
  return `public-${year}`;
}

function setTimes(path) {
  if (lstatSync(path).isDirectory()) for (const entry of readdirSync(path)) setTimes(join(path, entry));
  utimesSync(path, FIXED_TIME, FIXED_TIME);
}

export function stage(root, out = join(root, ".image")) {
  rmSync(out, { recursive: true, force: true });
  for (const layer of LAYERS) mkdirSync(join(out, layer), { recursive: true });
  const copy = (from, layer, to) => cpSync(join(root, from), join(out, layer, to ?? from), { recursive: true });
  const counts = Object.fromEntries(LAYERS.map((l) => [l, 0]));

  for (const entry of readdirSync(join(root, "public"))) {
    if (entry !== "blog" && entry !== "posts") {
      copy(join("public", entry), "public-base");
      counts["public-base"]++;
      continue;
    }
    for (const name of readdirSync(join(root, "public", entry))) {
      const layer = layerFor(root, entry, name);
      copy(join("public", entry, name), layer);
      counts[layer]++;
    }
  }

  const standalone = join(root, ".next", "standalone");
  if (!existsSync(join(standalone, "server.js"))) throw new Error("no .next/standalone/server.js: run the build first");
  cpSync(standalone, join(out, "app"), { recursive: true });
  copy(join(".next", "static"), "app");
  copy("ops/self-host/socket-entry.cjs", "app", "socket-entry.cjs");
  copy("ops/self-host/egress-proxy.mjs", "app", "egress-proxy.mjs");

  setTimes(out);
  return counts;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const counts = stage(process.cwd());
  for (const [layer, n] of Object.entries(counts)) if (layer !== "app") console.log(`${layer}: ${n} entries`);
}
