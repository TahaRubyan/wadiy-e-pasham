import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Printer, Eye, LogOut, Search, Truck, Building2, Plus, Edit, Trash2, MapPin, Sparkles, Package } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Order, OrderStatus } from '../types/order';
import { ShawlProduct } from '../types/product';
import { OrderReceiptModal } from '../components/admin/OrderReceiptModal';
import { ProductManagementModal } from '../components/admin/ProductManagementModal';
import { CartToast } from '../components/cart/CartToast';

export const AdminDashboardPage: React.FC = () => {
  const { orders, isAdminAuthenticated, logoutAdmin, updateOrderStatus, updateParcelLocation } = useOrders();
  const { user, isAdmin, logout } = useAuth();
  const { products, deleteProduct, toggleOutOfStock } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterPayment, setFilterPayment] = useState<'ALL' | 'COD' | 'BANK_TRANSFER'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Product CRUD Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShawlProduct | null>(null);

  // Parcel Location Editing State
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [locationText, setLocationText] = useState('');

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

  const handleSaveParcelLocation = (orderId: string) => {
    if (locationText.trim()) {
      updateParcelLocation(orderId, locationText.trim());
      setEditingLocationId(null);
      setLocationText('');
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
                    <th className="p-3">Parcel Location Update</th>
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
                        
                        <td className="p-3 min-w-[220px]">
                          {editingLocationId === ord.id ? (
                            <div className="flex gap-1">
                              <input
                                type="text"
                                value={locationText}
                                onChange={(e) => setLocationText(e.target.value)}
                                placeholder="e.g. In Transit: Lahore Sorting Hub"
                                className="w-full px-2 py-1 border border-[#FFD6BA] rounded text-[11px]"
                              />
                              <button
                                onClick={() => handleSaveParcelLocation(ord.id)}
                                className="px-2 py-1 bg-[#FFD6BA] text-[#4A2B20] rounded text-[10px] font-bold"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-[11px] bg-[#FFF2EB] p-2 rounded-lg border border-[#FFE8CD]">
                              <span className="text-stone-700 truncate max-w-[170px]" title={ord.currentLocation || 'Order Logged'}>
                                <MapPin className="w-3 h-3 text-[#4A2B20] inline mr-1" />
                                {ord.currentLocation || 'Order Logged — Workshop Hub'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingLocationId(ord.id);
                                  setLocationText(ord.currentLocation || '');
                                }}
                                className="text-[10px] text-[#4A2B20] font-bold underline ml-1"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-2.5 py-1 bg-white border border-[#FFE8CD] text-[#4A2B20] hover:bg-[#FFD6BA] font-bold text-[11px] rounded-lg transition"
                            >
                              <Eye className="w-3.5 h-3.5 inline mr-1" /> Receipt
                            </button>
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="p-1.5 bg-[#FFD6BA] text-[#4A2B20] hover:bg-[#FFE8CD] rounded-lg transition"
                              title="Print Receipt"
                            >
                              <Printer className="w-3.5 h-3.5" />
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

      {/* TAB 2: PRODUCT CRUD & STOCK MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#FFE8CD] shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#FFE8CD] pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B20]">WADIY-E-PASHAM Shawls & Stock Manager</h3>
              <p className="text-xs text-stone-500">Add new articles, edit prices, apply discounts, and toggle Out of Stock status.</p>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setProductModalOpen(true);
              }}
              className="px-5 py-2.5 bg-[#FFD6BA] text-[#4A2B20] font-bold text-xs rounded-xl hover:bg-[#FFE8CD] transition shadow flex items-center gap-1.5 border border-[#FFE8CD]"
            >
              <Plus className="w-4 h-4" /> Add New Shawl Article
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-[#FFE8CD] rounded-2xl p-4 bg-[#FFF2EB] flex flex-col justify-between space-y-4">
                <div className="flex gap-3">
                  <img src={product.images[0]} alt={product.title} className="w-20 h-24 object-cover rounded-xl border border-stone-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#6B3E30] uppercase tracking-wider block">{product.subCategory}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#FFD6BA] text-[#4A2B20]">{product.tierGrade || 'Platinum'}</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#4A2B20] truncate mt-0.5">{product.title}</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{product.articleType || product.fabric}</p>
                    
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-serif text-base font-bold text-[#4A2B20]">
                        PKR {product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          PKR {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stock Toggle & Edit Actions */}
                <div className="pt-3 border-t border-[#FFE8CD] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-600 font-medium">Stock Status:</span>
                    <button
                      onClick={() => toggleOutOfStock(product.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        product.isOutOfStock ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {product.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setProductModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-white border border-[#FFE8CD] text-[#4A2B20] font-bold text-xs rounded-lg hover:bg-[#FFD6BA] transition flex items-center gap-1 shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Article
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Management Modal */}
      <ProductManagementModal
        productToEdit={editingProduct}
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setEditingProduct(null);
        }}
      />

      {/* Printable Receipt Modal */}
      <OrderReceiptModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

    </div>
  );
};
