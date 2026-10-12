"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { getAddress } from "@/helpers/generals";

interface Provider {
  event: any;
}

function CalendarButtons({ event }: Provider) {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || searchParams?.get("Id") || "";
  const sec = searchParams?.get("sec") || searchParams?.get("secret") || "";

  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [details, setDetails] = useState("");

  const eventLink = event?.slug
    ? `https://eazyticks.com/events/${event.slug}`
    : "";

  const ticketsLink = `https://eazyticks.com/checkout/thank-you?id=${id}&sec=${sec}`;

  // -------------------------------------
  // ICS File Generator
  // -------------------------------------
  const generateICS = () => {
    return (
      "BEGIN:VCALENDAR%0A" +
      "VERSION:2.0%0A" +
      "BEGIN:VEVENT%0A" +
      `DTSTART:${startDate}Z%0A` +
      `DTEND:${endDate}Z%0A` +
      `SUMMARY:${name}%0A` +
      `DESCRIPTION:${details}%0A` +
      `LOCATION:${venue}%0A` +
      `URL:${eventLink}%0A` +
      "END:VEVENT%0A" +
      "END:VCALENDAR"
    );
  };

  // -------------------------------------
  // Calendar Handlers
  // -------------------------------------

  const handleGoogleSave = () => {
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${name}&dates=${startDate}Z/${endDate}Z&details=${details}&location=${venue}`;
    window.open(url, "_blank");
  };

  const handleYahooSave = () => {
    const url = `https://calendar.yahoo.com/?v=60&view=m&type=20&title=${name}&st=${startDate}Z&et=${endDate}Z&desc=${details}&in_loc=${venue}`;
    window.open(url, "_blank");
  };

  const handleAppleSave = () => {
    const link = document.createElement("a");
    link.href = `data:text/calendar;charset=utf-8,${generateICS()}`;
    link.download = `${name}.ics`;
    link.click();
  };

  const handleOutlookSave = () => {
    const link = document.createElement("a");
    link.href = `data:text/calendar;charset=utf-8,${generateICS()}`;
    link.download = `${name}.ics`;
    link.click();
  };

  // -------------------------------------
  // Initialize event details
  // -------------------------------------
  useEffect(() => {
    if (!event) return;

    const { name, startDate, endDate } = event;

    setName(name);
    setVenue(getAddress(event));

    setStartDate(moment.utc(startDate).format("YYYYMMDDTHHmmss"));
    setEndDate(moment.utc(endDate).format("YYYYMMDDTHHmmss"));

    // Build the description
    // Build the description with new lines
    const rawDescription = [
      "Don't miss this event!",
      "",
      `Event Page: ${eventLink}`,
      "",
      `Tickets: ${ticketsLink}`,
    ].join("\n");

    // Encode for calendar URLs
    setDetails(encodeURIComponent(rawDescription));
  }, [event, id, sec]);

  return (
    <div className="flex items-center justify-start gap-2 md:gap-3 flex-wrap">
      <button
        className="btn btn--outline text-sm md:text-base !px-2 md:px-4 !py-1 md:py-2"
        onClick={handleGoogleSave}
      >
        Google
      </button>

      <button
        className="btn btn--outline text-sm md:text-base !px-2 md:px-4 !py-1 md:py-2"
        onClick={handleAppleSave}
      >
        Apple
      </button>

      <button
        className="btn btn--outline text-sm md:text-base !px-2 md:px-4 !py-1 md:py-2"
        onClick={handleYahooSave}
      >
        Yahoo
      </button>

      <button
        className="btn btn--outline text-sm md:text-base !px-2 md:px-4 !py-1 md:py-2"
        onClick={handleOutlookSave}
      >
        Outlook
      </button>
    </div>
  );
}

export default CalendarButtons;
