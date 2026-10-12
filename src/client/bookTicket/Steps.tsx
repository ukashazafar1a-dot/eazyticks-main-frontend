"use client";
import React from "react";
import useApp from "@/context/useApp";

interface FunctionProps {
  event: any;
}

function Steps({ event }: FunctionProps) {
  const { activeStep, changeStep } = useApp();

  function handleChangeStep(name: any) {
    changeStep(name);
  }
  
  return (
    <div className="steps-wrapper flex items-center justify-center md:gap-10 gap-4">
      {event?.tickets && event?.tickets?.length > 0 && (
        <div
          className={`step-item flex items-center flex-col text-center ${
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
          <div className="font-medium text-xl sm-max:text-base">Tickets</div>
        </div>
      )}
      {event?.parkings && event?.parkings?.length > 0 && (
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
          <div className="font-medium text-xl sm-max:text-base">Parking</div>
        </div>
      )}
      {event?.eventShopItems && event?.eventShopItems?.length > 0 && (
        <div
          className={`step-item text-center ${
            activeStep === "shop" && "active"
          }`}
        >
          <div
            className={`mb-2 rounded-full p-3 h-[73px] w-[73px] flex items-center justify-center cursor-pointer ${
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
          <div className="font-medium text-xl sm-max:text-base">Shop</div>
        </div>
      )}
      {event?.deals && event?.deals?.length > 0 && (
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
          <div className="font-medium text-xl sm-max:text-base">Deals</div>
        </div>
      )}
    </div>
  );
}

export default Steps;
