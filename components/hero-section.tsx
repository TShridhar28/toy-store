"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

const bundles = [
  { qty: 1, price: 599, originalPrice: 1500, savings: 901 },
  { qty: 2, price: 999, originalPrice: 3000, savings: 2001, popular: true },
  { qty: 4, price: 1599, originalPrice: 6000, savings: 4401 },
]

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
    <section className="pt-8 pb-6 lg:pt-12 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Image Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden bg-muted shadow-md">
              <Image
                src={PRODUCT_IMAGES[activeImage]}
                alt="Stress Key"
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>

            <div className="flex gap-2">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-12 h-12 rounded-md overflow-hidden border ${
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
                4.89 • 378+ Happy Customers
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Stress Key
            </h1>

            <ul className="space-y-2">
              {[
                "Satisfying tactile click",
                "Helps reduce stress & anxiety",
                "Small, portable & durable",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="inline-flex w-fit">
              <span className="border border-accent text-accent px-3 py-1 text-xs font-semibold rounded-md">
                ₹50 OFF on prepaid orders
              </span>
            </div>

            {/* Bundles */}
            <div className="space-y-3 pt-1">

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold tracking-wider">
                  BUNDLE & SAVE
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                {bundles.map((bundle, index) => {
                  const isSelected = selectedBundle === index
                  const isBuy4 = bundle.qty === 4

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedBundle(index)}
                      className={`w-full rounded-lg border p-3 flex items-center justify-between relative overflow-visible transition-all
                      ${
                        isSelected
                          ? "border-accent bg-secondary shadow-sm"
                          : "border-border hover:border-accent/40"
                      }
                      ${bundle.popular ? "scale-[1.02]" : ""}
                      ${isBuy4 ? "shine-effect" : ""}
                      `}
                    >

                      {/* BEST VALUE TAG */}
                      {isBuy4 && (
                        <span className="absolute -top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                          BEST VALUE
                        </span>
                      )}

                      {/* MOST POPULAR */}
                      {bundle.popular && (
                        <span className="absolute -top-2 right-2 bg-accent text-white text-[10px] px-2 py-0.5 rounded-full">
                          MOST POPULAR
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-accent"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <div className="h-2 w-2 rounded-full bg-accent" />
                          )}
                        </div>

                        <div className="text-left">
                          <p className="text-sm font-semibold">Buy {bundle.qty}</p>
                          <p className="text-xs text-muted-foreground">
                            Save ₹{bundle.savings.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-base text-accent">
                          ₹{bundle.price.toLocaleString()}
                        </p>
                        <p className="text-xs line-through text-muted-foreground">
                          ₹{bundle.originalPrice.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full py-5 text-base font-semibold"
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