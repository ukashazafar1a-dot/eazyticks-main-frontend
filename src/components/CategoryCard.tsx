import React from "react";
import Link from "next/link";
import { TfiBasketball } from "react-icons/tfi";
import { scrollToTop } from "@/helpers/generals";
import { Category } from "@/lib/types";
import { returnSlug } from "@/lib/utils";

type props = {
  item: Category;
};

const CategoryCard = ({ item }: props) => {
  function renderIcon() {
    if (item?.icon) {
      return (
        <span className="material-symbols-outlined category__icon ">
          {item?.icon}
        </span>
      );
    } else if (item?.headerBg) {
      return (
        <img
          src={item?.headerBg}
          alt={item?.name ? item?.name + " Category - EazyTicks" : "category"}
          loading="lazy"
          className="w-12"
        />
      );
    } else {
      return <TfiBasketball className="icon icon-basketball fill-primary text-primary !w-8 !h-8" />;
    }
  }
  return (
    <div
      data-category-id={item?.id}
      data-category-name={item?.name}
      data-category-profit={item?.eazytickProfit}
      className="bg-white rounded mt-3 w-full"
    >
      <Link
        href={`/categories/${item?.name}`}
        className="flex items-center bg-[#f4f4f4] w-full"
        onClick={() => scrollToTop()}
      >
        <div className="flex items-center justify-center bg-[#ededed] bg-opacity-75 w-20 h-20 p-2 overflow-hidden">
          {renderIcon()}
        </div>
        <div className="flex align-items-center justify-start flex-grow  p-2">
          <p className="m-0 leading-tight text-left text-xl ">
            {item?.name ? item?.name : "category"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
