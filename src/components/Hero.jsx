import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="hero-section" id="home">
      <div className="hero-overlay"></div>

      {/* Abstract video background representation (using a placeholder or abstract css if video not available) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-bg"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-playing-drums-in-a-concert-4573-large.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="hero-content container"
        style={{ y, opacity }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          RHYTHM OF <br /><span className="gold-text">THE SOUL</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience the primal energy of Beat Gurus. A fusion of West African roots and Indian spirit.
        </motion.p>

        <motion.a
          href="#contact"
          className="btn-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Book The Band
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
