import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Wait for exit animation to finish before notifying parent
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200); // matches exit duration
    }, 2500); // 2.5 seconds loading display

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer motion variants
  const containerVariants = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="cube-container">
            {/* Box 1: B */}
            <div className="cube cube-1">
              <div className="cube-face cube-front"></div>
              <div className="cube-face cube-back"></div>
              <div className="cube-face cube-right"></div>
              <div className="cube-face cube-left"></div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-bottom">
                <span className="cube-text">B</span>
              </div>
            </div>

            {/* Box 2: G */}
            <div className="cube cube-2">
              <div className="cube-face cube-front"></div>
              <div className="cube-face cube-back"></div>
              <div className="cube-face cube-right"></div>
              <div className="cube-face cube-left"></div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-bottom">
                <span className="cube-text">G</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
