"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

const bundles = [
  { qty: 1, price: 599, originalPrice: 1500, savings: 1000 },
  { qty: 2, price: 999, originalPrice: 3198, savings: 2199 },
  { qty: 4, price: 1599, originalPrice: 6000, savings: 4401 },
]

// 👉 Add your images here
const PRODUCT_IMAGES = [
  "/pro_img.png",
  "/pro_img2.png",
  "/pro_img3.png",
  "/pro_img4.png",
]

export function HeroSection() {
  const [selectedBundle, setSelectedBundle] = useState(1)
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
    <section className="pt-6 pb-4 lg:pt-10 lg:pb-6">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Product Image Gallery */}
          <div className="flex flex-col items-center gap-3">

            {/* Main Image */}
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden bg-muted shadow-md">
              <Image
                src={PRODUCT_IMAGES[activeImage]}
                alt="Stress Key"
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-14 h-14 rounded-md overflow-hidden border
                    ${
                      activeImage === index
                        ? "border-accent"
                        : "border-border"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`thumb-${index}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4 max-w-lg">

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-400/40 text-amber-400/40"
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs text-muted-foreground font-medium">
                (4.89) | 378+ Reviews
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
              Stress Key
            </h1>

            {/* Benefits */}
            <ul className="space-y-2">
              {[
                "Satisfying Tactile Feedback",
                "Stress & Anxiety Reduction",
                "Easy to carry & portable",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Prepaid Offer */}
            <div className="inline-flex w-fit">
              <span className="border border-accent text-accent px-3 py-1 text-xs font-semibold rounded">
                ₹50 OFF ON PREPAID ORDERS
              </span>
            </div>

            {/* Bundle Section */}
            <div className="space-y-2 pt-1">

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold tracking-wider">
                  BUNDLE & SAVE
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Bundle Options */}
              <div className="space-y-2">
                {bundles.map((bundle, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBundle(index)}
                    className={`relative w-full rounded-lg border p-3 flex items-center justify-between transition-all
                      ${
                        selectedBundle === index
                          ? "border-accent bg-secondary"
                          : "border-border"
                      }`}
                  >
                    {/* Most Popular */}
                    {index === 1 && (
                      <span className="absolute right-2 -top-2 text-[10px] bg-black text-white px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}

                    <div className="flex items-center gap-2">

                      {/* Radio */}
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center
                        ${
                          selectedBundle === index
                            ? "border-accent"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedBundle === index && (
                          <div className="h-2 w-2 rounded-full bg-accent" />
                        )}
                      </div>

                      <div className="text-left">
                        <p className="font-semibold text-sm">
                          Buy {bundle.qty}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Save ₹{bundle.savings.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-base text-accent">
                        ₹{bundle.price.toLocaleString()}
                      </p>

                      <p className="text-xs line-through text-muted-foreground">
                        ₹{bundle.originalPrice.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full py-4 text-base font-semibold"
              >
                ADD TO CART
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}