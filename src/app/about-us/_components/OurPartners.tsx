import React from "react";
import Link from "next/link";
import { Site } from "@/helpers/Site";

const OurPartners = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-center flex-col md:flex-row w-full h-full">
        <div
          className="image-right relative w-full md:w-1/2"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084059/ezt-frontend-client-assets/right-img_kbookc.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084055/ezt-frontend-client-assets/footer-img-blender_g3bhkn.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundBlendMode: "multiply",
            height: "400px",
          }}
        >
          <div className="text-center text-white absolute inset-0 flex flex-col items-center justify-center">
            <Link
              href={Site?.organizer?.url}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <h2 className="text-white mb-3 font-bold text-4xl">Host</h2>
              <p className="text-white text-xl">Organize and Sell Events</p>
            </Link>
          </div>
        </div>
        <div
          className="image-left relative w-full md:w-1/2"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084058/ezt-frontend-client-assets/left-img_ale0cx.png), url(https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084055/ezt-frontend-client-assets/footer-img-blender_g3bhkn.png)`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            height: "400px",
          }}
        >
          <div className="text-center text-white absolute inset-0 flex flex-col items-center justify-center">
            <Link href="/browse-events">
              <h2 className="text-white mb-4 font-bold text-4xl ">Buy</h2>
              <p className="text-white text-xl">Buy Ticket Now</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
