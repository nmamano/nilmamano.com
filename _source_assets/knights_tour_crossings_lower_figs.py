# Lower-bound figures for blog/knights-tour-crossings.mdx (tiles, charge, strips).
# Adapted from knight-formation-research/writeup/crossings/figures/ (no in-figure titles; the post text explains each figure).
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_crossings_lower_figs.py
import sys
from itertools import combinations
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mp

ROOT = Path.home() / 'nil/knight-formation-research'
sys.path.insert(0, str(ROOT / 'w-turnstheory')); sys.path.insert(0, str(ROOT / 'writeup/turns/figures'))
from check_knight_tiles import microtiles, cross, tile
from tt16 import build
sys.path.insert(0, str(ROOT))
from kt.core import edges as tour_edges

OUT = Path(__file__).resolve().parents[1] / 'public/blog/knights-tour-crossings'
DPI = 160
plt.rcParams['font.size'] = 9
COL = {(2, 1): '#2a78d6', (2, -1): '#eda100', (1, 2): '#1baf7a', (1, -2): '#4a3aa7'}   # demo/app.js palette
RED, INK, DIM, GRID, GREY, TEAL = '#c0392b', '#22303a', '#5a6872', '#eef1f4', '#9aa5b1', '#0e7c7b'
EDGE, FLIP, CORR = '#cfe6e3', '#e8a598', '#7a5195'
TILE = '#b9d3f2'


def save(fig, name):
    fig.savefig(OUT / f'{name}.png', bbox_inches='tight', dpi=DPI, facecolor='white')
    plt.close(fig)


def quarter(t):
    i, j, k = t
    c = (i + .5, j + .5)
    corners = [((i, j), (i + 1, j)), ((i + 1, j), (i + 1, j + 1)), ((i + 1, j + 1), (i, j + 1)), ((i, j + 1), (i, j))][k]
    return [corners[0], corners[1], c]


def direc(e):
    dx, dy = e[1][0] - e[0][0], e[1][1] - e[0][1]
    return (dx, dy) if dx > 0 else (-dx, -dy)


def grid(ax, x0, x1, y0, y1, diag=False):
    for x in range(x0, x1 + 1):
        ax.plot([x, x], [y0, y1], color='#d5dbe0', lw=.7, zorder=0)
    for y in range(y0, y1 + 1):
        ax.plot([x0, x1], [y, y], color='#d5dbe0', lw=.7, zorder=0)
    if diag:
        for x in range(x0, x1):
            for y in range(y0, y1):
                ax.plot([x, x + 1], [y, y + 1], color='#e3e7ea', lw=.5, zorder=0)
                ax.plot([x, x + 1], [y + 1, y], color='#e3e7ea', lw=.5, zorder=0)
    for x in range(x0, x1 + 1):
        for y in range(y0, y1 + 1):
            ax.plot(x, y, 'o', color=GREY, ms=2.5, zorder=1)


def frame(ax, x0, x1, y0, y1, pad=.4):
    ax.set_xlim(x0 - pad, x1 + pad); ax.set_ylim(y0 - pad, y1 + pad); ax.set_aspect('equal'); ax.axis('off')


def edge(ax, e, lw=2.2, color=None, z=4):
    ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=color or COL[direc(e)], lw=lw, zorder=z,
            solid_capstyle='round')
    for p in e:
        ax.plot(*p, 'o', color=INK, ms=4, zorder=z + 1)


def fig_tile():
    """One knight move, its tile, and the four quarter triangles of each unit square."""
    fig, axes = plt.subplots(1, 2, figsize=(6.6, 2.6))
    e = ((0, 0), (2, 1))
    ax = axes[0]; grid(ax, 0, 2, 0, 1); frame(ax, 0, 2, 0, 1)
    ax.add_patch(mp.Polygon([(0, 0), (1, 0), (2, 1), (1, 1)], fc=TILE, ec=COL[(2, 1)], lw=1.2, zorder=2))
    edge(ax, e)
    ax.plot([1, 1], [0, 1], color=INK, lw=1, ls='--', zorder=3)
    ax = axes[1]; grid(ax, 0, 2, 0, 1, diag=True); frame(ax, 0, 2, 0, 1)
    for t in microtiles(e):
        ax.add_patch(mp.Polygon(quarter(t), fc=TILE, ec=COL[(2, 1)], lw=.8, zorder=2))
    edge(ax, e)
    save(fig, 'lb_tile')


