const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tele-hero.png' });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tele-why.png' });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tele-ticker.png' });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tele-series.png' });
  await browser.close();
})();
