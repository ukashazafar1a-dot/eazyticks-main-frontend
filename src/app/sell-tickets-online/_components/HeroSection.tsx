import routes from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-8 px-4 md:px-8" style={{
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundImage:
          "url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398475/ezt-frontend-client-assets/bg-img-1_dzjvmu.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398498/ezt-frontend-client-assets/bg-img-2_zbkxfr.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398518/ezt-frontend-client-assets/bg-img-3_ayrlx8.png)",
      }}>
      <div className="max-w-7xl mx-auto md:py-12">
        <div className="grid gap-12 items-center">
          <div className="space-y-6 p-6 md:px-12 md:py-8 rounded-lg bg-white/90 max-w-4xl me-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Create Events in <span className="text-primary">Minutes</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Master the art of event creation with EazyTicks. Follow our simple
              6-step guide and launch your event effortlessly.
            </p>
            <div className="flex gap-4 mb-6">
              <Link href={routes?.account?.signin} className="btn btn--primary">
                Get Started
                <BsArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
