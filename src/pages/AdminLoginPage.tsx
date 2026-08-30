import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, demoLogin } = useAuth();
  const { loginAdmin } = useOrders();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success || password === 'admin123' || password === 'admin') {
      loginAdmin('admin123');
      navigate('/admin');
    } else {
      setError(res.error || 'Invalid admin credentials. Try password "admin123" or click Instant Demo.');
    }
  };

  const handleDemoLogin = () => {
    demoLogin('admin');
    loginAdmin('admin123');
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 bg-[#FFF2EB]">
      <div className="bg-white rounded-3xl p-8 border border-[#FFE8CD] shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#FFE8CD] text-[#4A2B20] rounded-2xl flex items-center justify-center mx-auto border border-[#FFD6BA]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#4A2B20]">WADIY-E-PASHAM Admin Portal</h2>
          <p className="text-xs text-stone-500">Sign in to manage catalog stock, discounts, and parcel courier dispatches.</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wadiyepasham.com"
              className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-md flex items-center justify-center gap-2 text-sm border border-[#FFE8CD]"
          >
            Sign In to Admin Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#FFE8CD] text-center space-y-3">
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-[#FFE8CD] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFD6BA] border border-[#FFD6BA] transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <KeyRound className="w-4 h-4 text-[#4A2B20]" /> Instant 1-Click Admin Access
          </button>

          <div className="text-xs text-stone-500">
            Are you a customer?{' '}
            <Link to="/login" className="font-bold text-[#4A2B20] underline">
              Sign In as Buyer
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
