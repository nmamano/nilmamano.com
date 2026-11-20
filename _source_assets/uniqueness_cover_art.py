# Glowing point-cloud art for the /blog/uniqueness cover: a latent space as a
# dotted cube, with a wavy surface of points colored by height and one bright
# point. Writes the cover directly: public/blog/uniqueness/cover.png (2400x1260,
# the 1200x630 cover at 2x). Run from _source_assets.
import numpy as np
from PIL import Image, ImageFilter
from matplotlib import colormaps
from matplotlib.colors import LinearSegmentedColormap
CMAP = LinearSegmentedColormap.from_list('u', ['#2b6cff', '#7a4dff', '#d63cff', '#ff3d6e', '#ff6a2b', '#ffd23a', '#7dff5a', '#2ee6d6', '#2b6cff'])
rng = np.random.default_rng(5)
W, H = 2400, 1260
K = H / 1200
buf = np.zeros((H, W, 3), np.float32)
def project(x, y, z):
    c, s = np.cos(np.pi / 6), np.sin(np.pi / 6)
    px = (x - y) * c
    py = (x + y) * s - z
    return W / 2 + px * 540 * K, H / 2 + (py * 540 + 40) * K
def splat(x, y, z, rgb, a):
    px, py = project(x, y, z)
    ix, iy = px.astype(int), py.astype(int)
    ok = (ix >= 0) & (ix < W - 1) & (iy >= 0) & (iy < H - 1)
    ix, iy, w = ix[ok], iy[ok], (rgb * a[:, None])[ok]
    for dx in (0, 1):
        for dy in (0, 1):
            np.add.at(buf, (iy + dy, ix + dx), w * 0.25)
# the cube: sparse faint dots in the volume, denser on the edges
n = 60000
cube = rng.uniform(-1, 1, (n, 3))
splat(cube[:, 0], cube[:, 1], cube[:, 2] * 0.9, np.full((n, 3), 0.85), np.full(n, 0.5))
e = 22000
t = rng.uniform(-1, 1, e); ax = rng.integers(0, 3, e); sx = rng.choice([-1, 1], e); sy = rng.choice([-1, 1], e)
P = np.zeros((e, 3)); P[np.arange(e), ax] = t
o1, o2 = (ax + 1) % 3, (ax + 2) % 3
P[np.arange(e), o1] = sx; P[np.arange(e), o2] = sy
splat(P[:, 0], P[:, 1], P[:, 2] * 0.9, np.full((e, 3), 0.8), np.full(e, 0.22))
# the surface: petals around a dip, points colored by height
m = 290000
r = np.sqrt(rng.uniform(0, 1, m)) * 0.78
th = rng.uniform(0, 2 * np.pi, m)
x, y = r * np.cos(th), r * np.sin(th)
h = 0.75 * r**2 * (0.55 + 0.45 * np.cos(4 * th)) - 0.3 * np.exp(-r**2 / 0.03) + 0.09 * np.sin(8 * r) * np.cos(3 * th + 0.6)
h += rng.normal(0, 0.012, m)
hn = (h - h.min()) / (h.max() - h.min())
cn = np.clip(0.55 * hn + 0.45 * (0.5 + 0.5 * np.cos(2 * th + 6 * r)), 0, 1)
rgb = CMAP(cn)[:, :3].astype(np.float32)
splat(x, y, h, rgb, np.full(m, 0.42))
# the bright point (Nil)
k = 1800
q = rng.normal(0, 0.018, (k, 3)) + np.array([0.0, 0.0, -0.27])
splat(q[:, 0], q[:, 1], q[:, 2], np.tile([1.0, 0.95, 0.9], (k, 1)).astype(np.float32), np.full(k, 0.9))
img = np.clip(buf, 0, 1)
base = Image.fromarray((img * 255).astype(np.uint8))
glow = base.filter(ImageFilter.GaussianBlur(14))
glow2 = base.filter(ImageFilter.GaussianBlur(40))
out = np.clip(np.asarray(base, np.float32) + 0.55 * np.asarray(glow, np.float32) + 0.35 * np.asarray(glow2, np.float32), 0, 255)
Image.fromarray(out.astype(np.uint8)).save('../public/blog/uniqueness/cover.png')
print('wrote public/blog/uniqueness/cover.png')
