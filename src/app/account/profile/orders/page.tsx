import React from "react";
import Tickets from "../_components/Tickets";
import AccountPage from "../AccountPage";

export const metadata = {
  title: `Profile - Eazyticks`,
  description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  alternates: {
    canonical: "/account/user-profile/tickets",
  },
  openGraph: {
    title: `Profile - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
    url: "/account/user-profile/tickets",
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

function page() {
  return (
    <AccountPage>
      <Tickets />
    </AccountPage>
  );
}

export default page;
