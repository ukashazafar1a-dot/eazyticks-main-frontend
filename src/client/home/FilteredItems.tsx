"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexEvents from "./components/FlexEvents";
import { isDeviceMobile } from "@/helpers/generals";
import EventCard from "@/components/EventCard";
import NextPrevBtn from "@/components/NextPrevBtn";

type FunctionProps = {
  items: any;
};

const FilteredItems = ({ items }: FunctionProps) => {
  const swiperRef = React.useRef<any | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  const handlePrev = function () {
    swiperRef.current?.slidePrev();
  };

  const handleNext = function () {
    swiperRef.current?.slideNext();
  };
  const onResize = () => {
    if (isDeviceMobile()) {
      swiperRef.current?.destroy();
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMobile(isDeviceMobile());
      if (isDeviceMobile()) {
        swiperRef.current?.destroy(true, true);
      }
      window.addEventListener("resize", onResize);
    }
  }, []);

  return (
    <div className="relative m-auto sm:px-14">
      {items?.length > 0 ? (
        <>
          {isMobile ? (
            <FlexEvents events={items} />
          ) : (
            <>
              <Swiper
                className="events-cards-slider flex align-items-center justify-center flex-col gap-1"
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={false}
          
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                spaceBetween={0}
              >
                {items.map((item: any, i: any) => {
                  return (
                    <SwiperSlide key={i} className="slide">
                      <EventCard event={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <NextPrevBtn handleClick={handlePrev} type="prev"></NextPrevBtn>
              <NextPrevBtn handleClick={handleNext} type="next"></NextPrevBtn>
            </>
          )}
        </>
      ) : (
        <div className="flex items-end justify-start">
          <div className="image-wrapper">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/w_65,h_65/v1684322441/ezt-frontend-client-assets/question_b89zgh.png"
              alt="No Event Found - Eazyticks"
              loading="lazy"
            />
          </div>
          <div className="text-xl red">No Events Found!</div>
        </div>
      )}
    </div>
  );
};

export default FilteredItems;
