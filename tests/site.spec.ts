import { test, expect } from '@playwright/test';

test('desktop service discovery, dialog keyboard behavior and project expansion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5174');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Better buildings.');
  await expect(page.locator('.service-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Energy performance', exact: true }).click();
  await expect(page.locator('.service-card')).toHaveCount(1);
  await page.locator('.service-card').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Energy audits and optimization');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.service-card')).toBeFocused();
  await page.getByRole('button', { name: 'All services', exact: true }).click();
  await expect(page.locator('.service-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Explore more projects' }).click();
  await expect(page.locator('.project-item')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Discuss your project' })).toHaveAttribute('href', '/contact/');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0), {message: `Image should load: ${await image.getAttribute('src')}`}).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('mobile navigation, viewport fit and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our expertise' }).click();
  await expect(page).toHaveURL(/\/services\//);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:5174/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.mouse.click(5, 800);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('http://127.0.0.1:5174');
  await page.locator('.service-card').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close service details' }).click();
  await page.goto('http://127.0.0.1:5174');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
});

test('desktop visual capture and narrow viewport fit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

