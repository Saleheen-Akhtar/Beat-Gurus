import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaYoutube, FaFacebookF, FaInstagram, FaGlobe, FaGoogle } from 'react-icons/fa';


const socialLinks = [
  { name: 'YouTube',        url: 'https://m.youtube.com/@BeatGurus',                            icon: <FaYoutube size={32} />,   id: 'youtube' },
  { name: 'Facebook',       url: 'https://www.facebook.com/share/1G8v4BVcoJ/',                  icon: <FaFacebookF size={32} />, id: 'facebook' },
  { name: 'Instagram',      url: 'https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94', icon: <FaInstagram size={32} />, id: 'instagram' },
  { name: 'Website',        url: 'https://www.beatgurus.org/',                                  icon: <FaGlobe size={32} />,     id: 'website' },
  { name: 'Google Reviews', url: 'https://maps.app.goo.gl/U3CVeMZm7xq5gdw96',                  icon: <FaGoogle size={32} />,    id: 'google', primary: true },
];



const floatingMediaLinks = [
  { name: 'Flute Fusion', url: 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1' },
  { name: 'Drum Circle', url: 'https://drive.google.com/drive/folders/14iqZ8zuTiPTlLasgg7LmVp6bz7jwX4vj' },
  { name: 'DJ x Percussion', url: 'https://drive.google.com/drive/folders/1ZrlbT8I60V6ULuKDBSLx-clOfD8dik4O' },
];
/* ─── Gravity physics for floating links ─── */
const GRAVITY = 0.45;
const DAMPING = 0.62;
const FRICTION = 0.988;

function useGravityLinks(containerRef, links, shouldStart) {
  const bodiesRef = useRef([]);
  const rafRef    = useRef(null);
  const dragRef   = useRef(null); // { idx, offsetX, offsetY }
  const startedRef = useRef(false);

  const initBodies = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    bodiesRef.current = links.map((_, i) => {
      const spread = width / (links.length + 1);
      return {
        x: spread * (i + 1),
        y: -220 - i * 120,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 0.8,
        w: 0, h: 0,               // filled after first layout measure
        rotation: (i % 2 === 0 ? -1 : 1) * (i + 2),
        settled: false,
      };
    });
  }, [links, containerRef]);

  const measureNode = useCallback((el, idx) => {
    if (!el || !bodiesRef.current[idx]) return;
    bodiesRef.current[idx].w = el.offsetWidth;
    bodiesRef.current[idx].h = el.offsetHeight;
  }, []);

  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    bodiesRef.current.forEach((b, i) => {
      if (dragRef.current?.idx === i) return; // skip dragged body

      b.vy += GRAVITY;
      b.vx *= FRICTION;
      b.vy *= FRICTION;
      b.x  += b.vx;
      b.y  += b.vy;

      // Floor (with safe bottom padding)
      const floor = height - b.h - 4;
      if (b.y >= floor) {
        b.y  = floor;
        b.vy = -b.vy * DAMPING;
        b.vx *= 0.85;
        if (Math.abs(b.vy) < 0.8) { b.vy = 0; b.settled = true; }
      }
      // Ceiling
      if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * DAMPING; }
      // Walls
      if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * DAMPING; }
      const rightWall = width - b.w;
      if (b.x > rightWall) { b.x = rightWall; b.vx = -Math.abs(b.vx) * DAMPING; }

      // Hard-clamp every frame after velocity/position updates
      b.y = Math.min(Math.max(b.y, 0), floor);
      b.x = Math.min(Math.max(b.x, 0), rightWall);
    });

    // Apply positions to DOM directly (bypass React re-renders)
    el.querySelectorAll('[data-gravity-body]').forEach((node, i) => {
      const b = bodiesRef.current[i];
      if (!b) return;
      node.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.rotation}deg)`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [containerRef]);

  // Pointer drag
  const onPointerDown = useCallback((e, idx) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const b = bodiesRef.current[idx];
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = {
      idx,
      offsetX: clientX - rect.left - b.x,
      offsetY: clientY - rect.top  - b.y,
    };
    b.vx = 0; b.vy = 0; b.settled = false;
  }, [containerRef]);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { idx, offsetX, offsetY } = dragRef.current;
    const b = bodiesRef.current[idx];
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const newX = clientX - rect.left - offsetX;
    const newY = clientY - rect.top  - offsetY;
    b.vx = newX - b.x;
    b.vy = newY - b.y;
    b.x  = newX;
    b.y  = newY;
  }, [containerRef]);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;
    initBodies();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup',   onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend',  onPointerUp);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup',   onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend',  onPointerUp);
    };
  }, [shouldStart, initBodies, tick, onPointerMove, onPointerUp]);

  return { measureNode, onPointerDown };
}

const QrCodePage = () => {
  useEffect(() => {
    document.title = "Campaign | Beat Gurus";
    document.body.style.backgroundColor = "#0B0B0B";
    return () => {
      document.body.style.backgroundColor = "var(--bg-sand)";
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Ref for the full percussion section (not a small box)
  const percSectionRef = useRef(null);

  const [percSectionVisible, setPercSectionVisible] = useState(false);

  useEffect(() => {
    const el = percSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPercSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { measureNode, onPointerDown } = useGravityLinks(percSectionRef, floatingMediaLinks, percSectionVisible);

  const glitchHover = {
    hover: {
      x: [0, -2, 2, -2, 0],
      y: [0, 1, -1, 1, 0],
      rotate: [0, -1, 1, 0],
      transition: { duration: 0.2, repeat: Infinity, repeatType: 'mirror' }
    }
  };

  return (
    <div className="gritty-campaign-page relative min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#E8E1D9' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
        .gritty-campaign-page {
          font-family: 'Oswald', sans-serif;
          overflow-x: hidden;
        }
        .font-omega {
          font-family: 'Omega Ruby', 'Outfit', sans-serif;
        }
        .noise-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.12;
          background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)" opacity="0.4"/%3E%3C/svg%3E');
        }
        .text-flicker {
          animation: flicker 3s infinite alternate;
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        .street-tag {
          border: 2px solid #E8E1D9;

          background: #111;
        }
        .street-tag.hover-youtube { box-shadow: 4px 4px 0px #FF0000; }
        .street-tag.hover-youtube:hover { background: #FF0000 !important; }
        .street-tag.hover-facebook { box-shadow: 4px 4px 0px #1877F2; }
        .street-tag.hover-facebook:hover { background: #1877F2 !important; }
        .street-tag.hover-instagram { box-shadow: 4px 4px 0px #E1306C; }
        .street-tag.hover-instagram:hover { background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045) !important; }
        .street-tag.hover-website { box-shadow: 4px 4px 0px #2e7d32; }
        .street-tag.hover-website:hover { background: #2e7d32 !important; }
        .street-tag.hover-google { box-shadow: 4px 4px 0px #4285F4; }
        .street-tag.hover-google:hover { background: linear-gradient(to right, #4285F4, #F4B400) !important; }
                .street-tag.hover-flute { box-shadow: 4px 4px 0px #F4B400; }
        .street-tag.hover-flute:hover { background: #FFD04B !important; color: #111 !important; }
        .street-tag.hover-drum { box-shadow: 4px 4px 0px #0F9D58; }
        .street-tag.hover-drum:hover { background: #1FA463 !important; }
        .street-tag.hover-dj { box-shadow: 4px 4px 0px #4285F4; }
        .street-tag.hover-dj:hover { background: #4C8BF5 !important; }

        .social-link-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          gap: 12px;
          border: 2.5px solid #E8E1D9;
          background: #111;
          color: #E8E1D9;
          text-transform: uppercase;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          transition: color 0.2s ease, background 0.25s ease;
          position: relative;
        }
        @media (min-width: 768px) {
          .social-link-card { width: 185px; height: 185px; font-size: 0.95rem; gap: 14px; }
        }

      `}</style>
      <div className="noise-overlay"></div>

      {/* Section 1: Hero */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0B0B0B]">
        <motion.div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/qr-hero-bg.png')",
            y: yHero,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-[#0B0B0B]/60"></div><div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent opacity-100"></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 md:pt-20 -translate-y-6 md:translate-y-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-omega text-7xl md:text-[10rem] leading-none text-white mb-4 flex flex-col items-center md:items-start drop-shadow-[4px_4px_0_#B30000]" style={{ textShadow: "4px 4px 0px #B30000" }}
          >
            <div className="relative">
              <span className="block">BEAT</span>
              <span className="block ml-[0.8em] sm:ml-[1em] md:ml-[1.25em]">GURUS</span>
            </div>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-flicker text-xl md:text-3xl tracking-widest text-[#C89B3C] font-bold"
          >
            LIVE. ACOUSTIC. POWERFUL. WORLDWIDE.
          </motion.p>
        </div>
      </section>

      {/* Section 2: The Experience — Percussion */}
      <section
        ref={percSectionRef}
        className="relative w-full min-h-screen py-24 flex flex-col md:flex-row bg-[#0B0B0B] border-t-4 border-[#E8E1D9]"
        style={{ overflow: 'hidden', isolation: 'isolate' }}
      >
        {/* Gravity-physics floating links — rendered over the whole section */}
        {floatingMediaLinks.map((link, idx) => (
          <a
            key={link.name}
            data-gravity-body
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={el => measureNode(el, idx)}
            onMouseDown={e => onPointerDown(e, idx)}
            onTouchStart={e => onPointerDown(e, idx)}
            onClick={e => { /* allow click only if barely moved */ }}
            className={`absolute top-0 left-0 z-10 street-tag ${idx === 0 ? 'hover-flute' : idx === 1 ? 'hover-drum' : 'hover-dj'} px-5 py-3 text-sm md:text-base font-bold uppercase text-[#E8E1D9] hover:text-white select-none cursor-grab active:cursor-grabbing`}
            style={{
              willChange: 'transform',
              touchAction: 'none',
              opacity: percSectionVisible ? 1 : 0,
              pointerEvents: percSectionVisible ? 'auto' : 'none',
              transition: 'opacity 0.35s ease',
            }}
          >
            {link.name}
          </a>
        ))}

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 p-6 md:p-12 flex justify-center items-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] border-4 border-[#E8E1D9] p-2 bg-[#111] transform -rotate-2">
             <img src="/images/perc-image.png" alt="Live Drumming" className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="absolute -bottom-4 -right-4 bg-[#D4A72C] text-[#E8E1D9] px-4 py-2 font-bold text-xl md:text-2xl transform rotate-6 border-2 border-[#0B0B0B]">RAW ENERGY</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center"
        >
          <h2 className="font-omega text-5xl md:text-7xl mb-8 leading-tight text-[#E8E1D9]">
            PERCUSSION IS <br/><span className="text-[#D4A72C] drop-shadow-[2px_2px_0_#E8E1D9]">OUR LANGUAGE.</span>
          </h2>
          <h2 className="font-omega text-5xl md:text-7xl leading-tight text-[#C89B3C]">
            ENERGY IS OUR IDENTITY.
          </h2>
          <p className="mt-8 text-[#E8E1D9]/50 text-sm uppercase tracking-widest">↑ Drag the links above ↑</p>
        </motion.div>
      </section>

      {/* Section 3: Global Presence */}
      <section className="relative w-full py-24 bg-[#D4A72C] overflow-hidden border-y-4 border-[#E8E1D9] flex flex-col gap-16">
        <div className="relative w-full flex whitespace-nowrap overflow-hidden">
          <motion.div
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 25, ease: "linear", repeat: Infinity }}
             className="flex"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="font-omega text-7xl md:text-9xl text-[#0B0B0B] px-8">FROM BANGALORE TO THE WORLD</span>
                <span className="text-[#E8E1D9] text-6xl px-4">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative w-full flex whitespace-nowrap overflow-hidden">
          <motion.div
             animate={{ x: ["-50%", "0%"] }}
             transition={{ duration: 35, ease: "linear", repeat: Infinity }}
             className="flex gap-6 md:gap-10 px-6"
          >
            {[...Array(3)].map((_, j) => (
               <React.Fragment key={j}>
                 <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noopener noreferrer" className="relative w-72 md:w-[28rem] aspect-video shrink-0 border-4 border-[#0B0B0B] group block overflow-hidden shadow-[8px_8px_0_#E8E1D9]">
                    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <FaYoutube className="text-[#C89B3C] text-6xl drop-shadow-md" />
                    </div>
                 </a>
                 <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noopener noreferrer" className="relative w-72 md:w-[28rem] aspect-video shrink-0 border-4 border-[#0B0B0B] group block overflow-hidden shadow-[8px_8px_0_#E8E1D9]">
                    <img src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <FaYoutube className="text-[#C89B3C] text-6xl drop-shadow-md" />
                    </div>
                 </a>
               </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Social Links */}
      <section className="relative w-full py-28 md:py-32 bg-[#0B0B0B] flex flex-col items-center px-4">
        <h2 className="font-omega text-5xl md:text-7xl text-[#E8E1D9] mb-14 uppercase text-center">Connect with the Tribe</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl px-4">
          {socialLinks.map((link, idx) => {
            const rot = (idx % 2 === 0 ? 1 : -1) * ((idx % 3) + 1.2);
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, rotate: rot }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.08, rotate: rot + (rot > 0 ? -1.5 : 1.5), transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className={`social-link-card street-tag hover-${link.id}`}
              >
                {link.icon}
                <span>{link.name}</span>
                {link.primary && (
                  <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#D4A72C', color: '#0B0B0B', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.05em', padding: '3px 7px', border: '2px solid #0B0B0B' }}>REVIEW US</span>
                )}
              </motion.a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default QrCodePage;
