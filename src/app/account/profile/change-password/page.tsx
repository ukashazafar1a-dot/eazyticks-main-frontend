import React from "react";
import UpdatePasswordForm from "../_components/UpdatePasswordForm";
import AccountPage from "../AccountPage";

export const metadata = {
  title: `Profile - Eazyticks`,
  description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  alternates: {
    canonical: "/account/user-profile/change-password",
  },
  openGraph: {
    title: `Profile - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
    url: "/account/user-profile/change-password",
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
      <UpdatePasswordForm />
    </AccountPage>
  );
}

export default page;
