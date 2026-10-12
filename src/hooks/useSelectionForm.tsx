"use client";
import useApp from "@/context/useApp";
import { steps } from "@/lib/types";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];
const tl = 300000;
const useSelectionForm = () => {
  const { items, addItem, updateItem, getItem, removeItem } = useCart();
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
      setToaster(
        "success",
        `Row ${alphabets[row - 1]} - Seat ${seat} removed from the cart.`
      );
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (ticket: any, row: any, seat: any) => {
    try {
      let id = `t-${ticket?.id}-r-${row}-b-${seat}`;
      if (getItem(id)) {
        removeItem(id);
        setToaster(
          "success",
          `Row ${alphabets[row - 1]} - Seat ${seat} removed from the cart.`
        );
        return;
      } else {
        let obj = {
          id,
          name: `Row ${alphabets[row - 1]} - Seat ${seat}`,
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
          `Row ${alphabets[row - 1]} - Seat ${seat} added to the cart.`
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

export default useSelectionForm;
