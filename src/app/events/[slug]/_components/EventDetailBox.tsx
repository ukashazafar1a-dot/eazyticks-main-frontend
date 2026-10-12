"use client";
import React from "react";
import CountDown from "./CountDown";
import { formatDate } from "@/lib/formatData";
import { Event } from "@/lib/types";
import { returnSettings } from "@/lib/utils";
type props = {
  event: Event;
};
const EventDetailBox = ({ event }: props) => {
  return (
    <div className="basis-full lg:basis-[70%] w-full ">
      {returnSettings(
        event?.customSettings,
        event?.customSettings?.eventDetail?.showCategory,
        <h4 className="event-category text-base md:text-xl font-regular m-0 mb-2">
          {event?.category}
        </h4>
      )}
      <h1 className="md:text-4xl text-2xl text-balance mb-2">{event?.name}</h1>
      <div className="date-wraper">
        {returnSettings(
          event?.customSettings,
          event?.customSettings?.eventDetail?.showStartEndDate,
          <div className="dates-main mb-2">
            <div className="text-base md:text-xl">
              <strong>Starts: </strong>
              <span>{formatDate(event?.startDate)}</span>
            </div>
            <div className="text-base md:text-xl">
              <strong>Ends: </strong>
              <span>{formatDate(event?.endDate)}</span>
            </div>
          </div>
        )}

        <div className="timer">
          <CountDown startDate={event?.startDate} event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailBox;
