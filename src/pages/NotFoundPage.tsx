import { PageHero } from "../components/PageHero";

export function NotFoundPage() {
  return (
    <>
      <PageHero title="Page not found" eyebrow="404" />
      <div className="section-shell directory-section">
        <a className="button button-dark" href="/services/">
          Explore all services
        </a>
      </div>
    </>
  );
}
