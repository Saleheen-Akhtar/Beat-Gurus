import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { showTypes } from '../data/showData';

const ShowRow = ({ show, index, navigate }) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const isLeft = show.align === 'left';

  const yImg = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-15%', '15%']);
  const xContainer = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? ['0vw', '0vw', '0vw'] : (isLeft ? ['-20vw', '0vw', '10vw'] : ['20vw', '0vw', '-10vw']));
  const opacityContainer = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  const toShowPage = (event) => {
    event.preventDefault();
    navigate(`/shows/${show.slug}`);
  };

  return (
    <motion.div
      ref={ref}
      className={`showtype-row ${isLeft ? 'align-left' : 'align-right'}`}
      style={{ x: xContainer, opacity: opacityContainer }}
    >
      <a href={`/shows/${show.slug}`} onClick={toShowPage} className="showtype-img-wrapper" aria-label={`Open ${show.title} details`}>
        <motion.img
          style={{ y: yImg }}
          src={show.heroImage}
          alt={show.title}
          className="showtype-img"
          loading="lazy"
          decoding="async"
        />
        <div className="showtype-img-overlay" />

        <div className="showtype-content-mobile">
          <h3 className="showtype-title">{show.title}</h3>
          <p className="showtype-desc">{show.cardDescription}</p>
          <span className="btn-outline mobile-btn">View Show Page <FaArrowRight size={12} style={{ marginLeft: '8px' }} /></span>
        </div>
      </a>

      <div className="showtype-content showtype-content-desktop">
        <h3 className="showtype-title">{show.title}</h3>
        <p className="showtype-desc">{show.cardDescription}</p>

        <a href={`/shows/${show.slug}`} onClick={toShowPage} className="btn-outline" data-cursor-hover>
          View Show Page <FaArrowRight size={12} style={{ marginLeft: '8px' }} />
        </a>
      </div>
    </motion.div>
  );
};

const ShowTypes = ({ navigate }) => {
  return (
    <section id="showtypes" className="showtypes-section">
      <div className="container" style={{ overflowX: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7 }}
          className="showtypes-header"
        >
          <h2>TYPES OF <span style={{ color: 'var(--gold)' }}>SHOWS</span></h2>
        </motion.div>

        <div className="showtypes-list">
          {showTypes.map((show, idx) => (
            <ShowRow key={show.id} show={show} index={idx} navigate={navigate} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShowTypes;
