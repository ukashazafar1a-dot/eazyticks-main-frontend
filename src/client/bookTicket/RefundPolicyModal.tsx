"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import useApp from "@/context/useApp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FunctionProps {
  open?: any;
  closemodel?: any;
  handlePlaceOrder?: any;
}

function RefundPolicyModal({
  open,
  closemodel,
  handlePlaceOrder,
}: FunctionProps) {
  const { isLoggedIn, user, changeEmail } = useApp();
  const [agree, setAgree] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState<any>(`${user ? user.email : ""}`);
  const [confirmEmail, setConfirmEmail] = useState(`${user ? user.email : ""}`);
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handleConfirmEmailChange(e: any) {
    setConfirmEmail(e.target.value);
  }

  function handleProceed() {
    handlePlaceOrder();
    closemodel(false);
  }

  useEffect(() => {
    if (
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(confirmEmail)
    ) {
      if (email === confirmEmail && agree) {
        setIsValid(true);
        changeEmail(email);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    if (isLoggedIn && agree) {
      setIsValid(true);
    }
  }, [email, confirmEmail, agree]);

  return (
    <Dialog open={open} onOpenChange={(open) => closemodel(open)}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="font-bold text-xl">
            Refund Policy
          </DialogTitle>
        </DialogHeader>
        <div
          className={`overflow-y-auto${
            agree && !isLoggedIn
              ? " max-h-[250px] md:max-h-[400px]"
              : " md:max-h-[400px] "
          }`}
        >
          <div className="text-base">
            <h5 className="fw-bold">Buying Tickets:</h5>
            <p className="sm-max:text-sm">
              Buyers are solely responsible for completing their transactions in
              their purchase of Tickets, including the payment of applicable
              fees. By committing to purchase a Ticket, you are entering into a
              binding contract with the Seller to purchase the applicable
              Ticket.
              <strong>
                All sales are final, and except for cancelled events, you will
                not receive a refund for any completed purchase.
              </strong>{" "}
              You cannot change or cancel orders after the sale is complete.
            </p>
            <br />
            <br />
            <h5 className="fw-bold">Agreement:</h5>
            <p className="sm-max:text-sm">
              You agree to supply Seller and EazyTicks with the appropriate
              information necessary for delivery of tickets, including, but not
              limited to, email address and physical address (if applicable). If
              you provide incorrect information for the delivery of Tickets, or
              you are unavailable to receive the tickets when they are
              delivered, you will not be eligible for a refund or Buyer
              Guarantee.
              <br />
              <br />
            </p>
            <h5 className="fw-bold">Number of Tickets or “Ticket Limits”:</h5>
            <p className="sm-max:text-sm">
              In an effort to give all interested customers an opportunity to
              purchase Tickets to an event or other items via the Service and to
              discourage unfair Ticket buying practices, our clients often set
              limits on the number of seating and/or parking rights, or tickets
              a single customer may purchase. You will be advised of any such
              limits during the purchase process, or by a system limitation on
              the number of Tickets you may purchase during your online session.
            </p>
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-center justify-start gap-2 w-100 mb-3">
            <input
              className="checkbox--field"
              type="checkbox"
              checked={agree}
              id="flexCheckChecked"
              onChange={(e) => setAgree(!agree)}
            />
            <label
              className="text-gray-700 cursor-pointer sm-max:text-sm"
              htmlFor="flexCheckChecked"
            >
              Agree to the terms and conditions
            </label>
          </div>
          {agree && !isLoggedIn && (
            <div className="flex items-center gap-2 mb-3 sm-max:flex-col flex-row">
              <div className="basis-full sm:basis-1/2 w-full">
                <div className="f-2">
                  <label
                    htmlFor="emailFormControlInput"
                    className="font-medium !text-black opacity-100 text-base"
                  >
                    Email
                    <span className="red">*</span>
                  </label>
                  <input
                    type="email"
                    className="input--field"
                    id="emailFormControlInput"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-1/2 w-full">
                <div className="f-2">
                  <label
                    htmlFor="confirmEmailFormControlInput"
                    className="font-medium !text-black  opacity-100 text-base"
                  >
                    Confirm Email
                    <span className="red">*</span>
                  </label>
                  <input
                    type="email"
                    className="input--field"
                    id="confirmEmailFormControlInput"
                    value={confirmEmail}
                    onChange={(e) => handleConfirmEmailChange(e)}
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={(e) => closemodel(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleProceed()}
              disabled={!isValid}
            >
              Pay Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RefundPolicyModal;
