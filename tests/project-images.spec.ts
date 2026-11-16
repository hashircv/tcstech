import { test, expect } from '@playwright/test';
import projects from '../src/data/projects.json' with { type: 'json' };

test('the portfolio follows the spreadsheet order, excludes yellow rows and shows all supplied details', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5174/projects/');
  const cards = page.locator('.portfolio-card');
  await expect(cards).toHaveCount(33);
  await expect(cards.locator('a')).toHaveCount(0);
  expect(projects.map(project => project.sourceNumber)).toEqual(Array.from({ length: 33 }, (_, index) => index + 1));
  expect(projects.map(project => project.originalSourceNumber)).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15,
    18, 19, 20, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    null, null, null,
  ]);
  expect(projects.find(project => project.id === 'khazna-dxb3-data-centre-ibn-battuta')?.name).toBe('Khazna DXB3 Data Centre - Ibn Battuta');
  expect(projects.find(project => project.name === 'Dubai Holding Head Quarters, Dubai')).toBeTruthy();
  expect(projects.some(project => /Villa Luvana|TITAN Mildew Abatement & Humidity Redesign/i.test(project.name))).toBe(false);
  expect(projects.find(project => project.id === 'beeah-group-headquarters')).toMatchObject({
    sourceNumber: 31, originalSourceNumber: null, name: 'BEEAH Group Headquarters', scope: 'Seasonal commissioning for LEED',
  });
  expect(projects.find(project => project.id === 'al-sheraa-dewa-headquarters')).toMatchObject({
    sourceNumber: 32, originalSourceNumber: null, name: 'Al Shera’a DEWA Headquarters', scope: 'CAR Park Ventilation Smoke Testing',
  });
  expect(projects.find(project => project.id === 'w-hotel-abu-dhabi-yas-island')).toMatchObject({
    sourceNumber: 33, originalSourceNumber: null, name: 'W Hotel Abu Dhabi', scope: 'Ventilation System Re-Balancing', client: 'W Hotel Abu Dhabi',
    image: '/images/projects/w-abu-dhabi-yas-island.webp', mobile: '/images/projects/w-abu-dhabi-yas-island-640.webp',
  });
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
    await expect(page.locator('.portfolio-card')).toHaveCount(33);
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
    await expect(images).toHaveCount(33);
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
