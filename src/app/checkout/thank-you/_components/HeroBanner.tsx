"use client";
import { downloadAllTickets } from "@/helpers/generals";
import React from "react";

type props = {
  loading: boolean;
};

const HeroBanner = ({ loading }: props) => {
  const handleDownloadAll = async () => {
    if (loading) return;
    await downloadAllTickets(".ticket");
  };
  const appleWalletClick = () => {
    document.getElementById("apple-wallet-button")?.click();
  };
  return (
    <div className="w-full p-6 text-center rounded-xl shadow-lg mb-12 attention-box bg-secondary">
      <h2 className="text-4xl font-medium text-white neon-glow animate-flicker">
        ⚡ Attention!
      </h2>
      <p className="mt-3 text-white text-base md:text-lg max-w-screen-xl mx-auto leading-relaxed text-balance">
        Please{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => handleDownloadAll()}
        >
          download your ticket{" "}
        </span>
        or{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={appleWalletClick}
        >
          save it to your Apple Wallet
        </span>
        . We also recommend{" "}
        <span className="font-semibold text-primary">taking a screenshot</span>{" "}
        so you can access it later without needing internet access.{" "}
        <span>
          {`You can also check your email where the ticket has been sent as an
          attachment and don’t forget to check your spam or junk folder if you don’t see it in your inbox.`}
        </span>
      </p>
      <p className="mt-3 text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
        TICKET CAN BE VIEWED BELOW
      </p>
    </div>
  );
};

export default HeroBanner;
