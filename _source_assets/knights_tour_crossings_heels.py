# Heel progression figures for blog/knights-tour-crossings.mdx, in the style of the turns post (band_paths_fig.py):
# the bottom band of a real 96 x 96 tour, with the 4 paths of one formation in red, green, blue and purple,
# and dashed boxes on the heels those paths use. The same 48-column window in every figure, so the boxes line up.
# Tours come from the interactive demo's generators (knight-formation-research/demo/build_data.py):
# paper = Parker's crossing heel (28 per 8 columns), P40 = Shisheng Li's 40-column block, H16a = new heel
# (16 per 8 columns).
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_crossings_heels.py
import sys
from pathlib import Path
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, matplotlib.patches as mp, networkx as nx
ROOT = Path.home() / 'nil/knight-formation-research'
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / 'demo'))
import build_data as B
from kt.core import MI, MJ
OUT = Path(__file__).resolve().parents[1] / 'public/blog/knights-tour-crossings'
INK = '#22303a'; COLS = ['#e41a1c', '#2e8b57', '#1f4fe0', '#9b30d9']

def graph(gen, n):
    grid = gen(n)[0]; g = {}
    for i, row in enumerate(grid):
        for j, code in enumerate(row):
            x, y = j, n - 1 - i
            g[x, y] = [(x + MJ[int(k)], y - MI[int(k)]) for k in code]
    return g

def lane_paths(g, p0, X0, X1, Y1):
    LANE = range(p0, p0 + 4)
    W = {(x, y) for x in range(X0, X1) for y in range(0, Y1)}
    G = nx.Graph(); G.add_nodes_from(W)
    for u in W:
        for v in g[u]:
            if v in W: G.add_edge(u, v)
    paths = []
    for c in nx.connected_components(G):
        top = sorted(p for p in c if p[1] == Y1 - 1)
        if len(top) == 2 and any(p[0] + 2 * p[1] in LANE for p in top):
            paths.append(c)
    entry = lambda c: next(p[0] + 2 * p[1] for p in c if p[1] == Y1 - 1 and p[0] + 2 * p[1] in LANE)
    paths.sort(key=entry)
    return paths, [entry(c) for c in paths] == list(LANE), W

def draw(key, n, p0, X0, X1, boxes, out):
    g = graph(B.GEN[key], n)
    Y1 = 7
    paths, ok, W = lane_paths(g, p0, X0, X1, Y1)
    print(key, 'p0', p0, 'ok', ok, len(paths))
    fig, ax = plt.subplots(figsize=(9.6 * (X1 - X0) / 34, 2.9))
    ax.set_xlim(X0 - .6, X1 - .4); ax.set_ylim(-.9, Y1 - .4); ax.set_aspect('equal'); ax.axis('off')
    for x in range(X0, X1):
        for y in range(0, Y1):
            if (x + y) % 2 == 0: ax.add_patch(mp.Rectangle((x - .5, y - .5), 1, 1, color='#eef1f4', lw=0, zorder=0))
    if boxes:
        a0, w, k = boxes      # first box column (absolute), box width, number of boxes
        ax.add_patch(mp.Rectangle((a0 - .5, -.5), w * k, 4, fill=False, ec=INK, lw=1.4, ls='--', zorder=6))
        for i in range(1, k):
            ax.plot([a0 + i * w - .5] * 2, [-.5, 3.5], color=INK, lw=1.4, ls='--', zorder=6)
    ax.plot([X0 - .5, X1 - .5], [-.5, -.5], color=INK, lw=2, zorder=1)
    drawn = set()
    for u in W:
        for v in g[u]:
            e = tuple(sorted((u, v)))
            if e in drawn: continue
            drawn.add(e)
            col, lw, z = '#c3ccd4', .8, 2
            for k, c in enumerate(paths):
                if u in c and v in c: col, lw, z = COLS[k], 2.4, 3
            ax.plot([e[0][0], e[1][0]], [e[0][1], e[1][1]], color=col, lw=lw, zorder=z, solid_capstyle='round')
    for k, c in enumerate(paths):
        ax.plot([p[0] for p in c], [p[1] for p in c], 'o', color=COLS[k], ms=3.5, zorder=4)
    fig.savefig(OUT / out, bbox_inches='tight', dpi=160, facecolor='white'); plt.close(fig)

if __name__ == '__main__':
    for key, p0, boxes, out in [('paper', 26, (22, 8, 2), 'heel_parker.png'),     # heels start at x = 6 + 8k
                                ('P40', 26, (6, 40, 1), 'heel_shisheng.png'),     # blocks start at x = 6
                                ('H16a', 24, (20, 8, 2), 'heel_new.png')]:
        draw(key, 96, p0, 2, 50, boxes, out)
