import React, { useEffect, useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { appleOSNames } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Event } from "@/lib/types";

type props = {
  event: Event | null;
  loading: boolean;
};

const AppleWallet = ({ event, loading }: props) => {
  const [enabled, setEnabled] = useState(false);
  const searchParams = useSearchParams();

  const id = searchParams?.get("id") || searchParams?.get("Id");
  const sec = searchParams?.get("sec") || searchParams?.get("secret");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent;
      const { osName } = getSelectorsByUserAgent(userAgent);
      //console.log("operation system name is ", osName);
      if (appleOSNames?.includes(osName)) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
  }, []);

  if (!enabled || !id || !sec){
     return (
      <p className="p-6 text-gray-800 bg-gray-200 rounded mb-4 hidden">
        Apple Wallet is not supported on your device.
      </p>
    );
  }

  const walletUrl = `${process.env.NEXT_PUBLIC_APPLE_WALLET_URL}?orderId=${id}&sec=${sec}`;

  return (
    <div className="px-2 pb-8 pt-2 flex items-center justify-start gap-6 flex-wrap">
      <div>
        <h3 className="text-lg md:text-2xl font-semibold text-balance mb-2">
          Never Lose Your Ticket – Add to Wallet
        </h3>
        <p className="text-sm md:text-base mb-3 text-balance text-left text-gray-600">
          Keep your ticket safe and ready, add it to Apple Wallet now. (works
          without internet on event day)
        </p>
      </div>
      <div className="flex items-center justify-start gap-3 md:gap-6 flex-wrap">
        <a
          href={walletUrl}
          target="_blank"
          id="apple-wallet-button"
          className="flex items-center justify-start "
        >
          <Image
            src="/assets/images/apple-wallet.png"
            alt="Apple Wallet"
            width={256}
            height={80}
            className="apple-wallet-btn max-w-full block"
          />
        </a>
      </div>
    </div>
  );
};

export default AppleWallet;
