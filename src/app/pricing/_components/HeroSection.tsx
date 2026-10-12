import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-t from-red-50/10 to-red-100 text-black py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          PUBLISH EVENTS FOR <span className="red">FREE</span>
          <br />
        </h1>
        <p className="text-base md:text-2xl mb-4 text-black">
          Powerful ticketing solutions for events of all sizes
        </p>
        <p className="max-w-3xl mx-auto text-black text-sm md:text-base">
          Enjoy transparent pricing—event publishing is free, and only paid tickets include a small ticketing fee, covered by attendees.
        </p>
        <Link href="/account/signin" className="inline-block mt-8 btn btn--primary mx-auto max-w-60 !shadow-none">
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
