const SHOP_API_BASE =
  process.env.SHOP_API_BASE || "https://shop-api.eazyticks.com";
  

export const SHOP_ENDPOINTS = {
  organizers: `${SHOP_API_BASE}/api/shop/Organizers`,
  products: (orgCode: string) =>
    `${SHOP_API_BASE}/api/Shop/Products?orgCode=${encodeURIComponent(orgCode)}`,
  productDetails: (id: number | string, orgCode: string) =>
    `${SHOP_API_BASE}/api/Shop/Products/${id}/Details?orgCode=${encodeURIComponent(orgCode)}`,
  checkout: `${SHOP_API_BASE}/api/Shop/Checkout`,
} as const;
