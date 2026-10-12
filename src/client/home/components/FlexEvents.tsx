import React from "react";
import { Event } from "@/lib/types";
import EventCard from "@/components/EventCard";

type props = {
  events: Event[];
};

const FlexEvents = ({ events }: props) => {
  return (
    <div className="events--flex-main py-6 px-1 md:px-3">
      {events ? (
        events.map((event: any, index: any) => {
          if (index === 5) {
            return;
          }
          return <EventCard key={index} event={event} />;
        })
      ) : (
        <div className="flex items-end justify-start">
          <div className="image-wrapper">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/w_65,h_65/v1684322441/ezt-frontend-client-assets/question_b89zgh.png"
              alt="No Event Found - Eazyticks"
              loading="lazy"
            />
          </div>
          <div className="text-xl red">No Events Found!</div>
        </div>
      )}
    </div>
  );
};

export default FlexEvents;
