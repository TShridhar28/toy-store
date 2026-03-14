"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight">
        Contact Us
      </h1>

      <div className="bg-card border border-border rounded-2xl p-10 shadow-lg space-y-12">

        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Get in Touch
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Have questions about our products, shipping, or orders?
            Feel free to reach out and we’ll be happy to help.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition">
            <Mail className="text-accent w-6 h-6" />
            <span className="text-lg font-medium">zenvvix@gmail.com</span>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition">
            <Phone className="text-accent w-6 h-6" />
            <span className="text-lg font-medium">+91 9326507840</span>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition">
            <MapPin className="text-accent w-6 h-6" />
            <span className="text-lg font-medium">India</span>
          </div>

        </div>

      </div>

    </div>
  )
}