#!/usr/bin/env python3
"""Generate the diagram set for blog/self-improving-agents.mdx.

One shared visual language across all diagrams:
  - amber  = human-maintained
  - gray   = frozen (nobody touches it during the run)
  - green  = system-editable
Run: python3 tools/self-improving-diagrams.py
Outputs SVGs into public/blog/self-improving-agents/.
"""
import os
import re

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "blog", "self-improving-agents")

# palette
BG = "#0e1526"
PANEL = "#141d33"
TEXT = "#e8ecf4"
DIM = "#8fa0b8"
HUMAN = "#e8a33d"
FROZEN = "#7d8799"
SYS = "#4ade80"
FLOW = "#5b87c9"  # neutral activity arrows (attempts / results), distinct from the 3 legend states
FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'DejaVu Sans', sans-serif"

ARROW_DEFS = """
  <defs>
    <marker id="ah" markerWidth="9" markerHeight="7" refX="7.2" refY="3.5" orient="auto">
      <polygon points="0 0, 8 3.5, 0 7" fill="{c}"/>
    </marker>
  </defs>
"""


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;")


class D:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.parts = []
        self.markers = {}

    def marker(self, color):
        key = color.replace("#", "m")
        if key not in self.markers:
            self.markers[key] = (
                f'<marker id="{key}" markerWidth="9" markerHeight="7" refX="7.2" refY="3.5" '
                f'orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="{color}"/></marker>'
            )
        return key

    def box(self, x, y, w, h, color, title=None, sub=None, dashed=False, fill_op=0.10,
            title_size=13.5, rx=12, faded=False, title_dy=24):
        op = 0.45 if faded else 1.0
        dash = ' stroke-dasharray="7 5"' if dashed else ""
        self.parts.append(
            f'<g opacity="{op}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
            f'fill="{color}" fill-opacity="{fill_op}" stroke="{color}" stroke-width="1.6"{dash}/>'
        )
        if title:
            self.parts.append(
                f'<text x="{x + w / 2}" y="{y + title_dy}" text-anchor="middle" fill="{TEXT}" '
                f'font-family="{FONT}" font-size="{title_size}" font-weight="600">{esc(title)}</text>'
            )
        if sub:
            self.parts.append(
                f'<text x="{x + w / 2}" y="{y + title_dy + 17}" text-anchor="middle" fill="{DIM}" '
                f'font-family="{FONT}" font-size="11">{esc(sub)}</text>'
            )
        self.parts.append("</g>")

    def chip(self, cx, cy, label, color, w=None, dashed=False, faded=False):
        w = w or (len(label) * 6.3 + 20)
        h = 22
        dash = ' stroke-dasharray="5 4"' if dashed else ""
        op = 0.5 if faded else 1.0
        self.parts.append(
            f'<g opacity="{op}"><rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="11" '
            f'fill="{color}" fill-opacity="0.13" stroke="{color}" stroke-width="1.1"{dash}/>'
            f'<text x="{cx}" y="{cy + 3.8}" text-anchor="middle" fill="{TEXT}" '
            f'font-family="{FONT}" font-size="10.8">{esc(label)}</text></g>'
        )
        return w

    def text(self, x, y, s, size=11.5, color=None, anchor="middle", weight="normal", style=None):
        color = color or DIM
        it = ' font-style="italic"' if style == "italic" else ""
        self.parts.append(
            f'<text x="{x}" y="{y}" text-anchor="{anchor}" fill="{color}" font-family="{FONT}" '
            f'font-size="{size}" font-weight="{weight}"{it}>{esc(s)}</text>'
        )

    def arrow(self, path, color, label=None, lx=None, ly=None, dashed=False, width=1.6,
              label_color=None, faded=False, lw=None):
        mk = self.marker(color)
        dash = ' stroke-dasharray="6 5"' if dashed else ""
        op = 0.55 if faded else 1.0
        self.parts.append(
            f'<path d="{path}" fill="none" stroke="{color}" stroke-width="{width}" '
            f'marker-end="url(#{mk})" opacity="{op}"{dash}/>'
        )
        if label:
            if lx is None:
                # place the label pill at the geometric midpoint of the path
                nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", path)]
                pts = list(zip(nums[0::2], nums[1::2]))
                if len(pts) == 4:  # cubic bezier at t=0.5
                    lx = (pts[0][0] + 3 * pts[1][0] + 3 * pts[2][0] + pts[3][0]) / 8
                    ly = (pts[0][1] + 3 * pts[1][1] + 3 * pts[2][1] + pts[3][1]) / 8
                else:  # straight line
                    lx = (pts[0][0] + pts[-1][0]) / 2
                    ly = (pts[0][1] + pts[-1][1]) / 2
            label_color = label_color or TEXT  # uniform white labels for readability
            wpx = lw or (len(label) * 6.2 + 14)
            self.parts.append(
                f'<g opacity="{op}"><rect x="{lx - wpx / 2}" y="{ly - 10}" width="{wpx}" height="20" rx="10" '
                f'fill="{BG}" stroke="none"/>'
                f'<text x="{lx}" y="{ly + 4}" text-anchor="middle" fill="{label_color}" '
                f'font-family="{FONT}" font-size="11">{esc(label)}</text></g>'
            )

    def person(self, cx, cy, color, scale=1.0):
        s = scale
        self.parts.append(
            f'<g stroke="{color}" stroke-width="{1.7 * s}" fill="none" stroke-linecap="round">'
            f'<circle cx="{cx}" cy="{cy - 9 * s}" r="{5.5 * s}"/>'
            f'<path d="M {cx - 9 * s} {cy + 11 * s} C {cx - 9 * s} {cy - 1 * s}, {cx + 9 * s} {cy - 1 * s}, {cx + 9 * s} {cy + 11 * s}"/></g>'
        )

    def task_cards(self, x, y, color, n=3, w=132, h=30, label_prefix="task", checks=True, faded=False):
        op = 0.5 if faded else 1.0
        for i in range(n):
            yy = y + i * (h + 8)
            self.parts.append(
                f'<g opacity="{op}"><rect x="{x}" y="{yy}" width="{w}" height="{h}" rx="7" '
                f'fill="{PANEL}" stroke="{color}" stroke-width="1.2"/>'
                f'<text x="{x + 12}" y="{yy + 19}" fill="{TEXT}" font-family="{FONT}" font-size="11">{label_prefix} {i + 1}</text>'
            )
            if checks:
                cbx, cby = x + w - 26, yy + 8
                self.parts.append(
                    f'<rect x="{cbx}" y="{cby}" width="14" height="14" rx="4" fill="none" '
                    f'stroke="{color}" stroke-width="1.2"/>'
                    f'<path d="M {cbx + 3.2} {cby + 7.2} L {cbx + 6} {cby + 10} L {cbx + 11} {cby + 4}" '
                    f'fill="none" stroke="{color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
                )
            self.parts.append("</g>")

    def tree(self, cx, cy, color, s=1.0):
        """small archive-tree glyph"""
        pts = {
            "r": (cx, cy - 16 * s), "a": (cx - 22 * s, cy + 2 * s), "b": (cx + 2 * s, cy + 2 * s),
            "c": (cx + 24 * s, cy + 2 * s), "d": (cx - 10 * s, cy + 20 * s), "e": (cx + 12 * s, cy + 20 * s),
        }
        edges = [("r", "a"), ("r", "b"), ("r", "c"), ("b", "d"), ("b", "e")]
        for u, v in edges:
            (x1, y1), (x2, y2) = pts[u], pts[v]
            self.parts.append(
                f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.3" opacity="0.9"/>'
            )
        for k, (x, y) in pts.items():
            fill = color if k in ("r", "b", "e") else PANEL
            self.parts.append(
                f'<circle cx="{x}" cy="{y}" r="{5 * s}" fill="{fill}" stroke="{color}" stroke-width="1.3"/>'
            )

    def legend(self, y=None, x=None):
        y = y or self.h - 26
        entries = [("hand-coded", HUMAN), ("self-modifiable", SYS)]
        total = sum(len(t) * 6.4 + 46 for t, _ in entries)
        cx = x if x is not None else (self.w - total) / 2
        for label, color in entries:
            self.parts.append(
                f'<rect x="{cx}" y="{y - 9}" width="18" height="12" rx="4" fill="{color}" '
                f'fill-opacity="0.18" stroke="{color}" stroke-width="1.3"/>'
                f'<text x="{cx + 26}" y="{y + 2}" fill="{DIM}" font-family="{FONT}" font-size="11.5">{label}</text>'
            )
            cx += len(label) * 6.4 + 46

    def title(self, stage, name):
        self.parts.append(
            f'<text x="34" y="40" fill="{DIM}" font-family="{FONT}" font-size="12" '
            f'letter-spacing="2.5" font-weight="600">{esc(stage.upper())}</text>'
            f'<text x="34" y="64" fill="{TEXT}" font-family="{FONT}" font-size="17" font-weight="700">{esc(name)}</text>'
        )

    def render(self):
        defs = "<defs>" + "".join(self.markers.values()) + "</defs>"
        body = "".join(self.parts)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" '
            f'font-family="{FONT}">'
            f'<rect width="{self.w}" height="{self.h}" rx="16" fill="{BG}"/>'
            f"{defs}{body}</svg>"
        )


