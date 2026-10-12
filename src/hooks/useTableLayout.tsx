"use client";
import useApp from "@/context/useApp";
import { useCart } from "react-use-cart";
import { Ticket } from "@/lib/types";

const useTableLayout = () => {
  const { addItem, getItem, removeItem } = useCart();
  const { setToaster } = useApp();

  const handleRemoveItem = async (ticket: any, row: any, seat: any) => {
    try {
      let id = ticket;
      //console.log("id to remove", id);
      await removeItem(id);
      setToaster("success", `Table ${seat} removed from the cart.`);
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
          `${ticket?.name} - Table ${seat} removed from the cart.`
        );
        return;
      } else {
        let obj = {
          id,
          name: `${ticket?.name} - Row ${row} - Seat ${seat}`,
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
          `${ticket?.name} - Table ${seat} - added to the cart.`
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAddToCart,
    handleRemoveItem
  };
};

export default useTableLayout;
