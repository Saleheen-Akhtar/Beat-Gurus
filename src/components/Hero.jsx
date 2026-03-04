import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from './TextReveal';

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
    <section ref={ref} className="hero-section" id="home" style={{ overflow: 'visible', paddingBottom: '0' }}>

      {/* Background Graphic instead of simple circle */}
      <motion.div style={{ y: yShape2, opacity, position: 'absolute', right: '5%', top: '10%', zIndex: -1 }}>
        <h1 style={{ fontSize: '40vw', color: 'var(--gold)', WebkitTextStroke: 'none', opacity: 0.5, lineHeight: 0.8 }}>B</h1>
      </motion.div>

      <div className="container hero-content" style={{ zIndex: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
        <div className="hero-text-wrapper" style={{ textAlign: 'left', marginTop: '10vh' }}>
          <motion.span
             className="accent-text"
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            feel the rhythm of
          </motion.span>
          <motion.div style={{ y: yTitle, marginLeft: '-1vw' }} className="hero-title">
            <TextReveal delay={0.3}>BEAT</TextReveal><br/>
            <TextReveal delay={0.4} style={{ color: 'var(--earth-red)' }}>GURUS</TextReveal>
          </motion.div>
          <TextReveal delay={0.6}>
            <p
              className="hero-subtitle"
              style={{ color: 'var(--text-grey)', fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '500px', marginTop: '30px', fontWeight: '600' }}
            >
              Raw acoustic energy. Renouncing electronic instruments for the pure power of West African & Indian percussion.
            </p>
          </TextReveal>

          <motion.a
             href="#about"
             className="btn-primary"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1 }}
             style={{ display: 'inline-block', marginTop: '40px' }}
          >
             Discover the Sound
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-footer"
          style={{ color: 'var(--text-dark)', fontWeight: 'bold', width: '100%', left: 0, padding: '0 5vw', boxSizing: 'border-box' }}
        >
          <p style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '2px'}}>BANGALORE, INDIA</p>
          <div className="scroll-indicator" style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>
            SCROLL <span style={{ display: 'inline-block', width: '2px', height: '40px', background: 'var(--earth-red)' }}></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
