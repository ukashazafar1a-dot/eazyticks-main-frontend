"use client";
import LoadingSvg from "@/components/LoadingSvg";
import useApp from "@/context/useApp";
import { resetPassword } from "@/helpers/businessRequests";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<any>([]);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<any>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { setToaster,user } = useApp();
  const router = useRouter();

  const checkValidation = () => {
    let isValid = true;

    if (!password) {
      setPasswordErrors(["The Password field is required!"]);
      isValid = false;
    } else {
      setPasswordErrors([]);
    }

    if (!confirmPassword) {
      setConfirmPasswordErrors(["The Confirm Password field is required"]);
      isValid = false;
    } else {
      setConfirmPasswordErrors([]);
    }

    if (password !== confirmPassword) {
      setPasswordErrors(["Password and Confirm password must match!"]);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!checkValidation()) return;
    setBtnLoading(true);
    const email = searchParams?.get("email");
    const code = searchParams?.get("code");
    try {
      const { data: response }: any = await resetPassword(
        email,
        password,
        code
      );
      //console.log(response);
      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] || "Password updated successfully."
        );
        setSuccessMessage(response?.messages[0]);
        setBtnLoading(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong!");
        setBtnLoading(false);
      }
    } catch (error) {
      const { response }: any = error;
      setBtnLoading(false);
      if (response?.data?.status === "Error") {
        const { object } = response?.data;
        let PassErrors: any = [];
        object?.forEach((item: any) => {
          PassErrors?.push(item?.description);
        });
        if (PassErrors?.length) setPasswordErrors(PassErrors);
        setConfirmPasswordErrors([]);
      }
    }
    // send login request to server
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
        <h2 className="text-center mb-6 uppercase">Reset Password</h2>
        {successMessage && (
          <div className="py-4 font-medium text-green-600 px-2 border-green-300 border rounded mb-2">
            {successMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="password" className="input_label">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
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
        </div>
        {passwordErrors.length > 0 && (
          <div className="form-erros mb-3">
            <ul>
              {passwordErrors.map((item: any, i: any) => {
                return (
                  <li key={i} className="text-primary font-medium">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="password" className="input_label">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              placeholder="Enter confirm password"
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
        </div>
        {confirmPasswordErrors.length > 0 && (
          <div className="form-erros mb-3">
            <ul>
              {confirmPasswordErrors.map((item: any, i: any) => {
                return (
                  <li key={i} className="text-primary font-medium">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="mb-3">
          <button
            className="input--field-login btn btn--primary btn--loading"
            type="submit"
            disabled={btnLoading}
          >
            <span>Update Now</span>
            {btnLoading && (
              <span>
                <LoadingSvg />
              </span>
            )}
          </button>
        </div>
        <div className="field">
          <span className="wrapper-create-account">
            <span>Already Remember the password? </span>
            <Link href={"/account/signin"} className="red">
              Sign In Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
