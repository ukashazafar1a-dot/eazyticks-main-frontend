"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Event } from "@/lib/types";
import translation from "@/lib/translate";
import { getValueOrDefault } from "@/lib/utils";
type props = {
  event: Event;
};

const customLinks = [
  {
    "slug":'ideveloped-monthly-membership',
    "url":"https://buy.stripe.com/28E7sL0zL8EEf4g7wcbbG01"
  },
  {
    "slug":"coach-cam-workout-membership",
    "url":'https://buy.stripe.com/28E7sLdmxg769JWaIobbG02'
  },
  {
    "slug":'coach-cam-workout-membership-1',
    "url":"https://buy.stripe.com/4gMbJ11DP2ggbS44k0bbG03"
  }
]

const RenderTicket = ({ event }: props) => {
  const searchParams = useSearchParams();
  const secret = searchParams?.get("sec");

  if (event?.status) {
    return (
      <div className="text-center text-xl text-primary font-medium py-8">
        {getValueOrDefault(
          event?.customSettings?.eventDetail?.eventEndText,
          translation?.event?.eventEndText
        )}
      </div>
    );
  } else {
    let external = false;
    let route = `/events/${event?.slug}/checkout${secret ? "?sec=" + secret : ""}`;
    if (event?.slug) {
      const customLink = customLinks?.find((link) => link?.slug === event?.slug);
      if (customLink) {
        external = true;
        route = customLink?.url;
      }
    }
    //console.log(event)
    return (
      <Link
        href={route}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : ""}
        className="btn btn--primary btn--full"
      >
        {getValueOrDefault(
          event?.customSettings?.eventDetail?.buttonText,
          translation?.event?.eventCallToAction
        )}
      </Link>
    );
  }
};

export default RenderTicket;
