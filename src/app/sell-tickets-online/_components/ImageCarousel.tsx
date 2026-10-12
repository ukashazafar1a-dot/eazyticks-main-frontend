"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import '@/assets/swiper.css';

export type CarouselImage = {
  src: string;
  alt?: string;
  style?: string;
};

interface ImageCarouselProps {
  images?: CarouselImage[];
  ariaLabel?: string;
}

export default function ImageCarousel({
  images = [],
  ariaLabel = "Image carousel",
}: ImageCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // ✅ No images fallback
  if (!images?.length) {
    return (
      <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  // ✅ If ONLY ONE image → render normal image (NO slider)
  if (images?.length === 1) {
    const img = images[0];

    return (
      <div
        className="relative bg-muted/30 rounded-lg aspect-video overflow-hidden flex items-center justify-center"
        role="region"
        aria-label={ariaLabel}
      >
        <Image
          src={img?.src}
          alt={img?.alt || "Image"}
          fill
          className={`object-contain ${img?.style ?? ""}`}
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
    );
  }

  // ✅ More than one image → render Swiper slider
  return (
    <div
      className="relative bg-muted/30 rounded-lg aspect-video overflow-hidden w-full max-h-[50vh]"
      role="region"
      aria-label={ariaLabel}
    >
      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow focus:outline-none"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <button
        ref={nextRef}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow focus:outline-none"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop
        onBeforeInit={(swiper) => {
          // ✅ Fix for Next.js + Swiper navigation refs
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        spaceBetween={20}
        slidesPerView={1}
        className="h-full"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={img?.src}
                alt={img?.alt || `Image ${index + 1}`}
                fill
                className={`object-contain ${img.style ?? ""}`}
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
