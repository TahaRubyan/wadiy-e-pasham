import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Feather, ShieldCheck, Award, Sparkles, CheckCircle2, Heart, Mountain, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartToast } from '../components/cart/CartToast';

export const AboutPage: React.FC = () => {
  const heritagePillars = [
    {
      number: '01',
      title: 'High-Altitude Ladakhi Cashmere Combing',
      subtitle: 'Nomadic Changthangi Plateau (Above 14,000 ft)',
      desc: 'Hand-combed gently during natural spring molting by nomadic Changpa pastoralists. Only the ultra-fine 12-micron underfleece is selected, delivering extreme warmth without weight.',
      image: '/images/shawls/pashmina_pure.jpg',
      stat: '12.0 Microns',
      statLabel: 'Ultra-Fine Purity',
      specs: ['100% Organic Molting', 'Zero Shear Stress', 'High Thermal Retention'],
      icon: Feather,
    },
    {
      number: '02',
      title: 'Kani Tapestry & Wooden Bobbin Mastery',
      subtitle: 'Line-by-Line Needle Weaving (Tuji & Talim)',
      desc: 'Woven with ancient wooden bobbins according to coded color scripts (Talim) sung rhythmically by master weavers. A single bridal doshala requires 180+ hours of painstaking focus.',
      image: '/images/shawls/kani_tapestry.jpg',
      stat: '180+ Hours',
      statLabel: 'Handloom Labor',
      specs: ['Kanihama Heritage Guild', 'Traditional Wooden Needles', 'Interlocking Weft Technique'],
      icon: Award,
    },
    {
      number: '03',
      title: 'Reversible Jamawar & Heirloom Brocades',
      subtitle: 'Two-Tone Ceremonial Splendor',
      desc: 'Dense double-weaves creating distinct reversible patterns with floral arabesques and Persian paisleys, historically worn by Mughal royalty and preserved across generations.',
      image: '/images/shawls/heirloom_jamawar.jpg',
      stat: 'Dual Weft',
      statLabel: 'Reversible Finish',
      specs: ['Mughal Floral Patterns', 'Supple Formal Drape', 'Generational Keepsake'],
      icon: Heart,
    },
    {
      number: '04',
      title: 'Certified Authenticity & Quality Assurance',
      subtitle: '100% Pure Kashmir Mark Verification',
      desc: 'Every WADIY-E-PASHAM article undergoes strict laboratory inspection for cashmere density, ring-pass fluidity, and knot integrity, accompanied by a certificate of authenticity.',
      image: '/images/shawls/heritage_weaver.jpg',
      stat: '100% Certified',
      statLabel: 'Lab Inspected',
      specs: ['Ring Test Standard', 'Nationwide Cash on Delivery', '7-Day Easy Exchange'],
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden bg-[#FFF2EB]">
      
      <CartToast />

      {/* DISTINCT MAJESTIC ARCHITECTURAL HERITAGE HERO */}
      <section className="relative bg-gradient-to-b from-[#FFE8CD] via-[#FFF2EB] to-[#FFF2EB] pt-14 pb-20 border-b border-[#FFE8CD] overflow-hidden">
        
        {/* Decorative Heritage Watermark */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD6BA] border border-[#FFE8CD] text-[#4A2B20] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> 16th-Century Royal Kashmiri Looms & Ladakh Heritage
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A2B20] leading-tight">
              Centuries of Ladakhi Cashmere Mastery & Handloom Lineage
            </h1>

            <p className="text-[#4A2B20]/80 text-base sm:text-lg leading-relaxed font-medium">
              Woven with sacred rhythm on wooden looms. We honor nomadic Changpa pastoralists and Srinagar's generational master weavers who preserve the world's most coveted royal wraps.
            </p>
          </motion.div>

          {/* 3-Pillar Craft Benchmark Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-3xl border border-[#FFE8CD] shadow-lg"
          >
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFF2EB]">
              <div className="p-3 bg-[#FFD6BA] text-[#4A2B20] rounded-xl">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block font-serif font-bold text-base text-[#4A2B20]">14,000+ Feet</span>
                <span className="text-[11px] text-stone-600 font-medium">Changthangi Plateau Combing</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFF2EB]">
              <div className="p-3 bg-[#FFE8CD] text-[#4A2B20] rounded-xl">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block font-serif font-bold text-base text-[#4A2B20]">180+ Hours</span>
                <span className="text-[11px] text-stone-600 font-medium">Line-by-Line Needle Bobbins</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFF2EB]">
              <div className="p-3 bg-[#FFDCDC] text-[#4A2B20] rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block font-serif font-bold text-base text-[#4A2B20]">100% Certified</span>
                <span className="text-[11px] text-stone-600 font-medium">Laser-Etched Pure Origin Seal</span>
              </div>
            </div>
          </motion.div>

          {/* 3-Image Heritage Visual Mosaic Arch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-6 max-w-5xl mx-auto pt-4 items-center"
          >
            {/* Left Card: Kani Tapestry Needle */}
            <div className="sm:col-span-3 aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-stone-200 hidden sm:block">
              <img
                src="/images/shawls/kani_tapestry.jpg"
                alt="Kani Tapestry Needle Art"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Center Main Card: Master Artisan Loom */}
            <div className="sm:col-span-6 aspect-[4/3] sm:aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200 relative group">
              <img
                src="/images/shawls/heritage_weaver.jpg"
                alt="Master Kashmir Handloom Weaver"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-white/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#6B3E30] block">Master Craftsman Guild</span>
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#4A2B20]">Generational Handloom Artisan, Srinagar</span>
                </div>
                <Award className="w-5 h-5 text-[#4A2B20]" />
              </div>
            </div>

            {/* Right Card: Pure Ladakhi Fleece */}
            <div className="sm:col-span-3 aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-stone-200 hidden sm:block">
              <img
                src="/images/shawls/pashmina_pure.jpg"
                alt="Pure Ladakhi Cashmere Fleece"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ZIG-ZAG VIEW OF HERITAGE & CRAFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A2B20] bg-[#FFE8CD] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-[#FFD6BA]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2B20]" /> Pillars of Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A2B20]">
            The Journey of Royal Kashmir Mastery
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            From nomadic Himalayan ridges to final certified inspection, explore the uncompromising standards of WADIY-E-PASHAM.
          </p>
        </div>

        {/* ZIG-ZAG ALTERNATING ITEMS */}
        <div className="space-y-16 lg:space-y-24">
          {heritagePillars.map((p, idx) => {
            const isEven = idx % 2 === 1;
            const Icon = p.icon;

            return (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Number & Specifications Side */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2 text-left' : 'lg:order-1 text-left'}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#4A2B20] bg-[#FFD6BA] px-5 py-2 rounded-2xl shadow-sm border border-[#FFE8CD]">
                      {p.number}
                    </span>
                    <div className="bg-[#FFE8CD] px-4 py-2 rounded-xl border border-[#FFD6BA]">
                      <span className="block font-serif font-bold text-base text-[#4A2B20]">{p.stat}</span>
                      <span className="text-[10px] uppercase font-bold text-[#6B3E30]">{p.statLabel}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B3E30] block">{p.subtitle}</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20] leading-tight">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                    {p.desc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-[#FFE8CD]">
                    {p.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-bold text-[#4A2B20]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High-Resolution Article Photo & Details Card Side */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#FFE8CD] shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#FFE8CD]/40 relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-white/60 text-[#4A2B20]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </section>

      {/* BRAND STORY SUMMARY BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#4A2B20] text-white rounded-3xl p-8 sm:p-14 border border-[#FFD6BA] shadow-2xl space-y-6 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD6BA] bg-[#6B3E30] px-4 py-1.5 rounded-full inline-block">
            Our Living Promise
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">Preserving Heirloom Royal Kashmir Weaves</h3>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl mx-auto font-medium">
            Every WADIY-E-PASHAM shawl represents hundreds of hours of delicate handloom labor. We stand by 100% authenticity, nationwide Cash on Delivery, and hassle-free 7-day exchanges.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-xl text-sm border border-[#FFE8CD]"
            >
              Browse Full Shawls Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
