import React from "react";
import Link from "next/link";
type props = {
  title: string;
  handle: string;
};
const Banner = ({ title, handle }: props) => {
  return (
    <div className="py-16 px-5 bg-secondary text-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl">{title}</h1>
        <p className="text-center">
          <span className="red">
            <Link href="/">Home</Link>/policies/
          </span>
          <span>{handle}</span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
