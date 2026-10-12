import React from "react";
import UpperSection from "./_components/UpperSection";
import MiddleSection from "./_components/MiddleSection";
import Questions from "./_components/Questions";

const title = `Faq's - Eazyticks`;
const description = `Get answers to the mostly asked questions by the eazyticks community.`;
const url = "/faqs";

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

function FaqIndex() {
  return (
    <div>
      <UpperSection />
      <div className="pb-5 bg-[#f5f5f5]">
        <MiddleSection />
        <Questions />
      </div>
    </div>
  );
}

export default FaqIndex;
