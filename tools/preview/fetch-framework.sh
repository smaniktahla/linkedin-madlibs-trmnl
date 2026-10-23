#!/bin/sh
# Download TRMNL's public framework CSS/JS and point its font URLs at trmnl.com
# so the headless render uses the real fonts (the portal preview matches this).
set -e
cd "$(dirname "$0")"
mkdir -p framework
curl -fsSL https://trmnl.com/css/latest/plugins.css -o framework/plugins.raw.css
curl -fsSL https://trmnl.com/js/latest/plugins.js -o framework/plugins.js
sed 's#url("/fonts/#url("https://trmnl.com/fonts/#g' framework/plugins.raw.css > framework/plugins.css
echo "framework downloaded to $(pwd)/framework"
