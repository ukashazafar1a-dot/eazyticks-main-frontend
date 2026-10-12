"use client";
import React, { useState } from "react";
type props = {
  message: string | null | undefined;
};
const TicketDescription = ({ message }: props) => {
  const [showMore, setShowMore] = useState(false);
  if (!message) return <></>;
  return (
    <>
      <div
        className={showMore ? "" : "dist-text-collapsed"}
        dangerouslySetInnerHTML={{ __html: message }}
      />
      {message?.length > 100 && (
        <span
          className="text-primary cursor-pointer underline"
          onClick={(e) => {
            e.preventDefault();
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </span>
      )}
    </>
  );
};

export default TicketDescription;
