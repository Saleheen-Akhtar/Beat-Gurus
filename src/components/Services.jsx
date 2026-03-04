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
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-row"
            initial={{ opacity: 0, borderBottomColor: "rgba(255,255,255,0.1)" }}
            whileInView={{ opacity: 1, borderBottomColor: "rgba(212, 175, 55, 0.5)" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="service-title">{service.title}</h2>
            <p className="service-desc">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
