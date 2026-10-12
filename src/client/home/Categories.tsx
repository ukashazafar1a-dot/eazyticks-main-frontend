"use client";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Category } from "@/lib/types";
import CategoryCard from "@/components/CategoryCard";
import NextPrevBtn from "@/components/NextPrevBtn";

type props = {
  items: Category[];
};

const Categories = ({ items }: props) => {
  const swiperRef = React.useRef<any | null>(null);

  const handlePrev = function () {
    swiperRef.current?.slidePrev();
  };

  const handleNext = function () {
    swiperRef.current?.slideNext();
  };

  const renderItems = function (items: any) {
    let itemsString: any = [];
    for (let i = 0; i < items?.length; i += 2) {
      let firstItem: any = items[i],
        secondItem: any = items[i + 1];
      itemsString.push(
        <SwiperSlide
          className="flex items-center justify-center flex-col"
          key={i}
        >
          <CategoryCard item={firstItem} />
          {secondItem && <CategoryCard item={secondItem} />}
        </SwiperSlide>
      );
    }
    return itemsString;
  };
  if (!items || items?.length === 0) return;
  return (
    <div className="container py-12 sm:px-0 px-1">
      <h2 className="mb-md-20 mb-10 text-left ps-md-14 ps-6">CATEGORIES</h2>
      <div className="relative mx-auto sm:px-14 px-8">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          spaceBetween={10}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
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
        >
          {renderItems(items)}
        </Swiper>
        <NextPrevBtn handleClick={handlePrev} type="prev"></NextPrevBtn>
        <NextPrevBtn handleClick={handleNext} type="next"></NextPrevBtn>
      </div>
    </div>
  );
};

export default Categories;
