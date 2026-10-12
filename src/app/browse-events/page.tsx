
import React from "react";
import IndexBrowesEvents from "./_components/Index";

const title = `Browse Events - Discover & Filter Exciting Events`;
const description = `Explore a diverse range of exciting events on Eazyticks. Find concerts, conferences, sports events, and more. Filter events by date, location, category, and more to discover the perfect experiences tailored to your interests. Start exploring and book your tickets today!`;
const url = "/browse-events";

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

function browseEvents() {
  return <IndexBrowesEvents />;
}

export default browseEvents;
