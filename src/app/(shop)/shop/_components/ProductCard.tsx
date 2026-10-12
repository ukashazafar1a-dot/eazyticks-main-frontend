"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  image: string | null;
  startingPrice: number;
  collections: unknown[];
  code: string;
  onViewDetails?: (id: number) => void;
}

function formatMoney(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "Price on request";
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function ProductCard({
  id,
  name,
  image,
  startingPrice,
  collections,
  code,
  onViewDetails,
}: Props) {
  const src = image || "/productPlaceholder.svg";

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm flex flex-col justify-between relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link
          href={`/shop/products/${id}?code=${code}`}
          className="absolute inset-0 z-0"
        >
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Hover overlay for Quick View */}
        {onViewDetails && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20 z-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onViewDetails(id);
            }}
          >
            {/* <button
              type="button"
              className="translate-y-4 rounded-xl bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#F45B2A] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              Quick View
            </button> */}
          </div>
        )}

        {/* Price badge */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center rounded-lg bg-white/95 px-3 py-1.5 text-sm font-bold text-foreground shadow-sm backdrop-blur-sm">
            {startingPrice > 0 ? (
              <>
                <span className="mr-0.5 text-xs font-normal text-muted-foreground">
                  from
                </span>
                {formatMoney(startingPrice)}
              </>
            ) : (
              <span className="text-muted-foreground">Price on request</span>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/shop/products/${id}?code=${code}`}
          className="hover:text-[#F45B2A] transition-colors"
        >
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-[#F45B2A] transition-colors">
            {name}
          </h3>
        </Link>
        {collections?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(collections as string[]).slice(0, 2).map((c, i) => (
              <Badge
                key={i}
                className="inline-block rounded-md bg-primary text-white px-2 py-0.5 text-xs font-medium"
              >
                {c}
              </Badge>
            ))}

            {collections.length > 2 && (
              <span className="inline-block rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                +{collections.length - 2}
              </span>
            )}
          </div>
        )}
        <div className="flex-1" />
        <Link
          href={`/shop/products/${id}?code=${code}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F45B2A] py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-[#e04d20] hover:shadow-md active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View Product
        </Link>
      </div>
    </div>
  );
}
