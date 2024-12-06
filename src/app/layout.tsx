import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nabula Bookstore',
  description: 'Your favorite online bookstore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}