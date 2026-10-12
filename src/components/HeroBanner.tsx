import React, { Suspense } from "react";
import BannerSearch from "./BannerSearch";

function HeroBanner() {
  return (
    <section className="flex justify-center items-center h-screen relative bg-secondary">
      <img
        src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1681391176/ezt-frontend-client-assets/banner_vunxxf.png"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-position-center"
        alt="Eazyticks Hero Banner"
      />
      <Suspense
        fallback={
          <div className="relative small--loader w-full h-full">
            <span></span>
          </div>
        }
      >
        <div className="container text-center z-2 p-4">
          <div className="text-white mb-4">
            <h1 className="mb-4 px-3 max-w-screen-lg mx-auto hero-heading">
              PURCHASE YOUR TICKETS FOR EVENTS
            </h1>
            <p className="tbsub-heading">
              Shop millions of live events and discover can&lsquo;t-miss
              concerts, games, theater and more.
            </p>
          </div>
          <BannerSearch />
        </div>
      </Suspense>
    </section>
  );
}

export default HeroBanner;
