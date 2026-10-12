import React from "react";

const NoSeatingPlan = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4]">
      <div className="block py-12">
        <div className="p-4 text-center">
          <span className="p-3 text-primary font-medium">
            No Seating Plan Found!
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoSeatingPlan;
