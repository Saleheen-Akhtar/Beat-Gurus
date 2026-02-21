import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-dark-maroon)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Get in <span className="gold-text">Touch</span></h2>
          <p>For bookings, collaborations, and press inquiries.</p>
        </motion.div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              type="text"
              placeholder="Name"
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,0,0,0.5)', color: '#fff' }}
            />
            <input
              type="email"
              placeholder="Email"
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,0,0,0.5)', color: '#fff' }}
            />
            <textarea
              rows="5"
              placeholder="Message"
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,0,0,0.5)', color: '#fff' }}
            ></textarea>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'center', cursor: 'pointer' }}>
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
