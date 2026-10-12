"use client";
import EventCardSearchPage from "@/components/EventCardSearchPage";
import React from "react";

interface Provide {
  events: any;
}

const SearchResults = ({ events }: Provide) => {
  return (
    <div className="container">
      {events?.map((event: any, i: any) => {
        return <EventCardSearchPage key={i} event={event} />;
      })}
    </div>
  );
};

export default SearchResults;
