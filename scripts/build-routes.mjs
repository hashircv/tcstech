import fs from 'node:fs/promises';
const content=JSON.parse(await fs.readFile('src/data/site-content.json','utf8'));
const html=await fs.readFile('dist/index.html','utf8');
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const supporting={services:'Our expertise',about:'About TCS','our-team':'Our team',projects:'Project experience',completed:'Completed projects','on-going':'Ongoing projects',career:'Careers',contact:'Contact TCS',markets:'Markets','news-insight':'News & insights'};
const routes=[...content.services.map(s=>({slug:s.slug,title:s.title,description:s.description})),...Object.entries(supporting).map(([slug,title])=>({slug,title,description:`${title} — TCS Building Energy Efficiency Services in the UAE.`}))];
for(const [alias,target] of Object.entries(content.aliases)) {
  const page=routes.find(r=>r.slug===target)||{title:'TCS Building Energy Efficiency Services',description:'Better buildings. A better tomorrow.'};
  routes.push({...page,slug:alias,canonical:target});
}
for(const route of routes){
  const canonical=`https://tcstech.me/${route.canonical??route.slug}${(route.canonical??route.slug)?'/':''}`;
  const output=html.replace(/<title>.*?<\/title>/,`<title>${escape(route.title)} | TCS</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(route.description)}"/>`).replace('</head>',`<link rel="canonical" href="${canonical}"/></head>`);
  await fs.mkdir(`dist/${route.slug}`,{recursive:true});
  await fs.writeFile(`dist/${route.slug}/index.html`,output);
}
await fs.writeFile('dist/404.html',html.replace(/<title>.*?<\/title>/,'<title>Page not found | TCS</title>').replace('</head>','<meta name="robots" content="noindex"/></head>'));
await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://tcstech.me/</loc></url>${routes.filter(r=>r.canonical===undefined).map(r=>`<url><loc>https://tcstech.me/${r.slug}/</loc></url>`).join('')}</urlset>`);
await fs.writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: https://tcstech.me/sitemap.xml\n');
await fs.writeFile('dist/_redirects',Object.entries(content.aliases).map(([alias,target])=>`/${alias}/ /${target}${target?'/':''} 301`).join('\n')+'\n/* /index.html 200\n');
console.log(`Generated ${routes.length} route entry points, sitemap, canonical metadata and legacy redirects.`);
