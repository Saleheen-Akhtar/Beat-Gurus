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
  const yShape1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yShape2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section ref={ref} className="hero-section" id="home" style={{ backgroundColor: 'var(--gold)', overflow: 'hidden' }}>
      {/* Decorative Tribal Pattern/Shapes in Background */}
      <motion.div style={{ y: yShape1, opacity }} className="hero-shape shape-1">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path fill="var(--earth-red)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,82.4,-46.3C93,-33.5,101.3,-18,102.3,-2.1C103.4,13.8,97.2,30,86.6,43.2C76,56.4,61,66.6,45.4,74.6C29.8,82.6,13.6,88.4,-1.8,91.4C-17.2,94.5,-31.8,94.8,-45.3,88.8C-58.8,82.8,-71.2,70.5,-81.2,56.1C-91.2,41.7,-98.8,25.2,-100.2,8.3C-101.6,-8.6,-96.8,-25.9,-87.3,-40.4C-77.8,-54.9,-63.6,-66.6,-48.6,-73.4C-33.6,-80.2,-17.8,-82.1,-1.5,-79.6C14.8,-77.1,29.6,-70.2,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yShape2, opacity }} className="hero-shape shape-2">
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path fill="var(--bg-sand-dark)" d="M37.4,-57.8C49.9,-46.9,62.6,-38.1,70.1,-25.6C77.6,-13.1,80,3.1,75.4,17.2C70.8,31.3,59.3,43.3,45.8,51.8C32.3,60.3,16.2,65.3,1.1,63.4C-14,61.5,-28,52.7,-42.6,44.1C-57.2,35.5,-72.4,27.1,-79.3,14C-86.2,0.9,-84.8,-16.9,-76,-30.9C-67.2,-44.9,-51,-55.1,-36.5,-64.3C-22,-73.5,-9.2,-81.7,2.1,-84.5C13.4,-87.3,24.9,-68.7,37.4,-57.8Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <div className="container hero-content" style={{ zIndex: 10 }}>
        <div className="hero-text-wrapper" style={{ textAlign: 'center' }}>
          <motion.h1
            initial={{ y: 150, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ y: yTitle }}
            className="hero-title tribal-title"
          >
            BEAT<br/>GURUS
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-subtitle"
            style={{ color: 'var(--text-dark)', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}
          >
            Raw Acoustic Energy
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-footer"
          style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}
        >
          <p>Bangalore's Premier Fusion</p>
          <div className="scroll-indicator" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            SCROLL <span style={{ display: 'inline-block', width: '2px', height: '40px', background: 'var(--text-dark)' }}></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
