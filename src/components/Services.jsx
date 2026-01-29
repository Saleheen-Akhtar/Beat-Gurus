import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: "🏢",
      title: "Corporate Events",
      desc: "High-energy performances designed to electrify company gatherings, launches, and galas."
    },
    {
      icon: "💍",
      title: "Weddings",
      desc: "Unforgettable entertainment for receptions, cocktail parties, and sangeets, blending tradition with groove."
    },
    {
      icon: "🎉",
      title: "Cultural Festivals",
      desc: "We bring the beat to the streets and stages, from the Bangalore Wine Festival to global cultural evenings."
    },
    {
      icon: "🥁",
      title: "Workshops",
      desc: "Interactive Djembe drumming workshops led by Ganesh Govindswamy for team building and music lovers."
    }
  ];

  return (
    <section id="services" className="section bg-darker">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our <span className="gold">Services</span></h2>
          <div className="line"></div>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
