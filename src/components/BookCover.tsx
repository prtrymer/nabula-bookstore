import React from 'react';
import { Book } from "@/types/book";
import Image from 'next/image';

interface BookCoverProps {
  book: Book;
  className?: string;
}

export const BookCover = ({ book, className = "max-w-full h-auto rounded-lg shadow-lg" }: BookCoverProps) => {
  return (
    <Image
      width={500}
      src={book.cover}
      alt={book.title}
      className={className}
    />
  );
};