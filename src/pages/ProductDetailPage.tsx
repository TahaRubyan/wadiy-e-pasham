import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, Check, Sparkles, Feather, FileText, Info, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';
import { ColorOption } from '../types/product';
import { CartToast } from '../components/cart/CartToast';

export const ProductDetailPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.handle === handle);

  // Dynamic random viewers count between 30 and 100
  const liveViewersCount = useMemo(() => Math.floor(30 + Math.random() * 71), [handle]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#4A2B20]">Shawl Article Not Found</h2>
        <p className="text-stone-600">The article you are looking for does not exist or has been moved.</p>
        <Link to="/shop" className="inline-block px-6 py-3 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl text-sm">
          Return to Shawls Collection
        </Link>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { name: 'Default', hex: '#FFD6BA' });
  const [selectedImage, setSelectedImage] = useState<string>(
    (product.colors[0] && product.colors[0].image) || product.images[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [activeSopTab, setActiveSopTab] = useState<'washing' | 'storage' | 'steaming' | 'authenticity'>('washing');

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    if (color.image) {
      setSelectedImage(color.image);
    }
  };

  const handleAddToCart = () => {
    if (!product.isOutOfStock) {
      addToCart(product, selectedColor, quantity);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && (p.subCategory === product.subCategory || p.tierGrade === product.tierGrade)
  ).slice(0, 3);

  const sopTabs = [
    { id: 'washing', label: 'Washing SOPs' },
    { id: 'storage', label: 'Storage & Care' },
    { id: 'steaming', label: 'Steaming Rules' },
    { id: 'authenticity', label: 'Authenticity Cert' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 bg-[#FFF2EB]">
      
      <CartToast />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-medium text-stone-500">
        <Link to="/" className="hover:text-[#4A2B20]">Home</Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <Link to="/shop" className="hover:text-[#4A2B20]">Shawls Collection</Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-[#4A2B20] font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#FFE8CD]/60 border border-[#FFE8CD] shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.title}
                onError={() => setSelectedImage(product.images[1] || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80')}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full object-cover ${product.isOutOfStock ? 'grayscale opacity-75' : ''}`}
              />
            </AnimatePresence>

            {product.isOutOfStock ? (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                Out of Stock
              </span>
            ) : (
              <span className="absolute top-4 left-4 bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow border border-[#FFE8CD] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {product.tierGrade || 'Platinum'} Tier
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition ${
                  selectedImage === img ? 'border-[#FFD6BA] scale-105 shadow-md' : 'border-[#FFE8CD] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details & Order Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Live Social Proof Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFDCDC] text-[#4A2B20] text-xs font-bold rounded-full mb-3 shadow-sm border border-[#FFD6BA]/40">
              <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>{liveViewersCount} people are currently viewing this article</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-md uppercase tracking-wider border border-[#FFD6BA]">
                {product.articleType || product.fabric}
              </span>
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                {product.subCategory} Collection
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20] leading-tight">
              {product.title}
            </h1>
            
            <p className="text-sm text-stone-500 mt-1 font-medium">{product.subtitle}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#4A2B20]">
                PKR {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-stone-400 line-through">
                  PKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs bg-[#FFDCDC] text-[#4A2B20] font-bold px-2.5 py-0.5 rounded">
                  Save PKR {(product.compareAtPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed border-t border-b border-[#FFE8CD] py-4">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-stone-700">Select Color Variant:</span>
                <span className="text-[#4A2B20] font-extrabold">{selectedColor.name}</span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition border-2 ${
                      selectedColor.name === color.name ? 'border-[#4A2B20] scale-110 shadow-lg ring-2 ring-[#FFD6BA]' : 'border-stone-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <Check className={`w-4 h-4 ${['#FFFCE1', '#FFDDB0', '#FFF2EB', '#FFDCDC'].includes(color.hex) ? 'text-[#4A2B20]' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Bag CTA */}
          <div className="space-y-4 pt-2">
            {product.isOutOfStock ? (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold rounded-2xl text-center">
                This article is currently Out of Stock. Please check back soon or contact concierge.
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-[#FFE8CD] rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-stone-600 hover:bg-[#FFE8CD] rounded-l-xl font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-[#4A2B20]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-stone-600 hover:bg-[#FFE8CD] rounded-r-xl font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-sm rounded-xl hover:bg-[#FFE8CD] transition shadow-lg flex items-center justify-center gap-2 border border-[#FFE8CD]"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Bag ({selectedColor.name})
                </button>
              </div>
            )}

            {addedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Added {quantity} item(s) in {selectedColor.name} to your shopping bag!
              </div>
            )}
          </div>

          {/* Specifications Grid */}
          <div className="bg-white rounded-2xl p-5 border border-[#FFE8CD] space-y-3 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#4A2B20] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#4A2B20]" /> Article Specifications
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
              <div className="p-2 bg-[#FFF2EB] rounded-lg">
                <span className="text-stone-500 block">Article Type:</span>
                <span className="font-bold text-[#4A2B20]">{product.articleType || product.fabric}</span>
              </div>
              <div className="p-2 bg-[#FFF2EB] rounded-lg">
                <span className="text-stone-500 block">Tier Grade:</span>
                <span className="font-bold text-[#6B3E30]">{product.tierGrade || 'Platinum'} Tier</span>
              </div>
              <div className="p-2 bg-[#FFF2EB] rounded-lg">
                <span className="text-stone-500 block">Dimensions:</span>
                <span className="font-bold text-[#4A2B20]">{product.dimensions}</span>
              </div>
              <div className="p-2 bg-[#FFF2EB] rounded-lg">
                <span className="text-stone-500 block">Weight:</span>
                <span className="font-bold text-[#4A2B20]">{product.weight}</span>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="space-y-2.5 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4A2B20]" />
              <span>Certified Handwoven Craftsmanship with Authenticity Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#4A2B20]" />
              <span>Free Express Delivery Nationwide & Cash on Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#4A2B20]" />
              <span>7-Day Easy Exchange Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* ITEM SOPs SECTION */}
      <section className="bg-[#FFE8CD]/60 rounded-3xl p-8 sm:p-10 border border-[#FFD6BA] space-y-6 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A2B20] flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Item Standard Operating Procedures (SOPs)
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">
            Care, Storage & Authenticity Protocol
          </h2>
        </div>

        {/* Tabbed SOP Controls */}
        <div className="flex flex-wrap gap-2 border-b border-[#FFD6BA] pb-4">
          {sopTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSopTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSopTab === tab.id
                  ? 'bg-[#FFD6BA] text-[#4A2B20] shadow-sm'
                  : 'bg-white text-[#4A2B20] hover:bg-[#FFE8CD] border border-[#FFE8CD]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SOP Content display */}
        <div className="bg-white p-6 rounded-2xl border border-[#FFE8CD] shadow-sm min-h-[150px]">
          {activeSopTab === 'washing' && (
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#4A2B20] flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#4A2B20]" /> Washing & Cleaning SOPs
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {product.sops.washing.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFD6BA] text-[#4A2B20] font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSopTab === 'storage' && (
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#4A2B20] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4A2B20]" /> Storage & Preservation SOPs
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {product.sops.storage.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFE8CD] text-[#4A2B20] font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSopTab === 'steaming' && (
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#4A2B20] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#4A2B20]" /> Steaming SOPs
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {product.sops.steaming.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFDCDC] text-[#4A2B20] font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSopTab === 'authenticity' && (
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#4A2B20] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4A2B20]" /> Authenticity Verification SOPs
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {product.sops.authenticity.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFD6BA] text-[#4A2B20] font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </section>

      {/* Related Shawls Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#FFE8CD]">
          <h3 className="font-serif text-2xl font-bold text-[#4A2B20] mb-8">You May Also Admire</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
