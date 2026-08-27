import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Sparkles, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  itemPurchased: string;
  rating: number;
  quote: string;
  date: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Alizeh Shah',
    location: 'Lahore, Pakistan',
    itemPurchased: 'Royal Ladakhi Pure Wool Stole',
    rating: 5,
    quote: 'The weave quality is breathtaking! Glides effortlessly through a ring, exactly as authentic Pashmina should. Arrived in a gorgeous wooden keepsake box with certified authenticity papers.',
    date: 'Verified Client • Oct 2025',
    highlight: 'Flawless Ring-Pass Purity'
  },
  {
    id: '2',
    name: 'Kamran & Sophia Vane',
    location: 'London, UK',
    itemPurchased: 'Imperial Kani 96 Pure Double Doshala',
    rating: 5,
    quote: 'Purchased for our winter wedding ceremony. The needlework along the border is refined, regal, and masculine. True Kashmir artistry that feels like an heirloom investment.',
    date: 'Verified Client • Nov 2025',
    highlight: 'Masterwork Needle Precision'
  },
  {
    id: '3',
    name: 'Fatima Al-Mansoor',
    location: 'Dubai, UAE',
    itemPurchased: 'Wool 80-20 Single Cashmere Stole',
    rating: 5,
    quote: 'Featherlight yet incredibly warm during cold desert evenings! The rose blush hue is stunning. Express courier shipping took just 3 days to our doorstep in Dubai.',
    date: 'Verified Client • Dec 2025',
    highlight: 'Featherlight & Radiant Tone'
  },
  {
    id: '4',
    name: 'Mrs. Saira Baig',
    location: 'Islamabad, Pakistan',
    itemPurchased: 'Jamawar Heirloom Pure Double Shawl',
    rating: 5,
    quote: 'Cash on Delivery made the purchase completely stress-free. The fabric weight, brocade drape, and reversible two-tone weave feel extraordinarily royal.',
    date: 'Verified Client • Jan 2026',
    highlight: 'Reversible Brocade Posture'
  },
  {
    id: '5',
    name: 'Eleanor Vance',
    location: 'New York, USA',
    itemPurchased: 'Wool 70-30 Single Doshala',
    rating: 5,
    quote: 'The natural softness combined with authentic Kashmiri drape is perfection. I receive compliments every time I wear it to formal gatherings in Manhattan.',
    date: 'Verified Client • Feb 2026',
    highlight: 'Global Haute Couture Drape'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFF2EB] overflow-hidden border-y border-[#FFE8CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A2B20] bg-[#FFD6BA] border border-[#FFE8CD] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2B20]" /> Client Appraisals
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A2B20]">
            Treasured by Connoisseurs Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Discover why art collectors, bridal buyers, and shawl enthusiasts trust WADIY-E-PASHAM for authentic royal weaves.
          </p>
        </div>

        {/* ZIG-ZAG ALTERNATING STAGGERED TESTIMONIALS */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}
              >
                <div className="w-full md:w-10/12 lg:w-9/12 bg-white rounded-3xl p-6 sm:p-8 border border-[#FFE8CD] shadow-md hover:shadow-xl hover:border-[#FFD6BA] transition-all duration-300 relative group">
                  
                  {/* Top Rating & Verification Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500 gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[#6B3E30] bg-[#FFE8CD] px-2.5 py-0.5 rounded-full border border-[#FFD6BA]">
                        {t.highlight}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-[#4A2B20] bg-[#FFF2EB] px-2.5 py-1 rounded-full border border-[#FFE8CD] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Verified Patron
                    </span>
                  </div>

                  {/* Quote Text */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-[#FFD6BA]/40 absolute -top-3 -left-2 -z-0" />
                    <p className="text-[#4A2B20] text-sm sm:text-base italic leading-relaxed font-serif relative z-10 pl-4 border-l-2 border-[#FFD6BA]">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Author & Product Footer */}
                  <div className="pt-4 border-t border-[#FFE8CD] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#4A2B20]">{t.name}</h4>
                      <p className="text-[11px] text-stone-500 font-medium">{t.location} • {t.date}</p>
                    </div>

                    <span className="text-[10px] font-bold text-[#4A2B20] bg-[#FFE8CD] px-3 py-1 rounded-xl border border-[#FFD6BA]">
                      {t.itemPurchased}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
