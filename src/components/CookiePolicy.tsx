"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { useTheme } from "@/context/ThemeContext";

const CookiePolicy = () => {
  const { setPreciseLocation, setLocPermission } = useTheme();
  const [value, setValue] = useLocalStorage("EZT_CP", "not-allow");
  const [open, setOpen] = useState(false);

  const handleAllowPolicy = async () => {
    setValue("allow");
    sendGTMEvent({
      event: "consent",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    if (typeof window !== "undefined") {
      window.clarity("consentv2", {
        ad_Storage: "granted",
        analytics_Storage: "granted",
      });
    }
  };
  const fetchLocationAndSend = () => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            const locationInfo = { latitude, longitude, accuracy };
            // Send the GA event with visitor's location info
            sendGAEvent("event", "visiter_location", locationInfo);
            setPreciseLocation();
          },
          (error) => {
            console.warn("Error fetching location:", error);
            setLocPermission(false);
          }
        );
      }
    } catch (error) {
      console.warn("Error sending GA event:", error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (value) {
        setOpen(value === "allow" ? false : true);
        if (value === "allow") {
          sendGTMEvent({
            event: "consent",
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted",
          });
          if (typeof window !== "undefined") {
            window.clarity("consentv2", {
              ad_Storage: "granted",
              analytics_Storage: "granted",
            });
          }
        } else {
          sendGTMEvent({
            event: "consent",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
          });
          if (typeof window !== "undefined") {
            window.clarity("consentv2", {
              ad_Storage: "denied",
              analytics_Storage: "denied",
            });
          }
        }
      }
      fetchLocationAndSend();
    }, 10000);
  }, []);
  if (!value || value === "allow") return <></>;

  return (
    <div
      className={`cookie__banner fixed bottom-0 w-full z-[1112] bg-black ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="main-cookie p-3">
        <div className="flex items-center justify-start gap-2 w-full flex-col md:flex-row">
          <div className="text-white basis-full md:basis-3/4">
            <p className="cookie-text">
              <span>
                We use cookies 🍪 to give you the best experience on Eazyticks
                and to ensure that the Eazyticks ads you see on other websites
                are relevant to you. If you continue, you agree to our use of
                cookies. learn more here:{" "}
              </span>
              <Link href="/policies/privacy-policy" className="red">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-center gap-3 basis-full md:basis-1/4 w-full">
            <button
              className="btn btn--secondary"
              onClick={() => handleAllowPolicy()}
            >
              Use Neccessary
            </button>
            <button
              className="btn btn--primary"
              onClick={() => handleAllowPolicy()}
            >
              Allow Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
