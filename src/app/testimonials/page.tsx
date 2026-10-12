import React from "react";
import ClientStories from "./_components/ClientStories";

export const runtime = "edge";

async function getData() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/testimonials");
    if (!res.ok) {
      // console.log("Failed to fetch data", res);
      return null;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return null;
  }
}
export const metadata = {
  title: `Testimonials - Client Success Stories`,
  description: `EazyTicks client stories are more than just words; they're real-life experiences. Discover how event organizers achieved remarkable results and explore the journey they've taken to create unforgettable events.`,
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: `Testimonials - Client Success Stories`,
    description: `EazyTicks client stories are more than just words; they're real-life experiences. Discover how event organizers achieved remarkable results and explore the journey they've taken to create unforgettable events.`,
    url: "/testimonials",
  },
  twitter: {
    card: "summary_large_image",
    title: `Testimonials - Client Success Stories`,
    description: `EazyTicks client stories are more than just words; they're real-life experiences. Discover how event organizers achieved remarkable results and explore the journey they've taken to create unforgettable events.`,
  },
};

const page = async () => {
  const response = await getData();
  return <ClientStories data={response?.data} />;
};

export default page;
