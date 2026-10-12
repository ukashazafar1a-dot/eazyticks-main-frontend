import React from "react";
import Link from "next/link";
import { scrollToTop } from "@/helpers/generals";

interface FunctionProps {
  msg?: any;
}

const NoWishlist = ({ msg }: FunctionProps) => {
  return (
    <div className="no-wish bg-[#f4f4f4] sm:p-10 p-2 flex items-center justify-center min-h-[300px]">
      <div className="image-wrapper">
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/w_150,h_150/v1684322441/ezt-frontend-client-assets/question_b89zgh.png"
          alt="No Event Found - Eazyticks"
          loading="lazy"
        />
      </div>
      <div className="content">
        <span className="font-bold text-xl text-primary"> Oops! </span> <br />
        <span className="mb-2 inline-block"> {msg} </span>
        <br />
        <Link
          className="btn btn--primary w-fit"
          href="/"
          onClick={() => scrollToTop()}
        >
          Add Now
        </Link>
      </div>
    </div>
  );
};

export default NoWishlist;
