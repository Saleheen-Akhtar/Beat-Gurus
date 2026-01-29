import React from 'react';
import { motion } from 'framer-motion';

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
          <h2>Get In <span className="gold">Touch</span></h2>
          <div className="line"></div>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <p>Ready to bring the rhythm to your next event?</p>
            <ul className="info-list">
              <li><strong>Location:</strong> Jayanagar, Bangalore, India</li>
              <li><strong>Email:</strong> bookings@beatgurus.org</li>
              <li><strong>Phone:</strong> +91 98450 12345</li>
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
                <option>Corporate</option>
                <option>Wedding</option>
                <option>Festival</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Message" required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
