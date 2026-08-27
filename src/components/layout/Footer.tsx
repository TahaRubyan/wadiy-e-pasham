import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, Truck, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#4A2B20] text-stone-200 pt-16 pb-12 border-t-4 border-[#FFD6BA] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Value Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#FFD6BA]/30">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#6B3E30] border border-[#FFD6BA]/30">
            <div className="p-3 bg-[#FFD6BA] text-[#4A2B20] rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">100% Authentic Pashmina</h4>
              <p className="text-sm text-stone-200 mt-1">Sourced directly from certified weavers of Ladakh and Kashmir Valley.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#6B3E30] border border-[#FFD6BA]/30">
            <div className="p-3 bg-[#FFE8CD] text-[#4A2B20] rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">Cash on Delivery & Express Shipping</h4>
              <p className="text-sm text-stone-200 mt-1">Doorstep delivery nationwide with Cash on Delivery (COD) options.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#6B3E30] border border-[#FFD6BA]/30">
            <div className="p-3 bg-[#FFDCDC] text-[#4A2B20] rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">7-Day Guarantee</h4>
              <p className="text-sm text-stone-200 mt-1">Hassle-free exchange policy if you aren't completely delighted.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="block font-serif text-2xl font-bold tracking-tight text-white">
                WADIY-E-PASHAM
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase font-bold text-[#FFD6BA]">
                Luxury Shawls & Stoles
              </span>
            </Link>
            <p className="text-sm text-stone-200 max-w-sm leading-relaxed">
              Celebrating centuries of Kashmir craftsmanship. Every thread carries the soul of master artisans weaving Pashmina, Cashmere, and Silk heritage.
            </p>
            
            {/* Color Palette Pill indicator */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-stone-300 font-medium">Warm Palette:</span>
              <div className="flex gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#FFDCDC] inline-block shadow-sm" title="Rose Blush #FFDCDC"></span>
                <span className="w-4 h-4 rounded-full bg-[#FFF2EB] inline-block shadow-sm" title="Porcelain #FFF2EB"></span>
                <span className="w-4 h-4 rounded-full bg-[#FFE8CD] inline-block shadow-sm" title="Peach Soft #FFE8CD"></span>
                <span className="w-4 h-4 rounded-full bg-[#FFD6BA] inline-block shadow-sm" title="Warm Amber #FFD6BA"></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif text-base font-semibold text-white mb-4">Collections</h5>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/shop?sub=Pashmina" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Pure Ladakhi Pashmina</Link></li>
              <li><Link to="/shop?sub=Kani" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Kani Tapestry Weave</Link></li>
              <li><Link to="/shop?sub=Cashmere" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Imperial Cashmere</Link></li>
              <li><Link to="/shop?sub=Heirloom" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Jamawar & Doshala</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-serif text-base font-semibold text-white mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Our Story & Heritage</Link></li>
              <li><Link to="/track" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Track Your Parcel</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Contact Support</Link></li>
              <li><Link to="/admin" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#FFD6BA] transition">Admin Portal Access</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-serif text-base font-semibold text-white mb-4">Artisan Newsletter</h5>
            <p className="text-xs text-stone-300 mb-3">Subscribe to receive exclusive collection drops and heirloom story notes.</p>
            
            {subscribed ? (
              <div className="p-3 bg-[#6B3E30] border border-[#FFD6BA]/40 text-[#FFD6BA] text-xs rounded-xl flex items-center gap-2">
                <Heart className="w-4 h-4 fill-[#FFD6BA]" /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 bg-[#6B3E30] text-stone-100 placeholder-stone-400 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD6BA] border border-[#FFD6BA]/30"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-lg hover:bg-[#FFE8CD] transition flex items-center gap-1"
                  >
                    Join <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFD6BA]/30 flex flex-col md:flex-row justify-between items-center text-xs text-stone-300 gap-4">
          <p>© {new Date().getFullYear()} WADIY-E-PASHAM. Handcrafted with passion.</p>
          <div className="flex space-x-6">
            <span>Node + TanStack + Supabase Ready</span>
            <span>•</span>
            <span>Cash on Delivery & Bank Transfer Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
