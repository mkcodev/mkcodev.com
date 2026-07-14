// Captura fullPage tras scroll progresivo (dispara reveals GSAP below-fold).
// Uso: node scripts/shot-scroll.mjs <ruta-sin-barra> <nombre>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const route = `/${(process.argv[2] ?? '').replace(/^\/+/, '')}`.replace(/\/$/, '') || '/';
const name = process.argv[3] ?? 'scroll';
mkdirSync('shots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 700) {
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(250);
}
await page.waitForTimeout(800);
await page.screenshot({ path: `shots/${name}-scrolled.png`, fullPage: true });
await browser.close();
console.log(`done → shots/${name}-scrolled.png`);
