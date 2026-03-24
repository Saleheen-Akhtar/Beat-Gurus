import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const services = [
  { title: 'Corporate Events', desc: 'High-energy performances for galas & launches. We craft custom rhythmic experiences that align with your corporate brand, leaving a lasting impression on stakeholders and employees alike.', tag: 'Events' },
  { title: 'Private Weddings', desc: 'Traditional rhythms meet modern groove. Elevate your special day with authentic acoustic energy that brings families together on the dance floor.', tag: 'Ceremonies' },
  { title: 'Music Festivals', desc: 'Main stage performances worldwide. Our massive stage presence and raw acoustic power are designed to captivate thousands and create unforgettable festival moments.', tag: 'Festivals' },
  { title: 'Drum Workshops', desc: 'Interactive hands-on percussion sessions. Perfect for schools, communities, and corporate retreats, teaching rhythm, listening, and collaborative harmony.', tag: 'Education' },
  { title: 'Team Building', desc: 'Corporate team bonding through rhythm & music. Break down barriers and foster unity as your team learns to play together as a cohesive rhythmic unit.', tag: 'Corporate' },
  { title: 'Gather & Groove', desc: 'Community drumming circles for all skill levels. A space for expression, connection, and pure joy through shared acoustic rhythms.', tag: 'Experience' },
];

const Services = () => (
  <section id="services" className="services-section">
    <div className="container">
      <div className="services-grid">
        {/* Left Side: Sticky Header */}
        <div className="services-sticky-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7 }}
            className="services-header-wrap"
          >
            <p className="section-eyebrow">03 Our Offerings</p>
            <h2 style={{ margin: 0 }}>
              OUR <br />
              <span style={{ color: 'var(--gold)' }}>OFFERINGS</span>
            </h2>
            <p className="services-intro-text">
              We bring raw acoustic energy to every stage. No backing tracks, no synthesizers, just pure, driving rhythm tailored for your audience.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Scrolling List */}
        <div className="services-list-col">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-list-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="service-list-top">
                <span className="service-list-num">0{i + 1}</span>
                <span className="service-list-tag">{s.tag}</span>
              </div>

              <h3 className="service-list-title">{s.title}</h3>
              <p className="service-list-desc">{s.desc}</p>

              <a href="#contact" className="service-list-link">
                Discuss Project <FaArrowRight size={12} className="arrow-icon" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Services;
