import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaYoutube, FaFacebookF, FaInstagram, FaGlobe, FaGoogle } from 'react-icons/fa';

const qrCodeImg = '/images/qr-code.png';

const socialLinks = [
  { name: 'YouTube', url: 'https://m.youtube.com/@BeatGurus', icon: <FaYoutube size={24} /> },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1G8v4BVcoJ/', icon: <FaFacebookF size={24} /> },
  { name: 'Instagram', url: 'https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94', icon: <FaInstagram size={24} /> },
  { name: 'Website', url: 'https://www.beatgurus.org/', icon: <FaGlobe size={24} /> },
  { name: 'Google Reviews', url: 'https://maps.app.goo.gl/U3CVeMZm7xq5gdw96', icon: <FaGoogle size={24} /> }
];

const QrCodePage = () => {
  useEffect(() => {
    document.title = "Campaign | Beat Gurus";
    document.body.style.backgroundColor = "#0B0B0B";
    return () => {
      document.body.style.backgroundColor = "var(--bg-sand)";
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const glitchHover = {
    hover: {
      x: [0, -2, 2, -2, 0],
      y: [0, 1, -1, 1, 0],
      rotate: [0, -1, 1, 0],
      transition: { duration: 0.2, repeat: Infinity, repeatType: 'mirror' }
    }
  };

  return (
    <div className="gritty-campaign-page relative min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#E8E1D9' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
        .gritty-campaign-page {
          font-family: 'Oswald', sans-serif;
          overflow-x: hidden;
        }
        .font-omega {
          font-family: 'Omega Ruby', 'Outfit', sans-serif;
        }
        .noise-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.12;
          background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)" opacity="0.4"/%3E%3C/svg%3E');
        }
        .text-flicker {
          animation: flicker 3s infinite alternate;
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        .street-tag {
          border: 2px solid #E8E1D9;
          box-shadow: 4px 4px 0px #B30000;
          background: #111;
        }
        .street-tag:hover {
          background: #B30000;
          color: #0B0B0B;
          box-shadow: 6px 6px 0px #C89B3C;
        }
      `}</style>
      <div className="noise-overlay"></div>

      {/* Section 1: Hero */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0B0B0B]">
        <motion.div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop')",
            y: yHero,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-100"></div>

        <div className="relative z-10 text-center px-4 pt-20">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-omega text-7xl md:text-[10rem] leading-none text-[#E8E1D9] mb-4 drop-shadow-[4px_4px_0_#B30000]"
          >
            BEATGURUS
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-flicker text-xl md:text-3xl tracking-widest text-[#C89B3C] font-bold"
          >
            LIVE. ACOUSTIC. POWERFUL. WORLDWIDE.
          </motion.p>
        </div>
      </section>

      {/* Section 2: The Experience */}
      <section className="relative w-full min-h-screen py-24 flex flex-col md:flex-row bg-[#0B0B0B] z-10 border-t-4 border-[#E8E1D9]">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 p-6 md:p-12 flex justify-center items-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] border-4 border-[#E8E1D9] p-2 bg-[#111] transform -rotate-2">
             <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop" alt="Live Drumming" className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="absolute -bottom-4 -right-4 bg-[#B30000] text-[#E8E1D9] px-4 py-2 font-bold text-xl md:text-2xl transform rotate-6 border-2 border-[#0B0B0B]">RAW ENERGY</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center"
        >
          <h2 className="font-omega text-5xl md:text-7xl mb-8 leading-tight text-[#E8E1D9]">
            PERCUSSION IS <br/><span className="text-[#B30000] drop-shadow-[2px_2px_0_#E8E1D9]">OUR LANGUAGE.</span>
          </h2>
          <h2 className="font-omega text-5xl md:text-7xl leading-tight text-[#C89B3C]">
            ENERGY IS OUR IDENTITY.
          </h2>
        </motion.div>
      </section>

      {/* Section 3: Global Presence */}
      <section className="relative w-full py-24 bg-[#B30000] overflow-hidden border-y-4 border-[#E8E1D9] flex flex-col gap-16">
        <div className="relative w-full flex whitespace-nowrap overflow-hidden">
          <motion.div
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 25, ease: "linear", repeat: Infinity }}
             className="flex"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="font-omega text-7xl md:text-9xl text-[#0B0B0B] px-8">FROM BANGALORE TO THE WORLD</span>
                <span className="text-[#E8E1D9] text-6xl px-4">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative w-full flex whitespace-nowrap overflow-hidden">
          <motion.div
             animate={{ x: ["-50%", "0%"] }}
             transition={{ duration: 35, ease: "linear", repeat: Infinity }}
             className="flex gap-6 md:gap-10 px-6"
          >
            {[...Array(3)].map((_, j) => (
               <React.Fragment key={j}>
                 <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noopener noreferrer" className="relative w-72 md:w-[28rem] aspect-video shrink-0 border-4 border-[#0B0B0B] group block overflow-hidden shadow-[8px_8px_0_#E8E1D9]">
                    <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <FaYoutube className="text-[#C89B3C] text-6xl drop-shadow-md" />
                    </div>
                 </a>
                 <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noopener noreferrer" className="relative w-72 md:w-[28rem] aspect-video shrink-0 border-4 border-[#0B0B0B] group block overflow-hidden shadow-[8px_8px_0_#E8E1D9]">
                    <img src="https://images.unsplash.com/photo-1470229722913-7c092bceade4?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <FaYoutube className="text-[#C89B3C] text-6xl drop-shadow-md" />
                    </div>
                 </a>
               </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Social Links */}
      <section className="relative w-full py-32 bg-[#0B0B0B] flex flex-col items-center px-4">
         <h2 className="font-omega text-5xl md:text-7xl text-[#E8E1D9] mb-16 uppercase text-center">Connect with the Tribe</h2>
         <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl">
            {socialLinks.map((link, idx) => {
               // Pseudo-random rotation between -4deg and 4deg
               const rot = (idx % 2 === 0 ? 1 : -1) * ((idx % 3) + 1.5);
               return (
                  <motion.a
                     key={idx}
                     href={link.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     variants={glitchHover}
                     whileHover="hover"
                     whileTap={{ scale: 0.95 }}
                     className="street-tag flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 text-[#E8E1D9] font-bold text-xl md:text-2xl uppercase transition-colors"
                     style={{ transform: `rotate(${rot}deg)` }}
                  >
                     {link.icon}
                     {link.name}
                  </motion.a>
               );
            })}
         </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="relative w-full py-32 bg-[#E8E1D9] flex flex-col items-center justify-center text-[#0B0B0B] overflow-hidden border-t-8 border-[#C89B3C]">
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center filter grayscale mix-blend-multiply"></div>
         <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.h2
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="font-omega text-6xl md:text-[7rem] mb-12 text-[#B30000] drop-shadow-[3px_3px_0_#0B0B0B]"
            >
               JOIN THE RHYTHM
            </motion.h2>

            <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="bg-[#0B0B0B] p-4 md:p-6 border-4 border-[#B30000] mb-12"
               style={{ boxShadow: '12px 12px 0px #C89B3C' }}
            >
               <img src={qrCodeImg} alt="Beat Gurus QR" loading="lazy" decoding="async" className="w-56 h-56 md:w-72 md:h-72 object-contain filter-none bg-white p-2" />
            </motion.div>

            <motion.p
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase text-[#0B0B0B]"
            >
               SCAN. <span className="text-[#B30000]">FEEL.</span> EXPERIENCE.
            </motion.p>
         </div>
      </section>
    </div>
  );
};

export default QrCodePage;
