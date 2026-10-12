"use client";
import * as React from "react";
import { useCart } from "react-use-cart";
import { calculateFees, formatPrice } from "@/helpers/generals";
import useSelectionForm from "@/hooks/useSelectionForm";
import { IoCloseSharp } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  fee: number;
  window?: () => Window;
  billType: boolean;
  step: any;
  handleProceed: any;
};

const SelectionCart = ({
  fee,
  window,
  billType,
  step,
  handleProceed,
}: Props) => {
  const { handleRemoveItem } = useSelectionForm();
  const { items, cartTotal, totalItems } = useCart();

  const retunCartTotal = () => {
    if (billType && fee !== 0) {
      return formatPrice((cartTotal + calculateFees(items, fee)).toFixed(2));
    } else {
      return `$ ${cartTotal}`;
    }
  };
  return (
    <Drawer>
      <div className="flex items-center justify-between bg-gray-200 text-black px-1 py-2 rounded-t-sm fixed w-full -bottom-1 right-0 left-0">
        <div className="flex items-center justify-between px-3 py-1 w-full action--button-dr">
          <DrawerTrigger className="w-full">
            <p className="total-title one-lines text-base md:text-xl font-semibold text-left">
              Total Amount: {cartTotal ? retunCartTotal() : "$ 00.00"}
            </p>
          </DrawerTrigger>
          <button
            className="btn btn--secondary btn--small"
            type="button"
            disabled={totalItems == 0}
            onClick={() => handleProceed(step)}
          >
            Proceed
          </button>
        </div>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Tickets</DrawerTitle>
          <DrawerDescription>
            <div className="stacking--cart">
              <div className="st-cart-items">
                {items &&
                  items?.map((item) => {
                    return (
                      <div className="cart--item-list" key={item?.id}>
                        <p className="m-0 cart-item-title">{item?.name}</p>
                        <div className="cart-item-actions">
                          <span>{formatPrice(item?.price)}</span>
                          {step !== "checkout" && (
                            <div
                              className="cart--inside-icon"
                              onClick={() =>
                                handleRemoveItem(
                                  item?.id,
                                  item?.row,
                                  item?.seatNo
                                )
                              }
                            >
                              <IoCloseSharp className="cart-remove-icon" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="cart--total-in">
                <div className="tickets-card-item-price-container">
                  <div className="cart--item-list">
                    <span>Estimated Price</span>
                    <span style={{ marginLeft: "0.8rem" }}>
                      {formatPrice(cartTotal)}/-
                    </span>
                  </div>
                  {billType && fee !== 0 && (
                    <div
                      className="cart--item-list"
                      style={{ fontSize: "14px" }}
                    >
                      <span>Processing Fees</span>
                      <span style={{ marginLeft: "0.8rem" }}>
                        $ {calculateFees(items, fee).toFixed(2)}/-
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectionCart;
