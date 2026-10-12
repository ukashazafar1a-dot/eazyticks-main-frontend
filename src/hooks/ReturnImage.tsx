"use client";
import { getImgSrcs } from "@/helpers/generals";
import React from "react";

const ReturnImage = ({ image, alt, width, height, classes }: any) => {
  let imgSrc: any = "",
    imgSrcSet: any = "";
  if (image) {
    const { src, srcset }: any = getImgSrcs(image.split(";")?.pop());
    imgSrc = src;
    imgSrcSet = srcset;
  } else {
    const { src, srcset }: any = getImgSrcs(
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
    );
    imgSrc = src;
    imgSrcSet = srcset;
  }
  return (
    <img
      className={`lazyload ${classes}`}
      sizes="(min-width: 30em) 28em, 100vw"
      data-src={imgSrc}
      src={imgSrc}
      data-srcset={imgSrcSet}
      alt={alt ? alt : "EazyTicks"}
      loading="lazy"
      height={height}
    />
  );
};

export default ReturnImage;
