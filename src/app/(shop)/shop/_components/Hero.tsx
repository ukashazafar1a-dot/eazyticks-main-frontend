"use client";

import React, { useState } from "react";

interface HeroProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const Hero = ({ searchValue = "", onSearchChange }: HeroProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleChange = (val: string) => {
    setLocalSearch(val);
    onSearchChange?.(val);
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden px-4 md:min-h-[60vh] min-h-[45vh]"
      style={{
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundImage:
          "url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398475/ezt-frontend-client-assets/bg-img-1_dzjvmu.png)",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F45B2A]/20 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#F45B2A]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center shop-animate-in">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#28C76F] animate-pulse" />
          Verified Organizers
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Explore Organizer{" "}
          <span className="bg-gradient-to-r from-[#F45B2A] to-[#ff9a6c] bg-clip-text text-transparent">
            Shops
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-white/75 sm:text-lg md:text-xl">
          Browse verified organizers, discover their products, and shop directly
          from trusted event hosts on EazyTicks.
        </p>

        {/* Search bar */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={localSearch}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search organizers…"
              className="w-full rounded-2xl border-0 bg-white/95 py-3.5 pl-11 pr-4 text-sm text-neutral-900 shadow-xl ring-1 ring-inset ring-white/30 backdrop-blur-sm placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F45B2A]/50 transition-all sm:text-base"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Trusted Organizers
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure Checkout
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" />
          <div className="hidden sm:flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Delivery
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
