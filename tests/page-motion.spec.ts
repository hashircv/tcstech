import { test, expect } from '@playwright/test';

test('every inner page supports heading motion and changing reduced-motion preferences', async ({ page }) => {
  test.setTimeout(60000);
  for (const slug of ['services', 'testing-commissioning-of-mep-system', 'projects', 'completed',
    'on-going', 'about', 'our-team', 'career', 'contact', 'markets', 'news-insight', 'missing-page']) {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`http://127.0.0.1:5174/${slug}/`);
    await expect(page.locator('.inner-page h1')).toBeVisible();
    expect(await page.locator('h1').evaluate(node => getComputedStyle(node).animationName)).toBe('inner-heading-enter');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await page.locator('h1').evaluate(node => getComputedStyle(node).animationName)).toBe('none');
    for (const section of await page.locator('.page-motion-item').all()) {
      expect(await section.evaluate(node => getComputedStyle(node).opacity), slug).toBe('1');
      expect(await section.evaluate(node => getComputedStyle(node).transform), slug).toBe('none');
    }
  }
});

test('keyboard focus immediately exposes an animated contact form', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5174/contact/');
  await page.getByLabel('Name').focus();
  await expect(page.locator('.enquiry-form')).toHaveClass(/page-motion-visible/);
  expect(await page.locator('.enquiry-form').evaluate(node => getComputedStyle(node).opacity)).toBe('1');
});
