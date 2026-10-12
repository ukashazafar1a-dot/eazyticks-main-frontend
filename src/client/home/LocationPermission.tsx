"use client";
import { useTheme } from "@/context/ThemeContext";
import React, { useState, useEffect } from "react";

const LocationPermission = () => {
  const [show, setShow] = useState(false);
  const { setPreciseLocation, location, isLocPermissionGranted } = useTheme();

  const requestLocation = async () => {
    const result = await setPreciseLocation();
    if (result) {
      setShow(false);
    }else{
      setShow(true);
    }
  };

  useEffect(() => {
    if (!isLocPermissionGranted) {
      setShow(true);
    }
  }, [isLocPermissionGranted]);

  if (!show) return null; // don’t render widget unless permission denied

  return (
    <div className="p-4 text-left">
      <p className="text-sm text-gray-700 mb-2">
        We couldn’t access your location. Enable location to see events near
        you.
      </p>
      <button
        onClick={requestLocation}
        className="btn btn--primary btn--small !shadow-none px-3 py-0.5 text-xs"
      >
        Grant Location Access
      </button>
    </div>
  );
};

export default LocationPermission;
