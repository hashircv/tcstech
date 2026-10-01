import { PageHero } from '../components/PageHero';
import { titles } from '../data/pages';
export function NewsPage() {
  return (
    <>
      <PageHero title={titles["news-insight"]} eyebrow="TCS UPDATES" />
      <section className="section-shell directory-section">
        <div className="empty-state">
          <h2>Company updates will appear here.</h2>
          <p>
            In the meantime, explore our service guides and project portfolio.
          </p>
          <a className="button button-dark" href="/services/">
            Explore our expertise
          </a>
        </div>
      </section>
    </>
  );
}
