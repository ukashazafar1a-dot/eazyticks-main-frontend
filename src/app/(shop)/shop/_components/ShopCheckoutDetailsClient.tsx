"use client";

import useApp from "@/context/useApp";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { buildCheckoutBody } from "../lib/checkoutPayload";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { useShopCart } from "../lib/shop-cart-context";
import { useCheckout } from "../lib/checkout-context";
import { normalizeResponse } from "@/lib/utils";
import type {
  CheckoutAddressPayload,
  CheckoutCustomerPayload,
} from "../lib/types";
import ShopNav from "./ShopNav";

type AddressPrefix = "customerInfo.shipping" | "customerInfo.billing";

const requiredAddressSchema = z.object({
  id: z.string(),
  isDefault: z.boolean().default(false),
  addrressName: z.string().min(1, "Address name is required"),
  company: z.string().optional(),
  line1: z.string().min(1, "Street address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const looseAddressSchema = z.object({
  id: z.string(),
  isDefault: z.boolean().default(false),
  addrressName: z.string().optional(),
  company: z.string().optional(),
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

const customerInfoSchema = z
  .object({
    id: z.string(),
    firstName: z.string().min(2, "Enter your first name"),
    lastName: z.string().min(2, "Enter your last name"),
    phone: z.string().min(8, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email address"),
    type: z.enum(["pickup", "delivery"], {
      errorMap: () => ({ message: "Order type is required" }),
    }),
    pickupTime: z.string().optional(),
    shipping: requiredAddressSchema,
    billing: looseAddressSchema,
    isBillingSameAsShipping: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    if (value.isBillingSameAsShipping) return;

    const requiredBillingFields = [
      ["addrressName", "Address name is required"],
      ["line1", "Street address is required"],
      ["city", "City is required"],
      ["state", "State is required"],
      ["postalCode", "Postal code is required"],
      ["country", "Country is required"],
    ] as const;

    for (const [field, message] of requiredBillingFields) {
      if (!String(value.billing[field] ?? "").trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: ["billing", field],
        });
      }
    }
  });

const checkoutDetailsSchema = z.object({
  customerInfo: customerInfoSchema,
  pickupDate: z.string().optional(),
  pickupClockTime: z.string().optional(),
});

type CheckoutDetailsFormData = z.infer<typeof checkoutDetailsSchema>;

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getDefaultAddress(): CheckoutAddressPayload {
  return {
    id: generateId(),
    isDefault: false,
    addrressName: "",
    company: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  };
}

function normalizeAddress(
  address: Partial<CheckoutAddressPayload>,
): CheckoutAddressPayload {
  return {
    id: address.id || generateId(),
    isDefault: Boolean(address.isDefault),
    addrressName: address.addrressName || "",
    company: address.company || "",
    line1: address.line1 || "",
    line2: address.line2 || "",
    city: address.city || "",
    state: address.state || "",
    postalCode: address.postalCode || "",
    country: address.country || "US",
  };
}

function formatMoney(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function combinePickupDateTime(date?: string, time?: string) {
  if (!date || !time) return "";
  const combined = new Date(`${date}T${time}`);
  return Number.isNaN(combined.getTime()) ? "" : combined.toISOString();
}

function getErrorMessage(
  errors: FieldErrors<CheckoutDetailsFormData>,
  path: string,
) {
  const parts = path.split(".");
  let current: unknown = errors;
  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof (current as { message?: unknown })?.message === "string"
    ? (current as { message: string }).message
    : undefined;
}

function Field({
  label,
  name,
  register,
  errors,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: Parameters<UseFormRegister<CheckoutDetailsFormData>>[0];
  register: UseFormRegister<CheckoutDetailsFormData>;
  errors: FieldErrors<CheckoutDetailsFormData>;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const message = getErrorMessage(errors, name);
  const fieldProps = register(name);

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} {required && <span className="text-[#F45B2A]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm text-foreground outline-none transition placeholder:text-neutral-400 focus:border-[#F45B2A]/60 focus:bg-white focus:ring-2 focus:ring-[#F45B2A]/15"
        {...fieldProps}
      />
      {message && (
        <p className="mt-1 text-xs font-medium text-red-500">{message}</p>
      )}
    </div>
  );
}

function AddressFields({
  title,
  prefix,
  register,
  errors,
}: {
  title: string;
  prefix: AddressPrefix;
  register: UseFormRegister<CheckoutDetailsFormData>;
  errors: FieldErrors<CheckoutDetailsFormData>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        label={`${title} name`}
        name={`${prefix}.addrressName`}
        register={register}
        errors={errors}
        required
        placeholder="Home, office, pickup desk"
      />
      <Field
        label="Company"
        name={`${prefix}.company`}
        register={register}
        errors={errors}
        placeholder="Optional"
      />
      <div className="md:col-span-2">
        <Field
          label="Street address"
          name={`${prefix}.line1`}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="md:col-span-2">
        <Field
          label="Apartment, suite, etc."
          name={`${prefix}.line2`}
          register={register}
          errors={errors}
          placeholder="Optional"
        />
      </div>
      <Field
        label="City"
        name={`${prefix}.city`}
        register={register}
        errors={errors}
        required
      />
      <Field
        label="State"
        name={`${prefix}.state`}
        register={register}
        errors={errors}
        required
      />
      <Field
        label="Postal code"
        name={`${prefix}.postalCode`}
        register={register}
        errors={errors}
        required
      />
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Country <span className="text-[#F45B2A]">*</span>
        </label>
        <select
          className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm text-foreground outline-none transition focus:border-[#F45B2A]/60 focus:bg-white focus:ring-2 focus:ring-[#F45B2A]/15"
          {...register(`${prefix}.country`)}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="PK">Pakistan</option>
        </select>
        {getErrorMessage(errors, `${prefix}.country`) && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {getErrorMessage(errors, `${prefix}.country`)}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ShopCheckoutDetailsClient({
  organizerCode,
  organizerName,
}: {
  organizerCode?: string;
  organizerName?: string;
}) {
  const router = useRouter();
  const { setToaster } = useApp();
  const {
    organizerCode: activeOrganizerCode,
    items,
    isEmpty,
    cartTotal,
    isHydrated,
    setActiveOrganizer,
  } = useShopCart();
  const { setCheckoutData } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  const checkoutOrganizerCode = organizerCode || activeOrganizerCode;
  const breadcrumbOrganizerLabel = organizerName || checkoutOrganizerCode;

  useEffect(() => {
    if (organizerCode) setActiveOrganizer(organizerCode);
  }, [organizerCode, setActiveOrganizer]);

  const defaultValues = useMemo<CheckoutDetailsFormData>(
    () => ({
      customerInfo: {
        id: generateId(),
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        type: "pickup",
        pickupTime: "",
        shipping: getDefaultAddress(),
        billing: getDefaultAddress(),
        isBillingSameAsShipping: true,
      },
      pickupDate: "",
      pickupClockTime: "",
    }),
    [],
  );

  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<CheckoutDetailsFormData>({
    resolver: zodResolver(checkoutDetailsSchema),
    defaultValues,
    mode: "onChange",
  });

  const isBillingSameAsShipping = watch("customerInfo.isBillingSameAsShipping");
  const customerInfo = watch("customerInfo");

  // Clear pickup fields when order type changes to Delivery
  useEffect(() => {
    if (customerInfo?.type === "delivery") {
      setValue("pickupDate", "");
      setValue("pickupClockTime", "");
    }
  }, [customerInfo?.type, setValue]);

  // Check if all required fields are filled
  const isFormValid = useMemo(() => {
    if (!isValid) return false;

    // Check required customer fields
    if (!customerInfo?.firstName?.trim()) return false;
    if (!customerInfo?.lastName?.trim()) return false;
    if (!customerInfo?.email?.trim()) return false;
    if (!customerInfo?.phone?.trim()) return false;

    // If delivery is selected, ensure shipping address is filled
    if (customerInfo?.type === "delivery") {
      if (!customerInfo?.shipping?.addrressName?.trim()) return false;
      if (!customerInfo?.shipping?.line1?.trim()) return false;
      if (!customerInfo?.shipping?.city?.trim()) return false;
      if (!customerInfo?.shipping?.state?.trim()) return false;
      if (!customerInfo?.shipping?.postalCode?.trim()) return false;
    }

    return true;
  }, [isValid, customerInfo]);

  const handleProcessToCheckout = async () => {
    if (!isFormValid) {
      setToaster("error", "Please fill in all required fields");
      return;
    }

    const formData = getValues();
    const pickupTime = combinePickupDateTime(
      formData.pickupDate,
      formData.pickupClockTime,
    );

    try {
      setIsProcessing(true);

      const shipping = normalizeAddress(formData.customerInfo.shipping || {});
      const billing = normalizeAddress(formData.customerInfo.billing || {});

      const checkoutData: CheckoutCustomerPayload = {
        ...formData.customerInfo,
        shipping,
        billing,
        pickupTime,
      };

      const body = buildCheckoutBody(items, {
        ...checkoutData,
        type: checkoutData.type === "pickup" ? "Pickup" : "Delivery",
      });

      const orgQuery = checkoutOrganizerCode || "";
      const res = await fetch(
        `/api/shop/checkout?orgCode=${encodeURIComponent(orgQuery)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const rawJson = await res.json().catch(() => ({}));
      const resJson = normalizeResponse(rawJson, res.status);

      console.log(
        "Checkout response:",
        rawJson,
        "normalized",
        resJson,
        "status",
        res.status,
      );

      setCheckoutData({
        ...checkoutData,
        serverResponse: rawJson,
      });

      const paymentPath = `/shop/payment${
        checkoutOrganizerCode
          ? `?org=${encodeURIComponent(checkoutOrganizerCode)}`
          : ""
      }`;

      console.log("Navigating to payment page:", paymentPath);
      try {
        router.push(paymentPath);
      } catch {
        window.location.assign(paymentPath);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An error occurred";
      setToaster("error", errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isHydrated) {
    return (
      <>
        <ShopNav />
        <div className="container flex min-h-[60vh] items-center justify-center px-4 py-20 text-center shop-animate-in">
          <div className="flex flex-col items-center gap-3">
            <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-[#F45B2A]" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading your cart...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        <ShopNav />
        <div className="container px-4 py-20 text-center shop-animate-in">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
              <svg
                className="h-10 w-10 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Nothing to checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add products from an organizer shop first.
            </p>
            <Link
              href={
                checkoutOrganizerCode
                  ? `/shop/organizers/${checkoutOrganizerCode}`
                  : "/shop/organizers"
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F45B2A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#e04d20]"
            >
              Browse Products
            </Link>
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
            {breadcrumbOrganizerLabel ? (
              <Link
                href={`/shop/organizers/${checkoutOrganizerCode}`}
                className="transition-colors hover:text-foreground"
              >
                {breadcrumbOrganizerLabel}
              </Link>
            ) : (
              <span>Cart</span>
            )}
            <span>/</span>
            <span className="text-foreground">Checkout Details</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details to complete your purchase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Order Items Section */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                  1
                </span>
                Order Items
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-neutral-100 py-3 last:border-0"
                  >
                    <div className="flex min-w-0 gap-3">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <img
                          src={item.image || "/productPlaceholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty {item.quantity}
                        </p>
                        {item.variantName && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                              Variant:
                            </span>{" "}
                            {item.variantName}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-sm font-bold text-foreground">
                      {formatMoney(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer Details Section */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                  2
                </span>
                Fill Customer Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="First name"
                  name="customerInfo.firstName"
                  register={register}
                  errors={errors}
                  required
                />
                <Field
                  label="Last name"
                  name="customerInfo.lastName"
                  register={register}
                  errors={errors}
                  required
                />
                <Field
                  label="Email"
                  name="customerInfo.email"
                  register={register}
                  errors={errors}
                  type="email"
                  required
                />
                <Field
                  label="Phone"
                  name="customerInfo.phone"
                  register={register}
                  errors={errors}
                  type="tel"
                  required
                />
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Order type <span className="text-[#F45B2A]">*</span>
                  </label>
                  <select
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm text-foreground outline-none transition focus:border-[#F45B2A]/60 focus:bg-white focus:ring-2 focus:ring-[#F45B2A]/15"
                    {...register("customerInfo.type")}
                  >
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                  </select>
                  {getErrorMessage(errors, "customerInfo.type") && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {getErrorMessage(errors, "customerInfo.type")}
                    </p>
                  )}
                </div>
                {customerInfo?.type === "pickup" && (
                  <>
                    <Field
                      label="Pickup date"
                      name="pickupDate"
                      register={register}
                      errors={errors}
                      type="date"
                    />

                    <Field
                      label="Pickup time"
                      name="pickupClockTime"
                      register={register}
                      errors={errors}
                      type="time"
                    />
                  </>
                )}
              </div>
            </section>

            {/* Shipping Address Section - show only for delivery orders */}
            {customerInfo?.type === "delivery" ? (
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                    3
                  </span>
                  Fill Shipping Address
                </h2>
                <AddressFields
                  title="Address"
                  prefix="customerInfo.shipping"
                  register={register}
                  errors={errors}
                />
              </section>
            ) : (
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                    3
                  </span>
                  Pickup information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pickup selected. Choose pickup date and time above.
                </p>
              </section>
            )}

            {/* Billing Address Section */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F45B2A]/10 text-[#F45B2A]">
                    4
                  </span>
                  Fill Billing Address
                </h2>
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={isBillingSameAsShipping}
                    onChange={(event) =>
                      setValue(
                        "customerInfo.isBillingSameAsShipping",
                        event.target.checked,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        },
                      )
                    }
                    className="h-4 w-4 accent-[#F45B2A]"
                  />
                  Same as shipping
                </label>
              </div>
              {!isBillingSameAsShipping && (
                <AddressFields
                  title="Billing address"
                  prefix="customerInfo.billing"
                  register={register}
                  errors={errors}
                />
              )}
            </section>

            {/* Action Buttons - Only show when form is valid */}
            {!isFormValid ? (
              <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 md:p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-yellow-900">
                    ⚠️ Please fill in all required fields to proceed to payment
                  </p>
                </div>
              </section>
            ) : (
              <section className="flex gap-3">
                <Link
                  href={
                    checkoutOrganizerCode
                      ? `/shop/organizers/${checkoutOrganizerCode}`
                      : "/shop/cart"
                  }
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-neutral-50"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleProcessToCheckout}
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#F45B2A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#e04d20] disabled:bg-neutral-300 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
                  )}
                </button>
              </section>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-bold text-foreground">
                Order Summary
              </h2>
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
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
