"use client";
import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";
import FilteredItems from "./FilteredItems";
import { getDaysRange, scrollToTop } from "@/helpers/generals";

type FunctionProps = {
  items: any;
};

const UpcomingEvents = ({ items }: FunctionProps) => {
  const router = useRouter();
  function handleClick(e: any) {
    e.preventDefault();
    const { firstDay, lastDay } = getDaysRange(14);
    scrollToTop();
    router.push(
      "/browse-events?startDate=" + firstDay + "&endDate=" + lastDay
    );
  }
  if(!items || items?.length === 0) return;
  return (
    <div className="container py-12 sm:px-1 px-0 mt-4">
      <h2 className="mb-md-20 mb-10 text-left ps-md-14 ps-6">Upcoming Events</h2>
      <FilteredItems items={items} />
      <div className="flex justify-center align-items-center mt-4 ">
        <button
          className="btn btn--secondary !text-lg !px-10"
          onClick={handleClick}
        >
          See More <IoMdArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
