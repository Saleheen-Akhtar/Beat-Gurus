import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Stage lights
    "https://images.unsplash.com/photo-1514525253440-b393452e8d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Rock crowd
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Concert
    "https://images.unsplash.com/photo-1459749411177-d4a428c3e8cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Crowd cheering
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Drum kit detail
    "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  // Guitar/Stage
  ];

  return (
    <section className="section bg-darker" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Live in <span className="gold-text">Action</span></h2>
          <div className="line"></div>
        </div>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={img} alt="Beat Gurus Performance" />
              <div className="overlay">
                <span>View Performance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .gallery-item {
          position: relative;
          height: 300px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .overlay span {
          color: var(--gold);
          border: 1px solid var(--gold);
          padding: 8px 16px;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        .gallery-item:hover .overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
