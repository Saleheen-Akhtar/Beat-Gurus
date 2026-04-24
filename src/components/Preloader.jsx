import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    }, 450);

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
          className="preloader-shell"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          role="status"
          aria-label="Loading Beat Gurus website"
        >
          <div className="preloader-spinner" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
