import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const instruments = [
  {
    title: 'Djembe',
    subtitle: 'The heartbeat of West Africa, driving rhythms that move the crowd and shake the earth.',
    category: 'Percussion',
    index: '/01',
    image: 'https://github.com/user-attachments/assets/b578d5f5-ff82-40d8-935a-617c8810d5f1',
  },
  {
    title: 'Didgeridoo',
    subtitle: 'Ancient drone tones from the Australian outback, 40,000 years of living sound.',
    category: 'Wind',
    index: '/02',
    image: 'https://github.com/user-attachments/assets/c609201c-9b1c-46a3-b3d7-7df62bc278f3',
  },
  {
    title: 'Congas',
    subtitle: 'Afro-Cuban tall hand drums driving deep, resonant polyrhythms that anchor the groove.',
    category: 'Percussion',
    index: '/03',
    image: 'https://github.com/user-attachments/assets/e9ae66a2-707d-42e7-b54e-f6ba739ccc7b',
  },
  {
    title: 'Bongos',
    subtitle: 'Paired Cuban drums delivering crisp, high-pitched accents that ride above the rhythm section.',
    category: 'Percussion',
    index: '/04',
    image: 'https://github.com/user-attachments/assets/cec432eb-3b98-43fb-be8f-507a020f3f5e',
  },
  {
    title: 'Kanjira',
    subtitle: 'South Indian frame drum bridging Carnatic precision with raw global flair.',
    category: 'Percussion',
    index: '/05',
    image: 'https://github.com/user-attachments/assets/43ce1d6c-337c-4541-9f2d-4477d0079a6a',
  },
  {
    title: 'Cajon',
    subtitle: 'Peruvian box drum, versatile, punchy, and undeniably soulful in every strike.',
    category: 'Acoustic',
    index: '/06',
    image: 'https://github.com/user-attachments/assets/6de4b047-ea95-47bb-8c25-6c8483caa09b',
  },
  {
    title: 'Flute',
    subtitle: 'Melodic winds soaring above the rhythm section, weaving trance-like aerial textures.',
    category: 'Wind',
    index: '/07',
    image: 'https://github.com/user-attachments/assets/afb27431-fdba-443b-a6f3-cd74c72a1dc5',
  },
];

const imgVariants = {
  enter: (dir) => ({ scale: 1.06, x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { scale: 1, x: 0, opacity: 1, transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] } },
  exit: (dir) => ({ scale: 1.04, x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } }),
};

const infoVariants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0, filter: 'blur(4px)' }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.44, ease: [0.76, 0, 0.24, 1], delay: 0.06 } },
  exit: (dir) => ({ x: dir > 0 ? -24 : 24, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.28 } }),
};

export default function Instruments() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (n) => {
    if (n === active) return;
    setDir(n > active ? 1 : -1);
    setActive(n);
  };

  const prev = () => go((active - 1 + instruments.length) % instruments.length);
  const next = () => go((active + 1) % instruments.length);

  const inst = instruments[active];

  return (
    <section id="instruments" className="instruments-section">
      <div className="container">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7 }}
        >
          <h2>THE <span style={{ color: 'var(--gold)' }}>INSTRUMENTS</span></h2>
        </motion.div>

        {/* ── Main slider card ── */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="instrument-slider-card"
        >
          {/* Left - image pane */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.img
                key={active}
                src={inst.image}
                alt={inst.title}
                custom={dir}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.08) brightness(0.82)',
                }}
              />
            </AnimatePresence>

            {/* Right-edge gradient blend into dark panel */}
          </div>

          {/* Right - info pane */}
          <div className="instrument-info-pane">


            {/* Animated text block */}
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={active}
                custom={dir}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -40) next();
                  else if (offset.x > 40) prev();
                }}
                style={{ flex: 1, paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
              >
                <span style={{
                  display: 'inline-block', alignSelf: 'flex-start',
                  fontFamily: 'var(--font-main)', fontSize: '0.6rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '2.5px',
                  color: 'var(--gold)', border: '1.5px solid var(--gold)',
                  borderRadius: '40px', padding: '4px 13px',
                }}>
                  {inst.category}
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-main)', fontSize: 'clamp(1.9rem, 3vw, 2.8rem)', fontWeight: 'bold',
                  color: 'var(--bg-sand)',
                  lineHeight: 0.92, letterSpacing: '0.01em',
                  textTransform: 'uppercase', margin: 0,
                }}>
                  {inst.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-main)', fontSize: '0.88rem',
                  color: 'rgba(245, 241, 236, 0.48)', lineHeight: 1.72, margin: 0,
                }}>
                  {inst.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>


            {/* Footer section (dots, counter, arrows) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {/* Dots container */}
                <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                  {instruments.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === active ? "step" : undefined}
                      style={{
                        width: i === active ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: i === active ? 'var(--gold)' : 'rgba(245, 241, 236, 0.18)',
                        border: 'none', padding: 0, cursor: 'pointer',
                        transition: 'all 0.35s ease',
                      }}
                    />
                  ))}
                </div>

            {/* Nav arrows */}
            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
              {[{ label: '←', fn: prev }, { label: '→', fn: next }].map(({ label, fn }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label === '←' ? "Previous slide" : "Next slide"}
                  className="instrument-nav-btn"

                >
                  {label}
                </button>
              ))}
            </div>
              </div>
              <span style={{
                fontFamily: 'var(--font-main)', fontSize: '0.75rem',
                color: 'rgba(245, 241, 236, 0.28)', letterSpacing: '2.5px',
              }}>
                
              </span>
            </div>

          </div>
        </motion.div>

        {/* ── Thumbnail strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', gap: '10px', marginTop: '12px' }}
        >
          {instruments.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              style={{
                flex: 1,
                aspectRatio: '16/9',
                borderRadius: '8px',
                overflow: 'hidden',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                outline: i === active ? '2.5px solid var(--gold)' : '2.5px solid transparent',
                outlineOffset: '3px',
                opacity: i === active ? 1 : 0.38,
                transition: 'opacity 0.35s ease, outline-color 0.35s ease',
              }}
            >
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
