"use client";
import translation from "@/lib/translate";
import { Event } from "@/lib/types";
import { getValueOrDefault } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type props = {
  startDate: string;
  event: Event;
};

const CountDown = ({ startDate, event }: props) => {
  const [showCountDown, setShowCountDown] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(startDate) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const checkDatePassed = () => {
    const today = new Date();
    const start = new Date(startDate);
    if (start < today) {
      setShowCountDown(false);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkDatePassed()) clearInterval(interval);
      getTime();
    }, 1000);
    if (checkDatePassed()) clearInterval(interval);
    return () => clearInterval(interval);
  }, []);

  if (!showCountDown) {
    if (event?.status) {
      return (
        <div className="text-primary font-medium text-lg">
          {getValueOrDefault(
            event?.customSettings?.eventDetail?.eventEndText,
            translation?.event?.eventEndText
          )}
        </div>
      );
    } else {
      return (
        <span className="text-primary font-medium text-lg">
          {getValueOrDefault(
            event?.customSettings?.eventDetail?.eventStartText,
            translation?.event?.eventStartText
          )}
        </span>
      );
    }
  }
  const showCount = event?.customSettings?.eventDetail?.showCountDown || true;
  if (!showCount) {
    return null;
  }
  return (
    <>
      <div className="flex align-items-center  justify-start gap-1">
        <div className="bg-white text-black transition-shadow duration-300 rounded border border-gray-300 overflow-hidden flex items-center justify-center  flex-col min-w-min ">
          <span className="md:text-3xl text-3xl md:font-bold font-semibold py-3 md:px-6 px-3 sm:min-w-[80px] min-w-[60px] w-full text-center">
            {days}
          </span>
          <hr className="w-full " />
          <span className="py-2 px-1">Days</span>
        </div>
        <div className="bg-white text-black transition-shadow duration-300 rounded border border-gray-300 overflow-hidden flex items-center justify-center flex-col min-w-min">
          <span className="md:text-3xl text-3xl md:font-bold font-semibold py-3 md:px-6 px-3 sm:min-w-[80px] min-w-[60px] w-full text-center">
            {hours}
          </span>
          <hr className="w-full " />
          <span className="py-2 px-1">Hours</span>
        </div>
        <div className="bg-white text-black transition-shadow duration-300 rounded border border-gray-300 overflow-hidden flex items-center justify-center flex-col min-w-min">
          <span className="md:text-3xl text-3xl md:font-bold font-semibold py-3 md:px-6 px-3 sm:min-w-[80px] min-w-[60px] w-full text-center">
            {minutes}
          </span>
          <hr className="w-full " />
          <span className="py-2 px-1">Mins</span>
        </div>
        <div className="bg-white text-black transition-shadow duration-300 rounded border border-gray-300 overflow-hidden flex items-center justify-center flex-col min-w-min">
          <span className="md:text-3xl text-3xl md:font-bold font-semibold py-3 md:px-6 px-3 sm:min-w-[80px] min-w-[60px] w-full text-center">
            {seconds}
          </span>
          <hr className="w-full " />
          <span className="py-2 px-1">Sec</span>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default CountDown;
