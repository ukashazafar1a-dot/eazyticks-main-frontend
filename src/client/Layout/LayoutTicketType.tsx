import React from "react";

const LayoutTicketType = () => {
  return (
    <div className="types-flex flex items-center justify-center gap-3 mb-6">
      {/* <div className="main-item in-cart-item">
        <span className="ticket in-cart"></span>
        <span>In-cart</span>
      </div> */}
      <div className="main-item booked-item">
        <span className="ticket booked"></span>
        <span>Booked</span>
      </div>
      <div className="main-item sold-item">
        <span className="ticket sold"></span>
        <span>Sold</span>
      </div>
      <div className="main-item available-item">
        <span className="ticket available"></span>
        <span>Available</span>
      </div>
    </div>
  );
};

export default LayoutTicketType;
