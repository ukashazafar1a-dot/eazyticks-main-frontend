// app/shop/page.tsx

import React from "react";
import ShopPage from "../_components/ShopPage";

async function getOrganizers() {
  try {
    // Removed Next.js `next.revalidate` option to avoid passing custom RequestInit fields
    // to Cloudflare's fetch implementation.
    const response = await fetch(
      "https://shop-api.eazyticks.com/api/shop/Organizers"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch organizers");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { data: { items: [], total: 0 }, succeeded: false };
  }
}
const Page = async () => {
  const organizers = await getOrganizers();
  return <ShopPage organizers={organizers} />;
};

export default Page;