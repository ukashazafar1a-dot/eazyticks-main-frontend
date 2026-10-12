"use client";
import { CalenderEvent, CustomCalenderEvent, EventCalendar } from "@/lib/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { dummyCalenderEvents, truncateTitle } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CalenderInfo from "./CalenderInfo";
import ScrollIndicator from "./ScrollIndicator";

type props = {
  data: EventCalendar | null;
  slug: string;
};

const localizer = momentLocalizer(moment);

const extractObject = (events: CalenderEvent[]) => {
  const splitEvents: CustomCalenderEvent[] = [];
  events.forEach((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const diffInDays = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    //console.log('this difference in this ',event?.name, ' is ', diffInDays);
    for (let i = 0; i <= diffInDays; i++) {
      const currentStart = new Date(start);
      currentStart.setDate(currentStart.getDate() + i);
      const currentEnd = new Date(currentStart);
      currentEnd.setHours(23, 59, 59, 999);

      // Adjust start time for the first day
      if (i === 0) {
        currentStart.setHours(
          start.getHours(),
          start.getMinutes(),
          start.getSeconds(),
          start.getMilliseconds()
        );
      }

      // Adjust end time for the last day
      if (i === diffInDays) {
        currentEnd.setHours(
          end.getHours(),
          end.getMinutes(),
          end.getSeconds(),
          end.getMilliseconds()
        );
      }

      splitEvents.push({
        id: event.id,
        title: truncateTitle(event?.name, 60),
        start: currentStart,
        end: currentEnd,
        slug: event?.slug,
        status: event?.status,
      });
    }
  });
  //console.log(splitEvents);
  return splitEvents;
};

const getMinMaxDates = (events: CalenderEvent[]) => {
  const startDates: any[] = events.map((event) => new Date(event.startDate));
  const endDates: any[] = events.map((event) => new Date(event.endDate));
  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));
  return { minDate, maxDate };
};
const hideTodayButtonIfNeeded = (minDate: Date, maxDate: Date) => {
  const today = new Date();
  const todayButton = document.querySelector(".rbc-toolbar");

  if (todayButton) {
    if (today < minDate || today > maxDate) {
      todayButton.classList.add("hide-today-button");
    } else {
      todayButton.classList.remove("hide-today-button");
    }
  }
};
const isEventOnDate = (events: CustomCalenderEvent[], date: any) => {
  return events.some((event) => {
    const start = moment(event.start);
    const end = moment(event.end);
    return date.isBetween(start, end, "day", "[]");
  });
};

const EventCalenders = ({ data, slug }: props) => {
  const [content, setContent] = useState<EventCalendar | null>(null);
  const [events, setEvents] = useState<CustomCalenderEvent[] | null>(null);
  const [views, setViews] = useState<View>(Views?.MONTH);
  const [date, setDate] = useState(new Date());

  function Event({ event }: { event: CustomCalenderEvent }) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="!text-left trucate-text"
            disabled={event?.slug === slug}
          >
            {event?.slug == slug ? (
              <span className={`text-sm !text-left inside-span`}>
                {event.title}
              </span>
            ) : (
              <Link
                href={`/events/${event?.slug}`}
                className={`text-sm !text-left inside-span`}
              >
                {event.title}
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100 text-gray-800 shadow">
            <span>{event.title}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  const dayPropGetter = useCallback(
    (date: Date) => {
      const momentDate = moment(date);
      const hasEvent = events ? isEventOnDate(events, momentDate) : false;
      return {
        ...(hasEvent ? {} : { className: "no-event-on-this-day" }),
      };
    },
    [events]
  );

  const eventPropGetter = useCallback(
    (
      event: CustomCalenderEvent,
      start: Date,
      end: Date,
      isSelected: boolean
    ) => {
      const isToday = moment(start).isSame(new Date(), "day");
      return {
        ...(isSelected && {
          style: {
            backgroundColor: "#000",
          },
        }),
        ...(event?.status && {
          className: ` ${event?.status} ${
            event?.slug == slug ? "active-link" : ""
          } ${isToday ? "today-event" : ""}`,
        }),
      };
    },
    []
  );
  const slotPropGetter = useCallback(
    (date: Date) => ({
      className: "slotDefault",
    }),
    []
  );
  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 60,
      },
    }),
    []
  );
  const { defaultDate, min, max, components } = useMemo(() => {
    if (data && data?.events) {
      const { minDate, maxDate } = getMinMaxDates(data?.events);
      hideTodayButtonIfNeeded(minDate, maxDate);
      return {
        defaultDate: new Date(data.startDate),
        min: minDate,
        max: maxDate,
        components: {
          event: Event,
        },
      };
    }
    return {
      defaultDate: new Date(),
      min: new Date(),
      max: new Date(),
      components: {
        event: Event,
      },
    };
  }, [data]);
  const handleViewChange = useCallback(
    (newView: View) => setViews(newView),
    []
  );
  const handleDateChange = (date: Date) => {
    if (date < min) {
      setDate(min);
    } else if (date > max) {
      setDate(max);
    } else {
      setDate(date);
    }
  };
  const handleSelectSlot = useCallback((data: any) => {
    //console.log("triggered", data);
    setViews(Views.DAY);
    setDate(data?.start);
  }, []);
  useEffect(() => {
    if (data) {
      setContent(data);
      setDate(new Date(data?.startDate));
      if (data?.events) {
        const events = extractObject(data?.events);
        setEvents(events);
        const { minDate, maxDate } = getMinMaxDates(data?.events);
        hideTodayButtonIfNeeded(minDate, maxDate);
      }
    }
  }, [data]);

  //console.log(events);
  // console.log(defaultDate, min, max);
  if (!content) return <></>;

  return (
    <div className="py-6">
      <h2 className="h3 mb-6 text-center">{content?.name}</h2>
      <CalenderInfo />
      {events && (
        <div className="block h-full w-full overflow-x-auto calender-wrapper relative">
          <ScrollIndicator />
          <Calendar
            events={events}
            localizer={localizer}
            defaultDate={defaultDate}
            startAccessor="start"
            endAccessor="end"
            min={new Date(0, 0, 0, 6, 0, 0)}
            max={new Date(0, 0, 0, 23, 59, 59)}
            view={views}
            components={components}
            onView={handleViewChange}
            dayLayoutAlgorithm={"no-overlap"}
            showAllEvents={false}
            showMultiDayTimes={false}
            views={[Views?.MONTH, Views?.WEEK, Views?.DAY]}
            date={date}
            onNavigate={handleDateChange}
            popup={true}
            timeslots={2}
            step={60}
            selectable={true}
            className={`current-view-${views}`}
            dayPropGetter={dayPropGetter}
            slotGroupPropGetter={slotGroupPropGetter}
            slotPropGetter={slotPropGetter}
            style={{ height: "100%", overflowY: "auto" }}
            eventPropGetter={eventPropGetter}
            onSelectSlot={(data) => handleSelectSlot(data)}
          />
        </div>
      )}
    </div>
  );
};

export default EventCalenders;
