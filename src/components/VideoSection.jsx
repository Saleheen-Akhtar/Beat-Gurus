import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
  <section className="video-section">
    <div className="container">
      <div className="video-grid">

        {/* Text column */}
        <motion.div
          className="video-text-col"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-eyebrow">04 Watch Live</p>
          <h2>Feel the <span style={{ color: 'var(--gold)' }}>Pulse</span></h2>
          <p>
            Watch the magic unfold live. From intimate gatherings to massive festival stages,
            our rhythm connects souls across every culture and continent.
          </p>
          <motion.a
            href="https://www.youtube.com/results?search_query=beat+gurus+bangalore"
            target="_blank"
            rel="noreferrer"
            className="btn-dark"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaYoutube size={16} /> Watch More on YouTube
          </motion.a>
        </motion.div>

        {/* Video embed column */}
        <motion.div
          className="video-embed-col"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {playing ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dBz3WugMS0A?autoplay=1&rel=0"
              title="Beat Gurus Live Performance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1600&auto=format&fit=crop"
                alt="Beat Gurus live djembe performance on stage"
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                className="play-btn-wrap"
                onClick={() => setPlaying(true)}
                aria-label="Play Beat Gurus live performance video"
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >
                <motion.div
                  className="play-circle"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  &#9654;
                </motion.div>
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default VideoSection;
