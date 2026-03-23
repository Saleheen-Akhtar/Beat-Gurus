import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yImg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const yText = useTransform(scrollYProgress, [0.2, 0.8], ["40px", "-40px"]);

  const isLeft = show.align === 'left';

  return (
    <div ref={ref} className={`showtype-row ${isLeft ? 'align-left' : 'align-right'}`}>
      <div className="showtype-img-wrapper">
        <motion.img
          style={{ y: yImg }}
          src={show.img}
          alt={show.title}
          className="showtype-img"
        />
        <div className="showtype-img-overlay" />
      </div>

      <motion.div
        className="showtype-content"
        style={{ opacity: opacityText, y: yText }}
      >
        <span className="showtype-num">0{index + 1}</span>
        <h3 className="showtype-title">{show.title}</h3>
        <p className="showtype-desc">{show.desc}</p>

        <a
          href={show.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline showtype-btn"
          data-cursor-hover
        >
          View Media <FaArrowRight size={12} style={{ marginLeft: '8px' }} />
        </a>
      </motion.div>
    </div>
  );
};

const ShowTypes = () => {
  return (
    <section id="showtypes" className="showtypes-section">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7 }}
          className="showtypes-header"
        >
          <p className="section-eyebrow">04 Experience Sets</p>
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
