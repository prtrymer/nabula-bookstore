"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import booksData from "@/data/books.json";
import { Book } from "@/types/book";

export default function Home() {
  // Properly type the state
  const [books, setBooks] = useState<Book[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // TypeScript now knows the shape of the data
    setBooks(booksData as Book[]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-grey flex flex-col overflow-auto">
      <main className="container mx-auto px-4 py-8 flex-grow overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="hover:shadow-lg transition-shadow 
              bg-white dark:bg-background-grey
              dark:border-gray-700"
            >
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
                  <CardTitle className="text-black dark:text-white text-xl font-semibold mb-2">
                    {book.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {book.author}
                  </p>
                </Link>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="dark:text-white">{book.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-black dark:text-white">
                      ${book.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => addToCart(book)}
                      className="bg-indigo-600 hover:bg-indigo-700 
                      dark:bg-indigo-800 dark:hover:bg-indigo-700"
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
    </div>
  );
}