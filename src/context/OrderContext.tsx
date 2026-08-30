import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CustomerDetails, PaymentMethod, OrderStatus } from '../types/order';
import { CartItem } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

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

const ORDERS_STORAGE_KEY = 'shawls_store_orders_v2';
const ADMIN_AUTH_KEY = 'shawls_store_admin_auth_v1';
const ADMIN_PASSWORD = 'admin123';

const INITIAL_SEED_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#KHS-2026-101',
    createdAt: '2026-08-23T14:30:00Z',
    customer: {
      fullName: 'Tariq Mahmood',
      email: 'tariq.mahmood@example.com',
      phone: '03001234567',
      address: 'House #42, Street 7, F-8/2',
      city: 'Islamabad',
      notes: 'Please call before delivery.'
    },
    items: [
      {
        id: 'shawl-01-peach-gold',
        product: MOCK_PRODUCTS[0],
        selectedColor: MOCK_PRODUCTS[0].colors[0],
        quantity: 1
      }
    ],
    subtotal: 34500,
    shippingFee: 0,
    total: 34500,
    paymentMethod: 'COD',
    status: 'Dispatched',
    currentLocation: 'In Transit: Rawalpindi Express Courier Regional Sorting Hub'
  },
  {
    id: 'ord-102',
    orderNumber: '#KHS-2026-102',
    createdAt: '2026-08-23T18:45:00Z',
    customer: {
      fullName: 'Dr. Ayesha Rehman',
      email: 'ayesha.rehman@example.com',
      phone: '03219876543',
      address: 'Apt 4B, Gulberg Heights, Main Boulevard',
      city: 'Lahore',
      bankReferenceCode: 'FT-9948210-HBL'
    },
    items: [
      {
        id: 'shawl-02-charcoal-black',
        product: MOCK_PRODUCTS[1],
        selectedColor: MOCK_PRODUCTS[1].colors[0],
        quantity: 1
      }
    ],
    subtotal: 28900,
    shippingFee: 0,
    total: 28900,
    paymentMethod: 'BANK_TRANSFER',
    status: 'Pending Verification',
    currentLocation: 'Kashmir Craft Workshop Hub — Quality Inspection Completed'
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SEED_ORDERS;
    } catch {
      return INITIAL_SEED_ORDERS;
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
    if (password === ADMIN_PASSWORD || password === 'admin') {
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
      currentLocation: 'Order Logged — Preparing for Kashmir Handloom Dispatch'
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
              status: 'Confirmed',
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
