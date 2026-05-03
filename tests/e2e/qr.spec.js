import { test, expect } from '@playwright/test';

test('qr page book performance link navigates home', async ({ page }) => {
  await page.goto('/qr-code');
  await expect(page.locator('[data-testid="preloader"]')).toHaveCount(0);
  await expect(page.getByTestId('qr-page')).toBeVisible();

  await page.getByTestId('qr-book-performance').click();
  await expect(page).toHaveURL(/\/#contact/);
  await expect(page.getByTestId('section-contact')).toBeVisible();
});

test('qr page floating media links and social links render', async ({ page }) => {
  await page.goto('/qr-code');
  await expect(page.locator('[data-testid="preloader"]')).toHaveCount(0);
  await expect(page.getByTestId('qr-page')).toBeVisible();

  const percussionSection = page.getByTestId('qr-percussion-section');
  await percussionSection.scrollIntoViewIfNeeded();
  await expect(page.getByTestId('qr-floating-link-0')).toBeVisible();
  await expect(page.getByTestId('qr-floating-link-1')).toBeVisible();
  await expect(page.getByTestId('qr-floating-link-2')).toBeVisible();

  const youtubeLink = page.getByTestId('qr-social-link-youtube');
  await youtubeLink.scrollIntoViewIfNeeded();
  await expect(youtubeLink).toHaveAttribute('target', '_blank');
  await expect(youtubeLink).toHaveAttribute('rel', /noopener/);
});
