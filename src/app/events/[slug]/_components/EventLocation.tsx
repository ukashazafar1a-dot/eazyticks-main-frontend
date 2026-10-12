"use client";
import { getAddress } from "@/helpers/generals";
import { Event } from "@/lib/types";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  event: Event;
};

const EventLocation = ({ event }: Props) => {
  const [map, setmap] = useState(true);
  const address = `&q=${event?.address},${event?.city},${event?.state},${event?.country}`;
  const showLocation = event?.customSettings
    ? event?.customSettings?.eventDetail?.showLocation
    : true;
  if (!showLocation) return null;
  return (
    <div>
      <div className="lc-wrapper flex items-center justify-start gap-3 mb-3">
        <span className="location--wrapper">
          <FaMapMarkerAlt className="icon icon-location text-primary" />
        </span>
        <h5 className="text-xl">Location</h5>
      </div>
      <div className="mb-2">{getAddress(event)}</div>
      <div
        className="flex items-center justify-start gap-3 mb-3 cursor-pointer"
        onClick={(e) => setmap(!map)}
      >
        <span className="ar-heading font-bold text-base">Hide Map</span>
        <span className="">
          {map ? (
            <IoChevronDown className="icon icon-arrow text-primary" />
          ) : (
            <IoChevronUpOutline className="icon icon-arrow text-primary" />
          )}
        </span>
      </div>
      <div className="map_wrap" style={{ display: map ? "block" : "none" }}>
        <div className="relative">
          <div className="map-wrapper w-full md:min-h-[350px] min-h-[250px]">
            <iframe
              className="w-full md:min-h-[350px] min-h-[250px]"
              title="Event Location"
              style={{ width: "100%", height: "100%" }}
              src={
                "https://www.google.com/maps/embed/v1/place?key=" +
                process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY +
                address
              }
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLocation;
