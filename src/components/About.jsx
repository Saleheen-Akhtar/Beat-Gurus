import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Who We <span className="gold-text">Are</span></h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>The Beat Gurus Legacy</h3>
            <p>
              Based in Bangalore, <strong>Beat Gurus</strong> stands as a testament to the vibrant music scene of the city.
              Founded by <strong className="gold-text">Ganesh Govindswamy</strong> and <strong className="gold-text">Prashanth Muralidhar</strong>,
              this dynamic band finds its rhythm through the captivating sounds of the <em>Djembe</em>, a traditional hand drum originating from West Africa.
            </p>
            <br />
            <p>
              Our passion for music transcends boundaries, leading us to grace prestigious international stages such as the
              <strong> BBC World Travel Awards</strong> and the <strong>International Cultural Evening in Norway</strong>.
              Emanating from the cultural melting pot of Bangalore, Beat Gurus is a force to be reckoned with.
            </p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="stat-box">
              <span className="number">20+</span>
              <span className="label">Years Active</span>
            </div>
            <div className="stat-box">
              <span className="number">25+</span>
              <span className="label">Countries</span>
            </div>
            <div className="stat-box">
              <span className="number">1000+</span>
              <span className="label">Shows</span>
            </div>
            <div className="stat-box">
              <span className="number">∞</span>
              <span className="label">Energy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
