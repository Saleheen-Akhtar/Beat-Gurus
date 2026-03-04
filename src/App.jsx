import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VideoSection from './components/VideoSection';
import Showcase from './components/Showcase';
import USP from './components/USP';
import Instruments from './components/Instruments';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import GlobalBackground from './components/GlobalBackground';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Preloader onComplete={() => setLoading(false)} />
      {!loading && (
        <>
          <GlobalBackground />
          <Navbar />
          <Hero />
          <About />
          <Showcase />
          <Services />
          <VideoSection />
          <USP />
          <Instruments />
          <Testimonials />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;
