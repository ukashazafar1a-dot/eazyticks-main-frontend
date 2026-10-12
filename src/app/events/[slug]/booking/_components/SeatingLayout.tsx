"use client";
import React, { useState } from "react";
import SeatingAction from "./SeatingAction";
import { Event } from "./SeatLayoutTypes";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useSeatingLayout from "@/hooks/useSeatingLayout";
import useApp from "@/context/useApp";
import StripeContainer from "@/client/bookTicket/Stripe/StripeContainer";
import PageError from "@/components/PageError";
import PolicyModel from "@/client/Layout/PolicyModel";
import CountdownTimer from "@/client/Layout/CountDownTimer";
import SideCart from "@/client/Layout/SideCart";
import { steps } from "@/lib/types";
import { hasExtraFields } from "@/helpers/generals";
import { useCart } from "react-use-cart";
import ExtraFields from "@/client/Layout/ExtraFields";

type props = {
  event: Event;
  handleRefetch: any;
};

const SeatingLayout = ({ event, handleRefetch }: props) => {
  const { step, changeStep } = useSeatingLayout();
  const [loading, setLoading] = useState(false);
  const [sloading, setSloading] = useState(false);
  const { setToaster, handleLayoutOrder } = useApp();
  const params = useParams();
  const router = useRouter();
  const { items } = useCart();
  const [trigger, setTrigger] = useState(false);
  const [extrafields, setExtrafields] = useState<any>(null);
  const [showPolicy, setShowPolicy] = useState(false);

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
  const handleFields = (values: any) => {
    if (values) {
      setExtrafields(values);
    }
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
          setLoading(false);
          changeStep('checkout');
          setShowPolicy(false);
        } else {
          setToaster("error", response?.messages[0] || 'Something went wrong!');
          setLoading(false);
        }
      } else {
        router?.refresh();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
 

  const renderSteps = (step: steps) => {
    switch (step) {
      case "tickets":
        return (
          <SeatingAction
            distributions={event?.tickets}
            handleRefetch={handleRefetch}
          />
        );
      case "extrafields":
        return (
          <ExtraFields
            onStageChange={changeStep}
            setFields={handleFields}
            shouldMount={trigger}
            onChange={handleFields}
          />
        );
      case "checkout":
        return (
          <div className="checkout-wrap-main">
            <CountdownTimer handleSLoading={handleSLoading} />
            <div className="stripe-wrapper">
              <StripeContainer
                setActiveStage={null}
                slug={params?.slug}
                onCancelChange={() => changeStep("Cancel")}
              />
            </div>
          </div>
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
   //console.log(event);
  if (event?.tickets && event?.tickets?.length == 0) return <PageError />;
  return (
    <div className={`position-relative ${sloading ? "small--loader" : ""}`}>
      <div className="main-sl-container">
        {step == "tickets" && (
          <div className="sl-header text-center">
            <p className="h3">Please Select Your Prefered Block.</p>
          </div>
        )}
        <PolicyModel
          open={showPolicy}
          closemodel={handleClickClose}
          handlePlaceOrder={handlePlaceOrder}
          loading={loading}
        />
        <div className="st-wrap-main">
          {renderSteps(step)}
          <SideCart
            billType={event?.billType}
            fee={event?.fee}
            onProceed={handleSubmit}
            step={step}
          />
        </div>
      </div>
    </div>
  );
};

export default SeatingLayout;
