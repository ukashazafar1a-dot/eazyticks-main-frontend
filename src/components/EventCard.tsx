"use client";
import Link from "next/link";
import { getAddress, scrollToTop } from "@/helpers/generals";
import LikeMe from "./LikeMe";
import EventCardImage from "./EventCardImage";
import { EventCard as EventType } from "@/lib/types";
import OrganizerFollowers from "./OrganizerFollowers";
import { formatDate } from "@/lib/formatData";
type props = {
  event: EventType;
};
function EventCard({ event }: props) {
  const renderPrice = (price: any) => {
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

  return (
    <div
      className="event-card transition-shadow duration-300 ease-in-out bg-white shadow hover:shadow-md cursor-pointer m-2 rounded-md overflow-hidden "
      data-event-handle={event?.slug}
      data-event-name={event?.name}
    >
      <Link
        href={"/events/" + event?.slug}
        onClick={() => scrollToTop()}
        className="cursor-pointer text-inherit relative block w-full"
      >
        <EventCardImage event={event} />
      </Link>
      <div className="p-4 relative">
        <div className="absolute -top-3  left-0 cursor-pointer px-4 py-1 font-medium text-xs leading-none uppercase tracking-wider bg-primary text-white z-5">
          <Link
            href={"/events/" + event?.slug}
            onClick={() => scrollToTop()}
            aria-label={event?.name}
            className=" block w-full"
          >
            <span>{event?.category ? event?.category : "Basketball"}</span>
          </Link>
        </div>
        <LikeMe liked={event?.wishlistStatus} eventSlug={event?.slug} />
        <Link
          href={"/events/" + event?.slug}
          onClick={() => scrollToTop()}
          aria-label={event?.name}
          className=" block w-full"
        >
          <h3 className="text-sm font-bold pt-2 mb-2 leading-5 two-lines min-h-[48px]">
            {event?.name}
          </h3>
          <div className="bullets-points">
            <ul className="bp-list">
              <li className="text-primary text-xs font-medium ">
                <p>{formatDate(event?.startDate)}</p>
              </li>
              <li className="my-1 text-xs font-bold">
                {renderPrice(event?.startPrice)}
              </li>
              <li className="text-xs text-black font-normal mb-1">
                <p className="text-xs text-black text-opacity-75 min-h-[40px]">
                  {getAddress(event)}
                </p>
              </li>
              <li className="text-xs text-black">
                <p>{event?.organizer}</p>
              </li>
              <li className="mt-2 flex justify-start align-items-center ">
                <OrganizerFollowers count={event?.followers} />
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
