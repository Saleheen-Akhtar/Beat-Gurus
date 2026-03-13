import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    // Drum roll duration
    const rollTimer = setTimeout(() => {
      setReveal(true);
      // Wait for the grand reveal animation to finish before triggering exit
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }, 2000); // 2 seconds of drum roll

    return () => {
      clearTimeout(rollTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-sand-dark)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className={`drum-container ${reveal ? 'reveal' : ''}`}>
            {/* The Shockwave Ring for the final hit */}
            <div className="shockwave"></div>

            <svg
              className="drum-svg"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Drum Body (Djembe Shape) */}
              <path
                className="drum-body"
                d="M60 70 L140 70 C140 90 120 110 120 130 L110 180 L90 180 L80 130 C80 110 60 90 60 70 Z"
              />

              {/* Ropes / Decoration */}
              <path
                d="M60 70 L80 130 M140 70 L120 130 M80 70 L100 130 M120 70 L100 130"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeDasharray="4 2"
              />

              {/* Drum Head */}
              <ellipse
                className="drum-head"
                cx="100"
                cy="70"
                rx="40"
                ry="15"
              />

              {/* Left Drumstick */}
              <g className="drumstick left-stick">
                <line x1="30" y1="20" x2="85" y2="60" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="85" cy="60" r="5" fill="var(--foreground)" />
              </g>

              {/* Right Drumstick */}
              <g className="drumstick right-stick">
                <line x1="170" y1="20" x2="115" y2="60" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="115" cy="60" r="5" fill="var(--foreground)" />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
