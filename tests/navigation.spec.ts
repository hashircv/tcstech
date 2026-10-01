import { test, expect } from '@playwright/test';

test('internal navigation and browser history preserve the header and footer', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('h1')).toContainText('Better buildings.');
  await page.evaluate(() => Object.assign(window, {
    navigationHeader: document.querySelector('.site-header'),
    navigationFooter: document.querySelector('footer'),
  }));
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our expertise' }).click();
  await expect(page.locator('h1')).toContainText('Every service. Every detail.');
  await page.locator('.full-catalogue .service-card').first().click();
  await expect(page.locator('h1')).toContainText('Building envelope testing');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact us' }).click();
  await expect(page.locator('h1')).toContainText('Let’s build something better.');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact us' }).click();
  await page.goBack();
  await expect(page.locator('h1')).toContainText('Building envelope testing');
  await page.goForward();
  await expect(page.locator('h1')).toContainText('Let’s build something better.');
  expect(await page.evaluate(() => {
    const saved = window as Window & { navigationHeader: Element; navigationFooter: Element };
    return saved.navigationHeader === document.querySelector('.site-header') &&
      saved.navigationFooter === document.querySelector('footer');
  })).toBe(true);
  await page.getByRole('link', { name: 'TCS home' }).first().click();
  await expect(page.locator('h1')).toContainText('Better buildings.');
  await expect(page).toHaveTitle(/Better buildings/);
});
