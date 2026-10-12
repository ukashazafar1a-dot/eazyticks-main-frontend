import { Site } from "@/helpers/Site";

const routes = {
  // Root
  root: "/",
  home: "/home",

  // About / misc
  aboutUs: "/about-us",

  // Account related
  account: {
    signin: "/account/signin",
    signup: "/account/signup",
    forgotPassword: "/account/forgotpassword",
    logout: "/account/logout",
    profile: "/account/profile",
    dashboard: "/account/dashboard",
    verifyEmail: "/account/verify",
  },

  // Content sections
  blog: "/blog",
  browseEvents: "/browse-events",
  categories: "/categories",
  checkout: "/checkout",
  contactUs: "/contact-us",
  events: {
    index: "/events",
    // helper to build an event detail route
    details: (slugOrId: string) => `/events/${slugOrId}`,
  },
  faqs: "/faqs",
  features: "/features",
  organizers: "/organizers",
  policies: "/policies",
  pricing: "/pricing",
  sellTicketsOnline: "/sell-tickets-online",
  support: "/support",
  testimonials: "/testimonials",
  ticketFinder: "/ticket-finder",

  // Misc utilities
  tokenExpiry: "/token-expiry",
  search: "/search",
  organizer: Site?.organizer?.url,
} as const;

export type Routes = typeof routes;

type RouteValue = string | { [key: string]: any };

type ExtractRoutes<T> = T extends string
  ? T
  : T extends Record<string, any>
  ? {
      [K in keyof T]: ExtractRoutes<T[K]>;
    }[keyof T]
  : never;
export type AppRoute = ExtractRoutes<Routes>;

type SidebarRoute = {
  name: string;
  href: AppRoute;
};

export const sidebarRoutes: SidebarRoute[] = [
  {
    name: "Home",
    href: routes.home,
  },
  {
    name: "Browse Events",
    href: routes.browseEvents,
  },
  {
    name: "Create Event",
    href: routes.organizer,
  },
  {
    name: "Pricing",
    href: routes.pricing,
  },
  {
    name: "Features",
    href: routes.features,
  },
  {
    name: "testimonials",
    href: routes.testimonials,
  },
  {
    name: "Sell Tickets Online",
    href: routes.sellTicketsOnline,
  },
  {
    name: "Ticket Finder",
    href: routes.ticketFinder,
  },
  {
    name: "About Us",
    href: routes.aboutUs,
  },
  {
    name: "Contact Us",
    href: routes.contactUs,
  },
];

export default routes;
