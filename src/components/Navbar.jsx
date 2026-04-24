import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Instruments', href: '#instruments' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 80) {
        setVisible(true);
      } else {
        setVisible(y < lastY.current);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        animate={{ y: visible ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform' }}
      >
        <div className="container nav-container">
          <a href="#home" className="logo">BEAT<span>GURUS</span></a>

          <div className="nav-right">
            <ul className="nav-links-list">
              {navItems.map(n => (
                <li key={n.label}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
            <motion.button
              className="menu-btn lg:hidden"
              onClick={() => setIsOpen(true)}
              whileTap={{ scale: 0.95 }}
            >
              <FaBars size={13} />
              <span>Menu</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container menu-header">
              <a href="#home" className="logo-light" onClick={close}>BEAT<span style={{ color: 'var(--gold)' }}>GURUS</span></a>
              <button className="close-btn" onClick={close}>
                <FaTimes size={14} />
              </button>
            </div>

            <div className="menu-body container">
              <nav className="menu-nav-list">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="menu-nav-item"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  >
                    <span className="menu-nav-num">0{i + 1}</span>
                    <a href={item.href} onClick={close}>{item.label}</a>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="container menu-footer-bar">
              <span className="menu-footer-loc">Bangalore, India</span>
              <a href="mailto:bookings@beatgurus.org" className="menu-footer-email">bookings@beatgurus.org</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
