"use client";
import Clarity from "@microsoft/clarity";
import React, { useEffect } from "react";

const MicrosoftClarity = () => {
  const projectId = "r3zeqhg403";
  useEffect(() => {
    try {
      Clarity.init(projectId);
    } catch (error) {
      console.error("Error initializing Microsoft Clarity:", error);
    }
  }, []);

  return null;
};

export default MicrosoftClarity;
