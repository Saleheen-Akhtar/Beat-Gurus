import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="hero-section" id="home">
      <motion.div style={{ y, opacity }} className="hero-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          src="https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4"
        ></video>
        <div className="overlay"></div>
      </motion.div>

      <div className="container hero-content">
        <div className="hero-text-wrapper">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title"
          >
            Rhythm <br/>
            <span className="stroke-text">Of The</span> <br/>
            Soul
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hero-footer"
        >
          <p>Bangalore's Premier Fusion Percussion</p>
          <div className="scroll-indicator">Scroll</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
