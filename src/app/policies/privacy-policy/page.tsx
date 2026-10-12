import React from "react";
import Banner from "../_components/Banner";
import Privacy from "../_components/Privacy";

export const metadata = {
  title: `Privacy Policy - Policies - Eazyticks`,
  description: `This Privacy Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
  alternates: {
    canonical: "/policies/privacy-policy",
  },
  openGraph: {
    title: `Privacy Policy - Policies - Eazyticks`,
    description: `This Privacy Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
    url: "/policies/privacy-policy",
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
    title: `Privacy Policy - Policies - Eazyticks`,
    description: `This Privacy Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
    creator: "@Eazyticks",
    images: [
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png",
    ],
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

function PrivacyPolicy() {
  return (
    <div className="">
      <Banner title={"Privacy Policy"} handle={"privacy-policy"} />
      <div className="prose mx-auto max-w-[1200px] pt-10 pb-16 px-3">
        <Privacy />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
