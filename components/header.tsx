"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "./cart-context"

export function Header() {
  const { setIsCartOpen, totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 text-sm font-medium">
              <span>COD Available</span>
              <span>Free Shipping</span>
              <span>60% Discount</span>
              <span>COD Available</span>
              <span>Free Shipping</span>
              <span>60% Discount</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Left Menu */}
        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-accent transition-colors">
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1"
        >
          <div className="flex items-center">
            <span className="text-accent font-bold text-xl">|</span>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold tracking-wider">STRESS</span>
              <span className="text-xl font-bold -mt-1">keys</span>
            </div>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hover:text-accent transition-colors" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className="hover:text-accent transition-colors" aria-label="Account">
            <User className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-accent transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-t border-border md:hidden shadow-lg animate-slideDown">
            <ul className="flex flex-col gap-4 p-4 text-center text-base font-medium">
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  )
}