
import EventCard from "@/components/EventCard";
import { Event } from "@/lib/types";
import React from "react";

type props = {
  events: Event[];
};

const RelatedEvents = ({ events }: props) => {
  if (!events || events?.length == 0) return;
  return (
    <div className="container px-3 py-6">
      <h3 className="section__title mb-6 text-center">You May Also Like</h3>
      <div className="events-wrapper">
        {events?.map((event: any) => {
          return <EventCard key={event.slug} event={event} />;
        })}
      </div>
    </div>
  );
};

export default RelatedEvents;
