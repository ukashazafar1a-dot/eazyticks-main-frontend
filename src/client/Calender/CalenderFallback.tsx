"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineSmsFailed } from "react-icons/md";

const CalenderFallback = ({ calendar }: { calendar: any }) => {
  const router = useRouter();
  const handleReload = () => {
    router.refresh();
    if (window) {
      window.location.reload();
    }
  };
  return (
    <div className="p-3 py-8">
      <div className="border-2 border-dotted rounded max-w-screen-md mx-auto p-3 py-6">
        <div className="flex items-center justify-center flex-col gap-3">
          <MdOutlineSmsFailed className="fill-primary !w-8 !h-8" />
          <div className="text-center">
            <p className="text-lg text-gray-700 m-0">
              Enable to load calender. Something went wrong!
            </p>
            <p className="text-base text-gray-500 m-0">
              <button
                className="hover:underline"
                onClick={() => handleReload()}
              >
                Reload page
              </button>
              <span> or Please try again later.</span>
            </p>
          </div>
        </div>
      </div>
      <script
        type="application/json"
        id="event-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calendar),
        }}
      />
    </div>
  );
};

export default CalenderFallback;
