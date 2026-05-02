import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What is your booking process?",
    answer: <>To book <span className="font-brand-name">Beat Gurus</span>, simply fill out the contact form below with your event details. Our management team will get back to you within 24-48 hours to discuss availability, requirements, and pricing. Once we agree on terms, a contract and deposit will secure your date.</>
  },
  {
    question: "Do you travel internationally?",
    answer: "Yes, we regularly perform across the globe! We bring our raw acoustic energy to international tours, festivals, and exclusive private events anywhere in the world. Please note that travel, accommodation, and backline requirements will need to be arranged."
  },
  {
    question: "What kind of events do you play at?",
    answer: "We perform at a wide variety of events including Music Festivals, Corporate Galas, Weddings, Private Parties, and Cultural Shows. We can scale our performance from a focused stage show to interactive, immersive experiences."
  },
  {
    question: "Can you customize your performance?",
    answer: "Absolutely. We pride ourselves on creating bespoke experiences. Depending on your event's vibe, we can adjust our setlist, performance duration, and even the combination of instruments (Djembe, Didgeridoo, Indian Percussion) to perfectly match your atmosphere."
  },
  {
    question: "What are your technical requirements?",
    answer: "Because our USP is 'Raw Acoustic Energy', we don't rely on electronic instruments. However, for larger venues, we require high-quality stage microphones (specifically for percussion and didgeridoo) and monitors. A full technical rider will be provided upon booking."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{
      padding: '120px 0',
      background: 'var(--text-dark)', /* Using Grey Black from our palette */
      color: 'var(--bg-sand)', /* Using Ivory White */
      borderTop: '2px solid rgba(245, 241, 236, 0.1)'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            textTransform: 'uppercase',
            color: 'var(--bg-sand)',
            marginBottom: '20px',
            lineHeight: 0.9
          }}>
            FREQUENTLY ASKED <br/><span style={{ color: 'var(--gold)' }}>QUESTIONS</span>
          </h2>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isActive}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'transparent',
                      border: 0,
                      textAlign: 'left',
                      padding: '30px 0',
                      color: 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                      margin: 0,
                      color: isActive ? 'var(--gold)' : 'var(--bg-sand)',
                      transition: 'color 0.3s ease',
                      textTransform: 'uppercase'
                    }}>
                      {faq.question}
                    </span>
                    <span style={{
                      fontSize: '2rem',
                      color: isActive ? 'var(--gold)' : 'var(--bg-sand)',
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                      fontFamily: 'var(--font-main)',
                      fontWeight: 300
                    }}>
                      +
                    </span>
                  </button>
                </h3>

                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: 'hidden' }}
                  aria-hidden={!isActive}
                >
                  <p style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                    color: 'rgba(245, 241, 236, 0.7)',
                    marginTop: '20px',
                    maxWidth: '800px'
                  }}>
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
