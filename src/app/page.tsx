// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, BookOpen, Star } from 'lucide-react';

// Sample book data
const initialBooks = [
  {
    id: 1,
    title: 'The Starlight Chronicles',
    author: 'Elena Rodriguez',
    price: 24.99,
    rating: 4.7,
    cover: '/api/placeholder/200/300'
  },
  {
    id: 2,
    title: 'Quantum Horizons',
    author: 'Dr. Michael Chen',
    price: 29.99,
    rating: 4.5,
    cover: '/api/placeholder/200/300'
  },
  {
    id: 3,
    title: 'Urban Whispers',
    author: 'Sophia Martinez',
    price: 19.99,
    rating: 4.9,
    cover: 'covers/cover.jpg'
  },
  {
    id: 4,
    title: 'Urban Whispers',
    author: 'Sophia Martinez',
    price: 19.99,
    rating: 4.9,
    cover: 'covers/cover.jpg'
  }
];

export default function Home() {
  const [books, setBooks] = useState(initialBooks);
  const [cart, setCart] = useState<{ id: number; title: string; author: string; price: number; rating: number; cover: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (book: { id: number; title: string; author: string; price: number; rating: number; cover: string }) => {
    setCart([...cart, book]);
  };

  const searchBooks = (term: string) => {
    const filtered = initialBooks.filter(book => 
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase())
    );
    setBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen size={32} />
          <h1 className="text-2xl font-bold">Nabula Bookstore</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search books..." 
              className="pr-10 w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchBooks(e.target.value);
              }}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Book Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Link href={`/book/${book.id}`}>
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </Link>
              </CardHeader>
              <CardContent>
                <Link href={`/book/${book.id}`}>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {book.title}
                  </CardTitle>
                </Link>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span>{book.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">${book.price.toFixed(2)}</span>
                    <Button 
                      onClick={() => addToCart(book)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Nabula Bookstore. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}