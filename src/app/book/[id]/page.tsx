'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import booksData from '@/data/books.json';
import { Book } from '@/types/book';
import { BookCover } from '@/components/BookCover'; // Import the BookCover component

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const [unwrappedParams, setUnwrappedParams] = React.useState<{
    id: string;
  } | null>(null);

  React.useEffect(() => {
    params.then(setUnwrappedParams);
  }, [params]);

  if (!unwrappedParams) {
    return <div className="min-h-screen bg-gray-50">Loading...</div>;
  }

  const bookId = parseInt(unwrappedParams.id);
  const books = booksData as Book[];
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return <div className="min-h-screen bg-gray-50 text-black">Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black dark:bg-background-grey dark:text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center p-4">
          <BookCover book={book} className="max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-lg" />
        </div>

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
            <p className="">{book.description}</p>
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
            <Button
              onClick={() => {
                addToCart(book);
                window.location.href = '/cart';
              }}
              className="flex items-center"
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
