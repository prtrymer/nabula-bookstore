'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CalendarPopup from '@/components/CalendarPopup'; 

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.quantity*item.price, 0);
  const tax = total * 0.1;
  const grandTotal = total * 1.1;

  return (
    <div className="min-h-screen bg-gray-50 text-black dark:bg-background-grey dark:text-white">
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p>Your cart is empty</p>
          <Link href="/" className="relative">
          <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[3fr_1fr] gap-8">
          <div>
            {cart.map((item) => (
                <div 
                key={item.id} 
                className="flex items-center border-b py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                <img 
                  src={item.cover} 
                  alt={item.title} 
                  className="w-24 h-36 object-cover mr-6" 
                />
                <div className="flex-grow">
                  <h2 className="text-black dark:text-white font-semibold">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{item.author}</p>
                  <p className="font-bold text-indigo-600 mt-2">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center mt-2">
                  <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  >
                  -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  >
                  +
                  </Button>
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
          <div className="bg-gray-100 p-6 rounded-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
              <CalendarPopup />
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