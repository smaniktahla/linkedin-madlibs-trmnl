# LinkedIn Mad Libs for TRMNL

A fresh, randomly generated LinkedIn post on your [TRMNL](https://trmnl.com) every time it refreshes,
with a QR code to [linkedinmadlibs.com](https://linkedinmadlibs.com) so you can write your own.

Data comes from `https://linkedinmadlibs.com/api/trmnl`, which lives in the
[site repo](https://github.com/smaniktahla/linkedin-madlibs) (`functions/api/trmnl.js`) and uses the
same templates and word banks as the site, so new content shows up here automatically.
This repo holds only the TRMNL plugin (a polling private plugin / recipe).

## Install

1. `make zip` (or `cd src && zip ../linkedin-madlibs-trmnl.zip *`).
2. In TRMNL: Plugins → Private Plugin → Import, and upload the zip.
3. Add it to a playlist.

## Layout

- `src/settings.yml`: polling, 30-minute refresh, `?max=600` caps post length for the screen.
- `src/{full,half_horizontal,half_vertical,quadrant}.liquid`: one per layout. The quadrant has
  no QR code (too small); the others do.

The QR code uses TRMNL's built-in `qr_code` filter (`{{ "https://linkedinmadlibs.com" | qr_code }}`), which
fills a square container. Text size steps with post length (`value--*`), has a one-to-two-step larger `lg:`
variant for TRMNL X, and is limited with `data-clamp` / `data-clamp-lg` instead of truncating. The full layout
also shows the template name on large screens only (`hidden lg:visible`).

## Icon

`assets/icon.svg` and `assets/icon.png` (512x512), the site mascot in black on white. Re-render the PNG with
`rsvg-convert -w 512 -h 512 assets/icon.svg -o assets/icon.png`.

## License

MIT. See `LICENSE`.