# ---------------------------------------------------------------- shared scene pieces

def humans_box(d, state=HUMAN, y=225, label="Humans", sub=None, faded=False):
    d.box(36, y, 118, 96, state, faded=faded)
    d.person(95, y + 38, state)
    d.text(95, y + 72, label, 12.5, TEXT if not faded else DIM, weight="600")
    if sub:
        d.text(95, y + 88, sub, 10.5)


def model_box(d, color=HUMAN, x=355, y=368, sub="(weights)", dashed=False):
    d.box(x, y, 155, 52, color, "Model (LLM)", dashed=dashed, title_dy=22)
    d.text(x + 77, y + 40, sub, 10.5)


def task_panel(d, color=HUMAN, x=662, y=190, title="Task set", n=3, caption=False, archive=False):
    if archive:
        d.box(x, y, 182, 190, color, title, title_dy=26)
        d.tree(x + 91, y + 100, color, s=1.8)
        d.text(x + 91, y + 168, "archive of tasks", 10.5, TEXT)
        return
    h = 44 + n * 38 + (26 if caption else 6)
    d.box(x, y, 182, h, color, title, title_dy=26)
    d.task_cards(x + 25, y + 40, color, n=n)
    if caption:
        d.text(x + 91, y + h - 12, "each task has a verifiable reward", 10)


