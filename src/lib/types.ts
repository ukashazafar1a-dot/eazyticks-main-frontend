export type User = {
  name: string;
  email: string;
  userImageURL: string;
  token: string;
  refreshToken: string;
  tokenExpiryTime: string;
};

export type UserProfile = {
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  bio: string | null;
};

export type CalenderEvent = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  slug: string;
  status: string;
};

export type EventCalendar = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  events: CalenderEvent[] | null;
};

export type Organizer = {
  id: number;
  name: string;
  icon: string;
  organizerCode: string;
  email: string;
  followers: number;
  orgFollowingStatus: boolean;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  linkedIn?: string;
  noticeStatus: boolean;
  notice: null | string;
};

export type Event = {
  slug: string;
  name: string;
  category: string;
  timeZone: string;
  startDate: string;
  endDate: string;
  descriptions: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  buyerPolicy: null | string;
  status: boolean;
  ticketStartingPrice: number;
  parkingStartingPrice: number;
  foodAndDrinksStartingPrice: number;
  type: string;
  organizer: Organizer;
  events: Event[];
  image: string;
  startPrice: string;
  wishlistStatus: boolean;
  organizerId: number;
  followers: number;
  calendar: EventCalendar | null;
  customSettings: EventCustomization | null;
};

export type EventCard = {
  slug: string;
  name: string;
  category: string;
  timeZone: string;
  startDate: string;
  endDate: string;
  descriptions: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  buyerPolicy: null | string;
  status: boolean;
  ticketStartingPrice: number;
  parkingStartingPrice: number;
  foodAndDrinksStartingPrice: number;
  type: string;
  organizer: string;
  events: Event[];
  image: string;
  startPrice: string;
  wishlistStatus: boolean;
  organizerId: number;
  followers: number;
  calendar: EventCalendar | null;
};

export type Category = {
  id: number;
  name: string;
  icon: string;
  headerBg: string | null;
  description?: string;
  eazytickProfit?: number | string | null;
  url?: string;
};

export type Blog = {
  id: number;
  name: string;
  shortDescription: string;
  imageId: null | string; // If imageId can hold other types in different contexts, adjust accordingly.
  imageUrl: null | string; // If imageUrl can hold other types in different contexts, adjust accordingly.
  slug: string;
  status: boolean;
};

export type Profile = {
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  bio: string | null;
};

export type UserToken = {
  name: string;
  email: string;
  userImageURL: string;
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
};

export type SeatStatus =
  | 'Confirmed'
  | 'Booked'
  | 'Sold'
  | 'Not Available'
  | 'Available'
  | 'available';
export type Seat = {
  rowNo: number;
  seatNo: number;
  status: SeatStatus;
};
export type steps =
  | 'tickets'
  | 'checkout'
  | 'Cancel'
  | 'Success'
  | 'extrafields';
export type ExtraField = {
  id: number;
  distributionId: number;
  parkingDistributionId?: number;
  label: string;
  type: 'Text' | 'SelectField';
  placeHolder: null | string;
  isRequired: boolean;
  options: null | string;
  info: null | null;
};
export type Ticket = {
  id: number;
  name: string;
  price: number;
  seats: Seat[]; // Use the Seat interface if you plan to add properties to seats in the future
  extrafields: ExtraField[] | null;
  total?: number;
};

export type EventBooking = {
  id: number;
  name: string;
  startDate: string; // or Date if you convert the string to a Date object
  endDate: string; // or Date
  category: string;
  billType: boolean;
  fee: number;
  tickets: Ticket[];
};

export type SeatItem = {
  rowNo: number;
  seatNo: number;
  status: SeatStatus;
};

export type LayoutTicket = {
  id: number;
  name: string;
  price: number;
  seats: SeatItem[];
  extrafields: ExtraField[];
  total: number;
};

export type NormalTicket = {
  id: number;
  name: string;
  message: string;
  totalTicket: number;
  sold: number;
  unlimited: boolean;
  endDate: string | null;
  soldoutStatus: boolean;
  startDate: string | null;
  saleStatus: boolean;
  price: number;
  extraFields: ExtraField[];
  parkingExtrafields?: ExtraField[];
};

export type TicketsType = 'tickets' | 'parkings' | 'deals' | 'shops' | 'layout';

export type NormalTickets = {
  tickets: NormalTicket[];
  parkings: any[]; // Assuming parkings is an array, but you can replace `any` with a more specific type if available
  eventShopItems: any[]; // Assuming eventShopItems is an array, but you can replace `any` with a more specific type if available
  deals: any[] | null;
};

