import React from 'react';
import { CheckCircle2, Calendar, MapPin, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';

interface BookingSuccessProps {
  booking: Booking;
  onReturnHome: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ booking, onReturnHome }) => {
  return (
    <section className="py-24 bg-[#080808] relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-[#7C3AED]/10 to-[#D4AF37]/10 pointer-events-none blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full mx-auto px-4"
      >
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111827]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Booking Confirmed</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Angras</h2>
            <p className="text-gray-300 text-sm">
              Your consultation booking has been successfully logged and secured. Our master astrologer will reach out shortly.
            </p>
          </div>

          {/* Details Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
            <div className="flex justify-between text-sm pb-2 border-b border-white/10">
              <span className="text-gray-400">Booking ID</span>
              <span className="text-[#D4AF37] font-mono font-bold">{booking.id}</span>
            </div>
            <div className="flex justify-between text-sm pb-2 border-b border-white/10">
              <span className="text-gray-400">Full Name</span>
              <span className="text-white font-medium">{booking.fullName}</span>
            </div>
            <div className="flex justify-between text-sm pb-2 border-b border-white/10">
              <span className="text-gray-400">Email</span>
              <span className="text-white font-medium">{booking.email}</span>
            </div>
            <div className="flex justify-between text-sm pb-2 border-b border-white/10">
              <span className="text-gray-400">Preferred Date</span>
              <span className="text-white font-medium">{booking.preferredDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                {booking.status}
              </span>
            </div>
          </div>

          <button
            onClick={onReturnHome}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#7C3AED] text-black font-bold tracking-wide shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
