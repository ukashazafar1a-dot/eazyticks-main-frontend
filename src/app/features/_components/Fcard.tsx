import React from "react";

interface FunctionProps {
  image?: any;
  title?: string;
  text?: string;
}

const Fcard = ({ image, title, text }: FunctionProps) => {
  return (
    <div className="bg-[#F0F0F0] text-black rounded-md sm:p-5 p-3 basis-full md:basis-[32%] flex-shrink-0 text-center">
      <div className="h-20 relative -mt-12 mb-6">
        <img src={image} alt={title} loading="lazy" className="mx-auto" />
      </div>
      <div className="content pt-3">
        <h4 className="mb-2 text-start font-bold sm:text-xl text-base">{title}</h4>
        <p className="text-start">{text}</p>
      </div>
    </div>
  );
};

export default Fcard;
