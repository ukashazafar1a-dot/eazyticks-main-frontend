"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to create an event?",
    answer:
      "Most organizers can set up a basic event in 5-10 minutes. More complex events with multiple ticket tiers may take 15-20 minutes.",
  },
  {
    question: "Can I edit my event after publishing?",
    answer:
      "Yes! You can edit most event details at any time. Certain changes like event date may require ticket holder notifications.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "EazyTicks supports credit cards, debit cards, mobile wallets, and bank transfers depending on your location.",
  },
  {
    question: "How do I promote my event?",
    answer:
      "Use our built-in promotional tools including social media sharing, email marketing, and promotional codes for discounts.",
  },
  {
    question: "Is there a limit to ticket sales?",
    answer:
      "No maximum limit! EazyTicks handles events from intimate gatherings to large-scale events with thousands of attendees.",
  },
  {
    question: "How do payouts work?",
    answer:
      "Payouts are processed automatically after ticket sales. You can withdraw funds to your bank account with minimal fees.",
  },
  {
    question: "Can I offer different ticket types?",
    answer: "Create multiple ticket tiers with different prices, quantities, and features tailored to your audience.",
  },
  {
    question: "What if I need customer support?",
    answer:
      "Our support team is available 24/7 through chat, email, and phone to help you with any questions or issues.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about creating events on EazyTicks
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
