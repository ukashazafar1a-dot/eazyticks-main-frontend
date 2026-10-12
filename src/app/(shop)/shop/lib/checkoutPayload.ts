import type {
  CheckoutCustomerPayload,
  CheckoutLinePayload,
  CheckoutModifierPayload,
  CheckoutRequestBody,
} from "./types";
import type { ShopCartItem } from "./cart-storage";

/** Extra fields we store on react-use-cart lines */
export interface ShopCartLineMeta {
  productId: number;
  variantId: number;
  organizerCode: string;
  modifiers: CheckoutModifierPayload[];
  note?: string;
  image?: string | null;
}

function getBrowserUtcOffset(): number | null {
  if (typeof window === "undefined") return null;

  const offsetMinutes = new Date().getTimezoneOffset();
  return Number((-offsetMinutes / 60).toFixed(1));
}

function getUtcOffsetForCountry(country?: string): number {
  const normalizedCountry = (country ?? "").trim().toUpperCase();

  const countryOffsets: Record<string, number> = {
    US: -5,
    CA: -4,
    GB: 0,
    AU: 10,
    NZ: 12,
    PK: 5,
    IN: 5.5,
    AE: 4,
    SA: 3,
    JP: 9,
    SG: 8,
    HK: 8,
    DE: 1,
    FR: 1,
    IT: 1,
    ES: 1,
    NL: 1,
    BE: 1,
    CH: 1,
    AT: 1,
    PL: 1,
    SE: 1,
    NO: 1,
    DK: 1,
    FI: 1,
    IE: 0,
    ZA: 2,
  };

  return Number((countryOffsets[normalizedCountry] ?? 0).toFixed(1));
}

export function cartItemToCheckoutLine(item: {
  id?: string;
  quantity?: number;
  price?: number;
  productId?: number;
  variantId?: number;
  modifiers?: CheckoutModifierPayload[];
  note?: string;
}): CheckoutLinePayload | null {
  const pid = item.productId;
  const vid = item.variantId;
  const qty = item.quantity ?? 1;
  if (pid == null || vid == null) return null;
  return {
    id: pid,
    variantId: vid,
    quantity: qty,
    modifiers: (item.modifiers ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      options: (m.options ?? []).map((o) => ({
        optionId: o.optionId,
        optionName: o.optionName,
        priceAdjustment: o.priceAdjustment,
      })),
    })),
    note: item.note ?? "",
  };
}

export function buildCheckoutBody(
  lines: ShopCartItem[],
  customerInfo: CheckoutCustomerPayload
): CheckoutRequestBody {
  const items: CheckoutLinePayload[] = [];
  for (const line of lines) {
    const mapped = cartItemToCheckoutLine(
      line as {
        productId?: number;
        variantId?: number;
        quantity?: number;
        modifiers?: CheckoutModifierPayload[];
        note?: string;
      }
    );
    if (mapped) items.push(mapped);
  }

  let billing = { ...customerInfo.billing };
  if (customerInfo.isBillingSameAsShipping) {
    billing = { ...customerInfo.shipping, id: customerInfo.billing.id };
  }

  let pickupIso: string | undefined;
  if (customerInfo.pickupTime && String(customerInfo.pickupTime).trim()) {
    const d = new Date(customerInfo.pickupTime);
    if (!Number.isNaN(d.getTime())) pickupIso = d.toISOString();
  }

  const browserUtcOffset = getBrowserUtcOffset();
  const utcOffset =
    browserUtcOffset ??
    getUtcOffsetForCountry(
      customerInfo.shipping?.country || customerInfo.billing?.country,
    );

  return {
    items,
    customerInfo: {
      ...customerInfo,
      billing,
      pickupTime: pickupIso,
    },
    utcOffset,
  };
}
