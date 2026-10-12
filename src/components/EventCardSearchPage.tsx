import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import LikeMe from "./LikeMe";
import { getAddress, getImgSrcs } from "@/helpers/generals";
import EventCardImage from "./EventCardImage";
import { SearchEventCard } from "@/lib/types";

type props = {
  event: SearchEventCard;
  handleChange?: any;
};

const EventCardSearchPage = ({ event, handleChange }: props) => {
  const [like, setlike] = useState(false);

  const renderPrice = function (price: any) {
    if (price === 0) {
      return <p className="price">Free</p>;
    } else if (!price || price == "N/a") {
      return (
        <div className="min-h-[16px]">
          <span></span>
        </div>
      );
    } else {
      return <p className="price">{`Starts at $${price}`}</p>;
    }
  };

  const handleClick = () => {
    if (handleChange) {
      handleChange();
    }
  };

  return (
    <div className="mb-2">
      <div className="sc-main flex justify-start border rounded flex-col md:flex-row w-full">
        <div className="basis-full md:basis-1/4 h-full">
          <Link
            href={"/events/" + event?.slug}
            className="block h-full"
            onClick={() => handleClick()}
          >
            <EventCardImage event={event as any} />
          </Link>
        </div>
        <div className="p-3 relative w-full h-full">
          <Link
            href={"/events/" + event?.slug}
            className="mb-2"
            onClick={() => handleClick()}
          >
            <h3 className="two-lines mb-3">{event?.name}</h3>
            <div>
              <p className="font-medium text-primary">
                {renderPrice(event?.startPrice)}
              </p>
              <p>
                <span className="font-medium">Start on </span>
                <span>
                  {moment(event?.startDate).format("MMMM Do YYYY, h:mm a")}
                </span>
              </p>
              <p className="text-gray-700">{getAddress(event)}</p>
            </div>
          </Link>
          <LikeMe
            liked={event?.wishlistStatus}
            eventSlug={event?.slug}
            classes={"top-4"}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCardSearchPage;
