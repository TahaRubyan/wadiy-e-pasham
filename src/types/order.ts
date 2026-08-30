import { CartItem } from './product';

export type PaymentMethod = 'COD' | 'BANK_TRANSFER';
export type OrderStatus = 'Pending Verification' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  bankReferenceCode?: string; // for Online Bank Transfer
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #KHS-2026-101
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  currentLocation?: string; // e.g. "In Transit: Rawalpindi Express Sorting Hub"
  courierTrackingId?: string; // e.g. "TCS-9842109" or "LEO-771829"
  courierPartner?: string; // e.g. "TCS Express", "Leopards Courier", "Trax Logistics"
}
