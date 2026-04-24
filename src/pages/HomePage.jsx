import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ShowTypes from '../components/ShowTypes';
import VideoSection from '../components/VideoSection';
import Showcase from '../components/Showcase';
import USP from '../components/USP';
import Instruments from '../components/Instruments';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage = ({ navigate }) => (
  <main id="main-content">
    <Hero />

    <div className="marquee-outer">
      <div className="marquee-track">
        {['Djembe Rhythms', 'African Beats', 'Indian Soul', 'Live Percussion', 'Pure Acoustic', 'Raw Energy',
          'Djembe Rhythms', 'African Beats', 'Indian Soul', 'Live Percussion', 'Pure Acoustic', 'Raw Energy'].map((w, i) => (
          <span key={i} className="marquee-item">{w}<span className="marquee-sep" /></span>
        ))}
      </div>
    </div>

    <About />
    <Showcase />
    <Services />
    <ShowTypes navigate={navigate} />
    <VideoSection />
    <USP />
    <Instruments />
    <Testimonials />
    <FAQ />
    <Contact />
  </main>
);

export default HomePage;
