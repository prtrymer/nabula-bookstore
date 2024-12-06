// src/app/book/[id]/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

// Sample book data (you'll want to replace this with actual data fetching)
const books = [
  {
    id: 1,
    title: 'The Starlight Chronicles',
    author: 'Elena Rodriguez',
    price: 24.99,
    rating: 4.7,
    cover: '/api/placeholder/400/600',
    description: 'A captivating journey through distant galaxies, exploring the intricate relationships between interstellar civilizations and the individuals who shape their destinies.',
    pages: 352,
    publisher: 'Cosmic Press',
    publicationDate: 'May 15, 2024',
    genre: 'Science Fiction'
  },
  {
    id: 2,
    title: 'Quantum Horizons',
    author: 'Dr. Michael Chen',
    price: 29.99,
    rating: 4.5,
    cover: '/api/placeholder/400/600',
    description: 'A groundbreaking exploration of quantum mechanics, bridging the gap between complex scientific theory and accessible narrative.',
    pages: 288,
    publisher: 'Academic Frontier',
    publicationDate: 'March 1, 2024',
    genre: 'Science & Technology'
  },
  {
    id: 3,
    title: 'Urban Whispers',
    author: 'Sophia Martinez',
    price: 19.99,
    rating: 4.9,
    cover: '/api/placeholder/400/600',
    description: 'An intimate portrait of city life, weaving together the stories of diverse characters connected by the rhythms of metropolitan existence.',
    pages: 276,
    publisher: 'Metropolitan Press',
    publicationDate: 'January 22, 2024',
    genre: 'Contemporary Fiction'
  }
];

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params
  const { id } = React.use(params);
  // Convert id to number and find the book
  const bookId = parseInt(id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return <div className="container mx-auto p-6">Book not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500 mr-4">
              <Star className="mr-1" fill="currentColor" />
              <span>{book.rating} / 5</span>
            </div>
            <span className="font-bold text-2xl text-indigo-600">${book.price.toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Publisher</h3>
              <p>{book.publisher}</p>
            </div>
            <div>
              <h3 className="font-semibold">Publication Date</h3>
              <p>{book.publicationDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Pages</h3>
              <p>{book.pages}</p>
            </div>
            <div>
              <h3 className="font-semibold">Genre</h3>
              <p>{book.genre}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex items-center">
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>
            <Button variant="outline">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}