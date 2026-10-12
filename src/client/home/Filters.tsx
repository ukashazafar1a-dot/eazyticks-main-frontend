"use client";
import React, { useEffect, useState } from "react";
import FilteredItems from "./FilteredItems";
import SearchLocation from "./components/SearchLocation";
import "./style.css";
import {
  getCategory,
  getForYouEvents,
  getTodayEvents,
  getWeekendEvents,
} from "@/helpers/businessRequests";
import SectionLoader from "@/components/SectionLoader";
import PageError from "@/components/PageError";
import { useTheme } from "@/context/ThemeContext";
import LocationPermission from "./LocationPermission";
import { FilterTags } from "@/helpers/StaticData";
import FilterTagBar from "./FilterTagBar";

var searchTimer: any = null;

function Filters() {
  const { location: stateLocation, setLocation: updateLocation } = useTheme();
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeTag, setActiveTag] = useState(FilterTags[0].value);

  let searchTimer: any = null;

  const fetchEvents = async (fetchFn: Function, ...args: any[]) => {
    try {
      setIsLoading(true);
      const { data: response } = await fetchFn(...args);
      if (response && response?.succeeded) {
        setEvents(response.data || []);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCategoryEvents = async (fetchFn: Function, ...args: any[]) => {
    try {
      setIsLoading(true);
      const { data: response } = await fetchFn(...args);
      if (response && response?.succeeded) {
        setEvents(response.data?.events || []);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFetch = (value: any) => {
    if (!value) return;
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      fetchEvents(getForYouEvents, {
        state: location,
        city: stateLocation?.city || "",
      });
      updateLocation({
        state: location,
        city: stateLocation?.city || "",
      });
    }, 500);
  };

  const handleLocationChange = function (value: any) {
    setLocation(value);
    debounceFetch(value);
  };

  const handleChangeTag = function (tag: any) {
    setActiveTag(tag?.value);
    setIsLoading(true);
    if (tag?.type === "live") {
      fetchEvents(getForYouEvents, {
        state: location,
        city: stateLocation?.city || "",
      });
    } else if (tag?.type === "today") {
      fetchEvents(getTodayEvents);
    } else if (tag?.type === "weekend") {
      fetchEvents(getWeekendEvents);
    } else if (tag?.type === "category") {
      fetchCategoryEvents(getCategory, tag.title, 0, "A-Z", "");
    }
  };

  useEffect(() => {
    if (stateLocation) {
      setLocation(stateLocation.state);
    }
    fetchEvents(getForYouEvents, stateLocation || null);
  }, []);
  //console.log(stateLocation);
  return (
    <div className="container py-16 px-4">
      <div className="mb-3">
        <div className="section--heading mb-4">
          <SearchLocation
            location={location}
            handleLocationChange={handleLocationChange}
          />
        </div>
        <FilterTagBar
          activeTag={activeTag}
          tags={FilterTags}
          handleChangeTag={handleChangeTag}
        />
      </div>
      <div className="pt-6 pb-5">
        {isLoading ? (
          <SectionLoader />
        ) : isError ? (
          <>
            {/* <PageError /> */}
            {/* commenting out PageError as it shows error when no events are found for selected filter */}
            <FilteredItems items={[]} />
          </>
        ) : (
          <>
            <FilteredItems items={events} />
          </>
        )}
      </div>
    </div>
  );
}

export default Filters;
