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
        <div className="section-header">
          <h2>What They <span className="gold-text">Say</span></h2>
          <div className="line"></div>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="quote-icon">❝</div>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <h4>{review.author}</h4>
                <span>{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        .review-card {
          background: #111;
          padding: 40px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          position: relative;
        }
        .quote-icon {
          font-size: 4rem;
          color: var(--gold);
          opacity: 0.2;
          line-height: 1;
          margin-bottom: -20px;
        }
        .review-text {
          font-size: 1.1rem;
          font-style: italic;
          color: #ddd;
          margin-bottom: 25px;
        }
        .review-author h4 {
          color: var(--gold);
          margin-bottom: 5px;
          font-family: var(--font-main);
          font-weight: 700;
        }
        .review-author span {
          color: #888;
          font-size: 0.9rem;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
