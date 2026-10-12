import React from "react";
import ResetPasswordForm from "../_components/ResetPasswordForm";


export const metadata = {
  title: `Reset Password | Access Your Account - Eazyticks`,
  description: `Reset Password of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
  alternates: {
    canonical: "/account/reset-password",
  },
  openGraph: {
    title: `Reset Password | Access Your Account - Eazyticks`,
    description: `Reset Password of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
    url: "/account/reset-password",
    siteName: "Eazyticks",
    images: [
      {
        url: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png`,
        width: 600,
        height: 300,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Reset Password | Access Your Account - Eazyticks`,
    description: `Reset Password of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
    creator: "@Eazyticks",
    images: [
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png",
    ],
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center flex-col-reverse md:flex-row">
      <div className="form--banner md:basis-1/2 basis-full">
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1682586566/ezt-frontend-client-assets/main-img_f77pql.png"
          alt="Log In Banner - Eazyticks"
          className="wrapper-img"
          loading="lazy"
        />
      </div>
      <div className="form--content md:basis-1/2 basis-full">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
