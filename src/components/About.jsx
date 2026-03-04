import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Who We <span style={{ color: 'var(--earth-red)' }}>Are</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)' }}></div>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h3 style={{ borderBottom: '2px solid var(--text-dark)', paddingBottom: '10px', display: 'inline-block' }}>The Beat Gurus Legacy</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-grey)', marginTop: '20px' }}>Based in Bangalore, <strong style={{ color: 'var(--text-dark)' }}>Beat Gurus</strong> stands as a testament to the vibrant music scene of the city. Founded by <strong style={{ color: 'var(--text-dark)' }}>Ganesh Govindswamy</strong> and <strong style={{ color: 'var(--text-dark)' }}>Prashanth Muralidhar</strong>, this dynamic band finds its rhythm through the captivating sounds of the <em>Djembe</em>, a traditional hand drum originating from West Africa.</p>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-grey)' }}>Our passion for music transcends boundaries, leading us to grace prestigious international stages such as the <strong style={{ color: 'var(--text-dark)' }}>BBC World Travel Awards</strong> and the <strong style={{ color: 'var(--text-dark)' }}>International Cultural Evening in Norway</strong>. Emanating from the cultural melting pot of Bangalore, Beat Gurus is a force to be reckoned with.</p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            style={{
              background: 'var(--bg-sand-dark)',
              padding: '40px',
              borderRadius: '8px',
              border: '2px solid var(--text-dark)',
              boxShadow: '8px 8px 0px var(--text-dark)'
            }}
          >
            <div className="stat-box" style={{ borderTop: 'none', padding: 0, borderBottom: '2px solid var(--text-dark)', paddingBottom: '20px' }}>
              <span className="number">20+</span>
              <span className="label" style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}>Years Active</span>
            </div>
            <div className="stat-box" style={{ borderTop: 'none', padding: 0, borderBottom: '2px solid var(--text-dark)', paddingBottom: '20px' }}>
              <span className="number">25+</span>
              <span className="label" style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}>Countries</span>
            </div>
            <div className="stat-box" style={{ borderTop: 'none', padding: 0 }}>
              <span className="number">1000+</span>
              <span className="label" style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}>Shows</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
