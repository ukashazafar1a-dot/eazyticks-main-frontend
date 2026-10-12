"use client";
import React from "react";
import HeaderPrimery from "./HeaderPrimary";
import HeaderSecondary from "./HeaderSecondary";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // check for pathname contains /account
  // if(pathname.includes("/account")){
  //   //console.log("Account page");
  //   console.log(pathname);
  //   return;
  // }
  return (
    <>
      {pathname === "/browse-events" || pathname === "/" ? (
        <HeaderPrimery />
      ) : (
        <HeaderSecondary />
      )}
    </>
  );
};

export default Header;
