// src/context/CartContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the book type
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

// Context type
interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Book[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('nabula-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('nabula-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    // Check if book is already in cart to prevent duplicates
    setCart(prevCart => {
      const exists = prevCart.some(item => item.id === book.id);
      if (exists) return prevCart;
      return [...prevCart, book];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);