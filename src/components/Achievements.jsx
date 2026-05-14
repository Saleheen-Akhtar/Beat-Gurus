import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const achievements = [
  {
    title: "Official Home Band for RCB",
    desc: "Beat Gurus has played for 5 consecutive years for RCB as their official home band.",
    image: "/assets/achievements/ach-rcb.webp",
    size: "large",
  },
  {
    title: "Kantara",
    desc: "Mr. Ganeshan Govindswamy, the founder of Beat Gurus has played Digeridoo for both Kantara and Kantara Chapter 1.",
    image: "/assets/achievements/ach-kantara.webp",
    size: "small",
  },
  {
    title: "BBC World Travel Awards",
    desc: "Beat Gurus has performed for the BBC World travel awards.",
    image: "/assets/achievements/ach-bbc.webp",
    size: "small",
  },
  {
    title: "Cultural Fest, Norway",
    desc: "Mr. Ganeshan Govindswamy has represented India at the Cultural fest held at Norway.",
    image: "/assets/achievements/ach-norway.webp",
    size: "large",
  }
];

const Achievements = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollRange, setScrollRange] = useState(0);

  // Calculate dynamic scroll range based on actual content width to ensure
  // all cards are visible, regardless of viewport size.
  useEffect(() => {
    const updateScrollRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };

    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--bg-sand)] section"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

        {/* Section Header */}
        <div className="container relative z-10 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-[var(--gold)]">
            Milestones
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-grey)] font-main mt-4 max-w-2xl">
            A legacy of raw acoustic energy, echoing across borders and screens.
          </p>
        </div>

        {/* Horizontal Scrolling Bento Container */}
        {/* Added pr-[5vw] so the last element has padding on the right when fully scrolled */}
        <motion.div
          ref={scrollRef}
          style={{ x: prefersReducedMotion ? 0 : xTransform }}
          className="flex gap-6 md:gap-10 px-[5vw] pr-[5vw] w-max h-[50vh] md:h-[60vh] will-change-transform"
        >
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group flex-shrink-0
                ${item.size === 'large' ? 'w-[80vw] md:w-[45vw]' : 'w-[65vw] md:w-[30vw]'}
              `}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for text readability - avoiding plain black */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-dark)] via-transparent to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <h3 className="text-2xl md:text-4xl font-accent text-[var(--bg-sand)] mb-3 relative z-10 !drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-[var(--bg-sand)] font-main font-medium opacity-90 relative z-10 !drop-shadow-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
