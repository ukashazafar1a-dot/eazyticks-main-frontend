import React from "react";

export default function SkeletonProductCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
      <div className="aspect-square shop-skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-4/5 shop-skeleton rounded" />
        <div className="h-4 w-2/5 shop-skeleton rounded" />
        <div className="h-9 w-full shop-skeleton rounded-lg" />
      </div>
    </div>
  );
}
