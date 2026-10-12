"use client";
import React from "react";

const ButtonsColors = () => {
  return (
    <div className="btns-header-st">
      <div className="flex items-center justify-center flex-wrap gap-2">
        <div className="ticket-view-flex">
          <div className="ticket-button tk-Avilable">
            <span className="sr-only">Available Seat</span>
          </div>
          <span>Available Seat</span>
        </div>
        <div className="ticket-view-flex">
          <div className="ticket-button tk-booked">
            <span className="sr-only">Booked Seat</span>
          </div>
          <span>Booked Seat</span>
        </div>
        <div className="ticket-view-flex">
          <div className="ticket-button tk-Sold">
            <span className="sr-only">Sold Seat</span>
          </div>
          <span>Sold Seat</span>
        </div>
      </div>
    </div>
  );
};

export default ButtonsColors;
