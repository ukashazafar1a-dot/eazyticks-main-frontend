"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";

type Provider = {
  query: string;
  handleChange: any;
  handleGetResults: any;
};

const Banner = ({ handleChange, handleGetResults, query }: Provider) => {
  function handleSubmit(e: any) {
    e.preventDefault();
    handleGetResults();
  }
  return (
    <div className="bg-[#2D2D2D] py-16 px-3 text-white">
      <div className="text-center max-w-[700px] mx-auto py-8">
        <h2 className="text-white mb-3">SEARCH BY EVENT</h2>
        <div className="bg-white text-black px-3 py-2 rounded-full flex items-center justify-start gap-2">
        <label htmlFor="search" className="sr-only">Search</label>
          <CiSearch />
          <input
            type="text"
            name="search"
            id="search"
            defaultValue={query}
            onChange={(e) => handleChange(e.target.value)}
            className="border-0 outline-0 py-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
