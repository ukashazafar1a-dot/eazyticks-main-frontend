# EazyTicks - Event Ticketing Platform

EazyTicks is a modern, mobile-first event ticketing platform built with Next.js, React, and Tailwind CSS. It enables event organizers to create, manage, and sell tickets for various events, while providing attendees with a seamless way to discover and purchase tickets online.

**Live URL:** https://eazyticks.com  
**Deployment:** Cloudflare Pages

----

## Table of Contents

- [About The Project](#about-the-project)
- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
- [Documentation](#documentation)

---

## About The Project

EazyTicks is a comprehensive event management and ticketing solution that serves two main user types:

-   **For Event Organizers:** A full suite of tools to create, publish, and manage events. Features include a powerful dashboard, ticket type configuration, real-time sales analytics, and attendee management.
-   **For Event Attendees:** An intuitive platform to discover local and online events, purchase tickets securely, and manage them digitally. Features include event filtering, secure checkout with Stripe, and Apple Wallet integration.

## Core Technologies

This project leverages a modern, robust, and scalable tech stack:

-   **Framework:** [Next.js](https://nextjs.org/) (v14+) with App Router
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with PostCSS
-   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/) for accessible components
-   **State Management:** React Context API & `react-use-cart` for the shopping cart
-   **Form Handling:** `react-hook-form` with `zod` for validation
-   **Payment:** `Stripe` for secure payment processing
-   **Rich Text:** `React Quill` for the WYSIWYG editor
-   **Deployment:** Deployed to the edge via [Cloudflare Pages](https://pages.cloudflare.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (v18 or later) and `npm` installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd eazyticks
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Development Server

Create a `.env.local` file in the root of the project and add the necessary environment variables.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For a complete overview of the project architecture, features, and developer guides, please refer to our main documentation portal.

➡️ **[View Project Documentation](./docs/00-OVERVIEW.md)**

This includes detailed guides on:
- Project Authentication
- Deployment on Cloudflare
- Adding new SVG seat layouts
- And more.
