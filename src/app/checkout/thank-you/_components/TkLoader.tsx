import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TkLoader = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full container mx-auto py-12 px-4">
      <div className="flex items-start md:items-end justify-between gap-3 flex-col md:flex-row w-full mb-12">
        <div className="basis-full md:basis-1/2 w-full">
          <Skeleton className="h-12 mb-4 w-full" />
          <div className="flex items-center justify-start gap-3">
            <Skeleton className="h-10 w-24 " />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24 " />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-10 w-24 " />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <Skeleton className="h-12 mb-10 max-w-96 w-full mr-auto" />
      <div className="flex items-start md:items-end justify-between gap-3 flex-col md:flex-row w-full mb-3">
        <div className="basis-full md:basis-1/2 w-full">
          <Skeleton className="h-60 mb-4 w-full" />
        </div>
        <div className="basis-full md:basis-1/2 w-full">
          <Skeleton className="h-60 mb-4 w-full" />
        </div>
      </div>
      <div className="flex items-start md:items-end justify-between gap-3 flex-col md:flex-row w-full mb-6">
        <div className="basis-full md:basis-1/2 w-full">
          <Skeleton className="h-60 mb-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export default TkLoader;
