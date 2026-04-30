import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export const services = [
  { title: 'Corporate Events', desc: 'High-energy performances for galas & launches. We craft custom rhythmic experiences that align with your corporate brand, leaving a lasting impression on stakeholders and employees alike.', tag: 'Events' },
  { title: 'Private Weddings', desc: 'Traditional rhythms meet modern groove. Elevate your special day with authentic acoustic energy that brings families together on the dance floor.', tag: 'Ceremonies' },
  { title: 'Music Festivals', desc: 'Main stage performances worldwide. Our massive stage presence and raw acoustic power are designed to captivate thousands and create unforgettable festival moments.', tag: 'Festivals' },
  { title: 'Drum Workshops', desc: 'Interactive hands-on percussion sessions. Perfect for schools, communities, and corporate retreats, teaching rhythm, listening, and collaborative harmony.', tag: 'Education' },
  { title: 'Team Building', desc: 'Corporate team bonding through rhythm & music. Break down barriers and foster unity as your team learns to play together as a cohesive rhythmic unit.', tag: 'Corporate' },
  { title: 'Gather & Groove', desc: 'Community drumming circles for all skill levels. A space for expression, connection, and pure joy through shared acoustic rhythms.', tag: 'Experience' },
];

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for the list items
  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="services-section" style={{ position: 'relative' }}>
        <div className="container" style={{ width: '100%' }}>
          <div className="services-grid" style={{ alignItems: 'start' }}>
            {/* Left Side: Sticky Header */}
            <div className="services-sticky-col" style={{}}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.7 }}
                className="services-header-wrap"
              >
                <h2 style={{ margin: 0 }}>
                  OUR <br />
                  <span style={{ color: 'var(--gold)' }}>OFFERINGS</span>
                </h2>
                <p className="services-intro-text">
                  We bring raw acoustic energy to every stage. No backing tracks, no synthesizers, just pure, driving rhythm tailored for your audience.
                </p>
              </motion.div>
            </div>

            {/* Right Side: Scrolling List */}
            <div className="services-list-col">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="service-list-item"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-120px' }}
                >
                  <div className="service-list-top">
                    <span className="service-list-num">0{i + 1}</span>
                    <span className="service-list-tag">{s.tag}</span>
                  </div>

                  <h3 className="service-list-title">{s.title}</h3>
                  <p className="service-list-desc">{s.desc}</p>

                  <a
                    href="#contact"
                    className="service-list-link"
                    onClick={(e) => {
                      if (typeof window === 'undefined') return;
                      // Only handle normal left-clicks without modifier keys.
                      if (
                        e.button !== 0 || // not a left-click
                        e.metaKey ||      // cmd-click
                        e.ctrlKey ||      // ctrl-click
                        e.shiftKey ||     // shift-click
                        e.altKey ||       // alt-click
                        e.defaultPrevented
                      ) {
                        return; // Let the browser handle modified / non-left clicks (e.g., open in new tab).
                      }

                      const newUrl = new URL(window.location);
                      newUrl.searchParams.set('event', s.title);
                      newUrl.hash = '#contact';
                      window.history.pushState({}, '', newUrl);
                      // Dispatch a custom event so Contact.jsx knows the URL changed without a reload
                      window.dispatchEvent(new Event('urlchange'));
                    }}
                  >
                    Discuss Project <FaArrowRight size={12} className="arrow-icon" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Services;
