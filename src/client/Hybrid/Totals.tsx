"use client";
import React from "react";
import { useCart } from "react-use-cart";
import { IoCloseSharp } from "react-icons/io5";
import useApp from "@/context/useApp";
import { calculateFees } from "@/helpers/generals";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HybridEvent } from "@/lib/types";
import translation from "@/lib/translate";
import { currencyFormatter, getValueOrDefault } from "@/lib/utils";


type props = {
  open?: any;
  closemodel?: any;
  handleProceed?: any;
  isProceeding?: boolean;
  stage?: any;
  event: HybridEvent;
};

const Totals = ({
  open,
  closemodel,
  handleProceed,
  isProceeding,
  stage,
  event,
}: props) => {
  const { items, cartTotal, isEmpty, removeItem } = useCart();
  const { clientSecret } = useApp();

  function handleItemRemove(item: any) {
    removeItem(item.id);
  }

  return (
    <div className="card ">
      <div className="bg-secondary text-center px-5 py-3 text-white ">
        <span className="text-white rounded-t-sm font-medium text-2xl">
          {getValueOrDefault(
            event?.customSettings?.checkout?.cart?.heading,
            translation?.cart?.heading
          )}
        </span>
      </div>
      <div className="p-4 ">
        <div className="text-center pb-3 border-b">
          <span className="text-lg font-medium ">
          {getValueOrDefault(
            event?.customSettings?.checkout?.cart?.subheading,
            translation?.cart?.subHeading
          )}
          </span>
        </div>
        <div className="tickets-card-items">
          {!isEmpty ? (
            items.map((item, i) => {
              return (
                <div
                  className="flex items-center justify-between my-3 "
                  key={i}
                >
                  <div>
                    <span className="uppercase font-medium">{item.name}</span>
                    <div>
                      {item.variant && item.variant !== "Default" && (
                        <p className="font-medium">{item.variant}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <span className="font-medium">{item.quantity}</span>
                    {stage === "tickets" && (
                      <div
                        className="icon icon-close bg-primary rounded-full p-1 cursor-pointer flex items-center justify-center"
                        onClick={() => handleItemRemove(item)}
                      >
                        <IoCloseSharp className="icon icon-remove fill-white !h-3 !w-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart px-3 text-center py-6">
              <span className="text-lg opacity-60">Cart is empty!</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-3 border-t pt-2">
            <span className="text-base font-semibold">Estimated Price</span>
            <span className="font-semibold">{currencyFormatter(cartTotal)}/-</span>
          </div>
          {stage === "checkout" && (
            <>
              {event?.fee !== 0 && (
                <div className="flex items-center justify-between fees">
                  <span className="text-base">Processing Fees</span>
                  <span>$ {calculateFees(items, event?.fee).toFixed(2)}/-</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">Subtotal</span>
                <span>
                  $ {(cartTotal + calculateFees(items, event?.fee)).toFixed(2)}
                  /-
                </span>
              </div>
            </>
          )}
          {/* {!clientSecret && <div className="tickets-card-item-btn">
                    <button className="btn btn--primary btn--full" disabled={isEmpty} 
                    onClick={(e) => props.closemodel(true)}>PROCEED</button>
                </div>} */}
          {!clientSecret && (
            <div className="tickets-card-item-btn">
              {stage !== "extraFields" ? (
                <button
                  className="btn btn--primary max-w-full w-full"
                  disabled={isEmpty || isProceeding}
                  onClick={(e) => handleProceed()}
                >
                  <span>
                    {getValueOrDefault(
                      event?.customSettings?.checkout?.cart?.buttonText,
                      translation?.cart?.buttonText
                    )}
                  </span>
                  {isProceeding && (
                    <span>
                      <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3 !w-5 !h-5" />
                    </span>
                  )}
                </button>
              ) : (
                <button
                  className="btn btn--primary max-w-full w-full"
                  form={"extrafields-form"}
                  disabled={isEmpty || isProceeding}
                  onClick={(e) => handleProceed()}
                >
                  <span>
                  {getValueOrDefault(
                      event?.customSettings?.checkout?.cart?.buttonText,
                      translation?.cart?.buttonText
                    )}
                  </span>
                  {isProceeding && (
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
    </div>
  );
};

export default Totals;
