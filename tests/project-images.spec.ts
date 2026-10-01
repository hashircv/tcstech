import { test, expect } from '@playwright/test';

test('completed and ongoing projects display their reference photographs on mobile and desktop', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion:'reduce' });
  for (const [route,count] of [['completed',15],['on-going',13]] as const) {
    await page.setViewportSize({width:390,height:844});
    await page.goto(`http://127.0.0.1:5174/${route}/`);
    const images=page.locator('.portfolio-card .portfolio-photo img');
    await expect(images).toHaveCount(count);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).complete&&(img as HTMLImageElement).naturalWidth>0)).toBe(true);
    }
    const bounds=await images.first().boundingBox();
    expect(bounds!.width).toBeGreaterThan(330);
    expect(bounds!.width/bounds!.height).toBeCloseTo(1.5,1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`test-results/${route}-photos-mobile.png`});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:5174/completed/');
  await expect(page.locator('.portfolio-photo img')).toHaveCount(15);
  for (const image of await page.locator('.portfolio-photo img').all()) {await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);}
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'test-results/completed-photos-desktop.png',fullPage:true});
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('.project-thumbnail img')).toHaveCount(3);
  await page.getByRole('button',{name:'Explore more projects'}).click();
  await expect(page.locator('.project-thumbnail img')).toHaveCount(6);
  const family=await page.locator('body').evaluate(node=>getComputedStyle(node).fontFamily);
  expect(await page.locator('.serif-word').first().evaluate(node=>getComputedStyle(node).fontFamily)).toBe(family);
  expect(await page.locator('.serif-word').first().evaluate(node=>getComputedStyle(node).fontStyle)).toBe('normal');
});