def agent_box(d, color, x=330, y=195, w=205, h=125, title="Task agent", chips=("prompts", "tools", "memory"),
              title_size=13.5):
    d.box(x, y, w, h, color, title, sub="(the harness)", title_size=title_size)
    widths = [len(c) * 6.3 + 20 for c in chips]
    total = sum(widths) + 8 * (len(chips) - 1)
    cx = x + (w - total) / 2
    for c, cw in zip(chips, widths):
        d.chip(cx + cw / 2, y + h - 30, c, color, w=cw)
        cx += cw + 8


# ---------------------------------------------------------------- scenes

def stage1():
    d = D(880, 520)
    d.title("stage 1", "The hand-coded agent")
    humans_box(d, y=209)
    agent_box(d, HUMAN)
    model_box(d)
    task_panel(d, caption=True)
    # arrows (labels auto-centered on each arrow's midpoint)
    d.arrow("M 154 257 L 326 257", HUMAN, "write and iterate")
    d.arrow("M 120 209 C 240 84, 500 78, 742 189", HUMAN, "curate")
    # humans right edge -> model left edge, straight to stand apart from the arcs
    d.arrow("M 154 296 L 351 382", HUMAN, "trained beforehand")
    d.arrow("M 432 324 L 432 364", FLOW, "calls")
    d.arrow("M 539 238 L 658 238", FLOW, "attempts", label_color=TEXT)
    # task set bottom edge -> humans bottom edge, wide open arc below the model
    d.arrow("M 753 375 C 700 510, 240 520, 62 308", FLOW, "results + traces", label_color=TEXT)
    return d


