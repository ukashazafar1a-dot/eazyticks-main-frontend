"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FaqSection() {
  const faqs = [
    {
      question: "What is Eazyticks?",
      answer:
        "Eazyticks is an event discovery and ticketing platform that allows organizers to publish events and sell tickets easily while helping attendees discover experiences across their city.",
    },
    {
      question: "How can I create an event on Eazyticks?",
      answer:
        "You can create an event by signing up as an organizer, filling in your event details, selecting ticket types, and publishing your event from your dashboard. The process takes only a few minutes.",
    },
    {
      question: "How do attendees receive their tickets?",
      answer:
        "After completing the payment, attendees immediately receive their e-ticket via email and in their Eazyticks account. Tickets can be shown digitally at the event entrance.",
    },
    {
      question: "How can organizers track event performance?",
      answer:
        "Organizers have access to a dedicated analytics dashboard that provides real-time insights such as page views, ticket sales, revenue, and attendee demographics.",
    },
    {
      question: "Does Eazyticks support online payments?",
      answer:
        "Yes, Eazyticks supports secure online payments through multiple payment providers. All transactions are encrypted, ensuring safety for attendees and organizers.",
    },
    {
      question: "Are refunds supported?",
      answer:
        "Organizers can set and manage their own refund policies. If eligible, attendees may submit a refund request, and the organizer can approve or decline it.",
    },
    {
      question: "Can I manage multiple events under one account?",
      answer:
        "Yes, organizers can create and manage unlimited events under a single account, with centralized control for tickets, analytics, and payouts.",
    },
    {
      question: "Is customer support available?",
      answer:
        "Eazyticks provides support through email and live chat for both attendees and organizers. Dedicated support options are available for premium organizers.",
    },
  ];
  return (
    <section className="pb-20 pt-12 px-4 bg-gray-50/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-foreground/60 mb-12">
          Everything you need to know about EazyTicks pricing
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-lg text-left font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-16">
          <p className="text-foreground/70 mb-4">Still have questions?</p>
          <Link href="/contact-us" className="btn btn--secondary mx-auto max-w-72 !py-4 !rounded-full !shadow-none">
            Contact our sales team
          </Link>
        </div>
      </div>
    </section>
  );
}
