import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';

const achievements = [
  {
    title: "Official Home Band for RCB",
    desc: "Beat Gurus has played for 5 consecutive years for RCB as their official home band.",
    image: "/assets/achievements/IMG-20260503-WA0041.webp",
    size: "large",
  },
  {
    title: "The Hindu Coverage",
    desc: "Showcasing an all-woman ensemble at the iconic Bengaluru Ganesh Utsava, featuring performers from age 16 to 67.",
    image: "/assets/achievements/IMG-20260503-WA0038.webp",
    size: "small",
  },
  {
    title: "Kantara",
    desc: "Mr. Ganeshan Govindswamy, the founder of Beat Gurus has played Digeridoo for both Kantara and Kantara Chapter 1.",
    image: "/assets/achievements/IMG-20260503-WA0040.webp",
    size: "small",
  },
  {
    title: "Vijay Karnataka Recognition",
    desc: "Featured in Vijay Karnataka for pioneering acoustic fusion performances and cultural impact.",
    image: "/assets/achievements/IMG-20260503-WA0042.webp",
    size: "small",
  },
  {
    title: "Sentia 2018",
    desc: "Headlined the state-level inter-collegiate cultural fest alongside major artists.",
    image: "/assets/achievements/IMG-20260503-WA0036.webp",
    size: "small",
  },
  {
    title: "Marriott Holiday Season",
    desc: "Featured performers for the Marriott Holiday Spirit season, bringing festive acoustic energy.",
    image: "/assets/achievements/IMG-20260503-WA0039.webp",
    size: "small",
  },
  {
    title: "Cultural Fest, Norway",
    desc: "Mr. Ganeshan Govindswamy has represented India at the Cultural fest held at Norway.",
    image: "/assets/achievements/Screenshot_20260514_122859_(1).webp",
    size: "large",
  }
];


const AchievementCard = ({ item }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform mouse position into rotation degrees (-10 to 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position relative to center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseLeave} // Reset on enter to avoid jumps
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-2xl group flex-shrink-0 cursor-pointer
        ${item.size === 'large' ? 'w-[80vw] md:w-[45vw]' : 'w-[65vw] md:w-[30vw]'}
      `}
    >
      {/* Background Image Container - slightly scales to handle perspective edges */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transform: "translateZ(-50px) scale(1.1)" }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </motion.div>

      {/* Hover Gradient Overlay - Initially hidden, reveals on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-dark)] via-[var(--text-dark)] to-transparent opacity-0 group-hover:opacity-85 transition-opacity duration-500 ease-in-out" />

      {/* Content - Pop out in 3D and Reveal on Hover */}
      <motion.div
        className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Title always visible slightly, but slides up and fully reveals desc on hover */}
        <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <h3 className="text-2xl md:text-4xl font-accent text-[var(--bg-sand)] mb-3 relative z-10 !drop-shadow-md">
            {item.title}
          </h3>
          <p className="text-base md:text-lg text-[var(--bg-sand)] font-main font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-in-out relative z-10 !drop-shadow-md">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
            <AchievementCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
