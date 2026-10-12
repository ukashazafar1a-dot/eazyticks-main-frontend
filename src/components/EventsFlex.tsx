import React from "react";
import EventCard from "./EventCard";
import NoEvent from "./NoEvent";

interface FunctionProps {
  events?: any;
}

const EventsFlex = (props: FunctionProps) => {
  return (
    <div className={`events--flex-main ${!props.events ? "nothing" : "have"}`}>
      {props.events ? (
        props.events.map((event: any) => {
          return <EventCard key={event.slug} event={event} />;
        })
      ) : (
        <NoEvent/>
      )}
    </div>
  );
};

export default EventsFlex;
