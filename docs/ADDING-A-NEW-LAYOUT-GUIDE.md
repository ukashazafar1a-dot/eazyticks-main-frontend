# Developer Guide: Adding a New SVG Seat Layout

This guide provides a step-by-step process for integrating a new SVG-based interactive seat layout into the EazyTicks platform.

## Overview

The layout system allows users to select specific seats, tables, or sections from an interactive SVG map during the ticket booking process. Each layout is a self-contained React component that renders an SVG and handles user interactions for seat selection.

## Phase 1: SVG Asset Preparation

Before writing any code, the SVG asset must be properly prepared and optimized.

### 1. Asset Acquisition and Analysis

- **Receive SVG:** Obtain the initial layout SVG from the client (e.g., a map of a stadium, restaurant, or venue).
- **Identify Distributions:** Analyze the SVG to identify all distinct, selectable areas. These are called "distributions" (e.g., "Section A", "VIP Table", "Row 5").
- **Client Consultation:** Discuss with the client to confirm the name and ticketing rules for each distribution.

### 2. Design and Optimization

- **Graphic Design:** Forward the annotated SVG to a graphic designer to create a clean, high-quality, and standardized version.
- **SVG Code Cleanup:** Once the final SVG is received, manually inspect its code to perform optimizations. The goal is to reduce the code's size and complexity for better performance.
  - **Remove Bloat:** Delete unnecessary elements, such as:
    - Base64-encoded raster images (`<image xlink:href="data:image/png;base64,...">`). These can often be removed if they are not essential to the layout's function, significantly reducing file size.
    - Redundant groups (`<g>`).
    - Hidden layers or commented-out code.
  - **How to Clean:** Open the SVG in a code editor or use the browser's developer tools to inspect and delete elements. Check the visual rendering after each removal to ensure nothing critical was lost.

## Phase 2: Application Integration

After the SVG is finalized, integrate it into the application by following these steps.

### Step 1: Define Types

To maintain strict type-safety, you must declare the new layout's name and its distribution names.

1.  **Open the types file:** Navigate to `src/lib/types.ts`.

2.  **Add Layout Name:** Add the new layout's unique identifier to the `LayoutTemplates` type alias. The name should be `camelCase` or `kebab-case`.

    ```typescript
    // src/lib/types.ts

    export type LayoutTemplates =
      | "default"
      | "eleven"
      | "BWineBar"
      | "myNewAwesomeLayout"; // <-- Add your new layout name here
    ```

3.  **Add Distribution Names:** Create a new type alias for the distributions specific to your new layout. This ensures that you can only refer to valid distribution names within your component.

    ```typescript
    // src/lib/types.ts

    // ... existing distribution types

    export type MyNewAwesomeLayoutDistNames =
      | "General Admission"
      | "VIP Section"
      | "Table 1"
      | "Table 2";
    ```

### Step 2: Create the Layout Component

This component will contain the SVG and the logic for handling user interactions.

1.  **Create the file:** In the `src/client/Layout/` directory, create a new `.tsx` file for your component (e.g., `MyNewAwesomeLayout.tsx`).

