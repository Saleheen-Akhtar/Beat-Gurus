import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="section video-section">
      <div className="container">
        <div className="video-wrapper">
          <div className="video-text">
            <motion.h2
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              Feel the <span className="gold-text">Heat</span>
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the raw energy of Beat Gurus live. From intimate gatherings to massive festival stages, our rhythm connects souls and transcends borders.
            </motion.p>
            <motion.a
              href="https://www.youtube.com/results?search_query=beat+gurus+bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Watch Performance
            </motion.a>
          </div>

          <motion.div
            className="video-embed"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             {/* Placeholder for a real video. Using a static image with play button for performance/demo */}
             <div className="video-placeholder">
                <img src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Video Thumbnail" />
                <div className="play-btn">▶</div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
