const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.jasonbergh.com/');
  await page.screenshot({ path: 'jason_full.png', fullPage: true });
  await browser.close();
})();
