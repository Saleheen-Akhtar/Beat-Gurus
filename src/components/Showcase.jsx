import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  { id: 1, title: 'BBC World Awards', category: 'International', img: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1200&auto=format&fit=crop', desc: 'Award-winning percussion at the global stage', year: '2023', duration: '03:45' },
  { id: 2, title: 'Wine Festival', category: 'Cultural', img: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?q=80&w=1200&auto=format&fit=crop', desc: 'Rhythmic energy at Bangalore\'s finest festivals', year: '2022', duration: '04:12' },
  { id: 3, title: 'Corporate Gala', category: 'Event', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop', desc: 'High-energy performances for prestigious events', year: '2024', duration: '02:50' },
  { id: 4, title: 'Norway Cultural Evening', category: 'International', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop', desc: 'Cross-cultural fusion on international stages', year: '2021', duration: '05:30' },
  { id: 5, title: 'Gather & Groove', category: 'Team Building', img: 'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?q=80&w=1200&auto=format&fit=crop', desc: 'Interactive drum circles that unite teams', year: '2023', duration: '01:45' },
];

const categories = ['ALL', 'INTERNATIONAL', 'CULTURAL', 'EVENT', 'TEAM BUILDING'];

const Showcase = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('SLIDER'); // SLIDER or LIST
  const [activeItem, setActiveItem] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress for parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax effects for central text
  const centerTextY = useTransform(smoothProgress, [0, 1], ['0vh', '150vh']);
  const centerTextOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const centerTextScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  // Timeline rotation/scroll effect
  const timelineY = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

  const filteredProjects = projects.filter(p => activeFilter === 'ALL' || p.category.toUpperCase() === activeFilter);

  // Update active item based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        Math.max(Math.floor(latest * filteredProjects.length), 0),
        filteredProjects.length - 1
      );
      if (filteredProjects[index]) {
        setActiveItem(filteredProjects[index].id);
      }
    });
  }, [scrollYProgress, filteredProjects]);

  return (
    <section id="work" className="showcase-jason-section" ref={containerRef}>

      {/* Sticky Central Container */}
      <div className="showcase-jason-sticky">

        {/* Massive Parallax Typography */}
        <motion.div
          className="showcase-jason-center-text"
          style={{ y: centerTextY, opacity: centerTextOpacity, scale: centerTextScale }}
        >
          <span className="hollow">RAW</span>
          <span>ACOUSTIC</span>
          <span className="gold-text">ENERGY</span>
        </motion.div>

        {/* Central Vertical Timeline / Motif */}
        <div className="showcase-jason-timeline-wrapper">
          <motion.div className="showcase-jason-timeline" style={{ y: timelineY }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="timeline-marker">
                <span className="timeline-num">{i * 10}</span>
                <div className="timeline-tick"></div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Scrolling Content - Asymmetrical Grid */}
      <div className="showcase-jason-content">
        {filteredProjects.map((project, index) => {
          // Asymmetrical layout logic: alternate left/right, random offsets
          const isLeft = index % 2 === 0;
          const alignClass = isLeft ? 'align-left' : 'align-right';
          const topOffset = `${(index + 1) * 35}vh`;

          // Different parallax speeds based on index
          const yRange = isLeft ? ['0%', '-100%'] : ['0%', '-150%'];

          return (
            <ProjectCard
              key={project.id}
              project={project}
              alignClass={alignClass}
              topOffset={topOffset}
              progress={smoothProgress}
              yRange={yRange}
            />
          );
        })}
        {/* Extra space at bottom to allow scrolling past last item */}
        <div style={{ height: '50vh', width: '100%' }}></div>
      </div>

      {/* Fixed Bottom Navigation / Filters */}
      <div className="showcase-jason-footer">
        <div className="footer-col left">
          <span className="copyright">© 2024 BEAT GURUS</span>
        </div>

        <div className="footer-col view-toggles">
          <button
            className={`view-btn ${viewMode === 'SLIDER' ? 'active' : ''}`}
            onClick={() => setViewMode('SLIDER')}
            data-cursor-hover
          >
            SLIDER
          </button>
          <span className="sep">/</span>
          <button
            className={`view-btn ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            data-cursor-hover
          >
            LIST
          </button>
        </div>

        <div className="footer-col filters">
          {categories.map((cat, i) => {
            // Count matching projects
            const count = cat === 'ALL' ? projects.length : projects.filter(p => p.category.toUpperCase() === cat).length;
            if (count === 0 && cat !== 'ALL') return null;

            return (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                data-cursor-hover
              >
                {activeFilter === cat && <span className="bullet">• </span>}
                {cat} <span className="count">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="footer-col right">
          <span className="active-duration">
            {filteredProjects.find(p => p.id === activeItem)?.duration || '00:00:00'}
          </span>
          <a href="#credits" className="credits-link" data-cursor-hover>CREDITS</a>
        </div>
      </div>
    </section>
  );
};

// Extracted Component for Individual Project Cards to handle their own localized parallax
const ProjectCard = ({ project, alignClass, topOffset, progress, yRange }) => {
  const y = useTransform(progress, [0, 1], yRange);

  return (
    <motion.div
      className={`jason-project-card ${alignClass}`}
      style={{ marginTop: topOffset, y }}
    >
      <div className="card-image-wrap" data-cursor-hover>
        <img src={project.img} alt={project.title} />
        <div className="card-overlay">
          <span className="card-year">{project.year}</span>
          <div className="play-icon">▶</div>
        </div>
      </div>
      <div className="card-info">
        <span className="card-cat">{project.category}</span>
        <h3 className="card-title">{project.title}</h3>
      </div>
    </motion.div>
  );
};

export default Showcase;
