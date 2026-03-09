import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaYoutube, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" style={{
      padding: '150px 0 50px',
      background: 'transparent',
      borderTop: '4px solid var(--text-dark)',
      marginTop: '100px'
    }}>
      <div className="container" style={{ maxWidth: '1400px' }}>

        {/* Huge Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '80px' }}
        >
          <h2 style={{
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            lineHeight: 0.9,
            color: 'var(--text-dark)',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Connect With<br/>
            <span style={{ color: 'var(--gold)' }}>Beat Gurus</span>
          </h2>
          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            fontFamily: 'var(--font-main)',
            color: 'var(--text-dark)',
            maxWidth: '600px',
            marginBottom: '60px'
          }}>
            Let's connect—whether you're planning a massive festival or an intimate gala, we bring the raw acoustic energy.
          </p>
        </motion.div>

        {/* Big Links Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '150px' }}>
          {[
            { title: "Let's Make Music Together", email: "bookings@beatgurus.org" },
            { title: "Contact", email: "info@beatgurus.org" },
            { title: "Booking", email: "management@beatgurus.org" }
          ].map((item, index) => (
            <motion.a
              href={`mailto:${item.email}`}
              key={index}
              className="big-link-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '40px 0',
                borderBottom: '2px solid var(--text-dark)',
                textDecoration: 'none',
                color: 'var(--text-dark)',
                cursor: 'pointer'
              }}
            >
              <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', margin: 0, transition: 'color 0.3s ease' }}>
                {item.title}
              </h3>
              <span className="email-span" style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textDecoration: 'underline',
                transition: 'color 0.3s ease'
              }}>
                {item.email}
              </span>
            </motion.a>
          ))}
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
            borderTop: '2px dashed var(--text-dark)'
          }}
        >
          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>STARRING</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
              <strong>The Founders</strong> - Ganesh Govindswamy.<br/><br/>
              <strong>The Tribe</strong> - Our fellow musicians, keeping the heartbeat alive on every stage.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>DIRECTED BY PASSION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
              <strong>Produced By:</strong> Countless hours in practice rooms and on the road.<br/><br/>
              <strong>Soundtrack:</strong> Djembe, Didgeridoo, and Raw Indian Percussion.
            </p>
          </div>

          <div className="credit-block">
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '15px' }}>FILMED ON LOCATION</h4>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
              In smoky clubs, sun-drenched festival grounds, and grand corporate galas across the globe.<br/><br/>
              <em>Based in Bangalore, India.</em>
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
              <a href="https://www.instagram.com/beatgurus/" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid var(--text-dark)', color: 'var(--text-dark)', transition: 'all 0.3s ease' }}>
                <FaInstagram size={16} />
              </a>
              <a href="https://www.facebook.com/beatgurus" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid var(--text-dark)', color: 'var(--text-dark)', transition: 'all 0.3s ease' }}>
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.youtube.com/results?search_query=beat+gurus+bangalore" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid var(--text-dark)', color: 'var(--text-dark)', transition: 'all 0.3s ease' }}>
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <div style={{
          marginTop: '100px',
          padding: '30px 0',
          borderTop: '1px solid var(--text-dark)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-main)',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: 'var(--text-dark)'
        }}>
          <span>&copy; {new Date().getFullYear()} Beat Gurus. All Rights Reserved.</span>
          <span style={{ color: 'var(--gold)' }}>Raw Acoustic Energy</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
