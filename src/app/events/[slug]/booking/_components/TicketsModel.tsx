"use client";
import { Listings } from "./SeatLayoutTypes";
import { formatPrice } from "@/helpers/generals";
import React, { useEffect, useState } from "react";
import TicketBtn from "./TicketBtn";
import LoadingSvg from "@/components/LoadingSvg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSeatingLayout from "@/hooks/useSeatingLayout";
import { list, Ticket } from "@/lib/types";

type props = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
};
const TicketsModel = ({ open, onClose, ticket }: props) => {
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useSeatingLayout();
  const [selected, setSelected] = useState<list | null>(null);
  const handleOnClick = (row: string | number, seat: any) => {
    handleAddToCart(ticket, row, seat);
  };
  const findSeatStatus = (row: string | number, tick: any) => {
    if (ticket?.seats && ticket?.seats?.length > 0) {
      const seat = ticket?.seats.find(
        (seat: any) => seat?.rowNo === row && seat?.seatNo === tick
      );
      if (seat) {
        return seat?.status;
      } else {
        return "Available";
      }
    } else {
      return "Available";
    }
  };

  useEffect(() => {
    if (ticket) {
      const dist = Listings?.find((list) => list?.name === ticket?.name);
      if (dist) {
        setSelected(dist);
        setLoading(false);
      } else {
        setSelected(null);
        setLoading(false);
      }
    }
  }, [ticket]);

  return (
    <div className="main-wrapper">
      {open && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <Dialog open={open} onOpenChange={(value) => onClose()}>
        <DialogContent className="border-0 overflow-hidden !flex justify-between flex-col md-max:h-auto">
          <DialogHeader>
            <DialogTitle>
              <h2 className="h3  mb-4">Select Your Tickets</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="block">
            <p className="distribution--name h4">{ticket?.name}</p>
            <p>Price: {formatPrice(ticket?.price)}</p>
            {loading ? (
              <LoadingSvg />
            ) : (
              <>
                {selected ? (
                  <>
                    <span>Rows</span>
                    <div className="ticket-list-main">
                      {selected?.seats?.map((seat, index: number) => {
                        return (
                          <div className="ticket-dist-row" key={index}>
                            <div className="row-no">
                              <strong>{seat?.row}</strong>
                            </div>
                            <div className="tickets-list">
                              {seat?.tickets?.map((tick, index: number) => {
                                const booked = findSeatStatus(seat?.row, tick);
                                return (
                                  <TicketBtn
                                    id={ticket?.id}
                                    row={seat?.row}
                                    isBooked={booked}
                                    handleOnClick={handleOnClick}
                                    button={tick}
                                    key={index}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="info-ticket-btns">
                  <div className="item-tb">
                    <button className="ticket-button button">
                      <span className="sr-only">Available</span>
                    </button>
                    <span>Available</span>
                  </div>
                  <div className="item-tb">
                    <button className="ticket-button button tk-sold">
                      <span className="sr-only">Sold</span>
                    </button>
                    <span>Sold</span>
                  </div>
                  <div className="item-tb">
                    <button className="ticket-button button tk-Booked">
                      <span className="sr-only">Reserved</span>
                    </button>
                    <span>Reserved</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketsModel;
