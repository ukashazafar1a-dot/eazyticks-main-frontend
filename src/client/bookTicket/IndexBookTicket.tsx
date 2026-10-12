"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Link from "next/link";
import useApp from "@/context/useApp";
import EmptyTickets from "./EmptyTickets";
import Tickets from "./Tickets";
import ShopItems from "./ShopItems";
import Deals from "./Deals";
import ExtraFields from "./ExtraFields";
import StripeContainer from "./Stripe/StripeContainer";
import { hasExtraFields } from "@/helpers/generals";
import PageError from "@/components/PageError";
import Banner from "./Banner";
import Steps from "./Steps";
import Totals from "./Totals";
import StickyTotals from "./StickyTotals";
import RefundPolicyModal from "./RefundPolicyModal";
import SectionLoader from "@/components/SectionLoader";
import "./style.css";

type IndexBookTicketProps = {
  content: any;
};

const IndexBookTicket = ({ content }: IndexBookTicketProps) => {
  const params = useParams();
  const slug = params?.slug;
  const { items, emptyCart } = useCart();
  const {
    activeStep,
    initBookings,
    placeOrder,
    setToaster,
    clientSecret,
    orderPlaced,
    orderFailed,
    setClientSecret,
    setOrderPlaced,
  } = useApp();
  const [event, setEvent] = useState<any>(null);
  const [openmodel, setOpenmodel] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProceeding, setIsProceeding] = useState(false);
  const [secret, setSecret] = useState<any>(null);
  const [reloadPage, setReloadPage] = useState(false);
  const [extraFields, setExtraFields] = useState(null);
  const [activeStage, setActiveStage] = useState("tickets");

  function renderCards() {
    if (
      event?.tickets?.length <= 0 &&
      event?.parkings?.length <= 0 &&
      event?.eventShopItems?.length <= 0
    ) {
      return <EmptyTickets />;
    }
    switch (activeStep) {
      case "tickets":
        return <Tickets items={event?.tickets} type="tickets" />;
      // return <Deals/>
      case "parking":
        return <Tickets items={event?.parkings} type="parkings" />;
      case "shop":
        return <ShopItems products={event?.eventShopItems} type="shops" />;
      case "deals":
        return <Deals />;
      default:
        return <p></p>;
    }
  }

  function renderStages() {
    switch (activeStage) {
      case "tickets":
        return (
          <div className="st-first basis-full md:basis-[66%] md:pe-4 pe-0">
            {renderCards()}
          </div>
        );
      case "extraFields":
        return (
          <div className="st-first basis-full md:basis-[66%] px-0 md:px-4 ">
            <ExtraFields
              onStageChange={setActiveStage}
              setFields={setExtraFields}
            />
          </div>
        );
      case "checkout":
        if (!clientSecret) return;
        return (
          <div className="st-first basis-full md:basis-[66%] sm:px-4 p-0">
            <StripeContainer setActiveStage={setActiveStage} slug={slug} />
          </div>
        );
      case "success":
        return (
          <div className="st-first basis-full md:basis-[66%] px-4">
            <p>{"Order placed seccessfully!"}</p>
            <button className="btn" style={{ width: "15rem" }}>
              Get Tickets
            </button>
          </div>
        );
      case "failed":
        return (
          <div className="st-first basis-full md:basis-[66%] px-4 info-message">
            <p>
              Something went wrong, If the issue persists, please reach out to
              our{" "}
              <Link className="heighlighted" href={"/contact-us"}>
                support team
              </Link>{" "}
              for assistance.
            </p>
            <Link
              href={"/events/" + slug}
              className="btn"
              style={{ width: "15rem" }}
            >
              Event Details
            </Link>
          </div>
        );
      case "cancel":
        return (
          <div className="st-first basis-full md:basis-[66%] px-4 info-message">
            <p>Order cancelled successfully!</p>
          </div>
        );
      default:
        return "";
    }
  }

  const handleProceed = function () {
    //console.log(activeStage, hasExtraFields(items), items);
    if (activeStage === "tickets" && hasExtraFields(items)) {
      setActiveStage("extraFields");
    } else if (activeStage === "tickets" && !hasExtraFields(items)) {
      setOpenmodel(true);
    } else if (activeStage === "extraFields" && extraFields) {
      setOpenmodel(true);
    } else if (hasExtraFields(items) && !extraFields) {
      return;
    }
  };

  const handlePlaceOrder = async () => {
    setIsProceeding(true);
    try {
      const response: any = await placeOrder(event, extraFields);
      //console.log(response);
      if (response && response?.succeeded) {
        setToaster(
          "success",
          "Order place successfully. Please pay you required amount"
        );
      } else {
        setReloadPage(!reloadPage);
        setToaster(
          "error",
          "Sorry some item(s) are out of stock. Please refill with updated items!"
        );
      }
      setIsProceeding(false);
    } catch (error) {
      setIsProceeding(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      setActiveStage("checkout");
    }
  }, [clientSecret]);

  useEffect(() => {
    if (extraFields) {
      setOpenmodel(true);
    }
  }, [extraFields]);

  useEffect(() => {
    if (orderPlaced) setActiveStage("success");
  }, [orderPlaced]);

  useEffect(() => {
    if (orderFailed) setActiveStage("failed");
  }, [orderFailed]);

  useEffect(() => {
    if (content) {
      setEvent(content);
      initBookings(content);
      setIsLoading(false);
      emptyCart();
      setClientSecret(undefined);
      setExtraFields(null);
      setOrderPlaced(false);
      setActiveStage("tickets");
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, [reloadPage, content]);

  if (isLoading) return <SectionLoader />;
  if (isError) return <PageError />;
  //console.log(content);
  return (
    <>
      <Banner event={event} />
      <div className="max-w-screen-xl  mx-auto">
        <div>
          {activeStage === "tickets" && (
            <div className="steps-container py-4">
              <Steps event={event} />
            </div>
          )}
          <div className="flex flex-wrap px-4 py-8">
            {renderStages()}
            {(activeStage === "tickets" ||
              activeStage === "checkout" ||
              activeStage === "extraFields") && (
              <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4] h-full ">
                <Totals
                  open={openmodel}
                  closemodel={setOpenmodel}
                  handleProceed={handleProceed}
                  isProceeding={isProceeding}
                  stage={activeStage}
                  fee={event?.fee}
                />
              </div>
            )}
          </div>
          <div className="sticky-totals">
            <StickyTotals
              open={openmodel}
              closemodel={setOpenmodel}
              handleProceed={handleProceed}
              isProceeding={isProceeding}
              stage={activeStage}
              fee={event?.fee}
            />
          </div>
          <RefundPolicyModal
            handlePlaceOrder={handlePlaceOrder}
            open={openmodel}
            closemodel={setOpenmodel}
          />
        </div>
      </div>
    </>
  );
};

export default IndexBookTicket;
