"use client";
import React, { useEffect, useState } from "react";
import { CgScrollV } from "react-icons/cg";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Function to check if the calendar is in the viewport
  const checkVisibility = () => {
    const calenderWrapper = document.querySelector(".calender-wrapper");
    if (calenderWrapper) {
      const rect = calenderWrapper.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      setIsVisible(inView);
    }
  };

  // Function to handle click and scroll right
  const handleClick = () => {
    const calenderWrapper = document.querySelector(".calender-wrapper");
    if (calenderWrapper) {
      calenderWrapper.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const calenderWrapper = document.querySelector(".calender-wrapper");

    if (calenderWrapper) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = calenderWrapper;
        if (scrollLeft + clientWidth >= scrollWidth) {
          setCanScrollRight(false);
        } else {
          setCanScrollRight(true);
        }
      };

      window.addEventListener("scroll", checkVisibility);
      calenderWrapper.addEventListener("scroll", handleScroll);
      checkVisibility();

      return () => {
        window.removeEventListener("scroll", checkVisibility);
        calenderWrapper.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  if (!isVisible || !canScrollRight) return <></>;
  return (
    <div
      className="flex items-center justify-end fixed right-3 top-[20%] z-100 shrink-to-right md:hidden"
      onClick={handleClick}
    >
      <CgScrollV className="rotate-90 fill-primary icon icon-scroll !w-8 !h-8 stroke-primary text-primary" />
    </div>
  );
};

export default ScrollIndicator;
