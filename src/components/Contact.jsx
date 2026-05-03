import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { services } from './Services';
import { showTypes } from '../data/showData';
import { FaInstagram, FaFacebookF, FaYoutube, FaGoogle } from 'react-icons/fa';

const showTitles = showTypes.map((show) => show.title);
const validEventTitlesSet = new Set([...services.map((s) => s.title), ...showTitles]);
validEventTitlesSet.add('Other');
const SUBMIT_COOLDOWN_MS = 30000;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = ({ navigate }) => {
  const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
  const lastSubmitRef = useRef(0);
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
  const [submitState, setSubmitState] = useState({ loading: false, message: '', error: false, field: '' });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email' && emailError) {
      setEmailError('');
    }
    if (!submitState.loading && submitState.error && submitState.field === e.target.name) {
      setSubmitState({ loading: false, message: '', error: false, field: '' });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitState.loading) return;

    // Honeypot check
    if (formData.website) {
       setSubmitState({ loading: false, error: true, message: "Spam detected.", field: '' });
       return;
    }

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      eventType: formData.eventType.trim(),
      date: formData.date.trim(),
      location: formData.location.trim(),
      message: formData.message.trim(),
      website: formData.website.trim()
    };

    if (!trimmed.name) {
      setSubmitState({ loading: false, error: true, message: 'Please enter your name.', field: 'name' });
      return;
    }
    if (!trimmed.email) {
      setSubmitState({ loading: false, error: true, message: 'Please enter your email address.', field: 'email' });
      return;
    }
    if (!EMAIL_REGEX.test(trimmed.email)) {
      setEmailError('Please enter a valid email address.');
      setSubmitState({ loading: false, error: true, message: 'Please enter a valid email address.', field: 'email' });
      return;
    }
    if (!trimmed.eventType || !validEventTitlesSet.has(trimmed.eventType)) {
      setSubmitState({ loading: false, error: true, message: 'Please select a valid event type.', field: 'eventType' });
      return;
    }
    if (!trimmed.message) {
      setSubmitState({ loading: false, error: true, message: 'Please tell us about your event.', field: 'message' });
      return;
    }
    if (trimmed.message.length > MAX_MESSAGE_LENGTH) {
      setSubmitState({ loading: false, error: true, message: 'Message is too long. Please keep it under 5000 characters.', field: 'message' });
      return;
    }

    // Client-side cooldown is for UX only; server enforces real rate limits.
    const now = Date.now();
    const elapsedMs = now - lastSubmitRef.current;
    if (elapsedMs < SUBMIT_COOLDOWN_MS) {
      const secondsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - elapsedMs) / 1000);
      setSubmitState({ loading: false, error: true, message: `Please wait ${secondsLeft}s before sending another enquiry.`, field: '' });
      return;
    }

    setSubmitState({ loading: true, message: '', error: false, field: '' });
    lastSubmitRef.current = now;

    try {
      const payload = {
        name: trimmed.name,
        email: trimmed.email,
        phone: trimmed.phone || 'N/A',
        eventType: trimmed.eventType,
        date: trimmed.date || 'N/A',
        location: trimmed.location || 'N/A',
        message: trimmed.message,
        submittedAt: new Date().toISOString()
      };

      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let json = null;
      try {
        json = await res.json();
      } catch (error) {
        json = null;
      }

      if (res.ok && (!json || json.success !== false)) {
        setSubmitState({
          loading: false,
          error: false,
          message: "Thank you! Your enquiry has been sent successfully.",
          field: ''
        });
        setFormData({ name: '', email: '', phone: '', eventType: '', date: '', location: '', message: '', website: '' });
      } else {
        setSubmitState({
          loading: false,
          error: true,
          message: (json && json.message) || "Something went wrong. Please try again.",
          field: ''
        });
      }
    } catch (error) {
      setSubmitState({
        loading: false,
        error: true,
        message: "Network error. Please try again later.",
        field: ''
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
                      const valid = EMAIL_REGEX.test(e.target.value);
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
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    style={{
                      appearance: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--bg-sand)',
                      borderColor: 'rgba(245, 241, 236, 0.3)'
                    }}
                  >
                    <option value="" disabled>Select Event Type</option>
                    {showTitles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <input type="text" name="date" placeholder="DD/MM/YYYY" value={formData.date} onChange={handleChange} className="contact-input" />
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
                fontFamily: 'var(--font-main)',
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
                {submitState.loading ? 'Submitting...' : 'Submit Enquiry'}
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
            <h4 style={{ fontFamily: 'var(--font-main)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>STARRING</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              <strong>The Founder</strong> - Ganesh Govindswamy.<br/><br/>
              <strong>The Tribe</strong> - Our fellow musicians, keeping the heartbeat alive on every stage.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-main)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>DIRECTED BY PASSION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              <strong>Produced By:</strong> Countless hours in practice rooms and on the road.<br/><br/>
              <strong>Soundtrack:</strong> Djembe, Didgeridoo, and Raw Indian Percussion.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-main)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>FILMED ON LOCATION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'rgba(245, 241, 236, 0.7)', lineHeight: 1.6 }}>
              In smoky clubs, sun-drenched festival grounds, and grand corporate galas across the globe.<br/><br/>
              <em>Based in Bangalore, India.</em>
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
              <a href="https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-link instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.facebook.com/share/1G8v4BVcoJ/" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-link facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social-link youtube">
                <FaYoutube size={16} />
              </a>
              <a href="https://maps.app.goo.gl/U3CVeMZm7xq5gdw96" target="_blank" rel="noreferrer" aria-label="Google Review" className="footer-social-link google">
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

          <div className="legal-links" style={{ display: 'flex', gap: '20px' }}>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} className="footer-legal-link">Privacy Policy</a>
            <a href="/terms-of-use" onClick={(e) => { e.preventDefault(); navigate('/terms-of-use'); }} className="footer-legal-link">Terms of Use</a>
            <a href="/disclaimer" onClick={(e) => { e.preventDefault(); navigate('/disclaimer'); }} className="footer-legal-link">Disclaimer</a>
          </div>
          <span style={{ color: 'var(--gold)' }}>Raw Acoustic Energy</span>

        </div>

      </div>
    </section>
  );
};

export default Contact;
