"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CheckoutCustomerPayload } from "./types";

interface CheckoutContextValue {
  checkoutData: CheckoutCustomerPayload | null;
  setCheckoutData: (data: CheckoutCustomerPayload) => void;
  clearCheckoutData: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [checkoutData, setCheckoutData] = useState<CheckoutCustomerPayload | null>(null);

  const clearCheckoutData = () => {
    setCheckoutData(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        setCheckoutData,
        clearCheckoutData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
