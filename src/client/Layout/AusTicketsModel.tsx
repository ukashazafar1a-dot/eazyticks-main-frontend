import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LayoutTicket, SeatItem } from "@/lib/types";
import { formatPrice } from "@/helpers/generals";
import { returnSeatArray } from "@/lib/utils";
import TicketBtn from "./TicketBtn";
import useHybridLayout from "@/hooks/useHybridLayout";
import useApp from "@/context/useApp";

type props = {
  open: boolean;
  setClose: (value: boolean) => void;
  ticket: LayoutTicket | null | undefined;
};

const AusTicketsModel = ({ open, setClose, ticket }: props) => {
  const [vip, setVip] = useState<LayoutTicket | null>(null);
  const [seats, setSeats] = useState<Record<string, SeatItem[]>>({});
  const { handleAddToCart } = useHybridLayout();
  const { setToaster } = useApp();

  const handleClick = (row: any, seat: number) => {
    if (ticket) {
      const exact = ticket?.seats?.find((tick) => tick?.seatNo == seat);
      //console.log(exact);
      if (
        (exact && exact?.status == "Confirmed") ||
        exact?.status == "Booked"
      ) {
        setToaster(
          "error",
          `This Section is already ${
            exact?.status == "Confirmed" ? "sold" : exact?.status
          }.`
        );
      } else {
        handleAddToCart(ticket, row, seat, `${ticket?.name} - Row ${row} - Seat ${seat}`);
      }
    } else {
      setToaster("error", `Row ${row} - Seat ${seat} is not available.`);
    }
  };

  const handleConfirm = function(){
    setToaster("success", `Selected slots are added to the cart.`);
    setClose(false)
  }

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
  const sets = [1, 2, 3, 4];
  useEffect(() => {
    if (ticket) {
      setVip(ticket);
    }
  }, [ticket]);
  //console.log(vip, seats);
  return (
    <Dialog open={open} onOpenChange={(value) => setClose(value)}>
      <DialogContent className="new-svg max-w-3xl border-0 overflow-hidden !flex justify-between flex-col md-max:h-auto">
        <DialogHeader>
          <DialogTitle>
            <h2 className="h3">Select Your Tickets</h2>
          </DialogTitle>
          <div className="info-ticket-btns flex items-center justify-start gap-3 mt-3">
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
          <div className="block w-full ">
            <p className="distribution--name h4">{vip?.name}</p>
            {vip?.price == 0 ? (
              <p>Free Tickets</p>
            ) : (
              <p>Price: {formatPrice(vip?.price)}</p>
            )}
            <>
              {vip ? (
                <div className="">
                  <span>Rows</span>
                  <div className="ticket-list-main smart-scrollbar md-max:text-start max-h-96 overflow-y-auto">
                    {sets.map((numty, index) => {
                      return (
                        <div className="ticket-dist-row" key={index}>
                          <div className="row-no flex-shrink-0 !basis-[15%]">
                            <strong>Row {numty}</strong>
                          </div>
                          <div className="tickets-list">
                            {Array.from({ length: 5 }).map((num, index) => {
                              const booked = findSeatStatus(numty, index + 1);
                              return (
                                <TicketBtn
                                  id={ticket?.id}
                                  row={numty}
                                  isBooked={booked}
                                  handleOnClick={(row, btn) => handleClick(row,btn)}
                                  button={(index + 1) as any}
                                  key={index}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="w-full">
                  <button className="btn btn--secondary mt-3 m-auto" onClick={handleConfirm}><span>Confirm</span></button>
              </div>
            </>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AusTicketsModel;
