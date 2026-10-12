import {  EventCard } from "@/lib/types";
import Image from "next/image";
import React from "react";

type props = {
  event: EventCard;
};
const EventCardImage = ({ event }: props) => {
  return (
    <div className="relative h-[230px] z-0 overflow-hidden">
      <div className="card--overlay">
        {event?.image ? (
          <Image
            src={event?.image}
            width={100}
            height={100}
            alt={event?.name}
            className=""
          />
        ) : (
          <Image
            src={
              "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
            }
            fill
            className="absolute inset-0 m-auto object-contain z-1"
            alt={event?.name}
          />
        )}
      </div>
      {event?.image ? (
        <Image
          src={event?.image}
          fill
          className="absolute inset-0 m-auto object-contain z-1"
          alt={event?.name}
        />
      ) : (
        <Image
          src={
            "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
          }
          fill
          className="absolute inset-0 m-auto object-contain z-1"
          alt={event?.name}
        />
      )}
    </div>
  );
};

export default EventCardImage;
