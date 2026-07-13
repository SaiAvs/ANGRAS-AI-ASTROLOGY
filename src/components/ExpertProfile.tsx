import React from 'react';
import { Award, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';.
import ownerPhoto from '../assets/images/astro-image.jpeg';

export const ExpertProfile: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#0D111A]/90 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group">
                <img
                  src={ownerPhoto}
                  alt="Acharya Angras"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium tracking-wide">
                <Award className="w-3.5 h-3.5" />
                <span>Founder & Master Astrologer</span>
              </div>
            </div>

            {/* Details & Quote Column */}
            <div className="md:col-span-8 space-y-5 text-center md:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                 DR.ROCHAK TONDON
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  25+ Years of Mastery in Vedic Numerology & Esoteric Sciences
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-[#D4AF37]/40 py-1">
                <Quote className="w-5 h-5 text-[#D4AF37]/30 absolute -top-2 left-2" />
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "Numbers are living cosmic frequencies. Our mission is to decode your blueprint with absolute precision so you can step into your highest destiny."
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>4.9 / 5.0 Rating (100k+ Clients)</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Consultations Open</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
