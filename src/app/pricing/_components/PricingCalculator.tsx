"use client";
import React, { useEffect, useState } from "react";

type feeType = "pass" | "absorb";
const PricingCalculator = () => {
  const [value, setValue] = useState<feeType>("pass");
  const [name, setName] = useState<number>(0);
  const [nameerror, setNameerror] = useState("");
  const [organizerfee, setOrganizerfee] = useState(0);
  const [customerfee, setCustomerfee] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [attende, setAttende] = useState("Per Ticket Attendees Pay");

  const handleClickType = (type: feeType) => {
    setValue(type);
  };
  const onChangeInput = (e: any) => {
    setName(Math.floor(e.target.value));
  };
  const onChangeTicket = (e: any) => {
    setTicket(e.target.value);
  };
  var dollar = 1;
  var percent = 5;
  function percentage(perAmount: any, totalAmount: any) {
    return (perAmount / 100) * totalAmount;
  }
  function profit() {
    if (value === "pass") {
      if (name && name !== 0) {
        setNameerror("");
        let price = name + dollar;
        let total: number = price + percentage(percent, name);
        let totalPrice = total * ticket;
        let organizerTotal = name * ticket;
        setCustomerfee(totalPrice);
        setOrganizerfee(organizerTotal);
        if (ticket == 1) {
          setAttende("Per Ticket Attendees Pay");
        } else if (ticket > 1) {
          setAttende("For All Tickets Attendees Pay");
        }
      } else {
        setNameerror("Please Enter a value");
        setOrganizerfee(0);
        setCustomerfee(0);
        setName(0);
      }
    } else {
      if (name && name !== 0) {
        setNameerror("");
        let price = name - dollar;
        let total: number = price - percentage(percent, name);
        let totalPrice = total * ticket;
        let organizerTotal = name * ticket;
        setCustomerfee(organizerTotal);
        setOrganizerfee(totalPrice);
        if (ticket == 1) {
          setAttende("Per Ticket Attendees Pay");
        } else if (ticket > 1) {
          setAttende("For All Tickets Attendees Pay");
        }
      } else {
        setNameerror("Please Enter a value");
        setOrganizerfee(0);
        setCustomerfee(0);
        setName(0);
      }
    }
  }
  useEffect(() => {
    profit();
  }, [name, value, ticket]);

  return (
    <div
      className="px-4 py-10
     mb-4 max-w-[1200px] m-auto"
    >
      <div className="text-center px-3 py-6">
        <h2 className="mb-3 md:text-[32px]">
          Calculate Your <span className="red">Eazyticks</span> Fees
        </h2>
        <div className="content prose mx-auto">
          Organise venue events and host online events with unlimited
          possibilities using our built-in virtual event platform. Build a
          unique event experience for you and your attendees.
        </div>
      </div>
      <div className="cl-main flex flex-wrap bg-secondary rounded-lg shadow">
        <div className="cl-first md:basis-1/2 basis-full cl-item">
          <div className="cf-main p-5 bg-primary text-white rounded-lg">
            <div className="cf-flex-item">
              <div className="field-set">
                <p className="mb-3">How do you want to pay the service fee?</p>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className={`btn ${
                        value == "pass" ? "btn--secondary" : "btn--outline"
                      }`}
                      onClick={() => handleClickType("pass")}
                    >
                      Pass On
                    </button>
                    <button
                      className={`btn ${
                        value == "absorb" ? "btn--secondary" : "btn--outline"
                      }`}
                      onClick={() => handleClickType("absorb")}
                    >
                      Absorb
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cf-flex-item me-0 md:me-5">
              <div className="field-set mb-3">
                <label className="label">How many tickets you need?</label>
                <div className="field-group">
                  <div className="field">
                    <input
                      type="text"
                      id="ticets"
                      className="w-full rounded text-black"
                      value={ticket}
                      onChange={(e) => onChangeTicket(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="field-set">
                <label className="label">What is the ticket price?</label>
                <div className="field-group">
                  <div className="field">
                    <input
                      type="text"
                      className="w-full rounded text-black"
                      value={name}
                      onChange={(e) => onChangeInput(e)}
                    />
                    <p>{nameerror}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cl-second md:basis-1/2 basis-full cl-item h-full">
          <div className="cs-main p-5 py-8 bg-secondary text-white rounded-lg flex items-center justify-center flex-col gap-5 my-auto h-full">
            <div className="p-4 px-5 cs-first bg-white text-black rounded-md">
              <div className="text-center">
                <h3>USD {organizerfee}</h3>
                <span>Total Amount You Receive</span>
              </div>
            </div>
            <div className="p-4 px-6 bg-white text-black rounded-md">
              <div className="text-center">
                <h3>USD {customerfee}</h3>
                <span>{attende}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
