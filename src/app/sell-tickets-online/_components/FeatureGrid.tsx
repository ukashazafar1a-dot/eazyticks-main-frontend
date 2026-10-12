import { Card } from "@/components/ui/card"
import { BiCheckCircle, BiLogIn, BiWallet } from "react-icons/bi"
import { BsMegaphone } from "react-icons/bs"
import { HiSparkles } from "react-icons/hi2"
import { LuBarChart3 } from "react-icons/lu"

const features = [
  {
    icon: HiSparkles,
    title: "Create Events",
    description: "Set up events with custom details and settings",
  },
  {
    icon: BiCheckCircle,
    title: "Manage Tickets",
    description: "Control pricing, quantity, and ticket types",
  },
  {
    icon: LuBarChart3,
    title: "Track Sales",
    description: "Monitor real-time sales and analytics",
  },
  {
    icon: BiLogIn,
    title: "Check-In",
    description: "Seamless attendee verification on the day",
  },
  {
    icon: BiWallet,
    title: "Payouts",
    description: "Quick and secure payment processing",
  },
  {
    icon: BsMegaphone,
    title: "Promote",
    description: "Built-in marketing tools to reach audiences",
  },
]

export function FeatureGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/20 bg-gradient-to-t from-red-50/10 to-red-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground">Complete tools to create, manage, and grow your events</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-6 gap-0">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
