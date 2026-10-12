import React from "react";

export default function SkeletonOrganizerCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
      <div className="aspect-[4/3] shop-skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 shop-skeleton rounded" />
        <div className="h-4 w-1/2 shop-skeleton rounded" />
      </div>
    </div>
  );
}
