import { test, expect } from '@playwright/test';

const waitForHomeReady = async (page) => {
  await page.goto('/');
  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.locator('[data-testid="preloader"]')).toHaveCount(0);
};

test('home loads and preloader completes', async ({ page }) => {
  await waitForHomeReady(page);
});

test('anchor navigation works on desktop', async ({ page }, testInfo) => {
  if (testInfo.project.name.includes('Mobile')) {
    test.skip();
  }
  await waitForHomeReady(page);

  const anchors = [
    { link: 'nav-link-about', hash: '#about', section: 'section-about' },
    { link: 'nav-link-gallery', hash: '#work', section: 'section-work' },
    { link: 'nav-link-services', hash: '#services', section: 'section-services' },
    { link: 'nav-link-instruments', hash: '#instruments', section: 'section-instruments' },
    { link: 'nav-link-contact', hash: '#contact', section: 'section-contact' },
  ];

  for (const anchor of anchors) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.getByTestId('navbar')).toBeVisible();
    await page.getByTestId(anchor.link).click();
    await expect(page).toHaveURL(new RegExp(`${anchor.hash}$`));
    await expect(page.getByTestId(anchor.section)).toBeVisible();
  }

  await expect(page.getByTestId('showcase-youtube-link')).toHaveAttribute('target', '_blank');
});

test('show types navigate to detail pages', async ({ page }) => {
  await waitForHomeReady(page);
  await page.getByTestId('show-type-link-flute-fusion').click();
  await expect(page).toHaveURL(/\/shows\/flute-fusion/);
  await expect(page.getByTestId('show-detail-page')).toBeVisible();
  await expect(page.getByTestId('show-detail-title')).toContainText('Flute Fusion');
  await expect(page.getByTestId('show-detail-media-link')).toHaveAttribute('target', '_blank');
});

test('missing shows render not found state', async ({ page }) => {
  await page.goto('/shows/unknown-show');
  await expect(page.locator('[data-testid="preloader"]')).toHaveCount(0);
  await expect(page.getByTestId('show-not-found')).toBeVisible();
});

test('contact prefill, validation, and submission flow', async ({ page }) => {
  await page.goto('/?event=Corporate%20Event#contact');
  await expect(page.locator('[data-testid="preloader"]')).toHaveCount(0);
  await expect(page.getByTestId('contact-event-type')).toHaveValue('Corporate Event');

  await page.getByTestId('contact-email').fill('invalid-email');
  await page.getByTestId('contact-email').blur();
  await expect(page.getByTestId('contact-email-error')).toBeVisible();

  await page.route('**/api/contact', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true }),
  }));

  await page.getByTestId('contact-name').fill('Test User');
  await page.getByTestId('contact-email').fill('test@example.com');
  await page.getByTestId('contact-event-type').selectOption('Corporate Event');
  await page.getByTestId('contact-message').fill('Testing contact form submission.');
  await page.getByTestId('contact-submit').click();

  await expect(page.getByTestId('contact-status')).toContainText('Thank you');
});

test('faq accordion and video play interactions', async ({ page }) => {
  await waitForHomeReady(page);

  await page.getByTestId('faq-toggle-0').click();
  await expect(page.getByTestId('faq-panel-0')).toBeVisible();

  const playButton = page.getByTestId('video-play-button');
  await playButton.scrollIntoViewIfNeeded();
  await playButton.click();
  await expect(page.getByTestId('video-iframe')).toBeVisible();
});

test('mobile menu opens and closes', async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes('Mobile')) {
    test.skip();
  }
  await waitForHomeReady(page);

  await page.getByTestId('mobile-menu-button').click();
  await expect(page.getByTestId('mobile-menu')).toBeVisible();
  await page.getByTestId('mobile-menu-close').click();
  await expect(page.getByTestId('mobile-menu')).toHaveCount(0);
});
