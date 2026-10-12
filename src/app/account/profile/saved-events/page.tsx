import React from "react";
import AccountPage from "../AccountPage";
import Wishlist from "../_components/Wishlist";

export const metadata = {
  title: `Profile - Eazyticks`,
  description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  alternates: {
    canonical: "/account/user-profile/saved-events",
  },
  openGraph: {
    title: `Profile - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
    url: "/account/user-profile/saved-events",
  },
  twitter: {
    title: `Profile - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

function WishlistPage() {
  return (
    <AccountPage>
      <Wishlist />
    </AccountPage>
  );
}

export default WishlistPage;
