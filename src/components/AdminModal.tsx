import React, { useState, useEffect } from 'react';
import { Shield, X, Search, Filter, Lock, CheckCircle2, Clock, XCircle, DollarSign, Users, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';

interface AdminModalProps {
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'angras2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin password. (Hint: angras2026)');
    }
  };

  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').reduce((acc, b) => acc + b.amount, 0);
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111827] border border-white/20 shadow-2xl flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Admin Portal Login</h3>
              <p className="text-sm text-gray-400">Enter administrator credentials to access the Angras management dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {loginError}
                </div>
              )}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (angras2026)"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#7C3AED] text-black font-bold text-sm shadow-xl hover:opacity-95 transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Admin Portal</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Angras Management Dashboard</h3>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-white"
              >
                Lock Portal
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Total Bookings</span>
                  <div className="text-3xl font-bold text-white mt-1">{bookings.length}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Pending Consultations</span>
                  <div className="text-3xl font-bold text-amber-400 mt-1">{pendingCount}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Revenue Overview</span>
                  <div className="text-3xl font-bold text-[#D4AF37] mt-1">₹{totalRevenue.toLocaleString()}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, ID..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-xs uppercase text-gray-400 tracking-wider">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Birth Date / Place</th>
                    <th className="p-4">Preferred Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        No bookings found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#D4AF37]">{b.id}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{b.fullName}</div>
                          <div className="text-xs text-gray-400">{b.email}</div>
                          {b.phone && <div className="text-xs text-gray-500">{b.phone}</div>}
                        </td>
                        <td className="p-4">
                          <div>{b.birthDate}</div>
                          <div className="text-xs text-gray-400">{b.birthPlace || 'N/A'}</div>
                        </td>
                        <td className="p-4 font-medium text-white">{b.preferredDate}</td>
                        <td className="p-4 font-semibold text-white">₹{b.amount}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            b.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            b.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as Booking['status'])}
                            className="bg-[#080808] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
