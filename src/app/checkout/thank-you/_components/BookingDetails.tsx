
import { formatDate } from "@/lib/formatData";
import { PurchaseResponse } from "@/lib/types";
import React from "react";
type props = {
  order: PurchaseResponse | null;
};
const BookingDetails = ({ order }: props) => {
  return (
    <div className="flex items-center justify-between flex-wrap mb-3 gap-3">
      <div className="bk-info">
        <h2 className="mb-3 h3">Your Booking Details</h2>
        <div className="h4 booking-details">
          {order?.firstName || order?.lastName ? (
            <>
              <span className="font-semibold">Name: </span>
              <span>
                {order?.firstName} {order?.lastName}
              </span>
              <br />
            </>
          ) : (
            <></>
          )}
          {order?.phoneNumber && (
            <>
              <span className="font-semibold">Phone Number: </span>
              <span>{order?.phoneNumber}</span>
              <br />
            </>
          )}
          {order?.email && (
            <>
              <span className="font-semibold">Email Address: </span>
              <span>{order?.email}</span>
              <br />
            </>
          )}
          <span className="font-semibold">Total: </span>
          <span>${order?.totalBill}/-</span>
          <br />
          <span className="font-semibold">Booking ID: </span>
          <span>{order?.id}</span>
          <br />
          <span className="font-semibold">Transection Date: </span>
          {order?.purchasedOn && <span>{formatDate(order?.purchasedOn)}</span>}
          <br />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
