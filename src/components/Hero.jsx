import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="hero">
      <motion.div style={{ y }} className="hero-bg-parallax"></motion.div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Rhythm of the <span className="gold-text">Soul</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Bangalore's Premier Fusion Percussion Band
        </motion.p>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#contact" className="btn-primary">Book Us</a>
          <a href="#about" className="btn-secondary">Our Story</a>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .hero-bg-parallax {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          background: url('https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center/cover;
          z-index: -1;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(5,5,5,0.3), rgba(5,5,5,1));
          z-index: 0;
        }
        .hero-content {
          z-index: 1;
          max-width: 900px;
          padding: 0 20px;
        }
        .hero h1 {
          font-size: 4.5rem;
          margin-bottom: 20px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .hero p {
          font-size: 1.5rem;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .hero-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        @media(max-width: 768px) {
          .hero h1 { font-size: 2.8rem; }
          .hero p { font-size: 1rem; }
          .hero-btns { flex-direction: column; width: 100%; max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
