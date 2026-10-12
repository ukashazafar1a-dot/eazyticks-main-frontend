"use client";
import useApp from "@/context/useApp";
import { Ticket } from "@/lib/types";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

export type hybridSteps = "layout" | "tickets" | "parking" | "shop" | "deals";
export type hybridStages= "tickets" | "extraFields" | "checkout" | "success" | "cancel" | "failed";
const useHybridEvent = () => {
  const { addItem, getItem, removeItem } = useCart();
  const [step, setStep] = useState<hybridSteps>("tickets");
  const [stage,setStages] = useState<hybridStages>("tickets");
  const { setToaster } = useApp();
  const changeStep = (next: hybridSteps) => {
    setStep(next);
  };
  const changeStage = (next: hybridStages) => {
    setStages(next);
  }
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
          `${ticket?.name} - Section ${seat} removed from the cart.`
        );
        return;
      } else {
        let obj = {
          id,
          name: `${ticket?.name} - Section ${seat}`,
          row,
          distributionId: ticket?.id,
          seatNo: seat,
          price: ticket?.price,
          quantity: 1,
          extraFields: ticket?.extrafields,
          type: 'layout'
        };
        addItem(obj);
        setToaster(
          "success",
          `${ticket?.name} - Section ${seat} added to the cart.`
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    step,
    changeStep,
    stage,
    changeStage
  };
};

export default useHybridEvent;
