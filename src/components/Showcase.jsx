import React from 'react';
import { motion } from 'framer-motion';

const Showcase = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800&auto=format&fit=crop', wide: true },
    { src: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=800&auto=format&fit=crop', tall: true },
    { src: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop', wide: false },
    { src: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop', wide: true },
    { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop', tall: false },
    { src: 'https://images.unsplash.com/photo-1459749411177-3c2ea8156dad?q=80&w=800&auto=format&fit=crop', wide: false },
  ];

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Visual <span className="gold-text">Rhythm</span></h2>
        </motion.div>

        <div className="masonry-grid">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`grid-item ${img.wide ? 'wide' : ''} ${img.tall ? 'tall' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={img.src} alt={`Showcase ${index}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
