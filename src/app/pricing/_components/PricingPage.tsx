"use client";
import React from "react";
import HeroSection from "./HeroSection";
import CustomerReviews from "@/components/CustomerReviews";
import FaqSection from "./faq-section";
import FeaturesList from "./features-list";
import LargeEventsSection from "./large-events-hosting";
import PricingInfo from "./pricing-info";
import StatsSection from "./StatsSection";

const PricingPage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <PricingInfo />
      <LargeEventsSection />
      <FeaturesList />
      <CustomerReviews />
      <FaqSection />
    </div>
  );
};

export default PricingPage;
