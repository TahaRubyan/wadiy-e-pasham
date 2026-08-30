import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Sparkles, Crown, Award, Gem, Shield, X, Check, Calendar, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/product/ProductCard';
import { TierGrade } from '../types/product';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  // Tier filter directly as requested: ALL TIERS, PLATINUM, GOLD, DIAMOND, IMPERIAL
  const initialTier = (searchParams.get('tier') as TierGrade | 'ALL') || 'ALL';
  const [selectedTier, setSelectedTier] = useState<TierGrade | 'ALL'>(initialTier);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(''); // Custom calendar date: "YYYY-MM-DD"
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name' | 'date-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available Tiers configuration
  const tiers: { id: TierGrade | 'ALL'; name: string; icon: React.ReactNode; desc: string; badgeColor: string }[] = [
    { id: 'ALL', name: 'All Tiers', icon: <Sparkles className="w-4 h-4" />, desc: 'Browse the entire Royal Kashmir archive', badgeColor: 'bg-[#FFD6BA] text-[#4A2B20]' },
    { id: 'Imperial', name: 'Imperial Tier', icon: <Crown className="w-4 h-4 text-amber-700" />, desc: 'Highest grade ceremonial doshalas & masterworks', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'Diamond', name: 'Diamond Tier', icon: <Gem className="w-4 h-4 text-cyan-700" />, desc: 'Ultra-fine 12-micron pure Ladakhi wool', badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
    { id: 'Platinum', name: 'Platinum Tier', icon: <Award className="w-4 h-4 text-slate-700" />, desc: '70%–96% fine wool & Kani needlework wraps', badgeColor: 'bg-slate-100 text-slate-900 border-slate-300' },
    { id: 'Gold', name: 'Gold Tier', icon: <Shield className="w-4 h-4 text-amber-600" />, desc: 'Classic everyday luxury & durable comfort blends', badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  ];

  // Real-time filter without jumping/resetting scroll position
  const handleTierSelect = (tier: TierGrade | 'ALL') => {
    setSelectedTier(tier);
    if (tier === 'ALL') {
      searchParams.delete('tier');
    } else {
      searchParams.set('tier', tier);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedTier('ALL');
    setSearchQuery('');
    setSelectedDate('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Tier filter
      if (selectedTier !== 'ALL' && product.tierGrade !== selectedTier) {
        return false;
      }

      // Calendar Custom Date Filter (Released on or after the selected date)
      if (selectedDate) {
        const itemDate = product.releaseDate || '2026-08-20';
        if (itemDate < selectedDate) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle?.toLowerCase().includes(q);
        const matchesTier = product.tierGrade.toLowerCase().includes(q);
        const matchesFabric = product.fabric?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesTier && !matchesFabric) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'date-desc') return (b.releaseDate || '').localeCompare(a.releaseDate || '');
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedTier, searchQuery, selectedDate, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FFF2EB]">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6B3E30] bg-[#FFD6BA] px-4 py-1 rounded-full border border-[#FFE8CD]">
          WADIY-E-PASHAM Handlooms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B20]">
          Royal Shawls & Stoles Collection
        </h1>
        <p className="text-[#4A2B20]/80 text-xs sm:text-sm leading-relaxed font-medium">
          Filter directly by certified luxury tiers and handloom release dates in real-time. Each piece is hand-spun from high-altitude Ladakhi underfleece.
        </p>
      </div>

      {/* QUICK TIER SELECTOR PILLS (Real-Time Filter) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tiers.map((t) => {
          const isSelected = selectedTier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTierSelect(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-sm border cursor-pointer ${
                isSelected
                  ? 'bg-[#4A2B20] text-[#FFE8CD] border-[#4A2B20] shadow-md scale-105'
                  : 'bg-white text-[#4A2B20] hover:bg-[#FFE8CD] border-[#FFE8CD]'
              }`}
            >
              {t.icon}
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* SEARCH, SORT, DATE FILTER & MOBILE FILTER BAR */}
      <div className="bg-white p-4 rounded-3xl border border-[#FFE8CD] shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shawl by name, fabric, tier..."
            className="w-full pl-10 pr-4 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-2xl text-xs text-[#4A2B20] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Custom Calendar Date Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex items-center bg-[#FFF2EB] border border-[#FFE8CD] rounded-2xl px-3 py-1.5 gap-2 text-xs font-bold text-[#4A2B20]">
            <Calendar className="w-3.5 h-3.5 text-[#6B3E30]" />
            <span className="text-[11px] text-stone-500 hidden md:inline">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs text-[#4A2B20] font-semibold focus:outline-none cursor-pointer"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-stone-400 hover:text-stone-600 ml-1"
                title="Clear date filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right Sort & Mobile Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          <span className="text-xs font-bold text-[#4A2B20]">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'article' : 'articles'}
          </span>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-2xl text-xs font-bold text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
            >
              <option value="featured">✨ Featured First</option>
              <option value="date-desc">📅 Newest Date</option>
              <option value="price-asc">💵 Price: Low to High</option>
              <option value="price-desc">💎 Price: High to Low</option>
              <option value="name">🔤 Name (A - Z)</option>
            </select>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 bg-[#FFE8CD] text-[#4A2B20] rounded-2xl border border-[#FFD6BA] flex items-center gap-1.5 text-xs font-bold"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

        </div>

      </div>

      {/* MAIN CATALOG AREA: 2-COLUMN DESKTOP (Sidebar Tiers + Custom Calendar + Real-Time Smooth Animated Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#FFE8CD]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#4A2B20]" />
              <h3 className="font-serif text-base font-bold text-[#4A2B20]">Filter Catalog</h3>
            </div>
            {(selectedTier !== 'ALL' || selectedDate || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#6B3E30] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Tier Grade Selector */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#6B3E30] uppercase tracking-wider block">Luxury Tiers</span>
            {tiers.map((t) => {
              const isSelected = selectedTier === t.id;
              const count = t.id === 'ALL'
                ? products.length
                : products.filter((p) => p.tierGrade === t.id).length;

              return (
                <button
                  key={t.id}
                  onClick={() => handleTierSelect(t.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE8CD] border-[#FFD6BA] ring-1 ring-[#FFD6BA] shadow-sm scale-[1.02]'
                      : 'bg-[#FFF2EB]/40 border-transparent hover:bg-[#FFE8CD]/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 bg-white rounded-lg shadow-xs mt-0.5">{t.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-[#4A2B20]">{t.name}</div>
                      <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B3E30] bg-white px-2 py-0.5 rounded-full border border-stone-200 shadow-xs">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Calendar Date Filter */}
          <div className="p-4 bg-[#FFF2EB] rounded-2xl border border-[#FFE8CD] space-y-2.5">
            <span className="text-[11px] font-bold text-[#6B3E30] uppercase tracking-wider block flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#4A2B20]" /> Custom Loom Date
            </span>
            <p className="text-[10px] text-stone-500">Filter articles crafted on or after selected calendar date:</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#FFE8CD] rounded-xl text-xs text-[#4A2B20] font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] cursor-pointer"
            />
            {selectedDate && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-[#4A2B20] font-semibold">Active: ≥ {selectedDate}</span>
                <button
                  onClick={() => setSelectedDate('')}
                  className="text-[10px] font-bold text-rose-700 hover:underline"
                >
                  Clear Date
                </button>
              </div>
            )}
          </div>

          {/* Quick Craft Info */}
          <div className="p-4 bg-[#FFE8CD]/50 rounded-2xl border border-[#FFD6BA] space-y-2 text-xs text-[#4A2B20]">
            <span className="font-bold flex items-center gap-1.5 text-xs text-[#6B3E30]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A2B20]" /> Heirloom Standard
            </span>
            <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
              Every shawl is stamped with laser-etched purity hallmarks and accompanied by authentic Kashmir handloom guild certification.
            </p>
          </div>
        </aside>

        {/* Real-Time Animated Products Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-[#FFE8CD] space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-[#FFE8CD] text-[#4A2B20] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B20]">No Shawls Found</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                No products match the selected tier, date, or search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-2xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD]"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 12 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>

      </div>

      {/* MOBILE FILTER BOTTOM SHEET / DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#4A2B20]/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#FFF2EB] rounded-t-3xl p-6 shadow-2xl overflow-y-auto border-t-2 border-[#FFD6BA] space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#FFE8CD]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#4A2B20]" />
                  <h3 className="font-serif text-lg font-bold text-[#4A2B20]">Filter Collection</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl text-stone-500 hover:text-[#4A2B20]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tiers List */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#6B3E30] uppercase tracking-wider block">Luxury Tiers</span>
                {tiers.map((t) => {
                  const isSelected = selectedTier === t.id;
                  const count = t.id === 'ALL'
                    ? products.length
                    : products.filter((p) => p.tierGrade === t.id).length;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        handleTierSelect(t.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFE8CD] font-bold shadow-sm'
                          : 'bg-white text-[#4A2B20] hover:bg-[#FFE8CD]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white rounded-xl">{t.icon}</div>
                        <div>
                          <div className="text-sm font-bold">{t.name}</div>
                          <div className="text-[10px] text-stone-500 font-normal">{t.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[#FFE8CD] text-[#4A2B20] px-2 py-0.5 rounded-full font-bold">
                          {count}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#4A2B20]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Custom Calendar */}
              <div className="p-4 bg-white rounded-2xl border border-[#FFE8CD] space-y-2">
                <span className="text-[11px] font-bold text-[#6B3E30] uppercase tracking-wider block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#4A2B20]" /> Custom Handloom Date
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-xs text-[#4A2B20] font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#FFE8CD] flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/3 py-3 bg-white text-[#4A2B20] font-bold text-xs rounded-2xl border border-stone-200"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-2xl shadow-md border border-[#FFE8CD]"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
