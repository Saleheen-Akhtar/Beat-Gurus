import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import logoImg from '../../images/logo.png';

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
          role="status"
          aria-label="Loading Beat Gurus website"
        >
          <div className="dw-loader-container">
            <div className="dw-loader-logo-shape" aria-hidden="true" />
            <div className="dw-loader-logo-sweep" aria-hidden="true" />
            <div className="dw-loader-logo-box">
              <img
                src={logoImg}
                alt="Beat Gurus"
                className="dw-loader-logo-image"
                width={14998}
                height={8438}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
