import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2, KeyRound, Phone, MapPin, Feather, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login, signup, demoLogin } = useAuth();
  const { loginAdmin } = useOrders();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (mode === 'signin') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        if (email.toLowerCase().includes('admin') || password === 'admin123') {
          loginAdmin('admin123');
        }
        setSuccessMsg('Authenticated successfully!');
        setTimeout(() => {
          if (email.toLowerCase().includes('admin')) {
            navigate('/admin');
          } else {
            navigate('/shop');
          }
        }, 400);
      } else {
        setError(res.error || 'Invalid credentials. Please verify your email and password.');
      }
    } else {
      const res = await signup(email, password, fullName, role);
      setLoading(false);
      if (res.success) {
        if (role === 'admin' || email.toLowerCase().includes('admin')) {
          loginAdmin('admin123');
        }
        setSuccessMsg('Account registered successfully! Welcome to WADIY-E-PASHAM.');
        setTimeout(() => {
          if (role === 'admin' || email.toLowerCase().includes('admin')) {
            navigate('/admin');
          } else {
            navigate('/shop');
          }
        }, 400);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    }
  };

  const handleDemo = (demoRole: 'admin' | 'customer') => {
    demoLogin(demoRole);
    if (demoRole === 'admin') {
      loginAdmin('admin123');
      navigate('/admin');
    } else {
      navigate('/shop');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8 bg-[#FFF2EB]">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#FFE8CD] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Luxury Editorial Brand Showcase (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#4A2B20] via-[#5A3326] to-[#3B2117] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD6BA]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFDCDC]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          {/* Top Monogram */}
          <div className="relative z-10 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFD6BA] text-[#4A2B20] font-serif font-bold text-lg flex items-center justify-center shadow-lg border border-white/20">
                W
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight block text-white leading-none">
                  WADIY-E-PASHAM
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#FFD6BA] font-bold mt-0.5 block">
                  Kashmir Royal Heritage
                </span>
              </div>
            </Link>

            <div className="pt-6 space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                An Exclusive World of Heirloom Kashmir Luxury
              </h2>
              <p className="text-xs text-stone-200 leading-relaxed font-medium">
                Sign in to manage your royal orders, track parcel dispatches in real-time, or access the admin management portal.
              </p>
            </div>
          </div>

          {/* Center Visual Card */}
          <div className="relative z-10 my-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-300 flex-shrink-0 border border-white/20">
                <img
                  src="/images/shawls/hero_shawl.jpg"
                  alt="WADIY-E-PASHAM Shawl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFD6BA]">
                  <Sparkles className="w-3.5 h-3.5" /> 100% Certified Ladakhi Wool
                </div>
                <p className="text-xs font-bold text-white mt-0.5">Imperial Pure Pashmina Doshala</p>
                <p className="text-[10px] text-stone-300">12.0 Micron Hand-Combed Fiber</p>
              </div>
            </div>
          </div>

          {/* Bottom Craft Seals */}
          <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-[#FFD6BA]" />
              <span className="text-[11px] text-stone-200">12 Micron Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFD6BA]" />
              <span className="text-[11px] text-stone-200">Certified Weavers</span>
            </div>
          </div>

        </div>

        {/* Right Side: Animated Sign In / Sign Up Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Tab Switcher */}
            <div className="flex p-1.5 bg-[#FFF2EB] rounded-2xl border border-[#FFE8CD]">
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
                  mode === 'signin'
                    ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm border border-[#FFE8CD]'
                    : 'text-stone-600 hover:text-[#4A2B20]'
                }`}
              >
                Sign In (Existing User / Admin)
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
                  mode === 'signup'
                    ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm border border-[#FFE8CD]'
                    : 'text-stone-600 hover:text-[#4A2B20]'
                }`}
              >
                Create New Account
              </button>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-2xl text-center">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0300 1234567"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Islamabad / Lahore / Karachi"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className={mode === 'signup' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
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
                      className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
                    />
                  </div>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
                    Account Classification
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        role === 'customer'
                          ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA] shadow-sm'
                          : 'bg-[#FFF2EB] text-stone-600 border-stone-200'
                      }`}
                    >
                      Normal Patron / Buyer
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        role === 'admin'
                          ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA] shadow-sm'
                          : 'bg-[#FFF2EB] text-stone-600 border-stone-200'
                      }`}
                    >
                      Admin Staff Member
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-lg flex items-center justify-center gap-2 text-sm border border-[#FFE8CD] mt-2"
              >
                {loading ? 'Verifying Credentials...' : mode === 'signin' ? 'Sign In & Access Dashboard' : 'Create Royal Account'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>

          {/* Quick Demo Logins */}
          <div className="pt-6 mt-6 border-t border-[#FFE8CD] space-y-3">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block text-center">
              Quick 1-Click Instant Demo Testing
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemo('admin')}
                className="px-3.5 py-2.5 bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-xl hover:bg-[#FFD6BA] border border-[#FFD6BA] transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#4A2B20]" /> Demo Admin (Admin Panel)
              </button>

              <button
                type="button"
                onClick={() => handleDemo('customer')}
                className="px-3.5 py-2.5 bg-[#FFF2EB] text-[#4A2B20] text-xs font-bold rounded-xl hover:bg-[#FFE8CD] border border-[#FFE8CD] transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-[#4A2B20]" /> Demo Patron (Buyer View)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
