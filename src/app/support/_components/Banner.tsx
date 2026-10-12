import React from "react";
import { CiSearch } from "react-icons/ci";

const Banner = () => {
  return (
    <div className="bg-secondary text-white py-12 px-3 text-center">
      <h1 className="text-5xl mb-3">EazyTicks Help Center</h1>
      <p className="mb-3 text-lg">Get answers and resources</p>
      <div>
        <div className="flex items-center justify-start bg-white text-black  max-w-[600px] mx-auto ps-3 pe-1 py-1 rounded">
          <CiSearch className="w-8 h-8"/>
          <input type="text" placeholder="Search Help Articles" className="border-0 py-0 w-full" />
          <button className="btn btn--primary">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
