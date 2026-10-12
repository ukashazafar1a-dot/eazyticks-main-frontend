import React from "react";
import FilteredItems from "./FilteredItems";

type FunctionProps = {
  items: any;
};

const TrendingEvents = ({ items }: FunctionProps) => {
  if(!items || items?.length === 0) return;
  return (
    <div className="container py-16 sm:px-0 px-1 event_card-container">
      <h2 className="mb-md-20 mb-10 text-left ps-md-14 ps-6">Trending Now</h2>
      <FilteredItems items={items} />
    </div>
  );
};

export default TrendingEvents;
