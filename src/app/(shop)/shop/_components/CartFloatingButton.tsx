"use client";

import Link from "next/link";
import { useShopCart } from "../lib/shop-cart-context";

interface Props {
  organizerCode: string;
}

export default function CartFloatingButton({ organizerCode }: Props) {
  const { totalItems, cartTotal } = useShopCart();

  if (totalItems === 0) return null;

  const formatTotal = `$${cartTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Link
        href={`/shop/organizers/${organizerCode}/checkout`}
        className="relative flex items-center gap-3 rounded-2xl bg-[#F45B2A] px-5 py-3.5 text-white shadow-xl shadow-[#F45B2A]/25 transition-all hover:shadow-2xl hover:shadow-[#F45B2A]/30 active:scale-95 shop-float-btn"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-80">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
          <span className="text-sm font-bold">{formatTotal}</span>
        </div>
        {/* Badge */}
        <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-[#F45B2A] shadow-sm">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      </Link>
    </div>
  );
}
