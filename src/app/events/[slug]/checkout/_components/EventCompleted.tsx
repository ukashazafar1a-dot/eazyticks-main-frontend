import Link from "next/link";
import React from "react";
import { IoCloudDoneOutline } from "react-icons/io5";

const EventCompleted = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <div className="p-4 shadow border rounded text-center py-12 max-w-screen-lg mx-auto block">
        <IoCloudDoneOutline className="fill-primary mx-auto stroke-primary !w-10 !h-10" />
        <div className="p-3 font-bold text-primary text-xl mb-0">
          Event is Completed
        </div>
        <div className="text-xl text-gray-600 mb-3">Thank You for Joining Us!</div>
        <p className="text-gray-500 mb-3">
          The event has successfully concluded, and we are incredibly grateful
          for your participation. We hope you enjoyed the experience as much as
          we did organizing it. Stay tuned for updates on future events, and we
          look forward to seeing you again soon!
        </p>
        <Link className="btn btn--primary max-w-48 mx-auto" href={'/'}>Back to Home</Link>
      </div>
    </div>
  );
};

export default EventCompleted;
