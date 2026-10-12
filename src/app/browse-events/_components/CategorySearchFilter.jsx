"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function CategorySearchFilter({ value, categories, handleChange }) {
  const [options, setOptions] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categories) {
      setOptions(
        categories.map((category) => {
          return {
            label: category.name,
            value: category.name,
          };
        })
      );
    }
  }, [categories]);

  useEffect(() => {
    if (options && value) {
      setCategory(options.filter((item) => item.value === value));
    }
  }, [value, categories, options]);

  return <Select options={options} onChange={handleChange} value={category} />;
}

export default CategorySearchFilter;
