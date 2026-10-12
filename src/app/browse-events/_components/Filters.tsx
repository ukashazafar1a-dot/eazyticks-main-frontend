"use client";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import moment from "moment";
import { getNonEmptyFields } from "@/helpers/generals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Provider {
  sort: any;
  setSort: any;
  count: number;
  searchQuery: any;
  setSearchQuery: any;
  showSidebar: any;
  setShowSidebar: any;
  handleReset: any;
  handleRefetch: any;
}

const Filters = ({
  sort,
  setSort,
  count,
  searchQuery,
  setSearchQuery,
  showSidebar,
  handleReset,
  setShowSidebar,
  handleRefetch,
}: Provider) => {
  const [tags, setTags] = useState<any>([]);

  function handleDelete(name: any) {
    if (name == "DateRange") {
      let obj = { ...searchQuery, startDate: null, endDate: null };
      setSearchQuery({ ...searchQuery, ...obj });
      handleRefetch(obj);
      return;
    } else {
      let obj = { ...searchQuery, [name]: null };
      setSearchQuery({ ...searchQuery, ...obj });
      handleRefetch(obj);
    }
  }

  useEffect(() => {
    let fields: any = getNonEmptyFields(searchQuery);
    let fieldsArr: any = [],
      startDate: any = null,
      endDate: any = null;
    for (const key in fields) {
      if (key == "pageSize" || key == "pageNo" || key == "q") continue;
      if (key == "startDate") {
        startDate = fields[key];
        continue;
      }
      if (key == "endDate") {
        endDate = fields[key];
        continue;
      }
      fieldsArr.push({
        name: key,
        value: fields[key],
      });
    }
    if (startDate !== null && endDate !== null) {
      fieldsArr.push({
        name: "DateRange",
        value:
          moment(startDate).format("DDMMMM") +
          " - " +
          moment(endDate).format("DDMMMM"),
      });
    }
    setTags(fieldsArr);
  }, [searchQuery]);

  return (
    <div className="block p-3 relative">
      <div className="events--count mb-2">
        <p className="mb-2 ">
          {count}
          {" Events"}
        </p>
        <div className="flex items-center justify-start gap-2">
          {tags.map((tag: any, i: any) => {
            return (
              <Badge
                onClick={() => handleDelete(tag.name)}
                key={i}
                className="cursor-pointer"
              >
                {tag?.value}
              </Badge>
            );
          })}
          {tags.length > 0 && (
            <Badge
              className="cursor-pointer"
              onClick={() => handleReset()}
              variant={"destructive"}
            >
              Reset all
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between lg:justify-end">
        <button
          className="btn-toggle-sidebar flex items-center justify-center gap-2 lg:hidden"
          onClick={(e) => setShowSidebar(!showSidebar)}
        >
          <span>Filter</span>
          <IoFilterOutline className="icon icon-filter" />
        </button>
        <div className="events-sorting">
          {sort?.sort && <p className="mb-1">Sort By</p>}
          <Select
            value={sort?.sort ? sort?.sort : ""}
            onValueChange={(value) => setSort(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-Z">A to Z</SelectItem>
              <SelectItem value="Z-A">Z to A</SelectItem>
              <SelectItem value="Low-Price">Low Price</SelectItem>
              <SelectItem value="High-Price">High Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
