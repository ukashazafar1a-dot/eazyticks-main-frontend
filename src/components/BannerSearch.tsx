"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { LuSearch } from "react-icons/lu";

const BannerSearch = () => {
  const [date, setDate] = useState<any>(null);
  const [location, setLocation] = useState("");
  const ref:any = useRef(null);
  const [query, setQuery] = useState<any>("");
  const router = useRouter();
  function handleSubmit(e: any) {
    if (e.keyCode === 13) {
      handleSearch();
    }
  }
  function handleSearch() {
    let q: any = [];
    if (query) {
      q.push("q=" + query);
    } else if (location) {
      q.push("q=" + location);
    }
    if (date) {
      q.push("start_date=" + moment(date).format("MM/DD/YYYY"));
      q.push("last_date=" + moment(date).format("MM/DD/YYYY"));
    }
    router.push("/browse-events?" + q.join("&"));
  }
  const handleClick = () => {
    if(ref){
      ref?.current?.showPicker();
    }
  }

  return (
    <div className="flex items-center bg-white p-2 w-[1100px] max-w-full  mx-auto flex-col lg:flex-row">
      <div className="flex items-center justify-start gap-2 basis-[50%] lg:basis-[30%] px-2 md-max:border-r-0 md-max:border-b-2 md-max:py-1 border-r-2 border-primary w-full">
        <label htmlFor="city" className="sr-only">city</label>
        <input
          type="text"
          placeholder="City or State"
          onKeyDown={handleSubmit}
          id="city"
          value={location}
          className="input--field border-0 placeholder:text-xl text-xl sm-max:placeholder:text-base sm-max:text-base"
          onChange={(e) => setLocation(e.target.value)}
        />
        <IoLocationSharp className="w-8 h-8 fill-primary" />
      </div>
      <div className="date-field basis-[5] relative lg:basis-[30%] px-2 border-r-2 border-primary w-full  md-max:border-r-0 md-max:border-b-2 md-max:py-1">
        <label htmlFor="date" className="sr-only">date</label>
        <input
          type="date"
          name="date"
          id="date"
          ref={ref}
          value={date ? date : ""}
          className="input--field search--input border-0 placeholder:text-xl text-xl sm-max:placeholder:text-base sm-max:text-base pe-3"
          onChange={(e) => setDate(e.target.value)}
          onClick={() => handleClick()}
        />
        <MdDateRange className="icon icon-calender calendarIcon text-primary fill-primary cursor-pointer" onClick={() => handleClick()}/>
      </div>
      <div className="flex items-center justify-start gap-1 basis-full lg:basis-[40%] px-2 w-full md-max:pt-1 md-max:pb-2">
        <label htmlFor="query" className="sr-only">query</label>
        <input
          type="text"
          value={query}
          id="query"
          onKeyDown={handleSubmit}
          className="input--field border-0 placeholder:text-xl text-xl sm-max:placeholder:text-base sm-max:text-base"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for artists, venues, events"
        />
        <LuSearch className="icon icon-search text-primary" />
      </div>
      <div className="action-field md-max:w-full">
        <button
          className="btn btn--primary md-max:w-full text-base"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default BannerSearch;
