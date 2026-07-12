import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Compass, Star, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExplore: () => void;
  onBook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onBook }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars setup
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render cosmic background gradient glow
      const grad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 3, width * 0.7);
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      grad.addColorStop(0.5, 'rgba(79, 140, 255, 0.08)');
      grad.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += Math.sin(t + star.x) * star.speed;
        if (star.alpha < 0.2) star.alpha = 0.2;
        if (star.alpha > 1) star.alpha = 1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] pt-20 pb-16">
      {/* Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Floating Nebula Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7C3AED]/20 via-[#D4AF37]/10 to-[#4F8CFF]/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-1000" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-inner shadow-white/10"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            AI-Powered Celestial Observatory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-sans"
        >
          Decode Your Destiny with <br />
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#7C3AED] bg-clip-text text-transparent">
            AI and Ancient Wisdom
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#B5B5B5] max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Discover deeply personalized insights through Numerology, Astrology, Mulank, and Bhagyank analysis crafted by advanced artificial intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b38f24] text-black font-semibold tracking-wide shadow-xl shadow-[#D4AF37]/20 hover:opacity-95 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
          >
            <span>Get My Reading</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onBook}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-semibold tracking-wide hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Book Consultation</span>
          </button>
        </motion.div>

        {/* Stats / Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-sans">99.8%</div>
            <div className="text-xs text-[#B5B5B5] mt-1 tracking-wider uppercase">Chart Precision</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-sans">50,000+</div>
            <div className="text-xs text-[#B5B5B5] mt-1 tracking-wider uppercase">Readings Generated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-sans">100%</div>
            <div className="text-xs text-[#B5B5B5] mt-1 tracking-wider uppercase">Confidential</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-sans">4.9 ★</div>
            <div className="text-xs text-[#B5B5B5] mt-1 tracking-wider uppercase">Expert Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block text-gray-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
};
