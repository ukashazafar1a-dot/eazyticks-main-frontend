"use client";
import useApp from "@/context/useApp";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { steps } from "./useElevenLayout";
import { Ticket } from "@/lib/types";

const useSeatingLayout = () => {
  const { addItem, getItem, removeItem } = useCart();
  const [step, setStep] = useState<steps>("tickets");
  const { setToaster } = useApp();
  const changeStep = (step: steps) => {
    setStep(step);
  };
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

  const handleAddToCart = (ticket: Ticket, row: any, seat: any) => {
    try {
      let id = `t-${ticket?.id}-r-${row}-b-${seat}`;
      if (getItem(id)) {
        removeItem(id);
        setToaster(
          "success",
          `Section ${ticket?.name} - Row ${row} - Seat ${seat} removed from the cart.`
        );
        return;
      } else {
        let obj = {
          id,
          name: `Section ${ticket?.name} - Row ${row} - Seat ${seat}`,
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
          `Section ${ticket?.name} - Row ${row} - Seat ${seat} added to the cart.`
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
    step,
    changeStep,
  };
};

export default useSeatingLayout;
