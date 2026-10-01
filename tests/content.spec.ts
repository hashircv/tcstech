import { test, expect } from '@playwright/test';
const base='http://127.0.0.1:5174';
const serviceChecks: [string,string][] = [
  ['building-envelop-testing','Blower door'],
  ['u-value-testing-services','heat flux sensors'],
  ['duct-leakage-testing-services','Pass/Fail status'],
  ['testing-commissioning-of-mep-system','Emergency Power'],
  ['duck-cleaning','Final Inspection'],
  ['electrical-third-party-cold-live-testing-services','Insulation Resistance'],
  ['testing-and-balancing','rotational speed'],
  ['third-party-witness-and-verification','Follow-Up Support'],
  ['sound-and-vibration-testing-of-mechanical-equipments','Vibration Diagnostics'],
  ['acoustic-testing-for-interior-spaces','Speech Transmission Index'],
  ['water-penetration-test','ASTM E331'],
  ['mep-health-check','Floor tile slope testing'],
  ['energy-optimization-through-energy-audit','ASHRAE Level 3'],
  ['facility-management','Ensuring Safety Standards'],
  ['indoor-air-quality-testing-service','How do you test air quality?'],
  ['commissioning-management','Verification and Handover'],
  ['re-commissioning-and-retro-commissioning','Educating Building Staff'],
  ['air-permeability-test-for-windows','Pressure Testing'],
  ['micro-camera-inspection-service-for-drainage-lines-hvac-ducting','50-meter flexible camera cable'],
];
test('all 19 deep links contain their specific technical detail and working contents navigation',async({page})=>{
  test.setTimeout(60000);
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  for(const [slug,detail] of serviceChecks){
    await page.goto(`${base}/${slug}/`);
    await expect(page.locator('.detail-body')).toContainText(detail);
    await expect(page).toHaveTitle(/TCS/);
    const link=page.getByRole('navigation',{name:'Page contents'}).getByRole('link').last();
    const id=await link.getAttribute('href');
    await link.click();
    await expect(page.locator(id!)).toBeInViewport();
    await page.reload();
    await expect(page.locator('.detail-body')).toContainText(detail);
  }
  expect(errors).toEqual([]);
});
test('catalogue search, category filter, quick panel and legacy paths reach full pages',async({page})=>{
  await page.goto(`${base}/services/`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(19);
  await page.getByRole('searchbox',{name:'Search services'}).fill('micro');
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(1);
  await page.locator('.full-catalogue .service-card').click();
  await expect(page.locator('h1')).toHaveText('Micro-camera inspections');
  await page.goto(`${base}/services/?group=envelope`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(4);
  await page.getByRole('searchbox').fill('no matching xyz');
  await expect(page.getByRole('heading',{name:'No matching services'})).toBeVisible();
  await page.getByRole('button',{name:'Show all services'}).click();
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(19);
  await page.goto(base);
  await page.locator('.service-card').first().click();
  await page.getByRole('dialog').getByRole('link',{name:'Electrical cold & live testing'}).click();
  await expect(page.locator('.detail-body')).toContainText('Cold Testing');
  for(const slug of ['electrical-3rd-party-cold','duct-leak-test','dalt-leak-test']){
    await page.goto(`${base}/${slug}/`);
    await expect(page.locator('.detail-body')).toBeVisible();
  }
});
test('all project entries, original PDFs, company values, team and careers are present',async({page,request})=>{
  await page.goto(`${base}/completed/`);
  await expect(page.locator('.portfolio-card')).toHaveCount(15);
  await expect(page.locator('.portfolio-grid')).toContainText('ENBD, Electra Branch');
  await page.goto(`${base}/on-going/`);
  await expect(page.locator('.portfolio-card')).toHaveCount(13);
  await expect(page.locator('.portfolio-grid')).toContainText('Ministry of Finance');
  for(const file of ['completed','ongoing']){const response=await request.get(`${base}/documents/${file}-project-list.pdf`);expect(response.ok()).toBe(true);expect((await response.body()).subarray(0,4).toString()).toBe('%PDF');}
  await page.goto(`${base}/about/`);
  for(const heading of ['Values','Quality Assurance','Mission','Vision']) await expect(page.locator('.detail-body').getByRole('heading',{name:heading,exact:true})).toBeVisible();
  await page.goto(`${base}/our-team/`);await expect(page.locator('.team-card')).toHaveCount(4);
  await page.goto(`${base}/career/`);await expect(page.getByText('ITI AC Technician',{exact:true})).toBeVisible();
  await expect(page.getByLabel('Qualification')).toBeVisible();
  await expect(page.getByRole('link',{name:'existing online application form'})).toHaveAttribute('href','https://tcstech.me/career/');
});
test('contact form validates and prepares an email without pretending to send it',async({page})=>{
    await page.goto(`${base}/contact/`);
    await expect(page.getByRole('navigation', {name:'Main navigation'}).getByRole('link', {name:'Contact us'})).toHaveAttribute('href','/contact/');
    await expect(page.getByRole('link', {name:'Start a conversation'})).toHaveAttribute('href',/^https:\/\/wa.me\/971555289611/);
  await page.getByRole('button',{name:'Prepare email'}).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Full name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Your message').fill('Please discuss an energy audit.');
  await page.getByRole('button',{name:'Prepare email'}).click();
  await expect(page.getByRole('status')).toContainText('Your email draft is ready');
  await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/mailto:info@tcstech.me.*energy%20audit/);
  await expect(page.getByRole('link',{name:'+971 56 969 4333'}).first()).toHaveAttribute('href','tel:+971569694333');
});
test('expanded pages fit mobile and all service card images resolve',async({page,request})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  for(const slug of ['services','energy-optimization-through-energy-audit','mep-health-check','about','career','contact','completed','on-going','our-team','markets','news-insight']){
    await page.goto(`${base}/${slug}/`);await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),slug).toBe(true);
  }
  await page.goto(`${base}/services/`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(19);
  for(const image of await page.locator('.service-card-photo img').all()){const src=(await image.getAttribute('src'))!;const response=await request.get(`${base}${src}`);expect(response.ok(),src).toBe(true);expect(response.headers()['content-type']).toMatch(/^image\//);}
  await page.goto(`${base}/services/`);await expect(page.locator('.full-catalogue .service-card')).toHaveCount(19);await page.screenshot({path:'test-results/services-mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`${base}/energy-optimization-through-energy-audit/`);
  await expect(page.locator('.detail-body')).toContainText('ASHRAE Level 3');
  for(const image of await page.locator('.service-image-gallery img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);}
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'test-results/service-desktop.png',fullPage:true});
});
