import { test, expect } from '@playwright/test';

test('hero slideshow advances, pauses and places the automatic video on slide three', async ({ page }) => {
  await page.clock.install();
  await page.goto('http://127.0.0.1:5174');
  await expect(page.locator('.hero-scene.is-active')).toHaveCount(1);
  await expect(page.locator('.hero-background-video')).toHaveCount(0);
  await expect(page.locator('.hero-slide-caption')).toContainText('High-performance buildings');
  await page.clock.fastForward(6600);
  await expect(page.locator('.hero-slide-caption')).toContainText('Precision in every system');
  await page.getByRole('button', { name: 'Pause slideshow' }).click();
  await page.clock.fastForward(14000);
  await expect(page.locator('.hero-slide-caption')).toContainText('Precision in every system');
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page.locator('.hero-slide-caption')).toContainText('TCS in action');
  await expect(page.locator('.hero-background-video')).toHaveAttribute('autoplay', '');
  expect(await page.locator('.hero-background-video').evaluate(element => (element as HTMLVideoElement).muted && (element as HTMLVideoElement).playsInline)).toBe(true);
  await expect(page.getByRole('button', { name: 'Watch TCS in action' })).toHaveCount(0);
  await expect(page.locator('.hero-video-dialog')).toHaveCount(0);
});

test('hero imagery fits mobile and desktop and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const bounds = await page.locator('.hero-banner').boundingBox();
    expect(bounds?.width).toBe(width);
    const image = page.locator('.hero-scene.is-active img');
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('cover');
    const controls = await page.locator('.hero-carousel-controls').boundingBox();
    const actions = await page.locator('.hero-banner-actions').boundingBox();
    expect(actions!.y + actions!.height).toBeLessThan(controls!.y);
    if (width === 390 || width === 1440) await page.screenshot({ path: `test-results/hero-${width}.png` });
  }
  await page.waitForTimeout(6700);
  await expect(page.locator('.hero-slide-caption')).toContainText('High-performance buildings');
});


