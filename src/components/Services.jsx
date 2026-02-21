import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: "International Tours", desc: "BBC World Travel Awards, Norway Cultural Evening & more" },
    { title: "Music Festivals", desc: "Bangalore Wine Festival, October Fest & Global Stages" },
    { title: "Corporate Galas", desc: "High-energy fusion performances for elite events" },
    { title: "Weddings & Private", desc: "Traditional rhythms meeting modern celebration" }
  ];

  return (
    <section id="services" className="services-list-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our <span className="gold-text">Services</span></h2>
        </motion.div>

        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-row"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
