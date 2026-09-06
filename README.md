# 🧣 WADIY-E-PASHAM — Luxury Kashmir Shawls & Stoles

A high-performance luxury e-commerce web platform for certified Ladakhi Cashmere and handloom Pashmina shawls. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Live Demo & Repository
- **GitHub Repository**: [https://github.com/TahaRubyan/wadiy-e-pasham](https://github.com/TahaRubyan/wadiy-e-pasham)
- **Production Build Target**: Vercel / Netlify / Cloudflare Pages

---

## 🚀 Quick Start for Developers

### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **npm** (or `yarn` / `pnpm`)
- **Git**

### 2. Installation & Local Development
```bash
# 1. Clone repository
git clone https://github.com/TahaRubyan/wadiy-e-pasham.git
cd wadiy-e-pasham

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build & Preview
```bash
# Build optimized production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Styling & Design System** | [Tailwind CSS v3](https://tailwindcss.com/) (Custom Warm Amber/Peach Palette) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Typography** | Google Fonts (`Playfair Display` serif + `Plus Jakarta Sans`) |
| **State Management** | React Context API with LocalStorage Synchronization |

---

## 💎 Key Features Implemented

1. **👑 Luxury Brand Header & Navigation**:
   - Transparent, high-resolution brand logo and favicon.
   - Smooth animated announcement marquee bar.
   - Global sticky navbar with quick access to Catalog, Heritage, Tracking, Contact, Cart Drawer, and User Account.

2. **🛍️ Real-Time Tier & Date Catalog (`/shop`)**:
   - Filter by luxury tiers: **Imperial**, **Diamond**, **Platinum**, **Gold**, or **All Tiers**.
   - Custom calendar picker (`<input type="date">`) to filter articles by craft/loom release date.
   - Instant search by title, fabric, weave type, and keywords.
   - Real-time layout morph animations using Framer Motion (no page scroll jumps).

3. **🔍 Interactive Micro-Weave Zoom (`/product/:handle`)**:
   - **Desktop**: 2.2x cursor-following magnification lens on image hover.
   - **Mobile**: Dedicated *"🔍 Tap to Zoom"* full-screen modal inspector.
   - Color variant switcher, live viewing counter, and exaggerated royal Kashmir craft SOPs (Washing, Storage, Steaming, Ring-Test Authenticity).

4. **🛒 Shopping Bag & Official Checkout Flow**:
   - Slide-out Cart Drawer with quantity adjuster, subtotal calculation, and instant Free Shipping threshold (orders > PKR 30,000).
   - Checkout Modal with Customer Destination form, Cash on Delivery (COD), and Online Bank Transfer (HBL / Meezan).
   - Customer Order Confirmation screen with direct live parcel tracking link.

5. **📍 Real-Time Parcel Tracking (`/track`)**:
   - Customers can look up any order by **Order Number** (e.g. `#KHS-2026-101`), **Courier Tracking ID**, or **Phone Number**.
   - Renders live location updates and courier tracking info updated directly by the store administrator.

6. **👑 Admin Management Dashboard (`/admin`)**:
   - **Secure Access**: Username `admin` / Password `admin123`.
   - **Order Lifecycle**: Filter by payment method, update status (*Pending*, *Confirmed*, *Dispatched*, *Delivered*).
   - **Courier Tracking Assignment**: Assign tracking number (e.g. `TCS-9948210`) and partner (TCS, Leopards, Trax).
   - **Multi-Channel Dispatch Email**: 1-click email sharing via Default Mail app, Gmail Web, or Outlook Web.
   - **A4 Printable Packaging Slip**: Dedicated `@media print` layout printing clean official store invoice slips without website headers or buttons.
   - **Product Catalog Management**: Add, edit, or toggle out-of-stock items.

---

## 📁 Project Architecture & Directory Layout

```
wadiy-e-pasham/
├── public/
│   ├── favicon.png               # High-res 128x128 brand favicon
│   └── images/                   # Brand logo & catalog images
├── src/
│   ├── components/
│   │   ├── admin/                # Admin modals (OrderReceiptModal, ProductManagementModal, ShareEmailInvoiceModal)
│   │   ├── auth/                 # AuthModal dialog
│   │   ├── cart/                 # CartDrawer and CartToast
│   │   ├── checkout/             # CheckoutModal & CustomerOrderSuccessModal
│   │   ├── layout/               # Navbar, Footer
│   │   ├── product/              # ProductCard
│   │   └── ui/                   # Reusable UI elements
│   ├── context/                  # Context State Providers
│   │   ├── AuthContext.tsx       # User & Admin authentication
│   │   ├── CartContext.tsx       # Shopping bag state & persistence
│   │   ├── OrderContext.tsx      # Orders storage, dispatching, tracking
│   │   └── ProductContext.tsx    # Shawl catalog & stock management
│   ├── data/
│   │   └── mockProducts.ts       # Catalog archive, specs & royal SOPs
│   ├── pages/                    # Route pages (Home, Shop, ProductDetail, About, Contact, Track, Admin, Auth)
│   ├── types/                    # TypeScript interfaces (product.ts, order.ts, auth.ts)
│   ├── utils/                    # Utility functions (scrollToTop.ts)
│   ├── App.tsx                   # Main routes configuration
│   ├── index.css                 # Tailwind directives, marquee, & A4 print CSS
│   └── main.tsx                  # React DOM root entrypoint
├── HANDOVER.md                   # Comprehensive Developer Handover & Onboarding Guide
├── package.json                  # Scripts & dependencies
└── tailwind.config.js            # Custom color palette & breakpoints
```

---

## 🚢 Deployment to Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

---

## 📄 License
All rights reserved © WADIY-E-PASHAM.
