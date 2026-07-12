import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/mulankData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Voices of Transformation
          </h2>
          <p className="text-[#B5B5B5] text-base sm:text-lg">
            Hear how Angras has illuminated paths for seekers across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative group hover:border-[#D4AF37]/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute top-6 right-6 text-white/10 group-hover:text-[#D4AF37]/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 italic">
                  "{item.review}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
                <div className="ml-auto px-2.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                  M-{item.mulank}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
