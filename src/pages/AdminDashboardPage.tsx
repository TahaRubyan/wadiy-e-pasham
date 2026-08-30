import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Printer, LogOut, Search, Truck, Building2, Plus, Edit, Trash2, Sparkles, Package, Mail } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Order, OrderStatus } from '../types/order';
import { ShawlProduct } from '../types/product';
import { OrderReceiptModal } from '../components/admin/OrderReceiptModal';
import { ProductManagementModal } from '../components/admin/ProductManagementModal';
import { ShareEmailInvoiceModal } from '../components/admin/ShareEmailInvoiceModal';
import { CartToast } from '../components/cart/CartToast';

export const AdminDashboardPage: React.FC = () => {
  const { orders, isAdminAuthenticated, logoutAdmin, updateOrderStatus, assignCourierTracking } = useOrders();
  const { user, isAdmin, logout } = useAuth();
  const { products, deleteProduct, toggleOutOfStock } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState<Order | null>(null);
  const [selectedOrderForEmail, setSelectedOrderForEmail] = useState<Order | null>(null);
  const [filterPayment, setFilterPayment] = useState<'ALL' | 'COD' | 'BANK_TRANSFER'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Product CRUD Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShawlProduct | null>(null);

  // Parcel Location & Courier Tracking Editing State
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState<string | null>(null);
  const [courierTrackingInput, setCourierTrackingInput] = useState('');
  const [courierPartnerInput, setCourierPartnerInput] = useState('TCS Express');

  const hasAdminAccess = isAdmin || isAdminAuthenticated || user?.role === 'admin';

  if (!hasAdminAccess) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4 bg-[#FFF2EB]">
        <div className="w-16 h-16 bg-[#FFE8CD] text-[#4A2B20] rounded-full flex items-center justify-center mx-auto border border-[#FFD6BA]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#4A2B20]">WADIY-E-PASHAM Admin Access</h2>
        <p className="text-sm text-stone-600">Please sign in to manage articles, stock availability, discounts, and parcel tracking.</p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl text-sm shadow border border-[#FFE8CD]"
        >
          Go to Sign In & Demo Access
        </Link>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    if (filterPayment !== 'ALL' && order.paymentMethod !== filterPayment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchCity = order.customer.city.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchCity) return false;
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const codOrdersCount = orders.filter((o) => o.paymentMethod === 'COD').length;
  const bankTransferCount = orders.filter((o) => o.paymentMethod === 'BANK_TRANSFER').length;

  const handleSaveCourierTracking = (orderId: string) => {
    if (courierTrackingInput.trim()) {
      assignCourierTracking(orderId, courierTrackingInput.trim(), courierPartnerInput);
      setEditingTrackingOrderId(null);
      setCourierTrackingInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2EB]">
      
      <CartToast />

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B3E30] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4A2B20]" /> WADIY-E-PASHAM Admin Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">Management Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              logout();
              logoutAdmin();
              navigate('/login');
            }}
            className="px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-2xl hover:bg-rose-100 border border-rose-200 transition flex items-center gap-1.5 text-xs shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tab Switcher: Orders vs Products & Discounts */}
      <div className="flex gap-3 border-b border-[#FFE8CD] pb-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#FFD6BA] text-[#4A2B20] shadow border border-[#FFE8CD]'
              : 'bg-white text-[#4A2B20] hover:bg-[#FFE8CD]/60 border border-[#FFE8CD]'
          }`}
        >
          <Package className="w-4 h-4" /> Orders & Parcel Tracking ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#FFD6BA] text-[#4A2B20] shadow border border-[#FFE8CD]'
              : 'bg-white text-[#4A2B20] hover:bg-[#FFE8CD]/60 border border-[#FFE8CD]'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Shawls Catalog & Stock Manager ({products.length})
        </button>
      </div>

      {/* TAB 1: ORDERS & PARCEL TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-8">
          {/* Stats Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales Revenue</span>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">
                PKR {totalRevenue.toLocaleString()}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">{orders.length} total orders recorded</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Cash on Delivery (COD)</span>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">
                {codOrdersCount} Orders
              </span>
              <span className="text-[11px] text-[#6B3E30] font-medium flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#4A2B20]" /> Doorstep payment verification
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Online Bank Transfers</span>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#4A2B20]">
                {bankTransferCount} Orders
              </span>
              <span className="text-[11px] text-[#6B3E30] font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#4A2B20]" /> Direct bank transfer logs
              </span>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#4A2B20] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order #, customer name, or city..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500 hidden sm:inline">Filter Payment:</span>
                {[
                  { id: 'ALL', label: 'All Orders' },
                  { id: 'COD', label: 'COD Only' },
                  { id: 'BANK_TRANSFER', label: 'Bank Transfers' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFilterPayment(t.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      filterPayment === t.id
                        ? 'bg-[#FFD6BA] text-[#4A2B20] shadow'
                        : 'bg-[#FFF2EB] text-[#4A2B20] hover:bg-[#FFE8CD] border border-[#FFE8CD]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Logs Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#FFE8CD] text-stone-500 font-bold uppercase tracking-wider bg-[#FFF2EB]">
                    <th className="p-3">Order #</th>
                    <th className="p-3">Customer & City</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Courier Tracking ID</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-500">
                        No orders match your current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FFF2EB]/50 transition">
                        <td className="p-3 font-serif font-bold text-[#4A2B20]">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#4A2B20]">{ord.customer.fullName}</div>
                          <span className="text-[10px] text-stone-500">{ord.customer.city} • {ord.customer.phone}</span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full ${
                            ord.paymentMethod === 'COD'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-[#FFE8CD] text-[#4A2B20] border border-[#FFD6BA]'
                          }`}>
                            {ord.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-[#4A2B20]">
                          PKR {ord.total.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-white border border-[#FFE8CD] rounded-lg px-2 py-1 text-[11px] font-semibold text-[#4A2B20]"
                          >
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        
                        {/* Courier Tracking ID Column with Inline Editor */}
                        <td className="p-3 min-w-[220px]">
                          {editingTrackingOrderId === ord.id ? (
                            <div className="space-y-1.5 bg-[#FFF2EB] p-2 rounded-xl border border-[#FFD6BA]">
                              <div className="flex gap-1">
                                <select
                                  value={courierPartnerInput}
                                  onChange={(e) => setCourierPartnerInput(e.target.value)}
                                  className="text-[10px] bg-white border border-[#FFD6BA] rounded px-1 py-1"
                                >
                                  <option value="TCS Express">TCS Express</option>
                                  <option value="Leopards Courier">Leopards</option>
                                  <option value="Trax Logistics">Trax</option>
                                  <option value="M&P Express">M&P</option>
                                </select>
                                <input
                                  type="text"
                                  value={courierTrackingInput}
                                  onChange={(e) => setCourierTrackingInput(e.target.value)}
                                  placeholder="e.g. TCS-9984120"
                                  className="w-full px-2 py-1 border border-[#FFD6BA] rounded text-[11px]"
                                />
                              </div>
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => setEditingTrackingOrderId(null)}
                                  className="px-2 py-0.5 text-[10px] text-stone-500"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveCourierTracking(ord.id)}
                                  className="px-2.5 py-1 bg-[#FFD6BA] text-[#4A2B20] rounded text-[10px] font-bold"
                                >
                                  Confirm & Dispatch
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-[11px] bg-[#FFF2EB] p-2 rounded-xl border border-[#FFE8CD]">
                              <div>
                                {ord.courierTrackingId ? (
                                  <div>
                                    <span className="font-mono font-bold text-[#4A2B20] block">
                                      {ord.courierTrackingId}
                                    </span>
                                    <span className="text-[10px] text-stone-500">{ord.courierPartner || 'TCS Express'}</span>
                                  </div>
                                ) : (
                                  <span className="text-stone-400 italic text-[10px]">No Tracking Assigned</span>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setEditingTrackingOrderId(ord.id);
                                  setCourierTrackingInput(ord.courierTrackingId || '');
                                  setCourierPartnerInput(ord.courierPartner || 'TCS Express');
                                }}
                                className="text-[10px] text-[#4A2B20] font-bold underline ml-2 hover:text-[#6B3E30]"
                              >
                                {ord.courierTrackingId ? 'Edit' : '+ Add ID'}
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Action Buttons: Share on Mail + View Receipt */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Share on Mail Button */}
                            <button
                              onClick={() => setSelectedOrderForEmail(ord)}
                              title="Share invoice with customer via email"
                              className="px-2.5 py-1.5 bg-[#FFD6BA] hover:bg-[#FFE8CD] text-[#4A2B20] font-bold text-[11px] rounded-lg transition flex items-center gap-1 shadow-sm border border-[#FFE8CD]"
                            >
                              <Mail className="w-3.5 h-3.5" /> Share on Mail
                            </button>

                            {/* Internal Receipt Print */}
                            <button
                              onClick={() => setSelectedOrderForReceipt(ord)}
                              title="View & Print Official Packaging Receipt"
                              className="px-2.5 py-1.5 bg-white border border-[#FFE8CD] text-[#4A2B20] hover:bg-[#FFE8CD] font-bold text-[11px] rounded-lg transition flex items-center gap-1"
                            >
                              <Printer className="w-3.5 h-3.5" /> Print
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG & STOCK MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#FFE8CD] shadow-sm">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A2B20]">Articles & Stock Catalog</h3>
              <p className="text-xs text-stone-600">Add new shawls, adjust discounts, or toggle out of stock states.</p>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductModalOpen(true);
              }}
              className="px-4 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-2xl hover:bg-[#FFE8CD] transition flex items-center gap-1.5 shadow border border-[#FFE8CD]"
            >
              <Plus className="w-4 h-4" /> Add New Shawl Article
            </button>
          </div>

          {/* Products List Table */}
          <div className="bg-white rounded-3xl border border-[#FFE8CD] shadow-sm overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#FFE8CD] text-stone-500 font-bold uppercase tracking-wider bg-[#FFF2EB]">
                    <th className="p-3">Article</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Discount / Sale</th>
                    <th className="p-3">Stock Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF2EB]/50 transition">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-14 object-cover rounded-lg border border-stone-200"
                        />
                        <div>
                          <div className="font-bold text-[#4A2B20] text-sm">{p.title}</div>
                          <span className="text-[10px] text-stone-500">{p.fabric}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-[10px] bg-[#FFE8CD] text-[#4A2B20] px-2 py-0.5 rounded-full border border-[#FFD6BA]">
                          {p.tierGrade} Tier
                        </span>
                      </td>
                      <td className="p-3 font-bold text-[#4A2B20]">
                        PKR {p.price.toLocaleString()}
                      </td>
                      <td className="p-3">
                        {p.compareAtPrice ? (
                          <span className="text-emerald-700 font-bold text-[11px]">
                            On Sale (Reg. PKR {p.compareAtPrice.toLocaleString()})
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[11px]">Standard Price</span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleOutOfStock(p.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                            p.isOutOfStock
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {p.isOutOfStock ? '● Out of Stock' : '● In Stock'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setProductModalOpen(true);
                            }}
                            className="p-1.5 bg-[#FFF2EB] text-[#4A2B20] hover:bg-[#FFE8CD] rounded-lg transition"
                            title="Edit Shawl & Discount"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <OrderReceiptModal
        order={selectedOrderForReceipt}
        onClose={() => setSelectedOrderForReceipt(null)}
      />

      <ShareEmailInvoiceModal
        order={selectedOrderForEmail}
        onClose={() => setSelectedOrderForEmail(null)}
      />

      <ProductManagementModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        productToEdit={editingProduct}
      />

    </div>
  );
};
