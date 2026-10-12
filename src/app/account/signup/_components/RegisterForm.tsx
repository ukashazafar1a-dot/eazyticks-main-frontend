"use client";
import useApp from "@/context/useApp";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserRequest } from "@/helpers/businessRequests";
import { useRouter } from "next/navigation";
import SubmitBtn from "@/components/SubmitBtn";
import { CaptchaKey } from "@/lib/utils";
import ReCaptcha from "react-google-recaptcha";

const schema = z
  .object({
    firstName: z.string().min(3, { message: "First name is required." }),
    lastName: z.string().min(3, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long",
      }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Confirm password doesn't match with password.",
      path: ["confirmPassword"],
    }
  );
type formType = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { setToaster, user, setUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>([]);
  const captchaRef: any = useRef(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const newPass = watch("password");

  const onSubmit = async (values: formType) => {
    if (!agreed) {
      setErrorMessage("Please agree to terms and conditions.");
      return;
    } else {
      setErrorMessage("");
    }
    if (!captchaRef?.current) return;
    try {
      setErrorMessage([]);
      setIsError(false);

      // ✅ Execute captcha
      const captchaToken = await captchaRef.current.executeAsync();
      

      if (!captchaToken) {
        setErrorMessage(["Captcha verification failed"]);
        setIsError(true);
        return;
      }

      captchaRef.current.reset();

      // ✅ Send token to backend
      const payload: any = {
        ...values,
        token: captchaToken,
      };

      const response = await registerUserRequest(payload);
      //console.log(response);
      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] ||
            "Your account has been created successfully. We have sent you email confirmatin link please check your email."
        );
        setUser(response?.data, true);
        setRegistered(true);
        setSuccessMessage(response?.messages[0]);
        setIsError(false);
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong!");
        setErrorMessage(response?.messages[0] || "Something went wrong!");
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
    <React.Fragment>
      {!registered ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[600px] mx-auto"
        >
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
              Create Your Account
            </h2>
            <p className="text-muted-foreground text-sm">
              Join us today and unlock access to exclusive features.
            </p>
          </div>
          <div className="flex items-start justify-center flex-col md:flex-row gap-0 md:gap-2 w-full">
            <div className="mb-3 basis-full md:basis-1/2 w-full">
              <label htmlFor="firstName" className="input_label">
                First Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="on"
                className="input--field"
                {...register("firstName")}
                placeholder="Enter your first name"
              />
              {errors?.firstName && (
                <p className="py-2 text-red-400 font-semibold text-sm">
                  {errors?.firstName?.message}
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
                {...register("lastName")}
                placeholder="Enter your last name"
              />
              {errors?.lastName && (
                <p className="py-2 text-red-400 font-semibold text-sm">
                  {errors?.lastName?.message}
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
              placeholder="Enter your email"
              className="input--field"
              {...register("email")}
            />
            {errors?.email && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div
            className={`flex items-center justify-center flex-col md:flex-row gap-0 md:gap-2 w-full`}
          >
            <div className="mb-3 password  basis-full md:basis-1/2 w-full">
              <label htmlFor="password" className="input_label">
                Password <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="input--field"
                  {...register("password")}
                />
                <span
                  className="absolute right-0 bottom-[6px] me-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} className="icon icon-eye" />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="icon icon-eye"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-3 password  basis-full md:basis-1/2 w-full">
              <label htmlFor="c-password" className="input_label">
                Confirm Password <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="c-password"
                  placeholder="Enter your password"
                  className="input--field"
                  {...register("confirmPassword")}
                />
                <span
                  className="absolute right-0 bottom-[6px] me-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} className="icon icon-eye" />
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
          {newPass?.length > 3 || errors?.password ? (
            <div className="py-1 basif-full w-full">
              <p className="text-xs text-gray-700">
                Least 8 characters, at least one number (0-9) or symbol, and a
                combination of lowercase (a-z) and uppercase (A-Z).
              </p>
            </div>
          ) : (
            <></>
          )}
          {errors?.password && (
            <p className="py-1 text-red-400 font-medium text-sm  basif-full w-full mb-0">
              {errors?.password?.message}
            </p>
          )}
          {errors?.confirmPassword && (
            <p className="py-1 text-red-400 font-medium text-sm  basif-full w-full mb-0">
              {errors?.confirmPassword?.message}
            </p>
          )}
          <div className="mb-3">
            <div className="flex items-center justify-start gap-1 w-full">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={agreed}
                className="checkbox--field"
                onChange={(e) => setAgreed(!agreed)}
              />
              <label htmlFor="remember" className="cursor-pointer">
                I agree to{" "}
                <Link
                  className="underline underline-offset-2"
                  href={"/policies/terms-conditions"}
                >
                  Terms Condition
                </Link>{" "}
                &{" "}
                <Link
                  href="/policies/privacy-policy"
                  className="underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          {errorMessage && (
            <div className="form-errors mb-2 text-primary  font-medium text-sm">
              {errorMessage}
            </div>
          )}
          <ReCaptcha sitekey={CaptchaKey} ref={captchaRef} size="invisible" />
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              Captcha verification failed. Please try again.
            </p>
          )}
          <div className="mb-3">
            <SubmitBtn
              loading={isSubmitting}
              type="submit"
              disabled={isSubmitting}
            >
              Register
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
      ) : (
        <div className="wrapper-success py-8">
          <div className="max-w-[600px] mx-auto">
            <h2 className="h3 mb-2 uppercase">Successfully Registered</h2>
            <p className="wrapper-success__text mb-6 text-gray-600">
              {successMessage
                ? successMessage
                : `Your account has been created successfully. We have sent you email confirmation link. please check your email.`}
            </p>
            <Link href={"/account/signin"} className="btn btn--primary">
              Sign In now
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
