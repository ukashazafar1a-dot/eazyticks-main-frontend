"use client";
import useApp from "@/context/useApp";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ handleSLoading }: any) => {
  const { setToaster, cancelOrder, setClientSecret } = useApp();
  const [timeLeft, setTimeLeft] = useState(600);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  async function handleCancelOrder() {
    try {
      handleSLoading();
      const { data }: any = await cancelOrder();
      //console.log(data);
      if (data?.status === "Success") {
        setClientSecret(null);
        router.push("/events/" + slug);
        setToaster("success", "Order cancelled successfully!");
      } else if (data?.status === "Error") {
        setClientSecret(null);
        setToaster("error", data?.message || "Something went wrong!");
        router.push("/events/" + slug);
      }
    } catch (error) {
      console.log(error);
      router.push("/events/" + slug);
    }
  }

  if(timeLeft == 0){
    handleCancelOrder();
  }
  useEffect(() => {
    // Only set the interval if timeLeft is greater than 0
    if (timeLeft > 0) {
      // Decrement the time left every second
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Clear the interval on component unmount or when timeLeft changes
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  // Convert the time left into minutes and seconds for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="timer-wrapper rte">
      <p>
        Your tickets will be canceled in 10 minutes if not confirmed.
        <br />
        <strong>Time remaining:</strong> {minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default CountdownTimer;
