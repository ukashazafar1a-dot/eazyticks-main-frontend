"use client";
import Image from "next/image";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type props = {
  images: string[] | null;
  title: string;
};

const ImagesSlider = ({ images, title }: props) => {
  const swiperRef = React.useRef<any>();
  const prevRef = React.useRef<any>();
  const nextRef = React.useRef<any>();
  const handlePrev = function () {
    swiperRef.current?.slidePrev();
  };

  const handleNext = function () {
    swiperRef.current?.slideNext();
  };
  return (
    <div className="slider-wrapper w-full h-full position-relative">
      <Swiper
        className="w-full h-full"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        onBeforeInit={(swiper) => {
          //console.log("Swiper>>",swiper)
          swiperRef.current = swiper;
        }}
      >
        {images?.map((image, index: any) => {
          return (
            <SwiperSlide key={index} className="h-full">
              <div className="h-full relative">
                <div className="absolute top-0 start-0 end-0 bottom-0 w-full h-full z-1 custom-object-center">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className={
                      "w-img lazyload absolute top-0 left-0 w-full h-full z-0 text-center"
                    }
                  />
                </div>
                <Image src={image} alt={title} className={"z-3 event--image"} fill />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="swiper-button-prev shadow-lg text-black bg-white rounded p-2"
        ref={prevRef}
        onClick={handlePrev}
      >
      </div>
      <div
        className="swiper-button-next shadow-lg text-black bg-white rounded z-10 absolute right-0"
        ref={nextRef}
        onClick={handleNext}
      >
      </div>
    </div>
  );
};

export default ImagesSlider;
