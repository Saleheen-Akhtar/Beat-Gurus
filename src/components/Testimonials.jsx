import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    text: "Beat Gurus infused our event with an energy that was absolutely electric. The fusion of cultures left our international delegates completely spellbound.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    name: "Tech Summit Organizers",
    role: "Corporate Event",
  },
  {
    text: "We wanted something unique for our wedding, and their Djembe beats were the perfect heartbeat to our celebration. Truly unforgettable.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    name: "Priya & Rahul",
    role: "Wedding Clients",
  },
  {
    text: "A powerhouse of rhythm! They don't just play drums, they command the stage. The raw energy is something you have to experience live.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    name: "Music Magazine",
    role: "Editorial Review",
  },
  {
    text: "The BBC World Awards performance was breathtaking. They brought a warmth and authenticity that elevated the entire evening to something truly special.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    name: "BBC World Travel Awards",
    role: "International Event",
  },
  {
    text: "Their rhythmic synchrony is unmatched. The audience was on their feet dancing within minutes. A phenomenal addition to any music festival.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    name: "Global Music Fest",
    role: "Festival Organizers",
  },
  {
    text: "Booking Beat Gurus was the best decision we made for our gala. The sound of the didgeridoo and djembe created an atmosphere of pure magic.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    name: "Annual Charity Gala",
    role: "Event Coordinators",
  },
  {
    text: "Pure acoustic brilliance. In a world full of digital tracks, their live percussion brings a desperately needed raw and authentic vibe.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&auto=format&fit=crop",
    name: "Sound & Stage",
    role: "Music Critics",
  },
  {
    text: "They seamlessly blended traditional Indian percussion with African beats. Our corporate retreat was completely transformed by their performance.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    name: "Global Tech Corp",
    role: "HR Director",
  },
  {
    text: "From the dramatic entrances to the high energy drum battles, Beat Gurus delivered an interactive and mesmerizing experience for everyone.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&auto=format&fit=crop",
    name: "Cultural Arts Society",
    role: "Event Director",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-[var(--gold)]/20 shadow-lg bg-[#1A1A1A] max-w-xs w-full"
                  style={{ boxShadow: "0 10px 30px -10px rgba(212, 167, 44, 0.1)" }}
                  key={i}
                >
                  <div className="text-[var(--bg-sand)] opacity-90">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-[var(--gold)]/40"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-[var(--gold)]">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight text-[var(--bg-sand)] text-sm">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="testimonials-section relative my-20 pt-32 pb-32 overflow-hidden">
      {/* Floating background text */}
      <motion.div className="testi-bg-text" style={{ y: bgY, opacity: 0.05, position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none' }}>
        VOICES
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16"
        >
          <div className="flex justify-center mb-4">
            <p className="section-eyebrow">06 Voices</p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center" style={{ margin: 0 }}>
            SUCCESS <br className="hidden sm:block" />
            <span style={{ color: 'var(--gold)' }}>STORIES</span>
          </h2>
          <p className="text-center mt-6 text-lg opacity-80 max-w-lg mx-auto" style={{ color: 'var(--text-grey)' }}>
            See what our clients have to say about the pure acoustic energy of Beat Gurus.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[650px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={35} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={42} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={38} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