2.  **Component Structure:** The easiest way to start is by duplicating an existing layout component, such as `BWineBarLayout.tsx`, and modifying it. The core structure will look like this:

    ```typescript
    // src/client/Layout/MyNewAwesomeLayout.tsx

    import { useCart } from "react-use-cart";
    import useHybridLayout from "@/hooks/useHybridLayout";
    import useApp from "@/context/useApp";
    import { extractConfirmed, extractSeatNos } from "@/lib/utils";
    import { Ticket, MyNewAwesomeLayoutDistNames } from "@/lib/types"; // <-- Import your new distribution type
    import { useEffect, useState } from "react";

    type Props = {
      tickets: Ticket[] | null;
    };

    const MyNewAwesomeLayout = ({ tickets }: Props) => {
      const [tables, setTables] = useState<Ticket[] | null>(null);
      const { getItem } = useCart();
      const { handleAddToCart } = useHybridLayout();
      const { setToaster } = useApp();

      // This function dynamically assigns CSS classes to SVG elements
      const getClassNames = (table: MyNewAwesomeLayoutDistNames, seatNumber: number) => {
        const classes = ["seat"]; // Base class
        const foundTicket = tables?.find(
          (ticket) => ticket.name.toLowerCase() === table.toLowerCase()
        );

        if (!foundTicket) return classes.join(" ");

        const booked = extractSeatNos(foundTicket.seats);
        const sold = extractConfirmed(foundTicket.seats);

        if (sold.includes(seatNumber)) {
          classes.push("sold");
        } else if (booked.includes(seatNumber)) {
          classes.push("booked");
        }

        const cartItemId = `t-${foundTicket.id}-r-1-b-${seatNumber}`;
        if (getItem(cartItemId)) {
          classes.push("in-cart");
        }

        return classes.join(" ");
      };

      // This function handles clicks on SVG elements
      const handleClick = (
        table: MyNewAwesomeLayoutDistNames,
        seat: number,
        name: string
      ) => {
        const foundTicket = tables?.find(
          (ticket) => ticket.name.toLowerCase() === table.toLowerCase()
        );

        if (foundTicket) {
          const exact = foundTicket.seats?.find((tick) => tick.seatNo == seat);
          if (exact && (exact.status === "Confirmed" || exact.status === "Booked")) {
            setToaster(
              "error",
              `${name} is already ${
                exact.status === "Confirmed" ? "sold" : exact.status
              }.`
            );
          } else {
            handleAddToCart(foundTicket, 1, seat, name);
          }
        } else {
          setToaster("error", `${table} is not available.`);
        }
      };

      useEffect(() => {
        if (tickets) {
          setTables(tickets);
        }
      }, [tickets]);

      // Paste your clean SVG code here
      return (
        <div className="my-new-awesome-layout-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 800" // Example viewBox
            // ... other svg attributes
          >
            {/* Example of a clickable group */}
            <g
              id="table-1"
              className={getClassNames("Table 1", 1)}
              onClick={() => handleClick("Table 1", 1, "Table 1 Seat 1")}
            >
              {/* SVG shapes for this element */}
              <rect x="100" y="100" width="50" height="50" />
              <text x="110" y="130">T1</text>
            </g>
            
            {/* Another example */}
            <g
              id="vip-section-seat-5"
              className={getClassNames("VIP Section", 5)}
              onClick={() => handleClick("VIP Section", 5, "VIP Seat 5")}
            >
              <circle cx="200" cy="200" r="20" />
            </g>

            {/* ... rest of your SVG code */}
          </svg>
        </div>
      );
    };

    export default MyNewAwesomeLayout;
    ```

3.  **Integrate Your SVG:**
    - Paste your cleaned SVG code inside the `return` statement.
    - For each clickable element in your SVG (usually a `<g>`, `<path>`, `<rect>`, or `<circle>`), you **must** add `className` and `onClick` attributes.
    - **`className`**: Assigns dynamic styling. Call `getClassNames()` with the distribution name and the specific seat/element number.
    - **`onClick`**: Handles user interaction. Call `handleClick()` with the distribution name, seat number, and a user-friendly display name for the seat.

### Step 3: Render the New Layout Component

Finally, tell the main booking page to render your new component when an event with your layout `templateId` is loaded.

1.  **Open the booking index:** Navigate to `src/client/Hybrid/IndexBookTicket.tsx`.

2.  **Import your component:** Add an import statement for your new layout at the top of the file.

    ```javascript
    // src/client/Hybrid/IndexBookTicket.tsx
    import BWineBarLayout from "../Layout/BWineBarLayout";
    import MyNewAwesomeLayout from "../Layout/MyNewAwesomeLayout"; // <-- Import your component
    // ... other imports
    ```

3.  **Add the render case:** Find the `renderLayoutByTemplateId` function and add a new `case` to its `switch` statement that matches the `templateId` you defined in `types.ts`.

    ```javascript
    // src/client/Hybrid/IndexBookTicket.tsx

    const renderLayoutByTemplateId = () => {
      switch (templateId) {
        // ... existing cases
        case "BWineBar":
          return (
            <>
              <LayoutTicketType />
              <BWineBarLayout tickets={layoutTickets} type="layout" />
            </>
          );
        
        // v-- Add your new case here --v
        case "myNewAwesomeLayout":
          return (
            <>
              {/* You may or may not need a LayoutTicketType component depending on the requirements */}
              <LayoutTicketType /> 
              <MyNewAwesomeLayout tickets={layoutTickets} />
            </>
          );
        // ^-- End of new case --^

        default:
          return <NoSeatingPlan />;
      }
    };
    ```

After completing these steps, the application will now be able to render your new interactive SVG layout for any event configured with the `myNewAwesomeLayout` template ID.
