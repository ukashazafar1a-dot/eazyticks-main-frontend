"use client";
import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

type dataItem = {
  image: string;
  url: string;
};
type props = {
  item: dataItem;
};
const ReviewItem = ({ item }: props) => {
  return (
    <div className="md:basis-1/3 basis-full  flex-shrink-0 rounded relative">
      <YouTubeEmbed
        videoid={item?.url}
        style="width:100%;height:500px;border-radius:0.25rem;"
        params="theme=dark&autohide=1&modestbranding=1&showinfo=0&fs=0&controls=0&playsinline=1&rel=0&enablejsapi=1"
      />
    </div>
  );
};

export default ReviewItem;
