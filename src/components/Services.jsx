import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const services = [
  { title: 'Corporate Events', desc: 'High-energy performances for galas & launches', tag: 'Events' },
  { title: 'Private Weddings', desc: 'Traditional rhythms meet modern groove', tag: 'Ceremonies' },
  { title: 'Music Festivals', desc: 'Main stage performances worldwide', tag: 'Festivals' },
  { title: 'Drum Workshops', desc: 'Interactive hands-on percussion sessions', tag: 'Education' },
  { title: 'Team Building', desc: 'Corporate team bonding through rhythm & music', tag: 'Corporate' },
  { title: 'Gather & Groove', desc: 'Community drumming circles for all skill levels', tag: 'Experience' },
];

const Services = () => (
  <section id="services" className="services-section">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '20px' }}
      >
        <p className="section-eyebrow">03 Our Offerings</p>
        <h2 style={{ margin: 0 }}>OUR <span style={{ color: 'var(--gold)' }}>OFFERINGS</span></h2>
      </motion.div>

      <div style={{ borderTop: '1px solid rgba(17, 17, 17, 0.18)', marginTop: '60px' }}>
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="service-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="service-item-num">0{i + 1}</span>
            <span className="service-item-name">{s.title}</span>
            <div className="service-item-desc">
              <span style={{
                display: 'inline-block',
                fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '2px', padding: '5px 12px', borderRadius: '30px',
                border: '1.5px solid var(--text-grey)', color: 'var(--text-grey)',
                marginBottom: '8px',
              }}>{s.tag}</span>
              <p style={{ fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
            </div>
            <a href="#contact" className="service-arrow"><FaArrowRight size={14} /></a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
