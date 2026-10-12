import React from "react";
import { FiPhone } from "react-icons/fi";

const PhoneSvg = () => {
  return (
    <div className="flex items-center justify-start gap-2 min-h-[37.5px] py-0.5 px-2 bg-gray-100 rounded-s-sm border border-r-0 border-gray-200">
      <FiPhone className="w-5 h-5 stroke-primary" />
    </div>
  );
};

export default PhoneSvg;
