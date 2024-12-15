'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const initialBooks = [
    {
      id: 1,
      title: "The Starlight Chronicles",
      author: "Elena Rodriguez",
      price: 24.99,
      rating: 4.7,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
    {
      id: 2,
      title: "Quantum Horizons",
      author: "Dr. Michael Chen",
      price: 29.99,
      rating: 4.5,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
    {
      id: 3,
      title: "Urban Whispers",
      author: "Sophia Martinez",
      price: 19.99,
      rating: 4.9,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
    {
      id: 4,
      title: "The Starlight Chronicles",
      author: "Elena Rodriguez",
      price: 24.99,
      rating: 4.7,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
    {
      id: 5,
      title: "Quantum Horizons",
      author: "Dr. Michael Chen",
      price: 29.99,
      rating: 4.5,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
    {
      id: 6,
      title: "Urban Whispers",
      author: "Sophia Martinez",
      price: 19.99,
      rating: 4.9,
      cover: "/api/placeholder/200/300",
      quantity: 1,
    },
  ];

export const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<typeof initialBooks>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBooks = (term: string) => {
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = initialBooks.filter(book => 
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-64">
      <div className="relative">
        <Input 
          type="text" 
          placeholder="Search books..." 
          className="pr-10 w-full"
          value={searchTerm}
          onChange={(e) => searchBooks(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((book) => (
            <Link 
              href={`/book/${book.id}`} 
              key={book.id}
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-12 h-16 object-cover mr-4 rounded"
              />
              <div>
                <div className="font-semibold text-sm dark:text-white">
                  {book.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {book.author}
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  ${book.price.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};