import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();

  // Parallax elements floating globally
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>

      {/* Abstract Sun / Drum element */}
      <motion.div style={{ y: y1, rotate: r1, position: 'absolute', top: '10%', right: '-10%', opacity: 0.1 }}>
        <svg viewBox="0 0 200 200" width="60vw" height="60vw" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--text-dark)" strokeWidth="4" strokeDasharray="10 15" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="var(--earth-red)" strokeWidth="2" strokeDasharray="5 10" />
          <path d="M100 10 L100 190 M10 100 L190 100" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Abstract Tribal ZigZag/Wave */}
      <motion.div style={{ y: y2, position: 'absolute', bottom: '-20%', left: '-5%', opacity: 0.05 }}>
        <svg viewBox="0 0 500 500" width="80vw" height="80vw" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,250 L50,150 L100,250 L150,150 L200,250 L250,150 L300,250 L350,150 L400,250 L450,150 L500,250" fill="none" stroke="var(--text-dark)" strokeWidth="15" strokeLinejoin="miter" />
          <path d="M0,300 L50,200 L100,300 L150,200 L200,300 L250,200 L300,300 L350,200 L400,300 L450,200 L500,300" fill="none" stroke="var(--earth-red)" strokeWidth="15" strokeLinejoin="miter" />
        </svg>
      </motion.div>

      {/* Another organic shape */}
      <motion.div style={{ y: y1, position: 'absolute', top: '60%', left: '40%', opacity: 0.08 }}>
        <svg viewBox="0 0 200 200" width="30vw" height="30vw" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--muted-green)" d="M43.6,-76.3C55.6,-68.8,63.7,-53.8,70.1,-39.4C76.4,-25,81.1,-11.1,81.3,3C81.6,17.1,77.5,31.4,70.5,44.7C63.6,58,53.8,70.2,40.9,76.5C28,82.8,12,83.1,-2.9,87.1C-17.8,91.1,-31.6,98.8,-43.3,94.5C-55,90.2,-64.6,73.9,-72.5,58.3C-80.4,42.7,-86.6,27.8,-88.4,12.5C-90.2,-2.8,-87.6,-18.5,-79.8,-31.5C-72,-44.4,-59,-54.7,-45.5,-61.7C-32,-68.6,-18,-72.2,-2.5,-68.8C13.1,-65.4,28.2,-55.1,43.6,-76.3Z" transform="translate(100 100)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default GlobalBackground;