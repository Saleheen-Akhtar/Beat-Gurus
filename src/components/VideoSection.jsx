import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="section bg-black video-section">
      <div className="container">
        <div className="video-wrapper">
          <div className="video-text">
            <motion.h2
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
               style={{ color: 'var(--text-dark)' }}
            >
              Feel the <span style={{ color: 'var(--earth-red)' }}>Pulse</span>
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               style={{ color: 'var(--text-grey)', fontSize: '1.2rem' }}
            >
              Watch the magic unfold live. From intimate gatherings to massive festival stages, our rhythm connects souls.
            </motion.p>
            <motion.a
              href="https://www.youtube.com/results?search_query=beat+gurus+bangalore"
              target="_blank"
              className="btn-primary"
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch More on YouTube
            </motion.a>
          </div>

          <motion.div
            className="video-embed"
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            style={{ borderRadius: '0', boxShadow: '12px 12px 0px var(--text-dark)' }}
          >
             {/* Placeholder for a real video. Using a static image with play button for performance/demo */}
             <div className="video-placeholder" style={{ borderRadius: '0' }}>
                <img src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Video Thumbnail" style={{ filter: 'sepia(40%) contrast(1.2)' }} />
                <div className="play-btn">▶</div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