export type LayoutTemplates =
  | 'default'
  | 'eleven'
  | 'plaquimine'
  | 'southern'
  | 'franklin'
  | 'su'
  | 'suparking'
  | 'ngo'
  | 'ngo-02'
  | 'zulu-layout'
  | 'polaris'
  | 'jearly-layout'
  | 'logans'
  | 'logans1'
  | 'brunch'
  | 'aus'
  | 'snl'
  | 'new'
  | '9-casino'
  | 'gallery-14'
  | 'kappa-1'
  | 'BWineBar'
  | 'AlumniT'
  | 'annual'
  | 'FSHS'
  | 'ICE-1';
export type HybridEvent = {
  id: number;
  name: string;
  isPrivate: boolean;
  startDate: string;
  endDate: string;
  category: string | null;
  fee: number;
  layoutTickets: LayoutTicket[];
  normalTickets: NormalTickets;
  templateId: LayoutTemplates;
  showSoldOut: boolean;
  calendar: EventCalendar | null;
  type: 'Layout' | 'Venue' | 'Online';
  customSettings: EventCustomization | null;
};

export type SuDistNames =
  | 'Regular'
  | 'Section 1'
  | 'Section 2'
  | 'Section 3'
  | 'Section 4'
  | 'Section 5'
  | 'Table - 1'
  | 'Table - 2'
  | 'Table - 3'
  | 'Table - 4'
  | 'Table - 5'
  | 'Table - 6'
  | 'Table - 7'
  | 'Table - 8'
  | 'Table - 9'
  | 'Table - 10'
  | 'Table - 11'
  | 'Table - 12'
  | 'Table - 13'
  | 'Table - 14'
  | 'Table - 15'
  | 'Table - 16'
  | 'Table - 17'
  | 'Table - 18'
  | 'Table - 19';
export type PolarisDistNames =
  | 'Table 1'
  | 'Table 2'
  | 'Table 3'
  | 'Table 4'
  | 'Table 5'
  | 'Table 6'
  | 'Table 7'
  | 'Table 8'
  | 'Table 9'
  | 'Table 10'
  | 'Table 11'
  | 'Table 12'
  | 'Table 13'
  | 'Table 14'
  | 'Table 15'
  | 'Table 16'
  | 'Table 17'
  | 'Table 18'
  | 'Table-16';
export type JearlyDistNames =
  | 'Silver VIP'
  | 'Gold VIP'
  | 'Platinum VIP'
  | 'Diamond VIP'
  | 'Table';

export type annualDistNames = 'VIP Table';
export type LoganDistNames =
  | 'Table 1'
  | 'Table 2'
  | 'Table 3'
  | 'Table 4'
  | 'Table 5'
  | 'Table 6'
  | 'Table 7'
  | 'Table 8'
  | 'Table 9'
  | 'Table 10'
  | 'Table 11'
  | 'Table 12'
  | 'Table 13'
  | 'Table 14'
  | 'Table 15'
  | 'Table 16'
  | 'Table 17'
  | 'VIP Room';

export type AusDistNames =
  | 'BLOCK 101'
  | 'BLOCK 102'
  | 'BLOCK 103'
  | 'BLOCK 104'
  | 'BLOCK 105'
  | 'BLOCK 106'
  | 'BLOCK 107'
  | 'BLOCK 108'
  | 'BLOCK 109'
  | 'BLOCK 110'
  | 'BLOCK 111'
  | 'BLOCK 112'
  | 'BLOCK 113'
  | 'BLOCK 114'
  | 'BLOCK 115'
  | 'BLOCK 116'
  | 'BLOCK 117'
  | 'BLOCK 118'
  | 'BLOCK 119'
  | 'BLOCK 120'
  | 'BLOCK 121'
  | 'BLOCK 122'
  | 'BLOCK 123'
  | 'BLOCK 124'
  | 'BLOCK 125'
  | 'BLOCK 126'
  | 'BLOCK 127'
  | 'BLOCK 128'
  | 'BLOCK 129'
  | 'BLOCK 130'
  | 'BLOCK 131'
  | 'BLOCK 132'
  | 'BLOCK 133'
  | 'BLOCK 134'
  | 'BLOCK C105'
  | 'BLOCK C106'
  | 'BLOCK C107'
  | 'BLOCK C108'
  | 'BLOCK C109'
  | 'BLOCK L105'
  | 'BLOCK L106'
  | 'BLOCK L107'
  | 'BLOCK L108'
  | 'BLOCK L109'
  | 'Party 1'
  | 'Party 2'
  | 'BLOCK 201'
  | 'BLOCK 202'
  | 'BLOCK 203'
  | 'BLOCK 204'
  | 'BLOCK 205'
  | 'BLOCK 206'
  | 'BLOCK 207'
  | 'BLOCK 208'
  | 'BLOCK 209'
  | 'BLOCK 210'
  | 'BLOCK 211'
  | 'BLOCK 212'
  | 'BLOCK 213';

