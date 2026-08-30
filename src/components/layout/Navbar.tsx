import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, ShieldCheck, LogOut, Package, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { smoothScrollToTop } from '../../utils/scrollToTop';

export const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shawls Collection', path: '/shop' },
    { name: 'Heritage & Craft', path: '/about' },
    { name: 'Track a Parcel', path: '/track' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Sleek High-Fashion Top Marquee Announcement Bar */}
      <div className="bg-[#3B2117] text-[#FFE8CD] overflow-hidden py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] border-b border-[#FFD6BA]/20 font-medium select-none relative z-30">
        <div className="flex w-[200%] animate-marquee-slow whitespace-nowrap">
          <span className="mx-6 flex items-center gap-2">
            ✦ WADIY-E-PASHAM • 100% Certified Ladakhi Cashmere & Pashmina Shawls • Nationwide Cash on Delivery ✦
          </span>
          <span className="mx-6 flex items-center gap-2">
            ✦ Heirloom Artisanal Handlooms • Free Express Courier Shipping on Orders Above PKR 30,000 ✦
          </span>
          <span className="mx-6 flex items-center gap-2">
            ✦ WADIY-E-PASHAM • 100% Certified Ladakhi Cashmere & Pashmina Shawls • Nationwide Cash on Delivery ✦
          </span>
          <span className="mx-6 flex items-center gap-2">
            ✦ Heirloom Artisanal Handlooms • Free Express Courier Shipping on Orders Above PKR 30,000 ✦
          </span>
        </div>
      </div>

      {/* Main Luxury Navigation Bar with Bigger Transparent Logo */}
      <header className="sticky top-0 z-40 bg-[#FFF2EB]/95 backdrop-blur-md border-b border-[#FFE8CD] transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-26">
            
            {/* Left Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-2xl text-[#4A2B20] hover:bg-[#FFE8CD] transition"
                aria-label="Open mobile menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>

            {/* Brand Logo & Royal Shawl Icon (Prominently Enlarged & Pure Transparent) */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
              <Link to="/" onClick={smoothScrollToTop} className="flex items-center gap-3.5 group py-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/images/logo.png"
                    alt="WADIY-E-PASHAM"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4A2B20] leading-none">
                    WADIY-E-PASHAM
                  </span>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-bold text-[#6B3E30] mt-1">
                    Luxury Shawls & Stoles
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={smoothScrollToTop}
                    className={`relative px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      active
                        ? 'text-[#4A2B20] bg-[#FFE8CD] shadow-sm border border-[#FFD6BA]'
                        : 'text-[#4A2B20]/80 hover:text-[#4A2B20] hover:bg-[#FFE8CD]/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Auth + Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Account / Auth Button */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="px-3.5 py-2.5 bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-2xl hover:bg-[#FFD6BA] transition flex items-center gap-1.5 border border-[#FFD6BA] shadow-xs"
                  >
                    <User className="w-4 h-4 text-[#4A2B20]" />
                    <span className="hidden sm:inline max-w-[120px] truncate">{user?.fullName || 'Account'}</span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#FFE8CD] p-2 space-y-1 z-50">
                      <div className="px-3 py-2 border-b border-stone-100">
                        <p className="text-xs font-bold text-[#4A2B20] truncate">{user?.fullName}</p>
                        <span className="text-[10px] font-bold text-[#6B3E30] bg-[#FFE8CD] px-2 py-0.5 rounded-full inline-block mt-0.5">
                          {isAdmin ? '👑 Admin Staff' : '✨ Valued Patron'}
                        </span>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => {
                            smoothScrollToTop();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#4A2B20] hover:bg-[#FFF2EB] rounded-xl"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4A2B20]" /> Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/track"
                        onClick={() => {
                          smoothScrollToTop();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#4A2B20] hover:bg-[#FFF2EB] rounded-xl"
                      >
                        <Package className="w-3.5 h-3.5 text-[#4A2B20]" /> Track My Orders
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    onClick={smoothScrollToTop}
                    className="px-3.5 py-2.5 bg-white text-[#4A2B20] text-xs font-bold rounded-2xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD] shadow-xs flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" /> Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={smoothScrollToTop}
                    className="hidden sm:inline-flex items-center gap-1 px-3.5 py-2.5 bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-xs border border-[#FFE8CD]"
                  >
                    <Sparkles className="w-3 h-3" /> Register
                  </Link>
                </div>
              )}

              {/* Shopping Bag Button with Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-3 rounded-2xl bg-[#FFD6BA] text-[#4A2B20] hover:bg-[#FFE8CD] transition border border-[#FFE8CD] shadow-sm flex items-center justify-center"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 text-[#4A2B20]" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#4A2B20] text-[#FFE8CD] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#4A2B20]/60 backdrop-blur-sm transition-opacity"
          />

          <aside className="fixed inset-y-0 left-0 h-[100dvh] w-72 sm:w-80 bg-[#FFF2EB] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#FFE8CD]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#FFE8CD] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img src="/images/logo.png" alt="WADIY-E-PASHAM" className="w-full h-full object-contain filter drop-shadow-md" />
                  </div>
                  <span className="font-serif text-xl font-bold text-[#4A2B20]">WADIY-E-PASHAM</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-[#4A2B20]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => {
                        smoothScrollToTop();
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
                        active
                          ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm border border-[#FFE8CD]'
                          : 'text-[#4A2B20] hover:bg-[#FFE8CD]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Auth in Mobile Menu */}
              <div className="pt-4 border-t border-[#FFE8CD]">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#4A2B20]">Signed in as: {user?.fullName}</p>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => {
                          smoothScrollToTop();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full py-2.5 bg-[#FFD6BA] text-[#4A2B20] text-center font-bold text-xs rounded-xl shadow"
                      >
                        Go to Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/track"
                        onClick={() => {
                          smoothScrollToTop();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full py-2.5 bg-[#FFE8CD] text-[#4A2B20] text-center font-bold text-xs rounded-xl shadow"
                      >
                        Track My Orders
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 text-xs font-bold text-rose-700 bg-rose-50 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        smoothScrollToTop();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full py-3 bg-[#FFD6BA] text-[#4A2B20] text-center font-bold text-xs rounded-xl shadow"
                    >
                      Sign In to Account
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => {
                        smoothScrollToTop();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full py-3 bg-white text-[#4A2B20] text-center font-bold text-xs rounded-xl border border-[#FFE8CD]"
                    >
                      Create Patron Account
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Footer Note */}
            <div className="text-[11px] text-stone-500 text-center pt-6 border-t border-[#FFE8CD]">
              ✦ Certified Pure Kashmiri Cashmere ✦
            </div>
          </aside>
        </div>
      )}

      {/* Auth Modal if triggered */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
