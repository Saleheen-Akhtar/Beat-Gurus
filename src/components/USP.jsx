import React from 'react';
import { motion } from 'framer-motion';

const USP = () => {
  return (
    <section className="usp-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Tribal Pattern */}
      <motion.div
        className="usp-pattern"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, zIndex: 0 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
           <pattern id="tribal-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <circle cx="5" cy="5" r="2" fill="var(--bg-sand)" />
           </pattern>
           <rect x="0" y="0" width="100%" height="100%" fill="url(#tribal-dots)" />
        </svg>
      </motion.div>
      <div className="container usp-content" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--gold)', textShadow: '4px 4px 0px var(--text-dark)', WebkitTextStroke: '2px var(--text-dark)' }}
        >
          THE RAW EXPERIENCE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: '1.5rem', color: 'var(--bg-sand)', fontWeight: 'bold', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}
        >
          We renounce electronic instruments to focus purely on the raw energy of acoustic percussion.
          A unique fusion of West African beats and Indian rhythms that leaves audiences spellbound.
        </motion.p>
      </div>
    </section>
  );
};

export default USP;
