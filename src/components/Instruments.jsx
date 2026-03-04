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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '80px' }}
        >
          <span className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '-10px' }}>03.</span>
          <h2 className="section-title" style={{ margin: 0 }}>THE <span style={{ color: 'var(--earth-red)' }}>INSTRUMENTS</span></h2>
        </motion.div>

        <div className="instruments-grid">
          {instruments.map((inst, index) => (
            <motion.div
              className="instrument-item"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1rem', color: 'var(--earth-red)' }}>/0{index + 1}</span>
                {inst.name}
              </h3>
              <p style={{ marginTop: '20px', fontSize: '1.2rem', color: 'var(--text-grey)' }}>{inst.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instruments;
