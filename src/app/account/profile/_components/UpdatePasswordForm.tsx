"use client";
import React, { useState } from "react";
import axiosAuthRequest from "@/helpers/axiosAuthRequest";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BiError } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import SubmitBtn from "@/components/SubmitBtn";

const UpdatePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [newPasswordErrors, setNewPasswordErrors] = useState([]);
  const [confirmNewPasswordErrors, setConfirmNewPasswordErrors] = useState([]);
  async function updatePassword(
    password: any,
    newPassword: any,
    confirmNewPassword: any
  ) {
    return await axiosAuthRequest.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/changepassword",
      {
        password,
        newPassword,
        confirmNewPassword,
      }
    );
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: response } = await updatePassword(
        currentPassword,
        password,
        confirmPassword
      );
      if (response && response?.succeeded) {
        setIsLoading(false);
        setSuccessMessage(response?.messages[0]);
        setPasswordErrors([]);
        setNewPasswordErrors([]);
        setConfirmNewPasswordErrors([]);
        setErrorMessage("");
      } else {
        setIsLoading(false);
        setErrorMessage(response?.messages[0]);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage("Something went wrong!");
    }
  }

  return (
    <div className="max-w-screen-md me-auto">
      <div className="wrapper-form py-8">
        <form className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="wrapper-logo-heading">
            <h2 className="sm:text-3xl text-2xl font-bold mb-4">
              Update Password
            </h2>
          </div>
          {errorMessage !== "" && (
            <Alert variant={"error"}>
              <BiError />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription> {errorMessage}</AlertDescription>
            </Alert>
          )}

          {successMessage !== "" && (
            <Alert>
              <BiError />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <div className="field relative mb-3 mt-3">
            <label
              htmlFor="password"
              className="input_label font-medium mb-1 input_label"
            >
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
              placeholder="Enter your password"
              className="input--field input--field rounded-md"
              required
            />
            <span
              className="absolute right-2 bottom-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOutline className="icon icon-eye" />
              ) : (
                <IoEyeOffOutline className="icon icon-eye" />
              )}
            </span>
          </div>
          {passwordErrors.length > 0 && (
            <div className="form-erros">
              <ul>
                {passwordErrors.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="field-group">
            <div className="field  relative mb-3">
              <label
                htmlFor="password"
                className="input_label font-medium mb-1 input_label"
              >
                Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Enter your password"
                className="input--field input--field rounded-md"
                required
              />
              <span
                className="absolute right-2 bottom-2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <IoEyeOutline className="icon icon-eye" />
                ) : (
                  <IoEyeOffOutline className="icon icon-eye" />
                )}
              </span>
            </div>
            {newPasswordErrors.length > 0 && (
              <div className="form-erros">
                <ul>
                  {newPasswordErrors.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </div>
            )}
            <div className="field  relative mb-3">
              <label
                htmlFor="c-password"
                className="input_label font-medium mb-1 input_label"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="c-password"
                id="c-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                placeholder="Enter your password"
                className="input--field input--field rounded-md"
                required
              />
              <span
                className="absolute right-2 bottom-2 cursor-pointer"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                {showConfirmNewPassword ? (
                  <IoEyeOutline className="icon icon-eye" />
                ) : (
                  <IoEyeOffOutline className="icon icon-eye" />
                )}
              </span>
            </div>
          </div>
          {confirmNewPasswordErrors.length > 0 && (
            <div className="form-erros">
              <ul>
                {confirmNewPasswordErrors.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="field">
            <SubmitBtn loading={isLoading} disabled={isLoading}>
              Update Password
            </SubmitBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
