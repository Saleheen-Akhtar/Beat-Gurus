import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface HoverDetailCardProps {
  title?: string;
  subtitle?: string;
  images?: string[];
  category?: string;
  index?: string;
  enableAnimations?: boolean;
}

const defaultImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=450&fit=crop";

export function HoverDetailCard({
  title = "Instrument",
  subtitle = "World percussion",
  images = [defaultImage],
  category = "Percussion",
  index = "/01",
  enableAnimations = true,
}: HoverDetailCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const containerVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 360, damping: 30, delay: 0.16 },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  return (
    <motion.div
      className="w-full"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      {/* Card shell - dark editorial */}
      <div
        style={{
          background: "var(--text-dark)",
          border: "1px solid rgba(245, 241, 236, 0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: isHovered
            ? "0 24px 64px rgba(26, 26, 26, 0.45)"
            : "0 8px 40px rgba(26, 26, 26, 0.28)",
          transition: "box-shadow 0.4s ease",
          position: "relative",
        }}
      >
        {/* ── Image area ── */}
        <motion.div
          style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "none" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Photo */}
          <motion.img
            src={images[0]}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            animate={{
              scale: isHovered ? 1.07 : 1,
              filter: isHovered
                ? "blur(3px) brightness(0.65)"
                : "blur(0px) brightness(1)",
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          {/* Gold shimmer overlay + CTA buttons */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(212,167,44,0.10)",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                {/* Explore button */}
                <motion.button
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 18, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 440, damping: 28, delay: 0.04 }}
                  style={{
                    background: "var(--text-dark)",
                    color: "var(--bg-sand)",
                    border: "none",
                    borderRadius: "60px",
                    padding: "12px 28px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase" as const,
                    cursor: "none",
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--gold)";
                    e.currentTarget.style.color = "var(--text-dark)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--text-dark)";
                    e.currentTarget.style.color = "var(--bg-sand)";
                  }}
                >
                  Explore
                </motion.button>

                {/* Listen button */}
                <motion.button
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 18, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 440, damping: 28, delay: 0.12 }}
                  style={{
                    background: "var(--gold)",
                    color: "var(--text-dark)",
                    border: "none",
                    borderRadius: "60px",
                    padding: "12px 28px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase" as const,
                    cursor: "none",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-sand)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
                >
                  Listen
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Index badge - top left */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontFamily: "var(--font-display)",
              fontSize: "0.68rem",
              letterSpacing: "3px",
              color: "var(--gold)",
              background: "rgba(26, 26, 26, 0.6)",
              backdropFilter: "blur(8px)",
              padding: "5px 12px",
              borderRadius: "40px",
              border: "1px solid rgba(212,167,44,0.3)",
            }}
          >
            {index}
          </div>
        </motion.div>

        {/* ── Bottom content ── */}
        <motion.div
          style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", gap: "8px" }}
          variants={shouldAnimate ? staggerVariants : {}}
        >
          {/* Category chip */}
          <motion.span
            variants={shouldAnimate ? textVariants : {}}
            style={{
              display: "inline-block",
              alignSelf: "flex-start",
              fontFamily: "var(--font-main)",
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "2.5px",
              color: "var(--gold)",
              border: "1.5px solid var(--gold)",
              borderRadius: "40px",
              padding: "4px 13px",
              marginBottom: "6px",
            }}
          >
            {category}
          </motion.span>

          {/* Instrument name */}
          <motion.h3
            variants={shouldAnimate ? textVariants : {}}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
              color: "var(--bg-sand)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              textTransform: "uppercase" as const,
              margin: 0,
            }}
          >
            {title}
          </motion.h3>

          {/* One-liner description */}
          <motion.p
            variants={shouldAnimate ? textVariants : {}}
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "0.85rem",
              color: "rgba(245, 241, 236, 0.48)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
