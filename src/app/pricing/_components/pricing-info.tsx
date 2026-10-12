"use client"
import Link from "next/link"

export default function PricingInfo() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Free option */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Free for organizers</h3>
            <p className="text-foreground/70 mb-6">
              Create events and start selling tickets immediately with no upfront fees.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-foreground/70">
              <li>✓ Unlimited events</li>
              <li>✓ Full event management tools</li>
              <li>✓ Mobile check-in app</li>
              <li>✓ Community support</li>
            </ul>
            <Link href="/account/signin" className="btn btn--secondary max-w-60 me-auto">
              Get started for free
            </Link>
          </div>

          {/* Right side - Pricing structure */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Pricing that Scales</h3>
            <p className="text-foreground/70 mb-6">
              Our transparent, flexible pricing grows with your events. Choose what works best for you:
            </p>
            <ul className="space-y-4 text-sm mb-8">
              <li>
                <strong className="text-foreground">Processing Fees</strong>
                <p className="text-foreground/70">Competitive rates applied only on paid tickets</p>
              </li>
              <li>
                <strong className="text-foreground">Premium Features</strong>
                <p className="text-foreground/70">Advanced tools and services available as add-ons</p>
              </li>
              <li>
                <strong className="text-foreground">Enterprise Solutions</strong>
                <p className="text-foreground/70">Custom pricing for large-scale events and organizations</p>
              </li>
            </ul>
            <Link href="/contact-us" className="text-sm text-blue-600 font-semibold mt-8 border-b">
              Contact our sales team to discuss your specific needs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
