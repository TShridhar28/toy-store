"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative mt-12">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="oklch(0.35 0.02 240)"
          />
          <path
            d="M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92C840 94 960 98 1080 100C1200 102 1320 102 1380 102L1440 102V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="oklch(0.25 0.02 240)"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="bg-[oklch(0.25_0.02_240)] text-white pt-32 pb-8">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-12 mb-12">

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">

            

                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link href="/terms-conditions" className="text-gray-300 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors">
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link href="/shipping-policy" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>

              </ul>
            </div>

            {/* Support Email */}
            <div>
              <h3 className="text-xl font-bold mb-4">Support</h3>
              <p className="text-gray-300 mb-3">
                Need help with your order or have questions?
              </p>

              <a
                href="mailto:zenvvix@gmail.com"
                className="text-lg font-semibold text-white hover:underline"
              >
                zenvvix@gmail.com
              </a>

              <p className="text-gray-400 text-sm mt-2">
                We usually reply within 24 hours.
              </p>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026, Stress Key Powered by ZENVIX
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}