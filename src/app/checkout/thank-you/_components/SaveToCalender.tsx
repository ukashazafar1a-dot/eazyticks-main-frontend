import CalenderButtons from "@/components/CalenderButtons";
import { Event } from "@/lib/types";
import Link from "next/link";
import React from "react";

type props = {
  event: Event | null;
};
const SaveToCalender = ({ event }: props) => {
  return (
    <div className="flex items-end justify-between flex-wrap mb-6 gap-3">
      <div className="bk-info">
        <h2 className="h3 mb-3">Save to Calendar</h2>
        <CalenderButtons event={event} />
      </div>
      <div className="bk-cta">
        <div className="flex items-center justify-start md:justify-end gap-2 md:gap-3 flex-wrap">
          <Link
            href={`/organizers/${event?.organizerId}`}
            className="btn btn--secondary"
          >
            Contact Event Organizer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaveToCalender;
