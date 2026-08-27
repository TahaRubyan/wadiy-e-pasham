import React, { useState } from 'react';
import { X, ShieldCheck, User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (mode === 'signin') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          onClose();
          if (email.toLowerCase().includes('admin')) {
            navigate('/admin');
          }
        }, 500);
      } else {
        setError(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } else {
      const res = await signup(email, password, fullName, role);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          onClose();
          if (role === 'admin' || email.toLowerCase().includes('admin')) {
            navigate('/admin');
          }
        }, 500);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    }
  };

  const handleDemo = (demoRole: 'admin' | 'customer') => {
    demoLogin(demoRole);
    onClose();
    if (demoRole === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/75 backdrop-blur-md flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFF2EB] text-[#4A2B20] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#FFE8CD] border-b border-[#FFD6BA] flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#FFD6BA] text-[#4A2B20] rounded-xl shadow-sm border border-[#FFE8CD]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#6B3E30] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#4A2B20]" /> WADIY-E-PASHAM
                </span>
                <h3 className="font-serif text-xl font-bold text-[#4A2B20]">
                  {mode === 'signin' ? 'Sign In to Your Account' : 'Create an Account'}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/40 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-2 bg-[#FFE8CD]/60 border-b border-[#FFE8CD]">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                mode === 'signin'
                  ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm border border-[#FFE8CD]'
                  : 'text-stone-600 hover:text-[#4A2B20]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                mode === 'signup'
                  ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm border border-[#FFE8CD]'
                  : 'text-stone-600 hover:text-[#4A2B20]'
              }`}
            >
              Register Account
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Alizeh Shah"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      role === 'customer'
                        ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA]'
                        : 'bg-white text-stone-600 border-stone-200'
                    }`}
                  >
                    Normal Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      role === 'admin'
                        ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA]'
                        : 'bg-white text-stone-600 border-stone-200'
                    }`}
                  >
                    Admin Staff
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-md flex items-center justify-center gap-2 text-sm border border-[#FFE8CD] mt-2"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins for Instant Testing */}
          <div className="p-4 bg-white border-t border-[#FFE8CD] space-y-2">
            <span className="text-[11px] font-bold text-stone-500 block text-center uppercase tracking-wider">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('admin')}
                className="px-3 py-2 bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-xl hover:bg-[#FFD6BA] border border-[#FFD6BA] transition flex items-center justify-center gap-1"
              >
                <KeyRound className="w-3.5 h-3.5" /> Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemo('customer')}
                className="px-3 py-2 bg-[#FFF2EB] text-[#4A2B20] text-xs font-bold rounded-xl hover:bg-[#FFE8CD] border border-[#FFE8CD] transition flex items-center justify-center gap-1"
              >
                <User className="w-3.5 h-3.5" /> User Demo
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
