import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">
          BEAT <span className="gold-text">GURUS</span>
        </a>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {['Home', 'About', 'Services', 'Gallery', 'Instruments'].map((item, index) => (
             <a
               key={index}
               href={`#${item.toLowerCase()}`}
               onClick={() => setIsOpen(false)}
             >
               {item}
             </a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setIsOpen(false)}>Book Now</a>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
