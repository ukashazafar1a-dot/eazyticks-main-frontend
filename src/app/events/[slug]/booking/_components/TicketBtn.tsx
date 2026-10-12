"use client";
import { SeatStatus } from "@/lib/types";
import React from "react";
import { useCart } from "react-use-cart";

type props = {
  row: number;
  button: string | number;
  handleOnClick: (row: any, button: any) => void;
  id: any;
  isBooked: SeatStatus;
};

const TicketBtn = ({ row, button, isBooked, handleOnClick, id }: props) => {
  const { getItem } = useCart();

  const handleButtonClicked = (row: any, button: any) => {
    if (isBooked == "Booked" || isBooked == "Confirmed") {
      return;
    } else {
      handleOnClick(row, button);
    }
  };

  const tkId = `t-${id}-r-${row}-b-${button}`;
  return (
    <button
      disabled={isBooked == "Booked" || isBooked == "Confirmed"}
      className={`ticket-button tk-${row}-${button} tk-${isBooked} tk-${
        getItem(tkId) ? "selected" : ""
      }`}
      onClick={() => handleButtonClicked(row, button)}
    >
      {button}
    </button>
  );
};

export default TicketBtn;
