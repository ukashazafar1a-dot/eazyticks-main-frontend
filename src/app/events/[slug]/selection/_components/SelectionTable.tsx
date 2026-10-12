"use client";
import React, { useEffect, useState } from "react";
import ButtonsColors from "./ButtonsColors";
import SelectionCart from "./SelectionCart";
import QuickActions from "./QuickActions";
import { useParams, useRouter } from "next/navigation";
import BoxesLayout from "./BoxesLayout";
import MiniCartDetail from "./MiniCartDetail";
import useSelectionForm from "@/hooks/useSelectionForm";
import useApp from "@/context/useApp";
import StripeContainer from "@/client/bookTicket/Stripe/StripeContainer";
import PageError from "@/components/PageError";
import PolicyModel from "@/client/Layout/PolicyModel";
import CountdownTimer from "@/client/Layout/CountDownTimer";
import { steps, Ticket } from "@/lib/types";
import { hasExtraFields } from "@/helpers/generals";
import { useCart } from "react-use-cart";
import ExtraFields from "@/client/Layout/ExtraFields";

type Event = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  category: string;
  fee: number;
  billType: boolean;
  tickets: Ticket[];
};

type props = {
  event: Event;
  handleRefetch: any;
};

const SelectionTable = ({ event, handleRefetch }: props) => {
  const { handleAddToCart, step, changeStep } = useSelectionForm();
  const { handleLayoutOrder, setToaster } = useApp();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [sloading, setSloading] = useState();
  const [trigger, setTrigger] = useState(false);
  const { items } = useCart();
  const [extrafields, setExtrafields] = useState<any>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleClickClose = () => {
    handleRefetch();
    closeRefundModel();
  };
  const handleSLoading = () => {
    setSloading(sloading);
  };
  const closeRefundModel = () => {
    changeStep("tickets");
    setShowPolicy(false);
  };
  const handleProceed = (currentStep: steps) => {
    if (currentStep === "tickets" && hasExtraFields(items)) {
      changeStep("extrafields");
    } else if (currentStep === "tickets" && !hasExtraFields(items)) {
      setShowPolicy(true);
    } else if (currentStep === "extrafields") {
      setTrigger(true);
      setShowPolicy(true);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      if (event?.id) {
        setLoading(true);
        const response: any = await handleLayoutOrder(event?.id, extrafields?.fields);
        if (response && response?.succeeded) {
          setToaster("success", "Order Placed Successfully.");
          changeStep('checkout');
          setShowPolicy(false);
          setLoading(false);
        } else {
          setToaster("error", response?.messages[0] || 'Something went wrong!');
          setLoading(false);
        }
      } else {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOnClick = (row: any, seat: any) => {
    handleAddToCart(ticket, row, seat);
  };
  const handleCancelOrder = () => {
    changeStep("Cancel");
  };

  const handleFields = (values: any) => {
    if (values) {
      setExtrafields(values);
    }
  };
  const renderSteps = (step: steps) => {
    switch (step) {
      case "tickets":
        return (
          <>
            <div className="st-table-head text-center">
              <p className="h3">Please Select Your Seats.</p>
              <ButtonsColors />
              <div className="mobile-only">
                <strong>Note: </strong>Please scroll left to right to view all
                seating.
              </div>
            </div>
            <div className="rounded--table-view">
              <BoxesLayout handleOnClick={handleOnClick} ticket={ticket} />
            </div>
            <QuickActions
              fee={event?.fee}
              billType={event?.billType}
              step={step}
              handleProceed={handleProceed}
            />
          </>
        );
      case "extrafields":
        return (
          <div className="st-wrap-main flex items-start gap-2">
            <ExtraFields
              onStageChange={changeStep}
              setFields={handleFields}
              shouldMount={trigger}
              onChange={handleFields}
            />
            <MiniCartDetail billType={event?.billType} fee={event?.fee} />
          </div>
        );
      case "checkout":
        return (
          <>
            <CountdownTimer handleSLoading={handleSLoading} />
            <div className="stripe-wrapper">
              <StripeContainer
                setActiveStage={null}
                slug={params?.slug}
                onCancelChange={handleCancelOrder}
              />
              <MiniCartDetail billType={event?.billType} fee={event?.fee} />
            </div>
          </>
        );
      case "Success":
        return (
          <div className="p-3 order-message">
            <h2>Thank You For Choosing EazyTicks</h2>
            <div className="rte">{`Your ticket purchase has been successfully processed. We're thrilled to have you join us for an unforgettable experience. Get ready to immerse yourself in the excitement. Stay tuned for further updates and details regarding the event.`}</div>
          </div>
        );
      case "Cancel":
        return (
          <div className="p-3 order-message">
            <h2>Order Canceled Successfully.</h2>
            <div className="rte">{`Your order has been successfully canceled. We're sorry to see you go! If you have any questions or change your mind, feel free to reach out to us.`}</div>
          </div>
        );
      default:
        return <></>;
    }
  };

  const handleSubmit = () => {
    if (step === "extrafields") {
      var form: any = document.getElementById("extrafields-form");
      if (form) {
        if (form?.checkValidity()) {
          setTrigger(true);
          handleProceed(step);
          return;
        } else {
          form?.reportValidity();
          setTrigger(false);
          return;
        }
      }
    } else {
      handleProceed(step);
    }
  };
  useEffect(() => {
    if (event) {
      if (event?.tickets && event?.tickets?.length > 0) {
        setTicket(event?.tickets[0]);
      }
    }
  }, [event]);
  //console.log(event)
  if (event?.tickets && event?.tickets?.length == 0) return <PageError />;
  return (
    <div className={`position-relative ${sloading ? "small--loader" : ""}`}>
      <div className="main-table-wrapper">
        {renderSteps(step)}
        <PolicyModel
          open={showPolicy}
          closemodel={handleClickClose}
          handlePlaceOrder={handlePlaceOrder}
          loading={loading}
        />
      </div>
      <SelectionCart
        billType={event?.billType}
        fee={event?.fee}
        step={step}
        handleProceed={handleSubmit}
      />
    </div>
  );
};

export default SelectionTable;
