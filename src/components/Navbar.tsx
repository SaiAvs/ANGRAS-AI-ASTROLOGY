import React, { useState } from 'react';
import { Compass, Sparkles, Shield, Menu, X, Calendar, User, PhoneCall } from 'lucide-react';
import angrasLogo from '../assets/images/angras logo.jpeg';

interface NavbarProps {
  onOpenAdmin: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'reading', label: 'AI Reading' },
    { id: 'numerology', label: 'Mulank' },
    { id: 'consultation', label: 'Book Expert' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'consultation') {
      window.open(window.location.origin + '/?mode=consultation', '_blank');
      setMobileMenuOpen(false);
      return;
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#050508]/90 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#D4AF37]/50 shadow-md group-hover:scale-105 transition-transform">
              <img src={angrasLogo} alt="Angras Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Angras
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                  activeTab === link.id ? 'text-[#D4AF37]' : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('reading')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F8CFF] text-white text-xs font-semibold shadow-md hover:opacity-90 transition-all"
            >
              Get Free Reading
            </button>
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#D4AF37]"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-[#D4AF37] hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('reading')}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F8CFF] text-white font-medium text-center text-sm shadow-md"
            >
              Get Free Reading
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

