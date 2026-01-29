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
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              Feel the <span className="gold-text">Pulse</span>
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              Watch the magic unfold live. From intimate gatherings to massive festival stages, our rhythm connects souls.
            </motion.p>
            <motion.a
              href="https://www.youtube.com/results?search_query=beat+gurus+bangalore"
              target="_blank"
              className="btn-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Watch More on YouTube
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

      <style jsx>{`
        .video-section {
          background: linear-gradient(to right, #000, #0a0a0a);
          overflow: hidden;
        }
        .video-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: center;
        }
        .video-text h2 {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }
        .video-text p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .video-embed {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .video-placeholder {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          cursor: pointer;
        }
        .video-placeholder img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .video-placeholder:hover img {
          transform: scale(1.05);
        }
        .play-btn {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80px; height: 80px;
          background: rgba(255, 193, 7, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: black;
          box-shadow: 0 0 30px rgba(255, 193, 7, 0.5);
          transition: all 0.3s ease;
        }
        .video-placeholder:hover .play-btn {
          transform: translate(-50%, -50%) scale(1.2);
          background: white;
        }
        @media(max-width: 900px) {
          .video-wrapper { grid-template-columns: 1fr; text-align: center; }
          .video-text { order: 2; }
          .video-embed { order: 1; margin-bottom: 30px; }
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
