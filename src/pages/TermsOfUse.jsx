import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  return (
    <div className="bg-sand text-foreground min-h-screen pt-32 pb-20 relative z-10 font-sans">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.h1
          className="font-kavoon text-5xl md:text-6xl text-gold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms of Use
        </motion.h1>

        <motion.div
          className="font-kalam text-lg md:text-xl space-y-8 leading-relaxed bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Last Updated: May 3, 2024</p>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Use constitute a legally binding agreement made between you and Beat Gurus ("we," "us," or "our"), concerning your access to and use of the website. By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Use.</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">2. Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of India. Beat Gurus and yourself irrevocably consent that the courts of Bangalore, Karnataka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">3. Event Bookings and Cancellations</h2>
            <p>Any bookings made through inquiries on this website are subject to a separate formal contract. The initial deposit is generally non-refundable to secure the date. Cancellations must be communicated in writing.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUse;
