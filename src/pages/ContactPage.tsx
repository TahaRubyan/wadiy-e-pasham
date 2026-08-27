import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { CartToast } from '../components/cart/CartToast';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#FFF2EB]">
      
      <CartToast />

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4A2B20] bg-[#FFE8CD] px-3.5 py-1 rounded-full inline-block border border-[#FFD6BA]">
          We are here to assist you
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B20]">
          Get in Touch with WADIY-E-PASHAM
        </h1>
        <p className="text-sm text-stone-600">
          Have a question about custom shawl orders, Cash on Delivery limits, or wool care? Send us a message or reach out on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Information & WhatsApp */}
        <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-3xl border border-[#FFE8CD] shadow-sm">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#4A2B20] mb-4">Direct Concierge Support</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Our shawl specialists are available Monday through Saturday to help you select the ideal gift or verify weave details.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FFE8CD] text-[#4A2B20] rounded-2xl border border-[#FFD6BA]">
                <MessageSquare className="w-5 h-5 text-[#4A2B20]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A2B20]">WhatsApp Instant Support</h4>
                <p className="text-xs text-stone-500 mt-0.5">+92 300 1234567</p>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-bold text-[#4A2B20] underline mt-1"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FFE8CD] text-[#4A2B20] rounded-2xl border border-[#FFD6BA]">
                <Mail className="w-5 h-5 text-[#4A2B20]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A2B20]">Email Inquiry</h4>
                <p className="text-xs text-stone-500 mt-0.5">concierge@wadiyepasham.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FFE8CD] text-[#4A2B20] rounded-2xl border border-[#FFD6BA]">
                <Clock className="w-5 h-5 text-[#4A2B20]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A2B20]">Concierge Hours</h4>
                <p className="text-xs text-stone-500 mt-0.5">Mon – Sat: 10:00 AM – 7:00 PM (PKT)</p>
              </div>
            </div>
          </div>

          {/* COD & Shipping Notice */}
          <div className="pt-6 border-t border-[#FFE8CD] text-xs text-stone-600 space-y-1">
            <p className="font-bold text-[#4A2B20]">Nationwide Cash on Delivery (COD)</p>
            <p>Orders are dispatched within 24–48 hours via express courier with real-time tracking.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#FFE8CD] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FFE8CD] text-[#4A2B20] rounded-full flex items-center justify-center mx-auto border border-[#FFD6BA]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#4A2B20]">Message Received!</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you for reaching out, {formData.name}. Our concierge team will respond to your query at <span className="font-bold text-[#4A2B20]">{formData.email}</span> within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold rounded-xl hover:bg-[#FFE8CD] transition border border-[#FFE8CD]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#4A2B20]">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mahmood"
                    className="w-full px-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. tariq@example.com"
                    className="w-full px-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-2">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Cash on Delivery Order">Cash on Delivery Inquiry</option>
                    <option value="Custom Bridal / Ceremonial Order">Custom Bridal / Gift Order</option>
                    <option value="Fabric Authenticity Verification">Authenticity Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#4A2B20] uppercase tracking-wider block mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with our shawl collections?"
                  className="w-full px-4 py-3 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#4A2B20] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-lg flex items-center justify-center gap-2 text-sm border border-[#FFE8CD]"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
