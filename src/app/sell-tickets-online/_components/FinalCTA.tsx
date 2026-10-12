import routes from "@/lib/routes";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";


export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Launch Your Event?
          </h2>
          <p className="text-xl text-white">
            Join thousands of organizers using EazyTicks to create memorable events
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={routes?.account?.signin} className="btn btn--secondary">
            Create Event Now
            <BsArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href={routes?.contactUs}
            className="btn btn--outline !text-white !border-white"
          >
            Schedule Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
