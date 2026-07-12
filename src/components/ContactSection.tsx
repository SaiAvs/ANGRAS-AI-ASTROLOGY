import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactMsg) {
      setMessageSent(true);
      setContactName('');
      setContactMsg('');
    }
  };

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter / Brand */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cosmic Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Subscribe to Weekly Planetary Insights
            </h2>
            <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
              Receive exclusive numerological forecasts, moon phase alignments, and spiritual growth exercises directly in your inbox.
            </p>

            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#b38f24] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400">Thank you for joining the Angras cosmic circle.</p>
            )}
          </div>

          {/* Quick Contact Form */}
          <div className="p-8 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-4">Send a Direct Message</h3>
            <form onSubmit={handleContact} className="space-y-4">
              {messageSent && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message sent successfully. We will reply within 24 hours.</span>
                </div>
              )}
              <div>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <textarea
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="How can we assist your spiritual journey?"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
