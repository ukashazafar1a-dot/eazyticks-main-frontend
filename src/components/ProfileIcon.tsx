"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import useApp from "@/context/useApp";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineRoomPreferences } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProfileIcon = () => {
  const { user, logout, isAdmin, userProfile } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Popover open={isMenuOpen} onOpenChange={(value) => setIsMenuOpen(value)}>
      <div className="flex items-center">
        <PopoverTrigger
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-2 focus:outline-none"
        >
          <img
            className="w-8 h-8 rounded-full"
            src={
              userProfile?.image
                ? userProfile?.image.split(";").pop()
                : "https://res.cloudinary.com/eazy-ticks/image/upload/w_40,h_40/v1715679506/client-assets/27470334_7309681_sqhpiw.jpg"
            }
            alt="User Avatar"
          />
        </PopoverTrigger>
      </div>

      <PopoverContent className="p-3 max-w-56 me-1">
        {userProfile && (
          <>
          <Link
            href="/account/profile"
            className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1 mb-1"
          >
            <img
              className="w-7 h-7 rounded-full"
              src={
                userProfile?.image
                  ? userProfile?.image.split(";").pop()
                  : "https://res.cloudinary.com/eazy-ticks/image/upload/w_40,h_40/v1715679506/client-assets/27470334_7309681_sqhpiw.jpg"
              }
              alt="User Avatar"
            />
            <span className="text-xs font-normal">
              <span>
                {userProfile?.firstName} {userProfile?.lastName}
              </span>
            </span>
          </Link>
          <hr className="mb-2"/>
          </>
        )}
        <Link
          className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1 "
          href="/account/profile"
        >
          <AiOutlineUserAdd className="w-5 h-5 group-hover:fill-primary" />
          <span className="group-hover:bg-red text-base font-normal">
            My Account
          </span>
        </Link>
        <Link
          className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1"
          href="/account/profile/orders"
        >
          <IoTicketSharp className="w-5 h-5 group-hover:fill-primary" />
          <span className="text-base font-normal">My Tickets</span>
        </Link>
        <Link
          className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1"
          href="/account/profile/following"
        >
          <SlUserFollow className="w-5 h-5 group-hover:fill-primary" />
          <span className="text-base font-normal">Following</span>
        </Link>
        <Link
          className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1"
          href="/account/profile/saved-events"
        >
          <CiSaveDown2 className="w-5 h-5 group-hover:fill-primary" />
          <span className="text-base font-normal">Saved Items</span>
        </Link>
        <Link
          className="flex items-center space-x-2  text-black text-base group hover:bg-[#f4f4f4] p-1"
          href="/account/profile/preference"
        >
          <MdOutlineRoomPreferences className="w-5 h-5 group-hover:fill-primary" />
          <span className="text-base font-normal">Preference</span>
        </Link>
        <Link
          className="flex items-center space-x-2 group hover:bg-[#f4f4f4] p-1"
          href=""
          onClick={() => {
            logout();
            setIsMenuOpen(false);
          }}
        >
          <FiLogOut className="w-5 h-5 text-black  group-hover:stroke-primary" />
          <span className="text-black text-base font-normal">Log Out</span>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileIcon;
