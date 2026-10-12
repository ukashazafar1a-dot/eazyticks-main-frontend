"use client";
import React from "react";
import { useCart } from "react-use-cart";
import { calculateFees, formatPrice } from "@/helpers/generals";

type props = {
  fee: number;
  window?: () => Window;
  billType: boolean;
  step: any ;
  handleProceed:any;
};
const QuickActions = ({ fee, billType,step,handleProceed }: props) => {
  const { cartTotal, totalItems, items } = useCart();

  const retunCartTotal = () => {
    if (billType && fee !== 0) {
      return formatPrice((cartTotal + calculateFees(items, fee)).toFixed(2));
    } else {
      return `$ ${cartTotal}`;
    }
  };


  return (
    <div className="flex items-center justify-between  container px-3">
      <p className="total-title text-base md:text-xl font-semibold">
        Total Amount: {cartTotal ? retunCartTotal() : "$ 00.00"}
      </p>
      <button
        className="btn btn--primary btn--small"
        type="button"
        disabled={totalItems == 0 ? true : false}
        onClick={() => handleProceed(step)}
      >
        Proceed
      </button>
    </div>
  );
};

export default QuickActions;
