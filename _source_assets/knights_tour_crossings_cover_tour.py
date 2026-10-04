# Tour art for the crossings post cover: the bottom-left 30 x 30 cells of the real 96 x 96 fold tour from the post,
# with every crossing in that window as a teal dot. Same look as knights_tour_turns_cover_tour.svg.
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_crossings_cover_tour.py
import json
import sys
from pathlib import Path

ROOT = Path.home() / 'nil/knight-formation-research'
sys.path.insert(0, str(ROOT))
from kt.core import crossing_list, edges, validate

N, W, S = 96, 30, 16          # board size, window size in cells, pixels per cell
OUT = Path(__file__).resolve().parent / 'knights_tour_crossings_cover_tour.svg'
t = json.load(open(ROOT / 'w-integrator/tours/FOLD24_n96.json'))['tour']
assert validate(t)
xy = lambda c: (c[1], N - 1 - c[0])            # (row, col) -> (x, y) with y up
E = [(xy(a), xy(b)) for a, b in edges(t)]
px = lambda x, y: (S / 2 + x * S, W * S - S / 2 - y * S)
near = lambda p: -3 <= p[0] <= W + 2 and -3 <= p[1] <= W + 2

o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W * S} {W * S}">',
     f'<defs><clipPath id="c"><rect x="0" y="0" width="{W * S}" height="{W * S}" rx="10"/></clipPath></defs><g clip-path="url(#c)">']
for x in range(W):
    for y in range(W):
        if (x + y) % 2 == 0:
            X, Y = px(x, y)
            o.append(f'<rect x="{X - S / 2:.1f}" y="{Y - S / 2:.1f}" width="{S}" height="{S}" fill="#0f1a2e"/>')
d = ''.join(f'M{px(*a)[0]:g} {px(*a)[1]:g}L{px(*b)[0]:g} {px(*b)[1]:g}' for a, b in E if near(a) or near(b))
o.append(f'<path d="{d}" stroke="#5b76a8" stroke-width="2.3" stroke-linecap="round" fill="none"/>')
for e, f in crossing_list(edges(t)):
    (a, b), (c, dd) = (xy(e[0]), xy(e[1])), (xy(f[0]), xy(f[1]))
    den = (a[0] - b[0]) * (c[1] - dd[1]) - (a[1] - b[1]) * (c[0] - dd[0])
    s = ((a[0] - c[0]) * (c[1] - dd[1]) - (a[1] - c[1]) * (c[0] - dd[0])) / den
    p = (a[0] + s * (b[0] - a[0]), a[1] + s * (b[1] - a[1]))
    if -.5 <= p[0] <= W - .5 and -.5 <= p[1] <= W - .5:
        X, Y = px(*p)
        o.append(f'<circle cx="{X:.1f}" cy="{Y:.1f}" r="4.8" fill="#5eead4"/>')
o.append('</g></svg>')
OUT.write_text('\n'.join(o))
print('wrote', OUT.name)
