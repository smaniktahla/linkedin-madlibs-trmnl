#!/bin/sh
# Render all four layouts for a sample post at OG (2-bit) and large-screen size.
# usage: ./preview.sh [samples/long.json] [srcDir]
set -e
cd "$(dirname "$0")"
DATA="${1:-samples/long.json}"
SRC="${2:-../../src}"
[ -d framework ] || ./fetch-framework.sh
[ -d node_modules ] || npm install --silent
mkdir -p out
OUT="$(pwd)/out"
NAME="$(basename "$DATA" .json)"
# layout: slot size at OG (w h)  |  slot size at large (w h)
for spec in "full 800 480 1040 780" "half_horizontal 800 240 1040 390" "half_vertical 400 480 520 780" "quadrant 400 240 520 390"; do
  set -- $spec
  layout=$1
  node render.js "$layout" ogv2 "$OUT/${layout}_og_${NAME}.html" "$DATA" "$SRC"
  python3 shot.py "$OUT/${layout}_og_${NAME}.html" "$OUT/${layout}_og_${NAME}.png" "$2" "$3"
  node render.js "$layout" lg "$OUT/${layout}_lg_${NAME}.html" "$DATA" "$SRC"
  python3 shot.py "$OUT/${layout}_lg_${NAME}.html" "$OUT/${layout}_lg_${NAME}.png" "$4" "$5" 1040 780
done
echo "screenshots in $OUT"
