import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projects = [
  { id: 1, title: 'BBC World Awards', category: 'International', img: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1200&auto=format&fit=crop', desc: 'Award-winning percussion at the global stage' },
  { id: 2, title: 'Wine Festival', category: 'Cultural', img: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?q=80&w=1200&auto=format&fit=crop', desc: 'Rhythmic energy at Bangalore\'s finest festivals' },
  { id: 3, title: 'Corporate Gala', category: 'Event', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop', desc: 'High-energy performances for prestigious events' },
  { id: 4, title: 'Norway Cultural Evening', category: 'International', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop', desc: 'Cross-cultural fusion on international stages' },
  { id: 5, title: 'Gather & Groove', category: 'Team Building', img: 'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?q=80&w=1200&auto=format&fit=crop', desc: 'Interactive drum circles that unite teams' },
];

const Showcase = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % projects.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const goTo = useCallback((i) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  // Pause on hover
  const pause = () => setIsAutoPlaying(false);
  const resume = () => setIsAutoPlaying(true);

  // Get visible cards (prev, active, next)
  const getIndex = (offset) => (active + offset + projects.length) % projects.length;

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', scale: 0.85, opacity: 0, rotateY: dir > 0 ? 15 : -15 }),
    center: { x: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 10 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', scale: 0.85, opacity: 0, rotateY: dir > 0 ? -15 : 15, zIndex: 0 }),
  };

  return (
    <section id="work" className="showcase-section">
      <div className="container">
        <div className="showcase-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-eyebrow">02 Live Moments</p>
            <h2 style={{ margin: 0 }}>LIVE <span style={{ color: 'var(--gold)' }}>MOMENTS</span></h2>
          </motion.div>

          <div className="showcase-controls">

            <motion.a
              href="https://www.youtube.com/results?search_query=beat+gurus+bangalore"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.04 }}
            >
              View All <FaArrowRight size={11} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="showcase-carousel" onMouseEnter={pause} onMouseLeave={resume}>
        {/* Side preview cards */}
        <div className="showcase-side-card showcase-side-left" onClick={() => { pause(); prev(); }} data-cursor-hover>
          <img src={projects[getIndex(-1)].img} alt={projects[getIndex(-1)].title} />
          <div className="showcase-side-overlay" />
        </div>

        {/* Active card */}
        <div className="showcase-main-card" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={projects[active].id}
              className="showcase-active-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={projects[active].img} alt={projects[active].title} />
              <div className="showcase-card-info">
                <motion.span
                  className="showcase-card-cat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {projects[active].category}
                </motion.span>
                <motion.h3
                  className="showcase-card-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  {projects[active].title}
                </motion.h3>
                <motion.p
                  className="showcase-card-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {projects[active].desc}
                </motion.p>
              </div>
              <span className="showcase-card-num">0{active + 1}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right preview */}
        <div className="showcase-side-card showcase-side-right" onClick={() => { pause(); next(); }} data-cursor-hover>
          <img src={projects[getIndex(1)].img} alt={projects[getIndex(1)].title} />
          <div className="showcase-side-overlay" />
        </div>
      </div>

      {/* Dots + counter */}
      <div className="showcase-footer">
        <div className="showcase-nav-arrows">
          <button onClick={() => { pause(); prev(); }} className="showcase-arrow-btn" aria-label="Previous" data-cursor-hover>
            <FaChevronLeft size={14} />
          </button>
          <button onClick={() => { pause(); next(); }} className="showcase-arrow-btn" aria-label="Next" data-cursor-hover>
            <FaChevronRight size={14} />
          </button>
        </div>
        <span className="showcase-counter">
          0{active + 1} <span className="showcase-counter-sep">/</span> 0{projects.length}
        </span>
        <div className="showcase-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`showcase-dot${i === active ? ' active' : ''}`}
              onClick={() => { pause(); goTo(i); }}
              aria-label={`Go to slide ${i + 1}`}
              data-cursor-hover
            />
          ))}
        </div>
        {/* Progress bar */}
        <div className="showcase-progress-track">
          <motion.div
            className="showcase-progress-fill"
            key={active}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isAutoPlaying ? 1 : 0 }}
            transition={{ duration: isAutoPlaying ? 4.5 : 0, ease: 'linear' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
