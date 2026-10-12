"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import OrganizerForm from "./OrganizerForm";
import RegisterForm from "./RegisterForm";

type AccountType = "individual" | "organizer";

const SignupPage = () => {
  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType>("individual");
  const [step, setSteps] = useState<0 | 1>(0);
  const [orgStep, setOrgStep] = useState<1 | 2>(1);

  const handleAccountTypes = (type: AccountType) => {
    setSelectedAccountType(type);
  };
  //console.log(selectedAccountType);
  return (
    <div className="p-5">
      {step == 0 && (
        <div className="w-full max-w-[600px] mx-auto space-y-8 py-8">
          {/* Header */}
          <div className="text-left space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Sign up!</h1>
            <p className="text-muted-foreground">
              {`To begin this journey, tell us what type of account you'd be
            opening.`}
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-4">
            {/* Individual Option */}
            <Card
              className={`p-3 md:p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedAccountType === "individual"
                  ? "border-primary"
                  : "border-border hover:border-primary"
              }`}
              onClick={() => handleAccountTypes("individual")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg border ${
                    selectedAccountType === "individual"
                      ? "border-primary bg-primary/50"
                      : "border-border bg-muted"
                  }`}
                >
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                  >
                    <path
                      d="M50.1396 18.1562L40.9189 46.5342H11.0811L1.85938 18.1562L26 0.617188L50.1396 18.1562Z"
                      stroke="#DE6944"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.4645 29.4645C19.4021 28.5268 20.6739 28 22 28H30C31.3261 28 32.5979 28.5268 33.5355 29.4645C34.4732 30.4021 35 31.6739 35 33V35C35 35.5523 34.5523 36 34 36C33.4477 36 33 35.5523 33 35V33C33 32.2044 32.6839 31.4413 32.1213 30.8787C31.5587 30.3161 30.7956 30 30 30H22C21.2044 30 20.4413 30.3161 19.8787 30.8787C19.3161 31.4413 19 32.2044 19 33V35C19 35.5523 18.5523 36 18 36C17.4477 36 17 35.5523 17 35V33C17 31.6739 17.5268 30.4021 18.4645 29.4645Z"
                      fill="#DE6944"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26 18C24.3431 18 23 19.3431 23 21C23 22.6569 24.3431 24 26 24C27.6569 24 29 22.6569 29 21C29 19.3431 27.6569 18 26 18ZM21 21C21 18.2386 23.2386 16 26 16C28.7614 16 31 18.2386 31 21C31 23.7614 28.7614 26 26 26C23.2386 26 21 23.7614 21 21Z"
                      fill="#DE6944"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Individual
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Browse upcoming sports events, select their preferred
                    matches, and purchase tickets instantly through a seamless
                    and secure checkout process.
                  </p>
                </div>
              </div>
            </Card>
            {/* Organizer Option */}
            <Card
              className={`p-3 md:p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedAccountType === "organizer"
                  ? "border-primary bg-primary/50"
                  : "border-border hover:border-primary"
              }`}
              onClick={() => handleAccountTypes("organizer")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg border ${
                    selectedAccountType === "organizer"
                      ? "border-primary bg-primary/50"
                      : "border-border bg-muted"
                  }`}
                >
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                  >
                    <path
                      d="M49.9043 18.2324L40.7734 46.334H11.2266L2.09473 18.2324L26 0.864258L49.9043 18.2324Z"
                      fill="#DE6944"
                      stroke="#DE6944"
                      stroke-width="1.4"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18 22C17.4477 22 17 22.4477 17 23V33C17 33.5523 17.4477 34 18 34H34C34.5523 34 35 33.5523 35 33V23C35 22.4477 34.5523 22 34 22H18ZM15 23C15 21.3431 16.3431 20 18 20H34C35.6569 20 37 21.3431 37 23V33C37 34.6569 35.6569 36 34 36H18C16.3431 36 15 34.6569 15 33V23Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.8787 16.8787C22.4413 16.3161 23.2044 16 24 16H28C28.7956 16 29.5587 16.3161 30.1213 16.8787C30.6839 17.4413 31 18.2043 31 19V35C31 35.5523 30.5523 36 30 36C29.4477 36 29 35.5523 29 35V19C29 18.7348 28.8946 18.4804 28.7071 18.2929C28.5196 18.1054 28.2652 18 28 18H24C23.7348 18 23.4804 18.1054 23.2929 18.2929C23.1054 18.4804 23 18.7348 23 19V35C23 35.5523 22.5523 36 22 36C21.4477 36 21 35.5523 21 35V19C21 18.2043 21.3161 17.4413 21.8787 16.8787Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Organizer
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Effortlessly create, manage, and promote their sports events
                    to a wide audience. The platform provides powerful tools for
                    ticket customization, real-time sales tracking
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Next Button */}
          <button
            type="button"
            className="w-full btn btn--primary btn--large"
            onClick={() => setSteps(1)}
          >
            Next
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/account/signin" className="text-primary font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      )}
      {step == 1 && (
        <>
          {/* Header with Back Button and Step Indicator */}
          <div className="flex items-center justify-between max-w-[600px] mx-auto mb-4">
            <button
              type="button"
              onClick={() => {
                setSteps(0);
                setOrgStep(1);
              }}
              className="flex items-center gap-2 text-foreground p-0"
            >
              <BiChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            {selectedAccountType === "organizer" ? (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">STEP {orgStep}/2</p>
                <p className="font-semibold text-foreground">{orgStep === 1 ? "Personal Info." : "Organizer Info."}</p>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">STEP 1/1</p>
                <p className="font-semibold text-foreground">Personal Info.</p>
              </div>
            )}
          </div>
          {/* Form Content */}
          {selectedAccountType === "organizer" ? (
            <OrganizerForm onStepChange={(step: 1 | 2) => setOrgStep(step)} />
          ) : (
            <RegisterForm />
          )}
        </>
      )}
    </div>
  );
};

export default SignupPage;
