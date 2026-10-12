"use client";
import React from "react";
import TawkMassengerReact from "@tawk.to/tawk-messenger-react";

function TawkWidget() {
  return (
    <TawkMassengerReact
      propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
      widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
    />
  );
}
export default TawkWidget;
