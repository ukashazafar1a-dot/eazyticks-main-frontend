"use client";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

const TicketButton = ({ row, button, isBooked, handleOnClick, id }: any) => {
  const { getItem } = useCart();

  const handleButtonClicked = (row: any, button: any) => {
    if (isBooked == "Booked" || isBooked == "Confirmed") {
      return;
    } else {
      handleOnClick(row, button);
    }
  };
  
  const tkId = `t-${id}-r-${row?.id}-b-${button}`;
  return (
    <button
      key={`row-${row?.id}-button-${button}`}
      style={{ "--index": button } as React.CSSProperties}
      disabled={isBooked == "Booked" || isBooked == "Confirmed"}
      className={`ticket-button tk-${row?.id}-${button} tk-${isBooked} tk-${
        getItem(tkId) ? "selected" : ""
      }`}
      onClick={() => handleButtonClicked(row?.id, button)}
    >
      {button}
    </button>
  );
};

export default TicketButton;
