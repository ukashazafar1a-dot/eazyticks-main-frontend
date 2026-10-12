import { SHOP_ENDPOINTS } from "./constants";
import type { ShopProductDetails, ShopProductListItem } from "./types";

export async function fetchOrganizersList() {
  // Note: removed Next.js `next: { revalidate }` option because Cloudflare Pages' fetch
  // does not recognize custom RequestInit fields and may throw at runtime.
  const res = await fetch(SHOP_ENDPOINTS.organizers);
  if (!res.ok) throw new Error("Failed to load organizers");
  return res.json();
}

export async function fetchOrganizerProducts(
  code: string,
): Promise<ShopProductListItem[]> {
  // Avoid passing `cache` RequestInit (not implemented in Cloudflare Workers).
  const res = await fetch(SHOP_ENDPOINTS.products(code));
  if (!res.ok) throw new Error("Failed to load products");
  const json = await res.json();
  return json?.data ?? [];
}

export async function fetchOrganizerDetail(code: string) {
  const json = await fetchOrganizersList();
  const items = json?.data?.items ?? [];
  return items.find((o: { code: string }) => o.code === code) ?? null;
}

export async function fetchProductDetails(
  id: string,
  code: string,
): Promise<ShopProductDetails | null> {
  const res = await fetch(SHOP_ENDPOINTS.productDetails(id, code));
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}


