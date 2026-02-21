import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="section bg-darker">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In <span className="gold-text">Touch</span></h2>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Book the Beats</h3>
            <p>Ready to ignite your event with the primal energy of Beat Gurus?</p>
            <ul className="info-list">
              <li>
                <strong><FaMapMarkerAlt /></strong>
                <span>Bangalore, India</span>
              </li>
              <li>
                <strong><FaEnvelope /></strong>
                <span>contact@beatgurus.org</span>
              </li>
              <li>
                <strong><FaPhone /></strong>
                <span>+91 98450 12345</span>
              </li>
            </ul>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <select>
                <option>Event Type</option>
                <option>Corporate Gala</option>
                <option>Wedding / Private</option>
                <option>Music Festival</option>
                <option>International Tour</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Tell us about your event..." required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
