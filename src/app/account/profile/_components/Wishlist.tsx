"use client";
import React, { useEffect, useState } from "react";
import NoWishlist from "./NoWishlist";
import SectionLoader from "@/components/SectionLoader";
import PageError from "@/components/PageError";
import { getWishlist } from "@/helpers/businessRequests";
import EventCard from "@/components/EventCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchWishlist = async () => {
    try {
      const { data: response } = await getWishlist();
      //console.log(response);
      if (response && response?.succeeded) {
        setWishlist(response?.data);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <>
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <div>
          <h2 className="title sm:text-3xl text-2xl font-bold mb-4">
            Wishlist Items
          </h2>
          <div
            className={`events--flex-main py-6 px-0 md:px-3 ${wishlist?.length == 0 ? "nothing" : "have"} `}
          >
            {wishlist?.length > 0 ? (
              wishlist.map((item: any) => {
                return <EventCard event={item} key={item.slug} />;
              })
            ) : (
              <NoWishlist msg={`No Events Found in Your saved items.`} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
