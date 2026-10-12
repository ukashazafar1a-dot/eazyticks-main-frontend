/**
 * Organizer-scoped cart persistence layer.
 *
 * Each organizer's cart is stored under a unique localStorage key:
 *   shop_cart_{organizerCode}
 *
 * This ensures that switching between organizer shops does NOT mix
 * cart items; when the user returns to a previously visited organizer,
 * their cart reappears automatically.
 */

import type { CheckoutModifierPayload, ShopVariantOption } from "./types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ShopCartItem {
  /** Unique line id = `shop-{orgCode}-{productId}-{variantId}-{modSig}` */
  id: string;
  productId: number;
  variantId: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  organizerCode: string;
  variantName?: string;
  variantOptions?: ShopVariantOption[];
  modifiers: CheckoutModifierPayload[];
  note: string;
}

export interface ShopCart {
  organizerCode: string;
  items: ShopCartItem[];
  updatedAt: number; // epoch ms
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CART_PREFIX = "shop_cart_";
/** Cart entries older than 7 days are treated as expired */
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function storageKey(orgCode: string): string {
  return `${CART_PREFIX}${orgCode}`;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Read a stored cart for a given organizer. Returns null if none/expired. */
export function loadCart(orgCode: string): ShopCart | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(orgCode));
    if (!raw) return null;
    const cart: ShopCart = JSON.parse(raw);
    if (Date.now() - cart.updatedAt > EXPIRY_MS) {
      localStorage.removeItem(storageKey(orgCode));
      return null;
    }
    return cart;
  } catch {
    return null;
  }
}

/** Persist a cart for a given organizer. */
export function saveCart(orgCode: string, items: ShopCartItem[]): void {
  if (typeof window === "undefined") return;
  const cart: ShopCart = {
    organizerCode: orgCode,
    items,
    updatedAt: Date.now(),
  };
  try {
    localStorage.setItem(storageKey(orgCode), JSON.stringify(cart));
  } catch {
    // storage full — silently ignore
  }
}

/** Clear a specific organizer cart. */
export function clearCart(orgCode: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey(orgCode));
}

/** List all organizer codes that have a stored cart. */
export function listStoredCarts(): string[] {
  if (typeof window === "undefined") return [];
  const codes: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CART_PREFIX)) {
      codes.push(key.replace(CART_PREFIX, ""));
    }
  }
  return codes;
}

/** Cleanup all expired carts. Call on app mount. */
export function pruneExpiredCarts(): void {
  if (typeof window === "undefined") return;
  const codes = listStoredCarts();
  for (const code of codes) {
    loadCart(code); // loadCart auto-removes expired entries
  }
}

/* ------------------------------------------------------------------ */
/*  Cart line ID generator                                             */
/* ------------------------------------------------------------------ */

export function generateLineId(
  organizerCode: string,
  productId: number,
  variantId: number,
  modifiers: CheckoutModifierPayload[],
  variantOptions: { name?: string; value?: string }[] = []
): string {
  const sig = JSON.stringify(
    modifiers.map((m) => ({
      i: m.id,
      o: m.options.map((x) => x.optionId).sort(),
    }))
  );
  const optSig = JSON.stringify(variantOptions.map(o => `${o.name}:${o.value}`).sort());
  return `shop-${organizerCode}-${productId}-${variantId}-${sig}-${optSig}`;
}

/* ------------------------------------------------------------------ */
/*  Cart item helpers                                                  */
/* ------------------------------------------------------------------ */

export function addItemToCart(
  orgCode: string,
  item: ShopCartItem,
  qty: number = 1
): ShopCartItem[] {
  const cart = loadCart(orgCode);
  const items = cart?.items ?? [];
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
  } else {
    items.push({ ...item, quantity: qty });
  }
  saveCart(orgCode, items);
  return items;
}

export function updateItemQuantity(
  orgCode: string,
  lineId: string,
  quantity: number
): ShopCartItem[] {
  const cart = loadCart(orgCode);
  let items = cart?.items ?? [];
  if (quantity <= 0) {
    items = items.filter((i) => i.id !== lineId);
  } else {
    const idx = items.findIndex((i) => i.id === lineId);
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity };
    }
  }
  saveCart(orgCode, items);
  return items;
}

export function removeItemFromCart(
  orgCode: string,
  lineId: string
): ShopCartItem[] {
  const cart = loadCart(orgCode);
  const items = (cart?.items ?? []).filter((i) => i.id !== lineId);
  saveCart(orgCode, items);
  return items;
}

export function getCartTotal(items: ShopCartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getCartItemCount(items: ShopCartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function getMostRecentCartCode(): string | null {
  if (typeof window === "undefined") return null;
  let mostRecentCode: string | null = null;
  let maxTime = 0;
  const codes = listStoredCarts();
  for (const code of codes) {
    const cart = loadCart(code);
    if (cart && cart.updatedAt > maxTime && cart.items.length > 0) {
      maxTime = cart.updatedAt;
      mostRecentCode = code;
    }
  }
  return mostRecentCode;
}
