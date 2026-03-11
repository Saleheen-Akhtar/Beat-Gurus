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

// Each stacked card: offset, rotation, and scale for the "folder stack" look
const stackOffsets = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 8, y: 6, rotate: 2.5, scale: 0.97 },
  { x: 16, y: 12, rotate: 5, scale: 0.94 },
  { x: 24, y: 18, rotate: 7.5, scale: 0.91 },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [exitDir, setExitDir] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const goTo = (idx) => {
    setExitDir(idx > active ? 1 : -1);
    setActive(idx);
  };

  const next = () => {
    setExitDir(1);
    setActive((p) => (p + 1) % reviews.length);
  };

  const prev = () => {
    setExitDir(-1);
    setActive((p) => (p - 1 + reviews.length) % reviews.length);
  };

  // Build the visible stack: active card on top, next cards behind
  const getStackOrder = () => {
    const order = [];
    for (let i = 0; i < reviews.length; i++) {
      order.push((active + i) % reviews.length);
    }
    return order;
  };

  const stack = getStackOrder();

  return (
    <section ref={sectionRef} className="testimonials-section">
      {/* Floating background text */}
      <motion.div className="testi-bg-text" style={{ y: bgY }}>
        VOICES
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header row */}
        <div className="testi-top-row">
          <motion.div
            className="testi-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-eyebrow">06 Voices</p>
            <h2 style={{ margin: 0 }}>WHAT THEY <span style={{ color: 'var(--gold)' }}>SAY</span></h2>
          </motion.div>

          <div className="testi-nav">
            <button onClick={prev} className="testi-nav-btn" aria-label="Previous" data-cursor-hover>
              <FaChevronLeft size={14} />
            </button>
            <span className="testi-counter">
              0{active + 1} <span style={{ opacity: 0.3 }}>/</span> 0{reviews.length}
            </span>
            <button onClick={next} className="testi-nav-btn" aria-label="Next" data-cursor-hover>
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* macOS-style stacked cards area */}
        <div className="testi-stack-area">
          {/* Left: the card stack */}
          <div className="testi-stack" data-cursor-hover>
            {/* Render stack in reverse so top card paints last */}
            {[...stack].reverse().map((reviewIdx, renderIdx) => {
              const depthIdx = reviews.length - 1 - renderIdx; // 0 = top, 3 = back
              const offsets = stackOffsets[Math.min(depthIdx, stackOffsets.length - 1)];
              const isTop = depthIdx === 0;

              return (
                <motion.div
                  key={reviewIdx}
                  className={`testi-card${isTop ? ' testi-card-active' : ''}`}
                  animate={{
                    x: offsets.x,
                    y: offsets.y,
                    rotate: offsets.rotate,
                    scale: offsets.scale,
                    zIndex: reviews.length - depthIdx,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                    mass: 0.9,
                  }}
                  onClick={() => !isTop && goTo(reviewIdx)}
                  style={{ position: depthIdx === 0 ? 'relative' : 'absolute', top: 0, left: 0 }}
                >
                  {/* Accent strip */}
                  <div className="testi-accent" style={{ background: reviews[reviewIdx].accent }} />

                  {/* Quote icon */}
                  <div className="testi-quote-icon" style={{ color: reviews[reviewIdx].accent }}>
                    <FaQuoteLeft size={32} />
                  </div>

                  {/* Stars */}
                  <div className="testi-stars">
                    {Array(5).fill(null).map((_, j) => <FaStar key={j} size={13} />)}
                  </div>

                  <p className="testi-text">&ldquo;{reviews[reviewIdx].text}&rdquo;</p>

                  <div className="testi-footer">
                    <div className="testi-avatar" style={{ background: reviews[reviewIdx].accent }}>
                      {reviews[reviewIdx].initials}
                    </div>
                    <div>
                      <p className="testi-name">{reviews[reviewIdx].author}</p>
                      <span className="testi-role">{reviews[reviewIdx].role}</span>
                    </div>
                  </div>

                  <span className="testi-num">0{reviewIdx + 1}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Right: expanded view of the active review (desktop) */}
          <div className="testi-expanded">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testi-expanded-content"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="testi-expanded-quote">
                  <FaQuoteLeft size={22} style={{ color: reviews[active].accent, opacity: 0.35, marginBottom: 16 }} />
                  <p>&ldquo;{reviews[active].text}&rdquo;</p>
                </div>
                <div className="testi-expanded-author">
                  <div className="testi-expanded-avatar" style={{ background: reviews[active].accent }}>{reviews[active].initials}</div>
                  <div>
                    <h4>{reviews[active].author}</h4>
                    <span>{reviews[active].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="testi-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot${i === active ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  data-cursor-hover
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
