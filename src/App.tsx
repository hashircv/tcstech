import { lazy, Suspense, useEffect } from 'react';
import { Header, Footer } from './components/SiteLayout';
import { usePageNavigation } from './hooks/usePageNavigation';

const HomePage = lazy(() => import('./pages/HomePage'));
const PageRouter = lazy(() => import('./pages/PageRouter'));

export default function App() {
  const { route, pending } = usePageNavigation();
  const pathname = route.split('?')[0];
  const isHome = ['/', '/solar-spark/', '/solar-spark'].includes(pathname);

  useEffect(() => {
    if (!isHome) return;
    document.title = 'TCS Building Energy Efficiency Services | Better buildings';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'End-to-end building energy solutions, expert MEP engineering and healthier spaces in the UAE.');
  }, [isHome]);

  return <>
    <Header/>
    <main id="main" aria-busy={pending}>
      <Suspense fallback={<div className="page-loading" role="status">Loading page…</div>}>
        {isHome ? <HomePage/> : <PageRouter key={route} pathname={pathname}/>}
      </Suspense>
    </main>
    <Footer/>
  </>;
}
