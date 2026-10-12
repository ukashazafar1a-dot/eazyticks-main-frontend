"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import CountUp from "./CountUp";


export interface StatItem {
  start: number;
  end: number;
  suffix: string;
  displayType: "number" | "k" | "x";
  text: string;
  img: string;
  alt: string;
}


const stats: StatItem[] = [
  {
    start: 1000,
    end: 4000,
    suffix: " +",
    displayType: "number", // number | k | x
    text: "Events Hosted",
    img: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084046/ezt-frontend-client-assets/world_ovpevl.png",
    alt: "World Community - Eazyticks",
  },
  {
    start: 100000,
    end: 260000,
    suffix: " +",
    displayType: "k", // auto formats as 260k+
    text: "Tickets Sold",
    img: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084045/ezt-frontend-client-assets/ticket_qg4dp0.png",
    alt: "Tickets - Eazyticks",
  },
  {
    start: 1,
    end: 3,
    suffix: "x",
    displayType: "x",
    text: "Yearly Growth",
    img: "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084055/ezt-frontend-client-assets/bed_h2jrte.png",
    alt: "Creators - Eazyticks",
  },
];

const StatsSection = () => {
  return (
    <div className="pt-8 md:pt-12 pb-8 px-4 ">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center py-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Powering Events Worldwide
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-6 md:mb-12">
          EazyTicks helps organizers of all sizes create, manage, and grow
          events effortlessly.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-white p-6 rounded-2xl gap-0 shadow-none flex flex-col items-center group hover:border-primary duration-300 transition-all"
          >
            <img
              src={stat.img}
              alt={stat.alt}
              className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <p className="text-4xl md:text-6xl font-extrabold text-primary mb-2">
              <CountUp
                start={stat.start}
                end={stat.end}
                displayType={stat.displayType}
                suffix={stat.suffix}
              />
            </p>

            <p className="text-gray-600 text-lg md:text-xl">{stat.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
