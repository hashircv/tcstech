import {test,expect} from '@playwright/test';

test('all 15 services have distinct responsive images and WhatsApp enquiries are available',async({page})=>{
  test.setTimeout(60000);
  await page.setViewportSize({width:390,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:5174/');
  await expect(page.locator('.service-card-photo img')).toHaveCount(6);
  const homeSources=await page.locator('.service-card-photo img').evaluateAll(images=>images.map(image=>image.getAttribute('src')));
  expect(new Set(homeSources).size).toBe(6);
  await page.goto('http://127.0.0.1:5174/services/');
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  const cards=page.locator('.full-catalogue .service-card');
  const sources=new Set<string>();
  const links:string[]=[];
  for(const card of await cards.all()){
    const image=card.locator('img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate(i=>(i as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    sources.add((await image.getAttribute('src'))!);
    links.push((await card.getAttribute('href'))!);
    expect(await image.evaluate(i=>(i as HTMLImageElement).currentSrc)).toContain('-640.webp');
  }
  expect(sources.size).toBe(15);
  for(const link of links){
    await page.goto(`http://127.0.0.1:5174${link}`);
    const image=page.locator('.service-image-gallery img');
    await expect.poll(()=>image.evaluate(i=>(i as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(sources.has((await image.getAttribute('src'))!)).toBe(true);
    const whatsapp=page.getByRole('link',{name:'Message TCS on WhatsApp'});
    await expect(whatsapp).toBeVisible();
    const url=new URL((await whatsapp.getAttribute('href'))!);
    expect(url.pathname).toBe('/971555289611');
    expect(url.searchParams.get('text')).toContain('Hello TCS');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.goto('http://127.0.0.1:5174/services/');
  await expect(cards).toHaveCount(15);
  await cards.first().locator('img').evaluate(i=>(i as HTMLImageElement).decode());
  await page.screenshot({path:'test-results/services-unique-mobile.png'});
  await page.setViewportSize({width:1440,height:900});
  await page.screenshot({path:'test-results/services-unique-desktop.png'});
});
