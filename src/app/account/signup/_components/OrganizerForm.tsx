"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { GrLinkNext } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useApp from "@/context/useApp";
import { useRouter } from "next/navigation";
import {
  AnimateStep,
  AnimateSteps,
  AnimateWrapper,
} from "@/components/ui/animate-step";
import { organizerAPIUrl } from "@/lib/utils";
import { CaptchaKey } from "@/lib/utils";
import ReCaptcha from "react-google-recaptcha";

const schema = z
  .object({
    fName: z.string().min(3, { message: "First name is required." }),
    lName: z.string().min(3, { message: "Last name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    organizerName: z.string().min(3, { message: "Organizer name is required" }),
    address: z.string().min(3, { message: "Address is required" }),
    description: z.string().nullable(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password and confirm password must match!",
      path: ["confirmPassword"],
    }
  );

type formType = z.infer<typeof schema>;
interface User {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Organization {
  organizerName: string;
  address: string;
  description: string | null;
}

interface MainObject {
  user: User;
  organization: Organization;
  token?: string;
}

const transformToNestedObject = (
  flatObj: formType,
  token: string = ""
): MainObject => {
  const {
    fName,
    lName,
    email,
    password,
    confirmPassword,
    organizerName,
    address,
    description,
  } = flatObj;

  return {
    user: {
      fName,
      lName,
      email,
      password,
      confirmPassword,
    },
    organization: {
      organizerName,
      address,
      description,
    },
    token,
  };
};

type props = {
  onStepChange: (step: 1 | 2) => void;
};

const OrganizerForm = ({ onStepChange }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    getFieldState,
    trigger,
    clearErrors,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizerName: "",
      address: "",
      description: null,
    },
  });
  const [step, setStep] = useState<0 | 1>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const newPass = watch("password");
  const router = useRouter();
  const { setToaster } = useApp();
  const captchaRef: any = useRef(null);
  const [isError, setIsError] = useState(false);

  const validateFields = async () => {
    const result = await trigger([
      "fName",
      "lName",
      "email",
      "password",
      "confirmPassword",
    ]);
    return result;
  };
  const onSubmit = async (data: formType) => {
    if (!captchaRef?.current) return;

    try {
      setBtnLoading(true);
      setIsError(false);

      // ✅ Execute captcha
      const captchaToken = await captchaRef.current.executeAsync();
      

      if (!captchaToken) {
        setIsError(true);
        return;
      }

      captchaRef.current.reset();

      const form = transformToNestedObject(data, captchaToken);
      const response: any = await fetch(`${organizerAPIUrl}/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      //console.log(result);
      if (result && result.succeeded) {
        setBtnLoading(false);
        setIsError(false);
        setToaster(
          "success",
          result?.messages[0] || "Registration Successful!"
        );
        router.push("/account/signin");
        router.refresh();
      } else {
        setBtnLoading(false);
        setToaster("error", result?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };
  const handleOnClick = async () => {
    const result = await trigger(["address", "organizerName", "description"]);
    if (result) {
      handleSubmit(onSubmit);
    }
  };
  const handleNextStep = async () => {
    if (step === 0) {
      const result = await validateFields();
      if (result) {
        setBtnLoading(true);
        setTimeout(() => {
          setStep(1);
          setBtnLoading(false);
          onStepChange(2);
        }, 500);
      }
    } else {
    }
  };
  return (
    <>
      <div className="max-w-[600px] mx-auto w-full">
        <div className="text-left mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            Register Organizer Account!
          </h2>
          <p className="text-muted-foreground text-sm">
            Effortlessly create, manage, and promote events to a wide audience.
          </p>
        </div>
        <div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <ReCaptcha sitekey={CaptchaKey} ref={captchaRef} size="invisible" />
            {isError && (
              <p className="text-red-500 text-sm mt-2">
                Captcha verification failed. Please try again.
              </p>
            )}
            <AnimateSteps>
              <AnimateWrapper
                step={step}
                className="md:min-w-96 mx-auto w-full transition-all duration-300 ease-linear"
              >
                <AnimateStep>
                  <fieldset>
                    <div className="flex items-start justify-center flex-col md:flex-row gap-2 w-full">
                      <div className="mb-3 basis-full md:basis-1/2 w-full">
                        <label htmlFor="firstName" className="input_label">
                          First Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          autoComplete="on"
                          className="input--field"
                          {...register("fName")}
                          placeholder="Enter your first name"
                        />
                        {errors?.fName && (
                          <p className="py-2 text-red-400 font-semibold text-sm">
                            {errors?.fName?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 basis-full md:basis-1/2 w-full">
                        <label htmlFor="lastName" className="input_label">
                          Last Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          autoComplete="on"
                          className="input--field"
                          {...register("lName")}
                          placeholder="Enter your last name"
                        />
                        {errors?.lName && (
                          <p className="py-2 text-red-400 font-semibold text-sm">
                            {errors?.lName?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="input_label">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input--field"
                        {...register("email")}
                        placeholder="Enter your email"
                      />
                      {errors?.email && (
                        <p className="py-2 text-red-400 font-semibold text-sm">
                          {errors?.email?.message}
                        </p>
                      )}
                    </div>
                    <div
                      className={`flex items-center justify-center flex-col md:flex-col gap-0 w-full ${
                        step == 0 ? "active-h" : "inactive-h"
                      }`}
                    >
                      <div className="mb-3 password basis-full md:basis-1/2 w-full">
                        <label htmlFor="password" className="input_label">
                          Password <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="input--field"
                            {...register("password")}
                          />
                          <span
                            className="absolute right-0 bottom-[8px] me-2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEye
                                size={20}
                                className="icon icon-eye"
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                size={20}
                                className="icon icon-eye"
                              />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3 password basis-full md:basis-1/2 w-full">
                        <label htmlFor="cpassword" className="input_label">
                          Confirm Password{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="cpassword"
                            autoComplete="on"
                            className="input--field"
                            {...register("confirmPassword")}
                          />
                          <span
                            className="absolute right-0 bottom-[8px] me-2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEye
                                size={20}
                                className="icon icon-eye"
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                size={20}
                                className="icon icon-eye"
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {errors?.password && (
                      <p className="pt-2 text-red-400 font-medium text-sm">
                        {errors?.password?.message}
                      </p>
                    )}
                    {errors?.confirmPassword && (
                      <p className="pb-2 text-red-400 font-medium text-sm">
                        {errors?.confirmPassword?.message}
                      </p>
                    )}
                    {newPass?.length > 3 &&
                      newPass?.length <= 6 &&
                      !errors?.password && (
                        <div className="py-2">
                          <p className="text-xs text-gray-700">
                            Least 8 characters, at least one number (0-9) or
                            symbol, and a combination of lowercase (a-z) and
                            uppercase (A-Z).
                          </p>
                        </div>
                      )}
                    <div className="mb-3 flex items-center justify-between">
                      <button
                        className="btn btn--primary btn--loading w-full !shadow-none"
                        type={"button"}
                        onClick={() => handleNextStep()}
                      >
                        <span>Proceed</span>
                        {btnLoading ? (
                          <AiOutlineLoading3Quarters className="icon icon-loading animate-spin" />
                        ) : (
                          <GrLinkNext className="icon icon-next fill-white" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                </AnimateStep>
                <AnimateStep>
                  <fieldset
                    className={`flex md:block items-center justify-center flex-col w-full ${
                      step == 1 ? "h-full" : "h-0"
                    } transition-all duration-300`}
                  >
                    <div className="mb-3 block w-full">
                      <label htmlFor="organizationName" className="input_label">
                        Organizer Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="organizationName"
                        autoComplete="on"
                        className="input--field"
                        {...register("organizerName")}
                        placeholder="Enter your organization name"
                      />
                      {errors?.organizerName && (
                        <p className="py-1 text-red-400 font-semibold text-sm">
                          {errors?.organizerName?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3 block w-full">
                      <label htmlFor="address" className="input_label">
                        Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        autoComplete="on"
                        className="input--field"
                        {...register("address")}
                        placeholder="Enter your address"
                      />
                      {errors?.address && (
                        <p className="py-1 text-red-400 font-semibold text-sm">
                          {errors?.address?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3 block w-full">
                      <label htmlFor="description" className="input_label">
                        Description <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        className="input--field"
                        {...register("description")}
                        placeholder="Enter your description"
                      ></textarea>
                      {errors?.description && (
                        <p className="py-1 text-red-400 font-semibold text-sm">
                          {errors?.description?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3 w-full flex items-center justify-between">
                      <button
                        className="btn btn--secondary"
                        type="button"
                        onClick={() => setStep(0)}
                      >
                        Prev
                      </button>

                      <button
                        className="btn btn--primary btn--loading"
                        type={"submit"}
                        onClick={() => handleOnClick()}
                        disabled={btnLoading}
                      >
                        <span>{"Submit"}</span>

                        {btnLoading && (
                          <AiOutlineLoading3Quarters className="icon icon-loading animate-spin" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                </AnimateStep>
              </AnimateWrapper>
            </AnimateSteps>
          </form>
          <div className="mb-2 text-center">
            <span>Already have an account? </span>
            <Link href={"/account/login"} className="red">
              Sign In
            </Link>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href={`/policies/terms-conditions`}
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={`/policies/privacy-policy`}
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default OrganizerForm;
