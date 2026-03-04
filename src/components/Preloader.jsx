import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you could hook this up to real image loading later)
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--text-dark)', // Deep earth black
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle spinning drum/tribal circle SVG */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ marginBottom: '30px' }}
          >
            {/* Outer drum ring */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-sand)" strokeWidth="3" strokeDasharray="15 10" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--earth-red)" strokeWidth="2" strokeDasharray="8 6" />

            {/* Center Djembe minimal representation */}
            <path
              d="M35 30 L65 30 L55 50 L60 70 L40 70 L45 50 Z"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </motion.svg>

          {/* Loading Text Reveal (Mexora style) */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--bg-sand)',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                margin: 0
              }}
            >
              BEAT GURUS
            </motion.h2>
          </div>

          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-main)',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                letterSpacing: '0.2em'
              }}
            >
              Loading Energy...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;