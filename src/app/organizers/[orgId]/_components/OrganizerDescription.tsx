"use client";
import React, { useState } from "react";

const OrganizerDescription = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState(false);
  function shorten(str: any, maxLen: any, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
  }
  return (
    <div
      className="flex items-center justify-start flex-wrap max-w-[800px] mx-auto p-3 rounded-sm"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="main-description rte rte-settings">
        <p
          className="!font-sans"
          dangerouslySetInnerHTML={{
            __html: showMore ? description : shorten(description, 245),
          }}
        />
      </div>
      {description?.length > 245 && (
        <button
          className="text-primary underline"
          onClick={(e) => {
            e.preventDefault();
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default OrganizerDescription;
