import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, Sparkles, Flame, ZoomIn, X, Award, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
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

  // Image Zoom states for Desktop & Mobile
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [mobileZoomModalOpen, setMobileZoomModalOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

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
    }
  };

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && (p.tierGrade === product.tierGrade)
  ).slice(0, 3);

  const sopTabs = [
    { id: 'washing', label: 'Sacred Washing SOP' },
    { id: 'storage', label: 'Heirloom Storage & Care' },
    { id: 'steaming', label: 'Royal Steaming Rules' },
    { id: 'authenticity', label: 'Ring-Test & Hallmark' },
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
        
        {/* Left Image Gallery with Desktop Hover Magnify + Mobile Zoom Button */}
        <div className="lg:col-span-7 space-y-4">
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#FFE8CD]/60 border border-[#FFE8CD] shadow-lg cursor-crosshair group"
          >
            {/* Main Product Image with Smooth Cursor Zoom */}
            <img
              src={selectedImage}
              alt={product.title}
              onError={() => setSelectedImage(product.images[1] || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80')}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: 'scale(2.2)',
                      transition: 'transform 0.1s ease-out',
                    }
                  : { transform: 'scale(1)', transition: 'transform 0.3s ease-out' }
              }
              className={`w-full h-full object-cover select-none ${product.isOutOfStock ? 'grayscale opacity-75' : ''}`}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.isOutOfStock ? (
                <span className="bg-rose-600 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                  Out of Stock
                </span>
              ) : (
                <span className="bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow border border-[#FFE8CD] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {product.tierGrade || 'Platinum'} Tier
                </span>
              )}
            </div>

            {/* Desktop Hover Hint */}
            <div className="hidden lg:flex absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full items-center gap-1.5 pointer-events-none opacity-80 group-hover:opacity-100 transition">
              <ZoomIn className="w-3.5 h-3.5" /> Hover to Inspect Micro-Weave
            </div>

            {/* Mobile Zoom Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileZoomModalOpen(true)}
              className="lg:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#4A2B20] text-xs font-bold px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-lg border border-[#FFE8CD]"
            >
              <ZoomIn className="w-4 h-4 text-[#4A2B20]" /> Tap to Zoom
            </button>
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
                {product.tierGrade} Tier Handloom
              </span>
              {product.micronCount && (
                <span className="px-2.5 py-1 bg-white text-stone-700 text-xs font-semibold rounded-md border border-stone-200">
                  {product.micronCount}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20]">{product.title}</h1>
            <p className="text-sm text-stone-600 font-serif italic mt-1">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#4A2B20]">
                PKR {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-stone-400 line-through">
                  PKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-[#4A2B20]/80 leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          <div className="space-y-3 pt-2 border-t border-[#FFE8CD]">
            <div className="flex justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#4A2B20]">Select Royal Shade</span>
              <span className="font-semibold text-stone-600">{selectedColor.name}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color)}
                    className={`group relative p-1 rounded-full transition ${
                      isSelected ? 'ring-2 ring-[#4A2B20] ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <span
                      className="block w-8 h-8 rounded-full border border-stone-300 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="space-y-4 pt-4 border-t border-[#FFE8CD]">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#FFE8CD] rounded-2xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#4A2B20] hover:bg-[#FFE8CD] rounded-xl transition"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#4A2B20]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#4A2B20] hover:bg-[#FFE8CD] rounded-xl transition"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={product.isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition ${
                  product.isOutOfStock
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#FFD6BA] text-[#4A2B20] hover:bg-[#FFE8CD] border border-[#FFE8CD]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {product.isOutOfStock ? 'Currently Out of Stock' : 'Add to Shopping Bag'}
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#FFE8CD] text-center text-xs text-[#4A2B20]">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-[#4A2B20]" />
              <p className="font-bold text-[11px]">100% Authentic</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 mx-auto text-[#4A2B20]" />
              <p className="font-bold text-[11px]">Express COD</p>
            </div>
            <div className="space-y-1">
              <RefreshCw className="w-5 h-5 mx-auto text-[#4A2B20]" />
              <p className="font-bold text-[11px]">7-Day Policy</p>
            </div>
          </div>

        </div>

      </div>

      {/* EXAGGERATED ROYAL SOPS & CRAFT PROTOCOLS SECTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#FFE8CD] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#FFE8CD]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B3E30] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#4A2B20]" /> Master Loom Protocols
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#4A2B20] mt-1">
              Exaggerated Heirloom Care & Authenticity SOPs
            </h3>
          </div>

          {/* SOP Tabs */}
          <div className="flex flex-wrap gap-2">
            {sopTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSopTab(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
                  activeSopTab === tab.id
                    ? 'bg-[#4A2B20] text-[#FFE8CD] shadow-sm'
                    : 'bg-[#FFF2EB] text-[#4A2B20] hover:bg-[#FFE8CD]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#FFF2EB]/50 p-6 rounded-2xl border border-[#FFE8CD]">
          <ul className="space-y-3">
            {(product.sops?.[activeSopTab] || []).map((sopItem, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4A2B20] font-medium leading-relaxed">
                <span className="p-1 bg-[#FFD6BA] text-[#4A2B20] rounded-full mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span>{sopItem}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED MASTERPIECES */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B3E30]">Companions of Same Tier</span>
            <h3 className="font-serif text-2xl font-bold text-[#4A2B20]">Related Masterpieces</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* FULLSCREEN MOBILE ZOOM MODAL */}
      <AnimatePresence>
        {mobileZoomModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4">
            <div className="flex justify-between items-center text-white pb-2 border-b border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-[#FFD6BA]" /> High-Res Micro-Weave Inspector
              </span>
              <button
                type="button"
                onClick={() => setMobileZoomModalOpen(false)}
                className="p-2 text-white bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-auto py-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-w-none w-[180vw] h-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="text-center text-stone-300 text-xs py-2 bg-black/40 rounded-xl">
              Drag & scroll across image to inspect fine Ladakhi handloom warp & weft threads.
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
