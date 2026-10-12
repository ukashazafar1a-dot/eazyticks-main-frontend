import React, { useEffect, useState } from "react";
import CardFooter from "./CardFooter";
import Ticket from "./Ticket";

interface FunctionProps {
  items: any;
  type: any;
}

function Tickets({ items, type: ticketType }: FunctionProps) {
  const [tickets, setTickets] = useState<Array<any>>([]);

  useEffect(() => {
    setTickets(items);
  }, [items]);

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4] ">
        <div className="bg-secondary text-white flex justify-between px-5 py-3 rounded-t-sm font-medium ">
          <span className="text-2xl sm-max:text-base">Ticket Types</span>
          <span className="text-lg sm-max:text-base">No. of ticket(s)</span>
        </div>
        <div className="  ">
          {tickets &&
            tickets.map((item, i) => {
              return <Ticket key={i} item={item} ticketType={ticketType} />;
            })}
        </div>
      </div>
      <CardFooter />
    </>
  );
}

export default Tickets;
