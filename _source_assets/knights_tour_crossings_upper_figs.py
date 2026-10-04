# Upper-bound figures for blog/knights-tour-crossings.mdx (fold design, 19n/3).
# Adapted from knight-formation-research/writeup/crossings/figures/ (no in-figure titles; the post text explains each figure).
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_crossings_upper_figs.py
import json
import sys
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mp

ROOT = Path.home() / 'nil/knight-formation-research'
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / 'w-structures')); sys.path.insert(0, str(ROOT / 'w-lowerbounds'))
import fold3
from fold3 import comps
from kt.core import crossing_list, edges, validate

OUT = Path(__file__).resolve().parents[1] / 'public/blog/knights-tour-crossings'
DPI = 160
plt.rcParams['font.size'] = 9

# palette (shared with the Integrator's interactive demo)
COL = {(2, 1): '#2a78d6', (2, -1): '#eda100', (1, 2): '#1baf7a', (1, -2): '#4a3aa7'}   # the 4 line directions (demo/app.js, colorblind-safe)
RED = '#c0392b'        # crossings
INK = '#22303a'        # text, fold lines
DIM = '#5a6872'        # secondary text
GRID = '#eef1f4'       # dark squares of the board
GREY = '#9aa5b1'       # cells, lines that are not in focus
TEAL = '#0e7c7b'       # cost labels
EDGE = '#cfe6e3'       # edge strips (4n)
FLIP = '#e8a598'       # flipped edge rows (+n)
CORR = '#7a5195'       # diagonal flux corridors (4n/3)


def save(fig, name):
    fig.savefig(OUT / f'{name}.png', bbox_inches='tight', dpi=DPI, facecolor='white')
    plt.close(fig)


def direc(e):
    dx, dy = e[1][0] - e[0][0], e[1][1] - e[0][1]
    return (dx, dy) if dx > 0 else (-dx, -dy)


def cross_pt(e, f):
    (x1, y1), (x2, y2) = e; (x3, y3), (x4, y4) = f
    dd = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    s = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / dd
    return (x1 + s * (x2 - x1), y1 + s * (y2 - y1))


def field(n, flips=False):
    h = n // 2
    fl = (lambda r, y: h - n // 4 <= y < h) if flips else None
    E, deg = fold3.build(n, ts=(1, 1, 1, 1), flip=fl)
    return E, deg


def board(ax, x0, x1, y0, y1, checker=True):
    ax.set_xlim(x0 - 0.6, x1 + 0.6); ax.set_ylim(y0 - 0.6, y1 + 0.6)
    ax.set_aspect('equal'); ax.axis('off')
    if checker:
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                if (x + y) % 2 == 0:
                    ax.add_patch(mp.Rectangle((x - .5, y - .5), 1, 1, color=GRID, lw=0, zorder=0))


def draw_edges(ax, E, x0, x1, y0, y1, lw=1.0, color=None, alpha=1.0, z=2):
    for e in E:
        if any(x0 - 2 <= p[0] <= x1 + 2 and y0 - 2 <= p[1] <= y1 + 2 for p in e):
            ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=color or COL[direc(e)], lw=lw, alpha=alpha,
                    zorder=z, solid_capstyle='round')


def draw_crossings(ax, E, x0, x1, y0, y1, ms=3.5):
    pts = [cross_pt(e, f) for e, f in crossing_list(E)]
    pts = [p for p in pts if x0 - .5 <= p[0] <= x1 + .5 and y0 - .5 <= p[1] <= y1 + .5]
    ax.plot([p[0] for p in pts], [p[1] for p in pts], 'o', color=RED, ms=ms, zorder=4, lw=0)
    return pts


def fold_lines(ax, n, lw=1.0):
    m = n - 1
    kw = dict(color=INK, lw=lw, ls=(0, (4, 3)), alpha=.55, zorder=3)
    ax.plot([-.5, m + .5], [-.5, m + .5], **kw); ax.plot([-.5, m + .5], [m + .5, -.5], **kw)
    ax.plot([n / 2 - .5] * 2, [-.5, m + .5], **kw); ax.plot([-.5, m + .5], [n / 2 - .5] * 2, **kw)


