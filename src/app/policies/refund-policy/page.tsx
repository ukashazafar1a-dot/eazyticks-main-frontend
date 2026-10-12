import React from "react";
import Banner from "../_components/Banner";

export const metadata = {
  title: `Refund Policy - Policies - Eazyticks`,
  description: `This Refund Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
  alternates: {
    canonical: "/policies/refund-policy",
  },
  openGraph: {
    title: `Refund Policy - Policies - Eazyticks`,
    description: `This Refund Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
    url: "/policies/refund-policy",
    siteName: "Eazyticks",
    images: [
      {
        url: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png`,
        width: 600,
        height: 300,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Refund Policy - Policies - Eazyticks`,
    description: `This Refund Policy details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
    creator: "@Eazyticks",
    images: [
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png",
    ],
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

const RefundPolicy = () => {
  return (
    <div className="">
      <Banner title={"Refund Policy"} handle={"refund-policy"} />
      <div className="prose mx-auto max-w-[1200px] pt-10 pb-16 px-3">
        <div className="rte rte-settings">
          <h3>Buying Tickets:</h3>
          <p>
            Buyers are solely responsible for completing their transactions in
            their purchase of Tickets, including the payment of applicable fees.
            By committing to purchase a Ticket, you are entering into a binding
            contract with the Seller to purchase the applicable Ticket.
            <strong>
              All sales are final, and except for cancelled events, you will not
              receive a refund for any completed purchase.
            </strong>
            You cannot change or cancel orders after the sale is complete.
          </p>
          <h3>Agreement:</h3>
          <p>
            You agree to supply Seller and EazyTicks with the appropriate
            information necessary for delivery of tickets, including, but not
            limited to, email address and physical address (if applicable). If
            you provide incorrect information for the delivery of Tickets, or
            you are unavailable to receive the tickets when they are delivered,
            you will not be eligible for a refund or Buyer Guarantee.
          </p>
          <h3>Number of Tickets or “Ticket Limits”:</h3>
          <p>
            In an effort to give all interested customers an opportunity to
            purchase Tickets to an event or other items via the Service and to
            discourage unfair Ticket buying practices, our clients often set
            limits on the number of seating and/or parking rights, or tickets a
            single customer may purchase. You will be advised of any such limits
            during the purchase process, or by a system limitation on the number
            of Tickets you may purchase during your online session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