export type AusParkingDistNames =
  | 'STUDENT PARKING'
  | 'STAFF'
  | 'ZONE A'
  | 'ZONE A-1'
  | 'ZONE A-2'
  | 'ZONE A-3'
  | 'ZONE A-4'
  | 'ZONE B'
  | 'ZONE C'
  | 'ZONE D'
  | 'ZONE E'
  | 'ZONE F'
  | 'ZONE G'
  | 'ZONE H'
  | 'ZONE I'
  | 'ZONE J'
  | 'ZONE K'
  | 'ZONE L'
  | 'ZONE M'
  | 'ZONE N'
  | 'ZONE O'
  | 'ZONE P'
  | 'ZONE Q'
  | 'ZONE R'
  | 'ZONE S'
  | 'ZONE T'
  | 'ZONE U'
  | 'ZONE V'
  | 'ZONE W'
  | 'ZONE X'
  | 'ZONE Y'
  | 'ZONE Z';

export type NineCasinoDistNames = 'Regular' | 'Table';
export type Gallery14DistNames = 'Section' | 'Table';
export type Kappa1DistNames = 'VIP 4 Person Table' | 'VIP 8 Person Table';
export type BWineBarDistNames =
  | '2TOP Table'
  | '4TOP Table'
  | '2TOP-HB Table'
  | '8TOP Table'
  | 'Individual Seats'
  | 'Vip Section 1'
  | 'Vip Section 2'
  | 'Vip Section 3';
export type Logans1DistNames =
  | '2 TOP HIGH TABLE'
  | '4 TOP TABLE'
  | '8 TOP TABLE'
  | '8 TOP TABLE - 9'
  | 'TABLE 17';

export type SNLDistNames =
  | 'VIP Booths'
  | 'Elevated Sections'
  | 'Stage Platform'
  | 'Floor Section'
  | 'VIP Tables'
  | '6 Top Table';

export type BrunchDistNames =
  | 'VIP Booths'
  | 'Elevated Section'
  | 'Stage Section'
  | 'Stage Platform'
  | 'Floor Section'
  | 'VIP Table'
  | '2 Person Table'
  | 'Patio Table';

// export type BrunchDistNames =
//   | 'VIP Booths'
//   | 'Elevated Section'
//   | 'Stage Section'
//   | 'Stage Platform'
//   | 'Floor Section'
//   | 'VIP Table'
//   | '2 Person Table'
//   | 'Patio Table';

export type AlumniTDistNames =
  | 'ALPHA'
  | 'ALEXANDRIA ALUMNI'
  | 'BOSSIER CITY ALUMNI'
  | 'GRAMBLING ALUMNI'
  | 'MONROE ALUMNI'
  | 'NATCHITOCHES ALUMNI'
  | 'RAYVILLE ALUMNI'
  | 'SHREVEPORT ALUMNI'
  | 'TAILULAH ALUMNI'
  | 'BATON ROUGE ALUMNI'
  | 'KENNER ALUMNI'
  | 'GAMMA PSI'
  | 'ETA PI'
  | 'ALPHA SIGMA'
  | 'XI APLHA'
  | 'BETAIOTA'
  | 'EPSILONNU'
  | 'NUOMEGA'
  | 'OMICRON UPSILON'
  | 'THETANU'
  | 'NUIOTA'
  | 'SLIDELL ALUMNI'
  | 'NUOMEGA'
  | 'OMICRON UPSILON'
  | 'NEW ORLEANS ALUMNI'
  | 'LAFAYETTE ALUMNI'
  | 'LAKE CHARLES ALUMNI'
  | 'SIGMA GAMMA RHO'
  | 'DELTA SIGMA UPSILON'
  | 'DELTA SIGMA THETA'
  | 'KAPPA ALPHA UPSILON'
  | 'KAPPA ALPHA PSI'
  | 'ZETA PHI UPSILON'
  | 'ZETA PHI BETA'
  | 'OMEGA PSI UPSILON'
  | 'OMEGA PSI PHI'
  | 'OPELPUSAS ALUMNI'
  | 'FRANKLIN (LA) ALUMNI'
  | 'HOUMA THIBODAUX ALUMNI'
  | 'THETANU ALUMNI'
  | 'GRETNA ALUMNI'
  | 'PIDELTA'
  | 'HAMMOND ALUMNI'
  | 'THETALAMBDA'
  | 'BETA GAMMA'
  | 'BETAIOTA'
  | 'BETA IOTA EPSILON NU'
  | 'EPSILONNA'
  | 'AKA';

