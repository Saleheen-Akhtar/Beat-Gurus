import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VideoSection from './components/VideoSection';
import Gallery from './components/Gallery';
import USP from './components/USP';
import Instruments from './components/Instruments';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <VideoSection />
      <USP />
      <Gallery />
      <Instruments />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
