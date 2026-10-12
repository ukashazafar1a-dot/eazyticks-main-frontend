import React from "react";
import TicketFinder from "./_components/Index";
import Banner from "./_components/Banner";

export const metadata = {
  title: `Find Your Tickets by Email - Eazyticks`,
  description: `Discover an effortless way to find your tickets. Simply enter your email address and select the specific event to retrieve your purchased tickets. Our ticket finder tool ensures a seamless process, helping you quickly locate your tickets and prepare for an amazing event experience. Don't wait - find your tickets now and get ready to have a memorable time.`,
  alternates: {
    canonical: "/ticket-finder",
  },
  openGraph: {
    title: `Find Your Tickets by Email - Eazyticks`,
    description: `Discover an effortless way to find your tickets. Simply enter your email address and select the specific event to retrieve your purchased tickets. Our ticket finder tool ensures a seamless process, helping you quickly locate your tickets and prepare for an amazing event experience. Don't wait - find your tickets now and get ready to have a memorable time.`,
    url: "/ticket-finder",
  },
  twitter: {
    title: `Find Your Tickets by Email - Eazyticks`,
    description: `Discover an effortless way to find your tickets. Simply enter your email address and select the specific event to retrieve your purchased tickets. Our ticket finder tool ensures a seamless process, helping you quickly locate your tickets and prepare for an amazing event experience. Don't wait - find your tickets now and get ready to have a memorable time.`,
  },
};

function TicktFinderPage() {
  return (
    <>
      <Banner />
      <TicketFinder />
    </>
  ); 
}

export default TicktFinderPage;
