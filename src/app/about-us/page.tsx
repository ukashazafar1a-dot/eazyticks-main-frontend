import React from "react";
import Banner from "./_components/Banner";
import GetToKnowUs from "./_components/GetToKnowUs";
import InAction from "./_components/InAction";
import OurPartners from "./_components/OurPartners";
import StatsSection from "../pricing/_components/StatsSection";

const title = "About Us - Get to Know Us";
const description = `Get to know us about us.`;
const url = "/about-us";
export const metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
  },
  twitter: {
    title,
    description,
  },
};

const page = () => {
  return (
    <div className="about-us-template">
      <Banner />
      <GetToKnowUs />
      <StatsSection />
      <InAction />
      <OurPartners />
    </div>
  );
};

export default page;
