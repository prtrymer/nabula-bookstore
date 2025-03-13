"use client";

import React from "react";
import { BookOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SearchDropdown } from "./SearchDropdown";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

const Header: React.FC = () => {
  const { cart } = useCart();
  return (
    <nav className="bg-indigo-600 dark:bg-indigo-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link href={`/`} className="flex items-center space-x-2">
          <BookOpen size={32} />
          <h1 className="text-2xl font-bold">Nabula Bookstore</h1>
        </Link>
      </div>
      <ThemeSwitcher />
      <SearchDropdown />
      <Link href="/cart" className="relative">
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Header;
