import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} BEAT GURUS. RHYTHM OF THE EARTH.</p>
      </div>
    </footer>
  );
};

export default Footer;
