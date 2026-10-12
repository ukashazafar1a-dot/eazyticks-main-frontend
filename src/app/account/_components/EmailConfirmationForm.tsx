"use client";
import SectionLoader from "@/components/SectionLoader";
import useApp from "@/context/useApp";
import { confirmEmail } from "@/helpers/businessRequests";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EmailConfirmationForm = () => {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const {setToaster,user} = useApp();
  const router = useRouter();

  const handleSubmit = async () => {
    const userId = searchParams?.get("userId");
    const code = searchParams?.get("code");
    try {
      const {data: response} = await confirmEmail(userId, code);
      if(response && response?.succeeded){
        setToaster('success',response?.messages[0] || 'Email Confirmed successfully.');
        setIsLoading(false);
      }else{
        setToaster('error',response?.messages[0] || 'Something went wrong!');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="wrapper-form">
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
        {isLoading ? (
          <SectionLoader />
        ) : isSuccess ? (
          <div className="mb-2">
            <h2 className="mb-2 uppercase">Congratulations</h2>
            <p className="mb-2">Your Email is Confirmed.</p>
          </div>
        ) : (
          <div className="mb-2">
            <h2 className="form__title red mb-2 uppercase">Failed!</h2>
            <p className="mb-2">Your Email confirmation failed.</p>
          </div>
        )}
        <div className="flex items-center justify-start">
          {isSuccess ? (
            <Link href={"/account/signin"} className="btn btn--primary">
              Sign In
            </Link>
          ) : (
            <Link href={"/account/forgotpassword"} className="btn btn--primary">
              Try Again
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailConfirmationForm;
