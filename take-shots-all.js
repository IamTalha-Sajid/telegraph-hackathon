const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  // HowItWorks
  await page.evaluate(() => window.scrollTo(0, document.getElementById('how').offsetTop));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/gold-how.png' });
  // ApiSection
  await page.evaluate(() => window.scrollTo(0, document.getElementById('apis').offsetTop));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/MT/AppData/Local/Temp/gold-api.png' });
  await browser.close();
})();
