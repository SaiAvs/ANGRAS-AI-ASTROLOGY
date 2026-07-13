import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Compass, Star, ChevronDown, Loader2, X, Sun, Heart, Briefcase, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onExplore: () => void;
  onBook: () => void;
}

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

interface HoroscopeResult {
  zodiacSign: string;
  date: string;
  overview: string;
  love: string;
  career: string;
  luckyNumber: number;
  luckyColor: string;
  compatibility: string;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onBook }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeResult | null>(null);
  const [loadingHoroscope, setLoadingHoroscope] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchHoroscope = async (sign: string) => {
    setLoadingHoroscope(true);
    setSelectedZodiac(sign);
    try {
      const res = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zodiacSign: sign })
      });
      const data = await res.json();
      setHoroscopeData(data);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch horoscope', err);
    } finally {
      setLoadingHoroscope(false);
    }
  };

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

        {/* Daily Horoscope Quick Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 shadow-xl"
        >
          <div className="flex items-center gap-2 text-sm text-[#D4AF37] font-medium shrink-0">
            <Sun className="w-4 h-4" />
            <span>Daily Horoscope:</span>
          </div>
          <select
            value={selectedZodiac}
            onChange={(e) => setSelectedZodiac(e.target.value)}
            className="w-full sm:w-auto flex-1 bg-[#121620] border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
          >
            {ZODIAC_SIGNS.map((sign) => (
              <option key={sign} value={sign} className="bg-[#121620] text-white">
                {sign}
              </option>
            ))}
          </select>
          <button
            onClick={() => fetchHoroscope(selectedZodiac)}
            disabled={loadingHoroscope}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29f31] text-black font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {loadingHoroscope ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Reading Stars...</span>
              </>
            ) : (
              <span>Get Horoscope</span>
            )}
          </button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b38f24] text-black font-semibold tracking-wide shadow-xl shadow-[#D4AF37]/20 hover:opacity-95 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Get My Reading</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onBook}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-semibold tracking-wide hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3 cursor-pointer"
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

      {/* Horoscope Modal */}
      <AnimatePresence>
        {showModal && horoscopeData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D111A] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Sun className="w-36 h-36 text-[#D4AF37]" />
              </div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {horoscopeData.date}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                    {horoscopeData.zodiacSign} Daily Horoscope
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 relative z-10 text-sm text-gray-300">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="leading-relaxed font-medium text-white">{horoscopeData.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-pink-400 font-semibold text-xs mb-1">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Love & Soul</span>
                    </div>
                    <p className="text-xs text-gray-300">{horoscopeData.love}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Career & Wealth</span>
                    </div>
                    <p className="text-xs text-gray-300">{horoscopeData.career}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Lucky Number:</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                      {horoscopeData.luckyNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Lucky Color:</span>
                    <span className="font-semibold text-white">{horoscopeData.luckyColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Best Match:</span>
                    <span className="font-semibold text-purple-400">{horoscopeData.compatibility}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center relative z-10">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b38f24] text-black font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  Close Guidance
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block text-gray-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
};

