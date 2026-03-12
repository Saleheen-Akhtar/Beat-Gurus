const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173');

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Scroll down to the Showcase section (ID #work)
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView();
  });

  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/jules/verification/showcase_1.png' });

  // Scroll down more inside the Showcase section
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/jules/verification/showcase_2.png' });

  await browser.close();
})();
