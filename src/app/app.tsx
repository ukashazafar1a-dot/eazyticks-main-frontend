import React from "react";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TawkWidget = dynamic(() => import("../components/TawkWidget"), {
  ssr: false,
});
const CookiePolicy = dynamic(() => import("../components/CookiePolicy"), {
  ssr: false,
});
const TokenExpiry = dynamic(() => import("./TokenExpiry"), {
  ssr: false,
});

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="page--templates">{children}</div>
      <Footer />
      <TawkWidget />
      <CookiePolicy />
      <Toaster
        position="top-right"
        expand={false}
        visibleToasts={3}
        toastOptions={{
          className: "custom-toast",
        }}
      />
      <TokenExpiry />
    </>
  );
}

export default App;
