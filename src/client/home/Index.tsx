"use client";
import SmallLoader from "@/components/loaders/SmallLoader";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Filters from "./Filters";
import TrendingEvents from "./TrendingEvents";
import UpcomingEvents from "./UpcomingEvents";
import HeroBanner from "@/components/HeroBanner";
import CustomerReviews from "@/components/CustomerReviews";
import PageError from "@/components/PageError";

const Index = ({ content }: any) => {
  const [collections, setCollections] = useState<any>([]);
  const [trending, setTrending] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (content) {
      const { categories, trending, upComing } = content;
      setCollections(categories);
      setTrending(trending);
      setUpcoming(upComing);
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }, [content]);
  //console.log(content)
  return (
    <div className="wrapper">
      <HeroBanner />
      {loading ? (
        <SmallLoader />
      ) : error ? (
        <PageError />
      ) : (
        <>
          <Categories items={collections} />
          <Filters />
          <TrendingEvents items={trending} />
          <UpcomingEvents items={upcoming} />
          <CustomerReviews />
        </>
      )}
    </div>
  );
};

export default Index;
