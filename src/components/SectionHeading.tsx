import React from "react";

type props = {
  children: any;
  classes?: string;
};

const SectionHeading = ({ children, classes }: props) => {
  return <h2 className={`${classes || ""} mb-md-20 mb-10 text-left ps-md-14 ps-6`}>{children}</h2>;
};
export default SectionHeading;
