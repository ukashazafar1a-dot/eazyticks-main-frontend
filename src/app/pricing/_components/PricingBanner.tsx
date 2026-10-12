import React from "react";

const PricingBanner = () => {
  return (
    <div className="px-4 py-10 bg-[#eeeeee]">
      <div className="pb-main flex items-center justify-between max-w-[1200px] mx-auto md:flex-row flex-col">
        <div className="p-3 md:basis-3/5 w-full">
          <h3 className="sm:mb-3 mb-2 font-bold leading-tight">
            <b className="text-primary">Eazyticks</b>
            <br /> is Completely Free.
          </h3>
          <h4 className="h3 sm:mb-3 mb-2 font-bold text-[26px] sm-max:text-base">
            We Only Charge You When You Sell Tickets for Your Events
          </h4>
          <p className="content">
            Don&lsquo;t want to pay this service fee? Simply select the option
            and we will pass on the service fee down to your attendees when they
            purchase your tickets.
          </p>
        </div>
        <div className="p-3 md:basis-2/5 w-full">
          <div className="bg-[#fafafa] text-center shadow p-4 md:p-8 rounded-md w-fit mx-auto min-w-[280px]">
            <div className="flex items-center justify-start flex-col">
              <h3 className="d">1</h3>
              <h5 className="font-semibold">Dollar</h5>
              <span className="font-semibold h4 py-3">+</span>
              <span className="bg-primary text-white px-8 py-3 mb-3 rounded text-2xl fw-bold ">
                5%
              </span>
              <span className="per-text mb-3 italic">Per ticket sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBanner;
