import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

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
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const cursorEnabled = useRef(false);

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    let lenisRafId;
    function lenisRaf(time) { lenis.raf(time); lenisRafId = requestAnimationFrame(lenisRaf); }
    lenisRafId = requestAnimationFrame(lenisRaf);

    // Custom cursor (enable when any available input can act as a fine pointer)
    const hasAnyFinePointer = window.matchMedia('(any-pointer: fine)').matches;
    const hasPrimaryFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cursorEnabled.current = hasAnyFinePointer || hasPrimaryFinePointer;

    if (!cursorEnabled.current) {
      dotRef.current?.classList.add('is-hidden');
      ringRef.current?.classList.add('is-hidden');
    }

    const onMove = (e) => {
      if (!cursorEnabled.current) return;
      if (e.pointerType === 'touch') {
        dotRef.current?.classList.add('is-hidden');
        ringRef.current?.classList.add('is-hidden');
        return;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
      dotRef.current?.classList.remove('is-hidden');
      ringRef.current?.classList.remove('is-hidden');
    };
    const onLeave = () => {
      dotRef.current?.classList.add('is-hidden');
      ringRef.current?.classList.add('is-hidden');
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, reduceMotion ? 1 : 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, reduceMotion ? 1 : 0.1);
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    // Hover state via event delegation (handles dynamically rendered elements)
    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target) {
        dotRef.current?.classList.add('hovered');
        ringRef.current?.classList.add('hovered');
      }
    };
    const onOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target) {
        dotRef.current?.classList.remove('hovered');
        ringRef.current?.classList.remove('hovered');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(lenisRafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div className="app">
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      <GlobalBackground />
      <Navbar />
      <Hero />

      {/* Marquee separator */}
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
      <VideoSection />
      <USP />
      <Instruments />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;
