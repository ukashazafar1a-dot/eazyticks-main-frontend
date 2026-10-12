"use client";
import React, { useEffect } from "react";
import useApp from "@/context/useApp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isDeviceMobile } from "@/helpers/generals";
import Link from "next/link";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneSvg from "./PhoneSvg";
import SubmitBtn from "@/components/SubmitBtn";
import { usePathname } from "next/navigation";
import PhoneNumberField from "@/components/PhoneNumberField";

interface FunctionProps {
  open?: any;
  closemodel?: any;
  handlePlaceOrder?: any;
}

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phoneNumber: z.string().nullable().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    confirmEmail: z.string().email(),
    agree: z.boolean(), // agree must be true
    receiveSms: z.boolean(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email and confirm email must match",
    path: ["confirmEmail"],
  });

type formType = z.infer<typeof schema>;
const scrollToDiv = (divId: string) => {
  const element = document.getElementById(divId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // Smooth scroll
      block: "start", // Align the top of the div with the top of the viewport
    });
  }
};
function RefundPolicyModal({
  open,
  closemodel,
  handlePlaceOrder,
}: FunctionProps) {
  const { isLoggedIn, userProfile, changeEmail } = useApp();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    getValues,
    setError,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userProfile?.firstName ? userProfile?.firstName : "",
      lastName: userProfile?.lastName ? userProfile?.lastName : "",
      phoneNumber: null,
      email: userProfile?.email ? userProfile?.email : "",
      confirmEmail: userProfile?.email ? userProfile?.email : "",
      agree: false,
      receiveSms: false,
    },
  });
  const pathname = usePathname();

  const handleProceed = () => {
    handlePlaceOrder();
    closemodel(false);
    if (isDeviceMobile()) {
      scrollToDiv(".stripe-form-custom");
    }
  };

  const onSubmit = async (data: formType) => {
    //console.log("Form submitted:", data);
    if (data.agree !== true) {
      setError("agree", {
        type: "manual",
        message: "You need to agree to the terms and conditions before proceeding.",
      });
      return;
    }
    const user = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    };
    await changeEmail(user);
    handlePlaceOrder(user);
    closemodel(false);
    if (isDeviceMobile()) {
      scrollToDiv(".stripe-form-custom");
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        firstName: userProfile?.firstName ? userProfile?.firstName : "",
        lastName: userProfile?.lastName ? userProfile?.lastName : "",
        phoneNumber: null,
        email: userProfile?.email ? userProfile?.email : "",
        confirmEmail: userProfile?.email ? userProfile?.email : "",
        agree: false,
        receiveSms: false,
      });
    }
  }, [open]);

  //console.log(getValues());
  return (
    <Dialog open={open} onOpenChange={(open) => closemodel(open)}>
      <DialogContent
        className="max-w-xl checkout-popup p-0 md:p-6 gap-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-4 md:p-0">
          <DialogTitle className="font-bold text-xl">
            {isLoggedIn ? "Billing Information" : "Billing Information"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 overflow-y-auto smart-scrollbar max-h-full px-4 md:px-0">
          {!isLoggedIn && (
            <p className="py-1 text-sm">
              <Link
                href={`/account/signin?rb=${pathname}`}
                className="red underline"
              >
                Login
              </Link>{" "}
              for better experience.
            </p>
          )}
          <form className="refund-policy-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-start gap-2 mb-1 flex-row">
              <div className="field full-name mb-2 basis-full w-full md:basis-1/2">
                <label
                  htmlFor="first_name"
                  className="font-medium mb-1 input_label"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  {...register("firstName")}
                  autoFocus={false}
                  placeholder="Enter your First Name"
                  className="input--field rounded-md"
                  tabIndex={0}
                />
                {errors?.firstName && (
                  <p className="py-1 text-red-400 font-medium text-sm">
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>
              <div className="field full-name mb-2 basis-full w-full md:basis-1/2">
                <label
                  htmlFor="last_name"
                  className="font-medium mb-1 input_label"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  autoFocus={false}
                  placeholder="Enter Your Last Name"
                  className="input--field rounded-md"
                  {...register("lastName")}
                  tabIndex={0}
                />
                {errors?.lastName && (
                  <p className="py-1 text-red-400 font-medium text-sm">
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
            </div>
            {!isLoggedIn && (
              <>
                <div className="flex items-start justify-start gap-2 mb-2 flex-col md:flex-row">
                  <div className="basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="email"
                      className="font-medium mb-1 input_label"
                    >
                      Email<span className="red"> *</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter Your Email"
                      className="input--field email rounded-md"
                      {...register("email")}
                      disabled={isLoggedIn}
                      readOnly={isLoggedIn}
                    />
                    {errors?.email && (
                      <p className="py-1 text-red-400 font-medium text-sm">
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="confirmEmail"
                      className="font-medium mb-1 input_label"
                    >
                      Confirm Email<span className="red"> *</span>
                    </label>
                    <input
                      type="email"
                      id="confirmEmail"
                      placeholder="Enter Your Confirm Email"
                      className="input--field email rounded-md"
                      {...register("confirmEmail")}
                      disabled={isLoggedIn}
                      readOnly={isLoggedIn}
                    />
                    {errors?.confirmEmail && (
                      <p className="py-1 text-red-400 font-medium text-sm">
                        {errors?.confirmEmail?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumberField
                        label="Phone"
                        value={field.value ?? undefined}
                        onChange={(val) => field.onChange(val ?? null)}
                      />
                    )}
                  />
                </div>
              </>
            )}
            <div className="text-sm mb-3 p-2 border border-gray-200 rounded-md bg-slate-50">
              <span className="red font-bold">Please Note: </span>
              <strong>
                {" "}
                All sales are final, and except for cancelled events, you will
                not receive a refund for any completed purchase.
              </strong>
            </div>
            <div className="py-2">
              {!isLoggedIn && (
                <div className="flex items-start justify-start gap-2 w-100 mb-3">
                  <input
                    className="checkbox--field mt-0.5"
                    type="checkbox"
                    checked={watch("receiveSms") || false}
                    id="receiveSms"
                    onChange={(e) => setValue("receiveSms", e.target.checked)}
                  />
                  <label
                    htmlFor="receiveSms"
                    className="cursor-pointer text-sm"
                  >
                    I agree to receive order updates and important notifications
                    via SMS.
                  </label>
                </div>
              )}
              <div className="flex items-start justify-start gap-2 w-100 mb-3">
                <input
                  className="checkbox--field mt-2"
                  type="checkbox"
                  checked={watch("agree")}
                  id="flexCheckChecked"
                  required
                  onChange={(e) => setValue("agree", e.target.checked)}
                />
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="flexCheckChecked"
                >
                  <p>
                    I have read and agree to the Eazy Ticks{" "}
                    <Link
                      href="/policies/terms-conditions"
                      className="underline text-primary"
                    >
                      Terms & Conditions{" "}
                    </Link>
                    and{" "}
                    <Link
                      href="/policies/refund-policy"
                      className="underline text-primary"
                    >
                      Refund Policy
                    </Link>
                    . I understand all sales are final and non-refundable.
                  </p>
                </label>
              </div>
              {errors?.agree && (
                <p className="py-1 text-red-400 font-medium text-sm">
                  {errors?.agree?.message}
                </p>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={(e) => closemodel(false)}
                >
                  Close
                </button>
                <SubmitBtn
                  type="button"
                  loading={isSubmitting}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Pay Now
                </SubmitBtn>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RefundPolicyModal;
