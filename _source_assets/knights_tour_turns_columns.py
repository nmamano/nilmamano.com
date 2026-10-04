# Four-panel figure for the four-column argument in blog/knights-tour-turns.mdx.
# One panel per column (labeled 1-4 to match the post; 0-indexed in the code), with every knight move from one cell, labeled.
# Adapted from knight-formation-research/explain/turns_lemma.py.
# Run: ~/nil/knight-formation-research/.venv/bin/python _source_assets/knights_tour_turns_columns.py
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrowPatch

INK, MUTED, GRAY = '#22303a', '#9aa7b0', '#7d878f'
TEAL, ORANGE, PURPLE = '#0b7a75', '#b5651d', '#5b4b9a'
ROWS, NCOLS = 7, 6
MOVES = [(1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (-1, 2)]

def board(ax, label, color, band, tint):
    ax.set_xlim(-0.6, NCOLS - 0.4); ax.set_ylim(-1.2, ROWS - 0.4); ax.set_aspect('equal'); ax.axis('off')
    for x in range(NCOLS):
        for y in range(ROWS):
            # Highlighted columns get one solid tint, with no checkerboard.
            fc = tint if x in band else ('#eef1f3' if (x + y) % 2 else '#ffffff')
            ax.add_patch(Rectangle((x - .5, y - .5), 1, 1, fc=fc, ec='#d5dbe0', lw=.8))
        ax.text(x, -0.8, f'col {x + 1}', ha='center', va='center', fontsize=13, color='#4a5862')
    ax.plot([-.5, -.5], [-.5, ROWS - .5], color=INK, lw=3)
    ax.set_title(label, fontsize=17, color=color, fontweight='bold', pad=8)

def panel(ax, col, label, color, kind, band, tint):
    board(ax, label, color, band, tint)
    c = (col, 3)
    for dx, dy in MOVES:
        x, y = col + dx, 3 + dy
        if not 0 <= x < NCOLS:
            continue
        name, counted = kind(x)
        ax.add_patch(FancyArrowPatch(c, (x, y), arrowstyle='-|>', mutation_scale=13,
                                     color=color if counted else GRAY, lw=2.2 if counted else 1.5,
                                     ls='-' if counted else (0, (3, 3)), shrinkA=6, shrinkB=9))
        ax.text(x + (0.12 if x == 0 else 0), y + (0.3 if dy > 0 else -0.3), name, ha='center', va='center', fontsize=12.5,
                color=color if counted else GRAY, fontweight='bold' if counted else 'normal',
                bbox=dict(boxstyle='round,pad=0.12', fc='white', ec='none', alpha=.85))
    ax.plot(*c, 'o', ms=10, color=color, zorder=5)

def outward(x):
    return ('outward', True) if x in (0, 3) else ('not outward', False)

fig, axs = plt.subplots(1, 4, figsize=(20, 6.2))
panel(axs[0], 0, 'Column 1', TEAL, lambda x: ('right', True), {0}, '#d7ecea')
panel(axs[1], 1, 'Column 2', ORANGE, outward, {1, 2}, '#f3e6d3')
panel(axs[2], 2, 'Column 3', ORANGE, outward, {1, 2}, '#f3e6d3')
panel(axs[3], 3, 'Column 4', PURPLE, lambda x: ('right', True) if x > 3 else ('back', False), {3}, '#e3e0f0')
plt.tight_layout(w_pad=2.5)
plt.savefig('public/blog/knights-tour-turns/four_columns.png', dpi=170, facecolor='white', bbox_inches='tight')
