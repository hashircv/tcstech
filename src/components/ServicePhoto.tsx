import { getServiceVisual } from "../data/visuals";

export function ServicePhoto({ slug, group }: { slug: string; group: string }) {
  const visual = getServiceVisual(slug, group);
  return (
    <div className="service-card-photo">
      <img
        src={visual.src}
        srcSet={`${visual.src.replace(".webp", "-640.webp")} 640w, ${visual.src} 1536w`}
        sizes="(max-width:760px) 88vw, (max-width:1000px) 43vw, 29vw"
        alt={visual.alt}
        loading="lazy"
        width="1536"
        height="1024"
      />
    </div>
  );
}
