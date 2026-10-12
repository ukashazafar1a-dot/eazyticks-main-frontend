"use client";
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);
type props = {
  clientSecret?: string | null;
  onComplete?: (paymentIntentId: string) => void;
  onCancelChange?: () => void;
  amount: number;
};
const StripeContainer = ({ clientSecret, onComplete, onCancelChange, amount }: props) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const handleCancelOrder = () => {
    setIsCanceling(true);
    if (onCancelChange) {
      onCancelChange();
    }
    setIsCanceling(false);
  };
  const baseAppearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#F45B2A',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      borderRadius: '12px',
    },
  };

  const options: any = clientSecret
    ? {
        clientSecret,
        appearance: baseAppearance,
      }
    : {
        mode: 'payment' as const,
        amount: Math.max(1, Math.round(amount * 100)) || 100, // Amount in cents
        currency: 'usd',
        appearance: baseAppearance,
      };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        handleCancelOrder={handleCancelOrder}
        isCanceling={isCanceling}
        onComplete={onComplete}
        clientSecret={clientSecret}
        amount={amount}
      />
    </Elements>
  );
};

export default StripeContainer;