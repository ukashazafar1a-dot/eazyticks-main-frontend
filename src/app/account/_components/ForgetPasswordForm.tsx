"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSvg from "@/components/LoadingSvg";
import useApp from "@/context/useApp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "@/components/SubmitBtn";
import fetchClient from "@/helpers/fetchClient";

const schema = z.object({
  email: z.string().email(),
});
type formType = z.infer<typeof schema>;
const apiURl = `${baseURL}/Auth/ForgotPassword`;

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { setToaster, user } = useApp();
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: formType) => {
    try {
      const response = await fetchClient(apiURl, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] ||
            "Please check you email for reset password instructions."
        );
        setSuccessMessage(response?.messages[0]);
        reset();
      } else {
        setSuccessMessage("");
        setToaster("error", response?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="wrapper-form">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] mx-auto">
        <h2 className="text-center mb-8 uppercase">Confirm Email</h2>
        {successMessage && (
          <p className="py-4 font-medium text-green-600 px-2 border-green-300 border rounded mb-2">
            {successMessage}
          </p>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className="input--field"
          />
          {errors?.email && (
            <p className="py-2 text-primary font-medium text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <SubmitBtn
            loading={isSubmitting}
            disabled={isSubmitting}
            className="uppercase"
          >
            Send confirmation
          </SubmitBtn>
        </div>
        <div className="field">
          <span className="wrapper-create-account">
            <span>Already Have an account? </span>
            <Link href={"/account/signin"} className="red">
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
