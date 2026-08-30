import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart, RefreshCw, Truck, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/product/ProductCard';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CartToast } from '../components/cart/CartToast';

export const HomePage: React.FC = () => {
  const { products } = useProducts();

  // Exactly 3 Featured Masterpieces as requested
  const featuredMasterpieces = products.slice(0, 3);

  // New Arrival Articles
  const newArrivalArticles = products.filter((p) => p.isNewArrival).slice(0, 4);

  // Gentle Multi-Layer Parallax scroll hooks
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 25]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, -15]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-hidden bg-[#FFF2EB]">
      
      {/* Floating Cart Toast Notification */}
      <CartToast />

      {/* COMPACT & UPWARD-BALANCED SENIOR HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#FFE8CD]/60 via-[#FFF2EB] to-[#FFDCDC]/30 pt-3 sm:pt-6 pb-8 lg:pt-6 lg:pb-10 border-b border-[#FFE8CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Editorial Copy */}
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD6BA] border border-[#FFE8CD] text-[#4A2B20] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> WADIY-E-PASHAM Royal Collection
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold text-[#4A2B20] leading-[1.14] tracking-tight">
                Embrace the Timeless Elegance of <span className="text-[#6B3E30] italic font-normal">Pure Kashmir Pashmina</span>
              </h1>

              <p className="text-[#4A2B20]/80 text-xs sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Hand-spun from high-altitude Ladakhi Cashmere and handwoven by master artisans. Experience featherlight warmth, silky drape, and heirloom royal heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
                <Link
                  to="/shop"
                  className="px-7 py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-md flex items-center justify-center gap-2 text-sm sm:text-base border border-[#FFE8CD] transform hover:-translate-y-0.5"
                >
                  Explore Shawls Collection <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/track"
                  className="px-7 py-3.5 bg-white text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD]/60 border border-[#FFE8CD] transition shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Track Your Parcel
                </Link>
              </div>

            </motion.div>

            {/* Right Hero Image Composition (Vertically Balanced & Fully Visible) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <motion.div
                style={{ y: heroImageY }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative max-w-sm sm:max-w-md w-full"
              >
                <div className="max-h-[440px] sm:max-h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200 aspect-[4/5]">
                  <img
                    src="/images/shawls/hero_shawl.jpg"
                    alt="WADIY-E-PASHAM Royal Shawl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-[#FFE8CD] flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 bg-[#FFD6BA] rounded-xl text-[#4A2B20]">
                    <Heart className="w-5 h-5 fill-[#4A2B20]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-stone-500">Masterwork</span>
                    <span className="font-serif font-bold text-[#4A2B20] text-xs sm:text-sm">WADIY-E-PASHAM Pashmina</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* REFINED GUARANTEE & TRUST BANNER (COMPACT & SMALLER FONT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[#FFE8CD] shadow-sm"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-[#FFD6BA] text-[#4A2B20] rounded-xl flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#4A2B20]">100% Authentic Pashmina</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug font-medium">
                Sourced directly from certified weavers of Ladakh and Kashmir Valley.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-[#FFE8CD] text-[#4A2B20] rounded-xl flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#4A2B20]">Cash on Delivery & Express Shipping</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug font-medium">
                Doorstep delivery nationwide with Cash on Delivery (COD) options.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-[#FFDCDC] text-[#4A2B20] rounded-xl flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#4A2B20]">7-Day Guarantee</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug font-medium">
                Hassle-free exchange policy if you aren't completely delighted.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3 FEATURED MASTERPIECES ONLY AS REQUESTED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-10 space-y-2"
        >
          <span className="text-[#6B3E30] text-xs font-bold uppercase tracking-widest bg-[#FFE8CD] px-3.5 py-1 rounded-full inline-block border border-[#FFD6BA]">
            Curated Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20]">3 Featured Masterpieces</h2>
          <p className="text-stone-600 text-sm font-medium">Handpicked statement wraps representing our highest weaving standards.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMasterpieces.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* NEW ARRIVAL ARTICLE SECTION */}
      <section className="bg-[#FFE8CD]/50 py-16 border-y border-[#FFE8CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4"
          >
            <div>
              <span className="text-[#6B3E30] font-bold text-xs uppercase tracking-widest">Fresh Looms 2026</span>
              <h2 className="font-serif text-3xl font-bold text-[#4A2B20] mt-1">New Arrival Articles</h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase text-[#4A2B20] hover:text-[#6B3E30] transition flex items-center gap-1 border-b border-[#4A2B20] pb-0.5"
            >
              Explore All Articles →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivalArticles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* REDESIGNED TESTIMONIALS SECTION */}
      <TestimonialsSection />

    </div>
  );
};
