"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getDaysRange, sliderUp } from "@/helpers/generals";
import Json from "./jsonld/Json";
import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import HeaderSidebar from "./HeaderSidebar";
import ProfileIcon from "./ProfileIcon";
import Image from "next/image";
import SearchContainer from "./SearchContainer";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

function HeaderPrimery() {
  const { user, logout, isAdmin } = useApp();
  const { searchDrawer, toggleSearchDrawer } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const handleToggle = () => {
    setOpen(!open);
  };

  const renderBrowseLink = () => {
    const { firstDay, lastDay } = getDaysRange(14);
    return (
      <Link
        href={"/browse-events?startDate=" + firstDay + "&endDate=" + lastDay}
        className="hover:text-primary"
      >
        Browse Events
      </Link>
    );
  };

  return (
    <>
      <header className="header primary--header ">
        <SearchContainer />
        <div className="absolute top-0 w-full z-30  bg-primaryHeaderBgclr text-primaryHeaderTextclr">
          <div className="container scroll-px-36 flex items-center justify-between py-3 px-3">
            <div className="header-logo">
              <Link href="/" className="header-logo-wrapper">
                <h1 className="visually-hidden">Eazyticks</h1>
                <div className="relative">
                  <Image
                    src="/logo.svg"
                    className="w-28 md:w-40"
                    width={180}
                    height={60}
                    priority
                    alt="Eazyticks logo"
                  />
                </div>
              </Link>
            </div>
            <div className="flex items-center  ">
              <div className="items-center justify-between  lg:flex hidden">
                <div className="text-xl mr-4 font-medium text-white">
                  {renderBrowseLink()}
                </div>
                <div className="text-xl mr-4 font-medium text-white">
                  <Link href="/shop/organizers" className="hover:text-primary">
                    Shop
                  </Link>
                </div>
                <div className="text-xl mr-4 font-medium text-white">
                  <Link
                    href="/pricing"
                    className={`hover:text-primary ${
                      pathname == "/pricing" ? "text-primary" : ""
                    }`}
                  >
                    Pricing
                  </Link>
                </div>
                <div className="text-xl mr-4 font-medium text-white">
                  <Link href="/features" className="hover:text-primary">
                    Features
                  </Link>
                </div>
                <div className="text-xl mr-4 font-medium text-white">
                  <Link href="/testimonials" className="hover:text-primary">
                    Testimonials
                  </Link>
                </div>
                <div className="text-xl mr-4 font-medium text-white">
                  <Link href="/contact-us" className="hover:text-primary">
                    Contact Us
                  </Link>
                </div>
                <div className=" lg:flex  hidden items-center text-white">
                  <div className="text-xl login-btn font-medium text-white md:text-base lg:text-xl me-4">
                    <a
                      href={Site?.organizer?.url}
                      target={isAdmin ? "_self" : "_blank"}
                      aria-label="Eazyticks Organizer Site"
                      className="hover:text-primary"
                    >
                      Create Event
                    </a>
                  </div>
                  {user ? (
                    <div className="text-xl login-btn font-medium text-white  md:text-base lg:text-xl">
                      <ProfileIcon />
                    </div>
                  ) : (
                    <div className="text-xl login-btn font-medium text-white md:text-base lg:text-xl">
                      <Link
                        href={"/account/signin"}
                        className="hover:text-primary"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:hidden flex items-center">
                <div
                  onClick={() => toggleSearchDrawer(!searchDrawer)}
                  className="font-medium text-white md:text-base lg:text-xl me-1"
                >
                  <CiSearch className="w-7 h-7 text-white fill-white " />
                </div>
                <div className="font-medium text-white md:ml-4  md:text-base lg:text-xl">
                  <div className="">
                    <HiOutlineBars3
                      size={30}
                      className="side-bar-button__header text-xl"
                      onClick={handleToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Json />
      </header>
      <div
        id="slide"
        data-open={open}
        className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-200 cursor-pointer duration-300 ${
          open
            ? "translate-x-0 transition-all ease-linear"
            : "translate-x-[100%]"
        }`}
      >
        <HeaderSidebar open={open} onClose={handleToggle} />
      </div>
    </>
  );
}

export default HeaderPrimery;
