import React, { useState } from 'react';
import { X, Mail, Send, Sparkles, CheckCircle2, ShieldCheck, Truck, ExternalLink } from 'lucide-react';
import { Order } from '../../types/order';

interface ShareEmailInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ShareEmailInvoiceModal: React.FC<ShareEmailInvoiceModalProps> = ({ order, onClose }) => {
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  if (!order) return null;

  const emailSubject = `WADIY-E-PASHAM — Official Invoice & Courier Dispatch (${order.orderNumber})`;
  
  const itemsText = order.items
    .map(
      (item, idx) =>
        `  ${idx + 1}. ${item.product.title} [${item.selectedColor.name}] — ${item.quantity} pc(s) @ PKR ${item.product.price.toLocaleString()} = PKR ${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const emailBody = `Dear ${order.customer.fullName},

Thank you for your order with WADIY-E-PASHAM. We are delighted to confirm that your royal handloom shawls have been inspected, authenticated, and scheduled for courier dispatch.

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
Live Parcel Link : https://wadiyepasham.com/track?order=${order.orderNumber}

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

  // Standard Mailto Trigger
  const handleSendMailto = () => {
    const link = document.createElement('a');
    link.href = `mailto:${encodeURIComponent(order.customer.email)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setEmailStatus('Mail client triggered!');
    setTimeout(() => setEmailStatus(null), 3000);
  };

  // Direct Gmail Web Trigger
  const handleOpenGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      order.customer.email
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setEmailStatus('Opening in Gmail Web Compose...');
    setTimeout(() => setEmailStatus(null), 3000);
  };

  // Direct Outlook Web Trigger
  const handleOpenOutlook = () => {
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      order.customer.email
    )}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(outlookUrl, '_blank', 'noopener,noreferrer');
    setEmailStatus('Opening in Outlook Web Compose...');
    setTimeout(() => setEmailStatus(null), 3000);
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

        {/* Courier & Recipient Details */}
        <div className="bg-[#FFF2EB] p-4 border-b border-[#FFE8CD] space-y-2 text-xs flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-stone-500 font-medium">To: </span>
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

        {/* Feedback Alert if triggered */}
        {emailStatus && (
          <div className="bg-emerald-50 text-emerald-800 border-b border-emerald-200 px-4 py-2 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {emailStatus}
          </div>
        )}

        {/* Formatted Invoice Preview */}
        <div className="p-5 overflow-y-auto flex-1 bg-[#FFFDFB]">
          <pre className="whitespace-pre-wrap font-mono leading-relaxed bg-[#FFF2EB]/50 p-4 rounded-2xl border border-[#FFE8CD] text-xs text-stone-800 select-text">
            {emailBody}
          </pre>
        </div>

        {/* Modal Bottom Actions: Dedicated Email Triggers Only */}
        <div className="bg-[#FFE8CD]/80 px-6 py-4 border-t border-[#FFD6BA] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-stone-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#4A2B20]" /> Pre-formatted with Tracking ID #{order.courierTrackingId || 'DISPATCH'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Primary Default Mail App */}
            <button
              type="button"
              onClick={handleSendMailto}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#4A2B20] text-[#FFE8CD] font-bold text-xs rounded-xl hover:bg-[#3B2117] transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send via Default Mail
            </button>

            {/* Direct Gmail Web Fallback */}
            <button
              type="button"
              onClick={handleOpenGmail}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD] shadow flex items-center justify-center gap-1 cursor-pointer"
              title="Open directly in Gmail"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Gmail Web
            </button>

            {/* Direct Outlook Web Fallback */}
            <button
              type="button"
              onClick={handleOpenOutlook}
              className="flex-1 sm:flex-initial px-3 py-2.5 bg-white text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD] shadow flex items-center justify-center gap-1 cursor-pointer"
              title="Open directly in Outlook"
            >
              Outlook
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
