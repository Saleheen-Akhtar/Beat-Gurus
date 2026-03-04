import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';

const Showcase = () => {
  const projects = [
    {
      id: 1,
      title: "BBC World Awards",
      category: "International",
      img: "https://images.unsplash.com/photo-1514525253440-b393452e8d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      size: "large"
    },
    {
      id: 2,
      title: "Wine Festival",
      category: "Cultural",
      img: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      size: "small"
    },
    {
      id: 3,
      title: "Corporate Gala",
      category: "Event",
      img: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      size: "small"
    },
    {
      id: 4,
      title: "Norway Cultural Evening",
      category: "International",
      img: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      size: "large"
    }
  ];

  return (
    <section id="work" className="showcase-section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '80px' }}>
          <TextReveal>
            <span className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '-10px' }}>02.</span>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="section-title" style={{ margin: 0 }}>LIVE <span style={{ color: 'var(--earth-red)' }}>MOMENTS</span></h2>
          </TextReveal>
        </div>

        <div className="horizontal-scroll-container" style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '40px',
          paddingBottom: '40px',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none' // IE and Edge
        }}>
          {/* Hide webkit scrollbar in index.css */}
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="gallery-card"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              style={{
                minWidth: 'clamp(300px, 40vw, 500px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div className="img-wrapper" style={{
                height: '60vh',
                border: '4px solid var(--text-dark)',
                boxShadow: '8px 8px 0px var(--text-dark)',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--text-dark)'
              }}>
                <motion.img
                  src={project.img}
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    filter: 'grayscale(80%) sepia(20%) contrast(1.2) brightness(0.9)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8
                  }}
                />
                <div className="overlay-content" style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  background: 'rgba(26, 5, 5, 0.4)',
                  transition: 'opacity 0.3s ease'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--bg-sand)',
                    fontSize: '2.5rem',
                    transform: 'rotate(-5deg)'
                  }}>View</span>
                </div>
              </div>

              <div className="project-info-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: 'var(--text-dark)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1, marginBottom: '10px', textTransform: 'uppercase' }}>{project.title}</h3>
                  <span style={{ color: 'var(--earth-red)', fontFamily: 'var(--font-main)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                </div>
                <span className="accent-text" style={{ fontSize: '1.5rem', color: 'var(--text-grey)' }}>0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
