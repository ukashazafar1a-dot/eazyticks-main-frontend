import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Banner = ({ title, handleChange }: any) => {
  return (
    <div className="py-10 px-3 bg-secondary text-white">
      <div className="text-center capitalize">
        <h2 className="mb-5 text-white">{title} Events</h2>
      </div>
      <div className="search--form max-w-[600px] mx-auto bg-white text-black rounded-full flex items-center justify-start px-3 py-2">
      <label htmlFor="search" className="sr-only">Search</label>
        <IoSearchOutline className="w-6 h-6"/>
        <input
          type="text"
          name="search"
          id="search"
          className="w-full border-0 py-0"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search by team, event, or venue"
        />
      </div>
    </div>
  );
};

export default Banner;