def find_overlap(k):
    e = ((0, 0), (2, 1))
    for x in range(-2, 3):
        for y in range(-2, 3):
            for d in ((1, 2), (2, -1), (1, -2), (-2, 1), (-1, 2)):
                f = ((x, y), (x + d[0], y + d[1]))
                if f != e and len(microtiles(e) & microtiles(f)) == k:
                    return e, f


def fig_overlap():
    fig, axes = plt.subplots(1, 2, figsize=(6.6, 3.0))
    for ax, k in zip(axes, (1, 2)):
        e, f = find_overlap(k)
        xs = [p[0] for p in e + f]; ys = [p[1] for p in e + f]
        x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
        grid(ax, x0, x1, y0, y1, diag=True); frame(ax, x0, x1, y0, y1)
        A, Bq = microtiles(e), microtiles(f)
        for t in A | Bq:
            ax.add_patch(mp.Polygon(quarter(t), fc=RED if t in A & Bq else TILE, alpha=.85 if t in A & Bq else 1,
                                    ec='white', lw=.6, zorder=2))
        edge(ax, e); edge(ax, f)
    save(fig, 'lb_overlap')


def fig_tiled():
    """Tile multiplicities near a corner of a real tour (TT16, n = 48)."""
    n = 48; g = build(n)
    E = {tuple(sorted((u, v))) for u, vs in g.items() for v in vs}
    x0, x1, y0, y1 = 0, 16, 0, 10
    from collections import Counter
    C = Counter(t for e in E for t in microtiles(e))
    fig, ax = plt.subplots(figsize=(6.6, 4.3))
    frame(ax, x0, x1, y0, y1)
    for i in range(x0, x1):
        for j in range(y0, y1):
            for k in range(4):
                m = C[i, j, k]
                fc = {0: 'white', 1: TILE}.get(m, RED)
                ax.add_patch(mp.Polygon(quarter((i, j, k)), fc=fc, ec='#ffffff' if m else '#d5dbe0', lw=.4, zorder=1))
    for e in E:
        if all(x0 <= p[0] <= x1 and y0 <= p[1] <= y1 for p in e):
            ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=INK, lw=.7, zorder=3)
    ax.plot([x0, x1], [y0, y0], color=INK, lw=2); ax.plot([x0, x0], [y0, y1], color=INK, lw=2)
    save(fig, 'lb_tiled')


def fig_square(name='lb_square'):
    """One unit square (thick outline) and the knight moves whose tiles cover it. Quarters: blue = covered once,
    red = twice, white = not covered. Left: two bad quarters next to each other. Right: two bad quarters opposite."""
    LINE, MC = '#6f7d88', ['#2a78d6', '#1baf7a', '#4a3aa7']
    adjacent = [((0, 0), (1, 2)), ((0, 1), (2, 0)), ((0, 0), (2, 1))]
    opposite = [((0, 0), (1, 2)), ((0, 1), (2, 0))]
    fig, axes = plt.subplots(1, 2, figsize=(7.0, 3.2))
    for ax, moves in zip(axes, (adjacent, opposite)):
        m = [0, 0, 0, 0]
        for e in moves:
            for (i, j, k) in microtiles(e):
                if (i, j) == (0, 0):
                    m[k] += 1
        for x in range(-1, 3):
            for y in range(-1, 3):
                ax.add_patch(mp.Rectangle((x, y), 1, 1, fill=False, ec='#d5dbe0', lw=.8, zorder=0))
        # label spots chosen to stay clear of the move segments (bottom, right, top, left)
        for k, pos in enumerate([(.62, .13), (.86, .27), (.67, .86), (.14, .6)]):
            ax.add_patch(mp.Polygon(quarter((0, 0, k)), fc=TILE if m[k] == 1 else (RED if m[k] > 1 else 'white'), ec='none', zorder=1))
            ax.text(*pos, str(m[k]), ha='center', va='center', fontsize=11, color='white' if m[k] > 1 else INK, zorder=8)
        ax.plot([0, 1], [0, 1], color=LINE, lw=.9, zorder=3); ax.plot([0, 1], [1, 0], color=LINE, lw=.9, zorder=3)
        ax.add_patch(mp.Rectangle((0, 0), 1, 1, fill=False, ec=INK, lw=2, zorder=4))
        for e, c in zip(moves, MC):
            ax.plot(*zip(*e), color=c, lw=2.8, zorder=6, solid_capstyle='round')
            ax.plot(*zip(*e), 'o', color=INK, ms=5, zorder=7)
        ax.set_xlim(-.45, 2.45); ax.set_ylim(-.45, 2.45); ax.set_aspect('equal'); ax.axis('off')
    save(fig, name)


