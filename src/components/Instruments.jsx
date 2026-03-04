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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our <span style={{ color: 'var(--earth-red)' }}>Arsenal</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)' }}></div>
        </motion.div>

        <div className="instruments-grid">
          {instruments.map((inst, index) => (
            <motion.div
              className="instrument-item"
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 style={{ borderBottom: '2px dashed var(--earth-red)', paddingBottom: '10px', display: 'inline-block' }}>{inst.name}</h3>
              <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>{inst.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instruments;
