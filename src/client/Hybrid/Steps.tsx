"use client";
import React, { useEffect, useState } from "react";
import { HybridEvent } from "@/lib/types";
import { hybridSteps } from "@/hooks/useHybridEvent";
import { BsLayoutWtf } from "react-icons/bs";
import { getValueOrDefault, returnSteps } from "@/lib/utils";
import translation from "@/lib/translate";

type props = {
  event: HybridEvent;
  activeStep: hybridSteps;
  changeStep: (step: hybridSteps) => void;
};

function Steps({ event, activeStep, changeStep }: props) {
  const [count, setCount] = useState(4);
  const handleChangeStep = (name: any) => {
    changeStep(name);
  };
  const { layoutTickets, normalTickets } = event;

  useEffect(() => {
    if (event) {
      const totalSteps = returnSteps(event);
      if (totalSteps) {
        setCount(totalSteps?.length);
      }
    }
  }, []);

  return (
    <div
      className={`steps-wrapper flex md:gap-10 gap-4  ${
        layoutTickets && layoutTickets?.length > 0
          ? "overflow-x-auto px-2 justify-start md:justify-center"
          : "justify-center md:justify-center "
      } total-steps-${count}`}
    >
      {layoutTickets && layoutTickets?.length > 0 && (
        <div
          className={`step-item text-center ${
            activeStep === "layout" && "active"
          }`}
        >
          <div
            className={`mb-2 rounded-full p-3 h-[73px] w-[73px] flex items-center justify-center mx-auto cursor-pointer ${
              activeStep === "layout" ? "bg-primary" : "bg-gray-200"
            }`}
            onClick={(e) => handleChangeStep("layout")}
          >
            <div className="w-[44px] flex items-center justify-center mx-auto">
              <BsLayoutWtf className="w-10 h-10 fill-gray-600" />
            </div>
          </div>
          <div className="font-medium text-lg sm-max:text-base">
            {getValueOrDefault(
              event?.customSettings?.checkout?.distributions?.layoutHeading,
              translation?.checkout?.layoutStep
            )}
          </div>
        </div>
      )}
      {normalTickets?.tickets && normalTickets?.tickets?.length > 0 && (
        <div
          className={`step-item text-center flex items-center flex-col ${
            activeStep === "tickets" && "active"
          }`}
        >
          <div
            className={`mb-2 rounded-full p-3 h-[73px] w-[73px] flex items-center justify-center cursor-pointer ${
              activeStep === "tickets" ? "bg-primary" : "bg-gray-200"
            }`}
            onClick={(e) => handleChangeStep("tickets")}
          >
            <div className="w-[44px]">
              <img
                src={"/assets/images/ticket-2.svg"}
                alt="Ticket Icon - Eazyticks"
                loading="lazy"
              />
            </div>
          </div>
          <div className="font-medium text-lg sm-max:text-base">
            {getValueOrDefault(
              event?.customSettings?.checkout?.distributions?.ticketsHeading,
              translation?.checkout?.ticketStep
            )}
          </div>
        </div>
      )}
      {normalTickets?.parkings && normalTickets?.parkings?.length > 0 && (
        <div
          className={`step-item text-center ${
            activeStep === "parking" && "active"
          }`}
        >
          <div
            className={` mb-2 rounded-full  p-3 h-[73px] w-[73px] flex items-center justify-center cursor-pointer  ${
              activeStep === "parking" ? "bg-primary" : "bg-gray-200"
            }`}
            onClick={(e) => handleChangeStep("parking")}
          >
            <div className={`w-[44px] `}>
              <img
                src={"/assets/images/black-parking.png"}
                alt="Parking Icon - Eazyticks"
                loading="lazy"
              />
            </div>
          </div>
          <div className="font-medium text-lg sm-max:text-base">
            {getValueOrDefault(
              event?.customSettings?.checkout?.distributions?.parkingHeading,
              translation?.checkout?.parkingStep
            )}
          </div>
        </div>
      )}
      {normalTickets?.eventShopItems &&
        normalTickets?.eventShopItems?.length > 0 && (
          <div
            className={`step-item text-center ${
              activeStep === "shop" && "active"
            }`}
          >
            <div
              className={`mb-2 mx-auto rounded-full p-3 h-[73px] w-[73px] flex items-center justify-center cursor-pointer ${
                activeStep === "shop" ? "bg-primary" : "bg-gray-200"
              }`}
              onClick={(e) => handleChangeStep("shop")}
            >
              <div className="w-[44px]">
                <img
                  src={"/assets/images/online-store-1.svg"}
                  alt="Shop item Icon - Eazyticks"
                  loading="lazy"
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="font-medium text-lg sm-max:text-base">
              {getValueOrDefault(
                event?.customSettings?.checkout?.distributions?.shopHeading,
                translation?.checkout?.shopStep
              )}
            </div>
          </div>
        )}
      {normalTickets?.deals && normalTickets?.deals?.length > 0 && (
        <div
          className={`step-item text-center ${
            activeStep === "deals" && "active"
          }`}
        >
          <div
            className="bg-primary mb-2 rounded-full p-3 h-[73px] w-[73px] flex items-center justify-center cursor-pointer"
            onClick={(e) => handleChangeStep("deals")}
          >
            <div className="w-[44px]">
              <img
                src={"/assets/images/job-offer-2.svg"}
                alt="Deal Icon - Eazyticks"
                loading="lazy"
              />
            </div>
          </div>
          <div className="font-medium text-lg sm-max:text-base">Deals</div>
        </div>
      )}
    </div>
  );
}

export default Steps;
