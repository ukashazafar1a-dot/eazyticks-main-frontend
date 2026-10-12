"use client";
import { calculateFees, formatPrice } from "@/helpers/generals";
import React from "react";
import { useCart } from "react-use-cart";
import { IoCloseSharp } from "react-icons/io5";
import useSeatingLayout from "@/hooks/useSeatingLayout";
import { steps } from "@/lib/types";

type props = {
  billType: boolean;
  fee: number;
  onProceed: (currentStep: steps) => void;
  step: steps;
};
const SideCart = ({ billType, fee, onProceed, step }: props) => {
  const { handleRemoveItem } = useSeatingLayout();
  const { items, cartTotal } = useCart();
  const retunCartTotal = () => {
    if (billType && fee !== 0) {
      return formatPrice((cartTotal + calculateFees(items, fee)).toFixed(2));
    } else {
      return `$ ${cartTotal}`;
    }
  };

  const handleProccedClick = () => {
    onProceed(step);
  };

  return (
    <div className="mini-cart-details">
      <div className="mini-cart-header text-white text-2xl">Your Tickets</div>
      <div className="st-cart-items">
        {items && items?.length > 0 ? (
          items?.map((item) => {
            return (
              <div className="cart--item-list" key={item?.id}>
                <p className="m-0 cart-item-title">{item?.name}</p>
                <div className="cart-item-actions">
                  <span>{formatPrice(item?.price)}</span>
                  {step == "tickets" && (
                    <button
                      className="cart--inside-icon"
                      onClick={() =>
                        handleRemoveItem(item?.id, item?.row, item?.seatNo)
                      }
                    >
                      <IoCloseSharp className="cart-remove-icon icon icon-close" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center">
            <p>Your Cart is Empty</p>
          </div>
        )}
      </div>
      <div className="cart--total-in">
        <div className="tickets-card-item-price-container mb-3">
          <div className="cart--item-list">
            <span>Estimated Price</span>
            <span style={{ marginLeft: "0.8rem" }}>
              {formatPrice(cartTotal)}/-
            </span>
          </div>
          {billType && fee !== 0 && (
            <div className="cart--item-list" style={{ fontSize: "14px" }}>
              <span>Processing Fees</span>
              <span style={{ marginLeft: "0.8rem" }}>
                $ {calculateFees(items, fee).toFixed(2)}/-
              </span>
            </div>
          )}
        <p className="total-title one-lines flex items-center justify-between text-base md:text-xl ">
            <span>Total Amount:</span>
            <span>{cartTotal ? retunCartTotal() : "$ 00.00"}</span>
          </p>
        </div>
        <button
          className="btn btn--primary btn--full w-full"
          type="button"
          disabled={items?.length === 0 || step === "checkout"}
          onClick={() => handleProccedClick()}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SideCart;
