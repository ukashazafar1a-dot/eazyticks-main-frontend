"use client";
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiExclamationCircle } from "react-icons/hi2";

interface Provider {
  handleCancelOrder: any;
  isCanceling: boolean;
  slug: any;
  onComplete?: any;
}

const CheckoutForm = ({
  handleCancelOrder,
  isCanceling,
  slug,
  onComplete,
}: Provider) => {
  const router = useRouter();
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>(
    null
  );
  const {
    completeOrder,
    setClientSecret,
    setOrderPlaced,
    setOrderFailed,
    setToaster,
    startTkLoading,
  } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [disableBtns, setDisableBtns] = useState(false);

  const onOrderCancel = (e: any) => {
    e.preventDefault();
    handleCancelOrder();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      //   confirmParams: {
      //     return_url: 'http://localhost:3000/?Id=create-test-2',
      //   },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setIsProcessing(false);
      setErrorMessage(error?.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      try {
        const { data: response }: any = await completeOrder(paymentIntent.id);
        if (response && response?.succeeded) {
          // setToaster(
          //   "success",
          //   response?.messages[0] || "Order completed successfully."
          // );
          // setToaster(
          //   "success",
          //   "Order is successful! Please check your email for the receipt and a link to your tickets."
          // );
          const { data } = response;
          //console.log(data);
          if (onComplete) {
            onComplete();
          }
          router.push(`/checkout/thank-you?id=${data?.id}&sec=${data?.sec}`);
          return;
        } else {
          setToaster("error", response?.messages[0] || "Something went wrong!");
          setOrderFailed(true);
          setClientSecret(null);
          setIsProcessing(false);
        }
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        setClientSecret(null);
        setOrderFailed(true);
      }
    }
  };

  useEffect(() => {
    if (isProcessing || isCanceling) {
      setDisableBtns(true);
    } else {
      setDisableBtns(false);
    }
  }, [isProcessing, isCanceling]);

  return (
    <div className="stripe-form-custom">
      <form className="w-100" onSubmit={(e) => handleSubmit(e)}>
        <PaymentElement
          className="payment-element"
          options={{ layout: { type: "tabs", defaultCollapsed: false } }}
        />
        <div className="msg-error">
          {errorMessage && <p style={{ color: "#F85431" }}>{errorMessage}</p>}
        </div>
        <div className="flex items-center gap-3 p-4 text-yellow-900 bg-yellow-100 border border-yellow-300 rounded-md mt-2 text-sm">
          <HiExclamationCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-700 flex-shrink-0" />
          <span className="text-sm">
            <strong>All ticket sales are final.</strong> No refunds or
            exchanges. Tickets are delivered digitally via email immediately
            after purchase.
          </span>
        </div>
        <div className="flex my-4 items-center justify-between">
          <button
            className="btn btn--secondary"
            type="button"
            disabled={!stripe || disableBtns}
            onClick={onOrderCancel}
          >
            <span>Cancel</span>
            {isCanceling && (
              <span>
                <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
              </span>
            )}
          </button>
          <button
            className="btn btn--primary"
            type="submit"
            disabled={!stripe || disableBtns}
          >
            <span>Pay Now</span>
            {isProcessing && (
              <span>
                <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
