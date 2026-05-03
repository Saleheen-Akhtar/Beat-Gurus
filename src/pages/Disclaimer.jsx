import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
  return (
    <div className="bg-sand text-foreground min-h-screen pt-32 pb-20 relative z-10 font-sans">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.h1
          className="font-kavoon text-5xl md:text-6xl text-gold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Disclaimer
        </motion.h1>

        <motion.div
          className="font-kalam text-lg md:text-xl space-y-8 leading-relaxed bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Last Updated: May 3, 2024</p>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">1. Website Information</h2>
            <p>The information provided by Beat Gurus ("we," "us," or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">2. Limitation of Liability</h2>
            <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;
