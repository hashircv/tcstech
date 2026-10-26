import { PageHero } from '../components/PageHero';
import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { catalogue } from '../data/catalogue';
import { services as groups } from '../data/content';
import { Reveal } from '../components/Reveal';
import { ServicePhoto } from '../components/ServicePhoto';
export function ServicesPage() {
  const [group, setGroup] = useState(
    new URLSearchParams(location.search).get("group") || "all",
  );
  const [search, setSearch] = useState("");
  const list = catalogue.filter(
    (s) =>
      (group === "all" || s.group === group) &&
      `${s.title} ${s.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHero
        title="Every service. Every detail."
        eyebrow="OUR EXPERTISE"
        description="16 specialist services, connected by one purpose: better-performing buildings. Explore the full scope, methods and reporting behind each service."
      />
      <section className="section-shell directory-section">
        <div className="directory-tools">
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search services</span>
            <input
              type="search"
              value={search}
              placeholder="Search services, tests or systems"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <span aria-live="polite">{list.length} services</span>
        </div>
        <div className="service-filters">
          <button
            className={group === "all" ? "active" : ""}
            aria-pressed={group === "all"}
            onClick={() => setGroup("all")}
          >
            All services
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              className={group === g.id ? "active" : ""}
              aria-pressed={group === g.id}
              onClick={() => setGroup(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>
        <div className="service-grid full-catalogue">
          {list.map((service) => (
            <Reveal key={service.slug}>
              <a className="service-card" href={`/${service.slug}/`}>
                <ServicePhoto slug={service.slug} group={service.group} />
                <div className="service-card-copy">
                  <span className="service-category">
                    {groups.find((g) => g.id === service.group)?.category}
                  </span>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <span className="card-bottom">
                    View full service details
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <div className="empty-state">
            <h2>No matching services</h2>
            <p>Try a broader search or clear your filters.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setSearch("");
                setGroup("all");
              }}
            >
              Show all services
            </button>
          </div>
        )}
      </section>
    </>
  );
}
