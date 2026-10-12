import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EventSkelton = () => {
  return (
    <div className="pb-12 max-w-[1320px] mx-auto px-3 overflow-hidden">
      <Skeleton className="h-[50vh] w-full rounded-xl  my-4" />
      <div className="container px-0">
        <div className="flex items-center justify-between w-full flex-auto gap-4 flex-col md:flex-row">
          <div className="max-w-[50%] me-auto w-full">
            <Skeleton className="h-8 w-full mb-3" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="">
            <Skeleton className="h-20 w-[300px] mb-3" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl my-3" />
        <div className="max-w-[80%] me-auto w-full">
          <Skeleton className="h-8 w-full mb-3" />
        </div>
        <Skeleton className="h-36 w-full rounded-xl my-3" />
      </div>
    </div>
  );
};

export default EventSkelton;
