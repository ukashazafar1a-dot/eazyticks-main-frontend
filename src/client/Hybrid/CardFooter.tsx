"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { Event, HybridEvent } from "@/lib/types";
import { hybridSteps } from "@/hooks/useHybridEvent";
import { returnSteps } from "@/lib/utils";
import { AiOutlineConsoleSql } from "react-icons/ai";

type props = {
  event: HybridEvent | null;
  changeStep: any;
  step: hybridSteps;
};

const CardFooter = ({ event, changeStep, step: activeStep }: props) => {
  const [steps, setSteps] = useState<hybridSteps[]>([]);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const goToNext = () => {
    let stepIndex = steps.indexOf(activeStep);
    let step = steps[stepIndex + 1];
    changeStep(step);
  };

  const goToPrev = () => {
    let stepIndex = steps.indexOf(activeStep);
    let step = steps[stepIndex - 1];
    changeStep(step);
  };

  useEffect(() => {
    steps.indexOf(activeStep) === 0 ? setIsFirst(true) : setIsFirst(false);
    steps.indexOf(activeStep) + 1 === steps.length
      ? setIsLast(true)
      : setIsLast(false);
  }, [activeStep]);

  useEffect(() => {
    if (event) {
      const totalSteps = returnSteps(event);
      if (totalSteps) {
        setSteps(totalSteps);
        totalSteps.indexOf(activeStep) === 0
          ? setIsFirst(true)
          : setIsFirst(false);
        totalSteps.indexOf(activeStep) + 1 === totalSteps.length
          ? setIsLast(true)
          : setIsLast(false);
      }
    }
  }, [event]);
  //console.log(steps, isFirst, isLast, activeStep);
  return (
    <div className="mt-3 md:mb-0 mb-3 cart--footer">
      <div className={`flex items-center justify-between gap-2`}>
        {!isFirst && (
          <button
            className="btn btn--secondary rf-actions-back"
            disabled={isFirst}
            onClick={(e) => goToPrev()}
          >
            <span>
              <IoArrowBack className="icon icon-back" />
            </span>
            <span>Back</span>
          </button>
        )}
        {!isLast && (
          <button
            className="btn btn--primary rf-actions-next"
            disabled={isLast}
            onClick={(e) => goToNext()}
          >
            <span>Next</span>
            <span>
              <IoMdArrowForward className="icon icon-next" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardFooter;
