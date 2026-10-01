import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0, variant = 'up' }: { children: ReactNode; className?: string; delay?: number; variant?: 'up' | 'stagger' | 'image' }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const reveal = () => {
      node.classList.add('revealed');
      observer?.disconnect();
    };
    // Never leave focused content hidden or wait for an animation to allow interaction.
    const focus = () => { node.style.transitionDelay = '0ms'; reveal(); };
    if (!motion.matches) {
      node.classList.add('reveal-ready');
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) reveal();
      }, { threshold: 0, rootMargin: '0px 0px 24px 0px' });
      observer.observe(node);
    }
    const preference = () => { if (motion.matches) reveal(); };
    motion.addEventListener('change', preference);
    node.addEventListener('focusin', focus);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', preference);
      node.removeEventListener('focusin', focus);
    };
  }, []);
  return <div ref={ref} className={`${className} motion-${variant}`} style={{ transitionDelay: `${Math.min(Math.max(delay, 0), 140)}ms` }}>{children}</div>;
}
