import { lazy, Suspense, useEffect } from 'react';
import { Header, Footer } from './components/SiteLayout';
import { usePageNavigation } from './hooks/usePageNavigation';
import { homeSEO, updatePageSEO } from './data/seo';

const HomePage = lazy(() => import('./pages/HomePage'));
const PageRouter = lazy(() => import('./pages/PageRouter'));

export default function App() {
  const { route, pending } = usePageNavigation();
  const pathname = route.split('?')[0];
  const isHome = ['/', '/solar-spark/', '/solar-spark'].includes(pathname);

  useEffect(() => {
    if (isHome) updatePageSEO(homeSEO);
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
