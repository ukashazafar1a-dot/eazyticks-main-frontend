"use client";

import React, { useMemo, useState } from "react";
import OrganizerCard from "./OrganizerCard";
import SkeletonOrganizerCard from "./SkeletonOrganizerCard";
import { Organizer } from "@/lib/shopTypes";

interface OrganizersProps {
  data: Organizer[];
  searchQuery?: string;
}

const Organizers = ({ data, searchQuery = "" }: OrganizersProps) => {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();
    return data.filter((item) => item.name?.toLowerCase().includes(q));
  }, [data, searchQuery]);

  if (!data || data.length === 0) {
    return (
      <div className="container px-4 py-20 text-center shop-animate-in">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
            <svg
              className="h-10 w-10 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            No organizers found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon — new organizer shops are being added regularly.
          </p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0 && searchQuery.trim()) {
    return (
      <div className="container px-4 py-16 text-center shop-animate-in">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
            <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No results for &quot;{searchQuery}&quot;
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container px-4 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {searchQuery.trim() ? "Search Results" : "All Organizers"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "organizer" : "organizers"} available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 shop-stagger">
        {filtered.map((item, index) => (
          <OrganizerCard key={item.id ?? index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Organizers;