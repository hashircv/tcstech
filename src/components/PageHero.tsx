interface PageHeroProps {
  title: string;
  eyebrow: string;
  description?: string;
}

export function PageHero({ title, eyebrow, description }: PageHeroProps) {
  return (
    <section className="page-hero section-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span>
        {eyebrow === 'OUR EXPERTISE' && <><a href="/services/">Services</a><span>/</span></>}
        <span aria-current="page">{title}</span>
      </nav>
      <p className="eyebrow section-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-intro">{description}</p>}
    </section>
  );
}
