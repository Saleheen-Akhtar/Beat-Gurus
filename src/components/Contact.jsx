import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // Add actual submission logic here
    alert("Inquiry submitted! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', eventType: '', date: '', location: '', message: '' });
  };

  return (
    <section id="contact" style={{
      padding: '150px 0 50px',
      background: 'var(--text-dark)', /* Continuing the dark theme from FAQ */
      color: 'var(--bg-sand)',
      borderTop: 'none',
      marginTop: '0'
    }}>
      <div className="container" style={{ maxWidth: '1400px' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', marginBottom: '100px' }}>

          {/* Left Column: Title & Text */}
          <motion.div
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              lineHeight: 0.9,
              color: 'var(--bg-sand)',
              textTransform: 'uppercase',
              marginBottom: '30px'
            }}>
              Let's Make<br/>
              <span style={{ color: 'var(--gold)' }}>Noise</span>
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontFamily: 'var(--font-main)',
              color: 'rgba(245, 241, 236, 0.7)',
              maxWidth: '500px',
              marginBottom: '40px',
              lineHeight: 1.6
            }}>
              Whether you're planning a massive festival or an intimate gala, we bring the raw acoustic energy. Fill out the form and our management will get back to you shortly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(245, 241, 236, 0.4)', marginBottom: '5px' }}>Email</span>
                <a href="mailto:bookings@beatgurus.org" style={{ fontSize: '1.2rem', color: 'var(--bg-sand)', textDecoration: 'underline' }}>bookings@beatgurus.org</a>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(245, 241, 236, 0.4)', marginBottom: '5px' }}>Phone</span>
                <a href="tel:+919876543210" style={{ fontSize: '1.2rem', color: 'var(--bg-sand)', textDecoration: 'underline' }}>+91 98765 43210</a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            style={{ flex: '1 1 500px' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="contact-input" />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="contact-input" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="contact-input" />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <select name="eventType" value={formData.eventType} onChange={handleChange} required className="contact-input" style={{ appearance: 'none' }}>
                    <option value="" disabled>Select Event Type</option>
                    <option value="Music Festival">Music Festival</option>
                    <option value="Corporate Gala">Corporate Gala</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="contact-input" />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Event Location/City" className="contact-input" />
                </div>
              </div>

              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your event..." rows="4" required className="contact-input" style={{ resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" style={{
                alignSelf: 'flex-start',
                background: 'var(--gold)',
                color: 'var(--text-dark)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                padding: '20px 50px',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = 'var(--bg-sand)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = 'var(--gold)'; }}
              >
                Send Inquiry
              </button>

            </form>
          </motion.div>
        </div>

        {/* Movie/Festival Credits Footer Layout */}
        <motion.div
          className="credits-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '60px',
            paddingTop: '60px',
            borderTop: '2px dashed rgba(245, 241, 236, 0.2)'
          }}
        >
          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>STARRING</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              <strong>The Founders</strong> - Ganesh Govindswamy.<br/><br/>
              <strong>The Tribe</strong> - Our fellow musicians, keeping the heartbeat alive on every stage.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>DIRECTED BY PASSION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              <strong>Produced By:</strong> Countless hours in practice rooms and on the road.<br/><br/>
              <strong>Soundtrack:</strong> Djembe, Didgeridoo, and Raw Indian Percussion.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>FILMED ON LOCATION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              In smoky clubs, sun-drenched festival grounds, and grand corporate galas across the globe.<br/><br/>
              <em>Based in Bangalore, India.</em>
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
              <a href="https://www.instagram.com/beatgurus/" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaInstagram size={16} />
              </a>
              <a href="https://www.facebook.com/beatgurus" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.youtube.com/results?search_query=beat+gurus+bangalore" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <div style={{
          marginTop: '100px',
          padding: '30px 0',
          borderTop: '1px solid rgba(245, 241, 236, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-main)',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: 'rgba(245, 241, 236, 0.5)'
        }}>
          <span>&copy; {new Date().getFullYear()} Beat Gurus. All Rights Reserved.</span>
          <span style={{ color: 'var(--gold)' }}>Raw Acoustic Energy</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
