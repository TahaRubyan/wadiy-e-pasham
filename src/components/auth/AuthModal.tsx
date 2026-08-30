import React, { useState } from 'react';
import { X, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login, signup } = useAuth();
  const { loginAdmin } = useOrders();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const cleanInput = email.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPass = password.trim().toLowerCase().replace(/\s+/g, '');

    const isMasterAdmin =
      cleanInput === 'admin' ||
      cleanInput === 'masteradmin' ||
      cleanInput === 'admin@wadiyepasham.com' ||
      cleanInput === 'admin@shawls.com';

    if (mode === 'signin') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        if (isMasterAdmin && (cleanPass === 'admin123' || cleanPass === 'admin')) {
          loginAdmin('admin123');
          onClose();
          navigate('/admin');
        } else {
          onClose();
          navigate('/shop');
        }
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    } else {
      // All new user signups are strictly customer accounts
      const res = await signup(email, password, fullName, 'customer');
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Account registered successfully! Welcome to WADIY-E-PASHAM.');
        setTimeout(() => {
          onClose();
          navigate('/shop');
        }, 600);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-md flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#FFF2EB] text-[#4A2B20] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative"
        >
          {/* Header */}
          <div className="p-6 bg-[#FFE8CD] border-b border-[#FFD6BA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-[#FFE8CD] overflow-hidden p-1">
                <img src="/images/logo.png" alt="WADIY-E-PASHAM" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A2B20]">
                {mode === 'signin' ? 'Sign In to Account' : 'Create Patron Account'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/50 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-2 bg-[#FFF2EB] border-b border-[#FFE8CD]">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === 'signin' ? 'bg-white text-[#4A2B20] shadow-sm' : 'text-stone-500 hover:text-[#4A2B20]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition ${
                mode === 'signup' ? 'bg-white text-[#4A2B20] shadow-sm' : 'text-stone-500 hover:text-[#4A2B20]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
                {successMsg}
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
                    placeholder="e.g. Alizeh Shah"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                Username or Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email or username"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-md flex items-center justify-center gap-2 text-sm border border-[#FFE8CD] mt-4"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In to Store' : 'Create Buyer Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
