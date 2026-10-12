"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Sidebar from "./SideBar";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Filters from "./Filters";
import { isDeviceMobile } from "@/helpers/generals";
import { getLiveSearch } from "@/helpers/businessRequests";
import PageError from "@/components/PageError";
import SectionLoader from "@/components/SectionLoader";
import "./style.css";
import EventCardSearchPage from "@/components/EventCardSearchPage";
import NoEvent from "@/components/NoEvent";
import PaginationBlock from "@/components/PaginationBlock";
import useQueryParams from "@/components/UseQueryParams";

const takeItems = 10;
var searchTimer: any = null;

const IndexBrowesEvents = () => {
  const searchParams = useSearchParams();
  const { setQueryParams } = useQueryParams();
  const [categories, setCategories] = useState(null);
  const [searchResults, setSearchResults] = useState({
    events: [],
    count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [eventCount, setEventCount] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState<any>({
    q: null,
    pageSize: null,
    sort: null,
    pageNo: null,
    category: null,
    orgId: null,
    startDate: null,
    endDate: null,
  });

  function handleQueryChange(value: any) {
    setQuery(value);
    searchTimer && clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setSearchQuery({ ...searchQuery, q: query });
      let obj = { ...searchQuery, q: query };
      getResults(obj);
    }, 1000);
  }

  function hanldeDateChange(dates: any) {
    const { start, end } = dates;
    setSearchQuery({ ...searchQuery, startDate: start, endDate: end });
    if (isDeviceMobile()) {
      setShowSidebar(!showSidebar);
    }
    let obj = { ...searchQuery, startDate: start, endDate: end };
    getResults(obj);
  }

  function handleSortChange(value: any) {
    setSearchQuery({ ...searchQuery, sort: value });
    let obj = { ...searchQuery, sort: value };
    getResults(obj);
  }

  const handleCategoryChange = (value: any) => {
    setCategory(value.label);
    setSearchQuery({ ...searchQuery, category: value.label });
    if (isDeviceMobile()) {
      setShowSidebar(!showSidebar);
    }
    let obj = { ...searchQuery, category: value.label };
    getResults(obj);
  };

  const getResults = async (data: any) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setQueryParams({ ...data });
      //console.log(data);
      const result = await getLiveSearch(data);
      //console.log(result);
      if (result && result?.succeeded) {
        const { data } = result;
        setSearchResults(data);
        //console.log(data);
        setEventCount(data?.count);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handlePageChange = (value: any) => {
    setPage(value);
    const obj = { ...searchQuery, pageNo: value };
    getResults(obj);
  };

  function setRecievedParams() {
    let q: any = {};
    let t1: any, t3: any, t4: any, t5: any, t6: any, t7: any, t8: any;
    t1 = searchParams?.get("pageNo");
    t3 = searchParams?.get("category");
    t4 = searchParams?.get("orgId");
    t5 = searchParams?.get("startDate");
    t6 = searchParams?.get("endDate");
    t7 = searchParams?.get("sort");
    t8 = searchParams?.get("q");
    q.pageSize = 10;
    q.pageNo = 1;
    if (t3) {
      q.category = t3;
      setCategory(t3);
    }
    if (t4) {
      q.orgId = t4;
      setOrganizer(t4);
    }
    if (t5) q.startDate = t5;
    if (t6) q.endDate = t6;
    if (t7) q.sort = t7;
    if (t8) (q.q = t8), setQuery(t8);
    //console.log(q);
    setSearchQuery({ ...searchQuery, ...q });
    setQueryParams({ ...searchQuery, ...q });
    const obj = { ...searchQuery, ...q };
    //console.log(obj)
    getResults(obj);
  }

  const getCategories = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/categories")
      .then((response) => {
        const { data: result } = response;
        if (result && result?.succeeded) {
          setCategories(result?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReset = () => {
    const obj = {
      q: null,
      pageSize: 10,
      sort: null,
      pageNo: 1,
      category: null,
      orgId: null,
      startDate: null,
      endDate: null,
    };
    setSearchQuery({ ...searchQuery, ...obj });
    getResults(obj);
  };
  const handleGetResults = (data: any) => {
    getResults(data);
  };

  useEffect(() => {
    setRecievedParams();
    getCategories();
    if (isDeviceMobile()) {
      setShowSidebar(false);
    }
  }, []);
  //console.log("here ithe new ", pages, page);
  return (
    <div className="browse-page-template">
      <Banner
        handleChange={handleQueryChange}
        handleGetResults={handleGetResults}
        query={query}
      />
      {isError ? (
        <PageError />
      ) : (
        <div className="main--page-wrap flex justify-start">
          <Sidebar
            showSidebar={showSidebar}
            closeSidebar={setShowSidebar}
            handleCategoryChange={handleCategoryChange}
            category={category}
            handleDateChange={hanldeDateChange}
            searchQuery={searchQuery}
            categories={categories}
          />
          <div className="content--wrapper">
            <Filters
              sort={searchQuery}
              setSort={handleSortChange}
              count={searchResults?.count}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              handleReset={handleReset}
              handleRefetch={handleGetResults}
            />
            {isLoading ? (
              <SectionLoader />
            ) : (
              <div className="result-wrapper p-3">
                {searchResults.events.length > 0 ? (
                  searchResults.events.map((event: any) => {
                    return (
                      <EventCardSearchPage event={event} key={event?.slug} />
                    );
                  })
                ) : (
                  <NoEvent />
                )}
              </div>
            )}
            <PaginationBlock
              count={eventCount}
              currentPage={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexBrowesEvents;
