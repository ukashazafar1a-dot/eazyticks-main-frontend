import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { getAddress, scrollToTop } from "@/helpers/generals";

interface Provider {
  order: any;
}

const EventCard = ({ order }: Provider) => {
  const event = order?.event;
  const [like, setlike] = useState(false);
  //console.log(event,order)

  const renderImage = function (image: any) {
    return image?.split(";")?.pop()
      ? image?.split(";")?.pop()
      : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png";
  };
  const renderMedia = function (image: any) {
    let imgSrc: any =
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png";
    if (image) {
      imgSrc = image?.split(";")?.pop();
    } else {
      imgSrc =
        "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png";
    }
    return (
      <img
        src={imgSrc}
        alt={" - Eazyticks Event - Eazyticks"}
        className="  h-full object-contain object-center z-100 m-auto relative"
        loading="lazy"
      />
    );
  };
  return (
    <div className="flex justify-between rounded-lg border-2 border-black border-opacity-20 overflow-hidden shadow-md mb-3 flex-wrap">
      <div className="image--wrapper overflow-hidden lg:basis-[20%] h-[200px] md-max:min-h-[400px] md-max:max-h-[400px] sm-max:min-h-[300px]  basis-full relative bg-red-50">
        <Link
          className="card_media_wrapper block h-full  w-full"
          href={"/account/profile/orders/tickets?orderId=" + order?.id}
          onClick={() => scrollToTop()}
        >
          <div
            className="overlay absolute inset-0 object-cover object-center   w-full h-full filter blur-lg brightness-75"
            style={{ backgroundImage: `url(${renderImage(event?.image)})` }}
          ></div>
          {renderMedia(event?.image)}
        </Link>
      </div>
      <div className="event-info flex-grow p-5 flex items-start justify-center flex-col">
        <Link
          href={"/account/profile/orders/tickets?orderId=" + order?.id}
          onClick={() => scrollToTop()}
        >
          <h4 className="order_id font-bold text-sm">Order ID: #{order?.id}</h4>
          <div className="flex gap-2 items-center justify-start sm-max:basis-[48%]">
            <span className="two-lines font-bold md:text-lg text-base sm-max:basis-[48%]">
              {event?.name}
            </span>
            <p
              className={`rounded-full bg-[#00000014] md:px-3 px-4 py-1 md:text-xs text-[11px] font-medium chip ${
                event?.status ? "draft" : "active"
              } `}
            >
              {event?.status ? "Event is Completed" : "Event is Active"}
            </p>
          </div>
          <div>
            <p className="text-primary font-bold text-base">
              {"Starting on "}
              {moment(event?.startDate).format("ddd, Do MMMM YYYY, h:mm A")}
            </p>
            <p className="text-base">{getAddress(event)}</p>
            <p className="order_id font-bold text-sm">
              <strong>
                Bill:{" "}
                {order?.bill === 0 ? " Free " : " $ " + order?.bill + " USD "}
              </strong>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
