import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: "Corporate Events", desc: "High-energy performances for galas & launches" },
    { title: "Private Weddings", desc: "Traditional rhythms meet modern groove" },
    { title: "Music Festivals", desc: "Main stage performances worldwide" },
    { title: "Drum Workshops", desc: "Interactive team building sessions" }
  ];

  return (
    <section id="services" className="services-list-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our <span style={{ color: 'var(--earth-red)' }}>Offerings</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)' }}></div>
        </motion.div>

        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-row"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 80 }}
            whileHover={{ x: 20, backgroundColor: 'rgba(249, 180, 45, 0.1)' }}
          >
            <h2 className="service-title" style={{ fontWeight: 800 }}>{service.title}</h2>
            <p className="service-desc" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
