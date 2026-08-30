import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckoutModal } from '../checkout/CheckoutModal';
import { CustomerOrderSuccessModal } from '../checkout/CustomerOrderSuccessModal';
import { Order } from '../../types/order';

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, freeShippingThreshold } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleOrderPlaced = (order: Order) => {
    setCheckoutModalOpen(false);
    setCompletedOrder(order);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Smooth Backdrop Blur Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeCart}
              className="absolute inset-0 bg-[#4A2B20]/60 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              {/* Smooth Slide-In Drawer Animation */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="p-6 bg-[#FFE8CD] border-b border-[#FFD6BA] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#4A2B20]" />
                      <h3 className="font-serif text-xl font-bold text-[#4A2B20]">Your Shopping Bag</h3>
                      <span className="text-xs bg-[#FFD6BA] text-[#4A2B20] font-bold px-2.5 py-0.5 rounded-full border border-[#FFE8CD]">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <button
                      onClick={closeCart}
                      className="p-1.5 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/40 transition"
                      aria-label="Close cart"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Shipping Progress Bar */}
                  <div className="bg-[#FFF2EB] px-6 py-3 border-b border-[#FFE8CD]">
                    {amountNeeded > 0 ? (
                      <p className="text-xs text-stone-700 font-medium">
                        Add <span className="font-bold text-[#4A2B20]">PKR {amountNeeded.toLocaleString()}</span> more for <span className="font-bold text-[#4A2B20]">Free Express Shipping</span>!
                      </p>
                    ) : (
                      <p className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> You qualified for FREE Express Shipping nationwide!
                      </p>
                    )}
                    <div className="w-full bg-[#FFE8CD] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#FFD6BA] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Cart Item List */}
                  <div className="max-h-[55vh] overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-16 space-y-4">
                        <div className="w-16 h-16 bg-[#FFE8CD] text-[#4A2B20] rounded-full flex items-center justify-center mx-auto">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h4 className="font-serif text-lg font-semibold text-[#4A2B20]">Your bag is empty</h4>
                        <p className="text-sm text-stone-500 max-w-xs mx-auto">
                          Explore our WADIY-E-PASHAM collection of handcrafted Pashmina & Wool shawls.
                        </p>
                        <Link
                          to="/shop"
                          onClick={closeCart}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD6BA] text-[#4A2B20] text-sm font-bold rounded-xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD]"
                        >
                          Explore Collection <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-stone-100 bg-[#FFF2EB]/50 hover:bg-[#FFF2EB] transition">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-20 h-24 object-cover rounded-lg border border-stone-200"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h5 className="font-serif text-sm font-bold text-[#4A2B20] line-clamp-1">{item.product.title}</h5>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-stone-400 hover:text-rose-600 transition p-1"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-stone-500 font-medium">Color:</span>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                                  <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.selectedColor.hex }} />
                                  {item.selectedColor.name}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-stone-600 hover:bg-stone-100 rounded-l-lg transition"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 text-xs font-bold text-stone-800">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-stone-600 hover:bg-stone-100 rounded-r-lg transition"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-sm font-bold text-[#4A2B20]">
                                  PKR {(item.product.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Footer Subtotal & Checkout Button */}
                {cart.length > 0 && (
                  <div className="p-6 bg-[#FFE8CD]/80 border-t border-[#FFD6BA] space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-stone-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-[#4A2B20]">PKR {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-stone-600">
                        <span>Estimated Express Shipping</span>
                        <span className="font-semibold text-emerald-700">
                          {amountNeeded === 0 ? 'FREE' : 'Calculated at Checkout'}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#4A2B20] pt-2 border-t border-stone-200">
                        <span>Total</span>
                        <span className="text-[#4A2B20] font-serif text-lg">PKR {subtotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/80 rounded-lg border border-[#FFD6BA] text-xs text-[#4A2B20] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#4A2B20] flex-shrink-0" />
                      <span>Cash on Delivery (COD) and Online Bank Transfer accepted.</span>
                    </div>

                    <button
                      onClick={() => {
                        closeCart();
                        setCheckoutModalOpen(true);
                      }}
                      className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-lg flex items-center justify-center gap-2 text-sm border border-[#FFE8CD]"
                    >
                      Proceed to Checkout (COD / Bank Transfer) <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </motion.aside>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Customer Order Success Confirmation (No Print Option for Customer) */}
      <CustomerOrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </>
  );
};
