"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import useApp from "@/context/useApp";
import Json from "./jsonld/Json";
import HeaderSidebar from "./HeaderSidebar";
import ProfileIcon from "./ProfileIcon";
import { getDaysRange } from "@/helpers/generals";
import { CiSearch } from "react-icons/ci";
import { Site } from "@/helpers/Site";
import { RiMenu3Line } from "react-icons/ri";
import SearchContainer from "./SearchContainer";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

function HeaderSecondary() {
  const { user, logout, isAdmin } = useApp();
  const { searchDrawer, toggleSearchDrawer } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderBrowseLink = () => {
    const { firstDay, lastDay } = getDaysRange(14);
    return (
      <Link
        href={"/browse-events?startDate=" + firstDay + "&endDate=" + lastDay}
        className={`hover:text-primary ${
          pathname == "/browse-events" ? "text-primary" : ""
        }`}
      >
        Browse Events
      </Link>
    );
  };

  return (
    <header className="header secondary--header bg-[#fafafa] ">
      <SearchContainer />
      <div className="secondary-wrapper container scroll-px-36 flex items-center justify-between py-3 px-3">
        <div
          id="slide"
          className={`fixed inset-0 bg-gray-500 bg-opacity-75 z-100 ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <HeaderSidebar open={isSidebarOpen} onClose={handleCloseSidebar} />
        </div>
        <div className="container flex items-center justify-between p-0 gap-3">
          <div className="header-logo flex flex-col items-center sm:flex-row sm:w-[24%]">
            <Link href="/" className="header-logo-wrapper">
              <h1 className="visually-hidden">Eazyticks</h1>
              <Image
                src="/logo-black.svg"
                className="logo-img w-28 md:w-40"
                width={180}
                height={60}
                alt="Eazyticks logo"
              />
            </Link>
          </div>
          <div
            className=" bg-[#f1f1f1] rounded-full hidden lg:flex items-center justify-start gap-1 px-3 py-1 min-w-[350px] mx-6 cursor-pointer"
            onClick={() => toggleSearchDrawer(!searchDrawer)}
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <CiSearch className="w-8 h-8 fill-black" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for name, city, festival"
              readOnly
              className="cursor-pointer p-0 bg-transparent border-0 outline-none w-full focus:border-0 focus:outline-none hover:outline-none focus-visible:outline-none"
            />
          </div>
          <div
            className={`flex justify-end lg:justify-between items-center w-full`}
          >
            <ul className="hidden lg:flex justify-start items-center gap-3 w-full">
              <li className="text-lg font-medium">{renderBrowseLink()}</li>
              <li className="text-lg font-medium">
                <Link
                  href="/shop/organizers"
                  className={`hover:text-primary ${
                    pathname?.startsWith("/shop") ? "text-primary" : ""
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li className="text-lg font-medium">
                <Link
                  href="/pricing"
                  className={`hover:text-primary ${
                    pathname == "/pricing" ? "text-primary" : ""
                  }`}
                >
                  Pricing
                </Link>
              </li>
              <li className="text-lg font-medium">
                <Link
                  href="/features"
                  className={`hover:text-primary ${
                    pathname == "/features" ? "text-primary" : ""
                  }`}
                >
                  Features
                </Link>
              </li>
              <li className="text-lg font-medium">
                <Link
                  href="/contact-us"
                  className={`hover:text-primary ${
                    pathname == "/contact-us" ? "text-primary" : ""
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              <li className="ms-auto text-lg font-medium">
                <a
                  href={Site?.organizer?.url}
                  target={isAdmin ? '_self' : '_blank'}
                  className="hover:text-primary"
                  aria-label="Eazyticks Organizer Site"
                >
                  Create Event
                </a>
              </li>
              {user ? (
                <li className="login-btn text-lg font-medium">
                  <ProfileIcon />
                </li>
              ) : (
                <li className="login-btn text-lg font-medium">
                  <Link href={"/account/signin"} className={`hover:text-primary ${pathname == '/signin' ? 'text-primary' : ''}`}>Sign In</Link>
                </li>
              )}
            </ul>
            <div className="flex items-center justify-end gap-3 lg:hidden">
              <div onClick={() => toggleSearchDrawer(!searchDrawer)}>
                <CiSearch className="side-bar-button__header icon icon-search" />
              </div>
              <div onClick={handleOpenSidebar}>
                <RiMenu3Line className="icon icon-menu" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Json />
    </header>
  );
}

export default HeaderSecondary;
