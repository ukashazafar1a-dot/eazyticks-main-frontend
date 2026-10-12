"use client";
import ExpiredToken from "@/components/ExpiredToken";
import useApp from "@/context/useApp";
import React from "react";

const TokenExpiry = () => {
  const { tokenExpired } = useApp();
  if (tokenExpired) {
    return <ExpiredToken />;
  } else {
    return <></>;
  }
};

export default TokenExpiry;
