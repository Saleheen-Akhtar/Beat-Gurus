import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { services } from './Services';
import { FaInstagram, FaFacebookF, FaYoutube, FaGoogle } from 'react-icons/fa';

const validEventTitlesSet = new Set(services.map(s => s.title));
validEventTitlesSet.add('Other');

const Contact = () => {
  const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    message: '',
    website: ''
  });

  useEffect(() => {
    const parseEventParam = () => {
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get('event');

      setFormData(prev => ({
        ...prev,
        eventType: (eventParam && validEventTitlesSet.has(eventParam)) ? eventParam : ''
      }));
    };

    // Run on initial mount
    parseEventParam();

    // Listen for custom urlchange event from Services section click
    window.addEventListener('urlchange', parseEventParam);
    // Also listen for browser history navigations (back/forward)
    window.addEventListener('popstate', parseEventParam);

    return () => {
      window.removeEventListener('urlchange', parseEventParam);
      window.removeEventListener('popstate', parseEventParam);
    };
  }, []);
  const [submitState, setSubmitState] = useState({ loading: false, message: '', error: false });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email' && emailError) {
      setEmailError('');
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState({ loading: true, message: '', error: false });

    // Honeypot check
    if (formData.website) {
       setSubmitState({ loading: false, error: true, message: "Spam detected." });
       return;
    }

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

      const payload = {
        access_key: accessKey,
        subject: `Booking Inquiry: ${formData.eventType || 'General'} - ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone || 'N/A',
        eventType: formData.eventType || 'N/A',
        date: formData.date || 'N/A',
        location: formData.location || 'N/A',
        message: formData.message,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (res.status === 200) {
        setSubmitState({
          loading: false,
          error: false,
          message: "Thank you! Your inquiry has been sent successfully."
        });
        setFormData({ name: '', email: '', phone: '', eventType: '', date: '', location: '', message: '', website: '' });
      } else {
        setSubmitState({
          loading: false,
          error: true,
          message: json.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setSubmitState({
        loading: false,
        error: true,
        message: "Network error. Please try again later."
      });
    }
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
                <a href="mailto:bookings@beatgurus.org" style={{ fontSize: '1.2rem', color: 'var(--bg-sand)', textDecoration: 'none' }}>bookings@beatgurus.org</a>
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
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => {
                      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                      setEmailError(e.target.value && !valid ? 'Please enter a valid email address.' : '');
                    }}
                    placeholder="Email Address"
                    required
                    className="contact-input"
                  />
                  {emailError && (
                    <p style={{ marginTop: '10px', color: '#ef4444', fontSize: '0.9rem' }}>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="contact-input" />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <select name="eventType" value={formData.eventType} onChange={handleChange} required className="contact-input" style={{ appearance: 'none' }}>
                    <option value="" disabled>Select Event Type</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
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
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              />

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
                cursor: 'inherit',
                transition: 'transform 0.3s ease, background 0.3s ease'
              }}
              disabled={submitState.loading}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'var(--bg-sand)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'var(--gold)'; }}
              >
                {submitState.loading ? 'Sending...' : 'Send Inquiry'}
              </button>
              {submitState.message && (
                <p
                  role={submitState.error ? 'alert' : 'status'}
                  style={{
                    marginTop: '12px',
                    color: submitState.error ? '#ffb4b4' : 'var(--bg-sand)',
                    fontSize: '1rem'
                  }}
                >
                  {submitState.message}
                </p>
              )}

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
              <a href="https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaInstagram size={16} />
              </a>
              <a href="https://www.facebook.com/share/1G8v4BVcoJ/" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaFacebookF size={16} />
              </a>
              <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaYoutube size={16} />
              </a>
              <a href="https://maps.app.goo.gl/U3CVeMZm7xq5gdw96" target="_blank" rel="noreferrer" aria-label="Google Review" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid rgba(245, 241, 236, 0.5)', color: 'var(--bg-sand)', transition: 'all 0.3s ease' }}>
                <FaGoogle size={16} />
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
          <span>&copy; {new Date().getFullYear()} <span className="font-brand-name">Beat Gurus</span>. All Rights Reserved.</span>
          <span style={{ color: 'var(--gold)' }}>Raw Acoustic Energy</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
