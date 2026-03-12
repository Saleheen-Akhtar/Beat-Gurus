const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.jasonbergh.com/');
  // Wait for animations to load or scroll a bit
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'jason_1.png' });

  // Scroll down a bit
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'jason_2.png' });

  // Scroll down more
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'jason_3.png' });

  await browser.close();
})();
