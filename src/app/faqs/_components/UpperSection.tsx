import React from "react";

const UpperSection = () => {
  return (
    <div
      className="flex items-center justify-center md:min-h-[70vh] min-h-[40vh]"
      style={{
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundImage:
          "url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398475/ezt-frontend-client-assets/bg-img-1_dzjvmu.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398498/ezt-frontend-client-assets/bg-img-2_zbkxfr.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683398518/ezt-frontend-client-assets/bg-img-3_ayrlx8.png)",
      }}
    >
      <div className="text-center text-white">
        <h2 className="mb-2 font-medium text-white text-2xl sm-max:text-lg">
          How can we help?
        </h2>
        <h1 className="text-4xl font-bold text-white sm-max:text-2xl">
          Frequently Asked Questions
        </h1>
      </div>
    </div>
  );
};

export default UpperSection;
