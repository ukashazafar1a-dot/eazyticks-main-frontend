import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import { HybridEvent, NormalTicket, TicketsType } from "@/lib/types";
import translation from "@/lib/translate";
import { getValueOrDefault } from "@/lib/utils";
import MapInfo from "./MapInfo";

type props = {
  items: NormalTicket[] | null;
  type: TicketsType;
  soldOut?: boolean;
  event?: HybridEvent;
};

function Tickets({ items, type: ticketType, soldOut = false, event }: props) {
  const [tickets, setTickets] = useState<NormalTicket[] | null>([]);

  useEffect(() => {
    setTickets(items);
  }, [items]);
  //console.log(tickets)
  if (!tickets || tickets?.length == 0) return;
  return (
    <>
      <MapInfo slug={event?.id} />
      <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4] " data-type={ticketType}>
        <div className="bg-secondary text-white flex justify-between px-5 py-3 rounded-t-sm font-medium ">
          <span className="text-2xl sm-max:text-base">
            {getValueOrDefault(
              event?.customSettings?.checkout?.distListingType,
              translation?.checkout?.ticketTypes
            )}
          </span>
          <span className="text-lg sm-max:text-base">
            {getValueOrDefault(
              event?.customSettings?.checkout?.distListNumbers,
              translation?.checkout?.ticketCount
            )}
          </span>
        </div>
        <div className="  ">
          {tickets &&
            tickets.map((item, i) => {
              return (
                <Ticket
                  key={i}
                  item={item}
                  ticketType={ticketType}
                  soldOut={soldOut}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Tickets;
