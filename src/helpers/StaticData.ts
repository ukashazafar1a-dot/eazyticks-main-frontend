import { Event, listings, PurchaseResponse, SuListings } from "@/lib/types";

export const StaticEvent: Event = {
  slug: "no-event",
  name: "No Event",
  category: "Baseball",
  timeZone: "America/North_Dakota/Center",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  descriptions:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  address: "PO Box 45832",
  city: "LA 70895",
  state: "Baton Rouge",
  country: "USA",
  image: "",
  buyerPolicy:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  status: false,
  ticketStartingPrice: 0.0,
  parkingStartingPrice: 0.0,
  foodAndDrinksStartingPrice: 0.0,
  calendar: null,
  images: [],
  type: "",
  organizerId: 0,
  startPrice: "10",
  wishlistStatus: false,
  followers: 0,
  organizer: {
    id: 2,
    name: "EazyTicks",
    icon: "",
    organizerCode: "6efad9eb-8b27-48c2-ae67-c259edc31558",
    email: "info@eazyticks.com",
    followers: 1,
    orgFollowingStatus: false,
    twitter: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    linkedIn: "",
    noticeStatus: false,
    notice: null,
  },
  events: [],
  customSettings: null,
};

export const StaticEventTickets = {
  id: 1,
  name: "No Event",
  startDate: new Date(),
  endDate: new Date(),
  category: "Party",
  fee: 0.0,
  tickets: [],
  parkings: [],
  eventShopItems: [],
};

// Southern University Layout Data

export const SuSeats: SuListings = [
  {
    name: "Section 1",
    seats: [
      {
        row: 1,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 2,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        row: 3,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        row: 4,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 5,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        row: 6,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    ],
  },
  {
    name: "Section 2",
    seats: [
      {
        row: 1,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 2,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 3,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 4,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 5,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 6,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    ],
  },
  {
    name: "Section 3",
    seats: [
      {
        row: 1,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 2,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 3,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 4,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 5,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 6,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    ],
  },
  {
    name: "Section 4",
    seats: [
      {
        row: 1,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 2,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 3,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 4,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 5,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 6,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    ],
  },
  {
    name: "Section 5",
    seats: [
      {
        row: 1,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 2,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 3,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 4,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 5,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        row: 6,
        tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    ],
  },
];

// Filters Tags
export const FilterTags = [
  {
    title: "For you",
    value: "for-you",
    type: "live",
    new: true,
  },
  {
    title: "Today",
    value: "today",
    type: "today",
  },
  {
    title: "This Weekend",
    value: "this-weekend",
    type: "weekend",
  },
  {
    title: "Football",
    value: "football",
    type: "category",
  },
  {
    title: "Basketball",
    value: "basketball",
    type: "category",
  },
  {
    title: "Parent Student Center",
    value: "student-parent",
    type: "category",
  },
  {
    title: "Party",
    value: "party",
    type: "category",
  },
];

export const ExampleOrderTicket: PurchaseResponse = {
  id: 99047,
  firstName: "Simple Event",
  lastName: "Ahmad",
  email: "eazyticks1@gmail.com",
  phoneNumber: "3026528347",
  totalBill: 23.0,
  purchasedOn: "2025-10-20T08:40:23.9326237",
  descritpion: "",
  extended: {
    showSoldOut: false,
    onlineEvent: {
      topic: null,
      meetingId: null,
      password: null,
      link: null,
      description: null,
    },
    layoutEvent: {
      templateId: "default",
    },
    customizer: {
      eventDetail: {
        backgroundColor: null,
        textColor: null,
        showCategory: true,
        showStartEndDate: true,
        showCountDown: true,
        eventStartText: null,
        eventEndText: null,
        showTicketsPrice: true,
        ticketPriceText: null,
        parkingPriceText: null,
        shopPriceText: null,
        buttonText: null,
        showWishlist: true,
        showLocation: true,
        showPolicy: true,
      },
      checkout: {
        distBgClr: null,
        distListingType: null,
        distListNumbers: null,
        distributions: {
          ticketsHeading: null,
          parkingHeading: null,
          shopHeading: null,
          layoutHeading: null,
        },
        cart: {
          heading: null,
          subheading: null,
          buttonText: null,
        },
      },
    },
  },
  event: {
    name: "Simple Event one",
    category: null as any,
    status: false,
    image: null as any,
    slug: "simple-event-one-1",
    startDate: "2024-07-12T06:35:00",
    endDate: "2024-08-24T22:59:00",
    address: "Louisiana Leadership Institute 5763 Hooper Rd",
    city: "Baton Rouge",
    state: "LA 70811",
    country: "United States",
    startPrice: 0 as any,
    wishlistStatus: false,
    organizerId: 1199,
    organizer: "EazyTicks Account 1" as any,
    followers: 0,
    type: "Venue",
  } as any,
  // eventTickets: [
  //   {
  //     id: 1184412,
  //     seatNo: 13,
  //     rowNo: 1,
  //     section: "A01",
  //     gateNo: 1,
  //     qrCode: "tk-4879432fed3649a6ae433a3a9ba3e93f",
  //     type: "General Admisosni",
  //     validity: 1,
  //   },
  //   {
  //     id: 1184413,
  //     seatNo: 4,
  //     rowNo: 1,
  //     section: "A01",
  //     gateNo: 1,
  //     qrCode: "tk-0a232130da354a4a83910b8bef99fbf9",
  //     type: "Vip",
  //     validity: 1,
  //   },
  // ],
  eventTickets: [],
  parkingTickets: [],
  shopItemTickets: [],
};
