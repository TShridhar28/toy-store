"use client"

import { CartProvider } from "./cart-context"
import { CartDrawer } from "./cart-drawer"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
