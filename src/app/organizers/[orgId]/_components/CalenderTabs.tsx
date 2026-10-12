"use client";
import { EventCalendar } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import EventCalenders from "@/client/Calender/EventCalenders";
import ErrorBoundary from "@/components/ErrorBoundry";
import CalenderFallback from "@/client/Calender/CalenderFallback";
type props = {
  calenders: EventCalendar[] | null;
};
const CalenderTabs = ({ calenders }: props) => {
  if (!calenders || calenders?.length == 0) return <></>;
  return (
    <ErrorBoundary fallback={<CalenderFallback calendar={calenders} />}>
      <div className="container px-3 py-3">
        <Tabs defaultValue={calenders[0].name} className="">
          <TabsList className="flex-wrap h-full justify-start">
            {calenders?.map((calender) => {
              return (
                <TabsTrigger value={calender?.name} key={calender?.id}>
                  {calender?.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {calenders?.map((calender) => {
            return (
              <TabsContent value={calender?.name} key={calender?.id}>
                <div>
                  <EventCalenders data={calender} slug={calender?.name} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default CalenderTabs;
