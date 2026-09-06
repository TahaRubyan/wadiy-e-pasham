# 🤝 Developer Handover & System Architecture Guide

**Project**: WADIY-E-PASHAM — Luxury Kashmir Shawls & Stoles  
**Repository**: [https://github.com/TahaRubyan/wadiy-e-pasham](https://github.com/TahaRubyan/wadiy-e-pasham)  
**Primary Stack**: React 18 (TypeScript), Vite, Tailwind CSS, Framer Motion, Lucide Icons

---

## 📋 1. Quick Onboarding & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/TahaRubyan/wadiy-e-pasham.git
cd wadiy-e-pasham

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Local dev runs at: `http://localhost:5173`  
Type check & build: `npm run build` (Outputs clean static files to `/dist`)

---

## 🔑 2. System Roles & Test Credentials

| Role | Username / Email | Password | Destination Page | Capabilities |
|---|---|---|---|---|
| **Administrator** | `admin` *(or `masteradmin` or `admin@wadiyepasham.com`)* | `admin123` *(or `admin 123` or `admin`)* | `/admin` | Manage catalog, toggle stock, assign courier tracking IDs, share email invoices, print A4 slips. |
| **Customer / Buyer** | Any user email (e.g. `taha@example.com`) | Any custom password | `/shop` | Browse catalog, real-time tier/date filter, add to cart, place orders, live parcel tracking. |

> **Note on Registration**: All new account creations via `/signup` or the Auth modal strictly create `role: 'customer'` accounts. Administrator status is restricted to matching the admin credentials above.

---

## 🧠 3. State Management & Data Flow

The application uses React's Context API with synchronized `localStorage` persistence. The context providers wrap the application in `src/App.tsx`:

### 1. `AuthContext.tsx` (`src/context/AuthContext.tsx`)
- Handles user authentication state (`user`, `isAuthenticated`, `isAdmin`).
- Persists user profile to `localStorage` key: `'shawls_store_auth_user_v2'`.
- Synchronizes with `OrderContext.loginAdmin()`.

### 2. `OrderContext.tsx` (`src/context/OrderContext.tsx`)
- Manages order lifecycle (`orders`, `placeOrder`, `updateOrderStatus`, `updateParcelLocation`, `assignCourierTracking`).
- Storage key: `'shawls_store_orders_real_v4'`.
- All orders start in clean real-time state for live user testing.
- `assignCourierTracking(orderId, trackingId, partner)` automatically transitions order status to `'Dispatched'` and sets `currentLocation` to `"Handed over to {partner} — Courier Tracking #{trackingId}"`.

### 3. `CartContext.tsx` (`src/context/CartContext.tsx`)
- Manages active cart items, color variant selections, quantities, drawer open/close state.
- Storage key: `'wadiy_e_pasham_cart'`.
- Dynamic free shipping calculation (threshold: `subtotal >= 30000`).

### 4. `ProductContext.tsx` (`src/context/ProductContext.tsx`)
- Manages available products, custom product creation, deletions, and out-of-stock toggles.
- Initialized from `src/data/mockProducts.ts`.
- Storage key: `'shawls_store_custom_products_v1'`.

---

## 🧩 4. Key Components & Implementation Details

### A. Catalog Page (`src/pages/ShopPage.tsx`)
- **Tier-Only Filter**: Filters strictly by `All Tiers`, `Imperial`, `Diamond`, `Platinum`, and `Gold`.
- **Custom Calendar Date Filter**: `<input type="date">` filters articles crafted on or after a specific handloom date (`product.releaseDate`).
- **Real-Time Morph Transitions**: Uses Framer Motion's `layout` and `<AnimatePresence mode="popLayout">` so product cards smoothly animate without resetting or jumping the user's scroll position.

### B. Product Detail & Weave Zoom (`src/pages/ProductDetailPage.tsx`)
- **Desktop Hover Lens**: 2.2x cursor-following magnification (`transformOrigin: x% y%`, `scale: 2.2`).
- **Mobile Tap-to-Zoom**: Dedicated modal inspector with draggable high-res pan view.
- **Royal SOPs**: Poetic Kashmir craft protocols for Sacred Washing, Heirloom Storage, Steaming, and Ring-Test Certification.

### C. Live Parcel Tracking (`src/pages/ParcelTrackingPage.tsx`)
- Searches orders by **Order Number** (e.g. `#KHS-2026-101`), **Courier Tracking ID** (e.g. `TCS-9948210`), or **Phone Number**.
- Displays the real-time **Current Location** and **Assigned Courier Tracking ID** as updated from the Admin Dashboard.

### D. Multi-Channel Email Invoice Modal (`src/components/admin/ShareEmailInvoiceModal.tsx`)
- **Default Mail (`mailto:`)**: Programmatically triggers default desktop client without opening empty `about:blank` tabs.
- **Gmail Web Compose**: 1-click fallback opening Gmail Web with pre-formatted invoice text and tracking info.
- **Outlook Web Compose**: 1-click fallback opening Outlook Web.

### E. A4 Printable Packaging Slip (`src/components/admin/OrderReceiptModal.tsx` & `src/index.css`)
- Pure isolated `@media print` styling:
  ```css
  @media print {
    body * { visibility: hidden !important; }
    #printable-invoice-a4, #printable-invoice-a4 * { visibility: visible !important; }
    #printable-invoice-a4 { position: fixed !important; left: 0; top: 0; width: 100%; }
  }
  ```
- Guarantees clean single A4 page printouts with zero website headers, tickers, or buttons leaking into the print view.

---

## 🚀 5. How to Add New Products or Images

1. **Add Images**:
   Place JPG/PNG images into `/public/images/shawls/` or `/public/images/`.
2. **Add Mock Article**:
   Edit `src/data/mockProducts.ts`:
   ```ts
   {
     id: 'shawl-new-01',
     handle: 'royal-emerald-pashmina',
     title: 'Royal Emerald Pure Pashmina Shawl',
     subtitle: 'Fine 12-Micron Ladakhi Weave',
     description: 'Detailed description of the craft and fiber.',
     price: 36000,
     tierGrade: 'Diamond', // 'Imperial' | 'Diamond' | 'Platinum' | 'Gold'
     articleType: 'Wool Pure Single',
     subCategory: 'Pashmina',
     fabric: 'Pure Ladakhi Cashmere',
     dimensions: '100 cm x 200 cm',
     weight: '190 grams',
     micronCount: '12.5 Microns',
     origin: 'Changthang Plateau & Srinagar Handlooms',
     images: ['/images/shawls/new_shawl.jpg'],
     colors: [
       { name: 'Emerald Green', hex: '#097969' }
     ],
     tags: ['Diamond Tier', 'Pure Pashmina'],
     sops: ROYAL_KASHMIR_SOPS,
     isFeatured: true,
     isNewArrival: true,
     releaseDate: '2026-08-30'
   }
   ```

---

## 🔌 6. Future Backend Integration Roadmap

When connecting a live backend (Supabase, Firebase, Node.js + PostgreSQL, or Shopify Storefront API):

1. **Database Schema**:
   - `products` table matching `ShawlProduct` interface (`src/types/product.ts`).
   - `orders` table matching `Order` interface (`src/types/order.ts`).
   - `users` table matching `UserProfile` interface (`src/types/auth.ts`).
2. **Replacing Context LocalStorage**:
   - In `OrderContext.tsx`: Replace `localStorage` operations with API calls (`axios.post('/api/orders')` or `supabase.from('orders').insert(...)`).
   - In `ProductContext.tsx`: Fetch products on mount from the database.
   - In `AuthContext.tsx`: Connect to Supabase Auth or standard JWT backend endpoints.

---

## 📞 7. Contact & Support

If you have questions regarding the codebase architecture or feature extensions, refer to the comments across `src/` or contact the team.
