import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      
      {/* Modal Wrapper */}
      <div className="bg-white text-[#4A2B20] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative print:shadow-none print:border-none print:rounded-none print:max-w-none print:w-full">
        
        {/* Top Header Actions (Hidden in Print) */}
        <div className="bg-[#FFE8CD] px-6 py-4 border-b border-[#FFD6BA] flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4A2B20]" />
            <h3 className="font-serif text-lg font-bold text-[#4A2B20]">Official Store Invoice & Dispatch Slip</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition flex items-center gap-1.5 shadow border border-[#FFE8CD]"
            >
              <Printer className="w-4 h-4" /> Print A4 Invoice
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/50 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRISTINE A4 INVOICE DOCUMENT */}
        <div id="printable-invoice-a4" className="p-8 sm:p-12 space-y-8 bg-white text-stone-900 print:p-6">
          
          {/* Top Invoice Header */}
          <div className="flex justify-between items-start border-b-2 border-[#4A2B20] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4A2B20]">
                    WADIY-E-PASHAM
                  </h1>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#6B3E30] block">
                    Luxury Kashmir Shawls & Stoles
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-500 pt-2">
                Srinagar Handloom Guilds • Islamabad • Nationwide Express Delivery
              </p>
              <p className="text-xs text-stone-500">
                Helpline: +92 300 1234567 • Email: concierge@wadiyepasham.com
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block bg-[#FFE8CD] text-[#4A2B20] font-bold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider border border-[#FFD6BA]">
                Official Dispatch Slip
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2B20]">
                {order.orderNumber}
              </h2>
              <p className="text-xs text-stone-500">
                Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs font-semibold text-[#4A2B20]">
                Status: {order.status}
              </p>
            </div>
          </div>

          {/* Customer & Courier Dispatch Grid */}
          <div className="grid grid-cols-2 gap-6 bg-[#FFF2EB]/60 p-5 rounded-2xl border border-[#FFE8CD] text-xs">
            <div>
              <span className="font-bold text-[#6B3E30] uppercase tracking-wider block mb-1">
                Billed & Shipped To:
              </span>
              <p className="font-bold text-sm text-[#4A2B20]">{order.customer.fullName}</p>
              <p className="text-stone-700 mt-0.5">{order.customer.address}</p>
              <p className="text-stone-700 font-semibold">{order.customer.city}, Pakistan</p>
              <p className="text-stone-600 mt-1">Phone: {order.customer.phone}</p>
              <p className="text-stone-600">Email: {order.customer.email}</p>
            </div>

            <div className="border-l border-[#FFE8CD] pl-6 space-y-2">
              <span className="font-bold text-[#6B3E30] uppercase tracking-wider block mb-1">
                Courier & Payment Info:
              </span>
              <div>
                <span className="text-stone-500">Payment Mode: </span>
                <span className="font-bold text-[#4A2B20]">
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
                </span>
              </div>
              <div>
                <span className="text-stone-500">Courier Partner: </span>
                <span className="font-bold text-[#4A2B20]">{order.courierPartner || 'TCS Express'}</span>
              </div>
              <div>
                <span className="text-stone-500">Courier Tracking ID: </span>
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#FFD6BA] text-[#4A2B20]">
                  {order.courierTrackingId || 'DISPATCH-CONFIRMED'}
                </span>
              </div>
              {order.customer.bankReferenceCode && (
                <div>
                  <span className="text-stone-500">Bank Ref: </span>
                  <span className="font-mono font-bold text-stone-800">{order.customer.bankReferenceCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Shawls Table */}
          <div className="space-y-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Article Title & Weave</th>
                  <th className="py-2.5 px-2">Selected Shade</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-2 text-right">Unit Price</th>
                  <th className="py-2.5 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-stone-800">
                    <td className="py-3 px-2 font-bold">{idx + 1}</td>
                    <td className="py-3 px-2">
                      <span className="font-serif font-bold text-sm text-[#4A2B20] block">{item.product.title}</span>
                      <span className="text-[10px] text-stone-500">{item.product.fabric} • {item.product.tierGrade} Tier</span>
                    </td>
                    <td className="py-3 px-2 font-medium">{item.selectedColor.name}</td>
                    <td className="py-3 px-2 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-2 text-right">PKR {item.product.price.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right font-bold text-[#4A2B20]">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Summary */}
          <div className="flex justify-end pt-4 border-t border-stone-200">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-800">PKR {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Express Courier Shipping:</span>
                <span className="font-semibold text-emerald-800">
                  {order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#4A2B20] pt-2 border-t-2 border-[#4A2B20]">
                <span>Grand Total:</span>
                <span className="font-serif text-base">PKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Authenticity Hallmark & Signature Stamp */}
          <div className="pt-8 border-t border-stone-200 grid grid-cols-2 gap-8 items-end text-xs">
            <div className="space-y-1 text-stone-600">
              <p className="font-bold text-[#4A2B20] uppercase tracking-wider text-[11px]">
                ✦ WADIY-E-PASHAM Hallmark of Provenance
              </p>
              <p className="text-[11px] leading-relaxed">
                Certified 100% authentic Ladakhi high-altitude underfleece. Inspected and hand-stamped in Srinagar.
              </p>
            </div>

            <div className="text-right space-y-6">
              <div className="h-10 border-b border-stone-400 inline-block w-44" />
              <p className="text-[11px] font-bold text-stone-700 uppercase tracking-widest">
                Authorized Atelier Dispatcher
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
