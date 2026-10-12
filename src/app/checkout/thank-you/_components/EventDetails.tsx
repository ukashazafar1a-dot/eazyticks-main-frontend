"use client";
import { downloadAllTickets, getAddress } from "@/helpers/generals";
import { useQueryParams } from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/formatData";
import { Event, OrderExtended } from "@/lib/types";
import React, { useEffect } from "react";

type props = {
  event: Event | null;
  extended: OrderExtended | null;
  loading: boolean;
  children?: React.ReactNode;
};
const EventDetails = ({ event, extended, loading, children }: props) => {

  function renderExtendedInfo() {
    if (!extended || event?.type !== "Online") return;
    const { topic, link, password, description, meetingId } =
      extended?.onlineEvent;
    return (
      <>
        <br />
        <br />
        <span className="first">{topic}</span>
        <br />
        {description !== null && (
          <>
            <span className="first">Description</span>
            <span>{description}</span>
            <br />
          </>
        )}
        <span className="first">Link: </span>
        <a
          href={link}
          style={{ color: "var(--colorThemePrimary)" }}
          target="_blank"
        >
          {link}
        </a>
        <br />
        {password !== null && (
          <>
            <span className="first">Password: </span>
            <span>{password}</span>
            <br />
          </>
        )}
        {meetingId !== null && (
          <>
            <span className="first">Meeting ID: </span>
            <span>{meetingId}</span>
            <br />
          </>
        )}
      </>
    );
  }

  if (!event) return <></>;

  return (
    <div className="flex items-center justify-between flex-wrap mb-5 gap-3">
      <div className="bk-info">
        <h2 className="h3 mb-3">About Your Event</h2>
        <div className="h4 booking-details">
          <span className="font-semibold">Event Name: </span>
          <span className="font-semibold">{event?.name}</span>
          <br />
          <span className="font-semibold">Address: </span>
          <span>{getAddress(event)}</span>
          <br />
          <span className="font-semibold">Date: </span>
          <span>{formatDate(event?.startDate)}</span>
          <br />
          {renderExtendedInfo()}
        </div>
      </div>
      <div className="bk-cta">
        <div className="wrapper-buttons">{children}</div>
      </div>
    </div>
  );
};

export default EventDetails;
