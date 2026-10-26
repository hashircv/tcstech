import { test, expect } from '@playwright/test';
const base='http://127.0.0.1:5174';
const serviceChecks: [string,string][] = [
  ['commissioning-management','Verification and Handover'],
  ['testing-and-balancing','rotational speed'],
  ['electrical-third-party-cold-live-testing-services','Insulation Resistance'],
  ['third-party-witness-and-verification','Follow-Up Support'],
  ['duct-leakage-testing-services','Pass/Fail status'],
  ['duck-cleaning','Final Inspection'],
  ['sound-and-vibration-testing-of-mechanical-equipments','Vibration Diagnostics'],
  ['acoustic-testing-for-interior-spaces','Speech Transmission Index'],
  ['indoor-air-quality-testing-service','How do you test air quality?'],
  ['re-commissioning-and-retro-commissioning','Educating Building Staff'],
  ['building-envelop-testing','Blower door'],
  ['thermal-imaging','What a thermal imaging survey can show'],
  ['u-value-testing-services','heat flux sensors'],
  ['micro-camera-inspection-service-for-drainage-lines-hvac-ducting','50-meter flexible camera cable'],
  ['mep-health-check','Property Inspection'],
];
test('all 15 deep links contain their specific technical detail and working contents navigation',async({page})=>{
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
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  await page.getByRole('searchbox',{name:'Search services'}).fill('micro');
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(1);
  await page.locator('.full-catalogue .service-card').click();
  await expect(page.locator('h1')).toHaveText('Micro-camera inspections');
  await page.goto(`${base}/services/?group=envelope`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(3);
  await page.getByRole('searchbox').fill('no matching xyz');
  await expect(page.getByRole('heading',{name:'No matching services'})).toBeVisible();
  await page.getByRole('button',{name:'Show all services'}).click();
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  await page.goto(base);
  await page.locator('.service-card').first().click();
  await page.getByRole('dialog').getByRole('link',{name:'Electrical cold & live testing'}).click();
  await expect(page.locator('.detail-body')).toContainText('Cold Testing');
  for(const slug of ['electrical-3rd-party-cold','duct-leak-test','dalt-leak-test']){
    await page.goto(`${base}/${slug}/`);
    await expect(page.locator('.detail-body')).toBeVisible();
  }
  for(const slug of ['testing-commissioning-of-mep-system','air-permeability-test-for-windows']){
    await page.goto(`${base}/${slug}/`);
    await expect(page.locator('h1')).toHaveText('Every service. Every detail.');
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
  await expect(page.getByRole('heading',{name:'Technical rigour, guided by care.'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'A reliable process is part of a reliable result.'})).toBeVisible();
  await expect(page.locator('.about-purpose-card').filter({hasText:'Our mission'})).toBeVisible();
  await expect(page.locator('.about-purpose-card').filter({hasText:'Our vision'})).toBeVisible();
  await page.goto(`${base}/our-team/`);await expect(page.locator('.team-card')).toHaveCount(4);
  await page.goto(`${base}/career/`);await expect(page.getByText('ITI AC Technician',{exact:true})).toBeVisible();
  await expect(page.getByLabel('Qualification')).toBeVisible();
  await expect(page.getByText('This form does not upload or store files.')).toBeVisible();
});
test('contact form validates and prepares an email without pretending to send it',async({page})=>{
    await page.goto(`${base}/contact/`);
    await expect(page.getByRole('navigation', {name:'Main navigation'}).getByRole('link', {name:'Contact us'})).toHaveAttribute('href','/contact/');
    await expect(page.getByRole('link', {name:'Start a conversation'})).toHaveAttribute('href',/^https:\/\/wa.me\/971555289611/);
  await expect(page.locator('#main').getByRole('link',{name:'+971 564090854'})).toHaveAttribute('href','tel:+971564090854');
  await expect(page.locator('#main').getByRole('link',{name:'info@tcstech.me'})).toHaveAttribute('href','mailto:info@tcstech.me');
  await expect(page.getByLabel('Name')).toHaveAttribute('required','');
  await expect(page.getByLabel('Email')).toHaveAttribute('required','');
  await expect(page.locator('.enquiry-form').getByLabel('Message')).toHaveAttribute('required','');
  await expect(page.getByLabel('Mobile no (optional)')).not.toHaveAttribute('required','');
  await page.getByRole('button',{name:'Send'}).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Name').fill('Test Visitor');
  await page.getByLabel('Email').fill('visitor@example.com');
  await page.locator('.enquiry-form').getByLabel('Message').fill('Please discuss an energy audit.');
  await page.getByRole('button',{name:'Send'}).click();
  await expect(page.getByRole('status')).toContainText('Your email draft is ready');
  await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/mailto:info@tcstech.me.*energy%20audit/);
  await expect(page.locator('#main').getByRole('link',{name:'+971 569694333'})).toHaveAttribute('href','tel:+971569694333');
});
test('standards supplied for selected services are visible on their detail pages',async({page})=>{
  const checks:[string,string][]=[
    ['commissioning-management','ASHRAE'],
    ['testing-and-balancing','CIBSE'],
    ['electrical-third-party-cold-live-testing-services','DEWA'],
    ['third-party-witness-and-verification','NEBB'],
    ['duct-leakage-testing-services','SMACNA'],
    ['duck-cleaning','NADCA'],
    ['indoor-air-quality-testing-service','DM-HSD-GU119-IAQ'],
  ];
  for(const [slug,standard] of checks){
    await page.goto(`${base}/${slug}/`);
    await expect(page.getByRole('region',{name:'Applicable standards and guidance'})).toContainText(standard);
  }
});
test('expanded pages fit mobile and all service card images resolve',async({page,request})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  for(const slug of ['services','mep-health-check','about','career','contact','completed','on-going','our-team','markets','news-insight']){
    await page.goto(`${base}/${slug}/`);await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),slug).toBe(true);
  }
  await page.goto(`${base}/services/`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  for(const image of await page.locator('.service-card-photo img').all()){const src=(await image.getAttribute('src'))!;const response=await request.get(`${base}${src}`);expect(response.ok(),src).toBe(true);expect(response.headers()['content-type']).toMatch(/^image\//);}
  await page.goto(`${base}/services/`);await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);await page.screenshot({path:'test-results/services-mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`${base}/services/`);
  await expect(page.locator('.full-catalogue .service-card')).toHaveCount(15);
  for(const image of await page.locator('.service-image-gallery img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);}
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'test-results/service-desktop.png',fullPage:true});
});
