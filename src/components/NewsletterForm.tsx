"use client";
import { newsletterSubscribe } from "@/helpers/businessRequests";
import React, { Suspense, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const NewsletterForm = () => {
  const captchaRefs = useRef<any>(null);
  const [email, setEmail] = useState<any>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ReCaptcha, setRecaptcha] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsSuccess(false);
    setIsError(false);
    const token = await captchaRefs?.current?.executeAsync();
    captchaRefs.current.reset();
    if (token && email) {
      try {
        const { data: response } = await newsletterSubscribe(token, email);
        if (response && response?.succeeded) {
          setIsSuccess(true);
          setIsProcessing(false);
          setEmail("");
        } else {
          setIsError(true);
          setIsProcessing(false);
          setEmail("");
        }
      } catch (error) {
        setIsError(true);
        setIsProcessing(false);
        setEmail("");
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const recaptcha = React.lazy(() => import("react-google-recaptcha"));
    setRecaptcha(recaptcha);
  };

  return (
    <>
      <p className="mb-2">
        Subscribe to our newsletter for latest events and updates.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-start ">
          <input
            type="email"
            onFocus={(e) => handleFocus(e)}
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-sm px-4 py-[6px] border border-1 !border-end-0 border-gray-400 rounded-l w-full text-white"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="bg-primary  text-white text-xs px-3 py-2 rounded-r border border-primary border-1  flex items-center"
          >
            <span>Submit</span>
            {isProcessing && (
              <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3 !w-4 !h-4" />
            )}
          </button>
        </div>
        {isSuccess && (
          <p className="text-green-500 text-sm">Subscribed Successfully!</p>
        )}
        {isError && (
          <p className="text-red-500 text-sm">Failed to Subscribe!</p>
        )}
        {ReCaptcha && (
          <Suspense fallback={<div>...</div>}>
            <ReCaptcha
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}
              ref={captchaRefs}
              size="invisible"
            />
          </Suspense>
        )}
      </form>
    </>
  );
};

export default NewsletterForm;
