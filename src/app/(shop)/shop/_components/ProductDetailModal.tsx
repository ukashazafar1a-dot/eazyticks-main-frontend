"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  organizerCode,
  onClose,
}: Props) {
  const { addItem } = useShopCart();
  const variants = product.variants ?? [];
  const options = (product.options ?? []) as ShopProductOption[];
  const modifiers = (product.modifiers ?? []) as ShopModifier[];

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [addedFlash, setAddedFlash] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [modifierChoices, setModifierChoices] = useState<
    Record<number, ShopModifierOption | undefined>
  >({});
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Initialize options
  useEffect(() => {
    if (options.length === 0) return;
    const initial: Record<string, string> = {};
    options.forEach((opt) => {
      initial[opt.name] = opt.values?.[0] ?? "";
    });
    setSelectedOptions(initial);
  }, [product.id]);

  // Initialize modifiers
  useEffect(() => {
    const init: Record<number, ShopModifierOption | undefined> = {};
    for (const m of modifiers) {
      if (m.options?.[0]) init[m.id] = m.options[0];
    }
    setModifierChoices(init);
  }, [product.id]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const activeVariant = useMemo(() => {
    if (variants.length === 0) return null;
    if (options.length === 0) return variants[0] ?? null;
    return (
      variants.find((variant: ShopProductVariant) =>
        options.every((opt: ShopProductOption, index: number) => {
          const key = `option${index + 1}` as keyof ShopProductVariant;
          return variant[key] === selectedOptions[opt.name];
        }),
      ) ?? variants[0]
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
    [options, selectedOptions],
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

  const stockLabel = activeVariant ? "In stock" : "";

  const handleAdd = useCallback(() => {
    if (!activeVariant) return;

    const cartLineId = generateLineId(
      organizerCode,
      product.id,
      activeVariant.id,
      modifierPayload,
      variantOptions,
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
      quantity,
    );

    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 800);
  }, [
    activeVariant,
    organizerCode,
    product,
    modifierPayload,
    unitPrice,
    variantOptions,
    note,
    quantity,
    allImages,
    addItem,
  ]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 shop-overlay"
        onClick={onClose}
      />

      {/* Modal Ã¢â‚¬â€ bottom-sheet on mobile, centered on desktop */}
      <div className="relative z-10 w-full md:max-w-3xl lg:max-w-4xl md:mx-4 max-h-[90vh] md:max-h-[85vh] overflow-hidden rounded-t-3xl md:rounded-2xl bg-white shadow-2xl shop-bottom-sheet md:shop-modal-content">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-700"
          aria-label="Close"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Drag handle (mobile) */}
        <div className="flex justify-center py-2 md:hidden">
          <div className="h-1 w-10 rounded-full bg-neutral-300" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(90vh-60px)] md:max-h-[calc(85vh-0px)] smart-scrollbar">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image gallery */}
            <div className="relative bg-neutral-100">
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allImages[activeImageIdx] || "/productPlaceholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto smart-scrollbar">
                  {allImages.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIdx(i)}
                      className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        i === activeImageIdx
                          ? "border-[#F45B2A] ring-1 ring-[#F45B2A]/30"
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
            <div className="flex flex-col p-5 md:p-6">
              {/* Title & collections */}
              <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl pr-8">
                {product.name}
              </h2>

              {product.collections && product.collections.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.collections.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                    >
                      {typeof c === "string"
                        ? c
                        : ((c as { name?: string }).name ??
                          (c as { title?: string }).title ??
                          "Collection")}
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#F45B2A]">
                  {formatMoney(unitPrice)}
                </span>
                {activeVariant?.compareAtPrice != null &&
                  activeVariant.compareAtPrice > activeVariant.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatMoney(activeVariant.compareAtPrice)}
                    </span>
                  )}
                {activeVariant?.compareAtPrice != null &&
                  activeVariant.compareAtPrice > activeVariant.price && (
                    <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {Math.round(
                        ((activeVariant.compareAtPrice - activeVariant.price) /
                          activeVariant.compareAtPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
              )}

              {/* Variant options */}
              {options.map((option) => (
                <div key={option.name} className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {option.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                        className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                          selectedOptions[option.name] === value
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
                <div key={mod.id} className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {mod.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                        className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                          modifierChoices[mod.id]?.id === opt.id
                            ? "border-[#F45B2A] bg-[#F45B2A]/5 text-[#F45B2A] ring-1 ring-[#F45B2A]/20"
                            : "border-neutral-200 bg-white text-foreground hover:border-neutral-300"
                        }`}
                      >
                        {opt.name}
                        {opt.price !== 0 && (
                          <span className="ml-1 text-xs opacity-80">
                            ({opt.price > 0 ? "+" : ""}
                            {formatMoney(opt.price)})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50">
                  <button
                    type="button"
                    className="px-3.5 py-2 text-lg leading-none text-neutral-600 hover:bg-neutral-100 rounded-l-xl transition"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="px-3.5 py-2 text-lg leading-none text-neutral-600 hover:bg-neutral-100 rounded-r-xl transition"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                {activeVariant != null && (
                  <span className="text-xs font-medium text-green-600">
                    {stockLabel}
                  </span>
                )}
              </div>

              {/* Note */}
              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Note{" "}
                  <span className="font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-[#F45B2A]/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#F45B2A]/20 transition"
                  placeholder="Allergies, special instructions…"
                />
              </div>

              {/* Spacer pushes button to bottom */}
              <div className="flex-1" />

              {/* Add to cart */}
              <div className="mt-5 flex gap-3 sticky bottom-0 bg-white pt-3 pb-1 border-t border-neutral-100 md:border-0 md:pt-0">
                <button
                  type="button"
                  disabled={!activeVariant || variants.length === 0}
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] ${
                    addedFlash
                      ? "bg-[#28C76F] shop-added-flash"
                      : "bg-[#F45B2A] hover:bg-[#e04d20] hover:shadow-md"
                  }`}
                >
                  {addedFlash ? (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Added!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Add to Cart · {formatMoney(unitPrice * quantity)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
