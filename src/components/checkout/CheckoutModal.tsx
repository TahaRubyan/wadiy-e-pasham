import React, { useState } from 'react';
import { X, Building2, Truck, ArrowRight, ShieldCheck, CheckCircle2, Lock, Sparkles, MapPin, Phone, Mail, User, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { PaymentMethod, CustomerDetails, Order } from '../../types/order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderPlaced }) => {
  const { cart, subtotal, clearCart, closeCart } = useCart();
  const { placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Islamabad',
    notes: '',
    bankReferenceCode: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [clearedToast, setClearedToast] = useState(false);

  if (!isOpen) return null;

  const handleClearForm = () => {
    setCustomer({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      notes: '',
      bankReferenceCode: '',
    });
    setClearedToast(true);
    setTimeout(() => setClearedToast(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.phone || !customer.address) {
      alert('Please fill in all required shipping details.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newOrder = placeOrder(customer, cart, paymentMethod);
      clearCart();
      closeCart();
      setSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  const shippingFee = subtotal >= 30000 ? 0 : 500;
  const grandTotal = subtotal + shippingFee;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#FFF2EB] text-[#4A2B20] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border-2 border-[#FFD6BA] relative my-4 sm:my-8 max-h-[94vh] flex flex-col"
        >
          {/* Top Luxury Header */}
          <div className="p-4 sm:p-6 bg-[#FFE8CD] border-b border-[#FFD6BA] flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 bg-[#FFD6BA] text-[#4A2B20] rounded-2xl shadow-sm border border-[#FFE8CD]">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#6B3E30] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#4A2B20]" /> WADIY-E-PASHAM Concierge
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#4A2B20]">
                  Checkout & Shipping Information
                </h3>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearForm}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold rounded-xl border border-[#FFE8CD] transition shadow-sm"
                title="Clear all inputs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Form
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-2xl text-stone-600 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/50 transition border border-transparent hover:border-[#FFD6BA]"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5 text-[#4A2B20]" />
              </button>
            </div>
          </div>

          {/* Cleared Toast Banner */}
          {clearedToast && (
            <div className="bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold px-4 py-2 flex items-center justify-between border-b border-[#FFE8CD]">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Form fields cleared successfully!
              </span>
              <button onClick={() => setClearedToast(false)}><X className="w-3.5 h-3.5" /></button>
            </div>
          )}

          {/* Scrollable Form Body with Custom Scrollbar */}
          <div className="overflow-y-auto p-4 sm:p-8 space-y-6 flex-1 pr-2 sm:pr-4">
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Left Column: Shipping & Payment (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Step 1: Customer Details */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#FFE8CD] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#FFE8CD]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs flex items-center justify-center shadow-sm">1</span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#4A2B20]">Shipping Destination</h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="sm:hidden text-[11px] text-[#6B3E30] font-bold underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Clear
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#6B3E30]" /> Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={customer.fullName}
                          onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                          placeholder="e.g. Dr. Alizeh Shah"
                          className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
                        />
                        {customer.fullName && (
                          <button
                            type="button"
                            onClick={() => setCustomer({ ...customer, fullName: '' })}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#6B3E30]" /> Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="e.g. alizeh@example.com"
                          className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
                        />
                        {customer.email && (
                          <button
                            type="button"
                            onClick={() => setCustomer({ ...customer, email: '' })}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#6B3E30]" /> Phone / WhatsApp (For Delivery) *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
                        />
                        {customer.phone && (
                          <button
                            type="button"
                            onClick={() => setCustomer({ ...customer, phone: '' })}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#6B3E30]" /> City *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          placeholder="e.g. Islamabad / Lahore / Karachi"
                          className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium"
                        />
                        {customer.city && (
                          <button
                            type="button"
                            onClick={() => setCustomer({ ...customer, city: '' })}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A2B20] uppercase tracking-wider block mb-1.5">
                      Complete Street Address (House / Apartment #, Street, Area) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="e.g. House # 14-B, Street 32, Sector F-7/1"
                      className="w-full px-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Step 2: Payment Method Choice */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#FFE8CD] space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#FFE8CD]">
                    <span className="w-6 h-6 rounded-full bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs flex items-center justify-center shadow-sm">2</span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#4A2B20]">Select Payment Method</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 relative ${
                        paymentMethod === 'COD'
                          ? 'border-[#FFD6BA] bg-[#FFE8CD] ring-2 ring-[#FFD6BA] shadow-sm'
                          : 'border-stone-200 bg-white hover:border-[#FFD6BA]'
                      }`}
                    >
                      <div className="p-2 bg-[#FFD6BA] text-[#4A2B20] rounded-xl flex-shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-sm text-[#4A2B20]">Cash on Delivery (COD)</h5>
                        <p className="text-[11px] text-stone-600 mt-0.5">Pay in cash when your parcel arrives at your doorstep.</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('BANK_TRANSFER')}
                      className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 relative ${
                        paymentMethod === 'BANK_TRANSFER'
                          ? 'border-[#FFD6BA] bg-[#FFE8CD] ring-2 ring-[#FFD6BA] shadow-sm'
                          : 'border-stone-200 bg-white hover:border-[#FFD6BA]'
                      }`}
                    >
                      <div className="p-2 bg-[#FFD6BA] text-[#4A2B20] rounded-xl flex-shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-sm text-[#4A2B20]">Online Bank Transfer</h5>
                        <p className="text-[11px] text-stone-600 mt-0.5">Direct transfer to Habib Bank / Meezan Bank.</p>
                      </div>
                    </button>
                  </div>

                  {/* Bank Account Details */}
                  {paymentMethod === 'BANK_TRANSFER' && (
                    <div className="p-4 bg-[#FFE8CD] rounded-2xl border border-[#FFD6BA] text-xs text-[#4A2B20] space-y-2">
                      <span className="font-bold text-[#6B3E30] block uppercase tracking-wider text-[11px]">
                        WADIY-E-PASHAM Official Bank Account
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div><span className="text-stone-500">Bank:</span> Habib Bank Limited (HBL)</div>
                        <div><span className="text-stone-500">Account Title:</span> WADIY-E-PASHAM</div>
                        <div><span className="text-stone-500">Account #:</span> 0042-7900-1849-01</div>
                        <div><span className="text-stone-500">IBAN:</span> PK36HABB00427900184901</div>
                      </div>
                      <div className="pt-2 border-t border-[#FFD6BA]/40">
                        <label className="text-[11px] font-bold text-[#4A2B20] block mb-1">
                          Transfer Reference Code / Transaction ID:
                        </label>
                        <input
                          type="text"
                          value={customer.bankReferenceCode}
                          onChange={(e) => setCustomer({ ...customer, bankReferenceCode: e.target.value })}
                          placeholder="e.g. FT-9948210-HBL"
                          className="w-full px-3 py-2 bg-white border border-[#FFD6BA] rounded-xl text-xs text-[#4A2B20]"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary & Placement (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#FFE8CD] space-y-5 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-[#FFE8CD]">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#4A2B20]">Order Summary</h4>
                    <span className="text-xs font-bold text-[#4A2B20] bg-[#FFE8CD] px-2.5 py-0.5 rounded-full border border-[#FFD6BA]">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Mini Item List */}
                  <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center p-2 rounded-xl bg-[#FFF2EB] border border-[#FFE8CD]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-12 h-14 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-xs font-bold text-[#4A2B20] truncate">{item.product.title}</h5>
                          <p className="text-[10px] text-stone-500 font-medium">{item.selectedColor.name} • {item.quantity}x</p>
                        </div>
                        <span className="text-xs font-bold text-[#4A2B20]">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal Calculation */}
                  <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-[#FFE8CD]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#4A2B20]">PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Courier Express Shipping</span>
                      <span className="font-semibold text-emerald-800">
                        {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#4A2B20] pt-2 border-t border-stone-200">
                      <span>Grand Total</span>
                      <span className="text-[#6B3E30] font-serif text-lg">PKR {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="p-3 bg-[#FFE8CD]/60 rounded-2xl border border-[#FFD6BA] space-y-1.5 text-[11px] text-[#4A2B20]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#4A2B20]" /> 100% Certified Authentic Wool & Pashmina
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4A2B20]" /> 7-Day Hassle-Free Exchange Policy
                    </div>
                  </div>

                  {/* CTAs: Confirm + Cancel */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-lg flex items-center justify-center gap-2 text-sm border border-[#FFE8CD]"
                    >
                      {submitting ? 'Confirming Royal Order...' : 'Confirm Order & View Receipt'} <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleClearForm}
                        className="py-2.5 bg-white text-stone-700 text-xs font-bold rounded-xl border border-stone-200 hover:bg-stone-50 transition flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear All
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="py-2.5 bg-rose-50 text-rose-800 text-xs font-bold rounded-xl border border-rose-200 hover:bg-rose-100 transition flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel Order
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </form>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
