// src/app/cart/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart } from 'lucide-react';

// Sample book data matching the main page
const initialBooks = [
  {
    id: 1,
    title: 'The Starlight Chronicles',
    author: 'Elena Rodriguez',
    price: 24.99,
    cover: '/api/placeholder/100/150'
  },
  {
    id: 2,
    title: 'Quantum Horizons',
    author: 'Dr. Michael Chen',
    price: 29.99,
    cover: '/api/placeholder/100/150'
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialBooks);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-3" /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Button className="mt-4">Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[3fr_1fr] gap-8">
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center border-b py-4 hover:bg-gray-50 transition"
              >
                <img 
                  src={item.cover} 
                  alt={item.title} 
                  className="w-24 h-36 object-cover mr-6" 
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{item.author}</p>
                  <p className="font-bold text-indigo-600 mt-2">${item.price.toFixed(2)}</p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}