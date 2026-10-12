"use client";

import Link from "next/link";
import { BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineStadium } from "react-icons/md";

export default function LargeEventsSection() {
  const features = [
    {
      icon: MdOutlineStadium,
      title: "Custom Event Support",
      description: "Work with our senior event specialists to plan large-scale events, from crowd flow to ticketing setup",
    },
    {
      icon: IoTicketOutline,
      title: "Advanced Analytics & Insights",
      description: "Get deeper sales, audience, and performance insights to make smarter decisions.",
    },
    {
      icon: BiSupport,
      title: "24/7 Assistance",
      description: "Skip the queue, large event organizers get a dedicated support line for immediate assistance.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-amber-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Grow & Scale - Large Events Faster
        </h2>
        <p className="text-lg text-foreground/70 mb-16">
          Get expert guidance, marketing support, and priority tools to expand
          your events reach and maximize impact effortlessly
        </p>
      </div>
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx}>
                <Icon className="w-12 h-12 text-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2 text-lg md:text-xl">{feature.title}</h3>
                <p className="text-sm text-foreground/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/contact-us"
          className="btn btn--secondary mx-auto max-w-60 !shadow-none"
        >
          Reach out to us
        </Link>
      </div>
    </section>
  );
}