export type ICE1DistNames =
  | '1st Floor Booths'
  | '1st Floor Tables'
  | '2nd Floor Yellow'
  | '2nd Floor Booths'
  | '2nd Floor Tables'
  | '3rd Floor Bowling Lanes'
  | '3rd Floor High-Top Tables'
  | '4th Floor'
  | '5th Floor';

export type FSHSDistNames = 
  | 'General Admission - A'
  | 'General Admission - B'
  | 'General Admission - C'
  | 'General Admission - D'
  | 'General Admission - E';
export type list = {
  name: string;
  seats: {
    row: number;
    tickets: number[];
  }[];
};

export type SUList = {
  name: SuDistNames;
  seats: {
    row: number;
    tickets: number[];
  }[];
};

export type listings = list[];
export type SuListings = SUList[];
export type OrgEventCategory = {
  id: number;
  name: string;
  events: Event[];
};
export type OrgSocial = {
  Twitter: null | string;
  Facebook: null | string;
  Instagram: null | string;
  Whatsapp: null | string;
  LinkedIn: null | string;
};

export type OrganizerObj = {
  id: number;
  orgName: string;
  aboutUs: string;
  orgCode: string;
  user: null;
  email: string;
  icon: string;
  logo: string;
  calendars: EventCalendar[] | null;
  registeredOn: string;
  status: boolean;
  isFollowing: boolean;
  followingCount: number;
  isNoticeActive: boolean;
  notice: null;
  socialLinks: OrgSocial;
  categories: OrgEventCategory[];
};

export type CustomCalenderEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  status: string;
  slug: string;
};

// search drawer types
export type SearchEventCard = {
  name: string;
  category: string;
  status: boolean;
  image: string;
  slug: string;
  startDate: string;
  endDate: string;
  address: string;
  city: string;
  state: string;
  country: string;
  startPrice: number;
  wishlistStatus: boolean;
  organizerId: number;
  organizer: string;
  followers: number;
  type: string;
};

export type EventSetting = {
  backgroundColor: string | null;
  textColor: string | null;
  showCategory: boolean;
  showStartEndDate: boolean;
  showCountDown: boolean;
  eventStartText: string | null;
  eventEndText: string | null;
  showTicketsPrice: boolean;
  ticketPriceText: string | null;
  parkingPriceText: string | null;
  shopPriceText: string | null;
  buttonText: string | null;
  showWishlist: boolean;
  showLocation: boolean;
  showPolicy: boolean;
};

export type CheckoutSetting = {
  distBgClr: string | null;
  distListingType: string | null;
  distListNumbers: string | null;
  distributions: {
    ticketsHeading: string | null;
    parkingHeading: string | null;
    shopHeading: string | null;
    layoutHeading: string | null;
  };
  cart: {
    heading: string | null;
    subheading: string | null;
    buttonText: string | null;
  };
};

export type EventCustomization = {
  eventDetail: EventSetting;
  checkout: CheckoutSetting;
};

// Thank you page types

export type TicketObject = {
  id: number;
  seatNo: number;
  rowNo: number;
  section: string;
  gateNo: number;
  qrCode: string;
  type: string;
  validity: number;
};

// ...existing code...
export type OrderExtended = {
  showSoldOut: boolean;
  onlineEvent: null | any; // You can refine this if you have an OnlineEvent type
  layoutEvent: {
    templateId: LayoutTemplates;
  };
  customizer: EventCustomization;
};

export type OrderParking = {
  id: number;
  no: number;
  qrCode: string;
  type: string;
};
export type PurchaseResponse = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  totalBill: number;
  purchasedOn: string;
  descritpion: string | null;
  extended: OrderExtended;
  event: Event | null;
  eventTickets: TicketObject[] | null;
  parkingTickets: OrderParking[] | null;
  shopItemTickets: any[] | null; // Refine if you have a type for shop items
};
