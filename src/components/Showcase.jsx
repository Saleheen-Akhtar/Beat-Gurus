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
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Selected <span style={{ color: 'var(--earth-red)' }}>Work</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)', width: '100px', height: '4px', marginBottom: '40px' }}></div>
        </motion.div>

        <div className="masonry-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.size}`}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              style={{
                border: '4px solid var(--text-dark)',
                boxShadow: '8px 8px 0px var(--text-dark)',
                borderRadius: '0px'
              }}
            >
              <div className="img-wrapper" style={{ borderRadius: '0px' }}>
                <motion.img
                  src={project.img}
                  alt={project.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ filter: 'grayscale(80%) sepia(30%) hue-rotate(340deg)' }}
                />
                <div className="project-info" style={{ background: 'rgba(235, 220, 185, 0.9)', padding: '20px', border: '2px solid var(--text-dark)', left: '20px', bottom: '20px' }}>
                  <h3 style={{ color: 'var(--text-dark)' }}>{project.title}</h3>
                  <span style={{ color: 'var(--earth-red)', fontWeight: 'bold' }}>{project.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
