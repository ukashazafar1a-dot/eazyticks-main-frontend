import useApp from "@/context/useApp";
import useHybridLayout from "@/hooks/useHybridLayout";
import { AlumniTDistNames, Ticket } from "@/lib/types";
import { extractConfirmed, extractSeatNos } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

type props = {
  tickets: Ticket[] | null;
  handleRefetch?: () => void;
  type?: string;
};

const Alumni2Layout = ({ tickets }: props) => {
  const [tables, setTables] = useState<Ticket[] | null>(null);
  const { getItem } = useCart();
  const { handleAddToCart } = useHybridLayout();
  const { setToaster } = useApp();

  const getClassNames = (table: AlumniTDistNames, seatNumber: any) => {
    const classes = ["tb-s "];
    const foundTicket = tables?.find((ticket) => {
      return ticket?.name.toLowerCase() === table.toLowerCase();
    });
    if (!foundTicket) {
      classes.push("not-found");
      return classes.join(" ");
    }
    const booked = extractSeatNos(foundTicket?.seats);
    const sold = extractConfirmed(foundTicket?.seats);
    if (booked?.includes(seatNumber)) {
      classes.push("booked");
    }
    if (sold?.includes(seatNumber)) {
      classes.push("sold");
    }
    let id = `t-${foundTicket?.id}-r-1-b-${seatNumber}`;
    if (getItem(id)) {
      classes.push("in-cart");
    }
    return classes.join(" ");
  };

  const handleClick = (table: AlumniTDistNames, seat: number, name: string) => {
    const foundTicket = tables?.find((ticket) => {
      //console.log(ticket?.name.toLowerCase(), table.toLowerCase());
      return ticket?.name.toLowerCase() === table.toLowerCase();
    });
    if (foundTicket) {
      const exact = foundTicket?.seats?.find((tick) => tick?.seatNo == seat);
      //console.log(exact);
      if (
        (exact && exact?.status == "Confirmed") ||
        exact?.status == "Booked"
      ) {
        setToaster(
          "error",
          `${name} is already ${
            exact?.status == "Confirmed" ? "sold" : exact?.status
          }.`
        );
      } else {
        handleAddToCart(foundTicket, 1, seat, `${name}`);
      }
    } else {
      setToaster("error", `${table} is not available.`);
    }
  };

  useEffect(() => {
    if (tickets) {
      setTables(tickets);
    }
  }, [tickets]);
  return (
    <div className="alumni2-layout-wrapper">
      <p className="md-max:block hidden mb-3 w-full">
        <strong>Note: </strong>
        {`BE SURE TO SCROLL LEFT TO RIGHT ON THE SCREEN TO
        VIEW ALL SEATING. Click the numbered section to purchase.`}
      </p>
      <p className="md-max:block hidden mb-3 w-full">
        <strong>Tip: </strong>
        {"Zoom the seating map and tap a seat to select."}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 4185.33 2925.36"
      >
        <circle className="st2" cx="310.76" cy="514.62" r="67.05" />
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="1"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 1)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 1, "NATCHITOCHES ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M310.76,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="2"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 2)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 2, "NATCHITOCHES ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M310.76,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="3"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 3)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 3, "NATCHITOCHES ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M414.79,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="4"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 4)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 4, "NATCHITOCHES ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M206.72,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="5"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 5)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 5, "NATCHITOCHES ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M384.32,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="6"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 6)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 6, "NATCHITOCHES ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M237.2,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="7"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 7)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 7, "NATCHITOCHES ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M384.32,613.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NATCHITOCHES ALUMNI"
          data-seat="8"
          className={` ${getClassNames("NATCHITOCHES ALUMNI", 8)}`}
          onClick={() =>
            handleClick("NATCHITOCHES ALUMNI", 8, "NATCHITOCHES ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M237.2,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="888.12" cy="514.62" r="67.05" />
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="1"
          className={` ${getClassNames("RAYVILLE ALUMNI", 1)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 1, "RAYVILLE ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M888.12,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="2"
          className={` ${getClassNames("RAYVILLE ALUMNI", 2)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 2, "RAYVILLE ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M888.12,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="3"
          className={` ${getClassNames("RAYVILLE ALUMNI", 3)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 3, "RAYVILLE ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M992.15,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="4"
          className={` ${getClassNames("RAYVILLE ALUMNI", 4)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 4, "RAYVILLE ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M784.08,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="5"
          className={` ${getClassNames("RAYVILLE ALUMNI", 5)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 5, "RAYVILLE ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M961.68,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="6"
          className={` ${getClassNames("RAYVILLE ALUMNI", 6)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 6, "RAYVILLE ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M814.56,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="7"
          className={` ${getClassNames("RAYVILLE ALUMNI", 7)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 7, "RAYVILLE ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M961.68,613.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="RAYVILLE ALUMNI"
          data-seat="8"
          className={` ${getClassNames("RAYVILLE ALUMNI", 8)}`}
          onClick={() =>
            handleClick("RAYVILLE ALUMNI", 8, "RAYVILLE ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M814.56,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1465.48" cy="514.62" r="67.05" />
        <g
          data-name="THETALAMBDA"
          data-seat="1"
          className={` ${getClassNames("THETALAMBDA", 1)}`}
          onClick={() => handleClick("THETALAMBDA", 1, "THETALAMBDA Seat 1")}
        >
          <path
            className="st2"
            d="M1465.48,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="2"
          className={` ${getClassNames("THETALAMBDA", 2)}`}
          onClick={() => handleClick("THETALAMBDA", 2, "THETALAMBDA Seat 2")}
        >
          <path
            className="st2"
            d="M1465.48,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="3"
          className={` ${getClassNames("THETALAMBDA", 3)}`}
          onClick={() => handleClick("THETALAMBDA", 3, "THETALAMBDA Seat 3")}
        >
          <path
            className="st2"
            d="M1569.51,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="4"
          className={` ${getClassNames("THETALAMBDA", 4)}`}
          onClick={() => handleClick("THETALAMBDA", 4, "THETALAMBDA Seat 4")}
        >
          <path
            className="st2"
            d="M1361.44,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="5"
          className={` ${getClassNames("THETALAMBDA", 5)}`}
          onClick={() => handleClick("THETALAMBDA", 5, "THETALAMBDA Seat 5")}
        >
          <path
            className="st2"
            d="M1539.04,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="6"
          className={` ${getClassNames("THETALAMBDA", 6)}`}
          onClick={() => handleClick("THETALAMBDA", 6, "THETALAMBDA Seat 6")}
        >
          <path
            className="st2"
            d="M1391.92,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="7"
          className={` ${getClassNames("THETALAMBDA", 7)}`}
          onClick={() => handleClick("THETALAMBDA", 7, "THETALAMBDA Seat 7")}
        >
          <path
            className="st2"
            d="M1539.04,613.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETALAMBDA"
          data-seat="8"
          className={` ${getClassNames("THETALAMBDA", 8)}`}
          onClick={() => handleClick("THETALAMBDA", 8, "THETALAMBDA Seat 8")}
        >
          <path
            className="st2"
            d="M1391.92,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="583.29" cy="869.43" r="67.05" />
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="1"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 1)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 1, "SHREVEPORT ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M583.29,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="2"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 2)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 2, "SHREVEPORT ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M583.29,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="3"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 3)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 3, "SHREVEPORT ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M687.33,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="4"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 4)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 4, "SHREVEPORT ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M479.25,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="5"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 5)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 5, "SHREVEPORT ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M656.85,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="6"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 6)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 6, "SHREVEPORT ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M509.73,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="7"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 7)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 7, "SHREVEPORT ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M656.85,967.82c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SHREVEPORT ALUMNI"
          data-seat="8"
          className={` ${getClassNames("SHREVEPORT ALUMNI", 8)}`}
          onClick={() =>
            handleClick("SHREVEPORT ALUMNI", 8, "SHREVEPORT ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M509.73,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1160.65" cy="869.43" r="67.05" />
        <g
          data-name="PIDELTA"
          data-seat="1"
          className={` ${getClassNames("PIDELTA", 1)}`}
          onClick={() => handleClick("PIDELTA", 1, "PIDELTA Seat 1")}
        >
          <path
            className="st2"
            d="M1160.65,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="2"
          className={` ${getClassNames("PIDELTA", 2)}`}
          onClick={() => handleClick("PIDELTA", 2, "PIDELTA Seat 2")}
        >
          <path
            className="st2"
            d="M1160.65,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="3"
          className={` ${getClassNames("PIDELTA", 3)}`}
          onClick={() => handleClick("PIDELTA", 3, "PIDELTA Seat 3")}
        >
          <path
            className="st2"
            d="M1264.69,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="4"
          className={` ${getClassNames("PIDELTA", 4)}`}
          onClick={() => handleClick("PIDELTA", 4, "PIDELTA Seat 4")}
        >
          <path
            className="st2"
            d="M1056.61,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="5"
          className={` ${getClassNames("PIDELTA", 5)}`}
          onClick={() => handleClick("PIDELTA", 5, "PIDELTA Seat 5")}
        >
          <path
            className="st2"
            d="M1234.21,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="6"
          className={` ${getClassNames("PIDELTA", 6)}`}
          onClick={() => handleClick("PIDELTA", 6, "PIDELTA Seat 6")}
        >
          <path
            className="st2"
            d="M1087.09,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="7"
          className={` ${getClassNames("PIDELTA", 7)}`}
          onClick={() => handleClick("PIDELTA", 7, "PIDELTA Seat 7")}
        >
          <path
            className="st2"
            d="M1234.21,967.82c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="PIDELTA"
          data-seat="8"
          className={` ${getClassNames("PIDELTA", 8)}`}
          onClick={() => handleClick("PIDELTA", 8, "PIDELTA Seat 8")}
        >
          <path
            className="st2"
            d="M1087.09,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1738.01" cy="869.43" r="67.05" />,
        <g
          data-name="ETA PI"
          data-seat="1"
          className={` ${getClassNames("ETA PI", 1)}`}
          onClick={() => handleClick("ETA PI", 1, "ETA PI Seat 1")}
        >
          <path
            className="st2"
            d="M1738.01,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="2"
          className={` ${getClassNames("ETA PI", 2)}`}
          onClick={() => handleClick("ETA PI", 2, "ETA PI Seat 2")}
        >
          <path
            className="st2"
            d="M1738.01,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="3"
          className={` ${getClassNames("ETA PI", 3)}`}
          onClick={() => handleClick("ETA PI", 3, "ETA PI Seat 3")}
        >
          <path
            className="st2"
            d="M1842.05,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="4"
          className={` ${getClassNames("ETA PI", 4)}`}
          onClick={() => handleClick("ETA PI", 4, "ETA PI Seat 4")}
        >
          <path
            className="st2"
            d="M1633.97,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="5"
          className={` ${getClassNames("ETA PI", 5)}`}
          onClick={() => handleClick("ETA PI", 5, "ETA PI Seat 5")}
        >
          <path
            className="st2"
            d="M1811.57,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="6"
          className={` ${getClassNames("ETA PI", 6)}`}
          onClick={() => handleClick("ETA PI", 6, "ETA PI Seat 6")}
        >
          <path
            className="st2"
            d="M1664.45,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="7"
          className={` ${getClassNames("ETA PI", 7)}`}
          onClick={() => handleClick("ETA PI", 7, "ETA PI Seat 7")}
        >
          <path
            className="st2"
            d="M1811.57,967.82c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ETA PI"
          data-seat="8"
          className={` ${getClassNames("ETA PI", 8)}`}
          onClick={() => handleClick("ETA PI", 8, "ETA PI Seat 8")}
        >
          <path
            className="st2"
            d="M1664.45,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="310.76" cy="1230.1" r="67.05" />
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="1"
          className={` ${getClassNames("GRAMBLING ALUMNI", 1)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 1, "GRAMBLING ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M310.76,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="2"
          className={` ${getClassNames("GRAMBLING ALUMNI", 2)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 2, "GRAMBLING ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M310.76,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="3"
          className={` ${getClassNames("GRAMBLING ALUMNI", 3)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 3, "GRAMBLING ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M414.79,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="4"
          className={` ${getClassNames("GRAMBLING ALUMNI", 4)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 4, "GRAMBLING ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M206.72,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="5"
          className={` ${getClassNames("GRAMBLING ALUMNI", 5)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 5, "GRAMBLING ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M384.32,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="6"
          className={` ${getClassNames("GRAMBLING ALUMNI", 6)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 6, "GRAMBLING ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M237.2,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="7"
          className={` ${getClassNames("GRAMBLING ALUMNI", 7)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 7, "GRAMBLING ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M384.32,1328.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRAMBLING ALUMNI"
          data-seat="8"
          className={` ${getClassNames("GRAMBLING ALUMNI", 8)}`}
          onClick={() =>
            handleClick("GRAMBLING ALUMNI", 8, "GRAMBLING ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M237.2,1181.36c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="888.12" cy="1230.1" r="67.05" />
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="1"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 1)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 1, "ALEXANDRIA ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M888.12,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="2"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 2)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 2, "ALEXANDRIA ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M888.12,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="3"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 3)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 3, "ALEXANDRIA ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M992.15,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="4"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 4)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 4, "ALEXANDRIA ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M784.08,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="5"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 5)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 5, "ALEXANDRIA ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M961.68,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="6"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 6)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 6, "ALEXANDRIA ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M814.56,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="7"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 7)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 7, "ALEXANDRIA ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M961.68,1328.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALEXANDRIA ALUMNI"
          data-seat="8"
          className={` ${getClassNames("ALEXANDRIA ALUMNI", 8)}`}
          onClick={() =>
            handleClick("ALEXANDRIA ALUMNI", 8, "ALEXANDRIA ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M814.56,1181.36c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1465.48" cy="1230.1" r="67.05" />
        <g
          data-name="XI APLHA"
          data-seat="1"
          className={` ${getClassNames("XI APLHA", 1)}`}
          onClick={() => handleClick("XI APLHA", 1, "XI APLHA Seat 1")}
        >
          <path
            className="st2"
            d="M1465.48,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="2"
          className={` ${getClassNames("XI APLHA", 2)}`}
          onClick={() => handleClick("XI APLHA", 2, "XI APLHA Seat 2")}
        >
          <path
            className="st2"
            d="M1465.48,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="3"
          className={` ${getClassNames("XI APLHA", 3)}`}
          onClick={() => handleClick("XI APLHA", 3, "XI APLHA Seat 3")}
        >
          <path
            className="st2"
            d="M1569.51,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="4"
          className={` ${getClassNames("XI APLHA", 4)}`}
          onClick={() => handleClick("XI APLHA", 4, "XI APLHA Seat 4")}
        >
          <path
            className="st2"
            d="M1361.44,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="5"
          className={` ${getClassNames("XI APLHA", 5)}`}
          onClick={() => handleClick("XI APLHA", 5, "XI APLHA Seat 5")}
        >
          <path
            className="st2"
            d="M1539.04,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="6"
          className={` ${getClassNames("XI APLHA", 6)}`}
          onClick={() => handleClick("XI APLHA", 6, "XI APLHA Seat 6")}
        >
          <path
            className="st2"
            d="M1391.92,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="7"
          className={` ${getClassNames("XI APLHA", 7)}`}
          onClick={() => handleClick("XI APLHA", 7, "XI APLHA Seat 7")}
        >
          <path
            className="st2"
            d="M1539.04,1328.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="8"
          className={` ${getClassNames("XI APLHA", 8)}`}
          onClick={() => handleClick("XI APLHA", 8, "XI APLHA Seat 8")}
        >
          <path
            className="st2"
            d="M1391.92,1181.36c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="583.29" cy="1584.92" r="67.05" />
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="1"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 1)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 1, "BOSSIER CITY ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M583.29,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="2"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 2)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 2, "BOSSIER CITY ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M583.29,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="3"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 3)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 3, "BOSSIER CITY ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M687.33,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="4"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 4)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 4, "BOSSIER CITY ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M479.25,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="5"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 5)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 5, "BOSSIER CITY ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M656.85,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="6"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 6)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 6, "BOSSIER CITY ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M509.73,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="7"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 7)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 7, "BOSSIER CITY ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M656.85,1683.31c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BOSSIER CITY ALUMNI"
          data-seat="8"
          className={` ${getClassNames("BOSSIER CITY ALUMNI", 8)}`}
          onClick={() =>
            handleClick("BOSSIER CITY ALUMNI", 8, "BOSSIER CITY ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M509.73,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1160.65" cy="1584.92" r="67.05" />
        <g
          data-name="GAMMA PSI"
          data-seat="1"
          className={` ${getClassNames("GAMMA PSI", 1)}`}
          onClick={() => handleClick("GAMMA PSI", 1, "GAMMA PSI Seat 1")}
        >
          <path
            className="st2"
            d="M1160.65,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="2"
          className={` ${getClassNames("GAMMA PSI", 2)}`}
          onClick={() => handleClick("GAMMA PSI", 2, "GAMMA PSI Seat 2")}
        >
          <path
            className="st2"
            d="M1160.65,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="3"
          className={` ${getClassNames("GAMMA PSI", 3)}`}
          onClick={() => handleClick("GAMMA PSI", 3, "GAMMA PSI Seat 3")}
        >
          <path
            className="st2"
            d="M1264.69,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="4"
          className={` ${getClassNames("GAMMA PSI", 4)}`}
          onClick={() => handleClick("GAMMA PSI", 4, "GAMMA PSI Seat 4")}
        >
          <path
            className="st2"
            d="M1056.61,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="5"
          className={` ${getClassNames("GAMMA PSI", 5)}`}
          onClick={() => handleClick("GAMMA PSI", 5, "GAMMA PSI Seat 5")}
        >
          <path
            className="st2"
            d="M1234.21,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="6"
          className={` ${getClassNames("GAMMA PSI", 6)}`}
          onClick={() => handleClick("GAMMA PSI", 6, "GAMMA PSI Seat 6")}
        >
          <path
            className="st2"
            d="M1087.09,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="7"
          className={` ${getClassNames("GAMMA PSI", 7)}`}
          onClick={() => handleClick("GAMMA PSI", 7, "GAMMA PSI Seat 7")}
        >
          <path
            className="st2"
            d="M1234.21,1683.31c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="8"
          className={` ${getClassNames("GAMMA PSI", 8)}`}
          onClick={() => handleClick("GAMMA PSI", 8, "GAMMA PSI Seat 8")}
        >
          <path
            className="st2"
            d="M1087.09,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1738.01" cy="1584.92" r="67.05" />
        <g
          data-name="NUOMEGA"
          data-seat="1"
          className={` ${getClassNames("NUOMEGA", 1)}`}
          onClick={() => handleClick("NUOMEGA", 1, "NUOMEGA Seat 1")}
        >
          <path
            className="st2"
            d="M1738.01,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="2"
          className={` ${getClassNames("NUOMEGA", 2)}`}
          onClick={() => handleClick("NUOMEGA", 2, "NUOMEGA Seat 2")}
        >
          <path
            className="st2"
            d="M1738.01,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="3"
          className={` ${getClassNames("NUOMEGA", 3)}`}
          onClick={() => handleClick("NUOMEGA", 3, "NUOMEGA Seat 3")}
        >
          <path
            className="st2"
            d="M1842.05,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="4"
          className={` ${getClassNames("NUOMEGA", 4)}`}
          onClick={() => handleClick("NUOMEGA", 4, "NUOMEGA Seat 4")}
        >
          <path
            className="st2"
            d="M1633.97,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="5"
          className={` ${getClassNames("NUOMEGA", 5)}`}
          onClick={() => handleClick("NUOMEGA", 5, "NUOMEGA Seat 5")}
        >
          <path
            className="st2"
            d="M1811.57,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="6"
          className={` ${getClassNames("NUOMEGA", 6)}`}
          onClick={() => handleClick("NUOMEGA", 6, "NUOMEGA Seat 6")}
        >
          <path
            className="st2"
            d="M1664.45,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="7"
          className={` ${getClassNames("NUOMEGA", 7)}`}
          onClick={() => handleClick("NUOMEGA", 7, "NUOMEGA Seat 7")}
        >
          <path
            className="st2"
            d="M1811.57,1683.31c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="8"
          className={` ${getClassNames("NUOMEGA", 8)}`}
          onClick={() => handleClick("NUOMEGA", 8, "NUOMEGA Seat 8")}
        >
          <path
            className="st2"
            d="M1664.45,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="310.76" cy="1945.58" r="67.05" />
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="1"
          className={` ${getClassNames("DELTA SIGMA THETA", 1)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 1, "DELTA SIGMA THETA Seat 1")
          }
        >
          <path
            className="st2"
            d="M310.76,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="2"
          className={` ${getClassNames("DELTA SIGMA THETA", 2)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 2, "DELTA SIGMA THETA Seat 2")
          }
        >
          <path
            className="st2"
            d="M310.76,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="3"
          className={` ${getClassNames("DELTA SIGMA THETA", 3)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 3, "DELTA SIGMA THETA Seat 3")
          }
        >
          <path
            className="st2"
            d="M414.79,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="4"
          className={` ${getClassNames("DELTA SIGMA THETA", 4)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 4, "DELTA SIGMA THETA Seat 4")
          }
        >
          <path
            className="st2"
            d="M206.72,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="5"
          className={` ${getClassNames("DELTA SIGMA THETA", 5)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 5, "DELTA SIGMA THETA Seat 5")
          }
        >
          <path
            className="st2"
            d="M384.32,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="6"
          className={` ${getClassNames("DELTA SIGMA THETA", 6)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 6, "DELTA SIGMA THETA Seat 6")
          }
        >
          <path
            className="st2"
            d="M237.2,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="7"
          className={` ${getClassNames("DELTA SIGMA THETA", 7)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 7, "DELTA SIGMA THETA Seat 7")
          }
        >
          <path
            className="st2"
            d="M384.32,2043.97c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="DELTA SIGMA THETA"
          data-seat="8"
          className={` ${getClassNames("DELTA SIGMA THETA", 8)}`}
          onClick={() =>
            handleClick("DELTA SIGMA THETA", 8, "DELTA SIGMA THETA Seat 8")
          }
        >
          <path
            className="st2"
            d="M237.2,1896.84c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="888.12" cy="1945.58" r="67.05" />
        <g
          data-name="ZETA PHI BETA"
          data-seat="1"
          className={` ${getClassNames("ZETA PHI BETA", 1)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 1, "ZETA PHI BETA Seat 1")
          }
        >
          <path
            className="st2"
            d="M888.12,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="2"
          className={` ${getClassNames("ZETA PHI BETA", 2)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 2, "ZETA PHI BETA Seat 2")
          }
        >
          <path
            className="st2"
            d="M888.12,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="3"
          className={` ${getClassNames("ZETA PHI BETA", 3)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 3, "ZETA PHI BETA Seat 3")
          }
        >
          <path
            className="st2"
            d="M992.15,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="4"
          className={` ${getClassNames("ZETA PHI BETA", 4)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 4, "ZETA PHI BETA Seat 4")
          }
        >
          <path
            className="st2"
            d="M784.08,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="5"
          className={` ${getClassNames("ZETA PHI BETA", 5)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 5, "ZETA PHI BETA Seat 5")
          }
        >
          <path
            className="st2"
            d="M961.68,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="6"
          className={` ${getClassNames("ZETA PHI BETA", 6)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 6, "ZETA PHI BETA Seat 6")
          }
        >
          <path
            className="st2"
            d="M814.56,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="7"
          className={` ${getClassNames("ZETA PHI BETA", 7)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 7, "ZETA PHI BETA Seat 7")
          }
        >
          <path
            className="st2"
            d="M961.68,2043.97c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ZETA PHI BETA"
          data-seat="8"
          className={` ${getClassNames("ZETA PHI BETA", 8)}`}
          onClick={() =>
            handleClick("ZETA PHI BETA", 8, "ZETA PHI BETA Seat 8")
          }
        >
          <path
            className="st2"
            d="M814.56,1896.84c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1465.48" cy="1945.58" r="67.05" />
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="1"
          className={` ${getClassNames("HAMMOND ALUMNI", 1)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 1, "HAMMOND ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M1465.48,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="2"
          className={` ${getClassNames("HAMMOND ALUMNI", 2)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 2, "HAMMOND ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M1465.48,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="3"
          className={` ${getClassNames("HAMMOND ALUMNI", 3)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 3, "HAMMOND ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M1569.51,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="4"
          className={` ${getClassNames("HAMMOND ALUMNI", 4)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 4, "HAMMOND ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M1361.44,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="5"
          className={` ${getClassNames("HAMMOND ALUMNI", 5)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 5, "HAMMOND ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M1539.04,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="6"
          className={` ${getClassNames("HAMMOND ALUMNI", 6)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 6, "HAMMOND ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M1391.92,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="7"
          className={` ${getClassNames("HAMMOND ALUMNI", 7)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 7, "HAMMOND ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M1539.04,2043.97c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HAMMOND ALUMNI"
          data-seat="8"
          className={` ${getClassNames("HAMMOND ALUMNI", 8)}`}
          onClick={() =>
            handleClick("HAMMOND ALUMNI", 8, "HAMMOND ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M1391.92,1896.84c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="583.29" cy="2300.4" r="67.05" />
        <g
          data-name="OMEGA PSI PHI"
          data-seat="1"
          className={` ${getClassNames("OMEGA PSI PHI", 1)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 1, "OMEGA PSI PHI Seat 1")
          }
        >
          <path
            className="st2"
            d="M583.29,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="2"
          className={` ${getClassNames("OMEGA PSI PHI", 2)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 2, "OMEGA PSI PHI Seat 2")
          }
        >
          <path
            className="st2"
            d="M583.29,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="3"
          className={` ${getClassNames("OMEGA PSI PHI", 3)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 3, "OMEGA PSI PHI Seat 3")
          }
        >
          <path
            className="st2"
            d="M687.33,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="4"
          className={` ${getClassNames("OMEGA PSI PHI", 4)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 4, "OMEGA PSI PHI Seat 4")
          }
        >
          <path
            className="st2"
            d="M479.25,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="5"
          className={` ${getClassNames("OMEGA PSI PHI", 5)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 5, "OMEGA PSI PHI Seat 5")
          }
        >
          <path
            className="st2"
            d="M656.85,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="6"
          className={` ${getClassNames("OMEGA PSI PHI", 6)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 6, "OMEGA PSI PHI Seat 6")
          }
        >
          <path
            className="st2"
            d="M509.73,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="7"
          className={` ${getClassNames("OMEGA PSI PHI", 7)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 7, "OMEGA PSI PHI Seat 7")
          }
        >
          <path
            className="st2"
            d="M656.85,2398.79c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMEGA PSI PHI"
          data-seat="8"
          className={` ${getClassNames("OMEGA PSI PHI", 8)}`}
          onClick={() =>
            handleClick("OMEGA PSI PHI", 8, "OMEGA PSI PHI Seat 8")
          }
        >
          <path
            className="st2"
            d="M509.73,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1160.65" cy="2300.4" r="67.05" />
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="1"
          className={` ${getClassNames("TAILULAH ALUMNI", 1)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 1, "TAILULAH ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M1160.65,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="2"
          className={` ${getClassNames("TAILULAH ALUMNI", 2)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 2, "TAILULAH ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M1160.65,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="3"
          className={` ${getClassNames("TAILULAH ALUMNI", 3)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 3, "TAILULAH ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M1264.69,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="4"
          className={` ${getClassNames("TAILULAH ALUMNI", 4)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 4, "TAILULAH ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M1056.61,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="5"
          className={` ${getClassNames("TAILULAH ALUMNI", 5)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 5, "TAILULAH ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M1234.21,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="6"
          className={` ${getClassNames("TAILULAH ALUMNI", 6)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 6, "TAILULAH ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M1087.09,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="7"
          className={` ${getClassNames("TAILULAH ALUMNI", 7)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 7, "TAILULAH ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M1234.21,2398.79c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="TAILULAH ALUMNI"
          data-seat="8"
          className={` ${getClassNames("TAILULAH ALUMNI", 8)}`}
          onClick={() =>
            handleClick("TAILULAH ALUMNI", 8, "TAILULAH ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M1087.09,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1738.01" cy="2300.4" r="67.05" />
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="1"
          className={` ${getClassNames("SLIDELL ALUMNI", 1)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 1, "SLIDELL ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M1738.01,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="2"
          className={` ${getClassNames("SLIDELL ALUMNI", 2)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 2, "SLIDELL ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M1738.01,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="3"
          className={` ${getClassNames("SLIDELL ALUMNI", 3)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 3, "SLIDELL ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M1842.05,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="4"
          className={` ${getClassNames("SLIDELL ALUMNI", 4)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 4, "SLIDELL ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M1633.97,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="5"
          className={` ${getClassNames("SLIDELL ALUMNI", 5)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 5, "SLIDELL ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M1811.57,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="6"
          className={` ${getClassNames("SLIDELL ALUMNI", 6)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 6, "SLIDELL ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M1664.45,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="7"
          className={` ${getClassNames("SLIDELL ALUMNI", 7)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 7, "SLIDELL ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M1811.57,2398.79c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SLIDELL ALUMNI"
          data-seat="8"
          className={` ${getClassNames("SLIDELL ALUMNI", 8)}`}
          onClick={() =>
            handleClick("SLIDELL ALUMNI", 8, "SLIDELL ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M1664.45,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="310.76" cy="2661.07" r="67.05" />
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="1"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 1)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 1, "OPELPUSAS ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M310.76,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="2"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 2)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 2, "OPELPUSAS ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M310.76,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="3"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 3)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 3, "OPELPUSAS ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M414.79,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="4"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 4)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 4, "OPELPUSAS ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M206.72,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="5"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 5)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 5, "OPELPUSAS ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M384.32,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="6"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 6)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 6, "OPELPUSAS ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M237.2,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="7"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 7)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 7, "OPELPUSAS ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M384.32,2759.46c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OPELPUSAS ALUMNI"
          data-seat="8"
          className={` ${getClassNames("OPELPUSAS ALUMNI", 8)}`}
          onClick={() =>
            handleClick("OPELPUSAS ALUMNI", 8, "OPELPUSAS ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M237.2,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="888.12" cy="2661.07" r="67.05" />
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="1"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 1)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 1, "BATON ROUGE ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M888.12,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="2"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 2)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 2, "BATON ROUGE ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M888.12,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="3"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 3)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 3, "BATON ROUGE ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M992.15,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="4"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 4)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 4, "BATON ROUGE ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M784.08,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="5"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 5)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 5, "BATON ROUGE ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M961.68,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="6"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 6)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 6, "BATON ROUGE ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M814.56,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="7"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 7)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 7, "BATON ROUGE ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M961.68,2759.46c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BATON ROUGE ALUMNI"
          data-seat="8"
          className={` ${getClassNames("BATON ROUGE ALUMNI", 8)}`}
          onClick={() =>
            handleClick("BATON ROUGE ALUMNI", 8, "BATON ROUGE ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M814.56,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1465.48" cy="2661.07" r="67.05" />
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="1"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 1)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 1, "LAFAYETTE ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M1465.48,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="2"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 2)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 2, "LAFAYETTE ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M1465.48,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="3"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 3)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 3, "LAFAYETTE ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M1569.51,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="4"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 4)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 4, "LAFAYETTE ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M1361.44,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="5"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 5)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 5, "LAFAYETTE ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M1539.04,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="6"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 6)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 6, "LAFAYETTE ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M1391.92,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="7"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 7)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 7, "LAFAYETTE ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M1539.04,2759.46c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAFAYETTE ALUMNI"
          data-seat="8"
          className={` ${getClassNames("LAFAYETTE ALUMNI", 8)}`}
          onClick={() =>
            handleClick("LAFAYETTE ALUMNI", 8, "LAFAYETTE ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M1391.92,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g>
          <rect
            className="st2"
            x="366.78"
            y="61.51"
            width="625.77"
            height="203.97"
          />
          <rect
            className="st2"
            x="1056.23"
            y="61.51"
            width="625.77"
            height="203.97"
          />
        </g>
        <circle className="st2" cx="2361.66" cy="514.62" r="67.05" />
        <g
          data-name="ALPHA SIGMA"
          data-seat="1"
          className={` ${getClassNames("ALPHA SIGMA", 1)}`}
          onClick={() => handleClick("ALPHA SIGMA", 1, "ALPHA SIGMA Seat 1")}
        >
          <path
            className="st2"
            d="M2361.66,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="2"
          className={` ${getClassNames("ALPHA SIGMA", 2)}`}
          onClick={() => handleClick("ALPHA SIGMA", 2, "ALPHA SIGMA Seat 2")}
        >
          <path
            className="st2"
            d="M2361.66,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="3"
          className={` ${getClassNames("ALPHA SIGMA", 3)}`}
          onClick={() => handleClick("ALPHA SIGMA", 3, "ALPHA SIGMA Seat 3")}
        >
          <path
            className="st2"
            d="M2465.69,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="4"
          className={` ${getClassNames("ALPHA SIGMA", 4)}`}
          onClick={() => handleClick("ALPHA SIGMA", 4, "ALPHA SIGMA Seat 4")}
        >
          <path
            className="st2"
            d="M2257.62,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="5"
          className={` ${getClassNames("ALPHA SIGMA", 5)}`}
          onClick={() => handleClick("ALPHA SIGMA", 5, "ALPHA SIGMA Seat 5")}
        >
          <path
            className="st2"
            d="M2435.22,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="6"
          className={` ${getClassNames("ALPHA SIGMA", 6)}`}
          onClick={() => handleClick("ALPHA SIGMA", 6, "ALPHA SIGMA Seat 6")}
        >
          <path
            className="st2"
            d="M2288.09,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="7"
          className={` ${getClassNames("ALPHA SIGMA", 7)}`}
          onClick={() => handleClick("ALPHA SIGMA", 7, "ALPHA SIGMA Seat 7")}
        >
          <path
            className="st2"
            d="M2435.22,613.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="8"
          className={` ${getClassNames("ALPHA SIGMA", 8)}`}
          onClick={() => handleClick("ALPHA SIGMA", 8, "ALPHA SIGMA Seat 8")}
        >
          <path
            className="st2"
            d="M2288.09,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2939.02" cy="514.62" r="67.05" />
        <g
          data-name="GRETNA ALUMNI"
          data-seat="1"
          className={` ${getClassNames("GRETNA ALUMNI", 1)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 1, "GRETNA ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2939.02,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="2"
          className={` ${getClassNames("GRETNA ALUMNI", 2)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 2, "GRETNA ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2939.02,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="3"
          className={` ${getClassNames("GRETNA ALUMNI", 3)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 3, "GRETNA ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M3043.05,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="4"
          className={` ${getClassNames("GRETNA ALUMNI", 4)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 4, "GRETNA ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2834.98,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="5"
          className={` ${getClassNames("GRETNA ALUMNI", 5)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 5, "GRETNA ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M3012.58,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="6"
          className={` ${getClassNames("GRETNA ALUMNI", 6)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 6, "GRETNA ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2865.45,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="7"
          className={` ${getClassNames("GRETNA ALUMNI", 7)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 7, "GRETNA ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M3012.58,613.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="8"
          className={` ${getClassNames("GRETNA ALUMNI", 8)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 8, "GRETNA ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2865.45,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3516.38" cy="514.62" r="67.05" />
        <g
          data-name="BETA GAMMA"
          data-seat="1"
          className={` ${getClassNames("BETA GAMMA", 1)}`}
          onClick={() => handleClick("BETA GAMMA", 1, "BETA GAMMA Seat 1")}
        >
          <path
            className="st2"
            d="M3516.38,435.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="2"
          className={` ${getClassNames("BETA GAMMA", 2)}`}
          onClick={() => handleClick("BETA GAMMA", 2, "BETA GAMMA Seat 2")}
        >
          <path
            className="st2"
            d="M3516.38,643.49c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="3"
          className={` ${getClassNames("BETA GAMMA", 3)}`}
          onClick={() => handleClick("BETA GAMMA", 3, "BETA GAMMA Seat 3")}
        >
          <path
            className="st2"
            d="M3620.41,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="4"
          className={` ${getClassNames("BETA GAMMA", 4)}`}
          onClick={() => handleClick("BETA GAMMA", 4, "BETA GAMMA Seat 4")}
        >
          <path
            className="st2"
            d="M3412.34,539.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="5"
          className={` ${getClassNames("BETA GAMMA", 5)}`}
          onClick={() => handleClick("BETA GAMMA", 5, "BETA GAMMA Seat 5")}
        >
          <path
            className="st2"
            d="M3589.94,465.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="6"
          className={` ${getClassNames("BETA GAMMA", 6)}`}
          onClick={() => handleClick("BETA GAMMA", 6, "BETA GAMMA Seat 6")}
        >
          <path
            className="st2"
            d="M3442.81,613c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="7"
          className={` ${getClassNames("BETA GAMMA", 7)}`}
          onClick={() => handleClick("BETA GAMMA", 7, "BETA GAMMA Seat 7")}
        >
          <path
            className="st2"
            d="M3589.94,613.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="8"
          className={` ${getClassNames("BETA GAMMA", 8)}`}
          onClick={() => handleClick("BETA GAMMA", 8, "BETA GAMMA Seat 8")}
        >
          <path
            className="st2"
            d="M3442.81,465.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2634.19" cy="869.43" r="67.05" />
        <g
          data-name="KENNER ALUMNI"
          data-seat="1"
          className={` ${getClassNames("KENNER ALUMNI", 1)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 1, "KENNER ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2634.19,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="2"
          className={` ${getClassNames("KENNER ALUMNI", 2)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 2, "KENNER ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2634.19,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="3"
          className={` ${getClassNames("KENNER ALUMNI", 3)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 3, "KENNER ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M2738.23,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="4"
          className={` ${getClassNames("KENNER ALUMNI", 4)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 4, "KENNER ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2530.15,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="5"
          className={` ${getClassNames("KENNER ALUMNI", 5)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 5, "KENNER ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M2707.75,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="6"
          className={` ${getClassNames("KENNER ALUMNI", 6)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 6, "KENNER ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2560.63,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="7"
          className={` ${getClassNames("KENNER ALUMNI", 7)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 7, "KENNER ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M2707.75,967.82c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KENNER ALUMNI"
          data-seat="8"
          className={` ${getClassNames("KENNER ALUMNI", 8)}`}
          onClick={() =>
            handleClick("KENNER ALUMNI", 8, "KENNER ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2560.63,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3211.55" cy="869.43" r="67.05" />
        <g
          data-name="OMICRON UPSILON"
          data-seat="1"
          className={` ${getClassNames("OMICRON UPSILON", 1)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 1, "OMICRON UPSILON Seat 1")
          }
        >
          <path
            className="st2"
            d="M3211.55,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="2"
          className={` ${getClassNames("OMICRON UPSILON", 2)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 2, "OMICRON UPSILON Seat 2")
          }
        >
          <path
            className="st2"
            d="M3211.55,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="3"
          className={` ${getClassNames("OMICRON UPSILON", 3)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 3, "OMICRON UPSILON Seat 3")
          }
        >
          <path
            className="st2"
            d="M3315.59,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="4"
          className={` ${getClassNames("OMICRON UPSILON", 4)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 4, "OMICRON UPSILON Seat 4")
          }
        >
          <path
            className="st2"
            d="M3107.51,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="5"
          className={` ${getClassNames("OMICRON UPSILON", 5)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 5, "OMICRON UPSILON Seat 5")
          }
        >
          <path
            className="st2"
            d="M3285.11,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="6"
          className={` ${getClassNames("OMICRON UPSILON", 6)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 6, "OMICRON UPSILON Seat 6")
          }
        >
          <path
            className="st2"
            d="M3137.99,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="7"
          className={` ${getClassNames("OMICRON UPSILON", 7)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 7, "OMICRON UPSILON Seat 7")
          }
        >
          <path
            className="st2"
            d="M3285.11,967.82c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="8"
          className={` ${getClassNames("OMICRON UPSILON", 8)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 8, "OMICRON UPSILON Seat 8")
          }
        >
          <path
            className="st2"
            d="M3137.99,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3788.91" cy="869.43" r="67.05" />
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="1"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 1)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              1,
              "BETA IOTA EPSILON NU Seat 1"
            )
          }
        >
          <path
            className="st2"
            d="M3788.91,790.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="2"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 2)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              2,
              "BETA IOTA EPSILON NU Seat 2"
            )
          }
        >
          <path
            className="st2"
            d="M3788.91,998.3c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="3"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 3)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              3,
              "BETA IOTA EPSILON NU Seat 3"
            )
          }
        >
          <path
            className="st2"
            d="M3892.95,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="4"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 4)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              4,
              "BETA IOTA EPSILON NU Seat 4"
            )
          }
        >
          <path
            className="st2"
            d="M3684.87,894.26c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="5"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 5)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              5,
              "BETA IOTA EPSILON NU Seat 5"
            )
          }
        >
          <path
            className="st2"
            d="M3862.47,820.69c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="6"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 6)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              6,
              "BETA IOTA EPSILON NU Seat 6"
            )
          }
        >
          <path
            className="st2"
            d="M3715.35,967.81c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="7"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 7)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              7,
              "BETA IOTA EPSILON NU Seat 7"
            )
          }
        >
          <path
            className="st2"
            d="M3862.47,967.82c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="8"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 8)}`}
          onClick={() =>
            handleClick(
              "BETA IOTA EPSILON NU",
              8,
              "BETA IOTA EPSILON NU Seat 8"
            )
          }
        >
          <path
            className="st2"
            d="M3715.35,820.69c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2361.66" cy="1230.1" r="67.05" />
        <g
          data-name="EPSILONNU"
          data-seat="1"
          className={` ${getClassNames("EPSILONNU", 1)}`}
          onClick={() => handleClick("EPSILONNU", 1, "EPSILONNU Seat 1")}
        >
          <path
            className="st2"
            d="M2361.66,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="2"
          className={` ${getClassNames("EPSILONNU", 2)}`}
          onClick={() => handleClick("EPSILONNU", 2, "EPSILONNU Seat 2")}
        >
          <path
            className="st2"
            d="M2361.66,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="3"
          className={` ${getClassNames("EPSILONNU", 3)}`}
          onClick={() => handleClick("EPSILONNU", 3, "EPSILONNU Seat 3")}
        >
          <path
            className="st2"
            d="M2465.69,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="4"
          className={` ${getClassNames("EPSILONNU", 4)}`}
          onClick={() => handleClick("EPSILONNU", 4, "EPSILONNU Seat 4")}
        >
          <path
            className="st2"
            d="M2257.62,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="5"
          className={` ${getClassNames("EPSILONNU", 5)}`}
          onClick={() => handleClick("EPSILONNU", 5, "EPSILONNU Seat 5")}
        >
          <path
            className="st2"
            d="M2435.22,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="6"
          className={` ${getClassNames("EPSILONNU", 6)}`}
          onClick={() => handleClick("EPSILONNU", 6, "EPSILONNU Seat 6")}
        >
          <path
            className="st2"
            d="M2288.09,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="7"
          className={` ${getClassNames("EPSILONNU", 7)}`}
          onClick={() => handleClick("EPSILONNU", 7, "EPSILONNU Seat 7")}
        >
          <path
            className="st2"
            d="M2435.22,1328.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="8"
          className={` ${getClassNames("EPSILONNU", 8)}`}
          onClick={() => handleClick("EPSILONNU", 8, "EPSILONNU Seat 8")}
        >
          <path
            className="st2"
            d="M2288.09,1181.36c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2939.02" cy="1230.1" r="67.05" />
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="1"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 1)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 1, "LAKE CHARLES ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2939.02,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="2"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 2)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 2, "LAKE CHARLES ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2939.02,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="3"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 3)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 3, "LAKE CHARLES ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M3043.05,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="4"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 4)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 4, "LAKE CHARLES ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2834.98,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="5"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 5)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 5, "LAKE CHARLES ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M3012.58,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="6"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 6)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 6, "LAKE CHARLES ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2865.45,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="7"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 7)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 7, "LAKE CHARLES ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M3012.58,1328.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="LAKE CHARLES ALUMNI"
          data-seat="8"
          className={` ${getClassNames("LAKE CHARLES ALUMNI", 8)}`}
          onClick={() =>
            handleClick("LAKE CHARLES ALUMNI", 8, "LAKE CHARLES ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2865.45,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3516.38" cy="1230.1" r="67.05" />
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="1"
          className={` ${getClassNames("SIGMA GAMMA RHO", 1)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 1, "SIGMA GAMMA RHO Seat 1")
          }
        >
          <path
            className="st2"
            d="M3516.38,1150.9c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="2"
          className={` ${getClassNames("SIGMA GAMMA RHO", 2)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 2, "SIGMA GAMMA RHO Seat 2")
          }
        >
          <path
            className="st2"
            d="M3516.38,1358.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="3"
          className={` ${getClassNames("SIGMA GAMMA RHO", 3)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 3, "SIGMA GAMMA RHO Seat 3")
          }
        >
          <path
            className="st2"
            d="M3620.41,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="4"
          className={` ${getClassNames("SIGMA GAMMA RHO", 4)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 4, "SIGMA GAMMA RHO Seat 4")
          }
        >
          <path
            className="st2"
            d="M3412.34,1254.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="5"
          className={` ${getClassNames("SIGMA GAMMA RHO", 5)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 5, "SIGMA GAMMA RHO Seat 5")
          }
        >
          <path
            className="st2"
            d="M3589.94,1181.36c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="6"
          className={` ${getClassNames("SIGMA GAMMA RHO", 6)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 6, "SIGMA GAMMA RHO Seat 6")
          }
        >
          <path
            className="st2"
            d="M3442.81,1328.48c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="7"
          className={` ${getClassNames("SIGMA GAMMA RHO", 7)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 7, "SIGMA GAMMA RHO Seat 7")
          }
        >
          <path
            className="st2"
            d="M3589.94,1328.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="SIGMA GAMMA RHO"
          data-seat="8"
          className={` ${getClassNames("SIGMA GAMMA RHO", 8)}`}
          onClick={() =>
            handleClick("SIGMA GAMMA RHO", 8, "SIGMA GAMMA RHO Seat 8")
          }
        >
          <path
            className="st2"
            d="M3442.81,1181.36c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2634.19" cy="1584.92" r="67.05" />
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="1"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 1)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              1,
              "FRANKLIN (LA) ALUMNI Seat 1"
            )
          }
        >
          <path
            className="st2"
            d="M2634.19,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="2"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 2)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              2,
              "FRANKLIN (LA) ALUMNI Seat 2"
            )
          }
        >
          <path
            className="st2"
            d="M2634.19,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="3"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 3)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              3,
              "FRANKLIN (LA) ALUMNI Seat 3"
            )
          }
        >
          <path
            className="st2"
            d="M2738.23,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="4"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 4)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              4,
              "FRANKLIN (LA) ALUMNI Seat 4"
            )
          }
        >
          <path
            className="st2"
            d="M2530.15,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="5"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 5)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              5,
              "FRANKLIN (LA) ALUMNI Seat 5"
            )
          }
        >
          <path
            className="st2"
            d="M2707.75,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="6"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 6)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              6,
              "FRANKLIN (LA) ALUMNI Seat 6"
            )
          }
        >
          <path
            className="st2"
            d="M2560.63,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="7"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 7)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              7,
              "FRANKLIN (LA) ALUMNI Seat 7"
            )
          }
        >
          <path
            className="st2"
            d="M2707.75,1683.31c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="8"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 8)}`}
          onClick={() =>
            handleClick(
              "FRANKLIN (LA) ALUMNI",
              8,
              "FRANKLIN (LA) ALUMNI Seat 8"
            )
          }
        >
          <path
            className="st2"
            d="M2560.63,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3211.55" cy="1584.92" r="67.05" />
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="1"
          className={` ${getClassNames("KAPPA ALPHA PSI", 1)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 1, "KAPPA ALPHA PSI Seat 1")
          }
        >
          <path
            className="st2"
            d="M3211.55,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="2"
          className={` ${getClassNames("KAPPA ALPHA PSI", 2)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 2, "KAPPA ALPHA PSI Seat 2")
          }
        >
          <path
            className="st2"
            d="M3211.55,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="3"
          className={` ${getClassNames("KAPPA ALPHA PSI", 3)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 3, "KAPPA ALPHA PSI Seat 3")
          }
        >
          <path
            className="st2"
            d="M3315.59,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="4"
          className={` ${getClassNames("KAPPA ALPHA PSI", 4)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 4, "KAPPA ALPHA PSI Seat 4")
          }
        >
          <path
            className="st2"
            d="M3107.51,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="5"
          className={` ${getClassNames("KAPPA ALPHA PSI", 5)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 5, "KAPPA ALPHA PSI Seat 5")
          }
        >
          <path
            className="st2"
            d="M3285.11,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="6"
          className={` ${getClassNames("KAPPA ALPHA PSI", 6)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 6, "KAPPA ALPHA PSI Seat 6")
          }
        >
          <path
            className="st2"
            d="M3137.99,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="7"
          className={` ${getClassNames("KAPPA ALPHA PSI", 7)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 7, "KAPPA ALPHA PSI Seat 7")
          }
        >
          <path
            className="st2"
            d="M3285.11,1683.31c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="KAPPA ALPHA PSI"
          data-seat="8"
          className={` ${getClassNames("KAPPA ALPHA PSI", 8)}`}
          onClick={() =>
            handleClick("KAPPA ALPHA PSI", 8, "KAPPA ALPHA PSI Seat 8")
          }
        >
          <path
            className="st2"
            d="M3137.99,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3788.91" cy="1584.92" r="67.05" />
        <g
          data-name="ALPHA"
          data-seat="1"
          className={` ${getClassNames("ALPHA", 1)}`}
          onClick={() => handleClick("ALPHA", 1, "ALPHA Seat 1")}
        >
          <path
            className="st2"
            d="M3788.91,1505.71c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="2"
          className={` ${getClassNames("ALPHA", 2)}`}
          onClick={() => handleClick("ALPHA", 2, "ALPHA Seat 2")}
        >
          <path
            className="st2"
            d="M3788.91,1713.78c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="3"
          className={` ${getClassNames("ALPHA", 3)}`}
          onClick={() => handleClick("ALPHA", 3, "ALPHA Seat 3")}
        >
          <path
            className="st2"
            d="M3892.95,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="4"
          className={` ${getClassNames("ALPHA", 4)}`}
          onClick={() => handleClick("ALPHA", 4, "ALPHA Seat 4")}
        >
          <path
            className="st2"
            d="M3684.87,1609.74c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="5"
          className={` ${getClassNames("ALPHA", 5)}`}
          onClick={() => handleClick("ALPHA", 5, "ALPHA Seat 5")}
        >
          <path
            className="st2"
            d="M3862.47,1536.17c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="6"
          className={` ${getClassNames("ALPHA", 6)}`}
          onClick={() => handleClick("ALPHA", 6, "ALPHA Seat 6")}
        >
          <path
            className="st2"
            d="M3715.35,1683.29c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="7"
          className={` ${getClassNames("ALPHA", 7)}`}
          onClick={() => handleClick("ALPHA", 7, "ALPHA Seat 7")}
        >
          <path
            className="st2"
            d="M3862.47,1683.31c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="ALPHA"
          data-seat="8"
          className={` ${getClassNames("ALPHA", 8)}`}
          onClick={() => handleClick("ALPHA", 8, "ALPHA Seat 8")}
        >
          <path
            className="st2"
            d="M3715.35,1536.17c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2361.66" cy="1945.58" r="67.05" />
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="1"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 1)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 1, "NEW ORLEANS ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2361.66,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="2"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 2)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 2, "NEW ORLEANS ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2361.66,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="3"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 3)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 3, "NEW ORLEANS ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M2465.69,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="4"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 4)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 4, "NEW ORLEANS ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2257.62,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="5"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 5)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 5, "NEW ORLEANS ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M2435.22,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="6"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 6)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 6, "NEW ORLEANS ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2288.09,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="7"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 7)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 7, "NEW ORLEANS ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M2435.22,2043.97c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NEW ORLEANS ALUMNI"
          data-seat="8"
          className={` ${getClassNames("NEW ORLEANS ALUMNI", 8)}`}
          onClick={() =>
            handleClick("NEW ORLEANS ALUMNI", 8, "NEW ORLEANS ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2288.09,1896.84c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2939.02" cy="1945.58" r="67.05" />
        <g
          data-name="GRETNA ALUMNI"
          data-seat="1"
          className={` ${getClassNames("GRETNA ALUMNI", 1)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 1, "GRETNA ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2939.02,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="2"
          className={` ${getClassNames("GRETNA ALUMNI", 2)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 2, "GRETNA ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2939.02,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="3"
          className={` ${getClassNames("GRETNA ALUMNI", 3)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 3, "GRETNA ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M3043.05,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="4"
          className={` ${getClassNames("GRETNA ALUMNI", 4)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 4, "GRETNA ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2834.98,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="5"
          className={` ${getClassNames("GRETNA ALUMNI", 5)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 5, "GRETNA ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M3012.58,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="6"
          className={` ${getClassNames("GRETNA ALUMNI", 6)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 6, "GRETNA ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2865.45,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="7"
          className={` ${getClassNames("GRETNA ALUMNI", 7)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 7, "GRETNA ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M3012.58,2043.97c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="GRETNA ALUMNI"
          data-seat="8"
          className={` ${getClassNames("GRETNA ALUMNI", 8)}`}
          onClick={() =>
            handleClick("GRETNA ALUMNI", 8, "GRETNA ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2865.45,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3516.38" cy="1945.58" r="67.05" />
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="1"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 1)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              1,
              "HOUMA THIBODAUX ALUMNI Seat 1"
            )
          }
        >
          <path
            className="st2"
            d="M3516.38,1866.38c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="2"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 2)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              2,
              "HOUMA THIBODAUX ALUMNI Seat 2"
            )
          }
        >
          <path
            className="st2"
            d="M3516.38,2074.45c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="3"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 3)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              3,
              "HOUMA THIBODAUX ALUMNI Seat 3"
            )
          }
        >
          <path
            className="st2"
            d="M3620.41,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="4"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 4)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              4,
              "HOUMA THIBODAUX ALUMNI Seat 4"
            )
          }
        >
          <path
            className="st2"
            d="M3412.34,1970.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="5"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 5)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              5,
              "HOUMA THIBODAUX ALUMNI Seat 5"
            )
          }
        >
          <path
            className="st2"
            d="M3589.94,1896.84c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="6"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 6)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              6,
              "HOUMA THIBODAUX ALUMNI Seat 6"
            )
          }
        >
          <path
            className="st2"
            d="M3442.81,2043.96c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="7"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 7)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              7,
              "HOUMA THIBODAUX ALUMNI Seat 7"
            )
          }
        >
          <path
            className="st2"
            d="M3589.94,2043.97c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="HOUMA THIBODAUX ALUMNI"
          data-seat="8"
          className={` ${getClassNames("HOUMA THIBODAUX ALUMNI", 8)}`}
          onClick={() =>
            handleClick(
              "HOUMA THIBODAUX ALUMNI",
              8,
              "HOUMA THIBODAUX ALUMNI Seat 8"
            )
          }
        >
          <path
            className="st2"
            d="M3442.81,1896.84c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2634.19" cy="2300.4" r="67.05" />
        <g
          data-name="BETAIOTA"
          data-seat="1"
          className={` ${getClassNames("BETAIOTA", 1)}`}
          onClick={() => handleClick("BETAIOTA", 1, "BETAIOTA Seat 1")}
        >
          <path
            className="st2"
            d="M2634.19,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="2"
          className={` ${getClassNames("BETAIOTA", 2)}`}
          onClick={() => handleClick("BETAIOTA", 2, "BETAIOTA Seat 2")}
        >
          <path
            className="st2"
            d="M2634.19,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="3"
          className={` ${getClassNames("BETAIOTA", 3)}`}
          onClick={() => handleClick("BETAIOTA", 3, "BETAIOTA Seat 3")}
        >
          <path
            className="st2"
            d="M2738.23,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="4"
          className={` ${getClassNames("BETAIOTA", 4)}`}
          onClick={() => handleClick("BETAIOTA", 4, "BETAIOTA Seat 4")}
        >
          <path
            className="st2"
            d="M2530.15,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="5"
          className={` ${getClassNames("BETAIOTA", 5)}`}
          onClick={() => handleClick("BETAIOTA", 5, "BETAIOTA Seat 5")}
        >
          <path
            className="st2"
            d="M2707.75,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="6"
          className={` ${getClassNames("BETAIOTA", 6)}`}
          onClick={() => handleClick("BETAIOTA", 6, "BETAIOTA Seat 6")}
        >
          <path
            className="st2"
            d="M2560.63,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="7"
          className={` ${getClassNames("BETAIOTA", 7)}`}
          onClick={() => handleClick("BETAIOTA", 7, "BETAIOTA Seat 7")}
        >
          <path
            className="st2"
            d="M2707.75,2398.79c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="BETAIOTA"
          data-seat="8"
          className={` ${getClassNames("BETAIOTA", 8)}`}
          onClick={() => handleClick("BETAIOTA", 8, "BETAIOTA Seat 8")}
        >
          <path
            className="st2"
            d="M2560.63,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3211.55" cy="2300.4" r="67.05" />
        <g
          data-name="THETANU"
          data-seat="1"
          className={` ${getClassNames("THETANU", 1)}`}
          onClick={() => handleClick("THETANU", 1, "THETANU Seat 1")}
        >
          <path
            className="st2"
            d="M3211.55,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="2"
          className={` ${getClassNames("THETANU", 2)}`}
          onClick={() => handleClick("THETANU", 2, "THETANU Seat 2")}
        >
          <path
            className="st2"
            d="M3211.55,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="3"
          className={` ${getClassNames("THETANU", 3)}`}
          onClick={() => handleClick("THETANU", 3, "THETANU Seat 3")}
        >
          <path
            className="st2"
            d="M3315.59,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="4"
          className={` ${getClassNames("THETANU", 4)}`}
          onClick={() => handleClick("THETANU", 4, "THETANU Seat 4")}
        >
          <path
            className="st2"
            d="M3107.51,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="5"
          className={` ${getClassNames("THETANU", 5)}`}
          onClick={() => handleClick("THETANU", 5, "THETANU Seat 5")}
        >
          <path
            className="st2"
            d="M3285.11,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="6"
          className={` ${getClassNames("THETANU", 6)}`}
          onClick={() => handleClick("THETANU", 6, "THETANU Seat 6")}
        >
          <path
            className="st2"
            d="M3137.99,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="7"
          className={` ${getClassNames("THETANU", 7)}`}
          onClick={() => handleClick("THETANU", 7, "THETANU Seat 7")}
        >
          <path
            className="st2"
            d="M3285.11,2398.79c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="THETANU"
          data-seat="8"
          className={` ${getClassNames("THETANU", 8)}`}
          onClick={() => handleClick("THETANU", 8, "THETANU Seat 8")}
        >
          <path
            className="st2"
            d="M3137.99,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3788.91" cy="2300.4" r="67.05" />
        <g
          data-name="EPSILONNU"
          data-seat="1"
          className={` ${getClassNames("EPSILONNU", 1)}`}
          onClick={() => handleClick("EPSILONNU", 1, "EPSILONNU Seat 1")}
        >
          <path
            className="st2"
            d="M3788.91,2221.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="2"
          className={` ${getClassNames("EPSILONNU", 2)}`}
          onClick={() => handleClick("EPSILONNU", 2, "EPSILONNU Seat 2")}
        >
          <path
            className="st2"
            d="M3788.91,2429.27c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="3"
          className={` ${getClassNames("EPSILONNU", 3)}`}
          onClick={() => handleClick("EPSILONNU", 3, "EPSILONNU Seat 3")}
        >
          <path
            className="st2"
            d="M3892.95,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="4"
          className={` ${getClassNames("EPSILONNU", 4)}`}
          onClick={() => handleClick("EPSILONNU", 4, "EPSILONNU Seat 4")}
        >
          <path
            className="st2"
            d="M3684.87,2325.23c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="5"
          className={` ${getClassNames("EPSILONNU", 5)}`}
          onClick={() => handleClick("EPSILONNU", 5, "EPSILONNU Seat 5")}
        >
          <path
            className="st2"
            d="M3862.47,2251.65c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="6"
          className={` ${getClassNames("EPSILONNU", 6)}`}
          onClick={() => handleClick("EPSILONNU", 6, "EPSILONNU Seat 6")}
        >
          <path
            className="st2"
            d="M3715.35,2398.77c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="7"
          className={` ${getClassNames("EPSILONNU", 7)}`}
          onClick={() => handleClick("EPSILONNU", 7, "EPSILONNU Seat 7")}
        >
          <path
            className="st2"
            d="M3862.47,2398.79c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="EPSILONNU"
          data-seat="8"
          className={` ${getClassNames("EPSILONNU", 8)}`}
          onClick={() => handleClick("EPSILONNU", 8, "EPSILONNU Seat 8")}
        >
          <path
            className="st2"
            d="M3715.35,2251.65c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2361.66" cy="2661.07" r="67.05" />
        <g
          data-name="MONROE ALUMNI"
          data-seat="1"
          className={` ${getClassNames("MONROE ALUMNI", 1)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 1, "MONROE ALUMNI Seat 1")
          }
        >
          <path
            className="st2"
            d="M2361.66,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="2"
          className={` ${getClassNames("MONROE ALUMNI", 2)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 2, "MONROE ALUMNI Seat 2")
          }
        >
          <path
            className="st2"
            d="M2361.66,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="3"
          className={` ${getClassNames("MONROE ALUMNI", 3)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 3, "MONROE ALUMNI Seat 3")
          }
        >
          <path
            className="st2"
            d="M2465.69,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="4"
          className={` ${getClassNames("MONROE ALUMNI", 4)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 4, "MONROE ALUMNI Seat 4")
          }
        >
          <path
            className="st2"
            d="M2257.62,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="5"
          className={` ${getClassNames("MONROE ALUMNI", 5)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 5, "MONROE ALUMNI Seat 5")
          }
        >
          <path
            className="st2"
            d="M2435.22,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="6"
          className={` ${getClassNames("MONROE ALUMNI", 6)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 6, "MONROE ALUMNI Seat 6")
          }
        >
          <path
            className="st2"
            d="M2288.09,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="7"
          className={` ${getClassNames("MONROE ALUMNI", 7)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 7, "MONROE ALUMNI Seat 7")
          }
        >
          <path
            className="st2"
            d="M2435.22,2759.46c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="MONROE ALUMNI"
          data-seat="8"
          className={` ${getClassNames("MONROE ALUMNI", 8)}`}
          onClick={() =>
            handleClick("MONROE ALUMNI", 8, "MONROE ALUMNI Seat 8")
          }
        >
          <path
            className="st2"
            d="M2288.09,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="2939.02" cy="2661.07" r="67.05" />
        <g
          data-name="OMICRON UPSILON"
          data-seat="1"
          className={` ${getClassNames("OMICRON UPSILON", 1)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 1, "OMICRON UPSILON Seat 1")
          }
        >
          <path
            className="st2"
            d="M2939.02,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="2"
          className={` ${getClassNames("OMICRON UPSILON", 2)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 2, "OMICRON UPSILON Seat 2")
          }
        >
          <path
            className="st2"
            d="M2939.02,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="3"
          className={` ${getClassNames("OMICRON UPSILON", 3)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 3, "OMICRON UPSILON Seat 3")
          }
        >
          <path
            className="st2"
            d="M3043.05,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="4"
          className={` ${getClassNames("OMICRON UPSILON", 4)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 4, "OMICRON UPSILON Seat 4")
          }
        >
          <path
            className="st2"
            d="M2834.98,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="5"
          className={` ${getClassNames("OMICRON UPSILON", 5)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 5, "OMICRON UPSILON Seat 5")
          }
        >
          <path
            className="st2"
            d="M3012.58,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="6"
          className={` ${getClassNames("OMICRON UPSILON", 6)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 6, "OMICRON UPSILON Seat 6")
          }
        >
          <path
            className="st2"
            d="M2865.45,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="7"
          className={` ${getClassNames("OMICRON UPSILON", 7)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 7, "OMICRON UPSILON Seat 7")
          }
        >
          <path
            className="st2"
            d="M3012.58,2759.46c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="OMICRON UPSILON"
          data-seat="8"
          className={` ${getClassNames("OMICRON UPSILON", 8)}`}
          onClick={() =>
            handleClick("OMICRON UPSILON", 8, "OMICRON UPSILON Seat 8")
          }
        >
          <path
            className="st2"
            d="M2865.45,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="3516.38" cy="2661.07" r="67.05" />
        <g
          data-name="NUIOTA"
          data-seat="1"
          className={` ${getClassNames("NUIOTA", 1)}`}
          onClick={() => handleClick("NUIOTA", 1, "NUIOTA Seat 1")}
        >
          <path
            className="st2"
            d="M3516.38,2581.86c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="2"
          className={` ${getClassNames("NUIOTA", 2)}`}
          onClick={() => handleClick("NUIOTA", 2, "NUIOTA Seat 2")}
        >
          <path
            className="st2"
            d="M3516.38,2789.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="3"
          className={` ${getClassNames("NUIOTA", 3)}`}
          onClick={() => handleClick("NUIOTA", 3, "NUIOTA Seat 3")}
        >
          <path
            className="st2"
            d="M3620.41,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="4"
          className={` ${getClassNames("NUIOTA", 4)}`}
          onClick={() => handleClick("NUIOTA", 4, "NUIOTA Seat 4")}
        >
          <path
            className="st2"
            d="M3412.34,2685.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="5"
          className={` ${getClassNames("NUIOTA", 5)}`}
          onClick={() => handleClick("NUIOTA", 5, "NUIOTA Seat 5")}
        >
          <path
            className="st2"
            d="M3589.94,2612.32c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="6"
          className={` ${getClassNames("NUIOTA", 6)}`}
          onClick={() => handleClick("NUIOTA", 6, "NUIOTA Seat 6")}
        >
          <path
            className="st2"
            d="M3442.81,2759.44c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="7"
          className={` ${getClassNames("NUIOTA", 7)}`}
          onClick={() => handleClick("NUIOTA", 7, "NUIOTA Seat 7")}
        >
          <path
            className="st2"
            d="M3589.94,2759.46c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="8"
          className={` ${getClassNames("NUIOTA", 8)}`}
          onClick={() => handleClick("NUIOTA", 8, "NUIOTA Seat 8")}
        >
          <path
            className="st2"
            d="M3442.81,2612.32c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <g>
          <rect
            className="st2"
            x="2417.67"
            y="61.51"
            width="625.77"
            height="203.97"
          />
          <rect
            className="st2"
            x="3107.12"
            y="61.51"
            width="625.77"
            height="203.97"
          />
        </g>
        <text className="st0" transform="translate(257.63 514.72)">
          <tspan x="0" y="0">
            NATCHITOCHES
          </tspan>
          <tspan x="25.67" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(856.73 514.72)">
          <tspan x="0" y="0">
            RAYVILLE
          </tspan>
          <tspan x="3.94" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1443.48 514.72)">
          <tspan x="0" y="0">
            THETA
          </tspan>
          <tspan x="-7.66" y="19.2">
            LAMBDA
          </tspan>
        </text>
        <text className="st0" transform="translate(539.45 869.43)">
          <tspan x="0" y="0">
            SHREVEPORT
          </tspan>
          <tspan x="16.39" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1130.88 879.03)">
          <tspan x="0" y="0">
            PI DELTA
          </tspan>
        </text>
        <text className="st1" transform="translate(1717.34 879.03)">
          <tspan x="0" y="0">
            ETA PI
          </tspan>
        </text>
        <text className="st0" transform="translate(538.85 1584.93)">
          <tspan x="0" y="0">
            BOSSIER CITY
          </tspan>
          <tspan x="16.98" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1121.02 1594.53)">
          <tspan x="0" y="0">
            GAMMA PSI
          </tspan>
        </text>
        <text className="st1" transform="translate(1699.93 1594.53)">
          <tspan x="0" y="0">
            NU OMEGA
          </tspan>
        </text>
        <text className="st0" transform="translate(545.54 2300.43)">
          <tspan x="0" y="0">
            OMEGA PSI
          </tspan>
          <tspan x="26.37" y="19.2">
            PHI
          </tspan>
        </text>
        <text className="st1" transform="translate(1125.17 2300.43)">
          <tspan x="0" y="0">
            TALLULAH
          </tspan>
          <tspan x="8.03" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1711.57 2300.43)">
          <tspan x="0" y="0">
            SLIDELL
          </tspan>
          <tspan x="-1.01" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st0" transform="translate(269.51 1230.12)">
          <tspan x="0" y="0">
            GRAMBLING
          </tspan>
          <tspan x="13.8" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(844.34 1230.12)">
          <tspan x="0" y="0">
            ALEXANDRIA
          </tspan>
          <tspan x="16.32" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1434.26 1239.72)">
          <tspan x="0" y="0">
            XI ALPHA
          </tspan>
        </text>
        <text className="st0" transform="translate(264.8 1945.52)">
          <tspan x="0" y="0">
            DELTA SIGMA
          </tspan>
          <tspan x="23.96" y="19.2">
            THETA
          </tspan>
        </text>
        <text className="st1" transform="translate(857.81 1945.52)">
          <tspan x="0" y="0">
            ZETA PHI
          </tspan>
          <tspan x="13.17" y="19.2">
            BETA
          </tspan>
        </text>
        <text className="st1" transform="translate(1426.4 1945.52)">
          <tspan x="0" y="0">
            HAMMOND
          </tspan>
          <tspan x="11.62" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st0" transform="translate(269.81 2660.92)">
          <tspan x="0" y="0">
            OPELOUSAS
          </tspan>
          <tspan x="13.5" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(838.34 2660.92)">
          <tspan x="0" y="0">
            BATON ROUGE
          </tspan>
          <tspan x="22.32" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(1427.87 2660.92)">
          <tspan x="0" y="0">
            LAFAYETTE
          </tspan>
          <tspan x="10.16" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st0" transform="translate(2314.57 524.32)">
          <tspan x="0" y="0">
            ALPHA SIGMA
          </tspan>
        </text>
        <text className="st1" transform="translate(2911.47 514.72)">
          <tspan x="0" y="0">
            GRETNA
          </tspan>
          <tspan x=".09" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(3499.23 514.72)">
          <tspan x="0" y="0">
            BETA
          </tspan>
          <tspan x="-10.68" y="19.2">
            GAMMA
          </tspan>
        </text>
        <text className="st0" transform="translate(2607.15 869.43)">
          <tspan x="0" y="0">
            KENNER
          </tspan>
          <tspan x="-.42" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(3177.97 869.43)">
          <tspan x="0" y="0">
            OMICRON
          </tspan>
          <tspan x="3.74" y="19.2">
            UPSILON
          </tspan>
        </text>
        <text className="st1" transform="translate(3753.77 869.43)">
          <tspan x="0" y="0">
            BETA IOTA
          </tspan>
          <tspan x="-5.6" y="19.2">
            EPSILON NU
          </tspan>
        </text>
        <text className="st0" transform="translate(2585.63 1584.93)">
          <tspan x="0" y="0">
            FRANKLIN (LA)
          </tspan>
          <tspan x="21.1" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(3164.17 1584.93)">
          <tspan x="0" y="0">
            KAPPA ALPHA
          </tspan>
          <tspan x="37.26" y="19.2">
            PSI
          </tspan>
        </text>
        <text className="st1" transform="translate(3765.87 1594.53)">
          <tspan x="0" y="0">
            ALPHA
          </tspan>
        </text>
        <text className="st0" transform="translate(2599.05 2310.43)">
          <tspan x="0" y="0">
            BETA IOTA
          </tspan>
        </text>
        <text className="st1" transform="translate(3177.41 2310.43)">
          <tspan x="0" y="0">
            THETA NU
          </tspan>
        </text>
        <text className="st1" transform="translate(3748.17 2310.43)">
          <tspan x="0" y="0">
            EPSILON NU
          </tspan>
        </text>
        <text className="st0" transform="translate(2319.98 1239.72)">
          <tspan x="0" y="0">
            EPSILON PHI
          </tspan>
        </text>
        <text className="st1" transform="translate(2889.66 1230.12)">
          <tspan x="0" y="0">
            LAKE CHARLES
          </tspan>
          <tspan x="21.9" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(3464.5 1230.12)">
          <tspan x="0" y="0">
            SIGMA GAMMA
          </tspan>
          <tspan x="36.84" y="19.2">
            RHO
          </tspan>
        </text>
        <text className="st0" transform="translate(2312.36 1945.52)">
          <tspan x="0" y="0">
            NEW ORLEANS
          </tspan>
          <tspan x="21.84" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(2911.47 1945.52)">
          <tspan x="0" y="0">
            GRETNA
          </tspan>
          <tspan x=".09" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(3489.14 1935.92)">
          <tspan x="0" y="0">
            HOUMA
          </tspan>
          <tspan x="-13.69" y="19.2">
            THIBODAUX
          </tspan>
          <tspan x="-.22" y="38.4">
            ALUMNI
          </tspan>
        </text>
        <text className="st0" transform="translate(2330.7 2660.92)">
          <tspan x="0" y="0">
            MONROE
          </tspan>
          <tspan x="3.5" y="19.2">
            ALUMNI
          </tspan>
        </text>
        <text className="st1" transform="translate(2905.44 2660.92)">
          <tspan x="0" y="0">
            OMICRON
          </tspan>
          <tspan x="3.74" y="19.2">
            UPSILON
          </tspan>
        </text>
        <text className="st1" transform="translate(3487.94 2670.52)">
          <tspan x="0" y="0">
            NU IOTA
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default Alumni2Layout;
