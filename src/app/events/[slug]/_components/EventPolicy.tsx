"use client";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import { Event } from "@/lib/types";
type props = {
  policy: string | null;
  event: Event;
};
const EventPolicy = ({ policy,event }: props) => {
  const showPolicy = event?.customSettings ?  event?.customSettings?.eventDetail?.showPolicy : true;
  if (!showPolicy) return null;
  return (
    <div className="basis-full lg:basis-[70%] w-full">
      <div className="refund-wrapper mb-3">
        {policy ? (
          <>
            <h3 className="mb-3 text-3xl">Event Policy</h3>
            <div className="prose max-w-full">{parse(policy)}</div>
          </>
        ) : (
          <>
            <h3 className="mb-3">Refund Policy</h3>
            <div className="content rte rte-settings">
              <p>
                <b>
                  All sales are final except for canceled events. No refunds for
                  completed events.
                </b>
                <br />
                <Link href="/policies/refund-policy" className="red">
                  Read More
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventPolicy;
