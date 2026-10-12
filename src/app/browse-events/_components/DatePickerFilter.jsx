"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerFilter({ handleChange, searchQuery }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      let obj = {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
      };
      handleChange(obj);
    }
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const { StartDate, EndDate } = searchQuery;
    if (StartDate) setStartDate(moment(StartDate).toDate());
    if (EndDate) setEndDate(moment(EndDate).toDate());
  }, [searchQuery]);
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      placeholderText={"Select date range"}
      selectsDisabledDaysInRange
    />
  );
}

export default DatePickerFilter;
