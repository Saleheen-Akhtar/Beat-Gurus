import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontStyle: 'italic', color: 'var(--gold)' }}>
            "A masterclass in rhythm and energy."
          </h3>
          <p>- The Hindu</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
