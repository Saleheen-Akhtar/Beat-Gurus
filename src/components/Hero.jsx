import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

const Hero = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={ref} id="home" className="hero-section">

      {/* Immersive background image */}
      <div
        className="hero-bg-media"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15, mixBlendMode: 'multiply', pointerEvents: 'none',
        }}
      />

      {/* Watermark BG text */}
      <motion.div
        className="hero-watermark"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ delay: 0.1, duration: 1.5, ease: 'easeOut' }}
        style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
      >
        <span>BG</span>
      </motion.div>

      {/* Main hero content */}
      <motion.div className="hero-inner" style={{ opacity }}>
        <motion.div
          className="hero-badge-row"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="award-badge">
            <span className="award-dot" />BBC World Award Winner
          </span>
        </motion.div>

        <motion.div style={{ y: yTitle }} className="hero-title-wrap">
          <motion.div
            className="hero-title-row"
            style={{ x: mousePosition.x * 0.4, y: mousePosition.y * 0.4 }}
            initial={{ y: 40, opacity: 0, clipPath: 'inset(0% 0 100% 0)' }}
            animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ delay: 0.3, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/images/logo.png"
              alt="Beat Gurus"
              className="hero-logo"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Pure acoustic percussion &middot; Born in Bangalore &middot; Heard Worldwide. Immerse yourself in the rhythm.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.a href="#contact" className="btn-dark" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <span>Book a Performance</span> <FaArrowRight size={12} />
          </motion.a>
          <motion.a href="#work" className="btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <FaPlay size={10} /> <span>Watch Live</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — right side */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="scroll-line"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        <span className="scroll-hint-text">Scroll</span>
      </motion.div>

    </section>
  );
};

export default Hero;
