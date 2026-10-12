import EventCard from "@/components/EventCard";
import React from "react";

interface FunctionProps {
  category: any;
}

const CategroyEvents = ({ category }: FunctionProps) => {
  if (category?.events?.length == 0) return;
  return (
    <>
      <div className="container py-4 px-3">
        <h3 className="py-5">{category?.name}</h3>
        <div className="events-wrapper">
          {category?.events?.map((event: any) => {
            return <EventCard key={event?.slug} event={event} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CategroyEvents;
