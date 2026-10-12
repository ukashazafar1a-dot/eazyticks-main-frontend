import React from "react";
import PricingBanner from "./_components/PricingBanner";
import PricingCalculator from "./_components/PricingCalculator";
import PricingPage from "./_components/PricingPage";

export const metadata = {
  title: `Pricing for Organizers - Pay only Commision - Eazyticks`,
  description: `Pay only a commission on each ticket sold and keep the rest of your earnings. Reach a wide audience, manage your ticket sales effortlessly, and maximize your event's success. Start selling tickets today with Eazyticks.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Pricing for Organizers - Pay only Commision - Eazyticks`,
    description: `Pay only a commission on each ticket sold and keep the rest of your earnings. Reach a wide audience, manage your ticket sales effortlessly, and maximize your event's success. Start selling tickets today with Eazyticks.`,
    url: "/pricing",
    siteName: "Eazyticks",
    images: [
      {
        url: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png`,
        width: 600,
        height: 300,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing for Organizers - Pay only Commision - Eazyticks`,
    description: `Pay only a commission on each ticket sold and keep the rest of your earnings. Reach a wide audience, manage your ticket sales effortlessly, and maximize your event's success. Start selling tickets today with Eazyticks.`,
    creator: "@Eazyticks",
    images: [
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

const page = () => {
  return <PricingPage />;
}

export default page;
