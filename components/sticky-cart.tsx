"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { useCart } from "./cart-context"

const PRODUCT_IMAGE = "pro_img.png"

export function StickyCart() {
  const { addToCart } = useCart()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddToCart = () => {
    addToCart({
      id: "stress-key-1",
      name: "Stress Key (Pack of 1)",
      qty: 1,
      price: 599,
      originalPrice: 1500,
      image: PRODUCT_IMAGE,
    })
  }

  return (
    <>
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 lg:right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Sticky Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
              <Image
                src={PRODUCT_IMAGE}
                alt="Stress Key"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">Stress Key</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Rs. 599.00</span>
                <span className="text-sm text-muted-foreground line-through">Rs. 1,500.00</span>
                <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>&#10003;</span> SAVE 60%
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 lg:px-8"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </>
  )
}
