"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { scrollToTop } from "@/helpers/generals";
import { IoCloseSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import useApp from "@/context/useApp";
import './style.css';


type props = {
  children: React.ReactNode;
};

const AccountPage = ({ children }: props) => {
  const { user, logout } = useApp();
  const [showmenu, setshowmenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
    scrollToTop();
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  
  return (
    <div data-path={pathname}>
      <div className="account-page-wrap relative">
        <div
          className={`left-side side p-3 ${
            showmenu ? "active-menu" : "not-active"
          }`}
        >
          <div className="mobile-btn flex items-center justify-end lg:hidden">
            <button className="btn" onClick={(e) => setshowmenu(!showmenu)}>
              <span>
                <IoCloseSharp className="icon icon-close"/>
              </span>
            </button>
          </div>
          <div className="tab--buttons flex items-center justify-center w-100 flex-col py-2">
            <Link
              href="/account/profile"
              className={
                pathname === "/account/profile"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              My Account
            </Link>
            <Link
              href="/account/profile/orders"
              className={
                pathname === "/account/profile/orders"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              My Tickets
            </Link>
            <Link
              href="/account/profile/saved-events"
              className={
                pathname === "/account/profile/saved-events"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              Saved Events
            </Link>
            <Link
              href="/account/profile/following"
              className={
                pathname === "/account/profile/following"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              Following
            </Link>
            <Link
              href="/account/profile/preference"
              className={
                pathname === "/account/profile/preference"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              Preference
            </Link>
            <Link
              href="/account/profile/change-password"
              className={
                pathname === "/account/profile/change-password"
                  ? "active nav--link"
                  : "nav--link"
              }
            >
              Update Password
            </Link>
            <button
              className="nav--link btn btn--primary btn--full"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="right-side side">
          <div className="mobile-btn flex items-center justify-start w-full lg:hidden pt-2 px-2">
            <button
              className="btn btn--full"
              onClick={(e) => setshowmenu(!showmenu)}
            >
              <span>
                <LuMenu  className="icon icon-menu"/>
              </span>
              <span>Menu</span>
            </button>
          </div>
          <div className="tab--content">
            <div className="p-3 w-100">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
