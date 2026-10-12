import React from "react";

function EmptyTickets() {
  return (
    <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4]">
      <div className="bg-secondary text-white flex justify-between px-5 py-3 rounded-t-sm font-medium ">
        <span className="text-2xl sm-max:text-base">Ticker Types</span>
        <span className="text-lg sm-max:text-base">No. of ticket(s)</span>
      </div>
      <div className="block">
        <div className="border-b p-4 text-center">
          <span className="p-3 text-primary font-medium">Tickets are not available for the Event.</span>
        </div>
      </div>
    </div>
  );
}

export default EmptyTickets;
