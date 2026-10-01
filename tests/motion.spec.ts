import { test, expect } from '@playwright/test';

test('scroll reveals finish, keyboard focus reveals content, and preference changes stop motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:5174/');
  const card = page.locator('.service-card').first();
  await card.focus();
  await expect(card.locator('..')).toHaveClass(/revealed/);
  await expect.poll(() => card.locator('..').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  await page.locator('.contact-content').scrollIntoViewIfNeeded();
  await expect(page.locator('.contact-content')).toHaveClass(/revealed/);
  await expect.poll(() => page.locator('.contact-content').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const element of await page.locator('.reveal-ready').all()) {
    expect(await element.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
    expect(await element.evaluate(node => getComputedStyle(node).transform)).toBe('none');
  }
  for (const child of await page.locator('.home-page .motion-stagger > *, .home-page .motion-image img').all()) {
    expect(await child.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
    expect(await child.evaluate(node => getComputedStyle(node).transform)).toBe('none');
  }
});

test('mobile slideshow controls have comfortable touch targets and video fades in after loading', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:5174/');
  for (const button of await page.locator('.hero-carousel-controls > button').all()) {
    const bounds = await button.boundingBox();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: /Show slide 3/ }).click();
  await expect(page.locator('.hero-background-video')).toHaveClass(/video-ready/);
  await expect.poll(() => page.locator('.hero-background-video').evaluate(node => getComputedStyle(node).opacity)).toBe('1');
});
