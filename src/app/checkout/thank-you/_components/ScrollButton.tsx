"use client";
import { downloadAllTickets } from "@/helpers/generals";
import React, { useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

function ScrollButton({ type }: any) {
  const handleClick = async (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#event-tickets"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    //console.log("Event", event.currentTarget.style);
    if (event.currentTarget) event.currentTarget.style.display = "none";
    await downloadAllTickets(".ticket");
  };

  useEffect(() => {
    const targetSection = document.querySelector("#event-tickets");
    const scrollButton = document.querySelector(
      "#floating-btn"
    )! as HTMLButtonElement;
    if (targetSection && scrollButton) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollButton.style.display = "none";
          } else {
            scrollButton.style.display = "block";
          }
        });
      });

      observer.observe(targetSection);
    }
  }, []);

  return (
    <div
      className="floating-btn-ticket w-full px-4 md:px-0 md:w-fit"
      id="floating-btn"
      onClick={handleClick}
    >
      <div className="tickets-fab flex items-center justify-center gap-2 rounded-full px-4 py-1 cursor-pointer">
        <span className="">
          {type === "Online" ? "Details" : "CLICK HERE TO GET TICKETS"}
        </span>
        <IoChevronDown />
      </div>
    </div>
  );
}

export default ScrollButton;
