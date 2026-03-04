import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="section bg-darker">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>Get In <span style={{ color: 'var(--earth-red)' }}>Touch</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)' }}></div>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{ color: 'var(--text-dark)' }}>Contact Information</h3>
            <p style={{ color: 'var(--text-grey)', fontSize: '1.2rem', marginBottom: '40px' }}>Ready to bring the rhythm to your next event?</p>
            <ul className="info-list">
              <li><strong style={{ color: 'var(--text-dark)' }}>Location:</strong> <span style={{ color: 'var(--text-dark)' }}>Jayanagar, Bangalore, India</span></li>
              <li><strong style={{ color: 'var(--text-dark)' }}>Email:</strong> <span style={{ color: 'var(--text-dark)' }}>bookings@beatgurus.org</span></li>
              <li><strong style={{ color: 'var(--text-dark)' }}>Phone:</strong> <span style={{ color: 'var(--text-dark)' }}>+91 98450 12345</span></li>
            </ul>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ background: 'var(--bg-sand-dark)', padding: '40px', border: '4px solid var(--text-dark)', boxShadow: '8px 8px 0px var(--text-dark)' }}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required style={{ color: 'var(--text-dark)', borderColor: 'var(--text-dark)' }} />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required style={{ color: 'var(--text-dark)', borderColor: 'var(--text-dark)' }} />
            </div>
            <div className="form-group">
              <select defaultValue="" style={{ color: 'var(--text-dark)', borderColor: 'var(--text-dark)', backgroundColor: 'transparent' }}>
                <option value="" disabled>Event Type</option>
                <option value="corporate">Corporate</option>
                <option value="wedding">Wedding</option>
                <option value="festival">Festival</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Message" required style={{ color: 'var(--text-dark)', borderColor: 'var(--text-dark)' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
