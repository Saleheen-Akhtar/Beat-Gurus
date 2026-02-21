import React from 'react';
import { motion } from 'framer-motion';

const Instruments = () => {
  const instruments = [
    {
      name: "Djembe",
      desc: "The heartbeat of our sound. This West African goblet drum delivers the primal energy that defines Beat Gurus."
    },
    {
      name: "Indian Percussion",
      desc: "Integrating the complex rhythmic structures of the Kanjira and Tabla to bridge cultures."
    },
    {
      name: "Didgeridoo",
      desc: "Ancient Australian wind instrument adding deep, resonant drone textures to the mix."
    },
    {
      name: "World Drums",
      desc: "From Congas to Bongos, layering Afro-Cuban grooves over our foundation."
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
          <h2>Sonic <span className="gold-text">Arsenal</span></h2>
        </motion.div>

        <div className="instruments-grid">
          {instruments.map((inst, index) => (
            <motion.div
              className="instrument-item"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
