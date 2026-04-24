import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { FINAL_MEDIA_LINK, showTypes } from '../data/showData';

const sectionInView = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const ShowDetailPage = ({ slug }) => {
  const show = useMemo(() => showTypes.find((item) => item.slug === slug), [slug]);
  const [openFaq, setOpenFaq] = useState(0);

  if (!show) {
    return (
      <section className="show-detail-page">
        <div className="container show-detail-empty">
          <h1>Show not found</h1>
          <p>We could not find this show format. Please return to the home page and choose a listed show.</p>
          <a className="btn-dark" href="/">Go Home</a>
        </div>
      </section>
    );
  }

  return (
    <main className="show-detail-page" id="main-content">
      <section className="show-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(5,5,5,0.5), rgba(5,5,5,0.5)), url(${show.heroImage})` }}>
        <div className="container show-detail-hero-inner">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-eyebrow">Show Format</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{show.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{show.cardDescription}</motion.p>
          <div className="show-detail-hero-cta">
            <a className="btn-dark" href="#contact">Enquire for this show <FaArrowRight size={12} /></a>
            <a className="btn-outline" href={FINAL_MEDIA_LINK} target="_blank" rel="noreferrer noopener">Media Link <FaArrowRight size={12} /></a>
          </div>
        </div>
      </section>

      <section className="show-detail-meta-section">
        <div className="container show-detail-meta-grid">
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Duration</span><strong>{show.duration}</strong></motion.div>
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Ideal For</span><strong>{show.idealFor}</strong></motion.div>
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Format</span><strong>Live immersive performance</strong></motion.div>
        </div>
      </section>

      <section className="show-detail-section">
        <div className="container">
          <motion.h2 {...sectionInView}>Animated Highlights</motion.h2>
          <div className="show-highlight-grid">
            {show.highlights.map((highlight, index) => (
              <motion.article key={highlight} className="show-highlight-card" initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <span>0{index + 1}</span>
                <p>{highlight}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="show-detail-section show-media-section">
        <div className="container">
          <motion.h2 {...sectionInView}>Media / Gallery</motion.h2>
          <div className="show-gallery-grid">
            {show.gallery.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt={`${show.title} gallery ${index + 1}`}
                loading="lazy"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="show-detail-section">
        <div className="container">
          <motion.h2 {...sectionInView}>FAQs</motion.h2>
          <div className="show-faq-list">
            {show.faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={item.question} className={`show-faq-item${isOpen ? ' open' : ''}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : idx)} aria-expanded={isOpen}>
                    <span>{item.question}</span>
                    <FaChevronDown />
                  </button>
                  <motion.div className="show-faq-answer" initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.25 }}>
                    <p>{item.answer}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="show-detail-cta-strip">
        <div className="container">
          <h3>Ready to book {show.title}?</h3>
          <p>Share your event date, venue, and audience size. We will propose the best lineup and flow.</p>
          <a href="mailto:bookings@beatgurus.org" className="btn-dark">Send Enquiry <FaArrowRight size={12} /></a>
        </div>
      </section>
    </main>
  );
};

export default ShowDetailPage;
