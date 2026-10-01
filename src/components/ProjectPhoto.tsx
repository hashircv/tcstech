import media from '../data/project-media.json';

const homeKeys: Record<string,string> = {
  'W Hotel, Yas Island':'W Hotel Yas Island',
  'Jumeirah Emirates Towers':'Jumeirah Emirates Towers',
  'BEEAH Headquarters':'BEEAH Headquarter',
  'Madinat Jumeirah Resort':'Madinat Jumeirah Resort',
  'Dubai Holding HQ':'Dubai Holding HQ Office Refurbishment',
  'Marina Apartments':'Marina Apartments',
};
export function ProjectPhoto({ title, status = 'completed', compact = false }: {title:string; status?:string; compact?:boolean}) {
  const key=homeKeys[title]||title;
  const photo=media.find(item=>item.status===status&&(item.title===key||item.title.startsWith(`${key} (`)||item.title.startsWith(`${key},`)));
  if(!photo)return null;
  const name=title.replace(/\s*\(.*\)\s*$/,'').replace(/^Job name /,'');
  return <div className={compact?'project-thumbnail':'portfolio-photo'}><img src={photo.image} srcSet={`${photo.mobile} 640w, ${photo.image} 1000w`} sizes={compact?'(max-width:760px) 88vw, 130px':'(max-width:760px) 88vw, (max-width:1000px) 44vw, 29vw'} alt={`${name} — image from the TCS project portfolio`} loading="lazy" width="1000" height="667" style={{objectPosition:photo.position}}/></div>;
}
