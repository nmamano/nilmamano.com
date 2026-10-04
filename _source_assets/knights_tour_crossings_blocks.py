# Single-tour figures for blog/knights-tour-crossings.mdx, in the style of the turns post (grow.png, blocks.png).
# fold_grow.png: the real fold tours for n = 96 and n = 120 (crossings in red).
# fold_blocks.png: the n = 96 tour with the 8 insertion blocks of the all-n proof shaded
# (CROSSINGS_PROOFS.md, A.2): corner block = bottom-left quadrant with 24 <= max(2x - y, 2y - x) < 30,
# side block = left half with h + 16 <= 2 min(y, n - y) - x < h + 22, each rotated four ways.
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_crossings_blocks.py
import json
import sys
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mp

ROOT = Path.home() / 'nil/knight-formation-research'
sys.path.insert(0, str(ROOT))
from kt.core import crossing_list, edges, validate

OUT = Path(__file__).resolve().parents[1] / 'public/blog/knights-tour-crossings'
INK, RED, LINE = '#22303a', '#c0392b', '#b4bec7'
CORNER, SIDE = '#9fd3c7', '#f6c28b'


def tour(n):
    t = json.load(open(ROOT / f'w-integrator/tours/FOLD24_n{n}.json'))['tour']
    assert validate(t)
    xy = lambda c: (c[1], n - 1 - c[0])
    return [(xy(a), xy(b)) for a, b in edges(t)], None, t


def cross_pts(n, t):
    xy = lambda c: (c[1], n - 1 - c[0])
    pts = []
    for e, f in crossing_list(edges(t)):
        (a, b), (c, d) = (xy(e[0]), xy(e[1])), (xy(f[0]), xy(f[1]))
        den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0])
        s = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den
        pts.append((a[0] + s * (b[0] - a[0]), a[1] + s * (b[1] - a[1])))
    return pts


def block_of(n, p):
    """'corner', 'side' or None for cell p, using the proof's labels in all four rotated frames."""
    h = n // 2
    for r in range(4):
        x, y = p
        for _ in range(r):
            x, y = y, n - 1 - x                      # R^-1, with R(x, y) = (n - 1 - y, x)
        if x < h and y < h and 24 <= max(2 * x - y, 2 * y - x) < 30:
            return 'corner'
        if x < h and h + 16 <= 2 * min(y, n - y) - x < h + 22:
            return 'side'
    return None


def draw(ax, n, E, pts, shade=None):
    ax.set_xlim(-1, n); ax.set_ylim(-1, n); ax.set_aspect('equal'); ax.axis('off')
    ax.add_patch(mp.Rectangle((-.5, -.5), n, n, fill=False, ec=INK, lw=1, zorder=1))
    if shade:
        for p, kind in shade.items():
            ax.add_patch(mp.Rectangle((p[0] - .5, p[1] - .5), 1, 1, color=CORNER if kind == 'corner' else SIDE, lw=0, zorder=1))
    for a, b in E:
        dark = bool(shade) and a in shade and b in shade
        ax.plot([a[0], b[0]], [a[1], b[1]], color=INK if dark else LINE, lw=.6 if dark else .4, zorder=3 if dark else 2)
    ax.plot([p[0] for p in pts], [p[1] for p in pts], 'o', color=RED, ms=1.4, zorder=4)


# grow: n = 96 and n = 120 side by side, at the same scale per cell
fig, axes = plt.subplots(1, 2, figsize=(10, 5.6), gridspec_kw={'width_ratios': [96, 120]})
for ax, n in zip(axes, (96, 120)):
    E, _, t = tour(n)
    pts = cross_pts(n, t)
    draw(ax, n, E, pts); ax.set_anchor('S')
    ax.set_title(f'n = {n}: {len(pts)} crossings', fontsize=12)   # like the turns post's grow.png
fig.savefig(OUT / 'fold_grow.png', bbox_inches='tight', dpi=160, facecolor='white'); plt.close(fig)

# blocks on n = 96
n = 96
E, _, t = tour(n)
shade = {(x, y): k for x in range(n) for y in range(n) if (k := block_of(n, (x, y)))}
fig, ax = plt.subplots(figsize=(7.2, 7.2))
draw(ax, n, E, cross_pts(n, t), shade)
# one label per block type: on the bottom-left corner block and inside the left side block's chevron
for name, col, (x, y) in [('corner block', CORNER, (20, 21)), ('side block', SIDE, (7, n // 2))]:
    ax.text(x, y, name, ha='left', va='center', fontsize=9, color=INK, zorder=6,
            bbox=dict(fc='white', ec=col, lw=1.5, boxstyle='round,pad=0.3'))
fig.savefig(OUT / 'fold_blocks.png', bbox_inches='tight', dpi=160, facecolor='white'); plt.close(fig)
print('wrote fold_grow.png, fold_blocks.png', sum(1 for k in shade.values() if k == 'corner'), sum(1 for k in shade.values() if k == 'side'))
