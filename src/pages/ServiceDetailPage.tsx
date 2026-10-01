import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from 'lucide-react';
import { catalogue } from '../data/catalogue';
import type { ServicePage } from '../data/pages';
import { getServiceVisual } from '../data/visuals';
import { ContentArticle } from '../components/ContentArticle';
export function ServiceDetailPage({ service }: { service: ServicePage }) {
  const related = catalogue.filter(
    (s) => s.group === service.group && s.slug !== service.slug,
  );
  const visual = getServiceVisual(service.slug, service.group);
  return (
    <>
      <PageHero
        title={service.title}
        eyebrow="OUR EXPERTISE"
        description={service.description}
      />
      <div className="section-shell detail-shell">
        <div className="service-image-gallery">
          <figure>
            <img
              src={visual.src}
              srcSet={`${visual.src.replace(".webp", "-640.webp")} 640w, ${visual.src} 1536w`}
              sizes="(max-width:760px) 88vw, (max-width:1440px) 88vw, 1268px"
              alt={visual.alt}
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </figure>
        </div>
        <ContentArticle blocks={service.blocks} />
        {related.length > 0 && (
          <section className="related-services">
            <p className="eyebrow">CONNECTED EXPERTISE</p>
            <h2>Explore related services</h2>
            <div className="related-grid">
              {related.map((s) => (
                <a key={s.slug} href={`/${s.slug}/`}>
                  <span>{s.title}</span>
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
