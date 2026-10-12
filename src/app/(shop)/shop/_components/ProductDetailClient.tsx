"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useShopCart } from "../lib/shop-cart-context";
import { generateLineId } from "../lib/cart-storage";
import type {
  CheckoutModifierPayload,
  ShopModifier,
  ShopModifierOption,
  ShopProductDetails,
  ShopProductOption,
  ShopProductVariant,
} from "../lib/types";

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface Props {
  product: ShopProductDetails;
  organizerCode: string;
  organizerName?: string;
}

export default function ProductDetailClient({
  product,
  organizerCode,
  organizerName,
}: Props) {
  const { addItem, setActiveOrganizer } = useShopCart();
  const variants = product.variants ?? [];
  const options = (product.options ?? []) as ShopProductOption[];
  const modifiers = (product.modifiers ?? []) as ShopModifier[];

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [addedFlash, setAddedFlash] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [modifierChoices, setModifierChoices] = useState<Record<number, ShopModifierOption | undefined>>({});
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const breadcrumbOrganizerLabel = organizerName || organizerCode;

  // Set active organizer on mount
  useEffect(() => {
    setActiveOrganizer(organizerCode);
  }, [organizerCode, setActiveOrganizer]);

  useEffect(() => {
    if (options.length === 0) return;
    const initial: Record<string, string> = {};
    options.forEach((opt) => {
      initial[opt.name] = opt.values?.[0] ?? "";
    });
    setSelectedOptions(initial);
  }, [product.id, options]);

  useEffect(() => {
    const init: Record<number, ShopModifierOption | undefined> = {};
    for (const m of modifiers) {
      if (m.options?.[0]) init[m.id] = m.options[0];
    }
    setModifierChoices(init);
  }, [product.id, modifiers]);

  const activeVariant = useMemo(() => {
    if (variants.length === 0) return null;
    if (options.length === 0) return variants[0] ?? null;

    return (
      variants.find((variant: ShopProductVariant) => {
        return options.every((opt: ShopProductOption, index: number) => {
          const key = `option${index + 1}` as keyof ShopProductVariant;
          return variant[key] === selectedOptions[opt.name];
        });
      }) ?? variants[0]
    );
  }, [selectedOptions, variants, options]);

  const modifierPayload: CheckoutModifierPayload[] = useMemo(() => {
    const list: CheckoutModifierPayload[] = [];
    for (const m of modifiers) {
      const choice = modifierChoices[m.id];
      if (!choice) continue;
      list.push({
        id: m.id,
        name: m.name,
        options: [
          {
            optionId: choice.id,
            optionName: choice.name,
            priceAdjustment: choice.price ?? 0,
          },
        ],
      });
    }
    return list;
  }, [modifiers, modifierChoices]);

  const variantOptions = useMemo(
    () =>
      options
        .map((option) => ({
          name: option.name,
          value: selectedOptions[option.name],
        }))
        .filter((option) => option.value),
    [options, selectedOptions]
  );

  const unitPrice = useMemo(() => {
    let base = activeVariant?.price ?? product.startingPrice ?? 0;
    for (const m of modifierPayload) {
      for (const o of m.options) {
        base += o.priceAdjustment ?? 0;
      }
    }
    return base;
  }, [activeVariant, modifierPayload, product.startingPrice]);

  const allImages = useMemo(() => {
    const imgs: string[] = [];
    if (product.image) imgs.push(product.image);
    if (product.images) {
      for (const img of product.images) {
        if (!imgs.includes(img)) imgs.push(img);
      }
    }
    if (imgs.length === 0) imgs.push("/productPlaceholder.svg");
    return imgs;
  }, [product.image, product.images]);

  if (variants.length === 0) {
    return (
      <div className="container px-4 py-20 text-center shop-animate-in">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
            <svg className="h-10 w-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This product is currently unavailable for purchase.
          </p>
          <Link
            href={`/shop/organizers/${organizerCode}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F45B2A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#e04d20] hover:shadow-md"
          >
            Back to Organizer Shop
          </Link>
        </div>
      </div>
    );
  }

  const stockLabel = activeVariant ? "In stock" : "";

  const handleAdd = () => {
    if (!activeVariant) return;

    const cartLineId = generateLineId(
      organizerCode,
      product.id,
      activeVariant.id,
      modifierPayload,
      variantOptions
    );

    addItem(
      {
        id: cartLineId,
        name: product.name,
        price: unitPrice,
        productId: product.id,
        variantId: activeVariant.id,
        variantName: activeVariant.name,
        variantOptions,
        organizerCode,
        modifiers: modifierPayload,
        note: note.trim(),
        image: allImages[0] || null,
      },
      quantity
    );

    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 800);
  };

  return (
    <div className="container px-4 py-8 md:py-12 shop-animate-in">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/shop/organizers" className="hover:text-foreground transition-colors">
          Organizers
        </Link>
        <span>›</span>
        <Link
          href={`/shop/organizers/${organizerCode}`}
          className="hover:text-foreground transition-colors"
        >
          {breadcrumbOrganizerLabel}
        </Link>
        <span>›</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allImages[activeImageIdx] || "/productPlaceholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 smart-scrollbar">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${i === activeImageIdx
                    ? "border-[#F45B2A] ring-2 ring-[#F45B2A]/20 ring-offset-1"
                    : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight md:text-3xl">
            {product.name}
          </h1>

          {product.collections && product.collections.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(product.collections as string[]).map((c, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-primary px-3 py-1 text-sm font-medium text-white">
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-4xl font-bold text-[#F45B2A]">
              {formatMoney(unitPrice)}
            </span>
            {activeVariant?.compareAtPrice != null && activeVariant.compareAtPrice > activeVariant.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatMoney(activeVariant.compareAtPrice)}
                </span>
                <span className="rounded-lg bg-green-100 px-2.5 py-1 text-sm font-bold text-green-700">
                  {Math.round(
                    ((activeVariant.compareAtPrice - activeVariant.price) /
                      activeVariant.compareAtPrice) *
                    100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {product.description ? (
            <div className="mt-8 text-base leading-relaxed text-muted-foreground">
              <p className="whitespace-pre-wrap">{product.description}</p>
            </div>
          ) : (
            <p className="mt-8 text-muted-foreground">
              Detailed description coming soon.
            </p>
          )}

          <div className="mt-8 h-px bg-neutral-200" />

          {/* Variants */}
          {options.map((option) => (
            <div key={option.name} className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
                {option.name}
              </p>
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [option.name]: value,
                      }))
                    }
                    className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${selectedOptions[option.name] === value
                      ? "border-[#F45B2A] bg-[#F45B2A]/5 text-[#F45B2A] ring-1 ring-[#F45B2A]/20"
                      : "border-neutral-200 bg-white text-foreground hover:border-neutral-300"
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Modifiers */}
          {modifiers.map((mod: ShopModifier) => (
            <div key={mod.id} className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
                {mod.name}
              </p>
              <div className="flex flex-wrap gap-3">
                {mod.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setModifierChoices((prev) => ({
                        ...prev,
                        [mod.id]: opt,
                      }))
                    }
                    className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${modifierChoices[mod.id]?.id === opt.id
                      ? "border-[#F45B2A] bg-[#F45B2A]/5 text-[#F45B2A] ring-1 ring-[#F45B2A]/20"
                      : "border-neutral-200 bg-white text-foreground hover:border-neutral-300"
                      }`}
                  >
                    {opt.name}
                    {opt.price !== 0 && (
                      <span className="ml-1.5 opacity-70 font-normal text-xs">
                        ({opt.price > 0 ? "+" : ""}
                        {formatMoney(opt.price)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 h-px bg-neutral-200" />

          {/* Quantity & Stock */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="text-sm font-bold uppercase tracking-wide text-foreground">
              Quantity
            </span>
            <div className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50 p-1">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-xl hover:bg-white hover:shadow-sm transition"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-[3rem] text-center text-base font-bold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-xl hover:bg-white hover:shadow-sm transition"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            {activeVariant != null && (
              <span className="text-sm font-bold text-green-600">
                {stockLabel}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="mt-8">
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-foreground">
              Note <span className="font-normal text-muted-foreground normal-case">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:border-[#F45B2A]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F45B2A]/20 transition"
              placeholder="Allergies, special instructions, gift messages..."
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              disabled={!activeVariant}
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] ${addedFlash
                ? "bg-[#000502] shop-added-flash"
                : "bg-[#F45B2A] hover:bg-[#e04d20] hover:shadow-md"
                }`}
            >
              {addedFlash ? (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart · {formatMoney(unitPrice * quantity)}
                </>
              )}
            </button>
            <Link
              href="/shop/cart"
              className="flex items-center justify-center rounded-xl border-2 border-neutral-200 bg-white px-8 py-4 text-base font-bold text-foreground transition hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98]"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
