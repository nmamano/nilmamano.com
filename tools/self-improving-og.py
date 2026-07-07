#!/usr/bin/env python3
"""OG thumbnail draft: an archive tree growing from a human-planted amber seed
into self-modifying green, with a self-loop on the frontier node."""

BG = "#0e1526"
TEXT = "#e8ecf4"
DIM = "#8fa0b8"
AMBER = (232, 163, 61)
GREEN = (74, 222, 128)
FONT = "'DejaVu Sans', ui-sans-serif, system-ui, sans-serif"

def mix(t):
    r = [round(a + (b - a) * t) for a, b in zip(AMBER, GREEN)]
    return f"rgb({r[0]},{r[1]},{r[2]})"

W, H = 1200, 630
parts = []
parts.append(f'<rect width="{W}" height="{H}" fill="{BG}"/>')

# ---- lineage tree (root = the seed, rightward = generations) ----
nodes = {
    # id: (x, y, depth, alive)
    "r":  (630, 315, 0, True),
    "a1": (760, 175, 1, True), "a2": (760, 330, 1, True), "a3": (760, 470, 1, False),
    "b1": (890, 110, 2, False), "b2": (890, 215, 2, True), "b3": (890, 330, 2, True),
    "b4": (890, 430, 2, True), "b5": (890, 520, 2, False),
    "c1": (1015, 165, 3, True), "c2": (1015, 255, 3, False), "c3": (1015, 345, 3, True),
    "c4": (1015, 465, 3, True),
    "d1": (1082, 168, 4, False), "d2": (1105, 400, 4, True),
}
edges = [("r","a1"),("r","a2"),("r","a3"),("a1","b1"),("a1","b2"),("a2","b3"),
         ("a2","b4"),("a3","b5"),("b2","c1"),("b2","c2"),("b3","c3"),("b4","c4"),
         ("c1","d1"),("c3","hero"),("c4","d2")]
hero = (1118, 310)

def npos(k):
    return hero if k == "hero" else nodes[k][:2]

for u, v in edges:
    (x1, y1), (x2, y2) = npos(u), npos(v)
    fade = ' opacity="0.35"' if (v != "hero" and not nodes[v][3]) else ' opacity="0.75"'
    du = nodes[u][2]
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{mix(min(1, (du+0.5)/4))}" stroke-width="2.2"{fade}/>')

for k, (x, y, d, alive) in nodes.items():
    c = mix(d / 4)
    op = 1.0 if alive else 0.35
    r = 13 if d == 0 else 11
    parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{BG}" stroke="{c}" stroke-width="2.6" opacity="{op}"/>')
    if alive and d in (0, 2):
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r-6}" fill="{c}" opacity="{op*0.9}"/>')

# hero node: glowing green, filled, with a self-loop arrow
hx, hy = hero
parts.append(f'<circle cx="{hx}" cy="{hy}" r="32" fill="rgb(74,222,128)" opacity="0.08"/>')
parts.append(f'<circle cx="{hx}" cy="{hy}" r="22" fill="rgb(74,222,128)" opacity="0.13"/>')
parts.append(f'<circle cx="{hx}" cy="{hy}" r="15" fill="rgb(74,222,128)"/>')
parts.append(
    f'<defs><marker id="mh" markerWidth="13" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">'
    f'<polygon points="0 0, 9 4, 0 8" fill="rgb(74,222,128)"/></marker></defs>'
)


# ---- title block ----
parts.append(f'<text x="70" y="205" fill="{DIM}" font-family="{FONT}" font-size="42" font-weight="600">How to Build a</text>')
parts.append(f'<text x="70" y="278" fill="rgb(74,222,128)" font-family="{FONT}" font-size="62" font-weight="700">Self-Improving</text>')
parts.append(f'<text x="70" y="350" fill="{TEXT}" font-family="{FONT}" font-size="62" font-weight="700">Agent</text>')


parts.append(f'<text x="70" y="576" fill="{DIM}" font-family="{FONT}" font-size="19" opacity="0.7">nilmamano.com</text>')

svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">' + "".join(parts) + "</svg>"
open("/tmp/og-draft.svg", "w").write(svg)
print("ok")
