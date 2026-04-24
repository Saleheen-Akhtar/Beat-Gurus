import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import logoImg from '../../images/logo.png';

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
    }, 900);

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
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          role="status"
          aria-label="Loading Beat Gurus website"
        >
          <div className="dw-loader-container" aria-hidden="true">
            <img src={logoImg} alt="" className="dw-loader-logo-base" width={14998} height={8438} />
            <div className="dw-loader-logo-sweep" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
