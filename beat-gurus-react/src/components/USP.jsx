import React from 'react';
import { motion } from 'framer-motion';

const USP = () => {
  return (
    <section className="usp-section">
      <div className="usp-overlay"></div>
      <div className="container usp-content">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The <span className="gold">Raw</span> Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We renounce electronic instruments to focus purely on the raw energy of acoustic percussion.
          A unique fusion of West African beats and Indian rhythms that leaves audiences spellbound.
        </motion.p>
      </div>
    </section>
  );
};

export default USP;
