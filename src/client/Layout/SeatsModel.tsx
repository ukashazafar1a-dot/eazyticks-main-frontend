"use client";
import { formatPrice } from "@/helpers/generals";
import React, { useEffect, useState } from "react";
import LoadingSvg from "@/components/LoadingSvg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SUList, Ticket } from "@/lib/types";
import TicketBtn from "@/app/events/[slug]/booking/_components/TicketBtn";
import { SuSeats } from "@/helpers/StaticData";
import useSULayout from "@/hooks/useSULayout";

type props = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
};
const SeatsModel = ({ open, onClose, ticket }: props) => {
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useSULayout();
  const [selected, setSelected] = useState<SUList | null>(null);
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
      const dist = SuSeats?.find((list) => list?.name === ticket?.name);
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
          <div className="block w-full">
            <p className="distribution--name h4">{ticket?.name}</p>
            {ticket?.price == 0 ? (
              <p>Free Tickets</p>
            ) : (
              <p>Price: {formatPrice(ticket?.price)}</p>
            )}
            {loading ? (
              <LoadingSvg />
            ) : (
              <>
                {selected ? (
                  <>
                    <span>Rows</span>
                    <div className="ticket-list-main smart-scrollbar md-max:text-start">
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
                <div className="info-ticket-btns flex items-center justify-start md:justify-center gap-3 mt-3">
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

export default SeatsModel;
