"use client";

import useApp from "@/context/useApp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiExclamationCircle } from "react-icons/hi2";
import { useShopCart } from "../lib/shop-cart-context";
import { useCheckout } from "../lib/checkout-context";
import { buildCheckoutBody } from "../lib/checkoutPayload";
import { SHOP_ENDPOINTS } from "../lib/constants";
import StripeContainer from "./StripeContainer";
import ShopNav from "./ShopNav";

function formatMoney(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

async function postCheckout(body: unknown, organizerCode?: string) {
  const url = organizerCode
    ? `/api/shop/checkout?orgCode=${encodeURIComponent(organizerCode)}`
    : `/api/shop/checkout`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Checkout request failed with status ${response.status}: ${errorText}`,
    );
  }

  return response.json();
}

export default function ShopPaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToaster } = useApp();
  const {
    items,
    cartTotal,
    organizerCode: activeOrganizerCode,
    isHydrated,
    emptyCart,
  } = useShopCart();
  const { checkoutData } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [createdOrderResp, setCreatedOrderResp] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const organizerCode = searchParams.get("org") || activeOrganizerCode;

  // Create order on mount so backend can return clientSecret/payment info for Stripe
  useEffect(() => {
    let mounted = true;
    async function createOrder() {
      if (!checkoutData) return;
      try {
        const requestBody = buildCheckoutBody(items, checkoutData);
        const resp: any = await postCheckout(requestBody, organizerCode);
        console.log("Checkout Request:", requestBody);
        if (!mounted) return;

        if (resp?.succeeded === false) {
          const message = resp?.message || "Unable to prepare payment.";
          setApiError(message);
          setToaster("error", message);
          router.replace(
            organizerCode
              ? `/shop/organizers/${organizerCode}/checkout`
              : "/shop/checkout",
          );
          return;
        }

        setCreatedOrderResp(resp);

        // Try common locations for client secret in response
        const maybeClientSecret =
          resp?.data?.clientSecret ||
          resp?.data?.paymentScrect ||
          resp?.data?.paymentClientSecret ||
          resp?.data?.payment?.clientSecret ||
          resp?.clientSecret ||
          null;

        console.log("Checkout Response:", resp);
        console.log("Client Secret:", maybeClientSecret);
        if (maybeClientSecret) setClientSecret(maybeClientSecret);
      } catch (err) {
        console.error("Error creating order for payment:", err);
        // leave createdOrderResp null — CheckoutForm will block until clientSecret present
      }
    }
    createOrder();
    return () => {
      mounted = false;
    };
  }, [checkoutData, items, organizerCode]);

  const handleOrderComplete = async (paymentIntentId: string) => {
    setIsSubmitting(true);
    setApiError("");

    try {
      if (!checkoutData) throw new Error("Checkout data is missing");

      // Use the created order response if present, otherwise attempt to create order now
      let response = createdOrderResp;
      if (!response) {
        const requestBody = buildCheckoutBody(items, checkoutData);
        response = await postCheckout(requestBody, organizerCode);
      }

      const ref =
        response?.data?.id ||
        response?.data?.paymentId ||
        `SHOP-ORDER-${Date.now()}`;
      const paymentIntentToConfirm =
        response?.data?.paymentId || paymentIntentId;
      console.log("Order complete, confirming payment with backend", {
        ref,
        paymentIntentToConfirm,
        response,
      });

      // Confirm payment with backend
      try {
        const orderId = response?.data?.id || response?.data?.orderId || ref;
        const confirmUrl = organizerCode
          ? `/api/shop/checkout/confirm-payment?orgCode=${encodeURIComponent(organizerCode)}`
          : `/api/shop/checkout/confirm-payment`;

        const confirmRes = await fetch(confirmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            paymentIntentId: paymentIntentToConfirm,
          }),
        });

        const confirmJson = await confirmRes.json().catch(() => ({}));
        if (!confirmRes.ok) {
          console.warn("Confirm-Payment failed:", confirmJson);
          setToaster(
            "warning",
            confirmJson?.message || "Payment confirmation failed on server",
          );
        } else {
          console.log("Payment confirmed:", confirmJson);
        }
      } catch (err) {
        console.error("Error calling Confirm-Payment:", err);
        setToaster("warning", "Unable to confirm payment with server");
      }

      emptyCart();
      setToaster("success", "✅ Your order was created successfully.");

      router.push(
        `/shop/order-success?ref=${encodeURIComponent(ref)}${organizerCode ? `&org=${encodeURIComponent(organizerCode)}` : ""}`,
      );
    } catch (error) {
      console.error("Error completing order:", error);
      const errorMsg = error instanceof Error ? error.message : "Order failed.";
      setApiError(errorMsg);
      setToaster("error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelOrder = () => {
    setApiError("");
    setToaster("info", "Payment cancelled");
    router.back();
  };

  if (!isHydrated || !checkoutData) {
    return (
      <>
        <ShopNav />
        <div className="container flex min-h-[60vh] items-center justify-center px-4 py-20 text-center">
          <div className="flex flex-col items-center gap-3">
            <AiOutlineLoading3Quarters className="animate-spin text-[#F45B2A]" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading your order details...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ShopNav />
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 shop-animate-in">
        <div className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/shop/organizers"
              className="transition-colors hover:text-foreground"
            >
              Shop
            </Link>
            <span>/</span>
            <Link
              href={
                organizerCode
                  ? `/shop/organizers/${organizerCode}/checkout`
                  : "/shop/checkout"
              }
              className="transition-colors hover:text-foreground"
            >
              Checkout
            </Link>
            <span>/</span>
            <span className="text-foreground">Payment</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Payment Details
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose your payment method and review your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-sm:w-full max-sm:max-w-full max-sm:block">
          <div className="space-y-6 lg:col-span-2">
            {/* Customer Information Review */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                  1
                </span>
                Customer Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Name
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {checkoutData.firstName} {checkoutData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {checkoutData.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {checkoutData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Order Type
                  </p>
                  <p className="mt-1 text-sm font-medium capitalize text-foreground">
                    {checkoutData.type}
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-2 text-sm text-foreground">
                <p>{checkoutData.shipping.addrressName}</p>
                <p>{checkoutData.shipping.line1}</p>
                {checkoutData.shipping.line2 && (
                  <p>{checkoutData.shipping.line2}</p>
                )}
                <p>
                  {checkoutData.shipping.city}, {checkoutData.shipping.state}{" "}
                  {checkoutData.shipping.postalCode}
                </p>
                <p>{checkoutData.shipping.country}</p>
              </div>
            </section>

            {/* Billing Address */}
            {!checkoutData.isBillingSameAsShipping && (
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                    3
                  </span>
                  Billing Address
                </h2>
                <div className="space-y-2 text-sm text-foreground">
                  <p>{checkoutData.billing.addrressName}</p>
                  <p>{checkoutData.billing.line1}</p>
                  {checkoutData.billing.line2 && (
                    <p>{checkoutData.billing.line2}</p>
                  )}
                  <p>
                    {checkoutData.billing.city}, {checkoutData.billing.state}{" "}
                    {checkoutData.billing.postalCode}
                  </p>
                  <p>{checkoutData.billing.country}</p>
                </div>
              </section>
            )}

            {/* Payment Method */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                  {checkoutData.isBillingSameAsShipping ? "3" : "4"}
                </span>
                Payment Method
              </h2>

              <StripeContainer
                clientSecret={clientSecret}
                onComplete={handleOrderComplete}
                onCancelChange={handleCancelOrder}
                amount={cartTotal}
              />

              {/* Warning Message */}
              <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-700 border border-yellow-200">
                <HiExclamationCircle className="inline-block w-4 h-4 mr-2" />
                <strong>All ticket sales are final.</strong> No refunds or
                exchanges.
              </div>

              {/* Demo Mode Warning */}
              <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-700 border border-yellow-200">
                ⚠️ <strong>Demo Mode:</strong> No real payment will be
                processed. This is for testing purposes only.
              </div>
            </section>

            {/* Action Buttons */}
            <section className="flex gap-3">
              <button
                onClick={handleCancelOrder}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-neutral-50 disabled:bg-neutral-100 disabled:cursor-not-allowed"
              >
                Back
              </button>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-bold text-foreground">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto border-b border-neutral-200 pb-4 text-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="whitespace-nowrap font-semibold text-foreground">
                      {formatMoney(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-semibold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    {formatMoney(cartTotal)}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#F45B2A]">
                      {formatMoney(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {apiError && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {apiError}
                </div>
              )}

              {isSubmitting && (
                <div className="mt-4 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-600 flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Processing payment...
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
