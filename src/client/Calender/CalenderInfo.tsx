import React from "react";

const CalenderInfo = () => {
  return (
    <div className="flex justify-center gap-4 md:gap-8 mb-6 flex-wrap md:flex-nowrap">
      <div className="basis-full md:basis-auto flex items-center justify-start gap-3">
        <p className="w-6 h-6 bg-amber-300 text-gray-800 p-2 rounded">
          <span></span>
        </p>
        <p className="m-0 text-sm font-semibold">Current Event</p>
        <span className="text-sm text-gray-700 m-0 !leading-none hidden">
          Yellow slots represent the event that is currently being viewed in
          detail.
        </span>
      </div>
      <div className="basis-full md:basis-auto flex items-center justify-start gap-3">
        <p className="w-6 h-6 bg-gray-200 text-gray-800 p-2 rounded">
          <span></span>
        </p>
        <p className="m-0 text-sm font-semibold">Active Events</p>
        <span className="text-sm text-gray-700 m-0 leading-3 hidden">
          Gray slots indicate events that are currently ongoing
        </span>
      </div>
      <div className="basis-full md:basis-auto  flex items-center justify-start gap-3">
        <p className="w-6 h-6 bg-primary text-white p-2 rounded">
          <span></span>
        </p>
        <p className="m-0 text-sm font-semibold">Completed Events</p>
        <span className="text-sm text-white m-0 leading-3 hidden">
          Red slots highlight events that have already been completed.
        </span>
      </div>
    </div>
  );
};

export default CalenderInfo;
