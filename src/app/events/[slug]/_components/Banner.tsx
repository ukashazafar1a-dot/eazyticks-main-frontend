"use client";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { Event } from "@/lib/types";
import { useParams } from "next/navigation";

type props = {
  event: Event;
};

const Banner = ({ event }: props) => {
  const params = useParams();
  const { slug } = params;
  return (
    <div className="bg-secondary text-white py-12 px-3">
      <div className="text-center">
        <Link href={`${slug ? `/events/${slug}` : "/"}`}>
          <h1 className="h3 mb-5 text-white">{event?.name}</h1>
        </Link>
        <p className="sm:text-lg text-base mb-2">
          <span className="text-primary">
            <Link href="/">Home</Link>
          </span>
          <Link href={`${slug ? `/events/${slug}` : "/"}`}>/event-detail/</Link>
          <span className="!opacity-50 ">{event?.name}</span>
        </p>
        <div className="flex items-center justify-center flex-wrap gap-2 sm:text-lg text-base">
          <span>
            {moment(event?.startDate).format("ddd, Do MMMM YYYY, h:mm a")}
          </span>
          <span className="mins">-</span>
          <span>
            {moment(event?.endDate).format("ddd, Do MMMM YYYY, h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
