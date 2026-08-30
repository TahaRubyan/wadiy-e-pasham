import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Truck, CheckCircle2, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types/order';

export const ParcelTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('order') || searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { orders } = useOrders();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === q ||
        (o.courierTrackingId && o.courierTrackingId.toLowerCase() === q) ||
        o.customer.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
        o.customer.email.toLowerCase() === q
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Pending Verification':
        return 1;
      case 'Confirmed':
        return 2;
      case 'Dispatched':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 2;
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received & Logged' },
    { title: 'Confirmed', desc: 'Craft Inspection' },
    { title: 'In Transit', desc: 'Dispatched via Courier' },
    { title: 'Delivered', desc: 'Received at Doorstep' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-[#FFF2EB]">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-xl mx-auto space-y-3"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#4A2B20] bg-[#FFE8CD] px-3.5 py-1 rounded-full inline-block border border-[#FFD6BA]">
          Real-Time Courier Tracking
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20]">
          Track Your WADIY-E-PASHAM Parcel
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Enter your Order Number (e.g. <span className="font-bold text-[#4A2B20]">#KHS-2026-101</span>), Courier Tracking ID, or Phone Number to view live location updates.
        </p>
      </motion.div>

      {/* Search Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFE8CD] shadow-md max-w-xl mx-auto space-y-4"
      >
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#4A2B20] absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order # or Tracking ID (e.g. #KHS-2026-101)"
              className="w-full pl-10 pr-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm font-semibold text-[#4A2B20] focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow flex items-center gap-1.5 text-sm border border-[#FFE8CD]"
          >
            Track <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>

      {/* SEARCH RESULT DISPLAY */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {!searchedOrder ? (
            <div className="bg-white p-8 rounded-3xl border border-[#FFE8CD] text-center space-y-3 max-w-xl mx-auto shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A2B20]">Order Not Found</h3>
              <p className="text-xs text-stone-500">
                No active parcel found for "{query}". Please check your order confirmation details or contact support.
              </p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-[#FFE8CD] shadow-xl space-y-8 max-w-2xl mx-auto">
              
              {/* Top Order Details Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#FFE8CD]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B3E30] block">Parcel Status</span>
                  <h3 className="font-serif text-2xl font-bold text-[#4A2B20]">{searchedOrder.orderNumber}</h3>
                  <p className="text-xs text-stone-500">
                    Recipient: <span className="font-semibold text-[#4A2B20]">{searchedOrder.customer.fullName}</span> ({searchedOrder.customer.city})
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-bold text-xs px-3 py-1 rounded-full bg-[#FFD6BA] text-[#4A2B20] shadow border border-[#FFE8CD]">
                    <Truck className="w-3.5 h-3.5" /> {searchedOrder.status}
                  </span>
                  {searchedOrder.courierTrackingId && (
                    <span className="block text-[11px] font-mono font-bold text-[#4A2B20] mt-1 bg-[#FFE8CD] px-2 py-0.5 rounded border border-[#FFD6BA]">
                      {searchedOrder.courierPartner || 'TCS'}: {searchedOrder.courierTrackingId}
                    </span>
                  )}
                </div>
              </div>

              {/* REAL-TIME LOCATION BOX UPDATED DIRECTLY FROM ADMIN PANEL */}
              <div className="p-4 bg-[#FFE8CD] rounded-2xl border border-[#FFD6BA] flex items-start gap-3 text-xs text-[#4A2B20]">
                <MapPin className="w-5 h-5 text-[#4A2B20] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-[#6B3E30] uppercase tracking-wider text-[11px] block">
                    Current Parcel Location (Live Admin Update)
                  </span>
                  <p className="font-semibold text-sm text-[#4A2B20]">
                    {searchedOrder.currentLocation || 'Order Logged & Inspected at Kashmir Workshop — Preparing for Dispatch'}
                  </p>
                  <p className="text-[11px] text-stone-600">
                    Destination: {searchedOrder.customer.address}, {searchedOrder.customer.city}
                  </p>
                </div>
              </div>

              {/* Interactive Timeline Bar */}
              <div className="space-y-4 pt-2">
                <h4 className="font-serif text-sm font-bold text-[#4A2B20]">Dispatch Timeline</h4>

                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {steps.map((s, idx) => {
                    const stepNum = idx + 1;
                    const currentStep = getStatusStep(searchedOrder.status);
                    const isCompleted = stepNum <= currentStep;

                    return (
                      <div key={idx} className="space-y-2">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition ${
                            isCompleted ? 'bg-[#FFD6BA] text-[#4A2B20] shadow border border-[#FFE8CD]' : 'bg-[#FFF2EB] text-stone-400 border border-stone-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#4A2B20]" /> : stepNum}
                        </div>
                        <div className="text-[11px] font-bold text-[#4A2B20] line-clamp-1">{s.title}</div>
                        <div className="text-[9px] text-stone-400 hidden sm:block">{s.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Purchased Items List */}
              <div className="pt-6 border-t border-stone-200 space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#4A2B20]">Parcel Contents</h4>
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF2EB] rounded-xl border border-[#FFE8CD] text-xs">
                    <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-bold text-[#4A2B20]">{item.product.title}</div>
                      <div className="text-[10px] text-stone-500">Color: {item.selectedColor.name} • Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-[#4A2B20]">PKR {(item.product.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              {/* Authenticity Guarantee */}
              <div className="p-3 bg-[#FFF2EB] rounded-xl border border-[#FFE8CD] flex items-center gap-2 text-xs text-[#4A2B20]">
                <ShieldCheck className="w-4 h-4 text-[#4A2B20] flex-shrink-0" />
                <span>Includes 100% Certified Ladakhi Cashmere Purity Hallmark & Ring-Test Provenance.</span>
              </div>

            </div>
          )}
        </motion.div>
      )}

    </div>
  );
};
