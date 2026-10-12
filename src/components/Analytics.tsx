import { Site } from "@/helpers/Site";
import React from "react";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const Analytics = () => {
  return (
    <>
      <GoogleTagManager gtmId={Site?.code?.ganalytics} />
      <GoogleAnalytics gaId={Site?.code?.ganalytics} />
    </>
  );
};

export default Analytics;