def legend_dirs(ax, x, y, step=1.6, size=1.0):
    for k, (d, c) in enumerate(COL.items()):
        yy = y - k * step
        ax.plot([x - d[0] * .5 * size, x + d[0] * .5 * size], [yy - d[1] * .5 * size, yy + d[1] * .5 * size],
                color=c, lw=2.4, solid_capstyle='round')
        ax.text(x + 1.8 * size, yy, f'({d[0]},{d[1]})', va='center', fontsize=8, color=DIM)


def fig_field():
    """(1) the 8-triangle fold field: 4 directions, 8 fold lines (mirrors)."""
    n = 32
    E, _ = field(n)
    fig, ax = plt.subplots(figsize=(5.6, 5.2))
    board(ax, 0, n - 1, 0, n - 1, checker=False)
    draw_edges(ax, E, 0, n - 1, 0, n - 1, lw=0.9)
    fold_lines(ax, n)
    save(fig, 'fold_field')


def walk(E, start, steps):
    nb = {}
    for a, b in E:
        nb.setdefault(a, []).append(b); nb.setdefault(b, []).append(a)
    out = []
    for first in nb[start]:
        path, prev, cur = [start], start, first
        for _ in range(steps):
            path.append(cur)
            nx = [v for v in nb[cur] if v != prev]
            if not nx: break
            prev, cur = cur, nx[0]
        out.append(path)
    return out


def fig_closeup():
    """(2) a free fold close-up: every line bends into its mirror image, no crossings."""
    n = 48
    E, _ = field(n)
    x0, x1, y0, y1 = 9, 21, 9, 21
    fig, ax = plt.subplots(figsize=(4.6, 4.6))
    board(ax, x0, x1, y0, y1)
    draw_edges(ax, E, x0, x1, y0, y1, lw=0.9, alpha=.45)
    for c in [(14, 14), (17, 17)]:
        for path in walk(E, c, 6):
            for a, b in zip(path, path[1:]):
                ax.plot([a[0], b[0]], [a[1], b[1]], color=COL[direc((a, b) if a < b else (b, a))], lw=2.6, zorder=3,
                        solid_capstyle='round')
    nb = {}
    for a, b in E:
        nb.setdefault(a, []).append(b); nb.setdefault(b, []).append(a)
    apex = [c for c, v in nb.items() if x0 <= c[0] <= x1 and y0 <= c[1] <= y1 and len(v) == 2
            and direc(tuple(sorted((c, v[0])))) != direc(tuple(sorted((c, v[1]))))]
    off = sum(c[1] - c[0] for c in apex) / len(apex)
    ax.plot([x0 - .6, x1 + .6], [x0 - .6 + off, x1 + .6 + off], color=INK, lw=1.2, ls=(0, (4, 3)), alpha=.7, zorder=3)
    pts = draw_crossings(ax, E, x0, x1, y0, y1)
    assert not pts, 'the fold close-up should have no crossings'
    ax.text(x1 + .4, y1 - 1.6, 'fold line', ha='right', fontsize=13, color=INK, rotation=45)
    save(fig, 'fold_closeup')


def fig_edge():
    """(3) the steep left edge: the U-turn pattern costs 1 crossing per row."""
    n = 48
    E, _ = field(n)
    x0, x1, y0, y1 = 0, 9, 13, 19
    fig, ax = plt.subplots(figsize=(4.4, 3.2))
    board(ax, x0, x1, y0, y1)
    uturn = {e for e in E if e[0][0] <= 1 and e[1][0] <= 1}
    draw_edges(ax, E - uturn, x0, x1, y0, y1, lw=1.0)
    draw_edges(ax, uturn, x0, x1, y0, y1, lw=2.4, color=INK)
    pts = draw_crossings(ax, E, x0, x1, y0, y1, ms=4.5)
    ax.set_xlim(x0 - .6, x1 + .6); ax.set_ylim(y0 + .5, y1 - .5)
    for y in range(y0 + 1, y1):                      # one crossing per row (no labels drawn)
        assert sum(1 for p in pts if y - .5 <= p[1] < y + .5) == 1
    save(fig, 'edge_uturn')


