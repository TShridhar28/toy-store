import { NextRequest, NextResponse } from "next/server"
import { razorpay } from "@/lib/razorpay"

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = "INR",
      receipt,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode
    } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `order_${Date.now()}`,

      // ⭐ ADD THIS
      notes: {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode
      }
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })

  } catch (error) {
    console.error("Razorpay order creation error:", error)

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}