import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="min-h-[90vh] w-full flex items-center justify-center flex-col"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084051/ezt-frontend-client-assets/banner-img_cvmttv.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084055/ezt-frontend-client-assets/banner-img-2_vaxxkh.png), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) `,
          backgroundBlendMode: "multiply",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="content p-3 max-w-[800px] mx-auto text-center text-white">
          <h2 className="mb-3 text-white sm:text-5xl text-2xl !leading-[1.1em]">
            We believe live events are{" "}
            <span className="text-primary">powerful experiences</span> that
            unite humans
          </h2>
          <p className="text-lg">
            With our technological savvy and fan-first attitude, we’re
            simplifying and modernizing the ticketing industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
