import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Parallax for decorative elements
  const yShape1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const yShape2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yShape3 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={ref} className="hero-section" id="home" style={{ overflow: 'visible', paddingBottom: '0', position: 'relative' }}>

      {/* Floating 3D/Cutout Elements */}
      {/* Element 1: Top Left - Abstract Djembe/Drum Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          y: yShape1,
          rotate: rotateShape,
          zIndex: 5,
          filter: 'drop-shadow(10px 10px 15px rgba(0,0,0,0.3))'
        }}
      >
        <svg width="150" height="200" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20 Q 75 0 130 20 L 140 80 Q 75 120 10 80 Z" fill="var(--earth-red)" />
          <path d="M10 80 Q 75 120 140 80 L 110 180 Q 75 200 40 180 Z" fill="var(--text-dark)" />
          <path d="M20 20 L 10 80 M 130 20 L 140 80 M 50 20 L 40 180 M 100 20 L 110 180" stroke="var(--bg-sand)" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Element 2: Bottom Right - Didgeridoo/Stick Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          y: yShape3,
          rotate: -20,
          zIndex: 5,
          filter: 'drop-shadow(-10px 15px 20px rgba(0,0,0,0.4))'
        }}
      >
        <svg width="60" height="300" viewBox="0 0 60 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0 C 45 0, 60 300, 30 300 C 0 300, -15 0, 15 0 Z" fill="var(--gold)" />
          <circle cx="25" cy="50" r="5" fill="var(--text-dark)" />
          <circle cx="20" cy="100" r="6" fill="var(--earth-red)" />
          <circle cx="35" cy="150" r="4" fill="var(--text-dark)" />
          <circle cx="20" cy="200" r="7" fill="var(--earth-red)" />
          <circle cx="30" cy="250" r="5" fill="var(--text-dark)" />
        </svg>
      </motion.div>

      {/* Element 3: Center Background Text / Giant Letter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 2 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          zIndex: 1,
          pointerEvents: 'none',
          y: yShape2
        }}
      >
        <h1 style={{ fontSize: '120vh', color: 'var(--text-dark)', margin: 0, lineHeight: 0.8, fontFamily: 'var(--font-display)' }}>G</h1>
      </motion.div>

      {/* Edge-aligned microcopy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 20
        }}
      >
        Bangalore, India
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 20
        }}
      >
        Raw Acoustic Energy
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 20
        }}
      >
        Est. 2024
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 20
        }}
      >
        Scroll <span style={{ display: 'inline-block', width: '2px', height: '20px', background: 'var(--earth-red)' }}></span>
      </motion.div>


      <div className="container hero-content" style={{ zIndex: 10, alignItems: 'center', justifyItems: 'center', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-text-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ y: yTitle, lineHeight: 0.8, margin: 0, fontSize: 'clamp(5rem, 20vw, 22rem)' }}
            className="hero-title"
          >
            BEAT<br/>
            <span style={{ color: 'var(--earth-red)' }}>GURUS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-subtitle"
            style={{ color: 'var(--text-grey)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '600px', marginTop: '40px', fontWeight: '600', textAlign: 'center' }}
          >
            Raw acoustic energy. Renouncing electronic instruments for the pure power of West African & Indian percussion.
          </motion.p>

          <motion.a
             href="#about"
             className="btn-primary"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1 }}
             style={{ display: 'inline-block', marginTop: '30px', alignSelf: 'center' }}
          >
             Discover the Sound
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
