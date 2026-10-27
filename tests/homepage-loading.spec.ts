import { test, expect } from '@playwright/test';

test('home defers service content and dialog code until they are needed', async ({ page }) => {
  const modules: string[] = [];
  page.on('request', request => modules.push(new URL(request.url()).pathname));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('.service-card')).toHaveCount(6);
  expect(modules.some(path => path.includes('/site-content.json'))).toBe(false);
  expect(modules.some(path => path.includes('/ServiceDialog.tsx'))).toBe(false);

  await page.locator('.service-card').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(modules.some(path => path.includes('/ServiceDialog.tsx'))).toBe(true);
  expect(modules.some(path => path.includes('/site-content.json'))).toBe(false);
  await page.keyboard.press('Escape');
  await expect(page.locator('.service-card').first()).toBeFocused();

  await page.getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Our expertise' }).click();
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  expect(modules.some(path => path.includes('/site-content.json'))).toBe(true);
});

test('hero downloads media as slides are selected and retains visited images', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('.hero-scene img')).toHaveCount(1);
  await expect(page.locator('.hero-scene.is-active img')).toHaveAttribute('fetchpriority', 'high');
  await page.getByRole('button', { name: /Show slide 2/ }).click();
  await expect(page.locator('.hero-scene img')).toHaveCount(2);
  await expect.poll(() => page.locator('.hero-scene.is-active img')
    .evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('button', { name: /Show slide 1/ }).click();
  await expect(page.locator('.hero-scene img')).toHaveCount(2);
  await expect(page.locator('.hero-background-video')).toHaveCount(0);
});

test('slow homepage loading does not display then displace the footer', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 823 });
  let releasePage!: () => void;
  const ready = new Promise<void>(resolve => { releasePage = resolve; });
  await page.route(/\/src\/pages\/HomePage\.tsx(?:\?|$)/, async route => {
    await ready;
    await route.continue();
  });
  try {
    await page.goto('http://127.0.0.1:5174/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.page-loading')).toBeVisible();
    const footer = await page.locator('.site-footer').boundingBox();
    expect(footer!.y).toBeGreaterThanOrEqual(823);
    releasePage();
    await expect(page.locator('h1')).toContainText('Better buildings.');
  } finally {
    releasePage();
  }
});

test('high-density phones get a medium hero image and a dimensioned logo', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75,
    reducedMotion: 'reduce',
  });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5174/');
    const image = page.locator('.hero-scene.is-active img');
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).currentSrc))
      .toContain('/architecture-960.webp');
    const logo = page.locator('.site-header .brand-logo');
    await expect(logo).toHaveAttribute('src', '/tcs-logo.webp');
    await expect(logo).toHaveAttribute('width', '430');
    await expect(logo).toHaveAttribute('height', '177');
  } finally {
    await context.close();
  }
});
