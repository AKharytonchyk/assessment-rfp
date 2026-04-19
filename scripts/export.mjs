#!/usr/bin/env node
/**
 * Headless export of the reveal.js deck to PDF + PPTX.
 *
 * Usage:
 *   npm install            # installs playwright + pptxgenjs
 *   npm run install-browser # downloads headless chromium (~150 MB)
 *   npm run export         # writes ../exports/EDP-RFP-Response.{pdf,pptx}
 *
 * Flags:
 *   --pdf-only     only produce PDF
 *   --pptx-only    only produce PPTX
 *   --scale=2      deviceScaleFactor for crisper screenshots (default 2)
 *   --port=8088    local static-server port
 */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdirSync, existsSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pptxgen from 'pptxgenjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');              // repo root
const OUT_DIR = resolve(__dirname, '..', 'exports');
mkdirSync(OUT_DIR, { recursive: true });

const args = Object.fromEntries(
  process.argv.slice(2).flatMap(a => {
    const m = a.match(/^--([^=]+)(?:=(.+))?$/);
    return m ? [[m[1], m[2] ?? true]] : [];
  })
);
const DO_PDF  = !args['pptx-only'];
const DO_PPTX = !args['pdf-only'];
const SCALE   = parseFloat(args.scale ?? '2');
const PORT    = parseInt(args.port ?? '8088', 10);

// ── MIME types for the tiny static server ────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.md':   'text/plain; charset=utf-8',
  '.mmd':  'text/plain; charset=utf-8',
  '.puml': 'text/plain; charset=utf-8',
};

async function startServer() {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent((req.url || '/').split('?')[0]);
    if (path === '/' || path.endsWith('/')) path += 'index.html';
    const full = join(ROOT, path);
    try {
      const buf = await readFile(full);
      res.setHeader('Content-Type', MIME[extname(full).toLowerCase()] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.end(buf);
    } catch {
      res.statusCode = 404;
      res.end('Not found: ' + path);
    }
  });
  return new Promise((ok) => server.listen(PORT, '127.0.0.1', () => ok(server)));
}

async function main() {
  const server = await startServer();
  const base = `http://127.0.0.1:${PORT}`;
  console.log(`▸ static server on ${base}`);

  const browser = await chromium.launch({ headless: true });

  try {
    // ── PDF via Reveal's ?print-pdf mode ─────────────────────────
    if (DO_PDF) {
      console.log('▸ PDF — generating via Reveal print-pdf mode');
      const page = await browser.newPage({
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
      });
      await page.goto(`${base}/?print-pdf`, { waitUntil: 'networkidle', timeout: 60_000 });
      // Let web fonts settle
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await page.waitForTimeout(1500);
      const pdfPath = join(OUT_DIR, 'EDP-RFP-Response.pdf');
      await page.pdf({
        path: pdfPath,
        width: '1280px',
        height: '720px',
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      await page.close();
      console.log(`  ✓ ${pdfPath}`);
    }

    // ── PPTX via per-slide screenshots ───────────────────────────
    if (DO_PPTX) {
      console.log('▸ PPTX — capturing per-slide screenshots');
      const page = await browser.newPage({
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: SCALE,
      });
      await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 60_000 });

      // Wait until Reveal is initialized
      await page.waitForFunction(() => window.Reveal && window.Reveal.isReady && window.Reveal.isReady(), null, { timeout: 30_000 });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await page.waitForTimeout(1500);

      const total = await page.evaluate(() => window.Reveal.getTotalSlides());
      console.log(`  ${total} slides detected`);

      const pres = new pptxgen();
      pres.layout = 'LAYOUT_WIDE';            // 13.333" × 7.5" (16:9) at 96 dpi = 1280×720
      pres.title = 'EDP RFP Response — Enterprise Data Platform';
      pres.author = 'Artsiom Kharytonchyk · EPAM';
      pres.subject = 'RFP response · EDP-2026-01';

      for (let i = 0; i < total; i++) {
        await page.evaluate((idx) => window.Reveal.slide(idx), i);
        // Allow animations + deferred images to settle
        await page.waitForTimeout(500);
        const buf = await page.screenshot({
          clip: { x: 0, y: 0, width: 1280, height: 720 },
          type: 'png',
          omitBackground: false,
        });
        const slide = pres.addSlide();
        slide.background = { color: '060606' };
        slide.addImage({
          data: `data:image/png;base64,${buf.toString('base64')}`,
          x: 0, y: 0, w: '100%', h: '100%',
        });
        process.stdout.write(`  slide ${String(i + 1).padStart(2, '0')}/${total}\r`);
      }
      console.log('');
      const pptxPath = join(OUT_DIR, 'EDP-RFP-Response.pptx');
      await pres.writeFile({ fileName: pptxPath });
      console.log(`  ✓ ${pptxPath}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
    console.log('▸ done');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
