
import React, { Suspense } from "react";
import { HeroSection } from "./HeroSection";
import { FeatureGrid } from "./FeatureGrid";
import { StepsSection } from "./StepsSection";
import { FAQSection } from "./FaqSection";
import { FinalCTA } from "./FinalCTA";
import SectionLoader from "@/components/SectionLoader";
import CustomerReviews from "@/components/CustomerReviews";

const SellTicketsOnline = () => {
  return (
    <div>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeatureGrid />
        <Suspense fallback={<SectionLoader />}>
          <StepsSection />
        </Suspense>
        <FAQSection />
        <CustomerReviews />
        <FinalCTA />
      </main>
    </div>
  );
};

export default SellTicketsOnline;
