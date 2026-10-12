"use client";
import React, { useRef, useState } from "react";
import moment from "moment";
import QRCode from "react-qr-code";
import { downloadTicket, getAddress } from "@/helpers/generals";
import LoadingSvg from "@/components/LoadingSvg";
import { FaDownload } from "react-icons/fa";
import { formatDate } from "@/lib/formatData";
import { getExcelColumnName } from "@/lib/utils";

type props = {
  ticket?: any;
  event?: any;
  purchasedOn?: any;
  type?: string;
};

const Ticket = ({ ticket, event, purchasedOn, type }: props) => {
  const domEl = useRef<any>(null);
  const qrRef = useRef<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    await downloadTicket(domEl.current, ticket?.id);
    setIsDownloading(false);
  };

  const renderTypeIcon = (type?: any) => {
    switch (type) {
      case "shop":
        return (
          <img
            src={"/assets/images/ticket-shop.png"}
            className="absolute inset-1/2 opacity-0.5 ticket-icon"
            alt="Shop Icon - Eazyticks"
            loading="lazy"
          />
        );
      case "ticket":
        return (
          <img
            src={"/assets/images/ticket-regular.png"}
            className="absolute inset-1/2 opacity-0.5 ticket-icon"
            alt="Ticket Icon - Eazyticks"
            loading="lazy"
          />
        );
      case "parking":
        return (
          <img
            src={"/assets/images/tickcet-parking.png"}
            className="absolute inset-1/2 opacity-0.5 ticket-icon"
            alt="Parking Icon - Eazyticks"
            loading="lazy"
          />
        );
      default:
        return (
          <img
            src={"/assets/images/ticket-regular.png"}
            className="absolute inset-1/2 opacity-0.5 ticket-icon"
            alt="Ticket Icon - Eazyticks"
            loading="lazy"
          />
        );
    }
  };

  const renderTicketType = (ticket: any, type?: any) => {
    switch (type) {
      case "shop":
        return (
          <>
            <span className="red font-semibold">Ticket Type: </span>
            <span className="text-white">Shop</span>
          </>
        );
      case "parking":
        return (
          <>
            <span className="red font-semibold">Parking: </span>
            <span className="text-white">{ticket?.type}</span>
          </>
        );
      case "ticket":
        return (
          <>
            <span className="red font-semibold">Ticket Type: </span>
            <span className="text-white">{ticket?.type}</span>
          </>
        );
      default:
        return (
          <>
            <span className="red font-semibold">Ticket Type: </span>
            <span className="text-white">{ticket?.type}</span>
          </>
        );
    }
  };

  return (
    <>
      {Array(ticket?.validity || 1)
        .fill(null)
        .map((_, index) => {
          const seatSuffix = getExcelColumnName(index);
          return (
            <React.Fragment key={`${ticket.id}-${index}`}>
              <div className="ticket rounded basis-full md:basis-1/2 relative">
                <div className="dw-main" onClick={downloadImage}>
                  {isDownloading ? (
                    <LoadingSvg width="20px" height="20px" />
                  ) : (
                    <FaDownload className="icon icon-download" />
                  )}
                </div>
                <div
                  className="flex justify-center flex-col md:flex-row h-full"
                  ref={domEl}
                >
                  <div className="basis-full md:basis-[65%] relative first-item p-2 h-full bg-white text-black rounded-tl rounded-bl">
                    <div className="flex items-start justify-start flex-col w-full h-full">
                      <span className="red font-semibold">Non Refundable</span>
                      <div className="flex items-start justify-between border-b mb-1 pb-2 w-full">
                        <h3 className="text-xl font-semibold two-lines">
                          {event?.name}
                        </h3>
                        <span className="text-sm font-medium">
                          {moment(event?.startDate).format("MMM DD,YYYY")}
                          <br /> {moment(event?.startDate).format("h:mm A")}
                        </span>
                      </div>
                      {type === "shop" && (
                        <h3 className="two-lines address text-xl">
                          <b className="">Product:</b>{" "}
                          <span className="">
                            {ticket?.productName}
                            {ticket?.name != undefined &&
                              ticket?.name != "Default" &&
                              " - " + ticket?.name}
                          </span>
                        </h3>
                      )}
                      <h4 className="text-base two-lines mb-3 w-full">
                        {getAddress(event)}
                      </h4>
                      <div className="flex items-center justify-center gap-2 my-auto w-full">
                        {ticket?.gateNo && (
                          <span className="px-2 py-1 text-white bg-secondary rounded">
                            Gate {ticket?.gateNo}
                          </span>
                        )}
                        {ticket?.rowNo && (
                          <span className="px-2 py-1 text-white bg-secondary rounded">
                            Row {ticket?.rowNo}
                          </span>
                        )}
                        {ticket?.seatNo && (
                          <span className="px-2 py-1 text-white bg-secondary rounded">
                            Seat {ticket?.seatNo}
                            {ticket.validity > 1 ? seatSuffix : ""}
                          </span>
                        )}
                        {ticket?.no && (
                          <span className="px-2 py-1 text-white bg-secondary rounded">
                            No. {ticket?.no}
                          </span>
                        )}
                        {ticket?.purchasedQty && ticket?.purchasedQty > 0 && (
                          <span className="px-2 py-1 text-white bg-secondary rounded">
                            Quantity{" "}
                            <span className="font-bold">
                              {" "}
                              {ticket?.purchasedQty}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="border-t border-b py-1 text-center mt-6 w-full">
                        <span className="font-bold">Purchased On: </span>
                        <span>{formatDate(purchasedOn)}</span>
                      </div>
                    </div>
                    {renderTypeIcon(type)}
                  </div>
                  <div className="basis-full md:basis-[35%] bg-secondary text-white p-2 rounded-bl rounded-br second-item flex flex-col justify-between">
                    <div className="mb-3">
                      <img
                        src={"/logo.svg"}
                        alt="Eazyticks logo"
                        loading="lazy"
                        className="mx-auto"
                        width={150}
                      />
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      <div className="qr-container mx-auto">
                        {ticket?.qrCode && (
                          <QRCode
                            value={ticket?.qrCode}
                            level="Q"
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "150px",
                              padding: "3px",
                              background: "white",
                            }}
                            viewBox={`0 0 256 256`}
                            fgColor="#000000"
                            bgColor="#FFFFFF"
                          />
                        )}
                      </div>
                    </div>
                    <div className="text-white mb-2 text-center">
                      {renderTicketType(ticket, type)}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hidden md-max:block md-max:my-1 my-0 w-full h-0.5 border-dashed border-1 border-primary" />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default Ticket;
