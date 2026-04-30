import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaYoutube, FaGoogle } from 'react-icons/fa';

const links = [
  {
    name: 'YouTube',
    url: 'https://m.youtube.com/@BeatGurus',
    icon: <FaYoutube size={24} />,
    desc: 'Watch our live performances'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94',
    icon: <FaInstagram size={24} />,
    desc: 'Follow our journey'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1G8v4BVcoJ/',
    icon: <FaFacebookF size={24} />,
    desc: 'Join our community'
  },
  {
    name: 'Google Review',
    url: 'https://maps.app.goo.gl/U3CVeMZm7xq5gdw96',
    icon: <FaGoogle size={24} />,
    desc: 'Tell us how you felt being part of the family'
  }
];

const QrCodePage = () => {
  useEffect(() => {
    document.title = "Connect | Beat Gurus";
    document.body.style.backgroundColor = "var(--text-dark)";
    return () => {
      document.body.style.backgroundColor = "var(--bg-sand)";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--text-dark)', color: 'var(--bg-sand)' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[var(--gold)] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--earth-red)] blur-[120px]" />
      </div>

      <motion.div
        className="w-full max-w-md z-10 flex flex-col items-center mt-12 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Profile Image/Logo Placeholder */}
        <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--gold), #A67C1E)', padding: '4px' }}>
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--text-dark)' }}>
                 <span className="font-brand-name text-3xl" style={{ color: 'var(--gold)' }}>BG</span>
            </div>
        </div>

        <h1 className="font-brand-name text-4xl mb-2 text-center" style={{ color: 'var(--bg-sand)' }}>Beat Gurus</h1>
        <p className="text-center mb-10 opacity-80" style={{ fontFamily: 'var(--font-main)' }}>Pure acoustic percussion.<br/>Born in Bangalore, Heard Worldwide.</p>

        <div className="w-full space-y-4">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden"
              style={{
                backgroundColor: 'rgba(245, 241, 236, 0.05)',
                border: '1px solid rgba(212, 167, 44, 0.2)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 167, 44, 0.1)', borderColor: 'rgba(212, 167, 44, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(212, 167, 44, 0.15)', color: 'var(--gold)' }}>
                {link.icon}
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-bold" style={{ color: 'var(--bg-sand)' }}>{link.name}</h2>
                <p className="text-sm opacity-70" style={{ fontFamily: 'var(--font-main)' }}>{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QrCodePage;
