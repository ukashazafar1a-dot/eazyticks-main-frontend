import { Site } from "@/helpers/Site";
import React from "react";

const ORG_SCHEMA = JSON.stringify({
  "@context": "http://schema.org",
  "@type": "Organization",
  name: "Eazyticks - Online E-ticketing Booking Platform",
  description:
    "Eazyticks is an Online E-ticketing ticketing platform, easy-to-use and with the lowest ticket booking fees for event creation and selling.",
  url: `${Site?.url}`,
  logo: `${Site?.url}${"/logo-black.png"}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baton Rouge",
    addressLocality: "Lousiana",
    addressRegion: "United States",
    postalCode: "45832",
    Telephone: "+1(202)4365839",
  },
  sameAs: [
    Site?.socialLinks?.facebook,
    Site?.socialLinks?.instagram,
    Site?.socialLinks?.twitter,
    Site?.socialLinks?.youtube,
  ],
});

const Json = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }}
      />
    </>
  );
};

export default Json;
