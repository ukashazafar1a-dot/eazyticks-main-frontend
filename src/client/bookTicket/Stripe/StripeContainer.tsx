"use client";
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

type props = {
  setActiveStage?: any,
  slug: any,
  onCancelChange?: any,
  onComplete?:any;
};
const StripeContainer = ({ setActiveStage, slug, onCancelChange,onComplete }: props) => {
  const { clientSecret, cancelOrder, setClientSecret, setToaster } = useApp();
  const [isCanceling, setIsCanceling] = useState(false);
  const router = useRouter();
  const options = {
    clientSecret: clientSecret ? clientSecret : '',
  };

  async function handleCancelOrder() {
    setIsCanceling(true);
    try {
      const { data:response }:any = await cancelOrder();
      if(response && response?.succeeded){
        setClientSecret(null);
        router.push("/events/" + slug);
        setToaster("success", response?.messages[0] || "Order cancelled successfully!");
      }else{
        setClientSecret(null);
        setToaster("error", response?.messages[0] || "Something went wrong!");
        router.push("/events/" + slug);
      }
      if (onCancelChange) {
        onCancelChange();
      }
      setIsCanceling(false);
    } catch (error) {
      setIsCanceling(false);
    }
  }
  if(!clientSecret) return;
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        handleCancelOrder={handleCancelOrder}
        isCanceling={isCanceling}
        slug={slug}
        onComplete={onComplete}
      />
    </Elements>
  );
};

export default StripeContainer;
