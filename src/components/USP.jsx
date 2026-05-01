import React from 'react';
import { motion } from 'framer-motion';

const words = ['Raw Energy', 'Acoustic Power', 'Djembe Rhythms', 'Live Percussion', 'African Roots', 'Indian Soul'];

// We pre-calculate to optimize re-renders as requested by guidelines
const topTrackContent = [...words, ...words].map((w, i) => (
  <span key={i} className={`usp-marquee-item${i % 5 === 2 ? ' lit' : ''}`}>
    {w} <span style={{ color: 'var(--gold)', opacity: 0.5 }}>/</span>
  </span>
));

const bottomTrackContent = [...words, ...words].map((w, i) => (
  <span key={i} className={`usp-marquee-item${i % 4 === 1 ? ' lit' : ''}`}>
    {w} <span style={{ color: 'var(--gold)', opacity: 0.5 }}>&bull;</span>
  </span>
));

const USP = () => {
  return (
    <section className="usp-section">

      {/* Top marquee */}
      <div className="usp-marquee-outer">
        <motion.div
          className="usp-marquee-track-motion"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {topTrackContent}
        </motion.div>
      </div>

      {/* Center statement */}
      <motion.div
        className="usp-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ marginBottom: '24px' }}
        >
          <span style={{
            fontFamily: 'var(--font-accent)', color: 'var(--gold)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', transform: 'rotate(-3deg)',
            display: 'inline-block',
          }}>experience the</span>
        </motion.div>

        <h2 className="usp-big-title">
          RAW<br />
          <span className="hollow">ENERGY</span>
        </h2>

        <motion.p
          className="usp-body-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We renounce electronic instruments to focus purely on the acoustic power of percussion.
          A unique fusion of West African beats and Indian rhythms that leaves audiences spellbound &mdash;
          no effects pedals, no backing tracks, only the primal force of skin on drum.
        </motion.p>
      </motion.div>

      {/* Bottom reverse marquee */}
      <div className="usp-bottom-marquee">
        <motion.div
          className="usp-bottom-track-motion"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {bottomTrackContent}
        </motion.div>
      </div>
    </section>
  );
};

export default USP;
