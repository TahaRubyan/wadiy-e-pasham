import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { ShawlProduct } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: ShawlProduct;
  onQuickView?: (product: ShawlProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState<string>(product.images[0] || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.isOutOfStock) {
      addToCart(product, product.colors[0]);
    }
  };

  const handleImageError = () => {
    // If local image not found, fallback to Unsplash photo
    if (product.images[1]) {
      setImgSrc(product.images[1]);
    } else {
      setImgSrc('https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80');
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#FFE8CD] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#FFD6BA] transition-all duration-300 flex flex-col h-full relative">
      
      {/* Image container */}
      <Link to={`/shop/${product.handle}`} className="relative aspect-[3/4] overflow-hidden bg-[#FFF2EB] block">
        <img
          src={imgSrc}
          alt={product.title}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            product.isOutOfStock ? 'grayscale opacity-75' : ''
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isOutOfStock ? (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow">
              Out of Stock
            </span>
          ) : (
            <>
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#FFD6BA] text-[#4A2B20] rounded-md shadow flex items-center gap-1 border border-[#FFE8CD]">
                <Sparkles className="w-3 h-3 text-[#4A2B20]" /> {product.tierGrade || 'Platinum'} Tier
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#FFDCDC] text-[#4A2B20] rounded-md shadow">
                  {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                </span>
              )}
            </>
          )}
        </div>

        {/* Fabric Tag */}
        <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
          <span className="px-2.5 py-1 text-xs font-semibold bg-white/95 backdrop-blur-md text-[#4A2B20] rounded-lg shadow-sm border border-white/60">
            {product.articleType || product.fabric}
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        {!product.isOutOfStock && (
          <div className="absolute inset-0 bg-[#4A2B20]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="p-3 bg-white text-[#4A2B20] rounded-full hover:bg-[#FFD6BA] transition transform hover:scale-110 shadow-lg"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleQuickAdd}
              className="px-4 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-full hover:bg-[#FFE8CD] transition flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
            </button>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-stone-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[11px] text-stone-500 font-medium ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>

          <Link to={`/shop/${product.handle}`} className="block group-hover:text-[#6B3E30] transition">
            <h3 className="font-serif text-lg font-bold text-[#4A2B20] leading-snug line-clamp-1">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-medium">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Details Link */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#4A2B20]">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through">
                PKR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            to={`/shop/${product.handle}`}
            className="text-xs font-bold text-[#4A2B20] hover:text-[#6B3E30] transition uppercase tracking-wider"
          >
            Details →
          </Link>
        </div>

      </div>
    </div>
  );
};
