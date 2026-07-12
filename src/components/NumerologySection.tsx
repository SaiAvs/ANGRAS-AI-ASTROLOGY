import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X, Briefcase, Heart, Award, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MULANK_DATA } from '../data/mulankData';
import { MulankInfo } from '../types';

export const NumerologySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedMulank, setSelectedMulank] = useState<MulankInfo | null>(null);

  const currentItem = MULANK_DATA[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = MULANK_DATA.length - 1;
      if (next >= MULANK_DATA.length) next = 0;
      return next;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="numerology" className="py-20 bg-[#050508] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Geometry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Explore Mulank 1 to 9
          </h2>
          <p className="text-[#B5B5B5] text-sm sm:text-base">
            Swipe or use arrows to discover the vibrational essence and planetary ruler of each root number.
          </p>
        </div>

        {/* Swipe Card Container */}
        <div className="relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center">
          <div className="absolute inset-x-0 flex justify-between items-center z-20 pointer-events-none px-2 sm:-mx-6">
            <button
              onClick={() => paginate(-1)}
              className="pointer-events-auto p-3 rounded-full bg-[#111827]/90 border border-white/20 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-xl backdrop-blur-md"
              aria-label="Previous Mulank"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="pointer-events-auto p-3 rounded-full bg-[#111827]/90 border border-white/20 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-xl backdrop-blur-md"
              aria-label="Next Mulank"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full max-w-2xl overflow-hidden px-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipeThreshold = 50;
                  if (offset.x < -swipeThreshold || velocity.x < -300) {
                    paginate(1);
                  } else if (offset.x > swipeThreshold || velocity.x > 300) {
                    paginate(-1);
                  }
                }}
                className="w-full bg-[#111827]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl cursor-grab active:cursor-grabbing flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#7C3AED] p-[1px]">
                        <div className="w-full h-full bg-[#080808] rounded-2xl flex items-center justify-center text-xl font-bold text-[#D4AF37]">
                          {currentItem.number}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                          Ruled by {currentItem.planet}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{currentItem.title}</h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">
                      {currentIndex + 1} of 9
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                    {currentItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Key Strength</span>
                      <span className="text-xs text-emerald-400 font-medium line-clamp-1">{currentItem.strengths[0]}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Top Career</span>
                      <span className="text-xs text-purple-400 font-medium line-clamp-1">{currentItem.careers[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Swipe left or right to explore more</span>
                  <button
                    onClick={() => setSelectedMulank(currentItem)}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 transition-all flex items-center gap-1.5"
                  >
                    <span>Full Blueprint</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {MULANK_DATA.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to Mulank ${item.number}`}
            />
          ))}
        </div>
      </div>

      {/* Modal / Detailed Drawer for Selected Mulank */}
      <AnimatePresence>
        {selectedMulank && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111827] border border-white/20 p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedMulank(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#7C3AED] p-[1px]">
                  <div className="w-full h-full bg-[#080808] rounded-2xl flex items-center justify-center text-3xl font-bold text-[#D4AF37]">
                    {selectedMulank.number}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Ruled by {selectedMulank.planet}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedMulank.title}</h3>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed">
                {selectedMulank.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">Personality Traits</h4>
                  <ul className="space-y-2">
                    {selectedMulank.personality.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Core Strengths</h4>
                  <ul className="space-y-2">
                    {selectedMulank.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Challenges</h4>
                  <ul className="space-y-2">
                    {selectedMulank.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Suitable Careers</h4>
                  <ul className="space-y-2">
                    {selectedMulank.careers.map((car, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>{car}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-2">Relationship Tendencies</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedMulank.relationships}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
