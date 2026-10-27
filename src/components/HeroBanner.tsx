import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import "./hero-banner.css";

const slides = [
  {
    image: "architecture",
    label: "High-performance buildings",
    detail: "A lighter footprint. A lasting impact.",
    alt: "Illustrative contemporary sustainable building with shaded glass and landscaped surroundings",
    position: "center",
  },
  {
    image: "engineering",
    label: "Precision in every system",
    detail: "Commissioned with care. Verified with confidence.",
    alt: "Illustrative commissioning engineer inspecting a modern mechanical plant room",
    position: "58% center",
  },
  {
    image: "engineering",
    video: true,
    label: "TCS in action",
    detail: "Real expertise. On site. Every day.",
    alt: "TCS engineering team arriving on site with testing equipment",
    position: "58% center",
  },
  {
    image: "healthy-space",
    label: "Healthier places to be",
    detail: "Better air. Greater comfort. Long-term value.",
    alt: "Illustrative bright modern workplace with greenery and integrated ventilation",
    position: "center",
  },
];

export function HeroBanner() {
  const [active, setActive] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState([0]);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [backgroundError, setBackgroundError] = useState(false);
  const [inView, setInView] = useState(true);
  const [mobileVideo, setMobileVideo] = useState(
    () => matchMedia("(max-width:760px)").matches,
  );
  const banner = useRef<HTMLElement>(null);
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Retain visited images for smooth crossfades without downloading every
    // hidden slide during the initial page load.
    setLoadedSlides((loaded) => loaded.includes(active) ? loaded : [...loaded, active]);
  }, [active]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = matchMedia("(max-width:760px)");
    const resize = () => setMobileVideo(viewport.matches);
    const motion = () => setReduced(media.matches);
    const visibility = () => setVisible(!document.hidden);
    media.addEventListener("change", motion);
    viewport.addEventListener("change", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", motion);
      viewport.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (banner.current) observer.observe(banner.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = backgroundVideo.current;
    if (!element) return;
    if (!slides[active].video || paused || reduced || !visible || !inView)
      element.pause();
    else {
      element.muted = true;
      void element.play().catch(() => {});
    }
  }, [active, paused, reduced, visible, inView]);
  useEffect(() => {
    if (paused || interacting || reduced || !visible || !inView) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      slides[active].video ? 8000 : 6500,
    );
    return () => clearInterval(timer);
  }, [paused, interacting, reduced, visible, inView, active]);
  const move = (direction: number) =>
    setActive((value) => (value + direction + slides.length) % slides.length);
  return (
    <>
      <section
        ref={banner}
        className="hero-banner"
        aria-roledescription="carousel"
        aria-label="Building performance highlights"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setInteracting(false);
        }}
      >
        <div className="hero-scenes">
          {slides.map((slide, index) => (
            <div
              key={slide.label}
              className={`hero-scene ${index === active ? "is-active" : ""}`}
              aria-hidden={index !== active}
            >
              {(index === active || loadedSlides.includes(index)) && <img
                src={
                  slide.video
                    ? "/images/editorial/tcs-video-poster.webp"
                    : `/images/editorial/${slide.image}.webp`
                }
                srcSet={
                  slide.video
                    ? undefined
                    : `/images/editorial/${slide.image}-640.webp 640w, /images/editorial/${slide.image}-960.webp 960w, /images/editorial/${slide.image}.webp 1536w`
                }
                sizes="100vw"
                alt={slide.alt}
                fetchPriority={index === 0 ? "high" : "low"}
                width="1536"
                height="1024"
                style={{ objectPosition: slide.position }}
              />}
              {slide.video &&
                index === active &&
                !reduced &&
                !backgroundError && (
                  <video
                    className="hero-background-video"
                    ref={backgroundVideo}
                    src={
                      mobileVideo
                        ? "/videos/tcs-hero-mobile.mp4"
                        : "/videos/tcs-hero.mp4"
                    }
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/editorial/tcs-video-poster.webp"
                    aria-hidden="true"
                    onLoadedData={(event) =>
                      event.currentTarget.classList.add("video-ready")
                    }
                    onError={() => setBackgroundError(true)}
                  />
                )}
            </div>
          ))}
        </div>
        <div className="hero-banner-shade" />
        <div className="hero-banner-content section-shell">
          <p className="eyebrow">
            <span className="status-dot" />
            ENGINEERING A MORE SUSTAINABLE FUTURE
          </p>
          <h1>
            Better buildings.
            <br />A better tomorrow.
          </h1>
          <p className="hero-banner-description">
            End-to-end building energy solutions.
            <br />
            Expert engineering for efficient systems,
            <br className="desktop-break" /> healthier spaces and a sustainable
            future.
          </p>
          <div className="hero-banner-actions">
            <a className="button" href="#services">
              Explore our expertise <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-banner-bottom section-shell">
          <div key={active} className="hero-slide-caption">
            <span className="small-label">
              0{active + 1} / {slides[active].label}
            </span>
            <p>{slides[active].detail}</p>
          </div>
          <div className="hero-carousel-controls">
            <button aria-label="Previous slide" onClick={() => move(-1)}>
              <ChevronLeft size={19} />
            </button>
            <div className="hero-slide-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  aria-label={`Show slide ${index + 1}: ${slide.label}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  <span />
                </button>
              ))}
            </div>
            <button aria-label="Next slide" onClick={() => move(1)}>
              <ChevronRight size={19} />
            </button>
            <button
              aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
          <a className="hero-discover" href="#about" aria-label="Discover TCS">
            <ArrowDown size={21} />
          </a>
        </div>
        <span
          className="sr-only"
          aria-live={paused || interacting || reduced ? "polite" : "off"}
        >
          Slide {active + 1} of {slides.length}: {slides[active].label}
        </span>
      </section>
    </>
  );
}
