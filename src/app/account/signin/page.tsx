import React from "react";
import LoginForm from "../_components/LoginForm";

export const metadata = {
  title: `Sign In | Access Your Account - Eazyticks`,
  description: `Sign In of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
  alternates: {
    canonical: "/account/signin",
  },
  openGraph: {
    title: `Sign In | Access Your Account - Eazyticks`,
    description: `Sign In  of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
    url: "/account/signin",
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
    title: `Sign In  | Access Your Account - Eazyticks`,
    description: `Sign In  of your Eazyticks account. Enjoy convenient access to your ticketing dashboard, event management tools, and personalized settings. Sign in now and stay in control of your ticket sales, event promotions, and attendee interactions with Eazyticks.`,
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
    <div className="flex items-center justify-center flex-col-reverse lg:flex-row">
      <div className="form--banner lg:basis-1/2 basis-full w-full">
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1682586566/ezt-frontend-client-assets/main-img_f77pql.png"
          alt="Log In Banner - Eazyticks"
          className="mx-auto"
          loading="lazy"
        />
      </div>
      <div className="form--content lg:basis-1/2 basis-full w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
