import React from "react";
import TicketButton from "./TicketButton";

const TicketBox = ({ rows, handleOnClick, seats, type, id }: any) => {
  const findSeatStatus = (rowNo: any, seatNo: any) => {
    if (seats && seats?.length > 0) {
      const seat = seats.find(
        (seat: any) => seat?.rowNo === rowNo && seat?.seatNo === seatNo
      );
      if (seat) {
        return seat?.status;
      } else {
        return "available";
      }
    } else {
      return "available";
    }
  };
  return (
    <>
      {rows?.map((row: any,index:number) => {
        return (
          <div
            key={`row-${row?.id}`}
            className={`buttons-rows br-${row?.id}`}
            style={{ "--rowIndex": row?.id } as React.CSSProperties}
          >
            {row?.tickets?.map((button: any, index: any) => {
              const isBooked: boolean = findSeatStatus(row?.id, button);
              return (
                <TicketButton
                  key={`${row?.id}-${button}-${index}`}
                  row={row}
                  button={button}
                  handleOnClick={handleOnClick}
                  isBooked={isBooked}
                  id={id}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default TicketBox;
