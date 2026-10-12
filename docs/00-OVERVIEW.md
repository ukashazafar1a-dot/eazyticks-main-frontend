# EazyTicks - Project Overview

## Table of Contents
1. [Project Description](#project-description)
2. [What is EazyTicks?](#what-is-eazyticks)
3. [How It Works](#how-it-works)
4. [Project Structure](#project-structure)
5. [Technology Stack](#technology-stack)
6. [Key Dependencies](#key-dependencies)
7. [Features Overview](#features-overview)

---

## Project Description

EazyTicks is a modern, mobile-first event ticketing platform built with Next.js and React. It enables event organizers to create, manage, and sell tickets for various types of events (concerts, sports, theater, conferences, etc.), while providing attendees with an easy way to discover and purchase event tickets.

**Live URL:** https://eazyticks.com  
**Deployment Platform:** Cloudflare  
**Repository:** RF Technologies/eazyticks



## What is EazyTicks?

EazyTicks is a comprehensive event management and ticketing solution that serves two main user types:

### For Event Organizers:
- Create and manage unlimited events
- Configure multiple ticket types with dynamic pricing
- Set up early bird pricing, tiered pricing, and promotional codes
- Monitor live ticket sales and revenue
- Export attendee lists and analytics
- Use mobile check-in scanner app for event day management
- Integrate with payment processors for secure transactions
- Receive payouts directly to their accounts

### For Event Attendees:
- Discover events by category, location, and date
- Browse events from favorite organizers
- Purchase tickets securely online
- Receive digital tickets via email and in-app
- Download and save tickets to mobile wallets (Apple Wallet)
- Track upcoming events through notifications
- Access detailed event information and venue details

---

## How It Works

### User Journey - Event Organizer:

1. **Sign Up/Login**
   - Users create an organizer account at `/account/signup`
   - Verify email address to unlock publishing features
   - Complete organizer profile information

2. **Create Event**
   - Navigate to organizer dashboard
   - Click "Create Event" and fill in basic details
   - Add event title, category, description, and visibility settings

3. **Configure Event Details**
   - Set event date, time, and venue (with Google Maps integration)
   - Upload cover image and gallery images
   - Write detailed description and event policies
   - Create ticket types (Free, General, VIP) with pricing
   - Set ticket limits and availability windows

4. **Publish & Promote**
   - Review event preview
   - Publish event to make it live
   - Generate QR code and promotional banners
   - Share via social media links and email campaigns

5. **Manage Event**
   - Monitor live sales in real-time
   - View revenue analytics and ticket metrics
   - Manage attendee list and export data
   - Configure check-in settings and scanner access

6. **Event Day**
   - Use mobile scanning app for attendee check-in
   - Track attendance in real-time
   - Generate reports post-event

### User Journey - Event Attendee:

1. **Sign Up/Login**
   - Create personal account at `/account/signin`
   - Verify email address

2. **Discover Events**
   - Browse events on homepage
   - Filter by category, location, date, or organizer
   - Search for specific events
   - View event details and organizer information

3. **Purchase Tickets**
   - Select event and ticket type
   - Choose quantity and add to cart
   - Review extra fields/requirements if needed
   - Proceed to checkout with payment
   - Complete transaction securely

4. **Receive Tickets**
   - Instant confirmation email with digital ticket
   - Tickets available in account profile
   - Download to Apple Wallet if available
   - QR code generated for venue entry

5. **Attendee Features**
   - Save favorite organizers
   - Receive event notifications
   - Access ticket finder tool via email
   - Manage all tickets in profile section

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages & layouts
│   ├── about-us/                # About us page
│   ├── account/                 # Authentication & user profile pages
│   ├── blog/                    # Blog pages
│   ├── browse-events/           # Event discovery & filtering
│   ├── categories/              # Events by category
│   ├── checkout/                # Checkout & thank you pages
│   ├── contact-us/              # Contact form page
│   ├── dashboard/               # Organizer dashboard
│   ├── events/                  # Event details & selection pages
│   ├── faqs/                    # FAQ section
│   ├── features/                # Features showcase page
│   ├── organizers/              # Organizer profiles page
│   ├── policies/                # Privacy & legal policies
│   ├── pricing/                 # Pricing information page
│   ├── sell-tickets-online/     # Seller onboarding flow
│   ├── support/                 # Support & help center
│   ├── testimonials/            # Client success stories
│   ├── ticket-finder/           # Find tickets by email
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── Index.tsx                # Providers wrapper
│   ├── app.tsx                  # Main app wrapper with header/footer
│   ├── actions.ts               # Server actions
│   ├── error.tsx                # Error boundary
│   ├── global-error.tsx         # Global error handler
│   ├── loading.tsx              # Loading skeleton
│   ├── not-found.tsx            # 404 page
│   ├── page.tsx                 # Home page
│   └── TokenExpiry.tsx          # Token expiration handler
├── client/                      # Client-side components
│   ├── bookTicket/              # Ticket booking flow components
│   ├── Calender/                # Calendar/event selection UI
│   ├── home/                    # Home page components
│   ├── Hybrid/                  # Hybrid event components
│   └── Layout/                  # Common layout components
├── components/                  # Reusable UI components
│   ├── ui/                      # Shadcn UI component library
│   ├── icons/                   # Custom icon components
│   ├── jsonld/                  # JSON-LD schema components
│   ├── loaders/                 # Loading/skeleton components
│   ├── Header*.tsx              # Header variants (Primary, Secondary, Sidebar)
│   ├── Footer.tsx               # Footer component
│   ├── Ticket.tsx               # Ticket display component
│   ├── EventCard.tsx            # Event card component
│   ├── EventCardImage.tsx       # Event card image
│   ├── Container.tsx            # Layout container
│   ├── Analytics.tsx            # Analytics tracking
│   └── ...                      # Other shared components
├── context/                     # React Context providers
│   ├── AppContext.tsx           # Global app state (auth, cart, events)
│   ├── AuthContext.tsx          # Authentication context
│   ├── ThemeContext.tsx         # Theme management
│   └── useApp.tsx               # App context hook
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts               # Authentication hook
│   ├── useHybridEvent.ts        # Hybrid event logic
│   ├── useSelectionForm.ts      # Form handling
│   └── ...                      # Other custom hooks
├── lib/                         # Utility functions & constants
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # General utility functions
│   ├── routes.ts                # Route definitions
│   ├── formatData.ts            # Data formatting helpers
│   ├── translate.ts             # Translation/i18n
│   ├── fonts.ts                 # Font configuration
│   └── constants.ts             # App constants
├── helpers/                     # Helper functions & data
│   ├── Site.ts                  # Site configuration & metadata
│   ├── StaticData.ts            # Static data & defaults
│   └── generals.ts              # General purpose helpers
├── assets/                      # Static assets & stylesheets
│   ├── css files                # Custom CSS for event templates
│   ├── OriginalLogo.tsx         # Logo component
│   └── images/                  # Image assets
├── middleware.ts                # Next.js middleware (auth, redirects)
└── ...

public/
├── logo.svg                     # Main logo
├── robots.txt                   # SEO robots file
├── sitemap.xml                  # SEO sitemap
├── widget.css                   # Third-party widget styles
└── assets/                      # Public images & files

Configuration Files:
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── components.json              # Shadcn CLI configuration
├── .eslintrc.json               # ESLint configuration
├── tawk.d.ts                    # Tawk widget type definitions
└── next-env.d.ts                # Next.js type definitions
```

---

## Technology Stack

### Core Framework
- **Next.js 14+** - React meta-framework with App Router, Server Components, and optimized production builds
- **React 18+** - UI library for building interactive components
- **TypeScript** - Static typing for JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Shadcn/ui** - High-quality React component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **React Icons** - Library of popular icon sets (HiOutlineBars3, FiUser, IoMdCheckmarkCircleOutline, etc.)

### State Management & Data Fetching
- **React Context API** - Global state management (AppContext, AuthContext, ThemeContext)
- **React Use Cart** - Shopping cart state management for ticket selection
- **Next.js Native Fetch** - Server-side data fetching with caching

### Form Handling & Validation
- **React Hook Form** - Performant form state management (used in signup, login, contact forms)
- **Custom Validation** - Schema validation for form inputs

### Rich Text & Editing
- **React Quill** - WYSIWYG editor for event descriptions and content
- **HTML React Parser** - Parse HTML strings to React components (used for rich text display)

### Authentication & Security
- **JWT Token Management** - Secure authentication with token-based sessions
- **Email Verification** - Email confirmation flows
- **Next.js Middleware** - Request authentication and authorization

### Payment & Transactions
- **Stripe Integration** - Payment processing and secure transactions

### Date & Time
- **Moment.js** - Date parsing, formatting, and manipulation (legacy, being phased out)

### Maps & Location
- **Google Maps Integration** - Venue location selection during event creation

### Notifications & Toasts
- **Sonner** - Toast notification library for user feedback

### File Handling
- **Document Download** - Client-side file download (for tickets, PDFs)

### Performance & Loading
- **next-nprogress-bar** - Progress bar during page navigation
- **Lazysizes** - Lazy loading for images and resources
- **Next/Image** - Optimized image component with lazy loading
- **React Countup** - Animated number counters

### SEO & Metadata
- **Next.js Metadata API** - Dynamic meta tags for each page
- **Dynamic Sitemap Generation** - Auto-generated SEO sitemap
- **Open Graph Tags** - Social media sharing optimization
- **JSON-LD Schema** - Structured data for search engines

### Analytics & Monitoring
- **Microsoft Clarity** - Session recording and analytics
- **Tawk.to** - Live chat widget for customer support
- **Custom Analytics** - Event tracking and user behavior

### Code Quality & Development
- **ESLint** - JavaScript linting and code quality
- **TypeScript** - Type safety and enhanced IDE support
- **Prettier** (if configured) - Code formatting

### Deployment & Hosting
- **Cloudflare Pages** - Deployment and hosting platform
- **Edge Runtime** - Server-side execution on the edge

---

## Key Dependencies

### Production Dependencies (Detailed Usage)

#### 1. **next** (v14+)
- **Purpose:** React framework with App Router, Server Components, image optimization, and more
- **Used In:**
  - `src/app/layout.tsx` - Root layout with metadata
  - `src/app/page.tsx` - Home page
  - All page files in `src/app/` directory for SSR/SSG
  - `src/app/actions.ts` - Server actions for form submissions
- **Key Features:** 
  - App Router for modern routing
  - Server Components for data fetching
  - Image optimization with `next/image`
  - Automatic code splitting
  - Built-in API routes support

#### 2. **react** & **react-dom** (v18+)
- **Purpose:** Core UI library and DOM rendering
- **Used In:** Every `.tsx` component file throughout the project
- **Key Features:** 
  - Hooks (useState, useEffect, useContext)
  - Context API for global state
  - Server Components support
  - Concurrent rendering

#### 3. **typescript** (v5+)
- **Purpose:** Static typing for better code quality and IDE support
- **Used In:** All `.ts` and `.tsx` files throughout the project
- **Configuration:** `tsconfig.json` at root
- **Benefits:** Type safety, better IDE autocomplete, catch errors at compile time

#### 4. **tailwindcss** (v3+)
- **Purpose:** Utility-first CSS framework for responsive design
- **Used In:** All component styling via className attributes
- **Configuration:** `tailwind.config.ts`
- **Example:** 
  ```tsx
  className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg"
  ```
- **Custom Styles:** `src/assets/*.css` files for custom Tailwind components

#### 5. **@radix-ui/* packages**
- **Purpose:** Unstyled, accessible component primitives (WCAG 2.1 compliant)
- **Packages:**
  - `@radix-ui/dialog` - Accessible modal dialogs
  - `@radix-ui/accordion` - Collapsible accordion component
  - `@radix-ui/dropdown-menu` - Dropdown menu primitives
  - `@radix-ui/tabs` - Tab navigation component
  - `@radix-ui/form` - Form field primitives
  - And other UI primitives
- **Used In:**
  - `src/components/ui/` - Shadcn UI components built on Radix
  - `src/app/organizers/[orgId]/` - Organizer profile modals
  - `src/app/faqs/` - FAQ accordion sections
  - `src/app/checkout/` - Checkout form modals

#### 6. **react-icons**
- **Purpose:** Icon library with popular icon sets (Font Awesome, Feather, Heroicons, etc.)
- **Icons Used:**
  - `HiOutlineBars3`, `HiOutlineSearch` - Heroicons outline
  - `CiSearch`, `CiUser` - Circum icons
  - `BiSupport`, `BiUserCircle` - Bootstrap icons
  - `IoTicketOutline`, `IoMdCheckmarkCircleOutline` - Ionicons
  - `MdOutlineStadium`, `MdOutlineCategory` - Material Design
  - `FiUser`, `FiLogOut` - Feather icons
- **Used In:**
  - `src/components/HeaderPrimary.tsx` - Navigation icons
  - `src/components/Footer.tsx` - Social and action icons
  - `src/app/pricing/` - Feature icons
  - Throughout all pages and components for visual hierarchy

#### 7. **react-use-cart**
- **Purpose:** Shopping cart state management and cart operations for ticket selection
- **Used In:**
  - `src/app/events/[slug]/selection/` - Ticket selection table
  - `src/client/bookTicket/` - Booking flow components
  - `src/app/Index.tsx` - CartProvider wrapper for entire app
- **Features:**
  - Add/remove items from cart
  - Quantity management
  - Cart total calculations
  - Cart persistence (optional)

#### 8. **next-nprogress-bar**
- **Purpose:** Visual progress bar during page navigation and loading
- **Used In:** `src/app/Index.tsx` - AppProgressBar component wrapping the entire app
- **Configuration:**
  - Height: 3px
  - Color: #f85431 (brand primary color)
  - No spinner animation
- **Shows:** During Next.js page transitions and route changes

#### 9. **sonner**
- **Purpose:** Toast notification library for user feedback (success, error, info messages)
- **Used In:**
  - `src/app/app.tsx` - Toaster component with global configuration
  - Throughout all forms and actions for success/error messages
  - Event creation, ticket booking, login/signup flows
- **Configuration:**
  - Position: top-right
  - Max visible toasts: 3
  - Auto-dismiss: 4 seconds (configurable per toast)

#### 10. **react-quill**
- **Purpose:** WYSIWYG (What You See Is What You Get) rich text editor for creating event descriptions
- **Used In:**
  - Event creation form (organizer dashboard)
  - Event editing pages
  - NewsletterForm or similar content components
- **Features:**
  - Bold, italic, underline text formatting
  - Heading levels (H1-H6)
  - Lists (ordered and unordered)
  - Links and images
  - Code blocks
  - Saves content as formatted HTML

#### 11. **html-react-parser**
- **Purpose:** Parse HTML strings to React components safely (without dangerouslySetInnerHTML)
- **Used In:**
  - `src/app/events/[slug]/_components/EventDescription.tsx` - Parse HTML event descriptions
  - `src/app/policies/_components/Privacy.tsx` - Legal/policy content display
  - `src/app/organizers/[orgId]/_components/NoticeModal.tsx` - HTML notice content
  - Any component displaying user-generated HTML content
- **Benefits:** XSS protection, React component conversion, clean API

#### 12. **moment** (legacy, being phased out)
- **Purpose:** Date/time parsing, formatting, and manipulation
- **Used In:**
  - `src/app/events/[slug]/_components/Banner.tsx` - Format event dates and times
  - `src/client/Calender/` - Calendar display and date calculations
  - Event countdown timers
  - Scheduling and availability windows
- **Note:** Consider migrating to `date-fns` or `Day.js` for new implementations (smaller bundle size)

#### 13. **@next/third-parties** 
- **Purpose:** Official Next.js integrations for third-party services
- **Packages:**
  - `@next/third-parties/google` - Google services (Maps, YouTube, Analytics)
- **Used In:**
  - `src/app/about-us/_components/InAction.tsx` - YouTubeEmbed for video content
  - Analytics tracking setup
  - Google Maps embedding
- **Benefits:** Optimized loading, Hydration safety, Web Vitals optimization

#### 14. **clsx** or **classnames**
- **Purpose:** Conditional CSS class management and joining
- **Used In:** All components with dynamic styling based on props/state
- **Example:**
  ```tsx
  className={clsx(
    'btn',
    { 'btn--primary': variant === 'primary' },
    { 'btn--large': size === 'large' },
    className
  )}
  ```

#### 15. **stripe** & **@stripe/react-stripe-js**
- **Purpose:** Payment processing and secure transaction handling
- **Used In:**
  - `src/client/bookTicket/Stripe/StripeContainer.tsx` - Stripe payment form
  - Checkout pages
  - Payment processing and tokenization
- **Features:**
  - Secure card input (PCI compliance)
  - Payment intents handling
  - 3D Secure support
  - Multiple payment methods (cards, Apple Pay, Google Pay)

#### 16. **react-hook-form**
- **Purpose:** Performant, scalable form state management with validation
- **Used In:**
  - `src/app/account/` - Login and signup forms
  - `src/app/contact-us/` - Contact form
  - `src/client/bookTicket/` - Ticket booking forms
  - All forms requiring validation
- **Features:**
  - Minimal re-renders
  - Built-in validation
  - Error handling
  - File upload support
  - Watch fields for conditional rendering

#### 17. **next-image-export-optimizer** (if used)
- **Purpose:** Optimize images for static export or download
- **Used In:** Ticket download, PDF generation, static image optimization

#### 18. **react-countup**
- **Purpose:** Animated number counter component for statistics
- **Used In:**
  - `src/app/pricing/_components/StatsSection.tsx` - CountUp animations for metrics
  - Organizer statistics displays
  - Event count animations

#### 19. **axios** (if used) OR **fetch API**
- **Purpose:** HTTP client for API requests to backend
- **Used In:** 
  - Data fetching for events, organizers, user profiles
  - Form submissions
  - Payment API calls
- **Current Approach:** Next.js native `fetch` with server actions

#### 20. **zod** (if used) OR **yup**
- **Purpose:** Schema validation for forms and data
- **Used In:** Form validation in signup, login, event creation flows
- **Integration:** Works with react-hook-form

---

### Dev Dependencies

#### 1. **@types/node**, **@types/react**, **@types/react-dom**
- **Purpose:** TypeScript type definitions for Node.js, React, and React DOM
- **Used In:** Development environment for type checking

#### 2. **@typescript-eslint/eslint-plugin**, **@typescript-eslint/parser**
- **Purpose:** ESLint support for TypeScript
- **Configuration:** `.eslintrc.json`
- **Enforces:** Code quality, naming conventions, best practices

#### 3. **postcss**, **autoprefixer**
- **Purpose:** CSS transformation and vendor prefix support
- **Configuration:** `postcss.config.js`
- **Used With:** Tailwind CSS for processing utilities

#### 4. **prettier** (optional)
- **Purpose:** Code formatting for consistency
- **Configuration:** `.prettierrc` (if configured)

#### 5. **eslint** & **eslint-config-next**
- **Purpose:** Code linting and quality enforcement
- **Configuration:** `.eslintrc.json`
- **Runs:** During development and build process

---

## Features Overview

### For Event Organizers

✅ **Event Management**
- Create unlimited events with full customization
- Multi-event dashboard management
- Event templates and presets
- Draft and publish workflow
- Event status tracking (upcoming, live, completed, cancelled)

✅ **Ticketing**
- Multiple ticket types (Free, General, VIP, Premium)
- Dynamic pricing models
- Early bird pricing
- Group discounts and promo codes
- Tiered pricing per ticket level

✅ **Revenue & Payouts**
- Processing fee only on paid tickets
- Transparent pricing structure
- Real-time revenue tracking
- Secure payout management
- Multiple payment method support

✅ **Attendee Management**
- Guest list management
- QR code check-in system
- Mobile scanner app for iOS/Android
- Real-time attendance tracking
- Attendee data export

✅ **Analytics & Reporting**
- Sales analytics dashboard
- Revenue insights
- Ticket sold metrics
- Attendee demographics
- Date range filtering

✅ **Marketing & Promotion**
- Email campaign tools
- Social media sharing
- Promotional code generation
- Event banners and assets
- QR code generation

✅ **Support**
- 24/7 customer support via Tawk
- Email and phone support
- Dedicated account manager for enterprise
- Help center resources

### For Event Attendees

✅ **Event Discovery**
- Browse events by category
- Search and filter capabilities
- Location-based filtering
- Date range filtering
- Organizer following system

✅ **Ticketing & Purchase**
- Secure online ticket purchase via Stripe
- Multiple payment methods
- Digital ticket delivery
- Instant confirmation
- Ticket downloading

✅ **Ticket Management**
- Apple Wallet integration
- Mobile ticket viewing
- Ticket transfer (if enabled)
- Ticket finder by email
- Digital ticket download

✅ **User Features**
- Personal dashboard
- Following/wishlist system
- Order history
- Profile management
- Email notifications

✅ **Event Information**
- Detailed event descriptions with rich text
- Venue location with Google Maps
- Organizer information and history
- Attendee reviews/ratings
- Related events suggestions

---

## Developer Documentation

To understand specific parts of the project in more detail, please refer to the following guides:

1. **[Authentication Guide](./AUTHENTICATION-GUIDE.md)** - Explains the authentication flow, token management, and security.
2. **[Deployment Guide](./DEPLOYMENT-GUIDE.md)** - Provides instructions on how to deploy the application to Cloudflare.
3. **[Adding a New SVG Layout](./ADDING-A-NEW-LAYOUT-GUIDE.md)** - A step-by-step guide on how to integrate a new interactive seat map.

---

**Last Updated:** March 2026  
**Version:** 1.0  
**Maintained By:** RF Technologies Team
