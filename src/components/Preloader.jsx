import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../images/logo.webp';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const completeOnce = () => {
      if (hasCompletedRef.current) {
        return;
      }
      hasCompletedRef.current = true;
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      completeOnce();
      return undefined;
    }

    window.addEventListener('load', completeOnce);

    return () => {
      window.removeEventListener('load', completeOnce);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {loading && (
        <motion.div
          className="preloader-shell"
          initial={{ opacity: 1, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
          exit={{ opacity: 0, scale: 1, transition: { duration: 0.6, ease: 'easeInOut' } }}
          role="status"
          aria-label="Loading Beat Gurus website"
        >
          <img
            src={logoImg}
            alt="Beat Gurus Loading"
            className="preloader-logo"
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <motion.div
            className="preloader-invert-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
