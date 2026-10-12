import React from "react";

const Banner = () => {
  return (
    <section className="py-14 px-4">
      <div className="content max-w-[1200px] mx-auto text-center">
        <h1 className="md:text-[3.4em]  text-2xl text-transparent bg-clip-text bg-gradient-to-r from-black to-primary font-bold leading-tight">
          Discover the Power of EazyTicks
        </h1>
        <h2 className="sm:text-3xl text-lg mt-2 mb-3">
          Your One-Stop Shop for Ticket Selling and Management
        </h2>
        <div className="mx-auto text-center mt-2 max-w-[750px] sm:text-lg text-base">
          EazyTicks is the ultimate ticket selling and management platform that
          empowers event organizers and ticket sellers with the tools they need
          to succeed.
        </div>
      </div>
    </section>
  );
};

export default Banner;
