"use client";
import useApp from "@/context/useApp";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import ReCaptcha from "react-google-recaptcha";
import { CaptchaKey } from "@/lib/utils";
import SubmitBtn from "@/components/SubmitBtn";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 6 characters long" }),
});
type formType = z.infer<typeof schema>;

const LoginForm = () => {
  const { logIn, user } = useApp();
  const captchaRef: any = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isProd = process.env.NODE_ENV === "production";

  const onSubmit = async (values: formType) => {

    if(isProd){
      if (!captchaRef?.current) {
        setIsError(true);
        return;
      }
    }

    try {
      setErrorMessage([]);
      setIsError(false);

      let payload: any = {};
      //console.log("Executing captcha");
      // ✅ Execute captcha
      if(isProd){
      const token = await captchaRef.current?.executeAsync();

      if (!token) {
        console.log('No Token Found')
        setErrorMessage(["Captcha verification failed"]);
        setIsError(true);
        return;
      }

      captchaRef.current.reset();

      // ✅ Send token to backend
      payload = {
        ...values,
        token: token,
      };

      //console.log(payload)
    }else{
      payload = {
        ...values,
        token: 'any-string'
      };
    }

      const response: any = await logIn(payload);
      if (response && response?.succeeded) {
        setErrorMessage([]);
        setIsError(false);
        if (searchParams.get("rb")) {
          router.push(searchParams.get("rb") || "/");
        } else {
          router.push("/");
        }
      } else {
        setErrorMessage(response?.messages);
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(['Something went wrong. Please try again.'])
    }
  };
  useEffect(() => {
    if (user) {
      if (searchParams.get("rb")) {
        router.push(searchParams.get("rb") || "/");
      } else {
        router.push("/");
      }
    }
  }, [user]);
  console.log('NODE_ENV =>', isProd);
  console.log(errorMessage)
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] mx-auto">
        <h2 className="text-center mb-8 uppercase">Sign In</h2>
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
            <p className="py-2 text-red-400 font-medium  text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="input_label">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className="input--field"
            />
            <span
              className="absolute right-0 bottom-[6px] me-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye size={20} className="icon icon-eye" />
              ) : (
                <AiOutlineEyeInvisible size={20} className="icon icon-eye" />
              )}
            </span>
          </div>
          {errors?.password && (
            <p className="py-2 text-red-400 font-medium  text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>
        {errorMessage && errorMessage?.length > 0 && (
          <div className="form-errors mb-2 text-primary font-medium  text-sm">
            <ul>
              {errorMessage?.map((msg: any, i: any) => {
                return <li key={i}>{msg}</li>;
              })}
            </ul>
          </div>
        )}
        <div className="flex items-center justify-start md:justify-end mb-3 flex-col md:flex-row">
          <div className="w-full md:text-end">
            <Link
              href={{
                pathname: "/account/forgotpassword",
                query: { rb: searchParams.get("rb") || "/" },
              }}
              className="red"
            >
              Forgot password ?
            </Link>
          </div>
        </div>
        <ReCaptcha sitekey={CaptchaKey} ref={captchaRef} size="invisible" />
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            Captcha verification failed. Please try again.
          </p>
        )}

        <div className="mb-3">
          <SubmitBtn
            className="wrapper-input-box-login btn btn--primary btn--loading"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Sign in
          </SubmitBtn>
        </div>
        <div className="field">
          <span className="wrapper-create-account">
            <span>New on our platform? </span>
            <Link
              href={{
                pathname: "/account/signup",
                query: { rb: searchParams.get("rb") || "/" },
              }}
              className="red"
            >
              Create an account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
