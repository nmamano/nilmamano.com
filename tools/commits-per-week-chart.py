#!/usr/bin/env python3
"""
Regenerate the "Commits per Week" chart at the top of the Isomux blog post
(public/blog/isomux/commits-per-week.png).

What counts as real dev work: commits that live on GitHub. So this counts
commits per week across the authenticated user's own (non-fork) GitHub repos,
excluding bot authors. Each repo is cloned/updated into a local cache.

Shared repos (on GitHub but under another org, with co-authors) can't be
discovered automatically and shouldn't be hardcoded here, so they're read from
an OPTIONAL local config file that lives outside this repository:

    ~/.config/commit-chart/extras.json   (override with $COMMIT_CHART_EXTRAS)

    [ { "path": "~/some/local/clone", "authors": ["you@example.com"] }, ... ]

For each extra repo only the listed authors are counted (to drop co-authors).
If the file is absent the script still runs, just without those repos.

The chart buckets commits into weekly bars, overlays a 4-week rolling average,
and shades the background by "daily driver" era (Steve Yegge's agent levels).

Usage:  python3 tools/commits-per-week-chart.py
Deps:   matplotlib, numpy, and the `gh` CLI (authenticated).

By design this file contains no email address, hostname, or repo name.
"""

import datetime as dt
import json
import os
import subprocess
from collections import Counter

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

# --- config -----------------------------------------------------------------

TODAY = dt.date.today()
AXIS_START = dt.date(2024, 9, 30)          # a Monday, ~Oct 2024
AXIS_END = dt.date(2026, 9, 28)            # leave room for the "next level?" band

# Skip GitHub repos with no pushes since this date (dead/ancient projects).
ACTIVE_SINCE = "2024-06-01"

CACHE = os.path.expanduser("~/.cache/commit-chart-repos")
EXTRAS_FILE = os.environ.get(
    "COMMIT_CHART_EXTRAS", os.path.expanduser("~/.config/commit-chart/extras.json"))

# (label, start, end, background color). Boundaries are Mondays (bar starts).
ERAS = [
    ("Writing BCtCI",                       dt.date(2024, 9, 30),  dt.date(2025, 1, 6),   "#efe3c8"),
    ("Level 4\nDaily Driver: Cursor",       dt.date(2025, 1, 6),   dt.date(2025, 10, 27), "#f6e3da"),
    ("Level 5\nDaily Driver: Claude Code",  dt.date(2025, 10, 27), dt.date(2026, 3, 23),  "#dcefe0"),
    ("Level 6/7\nDaily Driver:\nIsomux",    dt.date(2026, 3, 23),  dt.date(2026, 7, 20),  "#e8ddf3"),
    ("Level 8?",                            dt.date(2026, 7, 20),  AXIS_END,              "#f2f2f2"),
]

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "blog", "isomux", "commits-per-week.png")

# --- collect commit dates ---------------------------------------------------

def sh(args):
    return subprocess.run(args, capture_output=True, text=True, check=False).stdout

def log_dates(repo_dir, authors=None):
    """Author-dates of non-merge commits, optionally filtered to `authors`.
    With no author filter, bot commits ([bot] in the author line) are dropped."""
    fmt = "%aI\t%ae" if authors is None else "%aI"
    args = ["git", "-C", repo_dir, "log", "--all", "--no-merges", f"--format={fmt}"]
    for a in (authors or []):
        args += ["--author", a]
    dates = []
    for line in sh(args).splitlines():
        line = line.strip()
        if not line:
            continue
        if authors is None:
            iso, _, email = line.partition("\t")
            if "[bot]" in email:
                continue
        else:
            iso = line
        dates.append(dt.datetime.fromisoformat(iso).date())
    return dates

def own_repos():
    login = sh(["gh", "api", "user", "--jq", ".login"]).strip()
    raw = sh(["gh", "repo", "list", login, "--source", "--limit", "300",
              "--json", "name,pushedAt"])
    names = []
    for r in json.loads(raw or "[]"):
        if r.get("pushedAt", "")[:10] >= ACTIVE_SINCE:
            names.append(r["name"])
    return login, names

