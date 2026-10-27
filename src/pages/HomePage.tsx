import { lazy, Suspense, useState } from "react";
import {
  ArrowUpRight,
  Activity,
  Building2,
  Check,
  Leaf,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Wind,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { contact, projects, services } from "../data/content";
import type { Service } from "../data/content";
import { ProjectPhoto } from "../components/ProjectPhoto";
import { HeroBanner } from "../components/HeroBanner";
import { ServicePhoto } from "../components/ServicePhoto";
import { catalogue } from "../data/catalogue";
import "./home-motion.css";

const ServiceDialog = lazy(() =>
  import("../components/ServiceDialog").then((module) => ({ default: module.ServiceDialog })),
);

const icons = [SlidersHorizontal, Leaf, Building2, Activity, Wind, ShieldCheck];
const filters = [
  "All services",
  "MEP systems",
  "Energy performance",
  "Building integrity",
  "Healthy spaces",
];

export default function HomePage() {
  const [filter, setFilter] = useState("All services");
  const [selected, setSelected] = useState<Service | null>(null);
  const [allProjects, setAllProjects] = useState(false);
  return (
    <div className="home-page">
      <HeroBanner />
      <div className="expertise-strip">
        <span>PRECISION IN EVERY DETAIL</span>
        <span>
          <Check /> MEP expertise
        </span>
        <span>
          <Check /> Certified engineers
        </span>
        <span>
          <Check /> Sustainable thinking
        </span>
        <span>
          <Check /> End-to-end solutions
        </span>
      </div>
      <section id="about" className="section-shell about-section">
        <Reveal>
          <p className="eyebrow section-kicker">01 / WHO WE ARE</p>
          <h2>
            Engineering performance.
            <br />
            <span className="muted serif-word">Building trust.</span>
          </h2>
        </Reveal>
        <Reveal className="about-right" variant="stagger">
          <p className="lead">
            Great buildings don’t just look good.
            <br />
            They work better, too.
          </p>
          <p>
            We are TCS Building Energy Efficiency Services — a team of engineers
            helping buildings across the UAE reach their full potential. Since
            2017, we’ve brought together technical precision and a practical
            commitment to sustainability.
          </p>
          <p>
            From commissioning a new development to improving an existing space,
            we solve complex building challenges with clear, project-specific
            solutions.
          </p>
          <a className="text-link about-detail-link" href="/about/">
            Our story, values & mission <ArrowUpRight size={16} />
          </a>
          <div className="stats">
            <div>
              <strong>
                300<span>+</span>
              </strong>
              <span>Completed projects</span>
            </div>
            <div>
              <strong>2017</strong>
              <span>Our story began</span>
            </div>
            <div>
              <strong>
                360<span>°</span>
              </strong>
              <span>Building lifecycle support</span>
            </div>
          </div>
        </Reveal>
      </section>
      <section id="services" className="services-section">
        <div className="section-shell">
          <Reveal className="section-heading" variant="stagger">
            <div>
              <p className="eyebrow section-kicker">02 / OUR EXPERTISE</p>
              <h2>
                Every system. Every detail.
                <br />
                <span className="serif-word muted">One trusted partner.</span>
              </h2>
            </div>
            <p>
              Specialist expertise, connected thinking.
              <br />
              Explore solutions for every stage of
              <br className="desktop-break" /> your building’s lifecycle.
            </p>
          </Reveal>
          <div className="service-filters" aria-label="Filter services">
            {filters.map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="service-grid">
            {services
              .filter((s) => filter === "All services" || s.category === filter)
              .map((service) => {
                const index = services.indexOf(service);
                const Icon = icons[index];
                return (
                  <Reveal key={service.id} delay={(index % 3) * 70}>
                    <button
                      className="service-card"
                      onClick={() => setSelected(service)}
                      aria-haspopup="dialog"
                    >
                      <ServicePhoto slug="" group={service.id} />
                      <div className="service-card-copy">
                        <div className="card-top">
                          <Icon size={30} strokeWidth={1.3} />
                          <span>0{index + 1}</span>
                        </div>
                        <span className="service-category">
                          {service.category}
                        </span>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <span className="card-bottom">
                          Explore service <ArrowUpRight size={20} />
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
          </div>
          <div className="all-services-link">
            <a className="button button-dark" href="/services/">
              Browse all {catalogue.length} services <ArrowUpRight size={18} />
            </a>
          </div>
          <p className="services-note">
            Every building is different. So is our approach.{" "}
            <a href="#contact">
              Find the right solution for yours <ArrowUpRight size={14} />
            </a>
          </p>
        </div>
      </section>
      <section id="projects" className="section-shell projects-section">
        <Reveal className="section-heading" variant="stagger">
          <div>
            <p className="eyebrow section-kicker">03 / SELECTED EXPERIENCE</p>
            <h2>
              Trusted spaces.
              <br />
              <span className="serif-word muted">Proven expertise.</span>
            </h2>
          </div>
          <button
            className="text-link project-toggle"
            onClick={() => setAllProjects(!allProjects)}
          >
            {allProjects ? "Show selected projects" : "Explore more projects"}{" "}
            <ArrowUpRight size={18} />
          </button>
        </Reveal>
        <div className="project-feature">
          <Reveal className="project-photo" variant="image">
            <img
              src="/images/dubai.jpg"
              alt="Dubai skyline, illustrating the region we serve"
              loading="lazy"
              width="1000"
              height="1250"
            />
            <span>
              OUR HOME. OUR INSPIRATION. <span>DUBAI, UAE</span>
            </span>
          </Reveal>
          <div className="project-list">
            {projects
              .slice(0, allProjects ? projects.length : 3)
              .map((project, i) => (
                <Reveal key={project.name} delay={(i % 3) * 65}>
                  <article className="project-item">
                    <ProjectPhoto title={project.name} compact />
                    <div className="project-item-copy">
                      <div className="project-index">
                        0{i + 1}
                        <span>{project.type}</span>
                      </div>
                      <h3>{project.name}</h3>
                      <p>{project.work}</p>
                      <div className="project-location">{project.location}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
          </div>
        </div>
        <div className="all-services-link">
          <a className="text-link" href="/projects/">
            View completed and ongoing project portfolios{" "}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section id="approach" className="approach-section">
        <div className="section-shell">
          <Reveal className="section-heading" variant="stagger">
            <div>
              <p className="eyebrow section-kicker">04 / THE TCS APPROACH</p>
              <h2>
                Measured in performance.
                <br />
                <span className="serif-word">Driven by purpose.</span>
              </h2>
            </div>
            <p>
              Better outcomes start with understanding.
              <br />
              We work alongside you, from the first
              <br className="desktop-break" /> question to the final
              verification.
            </p>
          </Reveal>
          <div className="approach-grid">
            {[
              {
                title: "Understand",
                text: "We listen, assess your building, and identify what matters for your project.",
              },
              {
                title: "Investigate",
                text: "We test and measure to uncover the root causes behind system performance.",
              },
              {
                title: "Optimize",
                text: "We develop practical, tailored recommendations for efficient, reliable operation.",
              },
              {
                title: "Verify",
                text: "We validate the results and document performance so you can move forward with confidence.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 60} variant="stagger">
                <div className="step-number">
                  0{i + 1}
                  <span />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell purpose-section">
        <Reveal className="purpose-image" variant="image">
          <img
            src="/images/editorial/healthy-space.webp"
            srcSet="/images/editorial/healthy-space-640.webp 640w, /images/editorial/healthy-space.webp 1536w"
            sizes="(max-width:760px) 88vw, 44vw"
            alt="Illustrative daylit modern workplace with ventilation, greenery and comfortable seating"
            loading="lazy"
            width="1000"
            height="667"
          />
        </Reveal>
        <Reveal className="purpose-copy" variant="stagger">
          <p className="eyebrow section-kicker">
            PERFORMANCE WITH PEOPLE IN MIND
          </p>
          <h2>
            Healthier spaces.
            <br />
            Lighter footprints.
            <br />
            <span className="serif-word muted">Long-term value.</span>
          </h2>
          <p>
            Building efficiency is about more than energy. It’s about the air we
            breathe, the comfort we feel, and the resources we leave for
            tomorrow.
          </p>
          <a
            className="text-link"
            href="#services"
            onClick={() => setFilter("Healthy spaces")}
          >
            Discover healthier building solutions <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </section>
      <section id="contact" className="contact-section">
        <div className="section-shell">
          <Reveal className="contact-content" variant="stagger">
            <div>
              <p className="eyebrow section-kicker">
                LET’S BUILD SOMETHING BETTER
              </p>
              <h2>
                Your building has potential.
                <br />
                <span className="serif-word">Let’s unlock it.</span>
              </h2>
              <p>
                Tell us about your project. We’ll help you find the right way
                forward.
              </p>
            </div>
            <a className="button button-dark" href="/contact/">
              Discuss your project <ArrowUpRight size={19} />
            </a>
          </Reveal>
          <div className="contact-details">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneLink}`}>
              <Phone size={16} />
              {contact.phone}
            </a>
            <span>Dubai, United Arab Emirates</span>
          </div>
        </div>
      </section>
      {selected && <Suspense fallback={null}>
        <ServiceDialog service={selected} onClose={() => setSelected(null)} />
      </Suspense>}
    </div>
  );
}
