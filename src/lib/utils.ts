import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CalenderEvent,
  EventCalendar,
  HybridEvent,
  Seat,
  Ticket,
  User,
  SeatItem,
  EventCustomization,
  PurchaseResponse,
} from "./types";
import { hybridSteps } from "@/hooks/useHybridEvent";

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const organizerAPIUrl = `${process.env.NEXT_PUBLIC_ORGANIZER_API_URL}/api`;
export const cookieName = "eztUser";
export const COOKIE_DOMAIN =
  process.env.NODE_ENV === "production" ? "domain=eazyticks.com;" : "";
export const CaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY as string;
type Os =
  | "iOS"
  | "iPadOS"
  | "macOS"
  | "tvOS"
  | "watchOS"
  | "Mac OS"
  | "Mac OS X";
export const appleOSNames: Os[] = [
  "iOS",
  "iPadOS",
  "macOS",
  "tvOS",
  "watchOS",
  "Mac OS",
  "Mac OS X",
];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const returnSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\u0100-\uFFFF\w\-]/g, "-") // Remove all non-word chars ( fix for UTF-8 chars )
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const currencyFormatter = (currency: number) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const fetchCookie = () => {
  if (typeof document === "undefined") return null;
  const nameLenPlus = cookieName.length + 1;
  return (
    document?.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${cookieName}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
};

export const deleteCookie = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; ${COOKIE_DOMAIN}`;
}

export const returnSteps = (event: HybridEvent) => {
  let steps: hybridSteps[] = [];
  const { layoutTickets, normalTickets } = event;
  if (layoutTickets && layoutTickets?.length > 0) steps.push("layout");
  const { tickets, parkings, eventShopItems, deals } = normalTickets;
  if (tickets && tickets?.length > 0) steps.push("tickets");
  if (parkings && parkings?.length > 0) steps.push("parking");
  if (eventShopItems && eventShopItems?.length > 0) steps.push("shop");
  if (deals && deals?.length > 0) steps.push("deals");
  return steps;
};

export const isTokenExpired = (userToken: User): boolean => {
  const currentTime = new Date();
  const tokenExpiryTime = new Date(userToken?.tokenExpiryTime);
  // Compare the current time with the token expiry time
  return currentTime > tokenExpiryTime;
};

export const extractSeatNos = (items: Seat[]) => {
  return items
    ?.filter((item) => item?.status === "Booked")
    .map((item) => item?.seatNo);
};
export const extractConfirmed = (items: Seat[]) => {
  return items
    ?.filter((item) => item?.status === "Confirmed")
    .map((item) => item?.seatNo);
};

export const returnSeatArray = (
  original: Ticket,
  totalSeatsRequired: number,
  seatNo: number,
  row: number = 1
) => {
  const totalSeats = original.total || 0;
  const providedSeats = original.seats;

  // Generate an array of all seats with "Available" status
  const allSeats: Seat[] = Array.from(
    { length: totalSeatsRequired },
    (_, index) => ({
      rowNo: row,
      seatNo: index + 1 + seatNo,
      status: "Booked",
    })
  );

  // Update the generated seats with provided seat statuses
  providedSeats.forEach((seat) => {
    const index = allSeats.findIndex((s) => s.seatNo === seat.seatNo);
    if (index !== -1) {
      allSeats[index] = seat;
    }
  });

  // Mark the first `total` seats as "Available" if they are not already provided
  for (let i = 0; i < totalSeats; i++) {
    if (i < allSeats.length) {
      if (!providedSeats.some((s) => s.seatNo === allSeats[i].seatNo)) {
        allSeats[i].status = "Available";
      }
    }
  }

  return allSeats;
};
export const truncateTitle = (
  title: string,
  maxLength: number = 50
): string => {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength - 3) + "...";
};

export const normalizeKeys = (obj: any) => {
  if (!obj || typeof obj !== "object") return obj;

  return Object.keys(obj).reduce((acc: any, key: any) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
};

export const dummyTicket: Ticket = {
  id: 3443,
  name: "Black Premium Section",
  price: 450,
  seats: [
    {
      rowNo: 1,
      seatNo: 13,
      status: "Confirmed",
    },
    {
      rowNo: 1,
      seatNo: 14,
      status: "Confirmed",
    },
    {
      rowNo: 1,
      seatNo: 15,
      status: "Confirmed",
    },
    {
      rowNo: 1,
      seatNo: 16,
      status: "Confirmed",
    },
    {
      rowNo: 1,
      seatNo: 17,
      status: "Confirmed",
    },
    {
      rowNo: 1,
      seatNo: 18,
      status: "Confirmed",
    },
  ],
  extrafields: [],
};

export const dummyCalenderEvents: CalenderEvent[] = [
  {
    id: 3658,
    name: "Roar And Flutter Tuesday Tour 10am",
    startDate: "2024-09-10T15:00:00Z",
    endDate: "2024-09-10T16:00:00Z",
    slug: "roar-and-flutter-tuesday-tour-10am",
    status: "Published",
  },
  {
    id: 3663,
    name: "Roar And Flutter Tuesday Tour - 1pm",
    startDate: "2024-09-10T18:00:00Z",
    endDate: "2024-09-10T19:00:00Z",
    slug: "roar-and-flutter-tuesday-tour-1pm",
    status: "Published",
  },
  {
    id: 3664,
    name: "Roar And Flutter Tuesday Tour 2:30pm",
    startDate: "2024-09-10T19:30:00Z",
    endDate: "2024-09-10T20:30:00Z",
    slug: "roar-and-flutter-tuesday-tour-230pm",
    status: "Published",
  },
  {
    id: 3665,
    name: "Roar And Flutter Tuesday Tour 4pm",
    startDate: "2024-09-10T21:00:00Z",
    endDate: "2024-09-10T22:00:00Z",
    slug: "roar-and-flutter-tuesday-tour-4pm",
    status: "Published",
  },
  {
    id: 3662,
    name: "Roar And Flutter Tuesday Tour 11:30am",
    startDate: "2024-09-10T16:30:00Z",
    endDate: "2024-09-10T17:30:00Z",
    slug: "roar-and-flutter-tuesday-tour-1130am",
    status: "Published",
  },
  {
    id: 3666,
    name: "Roar And Flutter Wednesday Tour 10am",
    startDate: "2024-09-11T15:00:00Z",
    endDate: "2024-09-11T16:00:00Z",
    slug: "roar-and-flutter-wednesday-tour-10am",
    status: "Published",
  },
  {
    id: 3667,
    name: "Roar And Flutter Wednesday Tour 11:30am",
    startDate: "2024-09-11T16:30:00Z",
    endDate: "2024-09-11T17:30:00Z",
    slug: "roar-and-flutter-wednesday-tour-1130am",
    status: "Published",
  },
  {
    id: 3668,
    name: "Roar And Flutter Wednesday Tour 1pm",
    startDate: "2024-09-11T18:00:00Z",
    endDate: "2024-09-11T19:00:00Z",
    slug: "roar-and-flutter-wednesday-tour-1pm",
    status: "Published",
  },
  {
    id: 3669,
    name: "Roar And Flutter Wednesday Tour 2:30pm",
    startDate: "2024-09-11T19:30:00Z",
    endDate: "2024-09-11T20:30:00Z",
    slug: "roar-and-flutter-wednesday-tour-230pm",
    status: "Published",
  },
  {
    id: 3670,
    name: "Roar And Flutter Wednesday Tour 4pm",
    startDate: "2024-09-11T21:00:00Z",
    endDate: "2024-09-11T22:00:00Z",
    slug: "roar-and-flutter-wednesday-tour-4pm",
    status: "Published",
  },
  {
    id: 3671,
    name: "Roar And Flutter Thursday Tour 10am",
    startDate: "2024-09-12T15:00:00Z",
    endDate: "2024-09-12T16:00:00Z",
    slug: "roar-and-flutter-thursday-tour-10am",
    status: "Published",
  },
  {
    id: 3672,
    name: "Roar And Flutter Thursday Tour 11:30am",
    startDate: "2024-09-12T16:30:00Z",
    endDate: "2024-09-12T17:30:00Z",
    slug: "roar-and-flutter-thursday-tour-1130am",
    status: "Published",
  },
  {
    id: 3673,
    name: "Roar And Flutter Thursday Tour 1:30pm",
    startDate: "2024-09-12T18:30:00Z",
    endDate: "2024-09-12T19:30:00Z",
    slug: "roar-and-flutter-thursday-tour-130pm",
    status: "Published",
  },
  {
    id: 3674,
    name: "Roar And Flutter Thursday Tour 3pm",
    startDate: "2024-09-12T20:00:00Z",
    endDate: "2024-09-12T21:00:00Z",
    slug: "roar-and-flutter-thursday-tour-3pm",
    status: "Published",
  },
  {
    id: 3675,
    name: "Roar And Flutter Thursday Tour 4:30pm",
    startDate: "2024-09-12T21:30:00Z",
    endDate: "2024-09-12T22:30:00Z",
    slug: "roar-and-flutter-thursday-tour-430pm",
    status: "Published",
  },
  {
    id: 3676,
    name: "Roar And Flutter Friday Tour 10am",
    startDate: "2024-09-13T15:00:00Z",
    endDate: "2024-09-13T16:00:00Z",
    slug: "roar-and-flutter-friday-tour-10am",
    status: "Published",
  },
  {
    id: 3677,
    name: "Roar And Flutter Friday Tour 11:30am",
    startDate: "2024-09-13T16:30:00Z",
    endDate: "2024-09-13T17:30:00Z",
    slug: "roar-and-flutter-friday-tour-1130am",
    status: "Published",
  },
  {
    id: 3678,
    name: "Roar And Flutter Friday Tour 1:30pm",
    startDate: "2024-09-13T18:30:00Z",
    endDate: "2024-09-13T19:30:00Z",
    slug: "roar-and-flutter-friday-tour-130pm",
    status: "Published",
  },
  {
    id: 3679,
    name: "Roar And Flutter Friday Tour 3pm",
    startDate: "2024-09-13T20:00:00Z",
    endDate: "2024-09-13T21:00:00Z",
    slug: "roar-and-flutter-friday-tour-3pm",
    status: "Published",
  },
  {
    id: 3680,
    name: "Roar And Flutter Friday Tour 4:30pm",
    startDate: "2024-09-13T21:30:00Z",
    endDate: "2024-09-13T22:30:00Z",
    slug: "roar-and-flutter-friday-tour-430pm",
    status: "Published",
  },
  {
    id: 3681,
    name: "Roar And Flutter Saturday Tour 10am",
    startDate: "2024-09-14T15:00:00Z",
    endDate: "2024-09-14T16:00:00Z",
    slug: "roar-and-flutter-saturday-tour-10am",
    status: "Published",
  },
  {
    id: 3682,
    name: "Roar And Flutter Saturday Tour 12pm",
    startDate: "2024-09-14T17:00:00Z",
    endDate: "2024-09-14T18:00:00Z",
    slug: "roar-and-flutter-saturday-tour-12pm",
    status: "Published",
  },
  {
    id: 3683,
    name: "Roar And Flutter Saturday Tour 1:30pm",
    startDate: "2024-09-14T18:30:00Z",
    endDate: "2024-09-14T19:30:00Z",
    slug: "roar-and-flutter-saturday-tour-130pm",
    status: "Published",
  },
  {
    id: 3684,
    name: "Roar And Flutter Saturday Tour 3pm",
    startDate: "2024-09-14T20:00:00Z",
    endDate: "2024-09-14T21:00:00Z",
    slug: "roar-and-flutter-saturday-tour-3pm",
    status: "Published",
  },
  {
    id: 3685,
    name: "Roar And Flutter Saturday Tour 4:30pm",
    startDate: "2024-09-14T21:30:00Z",
    endDate: "2024-09-14T22:30:00Z",
    slug: "roar-and-flutter-saturday-tour-430pm",
    status: "Published",
  },
  {
    id: 3686,
    name: "Roar And Flutter Sunday Tour 10am",
    startDate: "2024-09-15T15:00:00Z",
    endDate: "2024-09-15T16:00:00Z",
    slug: "roar-and-flutter-sunday-tour-10am",
    status: "Published",
  },
  {
    id: 3687,
    name: "Roar And Flutter Sunday Tour 12pm",
    startDate: "2024-09-15T17:00:00Z",
    endDate: "2024-09-15T18:00:00Z",
    slug: "roar-and-flutter-sunday-tour-12pm",
    status: "Published",
  },
  {
    id: 3688,
    name: "Roar And Flutter Sunday Tour 1:30pm",
    startDate: "2024-09-15T18:30:00Z",
    endDate: "2024-09-15T19:30:00Z",
    slug: "roar-and-flutter-sunday-tour-130pm",
    status: "Published",
  },
  {
    id: 3689,
    name: "Roar And Flutter Sunday Tour 3pm",
    startDate: "2024-09-15T20:00:00Z",
    endDate: "2024-09-15T21:00:00Z",
    slug: "roar-and-flutter-sunday-tour-3pm",
    status: "Published",
  },
  {
    id: 3690,
    name: "Roar And Flutter Sunday Tour 4:30pm",
    startDate: "2024-09-15T21:30:00Z",
    endDate: "2024-09-15T22:30:00Z",
    slug: "roar-and-flutter-sunday-tour-430pm",
    status: "Published",
  },
];

export const downloadFile = async (name: string, file: any) => {
  if (file) {
    let blobUrl = window?.URL?.createObjectURL(file);
    let a = document.createElement("a");
    a.download = `${name}`;
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

/**
 * Normalize API response.
 * @param {Object} response - The API response to normalize.
 * @param {number} status - The status code of the response.
 * @returns {Object} Normalized response.
 */
export const normalizeResponse = (response: any, status: number = 200) => {
  return {
    data: response.data || response.Data || null,
    messages: response.messages || response.Messages || [],
    succeeded: response.succeeded ?? response.Succeeded ?? false,
    status,
  };
};



export const returnSettings = (
  settings: EventCustomization | null,
  param: boolean | null | undefined,
  children: React.ReactNode
) => {
  const showNow = settings ? param : true;
  return showNow ? children : null; // Return `null` instead of an empty string
};

export const getValueOrDefault = (
  value: string | null | undefined,
  defaultValue: string
) => {
  // trim the whitespace
  return value ?? defaultValue;
};

/**
 * Converts a given index to an Excel column name.
 * @param {number} index The index to convert.
 * @returns {string} The Excel column name.
 * @example
 * getExcelColumnName(0)  // returns "A"
 * getExcelColumnName(1)  // returns "B"
 * getExcelColumnName(26) // returns "AA"
 * getExcelColumnName(27) // returns "AB"
 */
export const getExcelColumnName = (index: number): string => {
  // Adjusting index to be 0-based
  let columnName = "";
  index = index + 1; // This adjustment is important!

  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnName = String.fromCharCode(remainder + 65) + columnName;
    index = Math.floor((index - 1) / 26);
  }

  return columnName;
};

/**
 * Sorts an array of items by their type, prioritizing "tickets" over others.
 * @param {Array} data - The array of items to sort.
 * @returns {Array} The sorted array with "tickets" first.
 * @example
 * const sorted = sortByType([{ type: 'seats' }, { type: 'tickets' }]);
 * console.log(sorted); // [{ type: 'tickets' }, { type: 'seats' }]
 */
export const sortByType = (data: any) => {
  if (!Array.isArray(data)) {
    return data; // Return as is if not an array
  }
  const sortedItems = data.sort((a, b) => {
    if (a.type === b.type) return 0;
    return a.type === "tickets" ? -1 : 1;
  });
  return sortedItems;
};


export const hasTicketsInOrder = (content: PurchaseResponse | null): boolean => {
  if (!content) return false;

  const eventTickets = content.eventTickets?.length ?? 0;
  const parkingTickets = content.parkingTickets?.length ?? 0;
  const shopItemTickets = content.shopItemTickets?.length ?? 0;

  return eventTickets > 0 || parkingTickets > 0 || shopItemTickets > 0;
};