import React, { useState } from 'react';
import { X, Mail, Send, Sparkles, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { Order } from '../../types/order';

interface ShareEmailInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ShareEmailInvoiceModal: React.FC<ShareEmailInvoiceModalProps> = ({ order, onClose }) => {
  const [sentNotice, setSentNotice] = useState(false);

  if (!order) return null;

  const emailSubject = `WADIY-E-PASHAM — Official Invoice & Courier Dispatch Confirmation (${order.orderNumber})`;
  
  const itemsText = order.items
    .map(
      (item, idx) =>
        `  ${idx + 1}. ${item.product.title} [${item.selectedColor.name}] — ${item.quantity} pc(s) @ PKR ${item.product.price.toLocaleString()} = PKR ${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const emailBody = `Dear ${order.customer.fullName},

Thank you for your valued patron order with WADIY-E-PASHAM. We are delighted to confirm that your royal handloom shawls have been inspected, authenticated, and scheduled for express courier dispatch.

=======================================================
               OFFICIAL ORDER INVOICE
=======================================================
Order Number     : ${order.orderNumber}
Order Date       : ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Payment Mode     : ${order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
Order Status     : ${order.status}

-------------------------------------------------------
ORDERED SHAWL ARTICLES:
${itemsText}
-------------------------------------------------------
Subtotal         : PKR ${order.subtotal.toLocaleString()}
Courier Shipping : ${order.shippingFee === 0 ? 'FREE EXPRESS COURIER' : `PKR ${order.shippingFee.toLocaleString()}`}
GRAND TOTAL      : PKR ${order.total.toLocaleString()}

-------------------------------------------------------
COURIER DISPATCH & TRACKING INFORMATION:
Courier Partner  : ${order.courierPartner || 'TCS Express'}
Tracking ID      : ${order.courierTrackingId || 'TCS-DISPATCH-CONFIRMED'}
Delivery Address : ${order.customer.address}, ${order.customer.city}
Customer Contact : ${order.customer.phone}
Live Tracking    : https://wadiyepasham.com/track?order=${order.orderNumber}

-------------------------------------------------------
AUTHENTICITY & HANDLOOM PROVENANCE:
• 100% Certified Ladakhi Cashmere & Kashmiri Handloom Wool.
• Passed the Sacred Kashmir Ring-Test with Official Purity Hallmark.
• 7-Day Hassle-Free Exchange Policy.

Atelier Helpline : +92 300 1234567
Support Email    : concierge@wadiyepasham.com
Online Boutique  : https://wadiyepasham.com

With our highest regards,
The Atelier Guild
WADIY-E-PASHAM — Luxury Kashmir Shawls & Stoles
`;

  const handleSendEmail = () => {
    // Construct standard mailto URL without opening blank target tabs
    const mailtoUrl = `mailto:${encodeURIComponent(order.customer.email)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    
    // Direct browser navigation opens the default email client cleanly without blank page
    window.location.href = mailtoUrl;
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white text-[#4A2B20] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#FFE8CD] px-6 py-4 border-b border-[#FFD6BA] flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFD6BA] text-[#4A2B20] rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B3E30] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#4A2B20]" /> Dispatch Notification
              </span>
              <h3 className="font-serif text-lg font-bold text-[#4A2B20]">
                Send Invoice & Dispatch Email to Customer
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFD6BA]/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Courier & Recipient Details */}
        <div className="bg-[#FFF2EB] p-4 border-b border-[#FFE8CD] space-y-2 text-xs flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-stone-500 font-medium">Customer: </span>
              <span className="font-bold text-[#4A2B20]">{order.customer.fullName} &lt;{order.customer.email}&gt;</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs bg-[#FFD6BA] text-[#4A2B20] px-2.5 py-1 rounded-xl border border-[#FFE8CD]">
              <Truck className="w-3.5 h-3.5" />
              <span>{order.courierPartner || 'TCS Express'}: {order.courierTrackingId || 'Assigned'}</span>
            </div>
          </div>
          <div>
            <span className="text-stone-500 font-medium">Subject: </span>
            <span className="font-semibold text-[#4A2B20]">{emailSubject}</span>
          </div>
        </div>

        {/* Formatted Invoice Preview */}
        <div className="p-5 overflow-y-auto flex-1 bg-[#FFFDFB]">
          <pre className="whitespace-pre-wrap font-mono leading-relaxed bg-[#FFF2EB]/50 p-4 rounded-2xl border border-[#FFE8CD] text-xs text-stone-800">
            {emailBody}
          </pre>
        </div>

        {/* Modal Bottom Action (Direct Send Email Action Only) */}
        <div className="bg-[#FFE8CD]/80 px-6 py-4 border-t border-[#FFD6BA] flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-stone-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#4A2B20]" /> Includes Courier Tracking ID & Order Breakdown
          </span>

          <button
            type="button"
            onClick={handleSendEmail}
            className="px-6 py-3 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition shadow-md border border-[#FFE8CD] flex items-center gap-2"
          >
            {sentNotice ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Send className="w-4 h-4" />}
            {sentNotice ? 'Opening Email Client...' : 'Send Invoice Email to Customer'}
          </button>
        </div>

      </div>

    </div>
  );
};
