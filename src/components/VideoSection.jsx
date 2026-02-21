import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://www.youtube.com/embed/tYBuCn6IP9w?si=Sc-S7lS4N_E6qFj_"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '10px' }}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
