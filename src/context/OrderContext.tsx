import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CustomerDetails, PaymentMethod, OrderStatus } from '../types/order';
import { CartItem } from '../types/product';

interface OrderContextType {
  orders: Order[];
  placeOrder: (customer: CustomerDetails, items: CartItem[], paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateParcelLocation: (orderId: string, location: string) => void;
  assignCourierTracking: (orderId: string, trackingId: string, partner?: string) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'shawls_store_orders_real_v4';
const ADMIN_AUTH_KEY = 'shawls_store_admin_auth_v1';
const ADMIN_PASSWORD = 'admin123';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with clean empty state so only real test orders appear with real timestamps
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Failed to save orders to localStorage', error);
    }
  }, [orders]);

  const loginAdmin = (password: string): boolean => {
    const clean = password.replace(/\s+/g, '').toLowerCase();
    if (clean === ADMIN_PASSWORD || clean === 'admin123' || clean === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const placeOrder = (
    customer: CustomerDetails,
    items: CartItem[],
    paymentMethod: PaymentMethod
  ): Order => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingFee = subtotal >= 30000 ? 0 : 500;
    const total = subtotal + shippingFee;

    const orderNumber = `#KHS-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      items,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      status: paymentMethod === 'COD' ? 'Confirmed' : 'Pending Verification',
      currentLocation: 'Order Logged & Inspected at Kashmir Workshop — Preparing for Dispatch'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const updateParcelLocation = (orderId: string, location: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, currentLocation: location } : ord))
    );
  };

  const assignCourierTracking = (orderId: string, trackingId: string, partner: string = 'TCS Express') => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              courierTrackingId: trackingId,
              courierPartner: partner,
              status: 'Dispatched',
              currentLocation: `Handed over to ${partner} — Courier Tracking #${trackingId}`,
            }
          : ord
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        updateParcelLocation,
        assignCourierTracking,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