def clone_or_update(url, dest):
    if os.path.isdir(os.path.join(dest, ".git")):
        sh(["git", "-C", dest, "fetch", "-q", "--all"])
    else:
        subprocess.run(["gh", "repo", "clone", url, dest, "--", "-q"], check=False)

def collect():
    dates = []
    os.makedirs(CACHE, exist_ok=True)

    login, names = own_repos()
    for name in names:
        dest = os.path.join(CACHE, name)
        clone_or_update(f"{login}/{name}", dest)
        dates += log_dates(dest)             # all authors, bots excluded

    if os.path.isfile(EXTRAS_FILE):
        for spec in json.load(open(EXTRAS_FILE)):
            path = os.path.expanduser(spec["path"])
            if os.path.isdir(os.path.join(path, ".git")):
                dates += log_dates(path, authors=spec.get("authors"))
    return dates

# --- build weekly series ----------------------------------------------------

def week_start(d):
    return d - dt.timedelta(days=d.weekday())

def main():
    counts = Counter(week_start(d) for d in collect())

    weeks = []
    w = AXIS_START
    while w <= AXIS_END:
        weeks.append(w)
        w += dt.timedelta(days=7)

    # Only plot up to the current (in-progress) week; leave the future empty.
    cur_week = week_start(TODAY)
    data_weeks = [w for w in weeks if w <= cur_week]
    y = np.array([counts.get(w, 0) for w in data_weeks], dtype=float)
    x = [dt.datetime(w.year, w.month, w.day) for w in data_weeks]

    roll = np.full(len(y), np.nan)
    for i in range(len(y)):
        roll[i] = y[max(0, i - 3):i + 1].mean()

    # --- plot ---
    fig, ax = plt.subplots(figsize=(11, 3.2), dpi=600)
    ymax = 175

    for label, s, e, color in ERAS:
        ax.axvspan(dt.datetime(s.year, s.month, s.day),
                   dt.datetime(e.year, e.month, e.day), color=color, zorder=0)
        mid = (dt.datetime(s.year, s.month, s.day).toordinal()
               + dt.datetime(e.year, e.month, e.day).toordinal()) // 2
        ax.text(dt.datetime.fromordinal(mid), ymax * 0.93, label, ha="center",
                va="top", fontsize=8.5, color="#3a3a3a", fontweight="bold",
                linespacing=1.15)

    for _, s, _, _ in ERAS[1:]:
        ax.axvline(dt.datetime(s.year, s.month, s.day), color="#999",
                   lw=0.7, ls=(0, (4, 3)), zorder=1)

    ax.bar(x, y, width=5.2, color="#9cc3e0", edgecolor="none", zorder=2,
           label="Weekly commits")
    ax.plot(x, roll, color="#c0392b", lw=1.6, zorder=3, label="4-week rolling avg")

    ax.annotate("today", xy=(x[-1], roll[-1]),
                xytext=(dt.datetime(2026, 8, 15), 120), fontsize=8.5, color="#222",
                arrowprops=dict(arrowstyle="->", color="#222", lw=1.1))

    ax.set_ylim(0, ymax)
    ax.set_xlim(dt.datetime(AXIS_START.year, AXIS_START.month, AXIS_START.day),
                dt.datetime(AXIS_END.year, AXIS_END.month, AXIS_END.day))
    ax.set_ylabel("Commits", fontsize=9)
    ax.set_title("Commits per Week", fontsize=12, fontweight="bold")
    ax.xaxis.set_major_locator(mdates.MonthLocator(interval=3))
    ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y"))
    ax.tick_params(labelsize=8)
    ax.set_yticks(range(0, ymax + 1, 25))
    for spine in ["top", "right"]:
        ax.spines[spine].set_visible(False)
    ax.legend(loc="lower right", fontsize=7.5, framealpha=0.9)

    plt.tight_layout()
    plt.savefig(OUT, dpi=600, bbox_inches="tight")
    print(f"wrote {os.path.normpath(OUT)}")
    print(f"commits plotted: {int(y.sum())}  peak week: {int(y.max())}  "
          f"peak rolling avg: {np.nanmax(roll):.1f}")

if __name__ == "__main__":
    main()
