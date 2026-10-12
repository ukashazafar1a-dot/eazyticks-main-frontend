"use client";
import React from "react";
import Link from "next/link";
import useApp from "@/context/useApp";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { getDaysRange } from "@/helpers/generals";
import { Site } from "@/helpers/Site";
import { FaTwitter } from "react-icons/fa";
import CategoriesLinks from "./CategoriesLinks";

type Category = {
  name?: string;
};
type props = {
  open: boolean;
  onClose: any;
};
const HeaderSidebar = ({ open, onClose }: props) => {
  const { user, isAdmin, logout, userProfile } = useApp();

  const renderBrowseLink = () => {
    const { firstDay, lastDay } = getDaysRange(14);
    return (
      <Link
        href={"/browse-events?startDate=" + firstDay + "&endDate=" + lastDay}
        className="sidebar-link nav--link"
      >
        Browse Events
      </Link>
    );
  };

  return (
    <>
      {open && (
        <style jsx global>{`
          body {
            overflow: hidden !important;
            height: 100vh;
            height: 100dvh;
          }
        `}</style>
      )}
      <div id="sidebarMenu">
        <div className="overlay flex items-start ">
          <button
            type="button"
            className=" flex items-start h-screen bg-primary text-white px-2 p-1"
            onClick={onClose}
            aria-label="Close Drawer Button"
          >
            <IoIosClose className="w-10 h-10 fill-white" />
          </button>
          <nav
            className="flex items-start justify-between h-screen flex-col w-full bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <ul className="flex flex-col gap-3 font-medium text-base w-full overflow-y-auto p-5">
              <li className="nav-list-item" onClick={onClose}>
                <Link href="/" className="sidebar-link nav--link block">
                  Home
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                {renderBrowseLink()}
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link href="/shop/organizers" className="sidebar-link nav--link block">
                  Shop
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <a
                  href={Site?.organizer?.url}
                  target={isAdmin ? "_self" : "_blank"}
                  aria-label="Eazyticks Organizer Site"
                  className="sidebar-link nav--link block"
                >
                  Create Event
                </a>
              </li>
              {open && <CategoriesLinks onClose={onClose} />}
              <li className="nav-list-item" onClick={onClose}>
                <Link href="/pricing" className="sidebar-link nav--link block">
                  Pricing
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link href="/features" className="sidebar-link nav--link block">
                  Features
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link
                  href="/testimonials"
                  className="sidebar-link nav--link block"
                >
                  Testimonials
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link
                  href="/sell-tickets-online"
                  className="sidebar-link nav--link block"
                >
                  Sell Tickets Online
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link
                  href="/ticket-finder"
                  className="sidebar-link nav--link block"
                >
                  Find Your Ticket
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link href="/about-us" className="sidebar-link nav--link block">
                  About Us
                </Link>
              </li>
              <li className="nav-list-item" onClick={onClose}>
                <Link
                  href="/contact-us"
                  className="sidebar-link nav--link block"
                >
                  Contact Us
                </Link>
              </li>
              {!user && (
                <li className="nav-list-item" onClick={onClose}>
                  <Link
                    href="/account/signin"
                    className="sidebar-link nav--link block"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>

            {user && (
              <>
                <hr className="w-full border-gray-300 my-4" />
                <div className="collp">
                  <Link
                    href="/account/profile"
                    className="block px-3 py-2 profile-btn"
                    onClick={onClose}
                  >
                    <div className="flex items-center justify-start flex-wrap gap-2">
                      <img
                        src={
                          userProfile?.image
                            ? userProfile?.image.split(";").pop()
                            : "https://res.cloudinary.com/eazy-ticks/image/upload/w_40,h_40/v1715679506/client-assets/27470334_7309681_sqhpiw.jpg"
                        }
                        alt="User Profile"
                        loading="lazy"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <span className="pt text-sm">
                      <span>
                        {userProfile?.firstName} {userProfile?.lastName}
                      </span>
                      <span>{userProfile?.email}</span>
                    </span>
                  </Link>
                  <ul className="flex flex-col gap-3 font-medium text-base w-full overflow-y-auto px-3 py-2">
                    <li className="nav-list-item" onClick={onClose}>
                      <Link
                        href="/account/profile"
                        className="sidebar-link nav--link block"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-list-item" onClick={onClose}>
                      <Link
                        href="/account/profile/orders"
                        className="sidebar-link nav--link block"
                      >
                        My Tickets
                      </Link>
                    </li>
                    <li className="nav-list-item" onClick={onClose}>
                      <Link
                        href="/"
                        onClick={() => logout()}
                        className="sidebar-link nav--link block"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-3 w-full p-2 ">
              <Link
                className="social-link"
                target="_blank"
                title="Follow on Facebook"
                href={Site?.socialLinks?.facebook}
              >
                <FaFacebook className="icon icon-facebook fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                title="Follow on Twitter"
                href={Site?.socialLinks?.twitter}
              >
                <FaTwitter className="icon icon-twitter fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                title="Follow on instagram"
                href={Site?.socialLinks?.instagram}
              >
                <FaInstagram className="icon icon-instagram fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                title="Subscribe on Youtube"
                href={Site?.socialLinks?.youtube}
              >
                <FaYoutube className="icon icon-youtube fill-primary" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderSidebar;
