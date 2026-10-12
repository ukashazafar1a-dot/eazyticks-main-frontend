"use client";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { categories_schema } from "@/lib/categories";
import Link from "next/link";
import { baseURL, returnSlug } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "@/context/ThemeContext";

const CategoriesLinks = ({ onClose }: { onClose: any }) => {
  const [openc, setOpenc] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setCategories, categories } = useTheme();

  const handleCatToggle = () => {
    setOpenc(!openc);
  };
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/Categories`);
      if (!response.ok) {
        console.log(response);
        return;
      }
      const result = await response.json();
      const { data } = result;
      const newArray = data.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
      setCategories(newArray ? newArray : data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className="h-10 w-full " />
      ) : (
        <li className="nav-list-item">
          <button
            className="flex items-center justify-between w-full"
            onClick={handleCatToggle}
          >
            <span>Categories</span>
            <IoChevronDown
              className={`ml-1 transition-all ${openc && "rotate-180"}`}
            />
          </button>
          {openc && (
            <div className="p-2">
              <ul className="flex items-start flex-col gap-2 text-base">
                {categories && categories.length > 0 ? (
                  categories.map((category: any) => (
                    <li
                      className="nav-list-item"
                      onClick={onClose}
                      key={category?.id}
                    >
                      <Link
                        href={"/categories/" + category?.name}
                        className="sidebar-link nav--link-inner"
                      >
                        {category?.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default CategoriesLinks;
