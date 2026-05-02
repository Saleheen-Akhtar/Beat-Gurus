import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import logoImg from '../../images/logo.webp';

const Hero = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const frameRef = useRef(null);
  const pendingPointerRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const watermarkX = useTransform(mouseX, (value) => value * -1);
  const watermarkY = useTransform(mouseY, (value) => value * -1);
  const titleX = useTransform(mouseX, (value) => value * 0.4);
  const titleY = useTransform(mouseY, (value) => value * 0.4);

  useEffect(() => {
    const flushPointerUpdate = () => {
      frameRef.current = null;
      mouseX.set(pendingPointerRef.current.x);
      mouseY.set(pendingPointerRef.current.y);
    };

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      pendingPointerRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(flushPointerUpdate);
      }
    };
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} id="home" className="hero-section">

      {/* Immersive background image */}
      <div
        className="hero-bg-media"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("https://github.com/user-attachments/assets/6fc1d9f8-570d-4a75-a116-3a5d805d4adc")',
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
        style={{ x: watermarkX, y: watermarkY }}
      >
        <span>BG</span>
      </motion.div>

      {/* Main hero content */}
      <motion.div className="hero-inner" style={{ opacity }}>
        <motion.div style={{ y: yTitle }} className="hero-title-wrap">
          <motion.div
            className="hero-title-row"
            style={{ x: titleX, y: titleY }}
            initial={{ y: 40, opacity: 0, clipPath: 'inset(0% 0 100% 0)' }}
            animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ delay: 0.3, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={logoImg}
              alt="Beat Gurus"
              className="hero-logo"
              width={14998}
              height={8438}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="hero-sub" style={{ maxWidth: "800px", margin: "12px auto 0", lineHeight: "1.6", whiteSpace: "normal" }}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-[1.3em] font-brand-name" style={{ fontWeight: 'bold', verticalAlign: 'baseline', display: 'inline-block', transform: 'translateY(0.15em)', lineHeight: 1 }}>Beat Gurus</span> is a premier fusion percussion band based in&nbsp;Bangalore.<br />
          Experience <em>Raw Acoustic Energy</em>, no electronic instruments, just pure, immersive rhythm and tribal beats spanning Djembe, Didgeridoo, and Indian Percussion.
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

      {/* Scroll indicator - right side */}
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
