"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useShopCart } from "../lib/shop-cart-context";

export default function ShopNav() {
  const { totalItems } = useShopCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [bouncing, setBouncing] = useState(false);

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bounce badge when count changes
  useEffect(() => {
    if (totalItems !== prevCount && totalItems > 0) {
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), 300);
      setPrevCount(totalItems);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "shop-glass shadow-sm"
          : "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      } border-b border-neutral-200/80`}
    >
      <div className="container flex items-center justify-between gap-4 px-4 py-3">
        {/* Logo / Brand */}
        <Link
          href="/shop/organizers"
          className="flex items-center gap-2.5 group"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-[#F45B2A] to-[#ff7e54] p-[5px] shadow-sm transition group-hover:shadow-md">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-white">
              <path
                d="M3 9.5L12 4l9 5.5v9L12 24l-9-5.5v-9z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M12 4l9 5.5M12 4L3 9.5M12 4v9m9 0v-4.5M3 9.5v9L12 24m9-5.5L12 24m0-10.5l9-4m-9 4l-9-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Eazy<span className="text-[#F45B2A]">Shop</span>
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/shop/organizers"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/shop/organizers")
                ? "bg-[#F45B2A]/10 text-[#F45B2A]"
                : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
            }`}
          >
            Organizers
          </Link>

          <Link href="/" className="hidden sm:inline-flex rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground">
            Home
          </Link>

          {/* Cart button */}
          <Link
            href="/shop/cart"
            className={`relative inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-all hover:shadow ${
              isActive("/shop/cart")
                ? "border-[#F45B2A]/30 bg-[#F45B2A]/5 text-[#F45B2A]"
                : "border-neutral-200 bg-white text-foreground hover:border-neutral-300"
            }`}
          >
            {/* Cart icon */}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span
                className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F45B2A] px-1.5 text-[11px] font-bold text-white shadow-sm ${
                  bouncing ? "shop-cart-bounce" : ""
                }`}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
