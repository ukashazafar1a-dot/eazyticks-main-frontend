import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Filter = ({ count, handleChange, sort, loading }: any) => {
  return (
    <div
      className={`container px-3 mx-auto flex items-end md:items-center py-3 ${
        count > 0 ? "justify-between" : "justify-end"
      }`}
    >
      {count > 0 && (
        <p className="m-0">
          {count}
          {count === 1 ? " Event" : " Events"}
        </p>
      )}
      <div className="events-sorting flex items-end justify-start gap-2">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-primary" />
          </div>
        )}
        <div className="sort-form">
          <p className="text-sm m-0">Sort By</p>
          <Select value={sort} onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-[180px]" aria-label="Sort by">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"A-Z"}>A to Z</SelectItem>
              <SelectItem value={"Z-A"}>Z to A</SelectItem>
              <SelectItem value={"Low-Price"}>Low Price</SelectItem>
              <SelectItem value={"High-Price"}>High Price</SelectItem>
              <SelectItem value={"Date-Low"}>Date, new to old</SelectItem>
              <SelectItem value={"Date-High"}>Date, old to new</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
