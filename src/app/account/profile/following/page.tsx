import React from "react";
import AccountPage from "../AccountPage";
import Following from "../_components/Following";

export const metadata = {
  title: `Profile - Eazyticks`,
  description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  alternates: {
    canonical: "/account/user-profile/following",
  },
  openGraph: {
    title: `Profile - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
    url: "/account/user-profile/following",
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

const page = () => {
  return (
    <AccountPage>
      <Following />
    </AccountPage>
  );
};

export default page;
