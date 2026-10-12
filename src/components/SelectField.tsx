"use client";
import React from "react";
import Select from "react-select";
type props = {
  name: string;
  options: any;
  selected?: any;
  onChange: any;
  isMulti?: boolean;
};

const SelectField = ({
  name,
  options,
  selected,
  onChange,
  isMulti = false,
}: props) => {
  const handleChange = (selected: any) => {
    onChange(selected);

  };
  return (
    <Select
      className="basic-single react-select-container"
      classNamePrefix="react-select"
      value={selected}
      isClearable={true}
      isSearchable={true}
      name={name ? name : "text"}
      onChange={handleChange}
      isMulti={isMulti}
      options={options}
      required
    />
  );
};

export default SelectField;