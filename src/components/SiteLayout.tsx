import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import './navigation.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header ref={header} className="site-header">
        <Brand />
        <nav
          id="main-nav"
          className={`navigation ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="/" className="mobile-home-link"
            aria-current={location.pathname === "/" ? "page" : undefined}
            onClick={() => setOpen(false)}>
            Home
          </a>
          {[
            ["About us", "/about/"],
            ["Our expertise", "/services/"],
            ["Our projects", "/projects/"],
            ["Careers", "/career/"],
          ].map(([title, url]) => (
            <a
              key={url}
              href={url}
              aria-current={location.pathname === url ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {title}
            </a>
          ))}
          <a href="/contact/" className="button button-dark nav-contact">
            Contact us <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}

export { Brand } from './Brand';
export { Footer } from './Footer';
