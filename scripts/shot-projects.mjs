// Verificación visual P20: home Projects cinema.
// Desktop: capítulo 1 (start pin), capítulo 2 (mid-scroll). Mobile: grid natural.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = 'shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function scrollToProjects(page) {
  await page.evaluate(() => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
}

async function capture(width, height, suffix, actions) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: 'no-preference',
  });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await scrollToProjects(page);
  if (actions) await actions(page);
  await page.screenshot({ path: `${OUT}/proj-${suffix}.png`, fullPage: false });

  if (errors.length > 0) {
    console.error(`CONSOLE ERRORS (${suffix}):`);
    errors.forEach((e) => console.error(`  ${e}`));
  }
  await page.close();
  return errors.length;
}

let totalErrors = 0;

// Desktop: capítulo 1 al iniciar el pin
totalErrors += await capture(1440, 900, 'desktop-ch1');

// Desktop: capítulo 2 mid-scroll dentro del pin
totalErrors += await capture(1440, 900, 'desktop-ch2', async (page) => {
  // Scroll extra que avance dentro del pin (~mitad del track = 100vw ≈ 1440px)
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(500);
});

// Mobile: grid natural
totalErrors += await capture(390, 844, 'mobile');

await browser.close();
console.log(
  `done → ${OUT}/proj-{desktop-ch1,desktop-ch2,mobile}.png · console errors: ${totalErrors}`,
);
