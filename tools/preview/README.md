# Local layout preview

Render the plugin's layouts (`../../src/*.liquid`) against TRMNL's public framework CSS/JS in headless
Chromium, with the real fonts and the platform's screen/view/mashup wrappers. Use it to check text fit,
the QR code and the `lg:` (large screen) sizes before opening a PR, instead of round-tripping through the portal.

It reproduced the portal preview's half-horizontal cut-off exactly when calibrated, so it is a good guide,
but it is not a device: check the portal preview and the real screen too, and note that the TRMNL X has no
device class in the framework CSS (the `lg` render uses the 1040x780 V2 screen as a stand-in).

## Setup

Needs `node`, `npm`, `python3` with `playwright` (`pip install playwright && playwright install chromium`).

```sh
./preview.sh            # renders samples/long.json; downloads the framework and runs npm install on first use
./preview.sh samples/short.json
```

Output goes to `out/` (git-ignored): `<layout>_og_<sample>.png` (TRMNL OG 2-bit, 800x480 screen) and
`<layout>_lg_<sample>.png` (large-screen stand-in). Open the PNGs, or the `.html` files in a browser.

## Files

- `fetch-framework.sh` downloads `https://trmnl.com/css/latest/plugins.css` and `plugins.js` into `framework/` and
  points the CSS font URLs at trmnl.com.
- `render.js` renders one layout with sample data via liquidjs (with a `qr_code` filter that fills its container).
  `og` = OG 1-bit, `ogv2` = OG 2-bit (the portal preview default), `lg` = large screen.
- `shot.py` screenshots the layout's slot (e.g. 400x240 for a quadrant).
- `samples/*.json` mirror what `https://linkedinmadlibs.com/api/trmnl` returns (`text`, `paragraphs`, `template`).
