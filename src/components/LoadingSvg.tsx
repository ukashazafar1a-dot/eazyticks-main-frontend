import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type props = {
  width?: string;
  height?: string;
  classes?: string;
};

const LoadingSvg = ({ width = "30px", height = "20px", classes }: props) => {
  return (
    <>
      <AiOutlineLoading3Quarters
        className={`animate-spin icon icon-loading fill-white ${classes || ""}`}
      />
    </>
  );
};

export default LoadingSvg;
