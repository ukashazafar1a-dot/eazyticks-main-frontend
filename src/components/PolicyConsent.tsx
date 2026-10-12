"use client";
import React, { useState } from "react";

const PolicyConsent = () => {
  const [open, setOpen] = useState(true);
  const content = `We value your privacy and are committed to keeping your personal
  information safe and secure. Rest assured that any information you provide during the checkout
  process will be treated with utmost confidentiality and used
  solely for the purpose of organizing the event you are attending.
  We have implemented robust security measures to protect your data
  from unauthorized access, loss, or misuse. Your trust is important
  to us, and we strive to maintain the highest standards of privacy
  and data protection. If you have any concerns or questions
  regarding the handling of your personal information, please
  don't hesitate to contact our customer support team.`;
  return (
    <div className="mb-6">
      <h3 className="my-2 text-lg md:text-xl">Please provide the necessary information.</h3>
      <div className="rte policy">
        <span className="font-semibold text-primary">Note: </span>
        <span className="text-sm md:text-base">{open ? content.slice(0, 292) : content}</span>
        <div
          className="inline underline font-semibold cursor-pointer text-primary ms-3"
          onClick={() => setOpen(!open)}
        >
          {open ? "Read More" : "Read Less"}
        </div>
      </div>
    </div>
  );
};

export default PolicyConsent;
