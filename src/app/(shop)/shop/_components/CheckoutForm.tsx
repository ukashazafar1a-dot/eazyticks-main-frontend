"use client";
import React, { useState, useEffect } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiExclamationCircle } from "react-icons/hi2";

interface Provider {
  handleCancelOrder: any;
  isCanceling: boolean;
  onComplete?: (paymentIntentId: string) => void;
  amount?: number;
  clientSecret?: string | null;
}

const CheckoutForm = ({
  handleCancelOrder,
  isCanceling,
  onComplete,
  amount,
  clientSecret,
}: Provider) => {
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [disableBtns, setDisableBtns] = useState(false);

  const onOrderCancel = (e: any) => {
    e.preventDefault();
    handleCancelOrder();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Pay Now clicked", { amount, stripeLoaded: !!stripe, elementsLoaded: !!elements });
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      setErrorMessage("Stripe is not initialized. Please try again.");
      return;
    }

    try {
      // Submit elements (validates UI fields)
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "Please fix the errors in the payment form.");
        setIsProcessing(false);
        return;
      }
      // Require a real client secret from the backend to confirm the PaymentIntent
      if (!clientSecret) {
        setErrorMessage("Payment cannot proceed: missing client secret from server.");
        setIsProcessing(false);
        return;
      }

      // Confirm the payment with Stripe using the client secret
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
      return_url: `${window.location.origin}/shop/order-success`,
    },
        redirect: "if_required",
      } as any);

      if (confirmError) {
        setErrorMessage(confirmError.message || "Payment confirmation failed.");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && onComplete) {
        onComplete(paymentIntent.id);
      }
      setIsProcessing(false);
      
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Payment error:", err);
      setIsProcessing(false);
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
            <strong>All sales are final.</strong> No refunds or exchanges.
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