"use client";
import React from "react";
import EventMedia from "./EventMedia";
import { StaticEvent } from "@/helpers/StaticData";
import EventDetailBox from "./EventDetailBox";
import EventTicketsBox from "./EventTicketsBox";
import EventLocation from "./EventLocation";
import EventShareBox from "./EventShareBox";
import EventOrganizerBox from "./EventOrganizerBox";
import PasscodeModal from "./PasscodeModal";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const EventDescription = dynamic(() => import("./EventDescription"), {
  loading: () => <Skeleton className="h-24 w-full rounded-xl my-3" />,
  ssr: false,
});
const EventPolicy = dynamic(() => import("./EventPolicy"), {
  loading: () => <Skeleton className="h-24 w-full rounded-xl my-3" />,
  ssr: false,
});
const PrivateEventPage = () => {
  const event = StaticEvent;
  return (
    <div className="private-event-page white-overlay">
      <EventMedia event={event} />
      <div className="container">
        <div className="ticket-date flex items-center justify-between w-full gap-5 flex-col lg:flex-row px-0 py-8 md:pb-4 md:pt-8">
          <EventDetailBox event={event} />
          <EventTicketsBox event={event} />
        </div>
        <div className="py-10">
          {event.descriptions && (
            <EventDescription description={event?.descriptions} />
          )}
        </div>
        <EventLocation event={event} />
        <div className="py-8 flex items-start justify-between w-full flex-wrap">
          <EventPolicy policy={event?.buyerPolicy} event={event}/>
          <EventShareBox event={event} />
          <EventOrganizerBox organizer={event?.organizer} />
        </div>
      </div>
      <PasscodeModal/>
    </div>
  );
};

export default PrivateEventPage;
