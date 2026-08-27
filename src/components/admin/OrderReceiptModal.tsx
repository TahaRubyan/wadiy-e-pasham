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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/75 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Receipt Modal Card */}
      <div className="bg-white text-[#4A2B20] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative print:shadow-none print:border-none print:rounded-none">
        
        {/* Modal Header Actions */}
        <div className="bg-[#FFE8CD] px-6 py-4 border-b border-[#FFD6BA] flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4A2B20]" />
            <h3 className="font-serif text-lg font-bold text-[#4A2B20]">Official Order Invoice Receipt</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition flex items-center gap-1.5 shadow border border-[#FFE8CD]"
            >
              <Printer className="w-4 h-4" /> Print Receipt
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

        {/* PRINTABLE RECEIPT CONTENT CONTAINER */}
        <div className="p-8 sm:p-10 space-y-8 print:p-0">
          
          {/* Receipt Top Header */}
          <div className="flex justify-between items-start border-b border-stone-200 pb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">WADIY-E-PASHAM</h2>
              <p className="text-xs uppercase tracking-widest font-bold text-[#6B3E30] mt-0.5">Luxury Shawls & Stoles</p>
              <p className="text-xs text-stone-500 mt-2">Srinagar • Islamabad • Nationwide Express</p>
              <p className="text-xs text-stone-500">concierge@wadiyepasham.com</p>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold uppercase text-stone-400">Official Invoice</span>
              <span className="font-serif text-xl font-bold text-[#4A2B20] block">{order.orderNumber}</span>
              <span className="text-xs text-stone-500 block mt-1">
                Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FFF2EB] p-5 rounded-2xl border border-[#FFE8CD]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B3E30] block mb-1">Customer Details</span>
              <h4 className="font-bold text-sm text-[#4A2B20]">{order.customer.fullName}</h4>
              <p className="text-xs text-stone-600 mt-0.5">{order.customer.email}</p>
              <p className="text-xs text-stone-600">{order.customer.phone}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B3E30] block mb-1">Shipping & Payment</span>
              <p className="text-xs text-stone-700 font-medium">{order.customer.address}, {order.customer.city}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-stone-500">Payment:</span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-[#FFD6BA] text-[#4A2B20] border border-[#FFE8CD]">
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
                </span>
              </div>
              {order.customer.bankReferenceCode && (
                <p className="text-[11px] font-semibold text-[#4A2B20] mt-1">
                  Ref Code: {order.customer.bankReferenceCode}
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#4A2B20] mb-3">Purchased Articles</h4>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Color</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Price</th>
                  <th className="py-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-semibold text-[#4A2B20]">
                      <div>{item.product.title}</div>
                      <span className="text-[10px] text-stone-500 font-normal">{item.product.articleType || item.product.fabric} • {item.product.dimensions}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                        <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                    </td>
                    <td className="py-3 text-center font-bold text-[#4A2B20]">{item.quantity}</td>
                    <td className="py-3 text-right font-medium text-stone-600">PKR {item.product.price.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-[#4A2B20]">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Totals Summary */}
          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-[#4A2B20]">PKR {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-emerald-800">
                  {order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#4A2B20] pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="text-[#6B3E30] font-serif text-base">PKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Receipt Footer Notice */}
          <div className="pt-6 border-t border-stone-200 text-[11px] text-stone-500 text-center space-y-1">
            <p className="font-semibold text-[#4A2B20]">Thank you for choosing WADIY-E-PASHAM Shawls.</p>
            <p>Every piece is accompanied by an official Certificate of Authenticity and 7-day exchange guarantee.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
