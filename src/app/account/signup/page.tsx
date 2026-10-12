import React from "react";
import SignupPage from "./_components/SignupPage";

export const metadata = {
  title: `Sign Up | Access Your Account - Eazyticks`,
  description: `Sign Up of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign Up now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
  alternates: {
    canonical: "/account/signup",
  },
  openGraph: {
    title: `Sign Up | Access Your Account - Eazyticks`,
    description: `Sign Up  of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign Up now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
    url: "/account/signup",
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
    title: `Sign Up  | Access Your Account - Eazyticks`,
    description: `Sign Up  of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign Up now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
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

const page = () => {
  return (
    <div className="flex items-center justify-center flex-col-reverse md:flex-row">
      <div className="form--banner md:basis-1/2 basis-full">
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1682586337/ezt-frontend-client-assets/main-img_zw8rn3.png"
          alt="Sign Up Banner - Eazyticks"
          className="wrapper-img mx-auto"
          loading="lazy"
        />
      </div>
      <div className="form--content md:basis-1/2 basis-full">
        <SignupPage />
      </div>
    </div>
  );
};

export default page;