def stage2():
    d = D(880, 420)
    d.title("stage 2", "The meta agent")
    humans_box(d, y=170, sub=None)
    # improvement loop container, same geometry it keeps through stages 3-5
    d.box(240, 84, 330, 218, HUMAN, "Improvement loop", fill_op=0.06, title_dy=26)
    d.box(272, 128, 266, 44, HUMAN, "Meta agent", title_size=12.5, title_dy=28)
    d.box(272, 236, 266, 44, SYS, "Task agent", title_size=12.5, title_dy=28)
    d.arrow("M 405 176 L 405 232", SYS, "modifies code")
    model_box(d, y=338, x=328)
    task_panel(d, x=680, y=130)
    d.arrow("M 154 195 L 236 195", HUMAN, "write")
    d.arrow("M 154 258 L 268 258", HUMAN, "write v0", lx=192, ly=258)
    d.arrow("M 405 284 L 405 334", FLOW, "calls", lx=405, ly=318)
    d.arrow("M 542 258 L 676 258", FLOW, "attempts", label_color=TEXT)
    d.arrow("M 720 126 C 690 58, 570 48, 500 124", FLOW, "results + traces", label_color=TEXT)
    return d


def stage3():
    d = D(880, 440)
    d.title("stage 3", "The self-referential meta agent")
    humans_box(d, y=195, sub=None)
    # same skeleton as stage 2: the meta agent turns green and gains a self-loop
    d.box(240, 84, 330, 242, HUMAN, "Improvement loop", fill_op=0.06, title_dy=26)
    d.box(272, 132, 266, 44, SYS, "Meta agent", title_size=12.5, title_dy=28)
    d.box(272, 260, 266, 44, SYS, "Task agent", title_size=12.5, title_dy=28)
    # meta agent modifies the task agent AND itself; one shared label
    d.arrow("M 440 180 L 440 256", SYS)
    d.arrow("M 340 180 C 316 224, 402 224, 378 184", SYS)
    d.text(398, 234, "modifies code", 11, TEXT)
    model_box(d, y=360, x=328)
    task_panel(d, x=680, y=130)
    d.arrow("M 154 220 L 236 220", HUMAN, "write")
    d.arrow("M 115 192 C 140 130, 200 128, 268 150", HUMAN, "write v0")
    d.arrow("M 154 282 L 268 282", HUMAN, "write v0", lx=192, ly=282)
    d.arrow("M 405 308 L 405 356", FLOW, "calls", lx=405, ly=340)
    d.arrow("M 542 282 L 676 282", FLOW, "attempts", label_color=TEXT)
    d.arrow("M 720 126 C 690 58, 570 50, 500 128", FLOW, "results + traces", label_color=TEXT)
    return d


