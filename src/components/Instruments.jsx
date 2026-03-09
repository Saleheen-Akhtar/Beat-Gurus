import React from 'react';
import { motion } from 'framer-motion';

const instruments = [
  { name: 'Djembe', desc: 'The heart of our sound. A goblet-shaped hand drum from West Africa capable of a wide range of tones, from deep bass to crisp slap.', icon: '\uD83E\uDD41' },
  { name: 'Didgeridoo', desc: 'An ancient wind instrument of Indigenous Australians, adding deep, mesmerising drone-like textures beneath the percussion.', icon: '\uD83C\uDFB5' },
  { name: 'Congas & Bongos', desc: 'Afro-Cuban drums adding complex layers and high-pitched rhythmic accents to the ensemble\'s groove.', icon: '\uD83E\uDD41' },
  { name: 'Kanjira', desc: 'A South Indian frame drum bridging our African influences with our Indian roots, delivering intricate rhythmic patterns.', icon: '\uD83C\uDFB6' },
  { name: 'Cajon', desc: 'A Peruvian box drum delivering deep bass kicks and snappy tones, adding versatile percussive depth to every performance.', icon: '\uD83E\uDD41' },
  { name: 'Flute', desc: 'Melodic winds soaring above the percussion, creating a trance-like cross-cultural fusion atmosphere.', icon: '\uD83C\uDFBB' },
];

const Instruments = () => (
  <section id="instruments" className="instruments-section">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-eyebrow">05 The Arsenal</p>
        <h2 style={{ margin: 0 }}>THE <span style={{ color: 'var(--earth-red)' }}>INSTRUMENTS</span></h2>
      </motion.div>

      <div className="instruments-grid">
        {instruments.map((inst, i) => (
          <motion.div
            key={i}
            className="instrument-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <span className="instrument-card-num">/0{i + 1}</span>
            <span className="instrument-card-icon">{inst.icon}</span>
            <h3 className="instrument-card-name">{inst.name}</h3>
            <p className="instrument-card-desc">{inst.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Instruments;
