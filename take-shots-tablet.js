const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 768, height: 1024 }); // iPad
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tab-why.png' });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/tab-series.png' });
  await browser.close();
})();