def outer_loop_scene(loop_color, stage_label, name, humans_loop_label, note=None, agent_arrow=True):
    d = D(880, 500)
    d.title(stage_label, name)
    humans_box(d, y=250, sub=None)
    d.box(240, 118, 330, 262, loop_color, "Open-ended loop", fill_op=0.06, title_dy=26)
    d.tree(300, 156, loop_color)
    d.text(300, 192, "archive of variants", 10.5, TEXT)
    # agent inside
    d.box(272, 250, 266, 108, SYS, "Self-referential meta agent", sub="sampled from the archive",
          title_size=12.5)
    d.chip(345, 330, "Task agent", SYS)
    d.chip(462, 330, "Meta agent", SYS)
    # archive <-> agent, routed through the empty right half of the loop
    d.arrow("M 345 170 C 430 180, 470 210, 470 246", loop_color, "sample")
    d.arrow("M 330 246 C 315 230, 305 214, 300 194", SYS, "add child", lx=310, ly=222)
    model_box(d, y=420, x=328)
    task_panel(d, x=680, y=230)
    d.arrow("M 154 280 L 236 280", HUMAN, humans_loop_label)
    if agent_arrow:
        d.arrow("M 154 325 L 268 325", HUMAN, "write v0", lx=192, ly=325)
    d.arrow("M 405 362 L 405 416", FLOW, "calls", lx=405, ly=400)
    d.arrow("M 542 292 L 676 292", FLOW, "attempts", lx=625, ly=292, label_color=TEXT)
    d.arrow("M 676 330 L 542 330", FLOW, "results + traces", lx=625, ly=330, label_color=TEXT, lw=96)
    if note:
        for i, line in enumerate(note.split("\n")):
            d.text(755, 432 + i * 15, line, 10.5, loop_color, style="italic")
    return d


def stage4():
    return outer_loop_scene(HUMAN, "stage 4", "Agent exploration", "write")


def stage5():
    return outer_loop_scene(
        SYS, "frontier 1", "Co-Evolving Agent Exploration", "write v0", agent_arrow=False,
    )


def direction_tasks():
    d = D(880, 620)
    d.title("frontier 2", "Co-Evolving Tasks")
    humans_box(d, y=250, sub=None)
    d.box(240, 118, 330, 326, HUMAN, "Open-ended loop", fill_op=0.06, title_dy=26)
    d.tree(300, 156, HUMAN)
    d.text(300, 192, "archive of variants", 10.5, TEXT)
    d.arrow("M 340 206 C 365 224, 385 232, 400 246", HUMAN, "sample")
    d.arrow("M 315 246 C 300 234, 293 226, 290 210", SYS, "add child")
    d.box(272, 250, 266, 108, SYS, "Self-referential meta agent", sub="sampled from the archive",
          title_size=12.5)
    d.chip(345, 330, "Task agent", SYS)
    d.chip(462, 330, "Meta agent", SYS)
    d.box(340, 378, 180, 44, HUMAN, "Task-generator agent", title_size=11.5, title_dy=28)
    model_box(d, y=490, x=300)
    task_panel(d, color=SYS, x=690, y=254, title="Task set", archive=True)
    d.arrow("M 154 280 L 236 280", HUMAN, "write")
    d.arrow("M 154 325 L 268 325", HUMAN, "write v0", lx=192, ly=325)
    d.arrow("M 95 350 C 95 590, 520 660, 755 448", HUMAN, "seed tasks", lx=145, ly=472)
    d.arrow("M 310 362 L 310 486", FLOW, "calls", lx=310, ly=412)
    d.arrow("M 430 426 L 430 486", FLOW, "calls", lx=430, ly=458)
    d.arrow("M 542 292 L 686 292", FLOW, "attempts", lx=630, ly=292, label_color=TEXT)
    d.arrow("M 686 330 L 542 330", FLOW, "results + traces", lx=630, ly=330, label_color=TEXT, lw=96)
    d.arrow("M 686 388 L 524 388", FLOW, "tasks + results", lx=620, ly=388, lw=92, label_color=TEXT)
    d.arrow("M 524 412 L 686 412", SYS, "generated tasks", lx=620, ly=412, lw=96)
    return d


