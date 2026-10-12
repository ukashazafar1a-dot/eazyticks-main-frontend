import React from "react";
import { Ticket } from "@/lib/types";
import { extractConfirmed, extractSeatNos } from "@/lib/utils";
import { useCart } from "react-use-cart";

/**
 * A custom React hook that generates class names based on ticket status and seat number.
 */

const useClassName = () => {
  const { getItem } = useCart();
  /**
   * * Generates class names based on ticket status and seat number.
   * @param {Ticket | null} ticket - The ticket object containing seat information.
   * @param {any} seatNumber - The seat number to check.
   */
  const getClassNames = (ticket: Ticket | null, seatNumber: any) => {
    const classes = [" "];
    if (!ticket) return;
    const booked = extractSeatNos(ticket?.seats);
    const sold = extractConfirmed(ticket?.seats);
    if (booked?.includes(seatNumber)) {
      classes.push("booked");
    }

    if (sold?.includes(seatNumber)) {
      classes.push("sold");
    }
    let id = `t-${ticket?.id}-r-1-b-${seatNumber}`;
    if (getItem(id)) {
      classes.push("in-cart");
    }
    return classes.join(" ");
  };
  return { getClassNames };
};

export default useClassName;
