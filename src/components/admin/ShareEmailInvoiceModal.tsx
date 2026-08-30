import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Printer, Sparkles, Send } from 'lucide-react';
import { Order } from '../../types/order';

interface ShareEmailInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ShareEmailInvoiceModal: React.FC<ShareEmailInvoiceModalProps> = ({ order, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const emailSubject = `WADIY-E-PASHAM — Order Invoice & Courier Dispatch Confirmation (${order.orderNumber})`;
  
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.title} (${item.selectedColor.name}) — ${item.quantity}x @ PKR ${item.product.price.toLocaleString()} = PKR ${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const emailBody = `Dear ${order.customer.fullName},

Thank you for choosing WADIY-E-PASHAM for your authentic Kashmiri handloom collection. We are pleased to confirm that your royal order has been prepared and scheduled for courier dispatch.

==================================================
              OFFICIAL ORDER INVOICE
==================================================
Order Number: ${order.orderNumber}
Order Date: ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Payment Method: ${order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
Order Status: ${order.status}

--------------------------------------------------
ITEMS PURCHASED:
${itemsText}
--------------------------------------------------
Subtotal: PKR ${order.subtotal.toLocaleString()}
Express Shipping: ${order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee.toLocaleString()}`}
GRAND TOTAL: PKR ${order.total.toLocaleString()}

--------------------------------------------------
SHIPPING & COURIER DISPATCH DETAILS:
Customer Name: ${order.customer.fullName}
Delivery Address: ${order.customer.address}, ${order.customer.city}
Contact Number: ${order.customer.phone}
Courier Partner: ${order.courierPartner || 'TCS Express'}
Courier Tracking ID: ${order.courierTrackingId || 'Pending Assignment'}
Live Parcel Tracking: https://wadiyepasham.com/track?q=${order.orderNumber}

--------------------------------------------------
WADIY-E-PASHAM QUALITY & AUTHENTICITY PROMISE:
• 100% Certified High-Altitude Ladakhi Cashmere & Handloom Wool.
• Passed the Sacred Kashmir Ring-Test with Laser-Etched Purity Hologram.
• 7-Day Hassle-Free Exchange Policy.

Need assistance with your delivery?
Helpline / WhatsApp: +92 300 1234567
Email: concierge@wadiyepasham.com
Website: https://wadiyepasham.com

Warm regards,
The Atelier Guild
WADIY-E-PASHAM Luxury Shawls & Stoles
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenMailClient = () => {
    const mailtoUrl = `mailto:${encodeURIComponent(order.customer.email)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white text-[#4A2B20] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#FFE8CD] px-6 py-4 border-b border-[#FFD6BA] flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFD6BA] text-[#4A2B20] rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B3E30] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#4A2B20]" /> Dispatch Concierge
              </span>
              <h3 className="font-serif text-lg font-bold text-[#4A2B20]">
                Share Invoice & Dispatch Confirmation on Mail
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

        {/* Email Metadata Bar */}
        <div className="bg-[#FFF2EB] p-4 border-b border-[#FFE8CD] space-y-2 text-xs flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-stone-500 font-medium">To Customer: </span>
              <span className="font-bold text-[#4A2B20]">{order.customer.fullName} ({order.customer.email})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Tracking ID: </span>
              <span className="font-mono font-bold bg-[#FFE8CD] px-2 py-0.5 rounded border border-[#FFD6BA] text-[#4A2B20]">
                {order.courierTrackingId || 'TCS-ASSIGNED'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-stone-500 font-medium">Subject: </span>
            <span className="font-semibold text-[#4A2B20]">{emailSubject}</span>
          </div>
        </div>

        {/* Formatted Email Message Preview */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs text-stone-800 bg-[#FFFDFB]">
          <pre className="whitespace-pre-wrap font-sans leading-relaxed bg-[#FFF2EB]/40 p-4 rounded-2xl border border-[#FFE8CD] text-xs sm:text-sm">
            {emailBody}
          </pre>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#FFE8CD]/70 px-6 py-4 border-t border-[#FFD6BA] flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-xl border border-[#FFD6BA] transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Invoice Copied!' : 'Copy to Clipboard'}
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFE8CD] text-[#4A2B20] text-xs font-bold rounded-xl border border-[#FFD6BA] transition shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print Packaging Slip
            </button>
          </div>

          <button
            onClick={handleOpenMailClient}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition flex items-center justify-center gap-2 shadow border border-[#FFE8CD]"
          >
            <Send className="w-4 h-4" /> Send on Mail (Open Client) <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