def direction_model():
    d = D(880, 570)
    d.title("frontier 3", "Co-Evolving Models")
    humans_box(d, y=250, sub=None)
    d.box(240, 118, 330, 266, HUMAN, "RL training loop", fill_op=0.06, title_dy=26)
    d.box(272, 180, 266, 44, HUMAN, "Task agent", title_size=12.5, title_dy=28)
    d.box(340, 290, 180, 44, HUMAN, "Task-generator agent", title_size=11.5, title_dy=28)
    model_box(d, color=SYS, y=430, x=300, sub="weights updated by RL")
    task_panel(d, color=SYS, x=690, y=180, title="Task set", archive=True)
    d.arrow("M 154 280 L 236 280", HUMAN, "write")
    d.arrow("M 95 350 C 95 560, 520 620, 755 374", HUMAN, "seed tasks", lx=145, ly=462)
    d.arrow("M 140 350 C 175 400, 215 435, 296 450", HUMAN, "train v0", lx=200, ly=410)
    d.arrow("M 310 228 L 310 426", FLOW, "calls", lx=310, ly=402)
    d.arrow("M 430 338 L 430 426", FLOW, "calls", lx=430, ly=408)
    d.arrow("M 510 388 C 550 435, 510 455, 459 448", SYS, "trains", lx=548, ly=428)
    d.arrow("M 542 195 L 686 195", FLOW, "attempts", lx=630, ly=195, label_color=TEXT)
    d.arrow("M 686 218 L 542 218", FLOW, "rewards", lx=630, ly=218, label_color=TEXT)
    d.arrow("M 686 305 L 524 305", FLOW, "tasks + results", lx=620, ly=305, lw=92, label_color=TEXT)
    d.arrow("M 524 325 L 686 325", SYS, "generated tasks", lx=620, ly=325, lw=96)
    return d


def final():
    d = D(880, 575)
    d.title("the ideal state", "Everything Co-Evolves")
    humans_box(d, y=250, sub=None)
    d.box(240, 118, 330, 326, SYS, "Open-ended loop", fill_op=0.06, title_dy=26)
    d.tree(300, 156, SYS)
    d.text(300, 192, "archive of variants", 10.5, TEXT)
    d.arrow("M 340 206 C 365 224, 385 232, 400 246", SYS, "sample")
    d.arrow("M 315 246 C 300 234, 293 226, 290 210", SYS, "add child")
    d.box(272, 250, 266, 108, SYS, "Self-referential meta agent", sub="code + memory",
          title_size=12.5)
    d.chip(345, 330, "Task agent", SYS)
    d.chip(462, 330, "Meta agent", SYS)
    d.box(340, 378, 180, 44, SYS, "Task-generator agent", title_size=11.5, title_dy=28)
    model_box(d, color=SYS, y=490, x=300, sub="weights updated by RL")
    task_panel(d, color=SYS, x=690, y=254, title="Task set", archive=True)
    d.arrow("M 154 298 L 236 298", HUMAN, "write v0", lx=192, ly=298)
    d.arrow("M 95 350 C 95 580, 520 650, 755 448", HUMAN, "seed tasks", lx=158, ly=486)
    d.arrow("M 140 350 C 180 440, 220 490, 296 508", HUMAN, "train v0", lx=196, ly=444)
    d.arrow("M 310 362 L 310 486", FLOW, "calls", lx=310, ly=412)
    d.arrow("M 430 426 L 430 486", FLOW, "calls", lx=430, ly=458)
    d.arrow("M 510 448 C 550 495, 510 515, 459 508", SYS, "trains", lx=527, ly=490)
    d.arrow("M 542 292 L 686 292", FLOW, "attempts", lx=630, ly=292, label_color=TEXT)
    d.arrow("M 686 330 L 542 330", FLOW, "results + traces", lx=630, ly=330, label_color=TEXT, lw=96)
    d.arrow("M 686 388 L 524 388", FLOW, "tasks + results", lx=620, ly=388, lw=92, label_color=TEXT)
    d.arrow("M 524 412 L 686 412", SYS, "generated tasks", lx=620, ly=412, lw=96)
    return d


SCENES = {
    "stage1": stage1, "stage2": stage2, "stage3": stage3, "stage4": stage4,
    "stage5": stage5,
    "direction-tasks": direction_tasks, "direction-model": direction_model,
    "final": final,
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in SCENES.items():
        svg = fn().render()
        path = os.path.join(OUT, f"{name}.svg")
        with open(path, "w") as f:
            f.write(svg)
        print("wrote", path)
