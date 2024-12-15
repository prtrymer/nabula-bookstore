import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nabula Bookstore",
  description: "Your favorite online bookstore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}
          bg-background-light text-text-light
          dark:bg-background-dark dark:text-text-dark
          min-h-screen transition-colors duration-300
          overflow-auto`}
      >
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}