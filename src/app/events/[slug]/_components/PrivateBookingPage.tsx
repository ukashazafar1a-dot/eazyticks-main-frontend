import React from "react";
import { StaticEvent } from "@/helpers/StaticData";
import './style.css';
import Banner from "./Banner";
import PasscodeModal from "./PasscodeModal";

const PrivateBookingPage = () => {
  const event = StaticEvent;
  return (
    <div className="private-event-model white-overlay">
      <Banner event={event}/>
      <PasscodeModal/>
    </div>
  );
};

export default PrivateBookingPage;
