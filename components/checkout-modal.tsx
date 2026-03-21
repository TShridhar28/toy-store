"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "./cart-context"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface CustomerDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({})
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const validateForm = () => {
    const newErrors: Partial<CustomerDetails> = {}
    
    if (!customerDetails.name.trim()) newErrors.name = "Name is required"
    if (!customerDetails.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!customerDetails.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^[6-9]\d{9}$/.test(customerDetails.phone)) {
      newErrors.phone = "Invalid phone number"
    }
    if (!customerDetails.address.trim()) newErrors.address = "Address is required"
    if (!customerDetails.city.trim()) newErrors.city = "City is required"
    if (!customerDetails.state.trim()) newErrors.state = "State is required"
    if (!customerDetails.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(customerDetails.pincode)) {
      newErrors.pincode = "Invalid pincode"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert("Failed to load payment gateway. Please try again.")
        setIsLoading(false)
        return
      }

      // Create order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          receipt: `order_${Date.now()}`,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Stress Keys",
        description: "Fidget Key for Stress Relief",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            setPaymentId(response.razorpay_payment_id)
            setIsSuccess(true)
            clearCart()
          } else {
            alert("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        notes: {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          city: customerDetails.city,
          state: customerDetails.state,
          pincode: customerDetails.pincode,
        },
        theme: {
          color: "#1e293b",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
      setIsLoading(false)
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false)
      setPaymentId(null)
      setCustomerDetails({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-[60]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background">
            <h2 className="text-xl font-bold">
              {isSuccess ? "Order Confirmed!" : "Checkout"}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Thank You for Your Order!
              </h3>
              <p className="text-muted-foreground mb-4">
                Your payment was successful. We will send you a confirmation email shortly.
              </p>
              {paymentId && (
                <p className="text-sm text-muted-foreground mb-6">
                  Payment ID: <span className="font-mono">{paymentId}</span>
                </p>
              )}
              <Button
                onClick={handleClose}
                className="bg-primary hover:bg-primary/90"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            /* Checkout Form */
            <div className="p-4 space-y-6">
              {/* Order Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>Rs. {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Details</h3>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={customerDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    placeholder="House no, Street, Landmark"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">City</label>
                    <Input
                      placeholder="City"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-xs text-destructive">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">State</label>
                    <Input
                      placeholder="State"
                      value={customerDetails.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                      <p className="text-xs text-destructive">{errors.state}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Pincode</label>
                    <Input
                      placeholder="123456"
                      value={customerDetails.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className={errors.pincode ? "border-destructive" : ""}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-destructive">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isLoading || items.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay Rs. ${totalPrice.toLocaleString()}`
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secured by Razorpay. Your payment information is encrypted and secure.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
