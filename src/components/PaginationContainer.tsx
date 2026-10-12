"use client";
import React from "react";

interface Provider {
  page: any;
  pages: any;
  handleChange: any;
}

const PaginationContainer = ({ page, pages, handleChange }: Provider) => {
  return (
    // <CardWrapper className="pagination--wrapper">
    //   <Pagination
    //     page={page}
    //     count={pages}
    //     shape="rounded"
    //     onChange={handleChange}
    //     className="pagination"
    //   />
    // </CardWrapper>
    <div></div>
  );
};

export default PaginationContainer;
