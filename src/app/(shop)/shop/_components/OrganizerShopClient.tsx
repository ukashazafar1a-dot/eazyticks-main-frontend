"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import CartFloatingButton from "./CartFloatingButton";
import SkeletonProductCard from "./SkeletonProductCard";
import ShopNav from "./ShopNav";
import { useShopCart } from "../lib/shop-cart-context";
import { parseShopImage } from "../lib/images";
import { fetchProductDetails } from "../lib/fetchers";
import type { ShopProductDetails, ShopProductListItem } from "../lib/types";

type OrganizerRow = {
  id: number;
  code: string;
  name: string;
  img: string;
  collections: number;
  products: number;
};

function collectionKey(c: {
  id?: number;
  name?: string;
  title?: string;
}): string {
  if (c.name) return c.name;
  if (c.title) return c.title;
  if (c.id != null) return String(c.id);
  return "";
}

interface Props {
  organizer: OrganizerRow | null;
  products: ShopProductListItem[];
  code: string;
}

export default function OrganizerShopClient({
  organizer,
  products,
  code,
}: Props) {
  const { setActiveOrganizer, totalItems, cartTotal } = useShopCart();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<
    "featured" | "price-asc" | "price-desc" | "name"
  >("featured");
  const [collectionFilter, setCollectionFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(12);

  // Modal state
  const [modalProduct, setModalProduct] = useState<ShopProductDetails | null>(
    null
  );
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  // Set active organizer for scoped cart on mount
  useEffect(() => {
    setActiveOrganizer(code);
  }, [code, setActiveOrganizer]);

  const bannerUrl = organizer ? parseShopImage(organizer.img) : null;

  const collectionOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) {
      for (const c of p.collections ?? []) {
        const key = collectionKey(c);
        if (!key) continue;
        map.set(key, key);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (collectionFilter !== "all") {
      list = list.filter((p) =>
        (p.collections ?? []).some((c) => collectionKey(c) === collectionFilter)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.startingPrice ?? 0) - (b.startingPrice ?? 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.startingPrice ?? 0) - (a.startingPrice ?? 0));
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [products, search, sort, collectionFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [search, sort, collectionFilter]);

  const visibleProducts = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  // Open product detail modal
  const handleViewDetails = useCallback(
    async (productId: number) => {
      setLoadingProductId(productId);
      try {
        const details = await fetchProductDetails(String(productId), code);
        if (details) {
          setModalProduct(details);
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoadingProductId(null);
      }
    },
    [code]
  );

  return (
    <div className="pb-24 md:pb-16">
      {/* Banner */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        {bannerUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        {/* Decorative blur */}
        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#F45B2A]/20 blur-[80px]" />

        <div className="relative container px-4 py-14 md:py-20 shop-animate-in">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link
              href="/shop/organizers"
              className="hover:text-white transition-colors"
            >
              Organizers
            </Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{organizer?.name ?? "Shop"}</span>
          </nav>

          <div className="max-w-3xl space-y-4 text-white">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {organizer?.name ?? "Shop"}
            </h1>
            <p className="text-sm text-white/75 md:text-base max-w-2xl">
              Browse collections, filter by category, and open any product for
              variants, optional add-ons, and checkout.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {products.length} products
              </span>
              {organizer != null && organizer.collections > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {organizer.collections} collections
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <ShopNav />

      {/* Toolbar */}
      <div className="container space-y-6 px-4 pt-8">
        {/* Sticky cart preview (desktop) */}
        {totalItems > 0 && (
          <div className="hidden md:flex items-center justify-between rounded-2xl border border-[#F45B2A]/20 bg-[#F45B2A]/5 px-6 py-3 shop-animate-in">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F45B2A] text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                </p>
                <p className="text-xs text-muted-foreground">
                  Subtotal: ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <Link
              href={`/shop/organizers/${code}/checkout`}
              className="rounded-xl bg-[#F45B2A] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#e04d20] hover:shadow-md active:scale-[0.98]"
            >
              Checkout →
            </Link>
          </div>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:border-[#F45B2A]/50 focus:outline-none focus:ring-1 focus:ring-[#F45B2A]/20"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="min-w-[160px] rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[#F45B2A]/50 focus:outline-none focus:ring-1 focus:ring-[#F45B2A]/20"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A–Z)</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
            {collectionOptions.length > 0 && (
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Collection
                </label>
                <select
                  value={collectionFilter}
                  onChange={(e) => setCollectionFilter(e.target.value)}
                  className="min-w-[180px] rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[#F45B2A]/50 focus:outline-none focus:ring-1 focus:ring-[#F45B2A]/20"
                >
                  <option value="all">All collections</option>
                  {collectionOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          of {products.length} products
        </p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shop-animate-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
              <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground">No matches</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another search term or clear filters.
            </p>
            <button
              type="button"
              className="mt-6 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-neutral-50"
              onClick={() => {
                setSearch("");
                setCollectionFilter("all");
                setSort("featured");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 shop-stagger">
              {visibleProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    id={product.id}
                    code={code}
                    name={product.name}
                    image={product.image}
                    startingPrice={product.startingPrice}
                    collections={product.collections ?? []}
                    onViewDetails={handleViewDetails}
                  />
                  {loadingProductId === product.id && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                      <div className="h-8 w-8 rounded-full border-2 border-[#F45B2A] border-t-transparent shop-spinner" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="rounded-xl border border-neutral-200 bg-white px-8 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-neutral-50 hover:shadow-md active:scale-95"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating cart button (mobile) */}
      <CartFloatingButton organizerCode={code} />

      {/* Product Detail Modal */}
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          organizerCode={code}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}
