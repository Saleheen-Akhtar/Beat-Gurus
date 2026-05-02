import React, { useMemo, useState, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { FINAL_MEDIA_LINK, showTypes } from '../data/showData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const sectionInView = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const ShowDetailPage = ({ slug }) => {
  const show = useMemo(() => showTypes.find((item) => item.slug === slug), [slug]);
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!show || prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // Split text for hero elements
      const heroTitle = new SplitType('.hero-title-anim', { types: 'chars,words' });
      const heroDesc = new SplitType('.hero-desc-anim', { types: 'lines' });

      // Hero Animation Timeline
      const tl = gsap.timeline();

      tl.fromTo(heroTitle.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: 'power4.out', delay: 0.2 }
      )
      .fromTo(heroDesc.lines,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );

      // Scroll triggered section headings
      const sectionHeadings = gsap.utils.toArray('.section-heading-anim');
      sectionHeadings.forEach((heading) => {
        const splitHeading = new SplitType(heading, { types: 'chars,words' });
        gsap.fromTo(splitHeading.chars,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Cleanup splits on revert
      return () => {
        heroTitle.revert();
        heroDesc.revert();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [show, prefersReducedMotion]);

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

  const contactUrl = `/?event=${encodeURIComponent(show.title)}#contact`;

  return (
    <main className="show-detail-page" id="main-content" ref={containerRef}>
      <section className="show-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(5,5,5,0.5), rgba(5,5,5,0.5)), url(${show.heroImage})` }}>
        <div className="container show-detail-hero-inner" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
          {/* Changed motion.h1 to h1 for GSAP animation */}
          <h1 className="hero-title-anim" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>{show.title}</h1>
          <p className="hero-desc-anim" style={{ fontSize: '1.25rem', maxWidth: '800px', marginBottom: '2rem' }}>{show.cardDescription}</p>

          <div className="show-detail-hero-cta">
            <a className="btn-dark" href={contactUrl}>Enquire for this show <FaArrowRight size={12} /></a>
            <a className="btn-outline" href={FINAL_MEDIA_LINK} target="_blank" rel="noreferrer noopener">Media Link <FaArrowRight size={12} /></a>
          </div>
        </div>
      </section>

      {/* New SEO / Full Description Section */}
      {show.fullDescription && (
        <section className="show-detail-seo-section" style={{ padding: '4rem 0', backgroundColor: 'var(--bg-sand)' }}>
          <div className="container">
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--foreground)' }}>
                {show.fullDescription}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="show-detail-meta-section">
        <div className="container show-detail-meta-grid">
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Duration</span><strong>{show.duration}</strong></motion.div>
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Ideal For</span><strong>{show.idealFor}</strong></motion.div>
          <motion.div {...sectionInView} className="show-detail-meta-card"><span>Format</span><strong>Live immersive performance</strong></motion.div>
        </div>
      </section>

      <section className="show-detail-section">
        <div className="container">
          <h2 className="section-heading-anim" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>Highlights</h2>
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
          <h2 className="section-heading-anim" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>Media / Gallery</h2>
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
          <h2 className="section-heading-anim" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>FAQs</h2>
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
          <a href={contactUrl} className="btn-dark">Send Enquiry <FaArrowRight size={12} /></a>
        </div>
      </section>
    </main>
  );
};

export default ShowDetailPage;
