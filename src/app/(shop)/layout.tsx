"use client";

import { ShopCartProvider } from "./shop/lib/shop-cart-context";
import { CheckoutProvider } from "./shop/lib/checkout-context";
import "./shop/lib/shop-animations.css";

export default function ShopRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopCartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-neutral-50">
          <main className="shop-animate-in">{children}</main>
        </div>
      </CheckoutProvider>
    </ShopCartProvider>
  );
}
