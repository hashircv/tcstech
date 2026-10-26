import { test, expect } from '@playwright/test';

test('service photos fill phone width and fixed header does not cover anchor content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('http://127.0.0.1:5174/building-envelop-testing/');
    const photo = page.locator('.service-image-gallery img');
    await expect(photo).toHaveCount(1);
    await expect.poll(() => photo.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const bounds = await photo.boundingBox();
    expect(bounds!.width).toBeGreaterThan(width * .85);
    expect(bounds!.width / bounds!.height).toBeCloseTo(1.5, 1);
    expect(await photo.evaluate(img => getComputedStyle(img).objectFit)).toBe('cover');
    expect(await photo.evaluate(img => (img as HTMLImageElement).currentSrc)).toContain('-640.webp');
    await page.getByRole('navigation', { name: 'Page contents' }).getByRole('link', { name: 'Overview', exact: true }).click();
    const headerBounds = await page.locator('.site-header').boundingBox();
    const sectionBounds = await page.locator('#section-0').boundingBox();
    expect(headerBounds!.y).toBe(0);
    expect(sectionBounds!.y).toBeGreaterThanOrEqual(headerBounds!.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: 'test-results/blower-door-mobile.png' });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:5174/building-envelop-testing/');
  await expect(page.locator('.service-image-gallery img')).toBeVisible();
  await page.evaluate(() => scrollTo(0, 1200));
  expect((await page.locator('.site-header').boundingBox())!.y).toBe(0);
  const contents = await page.locator('.contents-panel').boundingBox();
  expect(contents!.y).toBeGreaterThanOrEqual(104);
});
