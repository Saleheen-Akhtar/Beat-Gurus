import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      text: "Beat Gurus infused our event with an energy that was absolutely electric. The fusion of cultures left our international delegates spellbound!",
      author: "Tech Summit Organizers",
      role: "Corporate Event"
    },
    {
      text: "We wanted something unique for our wedding, and their Djembe beats were the perfect heartbeat to our celebration. Unforgettable.",
      author: "Priya & Rahul",
      role: "Wedding Clients"
    },
    {
      text: "A powerhouse of rhythm! They don't just play drums; they command the stage. The raw energy is something you have to experience live.",
      author: "Music Magazine",
      role: "Review"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>What They <span style={{ color: 'var(--earth-red)' }}>Say</span></h2>
          <div className="line" style={{ background: 'var(--text-dark)' }}></div>
        </motion.div>

        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              whileHover={{ y: -10, boxShadow: '12px 12px 0px rgba(0,0,0,0.15)' }}
            >
              <div className="quote-icon" style={{ color: 'var(--text-dark)', opacity: 0.1 }}>❝</div>
              <p className="review-text" style={{ fontWeight: 'bold' }}>"{review.text}"</p>
              <div className="review-author" style={{ borderTop: '2px solid var(--text-dark)', paddingTop: '15px', marginTop: '15px' }}>
                <h4>{review.author}</h4>
                <span style={{ color: 'var(--text-grey)' }}>{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
