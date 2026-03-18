import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep the preloader visible for a short duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {loading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-[#050505]"
          style={{ backgroundColor: '#050505', zIndex: 999999 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="dw-loader-container">
            <svg
              className="dw-loader-circle"
              viewBox="0 0 363 364"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background faded circle */}
              <circle
                opacity="0.2"
                cx="181.5"
                cy="181.5"
                r="181"
                stroke="var(--gold)"
                strokeOpacity="0.5"
              />
              {/* Animated stroke path */}
              <path
                className="dw-loader-path"
                d="M209.456 360.864C179.949 365.44 149.771 362.637 121.608 352.706C93.4442 342.775 68.1699 326.024 48.0352 303.944"
                stroke="url(#paint0_linear_loader)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_loader"
                  x1="209.456"
                  y1="333.472"
                  x2="48.0352"
                  y2="333.472"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--gold)" stopOpacity="0" />
                  <stop offset="1" stopColor="var(--gold)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="dw-loader-logo-box">
               <span className="dw-loader-text font-brand-name">Beat Gurus</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
