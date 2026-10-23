"""Screenshot a rendered page. usage: shot.py <page.html> <out.png> <slot_width> <slot_height> [screen_width screen_height]
The clip is the layout's slot (e.g. 400x240 for a quadrant) at the top-left of the screen."""
import sys
from playwright.sync_api import sync_playwright

html, png = sys.argv[1], sys.argv[2]
cw, ch = int(sys.argv[3]), int(sys.argv[4])
sw, sh = (int(sys.argv[5]), int(sys.argv[6])) if len(sys.argv) > 6 else (800, 480)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': sw, 'height': sh})
    pg.goto('file://' + html)
    pg.wait_for_timeout(2500)  # fonts + framework JS (clamp / content limiter) settle
    pg.screenshot(path=png, clip={'x': 0, 'y': 0, 'width': cw, 'height': ch})
    b.close()
