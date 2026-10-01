import { PageHero } from '../components/PageHero';
import { sourcePage, titles } from '../data/pages';
import { ArrowUpRight } from 'lucide-react';
export function MarketsPage() {
  return (
    <>
      <PageHero
        title={titles.markets}
        eyebrow="MARKETS"
        description={
          sourcePage("markets")!.blocks.find((b) => b.type === "p")?.text
        }
      />
      <section className="section-shell directory-section">
        <div className="market-grid">
          {[
            "Residential buildings & villas",
            "Commercial offices & high-rises",
            "Hotels & hospitality",
            "Hospitals & healthcare",
            "Shopping malls & retail",
            "Industrial plants & factories",
            "Schools & educational facilities",
            "Laboratories, clean rooms & data centres",
          ].map((name, i) => (
            <a key={name} href="/services/">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h2>{name}</h2>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
