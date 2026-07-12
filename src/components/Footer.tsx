import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#D4AF37] to-[#4F8CFF] p-[1px]">
                <div className="w-full h-full bg-[#080808] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Angras</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Discover yourself through numbers and cosmic wisdom. Merging ancient Vedic numerology with advanced artificial intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavClick('home')} className="hover:text-[#D4AF37] transition-colors">Home</button></li>
              <li><button onClick={() => onNavClick('reading')} className="hover:text-[#D4AF37] transition-colors">AI Reading</button></li>
              <li><button onClick={() => onNavClick('numerology')} className="hover:text-[#D4AF37] transition-colors">Mulank 1-9</button></li>
              <li><button onClick={() => onNavClick('consultation')} className="hover:text-[#D4AF37] transition-colors">Book Consultation</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Cosmic Sciences</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span>Mulank Analysis</span></li>
              <li><span>Bhagyank Calculation</span></li>
              <li><span>Planetary Harmonics</span></li>
              <li><span>Karmic Healing</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Privacy</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Disclaimer</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Angras Astrology & Numerology Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed with Cosmic Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
