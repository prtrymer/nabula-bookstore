import React from 'react';
import { Book } from "@/types/book";

interface BookCoverProps {
  book: Book;
  className?: string;
}

export const BookCover = ({ book, className = "max-w-full h-auto rounded-lg shadow-lg" }: BookCoverProps) => {
  return (
    <img
      src={book.cover}
      alt={book.title}
      className={className}
    />
  );
};