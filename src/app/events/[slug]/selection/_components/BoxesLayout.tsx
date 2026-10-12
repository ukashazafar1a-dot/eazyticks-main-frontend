"use client";
import React from "react";
import TicketBox from "./TicketBox";


const firstRow = [
  {
    id: 16,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 15,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 14,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 13,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 12,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 11,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 10,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 9,
    tickets: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 8,
    tickets: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 7,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 6,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 5,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 4,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 3,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 2,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 1,
    tickets: [1, 2, 3, 4, 5, 6, 7, 8],
  },
];
const secondRow = [
  {
    id: 16,
    tickets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  },
  {
    id: 15,
    tickets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    id: 14,
    tickets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    id: 13,
    tickets: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
  },
  {
    id: 12,
    tickets: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29,
    ],
  },
  {
    id: 11,
    tickets: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28,
    ],
  },
  {
    id: 10,
    tickets: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    ],
  },
  {
    id: 9,
    tickets: [
      7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ],
  },
  {
    id: 8,
    tickets: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  },
  {
    id: 7,
    tickets: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    ],
  },
  {
    id: 6,
    tickets: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    ],
  },
  {
    id: 5,
    tickets: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    ],
  },
  {
    id: 4,
    tickets: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    id: 3,
    tickets: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  {
    id: 2,
    tickets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  {
    id: 1,
    tickets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  },
];
const thirdRow = [
  {
    id: 16,
    tickets: [23, 24, 25, 26, 27, 28, 29, 30],
  },
  {
    id: 15,
    tickets: [25, 26, 27, 28, 29, 30, 31, 32],
  },
  {
    id: 14,
    tickets: [25, 26, 27, 28, 29, 30, 31, 32],
  },
  {
    id: 13,
    tickets: [31, 32, 33, 34, 35, 36, 37, 38],
  },
  {
    id: 12,
    tickets: [30, 31, 32, 33, 34, 35, 36, 37],
  },
  {
    id: 11,
    tickets: [29, 30, 31, 32, 33, 34, 35, 36],
  },
  {
    id: 10,
    tickets: [28, 29, 30, 31, 32, 33, 34, 35],
  },
  {
    id: 9,
    tickets: [25, 26, 27, 28, 29, 30],
  },
  {
    id: 8,
    tickets: [23, 24, 25, 26, 27, 28],
  },
  {
    id: 7,
    tickets: [28, 29, 30, 31, 32, 33, 34, 35],
  },
  {
    id: 6,
    tickets: [27, 28, 29, 30, 31, 32, 33, 34, 35],
  },
  {
    id: 5,
    tickets: [27, 28, 29, 30, 31, 32, 33, 34, 35],
  },
  {
    id: 4,
    tickets: [25, 26, 27, 28, 29, 30, 31, 32, 33],
  },
  {
    id: 3,
    tickets: [24, 25, 26, 27, 28, 29, 30, 31, 32],
  },
  {
    id: 2,
    tickets: [22, 23, 24, 25, 26, 27, 28, 29],
  },
  {
    id: 1,
    tickets: [20, 21, 22, 23, 24, 25, 26, 27],
  },
];
const alphabets = ["P","O","N","M","L","K","J","I","H","G","F","E","D","C","B","A"];
const BoxesLayout = ({ handleOnClick, ticket }: any) => {
  return (
    <div className="boxes-layout">
      <div className="name-wrapper">
        {alphabets?.map((alpha:string) => {
          return <div className="row-name" key={alpha}>{alpha}</div>
        })}
      </div>
      <div className="first-side">
        <TicketBox
          rows={firstRow}
          handleOnClick={handleOnClick}
          seats={ticket?.seats}
          id={ticket?.id}
          type="first"
        />
      </div>
      <div className="second-side">
        <TicketBox
          rows={secondRow}
          handleOnClick={handleOnClick}
          seats={ticket?.seats}
          type="second"
          id={ticket?.id}
        />
      </div>
      <div className="third-side">
        <TicketBox
          rows={thirdRow}
          handleOnClick={handleOnClick}
          seats={ticket?.seats}
          id={ticket?.id}
        />
      </div>
    </div>
  );
};

export default BoxesLayout;
