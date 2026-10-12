import { Organizer } from "@/lib/shopTypes";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface OrganizerCardProps {
  className?: string;
  item: Organizer;
}

const OrganizerCard = ({ className = "", item }: OrganizerCardProps) => {
  const imageUrl = item.img?.split(";")[1] || "/productPlaceholder.svg";

  return (
    <Link
      href={`/shop/organizers/${item?.code}`}
      className={`group block ${className}`}
    >
      <div className="shop-card-hover overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={imageUrl}
            alt={item?.name || "Organizer"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Hover CTA */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-[#F45B2A] shadow-lg backdrop-blur-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Shop
            </span>
          </div>

          {/* Product count badge */}
          {item?.products > 0 && (
            <div className="absolute right-3 top-3">
              <span className="inline-flex items-center rounded-lg bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {item.products} {item.products === 1 ? "product" : "products"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {item?.name && (
                <h3 className="truncate text-lg font-semibold text-foreground group-hover:text-[#F45B2A] transition-colors">
                  {item.name}
                </h3>
              )}
              <div className="mt-1.5 flex items-center gap-3 text-sm text-muted-foreground">
                {item?.collections > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {item.collections} collections
                  </span>
                )}
              </div>
            </div>
            {/* Arrow icon */}
            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-all group-hover:bg-[#F45B2A] group-hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrganizerCard;