"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { downloadAllTickets, getAddress } from "@/helpers/generals";
import moment from "moment";
import LoadingSvg from "@/components/LoadingSvg";
import CalenderButtons from "@/components/CalenderButtons";
import Ticket from "@/components/Ticket";

type props = {
  order: any;
};

const EventTickets = ({ order }: props) => {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const event: any = order?.event;
  const extended: any = order?.extended;
  const eventTickets: any = order?.eventTickets;
  const parkingTickets: any = order?.parkingTickets;
  const shopItemTickets: any = order?.shopItemTickets;

  const handleDownloadChange = async function () {
    setIsDownloading(true);
    await downloadAllTickets(".e-ticket");
    setIsDownloading(false);
  };

  const renderExtendedInfo = () => {
    // console.log("Extended", extended, event);
    if (!extended || event?.type !== "Online") return;
    const { topic, description, link, password, meetingId } =
      extended.onlineEvent;
    return (
      <>
        <br />
        <span style={{ fontWeight: "bold" }}>{topic}</span>
        <br />
        {description !== null && (
          <>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            <span>{description}</span>
            <br />
          </>
        )}
        <span style={{ fontWeight: "bold" }}>Link: </span>
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
            <span style={{ fontWeight: "bold" }}>Password: </span>
            <span>{password}</span>
            <br />
          </>
        )}
        {meetingId !== null && (
          <>
            <span style={{ fontWeight: "bold" }}>Meeting ID: </span>
            <span>{meetingId}</span>
            <br />
          </>
        )}
        <br />
        <br />
      </>
    );
  };

  const handleBackPage = () => {
    router.push("/account/profile/orders");
  };

  //console.log(order);
  return (
    <div>
      <div className="section--header">
        <div className="btn-wrap mb-3">
          <button className="btn btn--outline " onClick={handleBackPage}>
            <IoArrowBack className="icon icon-back" />
            <span>Back to Orders</span>
          </button>
        </div>
      </div>
      <div className="et-info">
        <h2 className="h3  sm:text-3xl text-2xl font-bold mb-4 ">
          Order for {event?.name}
        </h2>
        <div className="order-info">
          <p>
            <span className="font-bold">Order #{order?.id} </span> on May 11,
            2023
          </p>
          <p>
            <span className="font-bold"> Starting on </span>{" "}
            {moment(event?.startDate).format("dddd, MMM DD, YYYY")} at{" "}
            {moment(event?.startDate).format("h:mm A")}
          </p>
          <p>
            {" "}
            <span className="font-bold"> Address</span> {getAddress(event)}
          </p>
          {renderExtendedInfo()}
        </div>
        <div className="flex items-center justify-start gap-3 my-3">
          {event?.type !== "Online" && (
            <button
              className="btn btn--primary"
              onClick={() => handleDownloadChange()}
              disabled={isDownloading}
            >
              {isDownloading ? <LoadingSvg /> : "Print Tickets"}
            </button>
          )}
          <a
            href={`mailto:info@eazyticks.com?subject=My Order is not Correct for the event ${event?.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            Contact the Organizer
          </a>
        </div>
        {event?.type !== "Online" && (
          <div className="flex items-center pb-2 my-2 border-b">
            <span className="text-primary pe-1 font-bold"> Please Note: </span>
            <span> Click the </span>
            <span className="mx-3 cursor-pointer bg-primary">
              <FaDownload className="icon icon-download fill-white p-1 animate-pulse" />
            </span>
            <span> icon to download the single ticket.</span>
          </div>
        )}
      </div>
      <div className="et-info  pb-6 my-6 border-b">
        <div className="bk-main">
          <div className="bk-info">
            <h2 className=" h3 sm:text-3xl text-2xl font-bold mb-4">
              Save to calender
            </h2>
            <CalenderButtons event={event} />
          </div>
        </div>
      </div>
      {event?.type !== "Online" && (
        <div className="tickets--wrapper flex-wrap">
          {eventTickets?.length > 0 && (
            <>
              <h2 className="mb-3 h3">Event Tickets</h2>
              <div className="tickets-wrapper">
                {eventTickets?.map((ticket: any) => {
                  return (
                    <Ticket
                      key={ticket.id}
                      ticket={ticket}
                      event={event}
                      purchasedOn={order?.purchasedOn}
                      type="ticket"
                    />
                  );
                })}
              </div>
            </>
          )}
          {parkingTickets?.length > 0 && (
            <>
              <h2 className="mb-3 h3">Parking Tickets</h2>
              <div className="tickets-wrapper flex-wrap">
                {parkingTickets?.map((ticket: any) => {
                  return (
                    <Ticket
                      key={ticket.id}
                      ticket={ticket}
                      event={event}
                      purchasedOn={order?.purchasedOn}
                      type="parking"
                    />
                  );
                })}
              </div>
            </>
          )}
          {shopItemTickets?.length > 0 && (
            <>
              <h2 className="mb-3 h3">Event Products</h2>
              <div className="tickets-wrapper flex-wrap">
                {shopItemTickets?.map((ticket: any) => {
                  return (
                    <Ticket
                      key={ticket.id}
                      ticket={ticket}
                      event={event}
                      purchasedOn={order?.purchasedOn}
                      type="shop"
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventTickets;
