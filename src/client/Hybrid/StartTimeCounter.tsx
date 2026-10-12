import { formatDate } from "@/lib/formatData";
import React, { useEffect, useState } from "react";
type props = {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
};
const StartTimeCounter = ({ startDate, endDate }: props) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!startDate) {
      //console.log("Invalid start date: null");
      return;
    }

    const targetDate = new Date(startDate);
    if (isNaN(targetDate.getTime())) {
      console.log("Invalid start date format");
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer(); // Initial call
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [startDate]);

  if (!timeLeft) {
    if (endDate) {
      return (
        <p className="text-base text-gray-500 mb-2">
          Sale ends on {formatDate(endDate)}
        </p>
      );
    }
    return <></>;
  }
  if(!startDate) return <></>;
  return (
    // <p className="text-base text-gray-500 mb-2">
    //   Sales start in <span className="text-primary">{timeLeft.days} days, {timeLeft.hours} hours,{" "}
    //   {timeLeft.minutes} min, {timeLeft.seconds} sec.</span>
    // </p>
    <p className="text-base text-gray-500 mb-2">
      Sale start at {formatDate(startDate)}
    </p>
  );
};

export default StartTimeCounter;
