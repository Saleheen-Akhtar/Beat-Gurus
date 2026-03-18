import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

useEffect(() => {
    // We want the preloader to show for at least 1.5 seconds (one full animation cycle)
    // AND until the page has fully loaded.

    let isMinTimeElapsed = false;
    let isPageLoaded = document.readyState === 'complete';

    const checkComplete = () => {
      if (isMinTimeElapsed && isPageLoaded) {
        setLoading(false);
      }
    };

    const minTimer = setTimeout(() => {
      isMinTimeElapsed = true;
      checkComplete();
    }, 1500); // 1.5s for the initial drawing loop

    const handleLoad = () => {
      isPageLoaded = true;
      checkComplete();
    };

    if (!isPageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', handleLoad);
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
                d="M181.5 1C81.8126 1 1 81.8126 1 181.5C1 281.187 81.8126 362 181.5 362C281.187 362 362 281.187 362 181.5C362 81.8126 281.187 1 181.5 1Z"
                stroke="url(#paint0_linear_loader)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_loader"
                  x1="181.5"
                  y1="0"
                  x2="181.5"
                  y2="363"
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
