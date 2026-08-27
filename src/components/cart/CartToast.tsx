import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartToast: React.FC = () => {
  const { toastData, dismissToast, openCart } = useCart();

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toastData, dismissToast]);

  return (
    <AnimatePresence>
      {toastData && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-24 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#4A2B20] text-stone-100 rounded-2xl p-4 shadow-2xl border border-[#FFD6BA] backdrop-blur-md"
        >
          <div className="flex justify-between items-start mb-2 pb-2 border-b border-[#FFD6BA]/30">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD6BA] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#FFD6BA]" /> Item Added to Bag
            </div>
            <button
              onClick={dismissToast}
              className="text-stone-300 hover:text-white p-1 transition"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3.5 items-center">
            <img
              src={toastData.item.selectedColor.image || toastData.item.product.images[0]}
              alt={toastData.item.product.title}
              className="w-16 h-16 object-cover rounded-xl border border-stone-600 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-serif font-bold text-white truncate">
                {toastData.item.product.title}
              </h5>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-stone-300">Color:</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-200 bg-[#6B3E30] px-2 py-0.5 rounded border border-stone-600">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-stone-400"
                    style={{ backgroundColor: toastData.item.selectedColor.hex }}
                  />
                  {toastData.item.selectedColor.name}
                </span>
              </div>

              <div className="text-xs font-bold text-[#FFD6BA] mt-1">
                PKR {(toastData.item.product.price * toastData.item.quantity).toLocaleString()}
                {toastData.item.quantity > 1 && (
                  <span className="text-stone-300 font-normal ml-1">
                    ({toastData.item.quantity}x)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2 flex gap-2">
            <button
              onClick={() => {
                dismissToast();
                openCart();
              }}
              className="w-full py-2 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition flex items-center justify-center gap-1.5 shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> View Shopping Bag <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
