import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaYoutube, FaFacebookF, FaInstagram, FaGlobe, FaGoogle, FaGoogleDrive } from 'react-icons/fa';


const socialLinks = [
  { name: 'YouTube', url: 'https://m.youtube.com/@BeatGurus', icon: <FaYoutube size={24} />, id: 'youtube' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1G8v4BVcoJ/', icon: <FaFacebookF size={24} />, id: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/beat_gurus?igsh=NWRxaWV2amo5bW94', icon: <FaInstagram size={24} />, id: 'instagram' },
  { name: 'Website', url: 'https://www.beatgurus.org/', icon: <FaGlobe size={24} />, id: 'website' },
  { name: 'Google Reviews', url: 'https://maps.app.goo.gl/U3CVeMZm7xq5gdw96', icon: <FaGoogle size={24} />, id: 'google', primary: true },
  { name: 'Flute Fusion', url: 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1', icon: <FaGoogleDrive size={24} />, id: 'drive1' },
  { name: 'Drum Circle', url: 'https://drive.google.com/drive/folders/14iqZ8zuTiPTlLasgg7LmVp6bz7jwX4vj', icon: <FaGoogleDrive size={24} />, id: 'drive2' },
  { name: 'DJ x Percussion', url: 'https://drive.google.com/drive/folders/1ZrlbT8I60V6ULuKDBSLx-clOfD8dik4O', icon: <FaGoogleDrive size={24} />, id: 'drive3' }
];


const floatingMediaLinks = [
  { name: 'Flute Fusion', url: 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1' },
  { name: 'Drum Circle', url: 'https://drive.google.com/drive/folders/14iqZ8zuTiPTlLasgg7LmVp6bz7jwX4vj' },
  { name: 'DJ x Percussion', url: 'https://drive.google.com/drive/folders/1ZrlbT8I60V6ULuKDBSLx-clOfD8dik4O' },
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
  const floatingLinksRef = useRef(null);

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

          background: #111;
        }
        .street-tag.hover-youtube { box-shadow: 4px 4px 0px #FF0000; }
        .street-tag.hover-youtube:hover { background: #FF0000 !important; }
        .street-tag.hover-facebook { box-shadow: 4px 4px 0px #1877F2; }
        .street-tag.hover-facebook:hover { background: #1877F2 !important; }
        .street-tag.hover-instagram { box-shadow: 4px 4px 0px #E1306C; }
        .street-tag.hover-instagram:hover { background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045) !important; }
        .street-tag.hover-website { box-shadow: 4px 4px 0px #2e7d32; }
        .street-tag.hover-website:hover { background: #2e7d32 !important; }
        .street-tag.hover-google { box-shadow: 4px 4px 0px #4285F4; }
        .street-tag.hover-google:hover { background: linear-gradient(to right, #4285F4, #F4B400) !important; }
        .street-tag.hover-drive1 { box-shadow: 4px 4px 0px #F4B400; }
        .street-tag.hover-drive1:hover { background: #FFD04B !important; color: #111 !important; }
        .street-tag.hover-drive2 { box-shadow: 4px 4px 0px #0F9D58; }
        .street-tag.hover-drive2:hover { background: #1FA463 !important; }
        .street-tag.hover-drive3 { box-shadow: 4px 4px 0px #4285F4; }
        .street-tag.hover-drive3:hover { background: #4C8BF5 !important; }

      `}</style>
      <div className="noise-overlay"></div>

      {/* Section 1: Hero */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0B0B0B]">
        <motion.div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/qr-hero-bg.png')",
            y: yHero,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-[#0B0B0B]/60"></div><div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent opacity-100"></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 md:pt-20 -translate-y-6 md:translate-y-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-omega text-7xl md:text-[10rem] leading-none text-white mb-4 flex flex-col items-center md:items-start drop-shadow-[4px_4px_0_#B30000]" style={{ textShadow: "4px 4px 0px #B30000" }}
          >
            <div className="relative">
              <span className="block">BEAT</span>
              <span className="block ml-[0.8em] sm:ml-[1em] md:ml-[1.25em]">GURUS</span>
            </div>
          </motion.div>
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
             <img src="/images/perc-image.png" alt="Live Drumming" className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="absolute -bottom-4 -right-4 bg-[#D4A72C] text-[#E8E1D9] px-4 py-2 font-bold text-xl md:text-2xl transform rotate-6 border-2 border-[#0B0B0B]">RAW ENERGY</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center"
        >
          <h2 className="font-omega text-5xl md:text-7xl mb-8 leading-tight text-[#E8E1D9]">
            PERCUSSION IS <br/><span className="text-[#D4A72C] drop-shadow-[2px_2px_0_#E8E1D9]">OUR LANGUAGE.</span>
          </h2>
          <h2 className="font-omega text-5xl md:text-7xl leading-tight text-[#C89B3C]">
            ENERGY IS OUR IDENTITY.
          </h2>

          <div ref={floatingLinksRef} className="relative mt-8 h-[280px] md:h-[320px] w-full max-w-xl overflow-hidden rounded-2xl border-2 border-[#E8E1D9]/50 bg-[#111]/70">
            {floatingMediaLinks.map((link, idx) => {
              const left = ["6%", "36%", "66%"];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  drag
                  dragConstraints={floatingLinksRef}
                  dragElastic={0.2}
                  initial={{ y: -180, opacity: 0, rotate: idx % 2 === 0 ? -5 : 4 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ delay: idx * 0.18, duration: 0.8, type: "spring", bounce: 0.35 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-6 street-tag px-4 py-3 text-sm md:text-base font-bold uppercase text-[#E8E1D9] hover:text-white cursor-grab active:cursor-grabbing"
                  style={{ left: left[idx] }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Section 3: Global Presence */}
      <section className="relative w-full py-24 bg-[#D4A72C] overflow-hidden border-y-4 border-[#E8E1D9] flex flex-col gap-16">
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
                    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <FaYoutube className="text-[#C89B3C] text-6xl drop-shadow-md" />
                    </div>
                 </a>
                 <a href="https://m.youtube.com/@BeatGurus" target="_blank" rel="noopener noreferrer" className="relative w-72 md:w-[28rem] aspect-video shrink-0 border-4 border-[#0B0B0B] group block overflow-hidden shadow-[8px_8px_0_#E8E1D9]">
                    <img src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=800&auto=format&fit=crop" alt="Show" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
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
      <section className="relative w-full py-28 md:py-32 bg-[#0B0B0B] flex flex-col items-center px-4">
        <h2 className="font-omega text-5xl md:text-7xl text-[#E8E1D9] mb-14 uppercase text-center">Connect with the Tribe</h2>
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-8 md:gap-x-10 md:gap-y-10 max-w-5xl px-2 md:px-6">
          {socialLinks.map((link, idx) => {
            const rot = (idx % 2 === 0 ? 1 : -1) * ((idx % 3) + 1.2);
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: [0, -2, 2, -1, 0], y: [0, 1, -1, 1, 0], rotate: [`${rot}deg`, `${rot - 1}deg`, `${rot + 1}deg`, `${rot}deg`] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`street-tag hover-${link.id} ${link.primary ? 'ring-2 ring-[#D4A72C]/60' : ''} flex items-center gap-4 px-7 md:px-8 py-4 md:py-5 text-[#E8E1D9] font-bold text-xl md:text-2xl uppercase transition-colors hover:text-white`}
                style={{ transform: `rotate(${rot}deg)` }}
              >
                {link.icon}
                {link.name}
              </motion.a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default QrCodePage;
