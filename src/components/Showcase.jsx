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
        <div className="section-header">
          <h2 className="section-title">Selected <span className="gold-text">Work</span></h2>
        </div>

        <div className="masonry-grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.size}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="img-wrapper">
                <img src={project.img} alt={project.title} />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <span>{project.category}</span>
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
