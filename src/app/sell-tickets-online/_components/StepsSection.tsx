"use client";
import { Site } from "@/helpers/Site";
import routes from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ImageCarousel from "./ImageCarousel";

/**
 * StepCard
 * - Props:
 *   - title: string
 *   - description: short description (string)
 *   - checklist: string[]
 *   - actions: [{ label, href, variant }]
 *   - images: [{ src, alt }]
 *   - reversed: boolean (if true, image on left)
 */
function StepCard({
  step,
  reversed = false,
  stepNumber,
}: {
  step: Step;
  reversed: boolean;
  stepNumber: number;
}) {
  const content = (
    <div className={`space-y-4 `}>
      <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black/70 text-white">
        <span className="text-sm font-medium">Step {stepNumber}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold">{step?.title}</h3>
      <p className="text-sm text-muted-foreground max-w-prose">
        {step?.description}
      </p>

      <ul className="space-y-2 mt-2">
        {step?.checklist.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <IoMdCheckmarkCircleOutline className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 pt-4">
        {step?.actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold ${
              a.variant === "primary"
                ? "bg-primary text-white shadow"
                : "bg-white border text-primary"
            }`}
            target={a?.target || "_self"}
          >
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`py-14 px-4 md:px-8 ${reversed ? "bg-gray-50" : "bg-red-50"}`}
    >
      <div
        className={`flex justify-center flex-col md:flex-row gap-8 items-center max-w-6xl mx-auto ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="basis-full md:basis-1/2 w-full overflow-hidden block">
          <ImageCarousel
            images={step?.images}
            ariaLabel={`${step?.title} screenshots`}
          />
        </div>
        <div className="basis-full md:basis-1/2 shrink-0">{content}</div>
      </div>
    </div>
  );
}

type Step = {
  title: string;
  description: string;
  checklist: string[];
  images: {
    src: string;
    alt: string;
    style?: string;
  }[];
  actions: {
    label: string;
    href: string;
    variant: string;
    target?: string;
  }[];
};

/**
 * Updated steps data
 * - Each step has: title, description, checklist, images, actions
 *
 * Replace placeholder image URLs with your actual screenshot URLs,
 * or use an image generation / screenshot service.
 */
const UPDATED_STEPS: Step[] = [
  {
    title: "Login or Register as an Organizer",
    description:
      "Start by creating an Organizer account or logging in if you already have one. This gives you access to the organizer dashboard where you manage all your events.",
    checklist: [
      `Visit <a href="/account/signup" class="text-primary">/account/signup</a> to create a new organizer account`,
      "Verify your email address to unlock publishing features",
      "Complete basic organizer details (name, bio, address)",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765016707/eazyticks/Sign-Up-Access-Your-Account-Eazyticks-EazyTicks-12-06-2025_03_24_PM_cucl3q.png",
        alt: "Organizer signup form",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765016773/eazyticks/Sign-Up-Access-Your-Account-Eazyticks-EazyTicks-12-06-2025_03_25_PM_chvom9.png",
        alt: "Basic profile information example",
      },
    ],
    actions: [
      {
        label: "Sign up as organizer",
        href: routes?.account?.signup,
        variant: "primary",
      },
      {
        label: "Organizer login",
        href: routes?.account?.signin,
        variant: "secondary",
      },
    ],
  },
  {
    title: "Open Your Dashboard",
    description:
      "Access your Organizer Dashboard to create events, view sales, and manage attendees. If you're not logged in, you'll be redirected to the login page.",
    checklist: [
      `Go to <a href="${Site?.organizer?.url}" target="_blank" class="text-primary">your dashboard</a> (or click 'My Events' from the top nav)`,
      "Familiarize yourself with the dashboard widgets (sales, events, payouts)",
      "Click 'Create Event' to start a new event",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765016975/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_28_PM_wkktv2.png",
        alt: "Organizer dashboard overview",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017300/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_33_PM_uaipsh.png",
        alt: "Create event CTA on dashboard",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017307/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_34_PM_dsoqyw.png",
        alt: "Dashboard events",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017417/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_36_PM_nygp4i.png",
        alt: "Dashboard reports analytics",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017451/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_36_PM_1_pqllre.png",
        alt: "Dashboard payouts section",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017456/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_37_PM_dxv2pf.png",
        alt: "Dashboard orders list",
      },
    ],
    actions: [
      {
        label: "Open Dashboard",
        href: Site?.organizer?.url,
        variant: "primary",
        target: "_blank",
      },
    ],
  },
  {
    title: "Create Your Event",
    description:
      "Begin the event creation flow: provide your event title, type, category, and visibility settings.",
    checklist: [
      "Click 'Create Event' in the dashboard",
      "Add event title, category, and short summary",
      "Choose public or unlisted visibility",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017850/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_42_PM_tho0r2.png",
        alt: "Create event form",
        style: "w-full",
      },
    ],
    actions: [
      {
        label: "Create Event",
        href: `${Site?.organizer?.url}/events/new`,
        variant: "primary",
        target: "_blank",
      },
    ],
  },
  {
    title: "Add Details, Media & Tickets",
    description:
      "Fill in the date/time, location, long description, upload images, and configure ticket types and pricing.",
    checklist: [
      "Set date, time, and venue (use Google Maps integration if available)",
      "Upload a cover image and gallery images (use high-res images)",
      "Create ticket types (Free, General, VIP) and set limits",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765018213/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_49_PM_yeaerx.png",
        alt: "Ticket configuration panel",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765017859/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_44_PM_cplc6p.png",
        alt: "Basic event details form",
      },
    ],
    actions: [
    ],
  },
  {
    title: "Publish & Share",
    description:
      "Review your event preview and publish. After publishing, share via QR code, banners, and social links to drive registrations.",
    checklist: [
      "Preview event page and confirm all details",
      "Publish your event and generate a public link",
      "Access QR code, banner assets, and share tools",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765018563/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_55_PM_1_tjjn7i.png",
        alt: "Event Dashboard analytics",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765018539/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_55_PM_wql4hg.png",
        alt: "Publish event modal",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765018741/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_03_58_PM_wwowui.png",
        alt: "Share / QR code page",
      },
    ],
    actions: [
    ],
  },
  {
    title: "Monitor & Manage",
    description:
      "Track sales, manage attendees, and handle check-in using the mobile scanner. Export reports and manage payouts from your dashboard.",
    checklist: [
      "Monitor live ticket sales and revenue",
      "Export attendee list for communications",
      "Use the EazyTicks mobile scanner for check-in",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765019552/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_04_11_PM_gpgblc.png",
        alt: "Sales analytics dashboard",
      },
      {
        src: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1765019523/eazyticks/EazyTicks-E-Ticketing-Booking-Platform-12-06-2025_04_08_PM_cdv8cu.png",
        alt: "Attendee list",
      },
    ],
    actions: [
      {
        label: "View Reports",
        href: Site?.organizer?.url + "/reports",
        variant: "primary",
        target: "_blank",
      },
    ],
  },
];

/**
 * StepsSection
 * - renders the list of step cards
 * - automatically alternates layout (left/right) for visual rhythm
 */
export function StepsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="block">
        <div className="text-center mb-12 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How to Sell Tickets Online
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow these simple steps to create, publish, and promote your event
            on EazyTicks.
          </p>
        </div>

        <div className="block">
          {UPDATED_STEPS.map((step, i) => (
            <div key={step.title}>
              <StepCard stepNumber={i + 1} step={step} reversed={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
