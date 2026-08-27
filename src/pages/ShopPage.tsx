import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, RefreshCcw, Sparkles, Check, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/product/ProductCard';
import { ArticleType, TierGrade } from '../types/product';
import { smoothScrollToTop } from '../utils/scrollToTop';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const urlSubCategory = searchParams.get('sub');

  const [activeSubCategory, setActiveSubCategory] = useState<string>(
    urlSubCategory ? urlSubCategory : 'All'
  );
  const [selectedTier, setSelectedTier] = useState<TierGrade | 'ALL'>('ALL');
  const [activeWeaveGroup, setActiveWeaveGroup] = useState<'ALL' | 'Single' | 'Double' | 'Acrylic'>('ALL');
  const [selectedArticles, setSelectedArticles] = useState<ArticleType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterArticleSearch, setFilterArticleSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    'Single Weave Wool': true,
    'Double Weave Wool': true,
    'Acrylic & Blends': true,
  });

  useEffect(() => {
    if (urlSubCategory) {
      setActiveSubCategory(urlSubCategory);
    }
  }, [urlSubCategory]);

  const subNavItems = [
    { id: 'All', label: 'All Shawls' },
    { id: 'Pashmina', label: 'Pure Pashmina' },
    { id: 'Kani', label: 'Kani Tapestry' },
    { id: 'Cashmere', label: 'Imperial Cashmere' },
    { id: 'Silk Fusion', label: 'Silk Fusion' },
    { id: 'Heirloom', label: 'Heirloom & Jamawar' },
  ];

  const tierGradesList: TierGrade[] = ['Platinum', 'Gold', 'Diamond', 'Imperial'];

  const articleCategories = [
    {
      group: 'Single Weave Wool',
      type: 'Single' as const,
      items: [
        'Wool 50-50 single',
        'Wool 60-40 single',
        'Wool 70-30 single',
        'Wool 80-20 single',
        'Wool Pure Single',
        'Wool 96 Pure Single',
        'Wool 72Pure Single',
      ] as ArticleType[]
    },
    {
      group: 'Double Weave Wool',
      type: 'Double' as const,
      items: [
        'Wool 50-50 double',
        'Wool 60-40 double',
        'Wool 70-30 double',
        'Wool 80-20 double',
        'Wool Pure double',
        'Wool 96 Pure double',
        'Wool 72Pure double',
      ] as ArticleType[]
    },
    {
      group: 'Acrylic & Blends',
      type: 'Acrylic' as const,
      items: ['Acrylic'] as ArticleType[]
    }
  ];

  const handleSubCategorySelect = (sub: string) => {
    setActiveSubCategory(sub);
    if (sub === 'All') {
      searchParams.delete('sub');
    } else {
      searchParams.set('sub', sub);
    }
    setSearchParams(searchParams);
    smoothScrollToTop();
  };

  const toggleArticle = (art: ArticleType) => {
    setSelectedArticles((prev) =>
      prev.includes(art) ? prev.filter((a) => a !== art) : [...prev, art]
    );
  };

  const handleWeaveGroupSelect = (group: 'ALL' | 'Single' | 'Double' | 'Acrylic') => {
    setActiveWeaveGroup(group);
    if (group === 'ALL') {
      setSelectedArticles([]);
    } else if (group === 'Single') {
      setSelectedArticles(articleCategories[0].items);
    } else if (group === 'Double') {
      setSelectedArticles(articleCategories[1].items);
    } else if (group === 'Acrylic') {
      setSelectedArticles(articleCategories[2].items);
    }
    smoothScrollToTop();
  };

  const toggleGroupExpand = (groupName: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const resetFilters = () => {
    setActiveSubCategory('All');
    setSelectedTier('ALL');
    setActiveWeaveGroup('ALL');
    setSelectedArticles([]);
    setSearchQuery('');
    setFilterArticleSearch('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Sub-category filter (only apply if no custom article weave is chosen)
      if (activeSubCategory !== 'All' && selectedArticles.length === 0) {
        if (product.subCategory !== activeSubCategory) return false;
      }

      // Tier filter
      if (selectedTier !== 'ALL' && product.tierGrade !== selectedTier) return false;

      // Article type filter
      if (selectedArticles.length > 0 && !selectedArticles.includes(product.articleType)) return false;

      // Main search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchFabric = (product.articleType || product.fabric || '').toLowerCase().includes(q);
        const matchTier = (product.tierGrade || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchFabric && !matchTier) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeSubCategory, selectedTier, selectedArticles, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FFF2EB]">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#FFE8CD] rounded-3xl p-8 sm:p-10 border border-[#FFD6BA] shadow-sm"
      >
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B3E30] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2B20]" /> WADIY-E-PASHAM Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20]">
            {activeSubCategory === 'All' ? 'Complete Shawls Collection' : `${activeSubCategory} Shawls`}
          </h1>
          <p className="text-sm text-stone-700 font-medium">
            Browse our royal collection of single weave wool, double weave wool, and authentic Ladakhi Pashmina articles.
          </p>
        </div>
      </motion.div>

      {/* Sub-Navbar in Shawls Section */}
      <div className="sticky top-20 z-30 bg-[#FFF2EB]/95 backdrop-blur-md border border-[#FFE8CD] rounded-2xl p-2 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1">
          {subNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSubCategorySelect(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 relative ${
                activeSubCategory === item.id
                  ? 'text-[#4A2B20] shadow-sm'
                  : 'text-[#4A2B20]/80 hover:bg-[#FFE8CD]/60'
              }`}
            >
              {item.label}
              {activeSubCategory === item.id && (
                <motion.div
                  layoutId="activeSubNavPill"
                  className="absolute inset-0 bg-[#FFD6BA] rounded-xl -z-10 border border-[#FFE8CD]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* QUICK WEAVE PRESET PILLS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-[#4A2B20] flex items-center gap-1.5 mr-2 flex-shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#6B3E30]" /> Quick Filter:
        </span>
        {[
          { id: 'ALL', label: 'All Weaves (15)' },
          { id: 'Single', label: 'Single Weave (7)' },
          { id: 'Double', label: 'Double Weave (7)' },
          { id: 'Acrylic', label: 'Acrylic Blend (1)' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleWeaveGroupSelect(btn.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex-shrink-0 border ${
              activeWeaveGroup === btn.id
                ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA] shadow-sm'
                : 'bg-white text-[#4A2B20] border-[#FFE8CD] hover:bg-[#FFE8CD]/60'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Search & Top Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pb-4 border-b border-[#FFE8CD]">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#4A2B20] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search article name (e.g. Wool 60-40, Single, Kani)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#FFE8CD] text-sm text-[#4A2B20] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile filter trigger + Sort Dropdown */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-xs font-bold text-[#4A2B20] flex items-center gap-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#4A2B20]" /> Filters
            {(selectedArticles.length > 0 || selectedTier !== 'ALL') && (
              <span className="w-5 h-5 rounded-full bg-[#FFD6BA] text-[#4A2B20] text-[10px] font-bold flex items-center justify-center">
                {selectedArticles.length + (selectedTier !== 'ALL' ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#4A2B20] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 bg-white border border-[#FFE8CD] rounded-xl text-xs font-bold text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

      </div>

      {/* Active Filter Pills */}
      {(selectedArticles.length > 0 || selectedTier !== 'ALL' || activeSubCategory !== 'All' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-600 font-medium mr-1">Active filters:</span>

          {selectedTier !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#FFD6BA] text-[#4A2B20] px-3 py-1 rounded-full shadow-sm border border-[#FFE8CD]">
              Tier: {selectedTier}
              <button onClick={() => setSelectedTier('ALL')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedArticles.map((art) => (
            <span key={art} className="inline-flex items-center gap-1 text-xs font-bold bg-[#FFE8CD] text-[#4A2B20] px-3 py-1 rounded-full shadow-sm border border-[#FFD6BA]">
              {art}
              <button onClick={() => toggleArticle(art)}><X className="w-3 h-3 ml-1" /></button>
            </span>
          ))}

          <button
            onClick={resetFilters}
            className="text-xs text-rose-700 hover:underline font-bold flex items-center gap-1 ml-2"
          >
            <RefreshCcw className="w-3 h-3" /> Clear All Filters
          </button>
        </div>
      )}

      {/* Main Catalog Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar: Clean & User-Friendly Organized Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#FFE8CD] sticky top-40 shadow-sm">
          
          {/* Luxury Tier Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[#6B3E30] uppercase tracking-wider block">Luxury Tier</label>
              {selectedTier !== 'ALL' && (
                <button onClick={() => setSelectedTier('ALL')} className="text-[10px] text-rose-700 font-bold hover:underline">
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTier('ALL')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedTier === 'ALL'
                    ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA] shadow-sm'
                    : 'bg-[#FFF2EB] text-stone-700 border-stone-200 hover:bg-[#FFE8CD]'
                }`}
              >
                All Tiers
              </button>

              {tierGradesList.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSelectedTier(selectedTier === t ? 'ALL' : t)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    selectedTier === t
                      ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA] shadow-sm'
                      : 'bg-[#FFF2EB] text-stone-700 border-stone-200 hover:bg-[#FFE8CD]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search inside Filters */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[#6B3E30] uppercase tracking-wider block">Article Weave Types</label>
              {selectedArticles.length > 0 && (
                <button
                  type="button"
                  onClick={() => { setSelectedArticles([]); setActiveWeaveGroup('ALL'); }}
                  className="text-[10px] text-rose-700 font-bold hover:underline"
                >
                  Clear ({selectedArticles.length})
                </button>
              )}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={filterArticleSearch}
                onChange={(e) => setFilterArticleSearch(e.target.value)}
                placeholder="Filter 15 articles..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-xs text-[#4A2B20] focus:ring-1 focus:ring-[#FFD6BA]"
              />
            </div>
            
            {/* Grouped Accordions */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {articleCategories.map((cat) => {
                const filteredItems = cat.items.filter((item) =>
                  item.toLowerCase().includes(filterArticleSearch.toLowerCase())
                );

                if (filterArticleSearch && filteredItems.length === 0) return null;

                const isExpanded = expandedGroups[cat.group] ?? true;
                const activeInGroup = cat.items.filter((item) => selectedArticles.includes(item)).length;

                return (
                  <div key={cat.group} className="border border-[#FFE8CD] rounded-2xl p-3 bg-[#FFF2EB]/40 space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleGroupExpand(cat.group)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <span className="text-xs font-bold text-[#4A2B20] flex items-center gap-1.5">
                        {cat.group}
                        {activeInGroup > 0 && (
                          <span className="w-4 h-4 rounded-full bg-[#FFD6BA] text-[#4A2B20] text-[9px] font-extrabold flex items-center justify-center">
                            {activeInGroup}
                          </span>
                        )}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
                    </button>

                    {isExpanded && (
                      <div className="space-y-1.5 pt-1">
                        {filteredItems.map((art) => {
                          const isSelected = selectedArticles.includes(art);
                          return (
                            <button
                              type="button"
                              key={art}
                              onClick={() => toggleArticle(art)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition text-left ${
                                isSelected
                                  ? 'bg-[#FFD6BA] text-[#4A2B20] font-bold shadow-sm'
                                  : 'bg-white text-stone-700 hover:bg-[#FFE8CD]'
                              }`}
                            >
                              <span className="truncate">{art}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#4A2B20]" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Product Grid Area with Morph Transition */}
        <main className="lg:col-span-3 min-h-[500px]">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-[#FFE8CD] space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-[#FFE8CD] rounded-full flex items-center justify-center mx-auto text-[#4A2B20]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B20]">No matching shawls found</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                Try clearing selected article filters or tier selections to view our full collection.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold uppercase rounded-xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD] shadow"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>

      </div>

      {/* Mobile Filter Drawer with Compact Organized Tabs */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div onClick={() => setMobileFiltersOpen(false)} className="absolute inset-0 bg-[#4A2B20]/60 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#FFF2EB] p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#FFE8CD] pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#4A2B20]">Filter Shawls</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}><X className="w-6 h-6 text-[#4A2B20]" /></button>
                </div>
                
                {/* Tiers in Mobile */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6B3E30] uppercase tracking-wider block">Luxury Tier</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTier('ALL')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                        selectedTier === 'ALL' ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA]' : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      All Tiers
                    </button>
                    {tierGradesList.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSelectedTier(selectedTier === t ? 'ALL' : t)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                          selectedTier === t ? 'bg-[#FFD6BA] text-[#4A2B20] border-[#FFD6BA]' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 15 Articles in Mobile Accordion */}
                <div className="space-y-3 pt-2 border-t border-[#FFE8CD]">
                  <label className="text-xs font-bold text-[#6B3E30] uppercase tracking-wider block">Article Weave Types</label>
                  {articleCategories.map((cat) => (
                    <div key={cat.group} className="space-y-2 border border-[#FFE8CD] p-3 rounded-2xl bg-white">
                      <span className="text-xs font-bold text-[#4A2B20] block">{cat.group}</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {cat.items.map((art) => {
                          const isSelected = selectedArticles.includes(art);
                          return (
                            <button
                              type="button"
                              key={art}
                              onClick={() => toggleArticle(art)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                                isSelected ? 'bg-[#FFD6BA] text-[#4A2B20]' : 'bg-[#FFF2EB] text-stone-700'
                              }`}
                            >
                              <span>{art}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#4A2B20]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="pt-6 border-t border-[#FFE8CD] space-y-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl text-sm shadow-md border border-[#FFE8CD]"
                >
                  Show Matching Shawls ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
