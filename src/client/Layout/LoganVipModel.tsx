import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NormalTicket, SeatItem } from "@/lib/types";
import { AddIdPostFix, formatPrice } from "@/helpers/generals";
import { returnSeatArray } from "@/lib/utils";
import TicketBtn from "./TicketBtn";
import useHybridLayout from "@/hooks/useHybridLayout";
import useApp from "@/context/useApp";
import Ticket from "../Hybrid/Ticket";
import { useCart } from "react-use-cart";
import StartTimeCounter from "../Hybrid/StartTimeCounter";

type props = {
  open: boolean;
  setClose: (value: boolean) => void;
  ticket: NormalTicket | null;
};

const LoganVipModel = ({ open, setClose, ticket }: props) => {
  const { handleAddToCart } = useHybridLayout();
  const { addItem, getItem, updateItemQuantity } = useCart();
  const { setToaster } = useApp();
  const [outOfStockMessage, setOutOfStockMessage] = useState("");
  const [showMore, setShowMore] = useState(false);

    function handleQuantityChange(type: any, id: any) {
      let obj: any = {};
      const idWithPF: any = AddIdPostFix(id, 'parkings');
      const stock = ticket?.totalTicket;
      if (getItem(idWithPF)) {
        if (type === "plus" && stock != null && stock < getItem(idWithPF).quantity + 1) {
          setOutOfStockMessage("There are only " + stock + " slot(s) available.");
          setToaster("success", "Out of stock!");
          return;
        } else {
          setOutOfStockMessage("");
        }
        if (type === "plus") {
          updateItemQuantity(idWithPF, getItem(idWithPF).quantity + 1);
        } else {
          updateItemQuantity(idWithPF, getItem(idWithPF).quantity - 1);
        }
      } else {
        if (type === "plus" && stock != null && stock < 1) {
          setOutOfStockMessage("There are only " + stock + " slot(s) available.");
          setToaster("success", "Out of stock!");
          return;
        }
        if (type === "plus") {
          obj = {
            id: idWithPF,
            name: ticket?.name,
            stock,
            type: 'parkings',
            price: ticket?.price,
            quantity: 1,
            extraFields: ticket?.extraFields,
          };
          addItem(obj);
          setToaster("success", ticket?.name + " added!");
        }
      }
    }

    function renderQuantity(item: any) {
      const idWithPF: any = AddIdPostFix(item?.id, 'parkings');
      if (getItem(idWithPF)) {
        return (
          <span className="min-w-[40px] text-2xl font-semibold text-center">
            {getItem(idWithPF)?.quantity}
          </span>
        );
      } else {
        return (
          <span className="min-w-[40px] text-2xl font-semibold text-center">
            0
          </span>
        );
      }
    }

  return (
    <Dialog open={open} onOpenChange={(value) => setClose(value)}>
      <DialogContent className="max-w-3xl border-0 overflow-hidden !flex justify-between flex-col md-max:h-auto">
        <DialogHeader>
          <DialogTitle>
            <h2 className="h3  mb-4">Select Your Tickets</h2>
          </DialogTitle>
          <div className="block w-full ">
            {/* <p className="distribution--name h4">{ticket?.name}</p>
            {ticket?.price == 0 ? (
              <p>Free Tickets</p>
            ) : (
              <p>Price: {formatPrice(ticket?.price)}</p>
            )} */}
            <>
                  <div className="border-b p-4">
      <div className="flex justify-between">
        <div className="type_item-info">
          {ticket?.soldoutStatus ? (
            <div className="flex items-center justify-start gap-3 flex-wrap mb-1">
              <div className="text-lg font-medium">{ticket?.name}</div>
              <span className="px-3 py-1 text-sm rounded-full bg-amber-400 text-gray-600">
                Sold Out
              </span>
            </div>
          ) : (
            <div className="text-lg font-medium">{ticket?.name}</div>
          )}
          <div className="text-base opacity-60">$ {ticket?.price}</div>

        </div>
          <div className="type_item-quantity">
            <div className="flex justify-end ">
              <button
                className="bg-secondary px-3 py-1 text-white rounded"
                onClick={() => handleQuantityChange("minus", ticket?.id)}
              >
                -
              </button>

              {ticket && renderQuantity(ticket)}

              <button
                className="bg-secondary px-3 py-1 text-white rounded"
                onClick={() => handleQuantityChange("plus", ticket?.id)}
              >
                +
              </button>
            </div>
            {ticket?.totalTicket != null && ticket?.sold != null ? (
              <div className="text-base opacity-60 text-muted-foreground mt-1">{ticket?.totalTicket - ticket?.sold} Slot(s) available.</div>
            ):('')}
          </div>
        {outOfStockMessage && (
          <span className="text-primary">{outOfStockMessage}</span>
        )}
      </div>
      <div className="second rte rte-settings">
        <StartTimeCounter startDate={ticket?.startDate} endDate={ticket?.endDate} />
        {ticket?.message && (
          <div>
            <div
              className={showMore ? "" : "dist-text-collapsed"}
              dangerouslySetInnerHTML={{ __html: ticket?.message }}
            />
            {ticket?.message?.length > 100 && (
              <span
                className="text-primary cursor-pointer underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Show More"}
              </span>
            )}

            {/* {showMore ? ticket?.message : shorten(ticket?.message, 100)}{" "}
            {ticket?.message?.length > 100 && (
              <span
                className="text-primary cursor-pointer underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Show More"}
              </span>
            )} */}
          </div>
        )}
      </div>
    </div>
            </>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoganVipModel;
