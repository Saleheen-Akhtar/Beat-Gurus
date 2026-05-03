import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../images/logo.webp';
import './Preloader.css';

const PRELOADER_FALLBACK_TIMEOUT_MS = 800;

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    let fallbackTimeout;
    const completeOnce = () => {
      if (hasCompletedRef.current) {
        return;
      }
      hasCompletedRef.current = true;
      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
        fallbackTimeout = undefined;
      }
      setLoading(false);
    };

    if (document.readyState !== 'loading') {
      window.requestAnimationFrame(completeOnce);
      return undefined;
    }

    fallbackTimeout = window.setTimeout(completeOnce, PRELOADER_FALLBACK_TIMEOUT_MS);
    window.addEventListener('DOMContentLoaded', completeOnce);

    return () => {
      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
      }
      window.removeEventListener('DOMContentLoaded', completeOnce);
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
