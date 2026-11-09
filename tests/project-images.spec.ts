import { test, expect } from '@playwright/test';
import projects from '../src/data/projects.json' with { type: 'json' };

test('the portfolio follows the spreadsheet order, excludes yellow rows and shows all supplied details', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174/projects/');
  const cards = page.locator('.portfolio-card');
  await expect(cards).toHaveCount(32);
  expect(projects.map(project => project.sourceNumber)).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ]);
  await expect(cards.locator('h2')).toHaveText(projects.map(project => project.name));
  for (const [index, project] of projects.entries()) {
    const card = cards.nth(index);
    await expect(card.locator('.project-facts')).toContainText(project.scope);
    await expect(card.locator('.project-facts')).toContainText(project.client);
    if (project.location) await expect(card.locator('.project-facts')).toContainText(project.location);
    await expect(card.locator('.project-image-label')).toHaveCount(project.imageKind === 'project' ? 0 : 1);
    if (project.imageKind === 'rendering') await expect(card.locator('.project-image-label')).toHaveText('Official project rendering');
    if (project.imageKind === 'illustration') await expect(card.locator('.project-image-label')).toHaveText('Architectural illustration');
  }
  await expect(page.locator('main')).not.toContainText('SITE 318@JVC');
  await expect(page.locator('main')).not.toContainText('MAJILIS PROJECT');
  await expect(page.locator('main')).not.toContainText('Khansaheb Civil Engineering');
  await expect(page.getByRole('navigation', { name: 'Project categories' })).toHaveCount(0);
  await expect(page.locator('a[href="/completed/"], a[href="/on-going/"]')).toHaveCount(0);
  for (const legacy of ['completed', 'on-going']) {
    await page.goto(`http://127.0.0.1:5174/${legacy}/`);
    await expect(page.locator('.portfolio-card')).toHaveCount(32);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://tcstech.me/projects/');
  }
});

test('project WebP images fit mobile and desktop and homepage selections use the same order', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:5174/projects/');
    const images = page.locator('.portfolio-photo img');
    await expect(images).toHaveCount(32);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
      await expect(image).toHaveAttribute('src', /\.webp$/);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `test-results/projects-${width}.png` });
  }
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('.project-item h3')).toHaveText(projects.slice(0, 3).map(project => project.name));
  await page.getByRole('button', { name: 'Explore more projects' }).click();
  await expect(page.locator('.project-item h3')).toHaveText(projects.slice(0, 6).map(project => project.name));
  await expect(page.getByRole('link', { name: 'View all projects', exact: true })).toHaveAttribute('href', '/projects/');
});
