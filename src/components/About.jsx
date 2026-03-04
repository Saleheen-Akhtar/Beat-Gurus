import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container" style={{ position: 'relative' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
          >
            <span className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '-10px' }}>01.</span>
            <h2 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--text-dark)' }}>OUR <span style={{ color: 'var(--earth-red)' }}>LEGACY</span></h2>
          </motion.div>

          <div className="about-grid" style={{ gridTemplateColumns: '1.2fr 1fr', alignItems: 'start' }}>
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Born in Bangalore,<br/>Heard Worldwide.</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-grey)', marginBottom: '20px' }}>Founded by <strong style={{ color: 'var(--text-dark)' }}>Ganesh Govindswamy</strong> and <strong style={{ color: 'var(--text-dark)' }}>Prashanth Muralidhar</strong>, this dynamic band finds its rhythm through the captivating sounds of the <em>Djembe</em>, a traditional hand drum originating from West Africa.</p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-grey)' }}>Our passion for music transcends boundaries, leading us to grace prestigious international stages such as the <strong style={{ color: 'var(--text-dark)' }}>BBC World Travel Awards</strong> and the <strong style={{ color: 'var(--text-dark)' }}>International Cultural Evening in Norway</strong>.</p>
            </motion.div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
            >
              <div className="stat-box" style={{ borderTop: 'none', padding: 0 }}>
                <span className="accent-text" style={{ fontSize: '1.5rem', transform: 'rotate(-2deg)' }}>performing for</span>
                <span className="number" style={{ fontSize: '6rem', lineHeight: 1 }}>20+</span>
                <span className="label" style={{ color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.2rem' }}>YEARS</span>
              </div>
              <div className="stat-box" style={{ borderTop: 'none', padding: 0 }}>
                 <span className="accent-text" style={{ fontSize: '1.5rem', transform: 'rotate(2deg)' }}>across</span>
                <span className="number" style={{ fontSize: '6rem', lineHeight: 1, color: 'var(--gold)' }}>25+</span>
                <span className="label" style={{ color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.2rem' }}>COUNTRIES</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
