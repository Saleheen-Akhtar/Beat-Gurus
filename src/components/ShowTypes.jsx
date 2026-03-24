import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const shows = [
  {
    id: 'flute',
    title: 'Flute Fusion',
    desc: 'Melodic winds soaring above the rhythm section, weaving trance-like aerial textures that elevate any event into a spiritual experience.',
    link: 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1?usp=drive_link',
    img: 'https://images.unsplash.com/photo-1460036521480-15bc755fb34a?q=80&w=1200&auto=format&fit=crop',
    align: 'left'
  },
  {
    id: 'drum',
    title: 'Drum Circles',
    desc: 'Interactive hands-on percussion sessions. Perfect for uniting groups, fostering harmony, and breaking down barriers through pure acoustic rhythm.',
    link: 'https://drive.google.com/drive/folders/14iqZ8zuTiPTlLasgg7LmVp6bz7jwX4vj?usp=drive_link',
    img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1200&auto=format&fit=crop',
    align: 'right'
  },
  {
    id: 'dj',
    title: 'DJ X Percussion',
    desc: 'Traditional rhythms meet modern groove. A high-energy fusion of driving electronic beats and raw, live acoustic power designed for maximum crowd impact.',
    link: 'https://drive.google.com/drive/folders/1ZrlbT8I60V6ULuKDBSLx-clOfD8dik4O?usp=drive_link',
    img: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?q=80&w=1200&auto=format&fit=crop',
    align: 'left'
  }
];

const ShowRow = ({ show, index }) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isLeft = show.align === 'left';

  const yImg = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-15%", "15%"]);

  // Animation tied to scroll for coming from left/right
  const xContainer = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? ["0vw", "0vw", "0vw"]
      : (isLeft ? ["-20vw", "0vw", "10vw"] : ["20vw", "0vw", "-10vw"])
  );

  const opacityContainer = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`showtype-row ${isLeft ? 'align-left' : 'align-right'}`}
      style={{ x: xContainer, opacity: opacityContainer }}
    >
      <div className="showtype-img-wrapper">
        <motion.img
          style={{ y: yImg }}
          src={show.img}
          alt={show.title}
          className="showtype-img"
          loading="lazy"
          decoding="async"
        />
        <div className="showtype-img-overlay" />

        {/* Mobile Content Overlay */}
        <div className="showtype-content-mobile">
          <span className="showtype-num">0{index + 1}</span>
          <h3 className="showtype-title">{show.title}</h3>
          <p className="showtype-desc">{show.desc}</p>
          <a
            href={show.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mobile-btn"
            data-cursor-hover
          >
            View Media <FaArrowRight size={12} style={{ marginLeft: '8px' }} />
          </a>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="showtype-content showtype-content-desktop">
        <span className="showtype-num">0{index + 1}</span>
        <h3 className="showtype-title">{show.title}</h3>
        <p className="showtype-desc">{show.desc}</p>

        <a
          href={show.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          data-cursor-hover
        >
          View Media <FaArrowRight size={12} style={{ marginLeft: '8px' }} />
        </a>
      </div>
    </motion.div>
  );
};

const ShowTypes = () => {
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
          <p className="section-eyebrow">04 {shows.length} Experience {shows.length === 1 ? 'Set' : 'Sets'}</p>
          <h2>TYPES OF <span style={{ color: 'var(--gold)' }}>SHOWS</span></h2>
        </motion.div>

        <div className="showtypes-list">
          {shows.map((show, idx) => (
            <ShowRow key={show.id} show={show} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShowTypes;
