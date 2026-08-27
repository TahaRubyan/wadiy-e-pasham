import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShawlProduct } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export interface DiscountRule {
  id: string;
  targetId?: string; // productId or subCategory
  discountPercentage: number;
  promoCode?: string;
  isActive: boolean;
}

interface ProductContextType {
  products: ShawlProduct[];
  discounts: DiscountRule[];
  addProduct: (product: Omit<ShawlProduct, 'id' | 'handle'>) => ShawlProduct;
  updateProduct: (product: ShawlProduct) => void;
  toggleOutOfStock: (id: string) => void;
  deleteProduct: (id: string) => void;
  applyDiscount: (targetId: string, percentage: number) => void;
  removeDiscount: (discountId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'wadiy_e_pasham_products_v3';
const DISCOUNTS_STORAGE_KEY = 'wadiy_e_pasham_discounts_v3';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ShawlProduct[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  });

  const [discounts, setDiscounts] = useState<DiscountRule[]>(() => {
    try {
      const saved = localStorage.getItem(DISCOUNTS_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'disc-1',
              targetId: 'shawl-01',
              discountPercentage: 10,
              isActive: true,
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products to localStorage', error);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(DISCOUNTS_STORAGE_KEY, JSON.stringify(discounts));
    } catch (error) {
      console.error('Failed to save discounts to localStorage', error);
    }
  }, [discounts]);

  const addProduct = (newProductData: Omit<ShawlProduct, 'id' | 'handle'>): ShawlProduct => {
    const id = `shawl-${Date.now()}`;
    const handle = newProductData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProduct: ShawlProduct = {
      ...newProductData,
      id,
      handle,
      isOutOfStock: newProductData.isOutOfStock || false,
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: ShawlProduct) => {
    setProducts((prev) => {
      const updatedList = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const toggleOutOfStock = (id: string) => {
    setProducts((prev) => {
      const updatedList = prev.map((p) =>
        p.id === id ? { ...p, isOutOfStock: !p.isOutOfStock } : p
      );
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updatedList = prev.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const applyDiscount = (targetId: string, percentage: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === targetId || p.subCategory === targetId) {
          const originalPrice = p.compareAtPrice || p.price;
          const discountedPrice = Math.round(originalPrice * (1 - percentage / 100));
          return {
            ...p,
            compareAtPrice: originalPrice,
            price: discountedPrice,
          };
        }
        return p;
      })
    );

    const newRule: DiscountRule = {
      id: `disc-${Date.now()}`,
      targetId,
      discountPercentage: percentage,
      isActive: true,
    };

    setDiscounts((prev) => [newRule, ...prev]);
  };

  const removeDiscount = (discountId: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        discounts,
        addProduct,
        updateProduct,
        toggleOutOfStock,
        deleteProduct,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
