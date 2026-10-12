"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  getHomePageData,
  getLiveSearch,
  getPopularSearches,
} from "@/helpers/businessRequests";
import { addSearch, getSearch } from "@/helpers/SearchHistory";
import { useRouter } from "next/navigation";
import { getDaysRange, getTodayDate, sliderDown } from "@/helpers/generals";
import SearchCard from "./SeachCard";
import { Badge } from "./ui/badge";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import RecentSearch from "./RecentSearch";
import SectionLoader from "./SectionLoader";
import { useTheme } from "@/context/ThemeContext";

const takeItems = 10;
var searchTimer: any = null;

const tags = [
  {
    title: "Today",
    value: "today",
    type: "today",
  },
  {
    title: "This weekend",
    value: "this-weekend",
    type: "weekend",
  },
  {
    title: "Football",
    value: "football",
    type: "category",
  },
  {
    title: "Basketball",
    value: "basketball",
    type: "category",
  },
  {
    title: "Parent Student Center",
    value: "student-parent",
    type: "category",
  },
  {
    title: "Party",
    value: "party",
    type: "category",
  },
];

export default function SearchContainer() {
  const [searchResults, setSearchResults] = useState<any>({
    events: [],
    count: 0,
  });
  const { searchDrawer, toggleSearchDrawer } = useTheme();
  const [searchTerms, setSearchTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<any>(null);
  const [type, setType] = useState<any>("");
  const router = useRouter();

  const handleChangeTag = function (tag: any) {
    setActiveTag(tag.value);
    if (tag.type === "today") {
      let today = getTodayDate();
      router.push("/browse-events?startDate=" + today + "&endDate=" + today);
      sliderDown();
      toggleSearchDrawer(!searchDrawer);
      // Navigate with today date
    } else if (tag.type === "weekend") {
      const { firstDay, lastDay } = getDaysRange(7);
      router.push(
        "/browse-events?startDate=" + firstDay + "&endDate=" + lastDay
      );
      sliderDown();
      toggleSearchDrawer(!searchDrawer);
      // Navigate with week date range
    } else if (tag.type === "category") {
      sliderDown();
      router.push("/browse-events?category=" + tag.title);
      toggleSearchDrawer(!searchDrawer);
    }
  };

  const getTrendingTerms = async () => {
    try {
      const { data: response } = await getPopularSearches();
      //console.log(response);
      if (response && response?.succeeded) {
        setSearchTerms(response?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTrendingEvents = async () => {
    if (searchResults?.events?.length === 0) {
      try {
        const { data: response } = await getHomePageData();
        //console.log(response);
        if (response && response?.succeeded) {
          const { data } = response;
          const { trending } = data;
          setSearchResults({
            events: trending,
            count: 0,
          });
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
  };

  function handleQueryChange(value: any) {
    setQuery(value);
    searchTimer && clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      getResults(value);
      addSearch(value);
      updateSearch();
    }, 1000);
  }

  const handleTag = (title: string) => {
    if (title === type) {
      return "active";
    } else {
      return "false";
    }
  };
  const getResults = async (value: any) => {
    const obj = {
      q: value,
      pageSize: takeItems,
      sort: "A-Z",
      pageNo: (page - 1) * takeItems,
    };
    try {
      //console.log(q)
      setIsLoading(true);
      const response = await getLiveSearch(obj);
      //console.log(data);
      if (response && response?.succeeded) {
        const { data } = response;
        setSearchResults(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  function updateSearch() {
    setSearchHistory(getSearch());
  }

  useEffect(() => {
    if (searchDrawer) {
      updateSearch();
      getTrendingEvents();
      getTrendingTerms();
    }
    const body = document.querySelector('body');
    if(body){
      if(searchDrawer){
        body.classList.add('st-overflow-hidden')
      }else{
        body.classList.remove('st-overflow-hidden')
      }
    }
  }, [searchDrawer]);
  useEffect(() => {
    if (typeof window !== undefined) {
      const queryParameters = new URLSearchParams(window.location.search);
      const type: any = queryParameters.get("category");
      setType(type);
    }
  }, []);
  //console.log(searchResults, searchHistory, searchTerms);
  return (
    <div className="search-drawer-main">
      <div
        id="SearchDrawer"
        className={`search-drawer fixed block bg-[#f5f5f5] inset-0 h-100 w-100 overflow-hidden overflow-y-auto z-50 translate-y-full ${
          searchDrawer ? "init-slider" : "deinit-slider"
        }`}
      >
        <div className="relative pb-6 pt-10 z-10">
          <div className="absolute top-[8px] right-[10px] cursor-pointer">
            <IoCloseSharp
              className="icon icon-close"
              onClick={() => toggleSearchDrawer(!searchDrawer)}
            />
          </div>
          <div className="flex items-center justify-start gap-2 bg-white rounded-full px-3 py-1 max-w-screen-lg mx-auto mb-3 shadow">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <CiSearch className="icon icon--search" />
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => handleQueryChange(e.target?.value)}
              className="input--field border-0"
            />
          </div>
          <div
            className={`filter-tag-bar ${
              query ? "shift-direction" : "else-nothing"
            }`}
          >
            <div className="flex items-center justify-start gap-2 flex-wrap rounded-full px-3 py-1 max-w-screen-lg mx-auto mb-3">
              {tags?.map((tag) => {
                return (
                  <Badge
                    key={tag.value}
                    variant="primary"
                    className="font-normal cursor-pointer"
                    onClick={() => handleChangeTag(tag)}
                    id={handleTag(tag?.title)}
                  >
                    {tag?.title}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="search-results-wrapper">
            <div
              className={`flex items-start justify-start px-3 gap-3 md:flex-row flex-col ${
                query ? "shift-direction" : "else-nothing"
              }`}
            >
              <RecentSearch history={searchHistory} terms={searchTerms} />
              {isLoading ? (
                <div className="block w-full">
                  <SectionLoader />
                </div>
              ) : (
                <SearchCard events={searchResults?.events} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
