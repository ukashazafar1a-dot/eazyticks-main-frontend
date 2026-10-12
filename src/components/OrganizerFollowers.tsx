import React from "react";
import { FaUsers } from "react-icons/fa";

type props = {
  count?: number;
};

const OrganizerFollowers = ({ count = 0 }: props) => {
  if (count == 0)
    return (
      <div className="min-h-[20px]">
        <span></span>
      </div>
    );
  return (
    <div className="flex items-center gap-2">
      <span>
        <FaUsers className="w-5 h-5 fill-primary" />
      </span>
      <span className="fw-normal text-sm">
        {count == 1 ? `${count} follower` : `${count} followers`}
      </span>
    </div>
  );
};

export default OrganizerFollowers;
