import { useEffect, useState, useTransition } from 'react';

const currentRoute = () => location.pathname + location.search;

export function usePageNavigation() {
  const [route, setRoute] = useState(currentRoute);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const update = () => startTransition(() => setRoute(currentRoute()));
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a') : null;
      if (!target || target.hasAttribute('download') || (target.target && target.target !== '_self')) return;
      const url = new URL(target.href, location.href);
      // Documents, external links and same-page anchors keep normal browser behavior.
      if (url.origin !== location.origin || /\.[^/]+\/?$/.test(url.pathname)) return;
      if (url.pathname + url.search === currentRoute()) {
        if (!url.hash) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
        return;
      }
      event.preventDefault();
      history.pushState(null, '', url);
      update();
    };
    document.addEventListener('click', navigate);
    window.addEventListener('popstate', update);
    return () => {
      document.removeEventListener('click', navigate);
      window.removeEventListener('popstate', update);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [route]);

  return { route, pending };
}
