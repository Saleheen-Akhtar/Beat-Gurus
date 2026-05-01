import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const tags = ['BBC World Award', 'Norway Cultural Evening', 'Wine Festivals', 'Corporate Galas', 'International Stages'];

const stats = [
  { end: 20, suffix: '+', label: 'Years', desc: 'Two decades of live performance, refining the craft on stages worldwide.' },
  { end: 100, suffix: '+', label: 'Cities', desc: 'From Bangalore to Oslo, our rhythm speaks every language.' },
  { end: 5000, suffix: '+', label: 'Shows', desc: 'Corporate galas, festivals, weddings, each one unforgettable.' },
];

const CountUp = ({ end, suffix, inView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const hasRun = useRef(false);

  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true;
      const controls = animate(count, end, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, end]);

  return <><motion.span>{rounded}</motion.span>{suffix}</>;
};

const About = () => {
  const statsRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
  <section id="about" className="about-section">
    <div className="container">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7 }}
      >
        <h2>OUR <span style={{ color: 'var(--gold)' }}>LEGACY</span></h2>
      </motion.div>

      <div className="about-grid">

        {/* Left: story */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <h3>Born in Bangalore,<br />Heard Worldwide.</h3>
          <p>
            Founded by <strong style={{ color: 'var(--text-dark)' }}>Ganesh Govindswamy</strong>, <span className="font-brand-name">Beat Gurus</span> channels the captivating
            power of the <em>Djembe</em>, a traditional hand drum from West Africa,
            blended with rich Indian rhythmic heritage.
          </p>
          <p>
            Our passion for music transcends boundaries, gracing prestigious stages from the{' '}
            <strong style={{ color: 'var(--text-dark)' }}>BBC World Travel Awards</strong> to the{' '}
            <strong style={{ color: 'var(--text-dark)' }}>International Cultural Evening in Norway</strong>.
          </p>
          <div className="about-tags">
            {tags.map(t => (
              <span key={t} className="about-tag">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Right: stats */}
        <motion.div
          ref={statsRef}
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-row-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <span className="stat-big-num">
                <CountUp end={s.end} suffix={s.suffix} inView={inView} />
              </span>
              <div>
                <p className="stat-label-text">{s.label}</p>
                <p className="stat-desc-text">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default About;
