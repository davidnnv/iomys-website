import { useRef } from 'react';
import { useSite } from './SiteContext';
import useSmoothScroll from './hooks/useSmoothScroll';
import useReveals from './hooks/useReveals';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import ServicesMarquee from './components/ServicesMarquee';
import About from './components/About';
import Fig from './components/Fig';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Process from './components/Process';
import Where from './components/Where';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { lang } = useSite();
  const pageRef = useRef(null);

  useSmoothScroll();
  useReveals(pageRef, [lang]);

  return (
    <div className="page" ref={pageRef}>
      <a href="#main" className="skip-link">
        {lang === 'mk' ? 'Прескокни до содржината' : 'Skip to content'}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <ServicesMarquee />
        <About />
        <Fig />
        <Services />
        <Pricing />
        <Process />
        <Where />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
