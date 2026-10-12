import Providers from "./Index";
import App from "./app";
import { Site } from "@/helpers/Site";
import "./globals.css";
import "@/assets/client-custom.css";
import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    template: `%s | ${Site?.name}`,
    default: Site?.SEO_title, // a default is required when creating a template
  },
  metadataBase: new URL(`${Site?.url}`),
  description: Site?.SEO_description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: Site?.SEO_title,
    description: Site?.SEO_description,
    url: "/",
    siteName: Site?.name,
    images: [
      {
        url: Site?.logo,
        width: 600,
        height: 300,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: Site?.SEO_title,
    description: Site?.SEO_description,
    creator: `@${Site?.name}`,
    images: [Site?.logo],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="referrer" content="origin" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content={Site?.themeColor} />
        <meta name="google-site-verification" content={Site?.code?.gsv} />
        <link rel="icon" type="image/png" href="/logo-ezt.png" />
        <link rel="apple-touch-icon" href="/logo-ezt.png" />
        <link rel="alternate" hrefLang="en-US" href="https://eazyticks.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1681391176/ezt-frontend-client-assets/banner_vunxxf.png"
        />
        <Analytics />
        <style>
          {`
          .hero-heading{
            max-width: 1024px;
            margin-bottom: 1rem;
            margin-left: auto;
            margin-right: auto;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          .tbsub-heading {
            font-size: 1.25rem;
            font-weight: 500;
          }
          .cookie-text{
            font-size:1rem;
          }
          @media (max-width: 640px) {
            .hero-heading{
              font-size: 1.875rem;
              font-weight: 700;
              line-height: 1.25;
              letter-spacing: 0.1em;
            }
            .tbsub-heading {
              font-size: 1.125rem;
              font-weight: 500;
            }
          }
       `}
        </style>
      </head>
      <body className={` ${poppins?.className}`}>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
