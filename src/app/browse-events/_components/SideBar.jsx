"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useState } from "react";
import DatePickerFilter from "./DatePickerFilter";
import CategorySearchFilter from "./CategorySearchFilter";
import useApp from "@/context/useApp";
import { IoCloseSharp } from "react-icons/io5";
import OnOffSwitch from "@/components/OnOffSwitch";



const Sidebar = ({
  searchQuery,
  handleDateChange,
  handleCategoryChange,
  category,
  showSidebar,
  closeSidebar,
  categories,
}) => {
  const { user } = useApp();
  const [openSubMenus, setOpenSubMenus] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleClickActiveClass = (subFilter) => {
    if (activeFilter === subFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(subFilter);
    }
  };

  const handleSubMenuToggle = (index) => {
    if (openSubMenus.includes(index)) {
      setOpenSubMenus(openSubMenus.filter((i) => i !== index));
    } else {
      setOpenSubMenus([...openSubMenus, index]);
    }
  };

  return (
    <div
      className={`sidebar--main hidden lg:block ${showSidebar ? "active" : "not-active"}`}
      style={{ display: showSidebar ? "block" : "none" }}
    >
      <div id="hidden-element" className="main-content-sidebar">
        <div className="text-center py-3 mb-2 border-b flex items-center justify-between lg:justify-center px-3">
          <h2 className="text-2xl font-medium">Filter Events</h2>
          <button
            className="btn--svg btn-filter-close lg:hidden"
            onClick={(e) => closeSidebar(!showSidebar)}
          >
            <IoCloseSharp className="icon icon-close" />
          </button>
        </div>
        {user && (
          <div className="p-3 border-b mb-2">
            <div className="flex items-center justify-start gap-2">
              <div className="font-medium text-lg">Only show events from organizers I follow</div>
              <span className="icon-main">
                <OnOffSwitch />
              </span>
            </div>
          </div>
        )}
        <div className="p-3">
          <div
            className={`item date-item mb-3 border-b ${
              openSubMenus.includes(5) ? "active" : "not-active"
            }`}
            key={"Date"}
          >
            <div
              className="flex items-center justify-between gap-2 cursor-pointer mb-2"
              onClick={() => handleSubMenuToggle(5)}
            >
              <p className="font-medium text-lg">{"Date"}</p>
              <span className="arrow-icon">
                {openSubMenus.includes(5) ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>
            {openSubMenus.includes(5) && (
              <ul className="filter-subMenu mb-2">
                <DatePickerFilter
                  handleChange={handleDateChange}
                  searchQuery={searchQuery}
                />
              </ul>
            )}
          </div>
          <div
            className={`item category-item ${
              openSubMenus.includes(6) ? "active" : "not-active"
            }`}
            key={"Category"}
          >
            <div
              className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
              onClick={() => handleSubMenuToggle(6)}
            >
              <p className="font-medium text-lg">{"Category"}</p>
              <span className="arrow-icon">
                {openSubMenus.includes(6) ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>
            {openSubMenus.includes(6) && (
              <ul className="filter-subMenu mb-2">
                <CategorySearchFilter
                  value={category}
                  categories={categories}
                  handleChange={handleCategoryChange}
                />
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
