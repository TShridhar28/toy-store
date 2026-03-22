"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

const bundles = [
  { qty: 1, price: 599, originalPrice: 1500, savings: 901 },
  { qty: 2, price: 999, originalPrice: 3000, savings: 2001 },
  { qty: 4, price: 1599, originalPrice: 6000, savings: 4401 },
]

// Your local images (kept)
const PRODUCT_IMAGES = [
  "/pro_img.png",
  "/pro_img2.png",
  "/pro_img3.png",
  "/pro_img4.png",
]

export function HeroSection() {
  const [selectedBundle, setSelectedBundle] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const bundle = bundles[selectedBundle]

    addToCart({
      id: `stress-key-${bundle.qty}`,
      name: `Stress Key (Pack of ${bundle.qty})`,
      qty: bundle.qty,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      image: PRODUCT_IMAGES[activeImage],
    })
  }

  return (
    <section className="pt-10 pb-6 lg:pt-16 lg:pb-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Image Gallery */}
          <div className="flex flex-col items-center gap-3">

            <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
              <Image
                src={PRODUCT_IMAGES[activeImage]}
                alt="Stress Key"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="flex gap-2">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-14 h-14 rounded-md overflow-hidden border ${
                    activeImage === index
                      ? "border-accent"
                      : "border-border"
                  }`}
                >
                  <Image src={img} alt={`thumb-${index}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 max-w-xl">

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-400/40 text-amber-400/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                4.89 • 378+ Happy Customers
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Stress Key
            </h1>

            {/* Benefits */}
            <ul className="space-y-3">
              {[
                "Satisfying tactile click",
                "Helps reduce stress & anxiety",
                "Small, portable & durable",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Offer */}
            <div className="inline-flex w-fit">
              <span className="border-2 border-accent text-accent px-4 py-2 text-sm font-semibold rounded-md">
                ₹50 OFF on prepaid orders
              </span>
            </div>

            {/* Bundles */}
            <div className="space-y-4 pt-2">

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm font-semibold tracking-wider">
                  BUNDLE & SAVE
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3">
                {bundles.map((bundle, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBundle(index)}
                    className={`w-full rounded-xl border-2 p-4 flex items-center justify-between transition-all ${
                      selectedBundle === index
                        ? "border-accent bg-secondary shadow-md"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">

                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          selectedBundle === index
                            ? "border-accent"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedBundle === index && (
                          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                        )}
                      </div>

                      <div className="text-left">
                        <p className="font-semibold">Buy {bundle.qty}</p>
                        <p className="text-sm text-muted-foreground">
                          Save ₹{bundle.savings.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg text-accent">
                        ₹{bundle.price.toLocaleString()}
                      </p>
                      <p className="text-sm line-through text-muted-foreground">
                        ₹{bundle.originalPrice.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full py-6 text-lg font-semibold"
              >
                Add to Cart • ₹{bundles[selectedBundle].price.toLocaleString()}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}