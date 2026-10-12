
import React from "react";
import AccountPage from "./AccountPage";
import UpdateName from "./_components/UpdateName";

export const metadata = {
  title: `Profile - Eazyticks`,
  description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  alternates: {
    canonical: "/account/user-profile",
  },
  openGraph: {
    title: `Reset Password | Access Your Account - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
    url: "/account/user-profile",
  },
  twitter: {
    title: `Reset Password | Access Your Account - Eazyticks`,
    description: `Explore the profile and get insights into their details, tickets, and followed organizers. Connect with Eazyticks to stay updated on their activities and events.`,
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

function ProfilePage() {
  return (
    <AccountPage>
      <UpdateName />
    </AccountPage>
  );
}

export default ProfilePage;