def closed_in(n, E, deg, x0, x1, y0, y1):
    _, cyc, _ = comps(n, E, deg)
    return [c for c in cyc if min(p[0] for p in c) <= 1 and all(y0 <= p[1] <= y1 for p in c)]


def fig_chevrons():
    """(4) the chevron loops at an edge midpoint, and the arch-flip fix.
    Left: every trapped loop in its own colour. Right: the part of one path that lies in the window,
    starting from a cell of the biggest loop on the left."""
    n = 48; h = n // 2
    x0, x1, y0, y1 = 0, 22, 8, 39
    LOOPC = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#a65628', '#f781bf', '#17becf']
    inwin = lambda q: x0 <= q[0] <= x1 and y0 <= q[1] <= y1
    fig, axes = plt.subplots(1, 2, figsize=(8.4, 6.2))
    seed = None
    for ax, flips in zip(axes, (False, True)):
        E, deg = field(n, flips)
        board(ax, x0, x1, y0, y1, checker=False)
        draw_edges(ax, E, x0, x1, y0, y1, lw=0.7, color=GREY, alpha=.6)
        if not flips:
            loops = closed_in(n, E, deg, x0, x1, y0, y1)
            loops.sort(key=lambda c: -len(c))
            assert len(loops) <= len(LOOPC)
            for k, c in enumerate(loops):
                cs = set(c)
                Ec = [e for e in E if e[0] in cs and e[1] in cs]
                draw_edges(ax, Ec, x0, x1, y0, y1, lw=1.6, color=LOOPC[k], z=3)
            seed = max(loops[0], key=lambda q: q[0])          # the tip of the biggest chevron
        else:
            adj = {}
            for u, v in E:
                if inwin(u) and inwin(v):
                    adj.setdefault(u, []).append(v); adj.setdefault(v, []).append(u)
            comp, todo = {seed}, [seed]
            while todo:
                u = todo.pop()
                for v in adj.get(u, []):
                    if v not in comp:
                        comp.add(v); todo.append(v)
            Ec = [e for e in E if e[0] in comp and e[1] in comp]
            draw_edges(ax, Ec, x0, x1, y0, y1, lw=1.6, color=LOOPC[1], z=3)
        ax.plot([x0 - .5, x1 + .5], [h - .5, h - .5], color=INK, lw=1, ls=(0, (4, 3)), alpha=.55)
        if flips:
            ax.add_patch(mp.Rectangle((-.5, h - n // 4 - .5), 2, n // 4, color=FLIP, alpha=.8, lw=0, zorder=1))
    save(fig, 'chevrons')


def fig_flux(name='flux', jogs=False):
    """(5) the corner colour imbalance and the diagonal corridors to the centre."""
    n = 96
    d = json.load(open(ROOT / 'w-integrator/tours/FOLD24_n96.json'))
    t = d['tour']; assert validate(t) and len(t) == n
    xy = lambda c: (c[1], n - 1 - c[0])
    E = {tuple(sorted((xy(a), xy(b)))) for a, b in edges(t)}
    fig, axes = plt.subplots(1, 2, figsize=(8.8, 4.4), gridspec_kw={'width_ratios': [1, 1]})
    ax = axes[0]
    ax.set_xlim(-6, 102); ax.set_ylim(-6, 102); ax.set_aspect('equal'); ax.axis('off')
    ax.add_patch(mp.Rectangle((-.5, -.5), n, n, fill=False, ec=INK, lw=1))
    fold_lines(ax, n, lw=.8)
    m = n - 1
    for (cx, cy), lab in [((0, 0), '-1'), ((0, m), '+1'), ((m, m), '-1'), ((m, 0), '+1')]:
        ax.plot([cx, m / 2], [cy, m / 2], color=CORR, lw=7, alpha=.35, solid_capstyle='butt', zorder=2)
        ax.add_patch(mp.Circle((cx, cy), 5.5, color='white', ec=CORR, lw=1.4, zorder=4))
        ax.text(cx, cy, lab, ha='center', va='center', fontsize=10, color=CORR, weight='bold', zorder=5)
    ax.add_patch(mp.Circle((m / 2, m / 2), 5.5, color='white', ec=INK, lw=1, zorder=4))
    ax.text(m / 2, m / 2, '0', ha='center', va='center', fontsize=10, color=INK, zorder=5)
    ax = axes[1]
    if not jogs:
        x0, x1, y0, y1 = 22, 37, 22, 37
        board(ax, x0, x1, y0, y1)
        draw_edges(ax, E, x0, x1, y0, y1, lw=1.0)
        pts = draw_crossings(ax, E, x0, x1, y0, y1, ms=4.5)
    else:   # draft: shorter window, the diagonal fold dashed, the crossing moves (the jogs) drawn dark
        x0, x1, y0, y1 = 24, 35, 24, 35
        board(ax, x0, x1, y0, y1)
        jog = {e for pair in crossing_list(E) for e in pair
               if all(x0 - 1 <= q[0] <= x1 + 1 and y0 - 1 <= q[1] <= y1 + 1 for q in pair[0] + pair[1])}
        draw_edges(ax, E - jog, x0, x1, y0, y1, lw=0.9, alpha=.55)
        draw_edges(ax, jog, x0, x1, y0, y1, lw=2.4, color=INK, z=3)
        ax.plot([x0 - .5, x1 + .5], [x0 + .5, x1 + 1.5], color=INK, lw=1.2, ls=(0, (4, 3)), alpha=.7, zorder=2.5)
        pts = draw_crossings(ax, E, x0, x1, y0, y1, ms=5.5)
    save(fig, name)


def fig_tour():
    """(6) a full validated tour, colour by direction, crossings in red."""
    n = 96
    d = json.load(open(ROOT / 'w-integrator/tours/FOLD24_n96.json'))
    t = d['tour']; assert validate(t)
    xy = lambda c: (c[1], n - 1 - c[0])
    E = {tuple(sorted((xy(a), xy(b)))) for a, b in edges(t)}
    fig, ax = plt.subplots(figsize=(6.6, 6.6))
    board(ax, 0, n - 1, 0, n - 1, checker=False)
    draw_edges(ax, E, 0, n - 1, 0, n - 1, lw=0.6, alpha=.85)
    pts = draw_crossings(ax, E, 0, n - 1, 0, n - 1, ms=2.2)
    save(fig, 'tour96')
    return len(pts)


def fig_count():
    """(7) the count: 4n + n + 4n/3 = 19n/3."""
    fig, ax = plt.subplots(figsize=(7.4, 3.2))
    ax.set_xlim(-0.02, 2.4); ax.set_ylim(-0.02, 1.02); ax.set_aspect('equal'); ax.axis('off')
    w = 0.045
    for r in (mp.Rectangle((0, 0), 1, w), mp.Rectangle((0, 1 - w), 1, w), mp.Rectangle((0, 0), w, 1),
              mp.Rectangle((1 - w, 0), w, 1)):
        r.set_color(EDGE); ax.add_patch(r)
    # flipped quarter of each edge, on one side of its midpoint (left edge: rows n/4 .. n/2, then rotate)
    segs = [mp.Rectangle((0, .25), w, .25), mp.Rectangle((.5, 0), .25, w), mp.Rectangle((1 - w, .5), w, .25),
            mp.Rectangle((.25, 1 - w), .25, w)]
    for r in segs:
        r.set_color(FLIP); ax.add_patch(r)
    ax.add_patch(mp.Rectangle((0, 0), 1, 1, fill=False, ec=INK, lw=1))
    kw = dict(color=INK, lw=.8, ls=(0, (4, 3)), alpha=.5)
    ax.plot([0, 1], [.5, .5], **kw); ax.plot([.5, .5], [0, 1], **kw)
    for (cx, cy) in [(0, 0), (0, 1), (1, 1), (1, 0)]:
        ax.plot([cx, .5], [cy, .5], color=CORR, lw=5, alpha=.4, solid_capstyle='butt')
    rows = [(EDGE, 'edges', 'U-turns, 1 crossing per row', '4n'),
            (FLIP, 'arch flips', 'a quarter of each edge, +1 per row', '+n'),
            (CORR, 'corridors', '4 half-diagonals, 2/3 per unit x', '4n/3'),
            (None, 'folds', 'dashed lines, no crossings', '0')]
    for k, (c, a, b, v) in enumerate(rows):
        y = .92 - k * .19
        if c:
            ax.add_patch(mp.Rectangle((1.12, y - .03), .06, .06, color=c, alpha=.9 if c != CORR else .5))
        else:
            ax.plot([1.12, 1.18], [y, y], **kw)
        ax.text(1.22, y + .015, a, fontsize=10, weight='bold', color=INK, va='center')
        ax.text(1.22, y - .045, b, fontsize=8.5, color=DIM, va='center')
        ax.text(2.35, y, v, fontsize=11, weight='bold', color=TEAL, va='center', ha='right')
    fig.savefig(OUT / 'count.png', bbox_inches='tight', pad_inches=0.04, dpi=DPI, facecolor='white')   # the sum is in the post text
    plt.close(fig)


def fig_demand(name='corner_demand'):
    """The corner region (6 x 6, dashed) of the fold layout with everything outside it frozen. Each cell shows
    how many moves it still needs (2 minus the moves coming in from outside). Dark cells = black.
    Left: the layout as built (black cells need 28, white 29). Right: the diagonal fold shifted by one line
    (black 29, white 27): the difference changes by 3. Measured like w-structures/imbal.py."""
    n = 48; h = n // 2; V = 10; S = 6
    W = {(x, y) for x in range(S) for y in range(S)}
    BLACK = '#c3ccd5'
    before = {}
    for t, out in ((1, name), (2, name + '_shift')):   # two separate figures: as built, and fold shifted
        fig, ax = plt.subplots(figsize=(4.2, 4.4))
        E, _ = fold3.build(n, ts=(t, 1, 1, 1), flip=lambda r, y: h - n // 4 <= y < h)
        ax.set_xlim(-.6, V - .4); ax.set_ylim(-.6, V - .4); ax.set_aspect('equal'); ax.axis('off')
        for x in range(V):
            for y in range(V):
                if (x + y) % 2 == 0:
                    ax.add_patch(mp.Rectangle((x - .5, y - .5), 1, 1, color=BLACK, lw=0, zorder=0))
        dem = {q: 2 for q in W}
        for a, b in E:
            ina, inb = a in W, b in W
            if ina and inb:
                continue                                   # inside moves are removed: the region is refilled
            if not any(-1 <= c[0] <= V and -1 <= c[1] <= V for c in (a, b)):
                continue
            cross = ina != inb
            if cross:
                dem[a if ina else b] -= 1
            ax.plot([a[0], b[0]], [a[1], b[1]], color=INK if cross else GREY, lw=2.2 if cross else .9,
                    zorder=3 if cross else 2, solid_capstyle='round')
        for q, d in dem.items():
            ax.text(q[0] - .24, q[1] - .22, str(d), ha='center', va='center', fontsize=10, color=INK, zorder=5, weight='bold')
            if t == 2 and before.get(q) != d:              # cells whose count changed with the fold shift
                ax.add_patch(mp.Rectangle((q[0] - .5, q[1] - .5), 1, 1, fill=False, ec=RED, lw=2.2, zorder=7))
        before = before if t == 2 else dict(dem)
        ax.add_patch(mp.Rectangle((-.5, -.5), S, S, fill=False, ec=INK, lw=1.6, ls=(0, (4, 3)), zorder=6))
        ax.plot([-.5, V - .4], [-.5, -.5], color=INK, lw=2.5, zorder=6); ax.plot([-.5, -.5], [-.5, V - .4], color=INK, lw=2.5, zorder=6)
        B = sum(d for q, d in dem.items() if (q[0] + q[1]) % 2 == 0); Wh = sum(d for q, d in dem.items() if (q[0] + q[1]) % 2)
        print('t', t, 'black', B, 'white', Wh)
        save(fig, out)


if __name__ == '__main__':
    fig_field(); fig_closeup(); fig_edge(); fig_chevrons(); fig_flux(); X = fig_tour(); fig_count()
    print('wrote', sorted(p.name for p in OUT.glob('*.png')), 'tour96 crossings', X)
