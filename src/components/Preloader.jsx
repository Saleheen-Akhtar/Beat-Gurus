import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for images/fonts)
    // For a real app, this might wait for a Promise.all of image loads
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

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.6, ease: "easeIn" }
    }
  };

  const textChars = "BEAT GURUS".split("");

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--text-dark)' }}
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Subtle noise/texture over the preloader if desired */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
          ></div>

          <motion.div
            className="relative z-10 flex overflow-hidden"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1
              className="text-center tracking-[0.1em]"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--gold)',
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              {textChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.1 + index * 0.05
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Optional: Add a subtle loading progress bar or pulsing dot here to make it extra luxurious */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(212, 167, 44, 0.2)' }}
          >
            <motion.div
              className="w-full h-full"
              style={{ background: 'var(--gold)' }}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
