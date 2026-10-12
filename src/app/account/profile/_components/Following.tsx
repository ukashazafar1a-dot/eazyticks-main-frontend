"use client";
import React, { useEffect, useState } from "react";
import FollowCard from "./FollowCard";
import SectionLoader from "@/components/SectionLoader";
import PageError from "@/components/PageError";
import { getFollowings } from "@/helpers/businessRequests";
import NoOrder from "./NoOrder";

const Following = () => {
  const [followings, setFollowings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchFollowings = async () => {
    try {
      const { data: response } = await getFollowings();
      //console.log(response);
      if (response && response?.succeeded) {
        setFollowings(response?.data);
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
    fetchFollowings();
  }, []);
  return (
    <>
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <section>
          <h2 className="title sm:text-3xl font-bold mb-4 ">Following</h2>
          <div className="flex justify-start flex-wrap">
            {followings?.length > 0 ? (
              followings?.map((item: any) => {
                return <FollowCard key={item.organizerCode} organizer={item} />;
              })
            ) : (
              <NoOrder message="No Following Organizer now!" />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Following;
