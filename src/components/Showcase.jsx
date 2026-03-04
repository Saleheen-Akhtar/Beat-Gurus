import React from 'react';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '80px' }}
        >
          <span className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '-10px' }}>02.</span>
          <h2 className="section-title" style={{ margin: 0 }}>LIVE <span style={{ color: 'var(--earth-red)' }}>MOMENTS</span></h2>
        </motion.div>

        <div className="masonry-grid" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                direction: index % 2 === 0 ? 'ltr' : 'rtl'
              }}
            >
              <div className="img-wrapper" style={{ borderRadius: '0px', height: '60vh', border: 'none', overflow: 'hidden' }}>
                <motion.img
                  src={project.img}
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.9)', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div className="project-info-text" style={{ padding: '40px', direction: 'ltr' }}>
                <span className="accent-text" style={{ fontSize: '2rem', marginBottom: '20px' }}>{project.category}</span>
                <h3 style={{ color: 'var(--text-dark)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '20px' }}>{project.title}</h3>
                <div style={{ width: '50px', height: '4px', background: 'var(--earth-red)' }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