def strip_edges(kind, rows):
    E = set()
    for y in range(rows[0] - 3, rows[1] + 3):
        if kind == 'normal':     # pattern P: (0,y)-(2,y+1), (0,y)-(1,y+2), (1,y)-(3,y+1)
            E |= {((0, y), (2, y + 1)), ((0, y), (1, y + 2)), ((1, y), (3, y + 1))}
        else:                    # sharp abnormal pattern of TILE_INPUTS section 9
            E |= {((1, y), (0, y + 2)), ((2, y), (0, y + 1)), ((2, y), (1, y + 2))}
    return {tuple(sorted(e)) for e in E}


def fig_strip():
    fig, axes = plt.subplots(1, 2, figsize=(5.4, 4.6))
    rows = (0, 8)
    for ax, kind, title in zip(axes, ('normal', 'abnormal'), ('normal rows:\n1 crossing per row',
                                                             'abnormal rows:\n2 crossings per row')):
        E = strip_edges(kind, rows)
        frame(ax, 0, 3, rows[0], rows[1], pad=.5)
        ax.set_ylim(rows[0] - .5, rows[1] + .5)
        for x in range(4):
            ax.add_patch(mp.Rectangle((x - .5, rows[0] - .5), 1, rows[1] - rows[0] + 1,
                                      fc=EDGE if x < 2 else 'white', ec='none', zorder=0))
        for x in range(4):
            for y in range(rows[0], rows[1] + 1):
                ax.plot(x, y, 'o', color=GREY, ms=3, zorder=2.5)  # cells over the moves, under the crossings
        for e in E:
            ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=COL[direc(e)], lw=1.6, zorder=2)
        per_row = 0
        for e, f in combinations(sorted(E), 2):
            if cross(e, f):
                (x1, y1), (x2, y2) = e; (x3, y3), (x4, y4) = f
                dd = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
                s = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / dd
                p = (x1 + s * (x2 - x1), y1 + s * (y2 - y1))
                if rows[0] - .5 <= p[1] <= rows[1] + .5:
                    ax.plot(*p, 'o', color=RED, ms=5, zorder=3)
                if 3 <= p[1] < 4:
                    per_row += 1
        assert per_row == (1 if kind == 'normal' else 2), (kind, per_row)
        ax.plot([-.5, -.5], [rows[0] - .5, rows[1] + .5], color=INK, lw=2.5)
    save(fig, 'lb_strip')


def fig_corner_box():
    R = 12
    fig, ax = plt.subplots(figsize=(4.4, 4.4))
    frame(ax, -1, R + 3, -1, R + 3, pad=.2)
    for x in range(-1, R + 4):
        for y in range(-1, R + 4):
            if x >= 0 and y >= 0 and (x + y) % 2 == 0:
                ax.add_patch(mp.Rectangle((x - .5, y - .5), 1, 1, fc=GRID, ec='none', zorder=0))
    ax.plot([-.5, R + 3.5], [-.5, -.5], color=INK, lw=2); ax.plot([-.5, -.5], [-.5, R + 3.5], color=INK, lw=2)
    ax.add_patch(mp.Rectangle((-.5, -.5), R + 1, R + 1, fill=False, ec=DIM, lw=1, ls=':', zorder=2))
    path = [(R + .5, 1.5), (R + .5, R + .5), (1.5, R + .5)]
    ax.plot(*zip(*path), color=CORR, lw=3, zorder=3)
    ax.annotate('', xy=path[-1], xytext=(2.6, R + .5), arrowprops=dict(arrowstyle='->', color=CORR, lw=2.5))
    ax.add_patch(mp.Rectangle((-.5, R - .5), 2, 1, fc='none', ec=TEAL, lw=2, zorder=4))
    ax.add_patch(mp.Rectangle((R - .5, -.5), 1, 2, fc='none', ec=TEAL, lw=2, zorder=4))
    ax.text(R + .9, R + .9, 'charged path', color=CORR, fontsize=9)
    ax.text(1.8, R + .05, 'end row', color=TEAL, fontsize=8, va='top')
    ax.text(R + .7, .5, 'end row', color=TEAL, fontsize=8, va='center')
    ax.text(R / 2, R / 2, 'corner box', ha='center', va='center', color=INK, fontsize=9)
    save(fig, 'lb_corner_box')


