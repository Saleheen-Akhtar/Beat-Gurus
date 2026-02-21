import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section" style={{ padding: '4rem 0', background: 'var(--bg-deep)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <a href="#" className="logo" style={{ marginBottom: '2rem', display: 'inline-block' }}>BEAT<span className="gold-text">GURUS</span></a>

        <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', fontSize: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--text-muted)' }}><FaInstagram /></a>
          <a href="#" style={{ color: 'var(--text-muted)' }}><FaFacebook /></a>
          <a href="#" style={{ color: 'var(--text-muted)' }}><FaYoutube /></a>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Beat Gurus. All Rights Reserved.
          <br />
          Bangalore, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
