import React from 'react';
import { motion } from 'framer-motion';

const Instruments = () => {
  const instruments = [
    {
      name: "Djembe",
      desc: "The heart of our sound. A goblet-shaped hand drum from West Africa capable of a wide range of tones."
    },
    {
      name: "Didgeridoo",
      desc: "An ancient wind instrument developed by Indigenous Australians, adding deep, drone-like textures."
    },
    {
      name: "Congas & Bongos",
      desc: "Afro-Cuban drums that add complex layers and high-pitched accents to our rhythm."
    },
    {
      name: "Kanjira",
      desc: "A South Indian frame drum, bridging our African influences with our Indian roots."
    },
    {
      name: "Flute",
      desc: "Melodic winds that soar above the percussion, creating a trance-like fusion atmosphere."
    }
  ];

  return (
    <section id="instruments" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our <span className="gold">Arsenal</span></h2>
          <div className="line"></div>
        </motion.div>

        <div className="instruments-grid">
          {instruments.map((inst, index) => (
            <motion.div
              className="instrument-item"
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{inst.name}</h3>
              <p>{inst.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instruments;
