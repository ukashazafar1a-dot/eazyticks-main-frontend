"use client";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type props = {
  count: number;
  currentPage: number;
  onChange?: any;
  perPage?: number;
};

const PaginationBlock = ({
  count,
  currentPage,
  onChange,
  perPage = 10,
}: props) => {
  const totalPages: any = Math.ceil(count / perPage);
  const pageNeighbours = 1;

  if (count === 0) return null;
  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 1 + 2; // Visible numbers on either side of current page + current + 2 ellipses
    const totalBlocks = totalNumbers + 2; // Total including ellipses

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages: any = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ["...", ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, "..."];
      } else {
        pages = ["...", ...pages, "..."];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const pageNumbers = fetchPageNumbers();
  const handlePageClick = (pageNumber: any) => {
    if (pageNumber === "...") {
      return; // Optionally handle ellipsis click here
    }
    onChange(pageNumber);
  };

  return (
    <div className="pagination-wrappper flex items-center justify-center flex-wrap gap-2 mt-2 py-2 px-3 bg-white text-black rounded w-full">
      {totalPages > 1 && (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            type="button"
            className="flex items-center p-2 text-gray-400 border rounded-s"
            onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdArrowBackIosNew className="" />
          </button>
          {pageNumbers?.map((page, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center py-2 px-3 border ${
                currentPage === page
                  ? "bg-primary border-primary border text-white"
                  : ""
              } `}
              disabled={currentPage === page || page === "..."}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="flex items-center p-2 text-gray-600 border rounded-e"
            onClick={() =>
              handlePageClick(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdArrowForwardIos />
          </button>
        </nav>
      )}
    </div>
  );
};

export default PaginationBlock;
