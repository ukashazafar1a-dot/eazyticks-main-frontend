"use client";
import React, { MouseEvent } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

type BtnProps = {
  type?: string;
  handleClick?: (event: MouseEvent) => void;
  nextClass?: string;
  prevClass?: string;
};

const NextPrevBtn = ({ type, handleClick }: BtnProps) => {
  return (
    <button
      onClick={handleClick}
      aria-label={type}
      className={type === "next" ? "btn-next btn-arrow " : "btn-prev btn-arrow"}
    >
      {type === "next" ? (
        <GrNext className=" icon-arrow" />
      ) : (
        <GrPrevious className="icon-arrow" />
      )}
    </button>
  );
};

export default NextPrevBtn;
