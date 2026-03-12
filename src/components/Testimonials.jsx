import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const reviews = [
  {
    text: 'Beat Gurus infused our event with an energy that was absolutely electric. The fusion of cultures left our international delegates completely spellbound.',
    author: 'Tech Summit Organizers',
    role: 'Corporate Event',
    initials: 'TS',
    accent: 'var(--earth-red)',
  },
  {
    text: 'We wanted something unique for our wedding, and their Djembe beats were the perfect heartbeat to our celebration. Truly unforgettable.',
    author: 'Priya & Rahul',
    role: 'Wedding Clients',
    initials: 'PR',
    accent: 'var(--gold)',
  },
  {
    text: 'A powerhouse of rhythm! They don\'t just play drums; they command the stage. The raw energy is something you have to experience live.',
    author: 'Music Magazine',
    role: 'Editorial Review',
    initials: 'MM',
    accent: 'var(--text-dark)',
  },
  {
    text: 'The BBC World Awards performance was breathtaking. They brought a warmth and authenticity that elevated the entire evening to something truly special.',
    author: 'BBC World Travel Awards',
    role: 'International Event',
    initials: 'BBC',
    accent: 'var(--earth-red)',
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p - 1 + reviews.length) % reviews.length);
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section ref={sectionRef} className="testimonials-section">
      {/* Floating background text */}
      <motion.div className="testi-bg-text" style={{ y: bgY }}>
        VOICES
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <div className="testi-header-row">
          <motion.div
            className="testi-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-eyebrow">06 Voices</p>
            <h2 style={{ margin: 0 }}>
              SUCCESS <br />
              <span style={{ color: 'var(--gold)' }}>STORIES</span>
            </h2>
          </motion.div>
        </div>

        <div className="testi-slider-container">
          <div className="testi-slider-inner">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="testi-slide-card"
              >
                <div className="testi-slide-top">
                  <div className="testi-stars">
                    {Array(5).fill(null).map((_, j) => <FaStar key={j} size={16} />)}
                  </div>
                  <FaQuoteLeft size={32} style={{ color: reviews[active].accent, opacity: 0.15 }} />
                </div>

                <p className="testi-slide-text">
                  &ldquo;{reviews[active].text}&rdquo;
                </p>

                <div className="testi-slide-author">
                  <div className="testi-slide-avatar" style={{ background: reviews[active].accent }}>
                    {reviews[active].initials}
                  </div>
                  <div className="testi-slide-author-info">
                    <h4>{reviews[active].author}</h4>
                    <span>{reviews[active].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testi-nav-bottom">
            <div className="testi-nav-controls">
              <button onClick={prev} className="testi-nav-btn" aria-label="Previous" data-cursor-hover>
                <FaChevronLeft size={16} />
              </button>
              <button onClick={next} className="testi-nav-btn" aria-label="Next" data-cursor-hover>
                <FaChevronRight size={16} />
              </button>
            </div>

            <div className="testi-progress">
              <span className="testi-counter">
                0{active + 1} / 0{reviews.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
