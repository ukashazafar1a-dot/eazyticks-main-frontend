import React from "react";

const Banner = () => {
  return (
    <div className="bg-secondary text-white text-center py-20 md:px-2 px-3">
      <div className="max-w-screen-lg m-auto">
        <h1 className="text-3xl mb-3 text-center">
          Find Transactions or Resend Tickets
        </h1>
        <p className="text-base text-center">
          Ticket Assistance: Simply enter your email address and select the
          event for which you have purchased tickets. We&lsquo;ll quickly assist
          you in accessing and resending your tickets, ensuring you never miss
          out on your event experience.
        </p>
      </div>
    </div>
  );
};

export default Banner;
