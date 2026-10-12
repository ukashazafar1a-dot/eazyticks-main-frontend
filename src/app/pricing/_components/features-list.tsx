"use client"

import Link from "next/link"
import { BiCheck } from "react-icons/bi"


const features = [
  // Event Creation & Management
  {
    category: "Event Creation & Management",
    items: [
      "Customizable event pages",
      "Multi-event management",
      "Event scheduling tools",
      "Event analytics",
      "Draft and publish controls",
    ],
  },
  // Ticketing
  {
    category: "Ticketing",
    items: ["Free & paid tickets", "Tiered pricing", "Dynamic pricing", "Early bird pricing"],
  },
  // Selling & Revenue
  {
    category: "Selling & Revenue",
    items: [
      "Additional products & merchandise",
      "Parking pass sales",
      "Donation collection",
      "Payment processing",
      "Multiple payment methods",
    ],
  },
  // Attendee Management
  {
    category: "Attendee Management",
    items: [
      "Guest list management",
      "Check-in tools",
      "QR code generation",
      "Mobile check-in app",
      "Attendee data export",
    ],
  },
  // Marketing & Promotion
  {
    category: "Marketing & Promotion",
    items: [
      "Email campaigns",
      "Social media tools",
      "Smart audiences",
      "Data insights and reporting",
    ],
  },
  // Support
  {
    category: "Support",
    items: [
      "24/7 customer support",
      "Email support",
      "Help center",
      "Phone support",
      "Dedicated account manager",
    ],
  },
]

export default function FeaturesList() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Everything You Need</h2>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {features.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold mb-6 text-foreground">{group.category}</h3>
              <ul className="space-y-3">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <BiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/features" className="bg-black hover:bg-black/90 text-white rounded-full px-8 inline-block py-3">
            Learn more about our features
          </Link>
        </div>
      </div>
    </section>
  )
}
