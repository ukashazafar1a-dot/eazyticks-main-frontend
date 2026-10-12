"use client";

import Link from "next/link";
import { useShopCart } from "../lib/shop-cart-context";
import { useEffect, useState } from "react";
import { listStoredCarts, loadCart, getCartItemCount, getCartTotal } from "../lib/cart-storage";
import { fetchOrganizersList } from "../lib/fetchers";

import ShopNav from "../_components/ShopNav";

function formatMoney(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function ShopCartPage() {
  const {
    organizerCode,
    items,
    isEmpty,
    cartTotal,
    updateQuantity,
    removeItem,
  } = useShopCart();

  const [activeOrganizerName, setActiveOrganizerName] = useState<string | undefined>();

  // Show carts from all organizers
  const [allCarts, setAllCarts] = useState<
    { code: string; itemCount: number; total: number; name?: string }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const codes = listStoredCarts();
      if (codes.length === 0) {
        setAllCarts([]);
        setActiveOrganizerName(undefined);
        return;
      }

      let organizers: { code: string; name?: string }[] = [];
      try {
        const json = await fetchOrganizersList();
        organizers = json?.data?.items ?? [];
      } catch (error) {
        console.error("Failed to load organizer list", error);
        setAllCarts([]);
        setActiveOrganizerName(undefined);
        return;
      }

      const carts = codes
        .map((code) => {
          const cart = loadCart(code);
          if (!cart || cart.items.length === 0) return null;

          const organizer = organizers.find((o: { code: string }) => o.code === code);
          return {
            code,
            itemCount: getCartItemCount(cart.items),
            total: getCartTotal(cart.items),
            name: organizer?.name,
          };
        })
        .filter(Boolean) as { code: string; itemCount: number; total: number; name?: string }[];

      setAllCarts(carts);

      if (organizerCode) {
        const activeOrganizer = organizers.find((o: { code: string }) => o.code === organizerCode);
        setActiveOrganizerName(activeOrganizer?.name);
      } else {
        setActiveOrganizerName(undefined);
      }
    };

    load();
  }, [items, organizerCode]);

  if (isEmpty && allCarts.length === 0) {
    return (
      <>
        <ShopNav />
        <div className="container px-4 py-20 text-center shop-animate-in">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
              <svg className="h-10 w-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse organizers and add products to start shopping.
            </p>
            <Link
              href="/shop/organizers"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F45B2A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#e04d20] hover:shadow-md"
            >
              Find an organizer
            </Link>
          </div>
        </div>
      </>
    );
  }

  // If no active organizer but there are stored carts, show a list
  if (isEmpty && allCarts.length > 0) {
    return (
      <>
        <ShopNav />
        <div className="container px-4 py-10 md:py-14 shop-animate-in">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Carts</h1>
          <p className="text-sm text-muted-foreground mb-8">
            You have items saved across different organizer shops.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCarts.map((cart) => (
              <Link
                key={cart.code}
                href={`/shop/organizers/${cart.code}`}
                className="shop-card-hover rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{cart.name ?? cart.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-[#F45B2A]">
                    {formatMoney(cart.total)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ShopNav />
      <div className="container px-4 py-10 md:py-14 shop-animate-in">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shop Cart</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeOrganizerName ? (
                <>
                  <span className="font-medium text-foreground">
                    {activeOrganizerName}
                  </span>
                  <span className="text-muted-foreground"> · </span>
                </>
              ) : null}
              Review items before checkout
            </p>
          </div>
          <Link
            href={`/shop/organizers/${organizerCode}`}
            className="text-sm font-semibold text-[#F45B2A] hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/productPlaceholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-semibold leading-snug text-foreground">
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-1 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {formatMoney(item.price)} each
                  </p>
                  {item.variantName && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        Variant:
                      </span>{" "}
                      {item.variantName}
                    </p>
                  )}
                  {item.variantOptions && item.variantOptions.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                      {item.variantOptions.map((option, i) => (
                        <li key={`${option.name ?? "option"}-${i}`}>
                          <span className="font-medium text-foreground/80">
                            {option.name}:
                          </span>{" "}
                          {option.value}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.modifiers && item.modifiers.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                      {item.modifiers.map((m, i) => (
                        <li key={i}>
                          <span className="font-medium text-foreground/80">
                            {m.name}:
                          </span>{" "}
                          {m.options.map((o) => o.optionName).join(", ")}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.note && (
                    <p className="mt-1.5 text-xs italic text-muted-foreground">
                      Note: {item.note}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-base hover:bg-neutral-100 rounded-l-xl transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-1.5 text-base hover:bg-neutral-100 rounded-r-xl transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto text-sm font-bold text-foreground">
                      {formatMoney(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatMoney(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taxes and fees are finalized at checkout.
                </p>
              </div>
              <Link
                href={`/shop/organizers/${organizerCode}/checkout`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F45B2A] py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e04d20] hover:shadow-md active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>

        {/* Other organizer carts */}
        {allCarts.filter((c) => c.code !== organizerCode).length > 0 && (
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h3 className="text-lg font-semibold mb-4">
              Other Organizer Carts
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allCarts
                .filter((c) => c.code !== organizerCode)
                .map((cart) => (
                  <Link
                    key={cart.code}
                    href={`/shop/organizers/${cart.code}`}
                    className="shop-card-hover rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cart.name ?? cart.code}</span>
                      <span className="text-muted-foreground">
                        {cart.itemCount} items · {formatMoney(cart.total)}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
