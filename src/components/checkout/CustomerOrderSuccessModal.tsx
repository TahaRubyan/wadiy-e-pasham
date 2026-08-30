import React from 'react';
import { X, CheckCircle2, Package, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '../../types/order';

interface CustomerOrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const CustomerOrderSuccessModal: React.FC<CustomerOrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-md flex items-center justify-center p-4">
      
      <div className="bg-white text-[#4A2B20] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border-2 border-[#FFD6BA] relative p-6 sm:p-8 space-y-6 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-[#4A2B20] hover:bg-[#FFE8CD] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Royal Success Icon */}
        <div className="w-16 h-16 bg-[#FFE8CD] rounded-full flex items-center justify-center mx-auto border-2 border-[#FFD6BA] shadow-inner text-[#4A2B20]">
          <CheckCircle2 className="w-8 h-8 text-[#4A2B20]" />
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B3E30] bg-[#FFD6BA] px-3 py-0.5 rounded-full inline-block">
            Order Confirmed
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#4A2B20]">
            Thank You, {order.customer.fullName}!
          </h3>
          <p className="text-xs text-stone-600">
            Your handcrafted royal shawl order has been placed successfully.
          </p>
        </div>

        {/* Order Card Summary */}
        <div className="bg-[#FFF2EB] p-4 rounded-2xl border border-[#FFE8CD] text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#FFE8CD]">
            <span className="text-stone-500 font-medium">Order Number</span>
            <span className="font-serif font-bold text-sm text-[#4A2B20]">{order.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#FFE8CD]">
            <span className="text-stone-500 font-medium">Payment Mode</span>
            <span className="font-bold text-[#4A2B20]">
              {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#FFE8CD]">
            <span className="text-stone-500 font-medium">Total Amount</span>
            <span className="font-bold text-[#4A2B20] font-serif text-sm">PKR {order.total.toLocaleString()}</span>
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-stone-500 font-medium block">Delivery Destination</span>
            <p className="font-semibold text-[#4A2B20] leading-snug">
              {order.customer.address}, {order.customer.city}
            </p>
          </div>
        </div>

        {/* Trust Note */}
        <div className="p-3 bg-[#FFE8CD]/60 rounded-xl border border-[#FFD6BA] text-[11px] text-stone-700 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#4A2B20] flex-shrink-0" />
          <span>Accompanied by authentic Kashmir Handloom Hallmark & Ring-Test certification.</span>
        </div>

        {/* Actions (Customer has Track Parcel + Continue Shopping - NO PRINT OPTION) */}
        <div className="space-y-2 pt-2">
          <Link
            to={`/track?q=${order.orderNumber}`}
            onClick={onClose}
            className="w-full py-3.5 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-2xl hover:bg-[#FFE8CD] transition shadow-md flex items-center justify-center gap-2 text-xs border border-[#FFE8CD]"
          >
            <Package className="w-4 h-4" /> Track Live Parcel Status
          </Link>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white text-stone-700 text-xs font-bold rounded-xl border border-stone-200 hover:bg-stone-50 transition"
          >
            Continue Browsing Collection
          </button>
        </div>

      </div>

    </div>
  );
};
