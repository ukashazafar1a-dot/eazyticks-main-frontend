"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Filter from "./Filter";
import { useParams } from "next/navigation";
import SectionLoader from "@/components/SectionLoader";
import PageError from "@/components/PageError";
import EventsFlex from "@/components/EventsFlex";
import NoEvent from "@/components/NoEvent";
import PaginationBlock from "@/components/PaginationBlock";
import { baseURL } from "@/lib/utils";
import { fetchCategory } from "@/helpers/businessRequests";

var searchTimer: any = null;

type props = {
  content: any;
};

function ExploreEvents({ content }: props) {
  const params = useParams();
  const slug = params?.slug;
  const [sort, setSort] = useState("Date-Low");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState({
    name: "",
    eventCount: 0,
    events: [],
  });
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  function handleSortChange(value: any) {
    setSort(value);
  }

  function handlePageChange(value: any) {
    setPage(value);
  }

  function handleQueryChange(value: any) {
    searchTimer && clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setQuery(value);
    }, 1000);
  }

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await fetchCategory(
        `${baseURL}/Event/category?searchQuery=${query}&categoryName=${slug}&pageNo=${page}&pageSize=12&sort=${sort}`
      );
      //console.log(response);
      if (response && response?.succeeded) {
        const { data } = response;
        setCategory(data);
        setEventCount(data?.eventCount);
        setLoading(false);
        const element = document.getElementById("category-events");
        if (element) {
          // Scroll to the top of the events section
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
        }
      } else {
        setIsError(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [sort, page, query]);

  useEffect(() => {
    if (content) {
      setCategory(content);
      setEventCount(content?.eventCount);
      setIsloading(false);
      setIsError(false);
    } else {
      setIsError(true);
      setIsloading(false);
    }
  }, [content]);
  //console.log(content);
  return (
    <React.Fragment>
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <>
          <Banner title={category?.name} handleChange={handleQueryChange} />
          {category?.events?.length > 0 ? (
            <div
              className={`container px-0 md:px-3 pb-8 relative ${
                loading ? "small--loader" : ""
              }`}
              id="category-events"
            >
              <Filter
                count={eventCount}
                sort={sort}
                loading={loading}
                handleChange={handleSortChange}
              />
              <EventsFlex events={category?.events} />
              <PaginationBlock
                currentPage={page}
                count={eventCount}
                perPage={12}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <NoEvent />
          )}
        </>
      )}
    </React.Fragment>
  );
}

export default ExploreEvents;