def fig_nested():
    n = 48; h = n // 2
    fig, ax = plt.subplots(figsize=(5.0, 5.0))
    frame(ax, -1, n, -1, n, pad=.5)
    ax.add_patch(mp.Rectangle((-.5, -.5), n, n, fill=False, ec=INK, lw=2))
    cols = [COL[(2, 1)], COL[(2, -1)], COL[(1, 2)], COL[(1, -2)]]
    fail = 15
    for r in range(4):
        for R in range(12, h - 3):
            pts = [(R + .5, 1.5), (R + .5, R + .5), (1.5, R + .5)]
            # rotate by r quarter turns about the board centre
            for _ in range(r):
                pts = [(n - 1 - y, x) for x, y in pts]
            ls, c, lw = '-', cols[r], 1.3
            if r == 0 and R == fail:
                ls, c, lw = (0, (2, 2)), GREY, 1.3
            ax.plot(*zip(*pts), color=c, lw=lw, ls=ls)
    ax.add_patch(mp.Rectangle((-.5, fail - .5), 2, 1, fc=RED, ec='none'))
    ax.annotate('abnormal end row: one path lost', xy=(1.5, fail), xytext=(3, 23.5), fontsize=8, color=RED, va='center',
                arrowprops=dict(arrowstyle='->', color=RED, lw=1))
    save(fig, 'lb_nested')


def fig_fold_corner():
    """Tile coverage at the bottom-left corner of the n = 96 fold tour, with three corner paths and their bad squares."""
    import json
    from collections import Counter
    n = 96; x1 = y1 = 30
    t = json.load(open(ROOT / 'w-integrator/tours/FOLD24_n96.json'))['tour']
    E = {tuple(sorted(((a[1], n - 1 - a[0]), (b[1], n - 1 - b[0])))) for a, b in tour_edges(t)}
    C = Counter(q for e in E for q in microtiles(e))
    fig, ax = plt.subplots(figsize=(5.6, 5.6))
    frame(ax, 0, x1, 0, y1, pad=.3)
    for i in range(x1):
        for j in range(y1):
            for k in range(4):
                m = C[i, j, k]
                fc = {0: 'white', 1: TILE}.get(m, RED)
                ax.add_patch(mp.Polygon(quarter((i, j, k)), fc=fc, ec='#ffffff' if m else '#d5dbe0', lw=.3, zorder=1))
    for e in E:
        if all(0 <= p[0] <= x1 and 0 <= p[1] <= y1 for p in e):
            ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=INK, lw=.4, alpha=.35, zorder=2)
    for r in (13, 18, 23):
        pts = [(r + .5, 1.5), (r + .5, r + .5), (1.5, r + .5)]
        ax.plot(*zip(*pts), color=CORR, lw=2.6, zorder=4, solid_capstyle='round')
        sq = [(r, j) for j in range(1, r + 1)] + [(j, r) for j in range(r - 1, 0, -1)]
        for i, j in sq:
            if any(C[i, j, k] != 1 for k in range(4)):
                ax.add_patch(mp.Rectangle((i, j), 1, 1, fill=False, ec=INK, lw=2.4, zorder=5))
    ax.plot([0, x1], [0, 0], color=INK, lw=2); ax.plot([0, 0], [0, y1], color=INK, lw=2)
    save(fig, 'lb_fold_corner')


def fig_numberline():
    fig, ax = plt.subplots(figsize=(6.6, 1.9))
    ax.set_xlim(3.6, 12.6); ax.set_ylim(-1.3, 1.3); ax.axis('off')
    ax.plot([3.8, 12.3], [0, 0], color=INK, lw=1)
    for x in range(4, 13):
        ax.plot([x, x], [-.08, .08], color=INK, lw=1); ax.text(x, -.38, f'{x}n', ha='center', fontsize=8, color=INK)
    ax.add_patch(mp.Rectangle((5, -.06), 19 / 3 - 5, .12, fc='#f3d9d4', ec='none', zorder=1))
    pts = [(4, 'paper (lower)', GREY, -.85), (5, 'lower now', TEAL, .45), (19 / 3, 'upper now', RED, .45),
           (9, 'new heel', GREY, .45), (11.5, 'Shisheng', GREY, .85), (12, 'paper (upper)', GREY, .45)]
    for x, lab, c, yy in pts:
        ax.plot(x, 0, 'o', color=c, ms=7, zorder=3)
        ax.text(x, yy, lab, ha='center', va='center', fontsize=8, color=c if c != GREY else INK)
    save(fig, 'lb_numberline')


if __name__ == '__main__':
    fig_tile(); fig_overlap(); fig_tiled(); fig_square(); fig_strip(); fig_corner_box(); fig_nested(); fig_fold_corner()
    print('wrote', sorted(p.name for p in OUT.glob('lb_*.png')))
