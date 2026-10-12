import React, { useState } from "react";
import { useCart } from "react-use-cart";
import useApp from "@/context/useApp";
import { AddIdPostFix } from "@/helpers/generals";

interface Provider {
  item: any;
  ticketType: string;
}

function Ticket({ item, ticketType }: Provider) {
  const { addItem, getItem, updateItemQuantity } = useCart();
  const { setToaster } = useApp();
  const [outOfStockMessage, setOutOfStockMessage] = useState<any>("");
  const [showMore, setShowMore] = useState(false);

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
          extraFields: item?.extraFields,
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

  function shorten(str: any, maxLen: any, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
  }

  return (
    <div className="border-b p-4">
      <div className="flex flex-wrap justify-between">
        <div className="type_item-info">
          <div className="text-lg font-medium">{item?.name}</div>
          <div className="text-base opacity-60 ">$ {item?.price}</div>
        </div>
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
        {outOfStockMessage && (
          <span style={{ color: "red" }}>{outOfStockMessage}</span>
        )}
      </div>
      <div className="second rte rte-settings">
        {item?.message && (
          <div>
            {showMore ? item?.message : shorten(item?.message, 100)}{" "}
            {item?.message?.length > 100 && (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Show More"}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ticket;
