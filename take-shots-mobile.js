const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  // scroll to why section
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/mob-why.png' });
  // scroll to series
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/mob-series.png' });
  await browser.close();
})();
