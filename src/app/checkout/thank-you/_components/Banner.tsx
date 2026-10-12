import React from "react";
import { Event } from "@/lib/types";
type props = {
  event: Event | null;
};
const Banner = ({ event }: props) => {
  return (
    <div className="bg-[#f2f2f2] px-3 py-6">
      <div className="container px-3 mx-auto flex items-center justify-center flex-col md:flex-row">
        <div className="basis-full md:basis-1/2 md:p-3 py-6 ">
          <h1 className="mb-2 h3 sm-max:text-2xl sm-max:leading-tight sm-max:font-bold">
            Transaction Successful
          </h1>
          <div className="rte rte-settings">
            <p className="mb-1">Thank you for your purchase!</p>
            <p className="mb-2 text-balance">
              {`Your transaction has been successfully completed and your tickets
            have been reserved. We hope you enjoy the event and have a great
            time. If you have any questions or concerns, please don't
            hesitate to contact our customer support team. `}
            </p>
            <p className="mb-3">
              Thank you for choosing{" "}
              <span className="red font-semibold">Eazyticks</span>!
            </p>
          </div>
        </div>
        <div className="basis-full md:basis-1/2">
          <img
            src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683139626/ezt-frontend-client-assets/image_3_f2zfyx.png"
            alt="Transcation Successful Banner - Eazyticks"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
