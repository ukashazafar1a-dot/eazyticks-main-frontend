import React from "react";

const LayoutTicketTypeJearly = () => {
  return (
    <div className="types-flex flex items-center justify-center gap-3 mb-6 flex-wrap">
      <div className="main-item">
        <span className="ticket booked"></span>
        <span>Booked</span>
      </div>
      <div className="main-item">
        <span className="ticket jearly_sold"></span>
        <span>Sold</span>
      </div>
      <div className="main-item">
        <span className="ticket silver_vip"></span>
        <span>Silver VIP</span>
      </div>
      <div className="main-item">
        <span className="ticket gold_vip"></span>
        <span>Gold VIP</span>
      </div>
      <div className="main-item">
        <span className="ticket platinum_vip"></span>
        <span>Platinum VIP</span>
      </div>
      <div className="main-item">
        <span className="ticket diamond_vip"></span>
        <span>Diamond VIP</span>
      </div>
    </div>
  );
};

export default LayoutTicketTypeJearly;
