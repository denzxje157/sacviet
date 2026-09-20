import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  ethnic: string;
  img: string;
  quantity: number;
}

export type CartStep = 'cart' | 'checkout' | 'success';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem, openStep?: 'cart' | 'checkout' | null) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: (step?: 'cart' | 'checkout') => void;
  closeCart: () => void;
  cartStep: CartStep;
  setCartStep: (step: CartStep) => void;
  totalPrice: number;
  totalItems: number;
  isAuthModalOpen: boolean;
  toggleAuthModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// HÀM XỬ LÝ GIÁ TIỀN THÔNG MINH
// VD: "300.000 - 500.000 VNĐ" -> Lấy 300000
const safeParsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const match = priceStr.match(/\d{1,3}(?:\.\d{3})*/);
  if (match) {
    return parseInt(match[0].replace(/\./g, ''), 10);
  }
  return 0;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<CartStep>('cart');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openCart = (step: 'cart' | 'checkout' = 'cart') => {
    setCartStep(step);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addToCart = (item: CartItem, openStep: 'cart' | 'checkout' | null = 'cart') => {
    // Đảm bảo giá tiền được bóc tách đúng trước khi vào giỏ
    const correctPriceValue = safeParsePrice(item.price);
    const itemQty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const correctedItem = { ...item, priceValue: correctPriceValue };

    setCart(prev => {
      const existing = prev.find(i => i.id === correctedItem.id);
      if (existing) {
        return prev.map(i => i.id === correctedItem.id ? { ...i, quantity: i.quantity + itemQty } : i);
      }
      return [...prev, { ...correctedItem, quantity: itemQty }];
    });

    if (openStep) {
      setCartStep(openStep);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQ = i.quantity + delta;
        return newQ > 0 ? { ...i, quantity: newQ } : i;
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  const totalPrice = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isCartOpen, 
      toggleCart, 
      openCart,
      closeCart,
      cartStep,
      setCartStep,
      totalPrice, 
      totalItems, 
      isAuthModalOpen, 
      toggleAuthModal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};