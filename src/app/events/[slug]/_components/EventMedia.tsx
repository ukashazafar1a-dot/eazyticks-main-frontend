import { Event } from "@/lib/types";
import React from "react";
import ImagesSlider from "./ImageSlider";
import { Site } from "@/helpers/Site";
import Image from "next/image";
type props = {
  event: Event;
};
const EventMedia = ({ event }: props) => {
  return (
    <div className="images-banner flex items-center justify-center overflow-hidden relative rounded-lg">
      <div className="wrapper-image-container w-full h-full bg-slate-100">
        {event?.images && event?.images.length !== 0 ? (
          event?.images.length > 1 ? (
            <ImagesSlider images={event?.images} title={event?.name} />
          ) : (
            <>
              {event?.images[0] && (
                <div
                  className="w-img lazyload absolute top-0 left-0 w-full h-full z-0 text-center"
                  data-bg={event?.images[0]}
                ></div>
              )}
              <div className="card--overlay">
                {event?.images ? (
                  <Image
                    src={event?.images[0]}
                    width={100}
                    height={100}
                    alt={event?.name}
                    className=""
                  />
                ) : (
                  <Image
                    src={
                      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
                    }
                    fill
                    className="absolute inset-0 m-auto object-contain z-1"
                    alt={event?.name}
                  />
                )}
              </div>
              <Image
                src={event?.images[0]}
                alt={`${event?.name}`}
                fill
                priority
                className="z-100 relative event--image"
              />
            </>
          )
        ) : (
          <>
            <div
              className="w-img lazyload absolute top-0 left-0 w-full h-full z-0 text-center"
              data-bg={Site?.placeholder}
            ></div>
            <Image
              src={Site?.placeholder}
              fill
              alt="placeholder"
              className="z-100 relative event--image"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EventMedia;
