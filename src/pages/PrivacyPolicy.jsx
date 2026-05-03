import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="bg-sand text-foreground min-h-screen pt-32 pb-20 relative z-10 font-sans">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.h1
          className="font-kavoon text-5xl md:text-6xl text-gold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          className="font-kalam text-lg md:text-xl space-y-8 leading-relaxed bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Effective Date: May 3, 2024</p>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">1. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services, such as when booking the band, filling out a contact form, or participating in activities on our Website. The personal information we collect may include: names, phone numbers, email addresses, and event details.</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">2. How We Use Your Information</h2>
            <p>We process your personal information for a variety of reasons, depending on how you interact with our Website, including: to facilitate event bookings and communications, to respond to user inquiries and offer support, and to send administrative information to you.</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">3. Legal Basis for Processing (India)</h2>
            <p>Our processing of your personal data is in compliance with the provisions of the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We collect and process data based on your consent and for the performance of our contract (e.g., booking services).</p>
          </section>
          <section>
            <h2 className="font-kavoon text-2xl text-foreground mb-4">4. Sharing Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. We may share information with trusted third-party service providers strictly for the purpose of operating our website and business, subject to strict confidentiality obligations.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
