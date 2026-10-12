import Link from "next/link";
import React from "react";

const NoTickets = () => {
  return (
    <div className="no-tickets-message py-8 px-4 bg-gray-100 rounded-md text-center">
      <div className="space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold m-0">No Tickets Available</h2>
        <p className="text-gray-700 m-0">
          It appears that there are no tickets associated with your order. We
          believe this is an error, please contact our support team for
          assistance.
        </p>
        <Link href="/contact-us" className="btn btn--primary w-fit mx-auto">
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default NoTickets;
