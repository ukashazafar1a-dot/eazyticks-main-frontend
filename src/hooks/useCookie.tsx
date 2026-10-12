"use client";
import { COOKIE_DOMAIN, cookieName } from "@/lib/utils";
import { useCallback } from "react";

const useCookie = () => {
  const getCookie = useCallback(() => {
    const nameLenPlus = cookieName.length + 1;
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter(
          (cookie) => cookie.substring(0, nameLenPlus) === `${cookieName}=`
        )
        .map((cookie) =>
          decodeURIComponent(cookie.substring(nameLenPlus))
        )[0] || null
    );
  }, []);

  const setCookie = useCallback((value: any) => {
    const expires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString();
    const stringValue = encodeURIComponent(JSON.stringify(value));

    document.cookie = `${cookieName}=${stringValue}; expires=${expires}; path=/; ${COOKIE_DOMAIN} Secure; SameSite=None`;
  }, []);

  const deleteCookie = useCallback(() => {
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; ${COOKIE_DOMAIN}`;
  }, []);

  // ✅ Clear ALL cookies + eztUser from localStorage
  const clearAllCookies = useCallback(() => {
    const cookies = document.cookie.split(";");
    const domain = window.location.hostname; // ✅ dynamic domain
    const path = window.location.pathname; // ✅ current path

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();

      if (name) {
        // Remove cookie for root path
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=None`;

        // Remove cookie for current path
        document.cookie = `${name}=; Path=${path}; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=None`;
      }
    });

    // Clear localStorage key if present
    if (typeof window !== "undefined") {
      localStorage.removeItem("eztUser");
    }
  }, []);

  return { getCookie, setCookie, deleteCookie, clearAllCookies };
};

export default useCookie;
