"use client";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { IoCloseSharp } from "react-icons/io5";
import useApp from "@/context/useApp";
import { calculateFees } from "@/helpers/generals";
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { currencyFormatter } from "@/lib/utils";

interface FunctionProps {
  open?: any;
  closemodel?: any;
  handleProceed?: any;
  isProceeding?: boolean;
  stage?: any;
  fee?: number;
}

const StickyTotals = (props: FunctionProps) => {
  const { items, cartTotal, isEmpty, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const { clientSecret } = useApp();
  function handleItemRemove(item: any) {
    removeItem(item.id);
  }
  return (
    <>
      <Drawer open={open} onOpenChange={(value) => setOpen(value)}>
        {!open && (
          <div className="w-full block fixed bottom-0 lg:hidden z-cart">
            <div className="flex items-center justify-between bg-gray-200 text-black px-1 py-2 rounded-t-sm md-max:flex-wrap">
              <div
                onClick={() => setOpen(true)}
                className={`flex items-center justify-between flex-wrap ${
                  clientSecret ? "w-full" : ""
                }`}
              >
                <div className="tickets-card-item-price-container">
                  <div className="tickets-card-item-price e-price">
                    <span>Estimated Price</span>
                    <span style={{ marginLeft: "0.8rem" }}>
                      {currencyFormatter(cartTotal)}/-
                    </span>
                  </div>
                  {props.stage === "checkout" && (
                    <>
                      {props?.fee !== 0 && (
                        <div
                          className="tickets-card-item-price fees"
                          style={{ fontSize: "14px" }}
                        >
                          <span>Processing Fees</span>
                          <span style={{ marginLeft: "0.8rem" }}>
                            $ {calculateFees(items, props.fee).toFixed(2)}/-
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {props.stage === "checkout" && (
                  <div className="tickets-card-item-price-container">
                    <div className="tickets-card-item-price total">
                      <span className="font-semibold">Subtotal </span>
                      <span>
                        ${" "}
                        {(cartTotal + calculateFees(items, props.fee)).toFixed(
                          2
                        )}
                        /-
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {!clientSecret && (
                <div className="tickets-card-item-btn">
                  {props.stage !== "extraFields" ? (
                    <button
                      className="btn btn--primary !text-sm "
                      disabled={isEmpty || props.isProceeding}
                      onClick={(e) => props.handleProceed()}
                    >
                      <span>PROCEED</span>
                      {props.isProceeding && (
                        <span>
                          <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3 !w-5 !h-5" />
                        </span>
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn btn--primary"
                      style={{ color: "white", background: "#232323" }}
                      form={"extrafields-form"}
                      disabled={isEmpty || props.isProceeding}
                      onClick={(e) => props.handleProceed()}
                    >
                      <span>PROCEED</span>
                      {props.isProceeding && (
                        <span>
                          <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3 !w-5 !h-5" />
                        </span>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Tickets</DrawerTitle>
            <DrawerDescription>
              <div className="body">
                <div className="tickets-card-items max-h-96 overflow-y-auto">
                  {!isEmpty ? (
                    items.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="text-left">
                            <span className="text-black font-medium ">
                              {item.name}
                            </span>
                            <div>
                              {item.variant && item.variant !== "Default" && (
                                <p className="">{item.variant}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 my-2">
                            <span className="text-black font-medium">
                              {item.quantity}
                            </span>
                            {props?.stage === "tickets" && (
                              <div
                                className=" bg-primary rounded-full p-1 cursor-pointer flex items-center justify-center"
                                onClick={() => handleItemRemove(item)}
                              >
                                <IoCloseSharp className="cart-remove-icon fill-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-8 text-center">
                      <span style={{ color: "#686868" }}>Cart is empty!</span>
                    </div>
                  )}
                </div>
                {props.stage === "checkout" && (
                  <div className={`block w-full text-gray-800`}>
                    <div className="tickets-card-item-price-container">
                      <div className="flex items-center justify-between e-price">
                        <span>Estimated Price</span>
                        <span style={{ marginLeft: "0.8rem" }}>
                          {currencyFormatter(cartTotal)}/-
                        </span>
                      </div>
                      {props.stage === "checkout" && (
                        <>
                          {props?.fee !== 0 && (
                            <div
                              className="flex items-center justify-between fees"
                              style={{ fontSize: "14px" }}
                            >
                              <span>Processing Fees</span>
                              <span style={{ marginLeft: "0.8rem" }}>
                                $ {calculateFees(items, props.fee).toFixed(2)}/-
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {props.stage === "checkout" && (
                      <div className="tickets-card-item-price-container">
                        <div className="flex items-center justify-between total">
                          <span className="font-semibold">Subtotal </span>
                          <span>
                            ${" "}
                            {(
                              cartTotal + calculateFees(items, props.fee)
                            ).toFixed(2)}
                            /-
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StickyTotals;
