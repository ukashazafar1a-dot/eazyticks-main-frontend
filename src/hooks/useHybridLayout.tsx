"use client";
import useApp from "@/context/useApp";
import { Ticket } from "@/lib/types";

import { useCart } from "react-use-cart";

const useHybridLayout = () => {
  const { items, addItem, updateItem, getItem, removeItem } = useCart();
  const { setToaster } = useApp();

  const handleRemoveItem = async (ticket: any, row: any, seat: any) => {
    try {
      let id = ticket;
      //console.log("id to remove", id);
      await removeItem(id);
      setToaster("success", `Row ${row} - Seat ${seat} removed from the cart.`);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (
    ticket: Ticket,
    row: any,
    seat: any,
    name: any = ""
  ) => {
    try {
      let id = `t-${ticket?.id}-r-${row}-b-${seat}`;
      if (getItem(id)) {
        removeItem(id);
        setToaster(
          "success",
          `${
            name ? name : `${ticket?.name} - Section ${seat}`
          } removed from the cart.`
        );
        return;
      } else {
        let obj = {
          id,
          name: `${name ? name : `${ticket?.name} - Section ${seat}`}`,
          row,
          distributionId: ticket?.id,
          seatNo: seat,
          price: ticket?.price,
          quantity: 1,
          extraFields: ticket?.extrafields,
          type: "layout",
        };
        addItem(obj);
        setToaster(
          "success",
          `${
            name ? name : `${ticket?.name} - Section ${seat}`
          } added to the cart.`
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAddToCart,
    handleRemoveItem,
  };
};

export default useHybridLayout;
