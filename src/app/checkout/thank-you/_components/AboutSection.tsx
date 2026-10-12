"use client";
import React from "react";
import Ticket from "@/components/Ticket";
import {
  Event,
  OrderParking,
  PurchaseResponse,
  TicketObject,
} from "@/lib/types";
import DownloadButton from "./DownloadButton";
import { hasTicketsInOrder } from "@/lib/utils";
import NoTickets from "./NoTickets";

type props = {
  tickets: TicketObject[] | null;
  parkings: OrderParking[] | null;
  products: any;
  event: Event | null;
  order: PurchaseResponse | null;
  children?: React.ReactNode;
};

const AboutSection = ({ tickets, parkings, products, event, order, children }: props) => {
  if (event?.type == 'Online') return <></>;
  if (!hasTicketsInOrder(order)) {
    return <NoTickets />;
  }
  return (
    <div id="event-tickets" className="pb-6">
      {tickets && tickets?.length > 0 ? (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <h2 className="h3 m-0" id="gettickets">
              Your Tickets
            </h2>
            {children}
          </div>
          <div className="tickets-wrapper flex-wrap">
            {tickets?.map((ticket: TicketObject, i: number) => {
              return (
                <Ticket
                  key={`${ticket?.id}-${i}`}
                  ticket={ticket}
                  event={event}
                  purchasedOn={order?.purchasedOn}
                  type="ticket"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}

      {parkings && parkings?.length > 0 ? (
        <div className="mb-6">
          <h2 className="h3 mb-3" id="gettickets">
            Event Parkings
          </h2>
          <div className="tickets-wrapper flex-wrap">
            {parkings.map((ticket: any, i: any) => {
              return (
                <Ticket
                  key={i}
                  ticket={ticket}
                  event={event}
                  purchasedOn={order?.purchasedOn}
                  type="parking"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {products?.length > 0 && (
        <div className="mb-6">
          <h2 className="h3 mb-3" id="gettickets">
            Products
          </h2>
          <div className="tickets-wrapper flex-wrap">
            {products.map((ticket: any, i: any) => {
              return (
                <Ticket
                  key={i}
                  ticket={ticket}
                  event={event}
                  purchasedOn={order?.purchasedOn}
                  type="shop"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
