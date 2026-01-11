import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductSize } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: ProductSize) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cobachi-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cobachi-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: ProductSize) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.product.id === product.id &&
        item.selectedSize?.name === size?.name
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id && item.selectedSize?.name === size?.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.selectedSize?.price || item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const checkout = async () => {
    setIsCheckingOut(true);
    try {
      const items = cart
        .filter(item => item.product.shopify_variant_id)
        .map(item => ({
          variantId: item.product.shopify_variant_id!,
          quantity: item.quantity,
        }));

      if (items.length === 0) {
        alert('Some items in your cart are not available for checkout. Please remove them and try again.');
        setIsCheckingOut(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items }),
        }
      );

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to process checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        checkout,
        isCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
