import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// A reusable component for the smooth Mexora-style text reveal
export const TextReveal = ({ children, delay = 0, style, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} style={{ overflow: 'hidden', display: 'inline-block', ...style }} className={className}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
