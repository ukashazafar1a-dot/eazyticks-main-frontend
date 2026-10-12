import { Site } from "@/helpers/Site";
import { Event } from "@/lib/types";
import React from "react";

type props = {
  event: Event;
};

const EventSchema = ({ event }: props) => {
  const { name, address, city, state, country, slug } = event;
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Event",
    name,
    url: `${Site?.url}/events/${slug}`,
    image: `${
      event?.images && event?.images.length > 0 ? event?.images[0] : Site?.logo
    }`,
    startDate: event?.startDate,
    endDate: event?.endDate,
    description: event?.descriptions,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: Site?.name,
      description: Site?.SEO_description,
      url: Site?.url,
    },
    offers: [
      {
        "@type": "AggregateOffer",
        availabilityEnds: event?.endDate,
        priceCurrency: "USD",
        url: `${Site?.url}/events/${event?.slug}`,
        lowPrice: `${event?.ticketStartingPrice}`,
        highPrice: `${event?.ticketStartingPrice}`,
        availabilityStarts: event?.startDate,
        validFrom: event?.startDate,
        availability: event?.status,
      },
    ],
    location: {
      "@type": "Place",
      name: `${address ? address : "" + city + state + country}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: country,
        addressLocality: state,
        addressRegion: country,
        streetAddress: address,
        postalCode: city,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default EventSchema;
