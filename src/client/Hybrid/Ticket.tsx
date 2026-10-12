import React, { useState } from "react";
import { useCart } from "react-use-cart";
import useApp from "@/context/useApp";
import { AddIdPostFix } from "@/helpers/generals";
import { NormalTicket, TicketsType } from "@/lib/types";
import StartTimeCounter from "./StartTimeCounter";
import TicketDescription from "./TicketDescription";

type props = {
  item: NormalTicket;
  ticketType: TicketsType;
  soldOut?: boolean;
};

function Ticket({ item, ticketType, soldOut }: props) {
  const { addItem, getItem, updateItemQuantity } = useCart();
  const { setToaster } = useApp();
  const [outOfStockMessage, setOutOfStockMessage] = useState("");

  function handleQuantityChange(type: any, id: any) {
    let obj: any = {};
    const idWithPF: any = AddIdPostFix(id, ticketType);
    const stock = item?.totalTicket;
    if (getItem(idWithPF)) {
      if (type === "plus" && stock < getItem(idWithPF).quantity + 1) {
        setOutOfStockMessage("There are only " + stock + " item(s) available.");
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
      if (type === "plus" && stock < 1) {
        setOutOfStockMessage("There are only " + stock + " item(s) available.");
        setToaster("success", "Out of stock!");
        return;
      }
      if (type === "plus") {
        obj = {
          id: idWithPF,
          name: item?.name,
          stock,
          type: ticketType,
          price: item?.price,
          quantity: 1,
          extraFields: ticketType == 'parkings' ? item?.parkingExtrafields : item?.extraFields,
        };
        addItem(obj);
        setToaster("success", item?.name + " added!");
      }
    }
  }

  function renderQuantity(item: any) {
    const idWithPF: any = AddIdPostFix(item?.id, ticketType);
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

  //console.log("item", item, item?.message?.length);
  return (
    <div className="border-b p-4" data-name={item?.name} data-price={item?.price}>
      <div className="flex justify-between">
        <div className="type_item-info">
          {item?.soldoutStatus ? (
            <div className="flex items-center justify-start gap-3 flex-wrap mb-1">
              <div className="text-lg font-medium">{item?.name}</div>
              <span className="px-3 py-1 text-sm rounded-full bg-amber-400 text-gray-600">
                Sold Out
              </span>
            </div>
          ) : (
            <div className="text-lg font-medium">{item?.name}</div>
          )}
          <div className="text-base opacity-60 ticket-price">$ {item?.price}</div>
        </div>
        {(item?.soldoutStatus || !item?.saleStatus) &&
        ticketType == "tickets" ? (
          <div className="type_item-quantity">
            <div className="flex items-center justify-center ">
              <button
                className="px-3 py-1 text-gray-700 rounded bg-gray-300"
                disabled
              >
                -
              </button>
              <span className="min-w-[40px] text-2xl font-semibold text-center text-gray-400">
                0
              </span>
              <button
                className="px-3 py-1 text-gray-700 rounded bg-gray-300"
                disabled
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <div className="type_item-quantity">
            <div className="flex items-center justify-center ">
              <button
                className="bg-secondary px-3 py-1 text-white rounded"
                onClick={() => handleQuantityChange("minus", item?.id)}
              >
                -
              </button>

              {item && renderQuantity(item)}

              <button
                className="bg-secondary px-3 py-1 text-white rounded"
                onClick={() => handleQuantityChange("plus", item?.id)}
              >
                +
              </button>
            </div>
          </div>
        )}
        {outOfStockMessage && (
          <span className="text-primary">{outOfStockMessage}</span>
        )}
      </div>
      <div className="second rte rte-settings text-base">
        <StartTimeCounter startDate={item?.startDate} endDate={item?.endDate} />
        {item?.message && <TicketDescription message={item?.message} />}
      </div>
    </div>
  );
}

export default Ticket;
