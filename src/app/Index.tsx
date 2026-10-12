"use client";
import "lazysizes";
import { CartProvider } from "react-use-cart";
import React from "react";
import { AppProvider } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import MicrosoftClarity from "../hooks/MicrosoftClarity";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="app-wrapper" data-path={pathname}>
        <CartProvider>
          <AuthProvider>
            <AppProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </AppProvider>
          </AuthProvider>
        </CartProvider>
      </div>
      <ProgressBar
        height="3px"
        color="#f85431"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <MicrosoftClarity />
    </>
  );
};

export default Providers;
