import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../images/logo.webp';
import './Preloader.css';

const MIN_VISIBLE_MS = 700;
const MAX_WAIT_MS = 2500;

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const startTime = performance.now();
    let minTimerId;
    let maxTimerId;
    let rafId;

    const completeOnce = () => {
      if (hasCompletedRef.current) {
        return;
      }
      hasCompletedRef.current = true;
      setLoading(false);
    };

    const finishWhenReady = () => {
      if (hasCompletedRef.current) {
        return;
      }

      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      if (remaining === 0) {
        completeOnce();
        return;
      }

      minTimerId = window.setTimeout(completeOnce, remaining);
    };

    const watchReadyState = () => {
      if (document.readyState === 'complete') {
        finishWhenReady();
      } else {
        rafId = window.requestAnimationFrame(watchReadyState);
      }
    };

    watchReadyState();
    maxTimerId = window.setTimeout(completeOnce, MAX_WAIT_MS);

    return () => {
      window.clearTimeout(minTimerId);
      window.clearTimeout(maxTimerId);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {loading && (
        <motion.div
          className="preloader-shell"
          initial={{ opacity: 1, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.45, ease: 'easeInOut' } }}
          role="status"
          aria-label="Loading Beat Gurus website"
        >
          <img
            src={logoImg}
            alt="Beat Gurus Loading"
            className="preloader-logo"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
