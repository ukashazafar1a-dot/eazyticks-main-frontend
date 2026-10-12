"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string;
  loading?: boolean;
  type?: "submit" | "reset" | "button";
  classes?: string;
}
const SubmitBtn: React.FC<ButtonProps> = ({
  children,
  loading,
  type = "submit",
  classes,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`btn ${classes ? classes : "btn--primary"}`}
    >
      <span className={`${loading ? "me-3" : ""}`}>{children}</span>
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white" />
      )}
    </button>
  );
};

export default SubmitBtn;
