import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from './TextReveal';

const ServiceCard = ({ service, index, total, scrollYProgress }) => {
  // Sticky overlapping logic inspired by Mexora's bento/card overlaps
  // Each card scales down slightly as the next one comes over it
  const scale = useTransform(scrollYProgress, [index / total, (index + 1) / total], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [index / total, (index + 1) / total], [1, 0.5]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        position: 'sticky',
        top: `calc(15vh + ${index * 40}px)`,
        height: '60vh',
        minHeight: '400px',
        width: '100%',
        backgroundColor: 'var(--bg-sand-dark)', // Using a slightly darker tone for contrast
        border: '4px solid var(--text-dark)',
        borderRadius: '24px',
        boxShadow: '8px 8px 0px var(--text-dark)',
        marginBottom: '20vh',
        padding: 'clamp(20px, 5vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: index + 1,
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 0, color: 'var(--text-dark)', lineHeight: 0.9 }}>
          {service.title}
        </h3>
        <span className="accent-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--earth-red)', marginTop: '-10px' }}>
          0{index + 1}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'var(--text-dark)',
          maxWidth: '500px',
          fontWeight: '600',
          fontFamily: 'var(--font-main)'
        }}>
          {service.desc}
        </p>

        {/* Decorative tribal shape per card */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ opacity: 0.3 }}>
           <circle cx="50" cy="50" r="40" fill="none" stroke="var(--text-dark)" strokeWidth="4" strokeDasharray="10 5" />
           <path d="M50 10 L50 90 M10 50 L90 50" stroke="var(--earth-red)" strokeWidth="4" />
        </svg>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef(null);

  // Track scroll progress through the entire Services container to drive the overlapping cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const services = [
    { title: "International Tours", desc: "Taking raw acoustic energy across the globe, from intimate cultural gatherings to massive stadium performances." },
    { title: "Music Festivals", desc: "Commanding the main stage with earth-shaking rhythms that unite crowds of thousands." },
    { title: "Corporate Galas", desc: "Delivering high-energy, unforgettable performances that elevate brand events and award ceremonies." },
    { title: "Private Weddings", desc: "Fusing traditional beats with modern celebratory energy to create the ultimate unforgettable rhythm for your special day." }
  ];

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '80px' }}>
          <TextReveal>
            <span className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '-10px' }}>03.</span>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="section-title" style={{ margin: 0 }}>OUR <span style={{ color: 'var(--earth-red)' }}>OFFERINGS</span></h2>
          </TextReveal>
        </div>

        {/* The container needs extra height so we can scroll through the sticky cards */}
        <div ref={containerRef} style={{ position: 'relative', paddingBottom: '20vh' }}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              total={services.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;