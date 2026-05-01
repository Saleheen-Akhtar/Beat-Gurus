import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import GlobalBackground from './components/GlobalBackground';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import ShowDetailPage from './pages/ShowDetailPage';
import QrCodePage from './pages/QrCodePage';
import { showTypeMap } from './data/showData';

const getRouteInfo = (pathname) => {
  if (pathname === '/') {
    return { page: 'home' };
  }
  if (pathname === '/qr-code') {
    return { page: 'qr-code' };
  }

  if (pathname.startsWith('/shows/')) {
    const slug = pathname.replace('/shows/', '').replace(/\/$/, '');
    return { page: 'show', slug };
  }

  return { page: 'home' };
};

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [routeInfo, setRouteInfo] = useState(getRouteInfo(window.location.pathname));

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const cursorEnabled = useRef(false);
  const activelyRendering = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      setRouteInfo(getRouteInfo(window.location.pathname));
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    setRouteInfo(getRouteInfo(path));
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    let lenisRafId;
    function lenisRaf(time) { lenis.raf(time); lenisRafId = requestAnimationFrame(lenisRaf); }
    lenisRafId = requestAnimationFrame(lenisRaf);

    const hasAnyFinePointer = window.matchMedia('(any-pointer: fine)').matches;
    const hasPrimaryFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cursorEnabled.current = hasAnyFinePointer || hasPrimaryFinePointer;
    document.body.classList.toggle('custom-cursor-enabled', cursorEnabled.current);

    if (!cursorEnabled.current) {
      dotRef.current?.classList.add('is-hidden');
      ringRef.current?.classList.add('is-hidden');
    }

    const lerp = (a, b, t) => a + (b - a) * t;
    const stopCursorLoop = () => {
      activelyRendering.current = false;
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const tick = () => {
      if (!cursorEnabled.current || !activelyRendering.current) return;
      ring.current.x = lerp(ring.current.x, mouse.current.x, reduceMotion ? 1 : 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, reduceMotion ? 1 : 0.1);
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const startCursorLoopIfNeeded = () => {
      if (!cursorEnabled.current || activelyRendering.current) return;
      activelyRendering.current = true;
      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!cursorEnabled.current) return;

      if (e.pointerType === 'touch') {
        dotRef.current?.classList.add('is-hidden');
        ringRef.current?.classList.add('is-hidden');
        stopCursorLoop();
        return;
      }

      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        mouse.current = { x: e.clientX, y: e.clientY };
        dotRef.current?.classList.remove('is-hidden');
        ringRef.current?.classList.remove('is-hidden');
        startCursorLoopIfNeeded();
      }
    };
    const onLeave = () => {
      dotRef.current?.classList.add('is-hidden');
      ringRef.current?.classList.add('is-hidden');
      stopCursorLoop();
    };
    const onPointerOut = (e) => {
      if (e.relatedTarget == null) onLeave();
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onPointerOut);
    window.addEventListener('blur', onLeave);

    startCursorLoopIfNeeded();

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
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', onLeave);
      stopCursorLoop();
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  const showExists = routeInfo.page === 'show' && showTypeMap[routeInfo.slug];

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      <AnimatePresence>
        {!loadingComplete && (
          <Preloader onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      <GlobalBackground />
      {routeInfo.page !== 'qr-code' && <Navbar isHomeRoute={routeInfo.page === 'home'} />}

      {routeInfo.page === 'qr-code' && <QrCodePage />}
      {routeInfo.page === 'home' && <HomePage navigate={navigate} />}
      {routeInfo.page === 'show' && showExists && <ShowDetailPage slug={routeInfo.slug} />}
      {routeInfo.page === 'show' && !showExists && <ShowDetailPage slug="" />}
    </div>
  );
}

export default App;
