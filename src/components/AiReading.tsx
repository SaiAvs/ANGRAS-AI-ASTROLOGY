import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, User, Clock, Loader2, ArrowRight, CheckCircle2, Award, Heart, Briefcase, Zap, ShieldAlert, Palette, Compass, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { ReadingResult } from '../types';

interface AiReadingProps {
  onBookConsultationWithDetails: (details: { name: string; dob: string; place: string }) => void;
}

export const AiReading: React.FC<AiReadingProps> = ({ onBookConsultationWithDetails }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) {
      setError('Please provide your Full Name and Date of Birth.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/generate-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, birthPlace, birthTime })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate reading');

      setResult(data);
      setLoading(false);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7C3AED', '#4F8CFF']
      });

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('reading-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleExportPdf = () => {
    if (!result) return;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Page background
    doc.setFillColor(8, 8, 8);
    doc.rect(0, 0, 210, 297, 'F');

    // Title / Header
    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('ANGRAS CELESTIAL READING REPORT', 20, 22);

    doc.setTextColor(200, 200, 200);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generated for: ${result.name} | DOB: ${dob}`, 20, 30);
    if (birthPlace) {
      doc.text(`Birth Place: ${birthPlace}`, 20, 36);
    }

    // Divider line
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    let y = 50;

    // Numbers Box
    doc.setFillColor(17, 24, 39);
    doc.roundedRect(20, y, 170, 20, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(`Mulank (Root): ${result.mulank}`, 28, y + 12);
    doc.text(`Bhagyank (Destiny): ${result.bhagyank}`, 115, y + 12);

    y += 28;

    // Summary
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(11);
    doc.text('COSMIC SUMMARY', 20, y);
    y += 6;

    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const summaryLines = doc.splitTextToSize(result.aiSummary, 170);
    doc.text(summaryLines, 20, y);
    y += (summaryLines.length * 5) + 8;

    // Personality & Strengths
    if (y > 220) {
      doc.addPage();
      doc.setFillColor(8, 8, 8);
      doc.rect(0, 0, 210, 297, 'F');
      y = 20;
    }

    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PERSONALITY TRAITS', 20, y);
    y += 6;
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    result.personalityTraits.forEach((trait) => {
      doc.text(`• ${trait}`, 24, y);
      y += 5;
    });

    y += 6;
    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CORE STRENGTHS', 20, y);
    y += 6;
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    result.strengths.forEach((str) => {
      doc.text(`• ${str}`, 24, y);
      y += 5;
    });

    y += 6;
    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CAREER GUIDANCE', 20, y);
    y += 6;
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const careerLines = doc.splitTextToSize(result.careerGuidance, 170);
    doc.text(careerLines, 20, y);
    y += (careerLines.length * 5) + 8;

    if (y > 230) {
      doc.addPage();
      doc.setFillColor(8, 8, 8);
      doc.rect(0, 0, 210, 297, 'F');
      y = 20;
    }

    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('RELATIONSHIP INSIGHTS', 20, y);
    y += 6;
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const relLines = doc.splitTextToSize(result.relationshipInsights, 170);
    doc.text(relLines, 20, y);
    y += (relLines.length * 5) + 8;

    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('LUCKY NUMBERS & COLORS', 20, y);
    y += 6;
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(`Numbers: ${result.luckyNumbers.join(', ')}`, 24, y);
    y += 5;
    doc.text(`Colors: ${result.luckyColors.join(', ')}`, 24, y);

    // Save PDF
    doc.save(`Angras_Celestial_Reading_${result.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <section id="reading" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#7C3AED]/10 via-[#D4AF37]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Celestial Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Generate Your Personalized Reading
          </h2>
          <p className="text-[#B5B5B5] text-base sm:text-lg">
            Enter your birth details below to unlock your Mulank, Bhagyank, and profound astrological guidance.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-2xl shadow-2xl mb-16">
          <form onSubmit={handleGenerate} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Date of Birth <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Birth Place */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Birth Place (City, Country)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="e.g. New Delhi, India"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Birth Time */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  Birth Time (Optional)
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#7C3AED] text-black font-bold tracking-wide shadow-xl shadow-[#D4AF37]/20 hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Synthesizing Cosmic Chart...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>Generate AI Reading</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div id="reading-results">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header Summary Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#7C3AED]/20 via-[#111827] to-[#D4AF37]/20 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Compass className="w-48 h-48 text-[#D4AF37]" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4AF37] mb-4">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Celestial Chart Ready for {result.name}</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                      Your Cosmic Signature
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                      {result.aiSummary}
                    </p>
                  </div>
                  <button
                    onClick={handleExportPdf}
                    className="px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#c29f31] text-black font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-all shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF Report</span>
                  </button>
                </div>
              </div>

              {/* Numbers Highlight Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-[#D4AF37]/30 backdrop-blur-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Root Number</span>
                    <h4 className="text-3xl font-bold text-white mt-1">Mulank {result.mulank}</h4>
                    <p className="text-xs text-gray-400 mt-1">Governs core personality & instincts</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-3xl font-bold text-[#D4AF37]">
                    {result.mulank}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-purple-500/30 backdrop-blur-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Destiny Number</span>
                    <h4 className="text-3xl font-bold text-white mt-1">Bhagyank {result.bhagyank}</h4>
                    <p className="text-xs text-gray-400 mt-1">Governs life path & career trajectory</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-3xl font-bold text-purple-400">
                    {result.bhagyank}
                  </div>
                </div>
              </div>

              {/* Detailed Reading Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personality Traits */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                      <User className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Personality Traits</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {result.personalityTraits.map((trait, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Core Strengths</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {result.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Karmic Challenges</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {result.challenges.map((chal, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Guidance */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Career Guidance</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{result.careerGuidance}</p>
                </div>

                {/* Relationship Insights */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Relationship Insights</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{result.relationshipInsights}</p>
                </div>

                {/* Lucky Numbers & Colors */}
                <div className="p-6 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Lucky Frequencies</span>
                    <div className="flex items-center gap-2 mt-2">
                      {result.luckyNumbers.map((num, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Power Colors</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.luckyColors.map((col, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Practices */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#111827] to-[#1f2937] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                    <Zap className="w-4 h-4" />
                    <span>Daily Alignment</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Recommended Spiritual Practices</h4>
                  <ul className="flex flex-wrap gap-4 mt-3">
                    {result.recommendedPractices.map((rec, idx) => (
                      <li key={idx} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-200">
                        ✨ {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => onBookConsultationWithDetails({ name: result.name, dob, place: birthPlace })}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b38f24] text-black font-bold tracking-wide shadow-xl hover:opacity-95 transition-all shrink-0 flex items-center gap-3"
                >
                  <span>Book Expert Deep Dive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
