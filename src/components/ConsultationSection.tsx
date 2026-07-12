import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Mail, Phone, User, Sparkles, Upload, ShieldCheck, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Booking } from '../types';

interface ConsultationSectionProps {
  initialData?: { name: string; dob: string; place: string } | null;
  onBookingSuccess: (booking: Booking) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ initialData, onBookingSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      if (initialData.name) setFullName(initialData.name);
      if (initialData.dob) setBirthDate(initialData.dob);
      if (initialData.place) setBirthPlace(initialData.place);
    }
  }, [initialData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !birthDate || !preferredDate) {
      setError('Please fill in all required fields (Name, Email, Birth Date, Preferred Date).');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          birthDate,
          birthPlace,
          preferredDate,
          message,
          paymentScreenshot: paymentScreenshot || 'simulated_receipt.png'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');

      setLoading(false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7C3AED', '#4F8CFF']
      });

      onBookingSuccess(data);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Booking submission failed. Please try again.');
      setLoading(false);
    }
  };

  const benefits = [
    "Personalized Mulank & Bhagyank Deep Dive",
    "Comprehensive Career & Wealth Direction",
    "Relationship & Compatibility Blueprint",
    "Spiritual Growth & Remedial Practices",
    "Private 1-on-1 Video Session with Master Astrologer"
  ];

  return (
    <section id="consultation" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Book an Expert Consultation
          </h2>
          <p className="text-[#B5B5B5] text-base sm:text-lg">
            Connect directly with master numerologists for tailored guidance, karma realignment, and future forecasting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Benefits & Trust */}
          <div className="space-y-6 lg:col-span-1">
            <div className="p-8 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Consultation Benefits</h3>
              <ul className="space-y-4">
                {benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Investment</div>
                <div className="text-3xl font-extrabold text-[#D4AF37]">₹2,500 <span className="text-xs text-gray-400 font-normal">/ session</span></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#7C3AED]/20 to-transparent border border-purple-500/20 text-xs text-purple-200">
              🛡️ All consultations include a lifetime recorded session link and a 20-page custom PDF astrological report delivered prior to your call.
            </div>
          </div>

          {/* Right Column: Booking & Payment Form */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-[#111827]/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <h3 className="text-xl font-bold text-white pb-4 border-b border-white/10">
                1. Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aarav@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Birth Date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Birth Place
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="e.g. Mumbai, India"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                    Preferred Consultation Date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Specific Questions or Intentions
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share any specific dilemmas regarding career, relationship, or spiritual growth..."
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                />
              </div>

              {/* Payment Section */}
              <div className="pt-6 border-t border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      2. Secure Payment (₹2,500)
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Complete payment via UPI QR or open secure gateway in a new tab.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open('https://razorpay.com', '_blank')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open Payment Gateway ↗</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl text-black">
                    <div className="w-36 h-36 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 text-center p-2">
                      <QrCode className="w-28 h-28 text-black" />
                    </div>
                    <span className="text-xs font-semibold mt-3 text-gray-700">Scan via GPay / PhonePe / Paytm</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-400">UPI ID</span>
                      <div className="text-lg font-mono font-bold text-[#D4AF37] bg-white/5 p-3 rounded-xl border border-white/10 mt-1">
                        angras.astrology@oksbi
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                        Upload Payment Screenshot
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:opacity-90 cursor-pointer"
                      />
                      {paymentScreenshot && (
                        <span className="block text-xs text-emerald-400 mt-2">✓ Screenshot attached successfully</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#7C3AED] text-black font-bold tracking-wide shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? 'Processing Booking...' : 'Submit Booking & Secure Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
