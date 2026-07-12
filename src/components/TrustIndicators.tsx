import React, { useEffect, useState } from 'react';
import { Users, Calendar, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '+', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      // easeOutExpo
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeProgress * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const TrustIndicators: React.FC = () => {
  return (
    <section className="py-12 bg-[#050508] border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-amber-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-5 p-6 rounded-2xl bg-[#111827]/60 border border-white/10 backdrop-blur-xl shadow-lg hover:border-[#D4AF37]/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/20 to-[#7C3AED]/20 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter end={15420} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">
                Satisfied Clients Worldwide
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-5 p-6 rounded-2xl bg-[#111827]/60 border border-white/10 backdrop-blur-xl shadow-lg hover:border-purple-500/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter end={100000} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">
                Expert Consultations
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-5 p-6 rounded-2xl bg-[#111827]/60 border border-white/10 backdrop-blur-xl shadow-lg hover:border-emerald-500/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-[#D4AF37]/20 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter end={25} suffix="+ Years" />
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">
                Years of Esoteric Wisdom
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
