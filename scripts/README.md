# Export scripts

Generate offline-readable artifacts from the reveal.js deck:

- **PDF** — `exports/EDP-RFP-Response.pdf` (1 slide per page, 1280×720)
- **PPTX** — `exports/EDP-RFP-Response.pptx` (1 image per slide, 16:9 wide)

## Setup (one-time)

```bash
cd scripts
npm install               # ~30 MB: playwright + pptxgenjs
npm run install-browser   # ~180 MB: headless Chromium
```

## Run

```bash
npm run export   # writes both PDF + PPTX to ../exports/
npm run pdf      # PDF only
npm run pptx     # PPTX only
```

Takes ~60-90 s for a 40-slide deck on an M-series Mac.

## How it works

1. Spins up a local static server on `127.0.0.1:8088` serving the repo root.
2. Launches headless Chromium via Playwright.
3. **PDF:** navigates to `/?print-pdf` (Reveal.js's native print mode) → `page.pdf()` → paginated PDF.
4. **PPTX:** iterates `Reveal.slide(n)` → screenshots each slide at 1280×720 → assembles with pptxgenjs, one image per slide.

## Notes

- PPTX slides are **static images**, not editable text. For text-editable PPT you'd need a manual rebuild; this script is for review/distribution parity with the HTML deck.
- Images are captured at `deviceScaleFactor: 2` by default — sharper than pixel-perfect without bloating too much. Override with `node export.mjs --scale=1` or `--scale=3`.
- `exports/` is gitignored — regenerate when the deck content changes.
- Outputs include whatever is rendered at the time of screenshot, so if you add inline Mermaid later the script already waits for `document.fonts.ready` and 500 ms per slide.

## Troubleshooting

- **"Cannot find Reveal"** — the deck isn't loading. Check that `index.html` is at the repo root and the server port isn't taken (`--port=9000` to override).
- **PDF has blank pages** — bump the initial wait in the script (currently 1500 ms after `networkidle`).
- **PPTX slides look small on reviewer's screen** — re-run with `--scale=3` for ~3× pixel density.
