import { Event } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type props = {
  countdown: number;
  event: Event | null;
};

const RetryWidget = ({ countdown, event }: props) => {
  const router = useRouter();

  if (event?.type == "Online") return;
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm w-full mx-auto border rounded border-primary px-6 py-6">
      <AiOutlineLoading3Quarters className="animate-spin text-primary text-4xl mb-4" />
      <p className="text-lg">Still processing...</p>
      <p className="text-md">
        The page will refresh automatically after {countdown} seconds.
        {countdown == 0 && (
          <span>
            {`If it doesn't refresh automatically, `}
            <span
              className="underline text-primary font-medium cursor-pointer"
              onClick={() => window?.location.reload()}
            >
              Click here
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

export default RetryWidget;
