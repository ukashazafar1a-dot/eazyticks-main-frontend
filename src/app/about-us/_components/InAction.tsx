import { YouTubeEmbed } from "@next/third-parties/google";
import React from "react";

const InAction = () => {
  return (
    <div className="container mx-auto py-3 px-3 mt-8">
      <div className="max-w-[1200px] mx-auto mb-5 text-center">
        <div className="prose max-w-full mx-auto">
          <h2 className="sm:text-5xl text-2xl sm:text-center text-left mb-3">
            <span className="text-primary font-bold leading-tight">
              EazyTicks
            </span>
            <br />
            The Power Behind the Scenes
          </h2>
          <p className="text-lg text-center">
            See how{" "}
            <strong className="text-primary font-extrabold"> EazyTicks </strong>{" "}
            transforms event management as simplifies ticketing,
            <br /> elevates attendee experiences, streamlines venue operations,
            and more.
          </p>
        </div>
      </div>
      <div className="container mx-auto py-6 px-3 flex flex-nowrap overflow-x-auto gap-3 justify-start mb-5 smart_scroll">
        <div className="basis-full flex-shrink-0 md:basis-[45%]">
          <YouTubeEmbed
            videoid="m7D8Po_MOMI"
            params="controls=0&autoplay=1&mute=1&loop=1&start=30&end=120"
            style="border-radius: 10px;"
          />
        </div>
        <div className="basis-full flex-shrink-0 md:basis-[45%]">
          <YouTubeEmbed
            videoid="LCJP8I83X8k"
            params="controls=0&autoplay=1&mute=1&loop=1&start=30&end=120"
            style="border-radius: 10px;"
          />
        </div>
        <div className="basis-full flex-shrink-0 md:basis-[45%]">
          <YouTubeEmbed
            videoid="GwxAWs1ecWg"
            params="controls=0&autoplay=1&mute=1&loop=1&start=30&end=120"
            style="border-radius: 10px;"
          />
        </div>
      </div>
    </div>
  );
};

export default InAction;
