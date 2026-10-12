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

const Alumni3Layout = ({ tickets }: props) => {
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
    <div className="alumni3-layout-wrapper">
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
        <circle className="st2" cx="353.59" cy="725.32" r="67.05" />
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
            d="M353.59,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M353.59,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M457.62,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M249.55,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M427.15,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M280.03,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27h0Z"
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
            d="M427.15,823.71c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M280.03,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27h0Z"
          />
        </g>
        <circle className="st2" cx="930.95" cy="725.32" r="67.05" />
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
            d="M930.95,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M930.95,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1034.98,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M826.91,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1004.51,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M857.39,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M1004.51,823.71c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M857.39,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1508.31" cy="725.32" r="67.05" />
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
            d="M1508.31,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1508.31,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1612.34,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1404.27,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1581.87,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1434.75,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
            d="M1581.87,823.71c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1434.75,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="626.12" cy="1080.13" r="67.05" />
        <g
          data-name="THETALAMBDA"
          data-seat="1"
          className={` ${getClassNames("THETALAMBDA", 1)}`}
          onClick={() => handleClick("THETALAMBDA", 1, "THETALAMBDA Seat 1")}
        >
          <path
            className="st2"
            d="M626.12,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M626.12,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M730.16,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M522.08,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M699.68,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M552.56,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M699.68,1178.52c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
            d="M552.56,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1203.48" cy="1080.13" r="67.05" />
        <g
          data-name="ETA PI"
          data-seat="1"
          className={` ${getClassNames("ETA PI", 1)}`}
          onClick={() => handleClick("ETA PI", 1, "ETA PI Seat 1")}
        >
          <path
            className="st2"
            d="M1203.48,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1203.48,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1307.52,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1099.44,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1277.04,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1129.92,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
            d="M1277.04,1178.52c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1129.92,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle className="st2" cx="1780.84" cy="1080.13" r="67.05" />
        <g
          data-name="PIDELTA"
          data-seat="1"
          className={` ${getClassNames("PIDELTA", 1)}`}
          onClick={() => handleClick("PIDELTA", 1, "PIDELTA Seat 1")}
        >
          <path
            className="st2"
            d="M1780.84,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1780.84,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1884.88,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1676.8,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
            d="M1854.4,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1707.28,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
            d="M1854.4,1178.52c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
            d="M1707.28,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
          />
        </g>
        <circle
          className="st2"
          cx="353.59"
          cy="1440.8"
          r="67.05"
          transform="translate(-1098.18 1746.25) rotate(-88.09)"
        />
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
          d="M353.59,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M353.59,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M457.62,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M249.55,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M427.15,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M280.03,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27h0Z"
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
          d="M427.15,1539.19c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M280.03,1392.06c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27h0Z"
        />
        </g>
        <circle className="st2" cx="930.95" cy="1440.8" r="67.05" />
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
          d="M930.95,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M930.95,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1034.98,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M826.91,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1004.51,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M857.39,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M1004.51,1539.19c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M857.39,1392.06c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1508.31" cy="1440.8" r="67.05" />
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
          d="M1508.31,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1508.31,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1612.34,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1404.27,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1581.87,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1434.75,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M1581.87,1539.19c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1434.75,1392.06c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="626.12" cy="1795.62" r="67.05" />
        <g
          data-name="NUOMEGA"
          data-seat="1"
          className={` ${getClassNames("NUOMEGA", 1)}`}
          onClick={() =>
            handleClick("NUOMEGA", 1, "NUOMEGA Seat 1")
          }
        >
        <path
          className="st2"
          d="M626.12,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
         <g
          data-name="NUOMEGA"
          data-seat="2"
          className={` ${getClassNames("NUOMEGA", 2)}`}
          onClick={() =>
            handleClick("NUOMEGA", 2, "NUOMEGA Seat 2")
          }
        >
        <path
          className="st2"
          d="M626.12,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="3"
          className={` ${getClassNames("NUOMEGA", 3)}`}
          onClick={() =>
            handleClick("NUOMEGA", 3, "NUOMEGA Seat 3")
          }
        >
        <path
          className="st2"
          d="M730.16,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="4"
          className={` ${getClassNames("NUOMEGA", 4)}`}
          onClick={() =>
            handleClick("NUOMEGA", 4, "NUOMEGA Seat 4")
          }
        >
        <path
          className="st2"
          d="M522.08,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="5"
          className={` ${getClassNames("NUOMEGA", 5)}`}
          onClick={() =>
            handleClick("NUOMEGA", 5, "NUOMEGA Seat 5")
          }
        >
        <path
          className="st2"
          d="M699.68,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
         <g
          data-name="NUOMEGA"
          data-seat="6"
          className={` ${getClassNames("NUOMEGA", 6)}`}
          onClick={() =>
            handleClick("NUOMEGA", 6, "NUOMEGA Seat 6")
          }
        >
        <path
          className="st2"
          d="M552.56,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="7"
          className={` ${getClassNames("NUOMEGA", 7)}`}
          onClick={() =>
            handleClick("NUOMEGA", 7, "NUOMEGA Seat 7")
          }
        >
        <path
          className="st2"
          d="M699.68,1894.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="NUOMEGA"
          data-seat="8"
          className={` ${getClassNames("NUOMEGA", 8)}`}
          onClick={() =>
            handleClick("NUOMEGA", 8, "NUOMEGA Seat 8")
          }
        >
        <path
          className="st2"
          d="M552.56,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1203.48" cy="1795.62" r="67.05" />
         <g
          data-name="XI APLHA"
          data-seat="1"
          className={` ${getClassNames("XI APLHA", 1)}`}
          onClick={() =>
            handleClick("XI APLHA", 1, "XI APLHA Seat 1")
          }
        >
        <path
          className="st2"
          d="M1203.48,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="2"
          className={` ${getClassNames("XI APLHA", 2)}`}
          onClick={() =>
            handleClick("XI APLHA", 2, "XI APLHA Seat 2")
          }
        >
        <path
          className="st2"
          d="M1203.48,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="3"
          className={` ${getClassNames("XI APLHA", 3)}`}
          onClick={() =>
            handleClick("XI APLHA", 3, "XI APLHA Seat 3")
          }
        >
        <path
          className="st2"
          d="M1307.52,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="4"
          className={` ${getClassNames("XI APLHA", 4)}`}
          onClick={() =>
            handleClick("XI APLHA", 4, "XI APLHA Seat 4")
          }
        >
        <path
          className="st2"
          d="M1099.44,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="5"
          className={` ${getClassNames("XI APLHA", 5)}`}
          onClick={() =>
            handleClick("XI APLHA", 5, "XI APLHA Seat 5")
          }
        >
        <path
          className="st2"
          d="M1277.04,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="6"
          className={` ${getClassNames("XI APLHA", 6)}`}
          onClick={() =>
            handleClick("XI APLHA", 6, "XI APLHA Seat 6")
          }
        >
        <path
          className="st2"
          d="M1129.92,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="7"
          className={` ${getClassNames("XI APLHA", 7)}`}
          onClick={() =>
            handleClick("XI APLHA", 7, "XI APLHA Seat 7")
          }
        >
        <path
          className="st2"
          d="M1277.04,1894.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="XI APLHA"
          data-seat="8"
          className={` ${getClassNames("XI APLHA", 8)}`}
          onClick={() =>
            handleClick("XI APLHA", 8, "XI APLHA Seat 8")
          }
        >
        <path
          className="st2"
          d="M1129.92,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1780.84" cy="1795.62" r="67.05" />
        <g
          data-name="GAMMA PSI"
          data-seat="1"
          className={` ${getClassNames("GAMMA PSI", 1)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 1, "GAMMA PSI Seat 1")
          }
        >
        <path
          className="st2"
          d="M1780.84,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="2"
          className={` ${getClassNames("GAMMA PSI", 2)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 2, "GAMMA PSI Seat 2")
          }
        >
        <path
          className="st2"
          d="M1780.84,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="3"
          className={` ${getClassNames("GAMMA PSI", 3)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 3, "GAMMA PSI Seat 3")
          }
        >
        <path
          className="st2"
          d="M1884.88,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="4"
          className={` ${getClassNames("GAMMA PSI", 4)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 4, "GAMMA PSI Seat 4")
          }
        >
        <path
          className="st2"
          d="M1676.8,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="5"
          className={` ${getClassNames("GAMMA PSI", 5)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 5, "GAMMA PSI Seat 5")
          }
        >
        <path
          className="st2"
          d="M1854.4,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
         <g
          data-name="GAMMA PSI"
          data-seat="6"
          className={` ${getClassNames("GAMMA PSI", 6)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 6, "GAMMA PSI Seat 6")
          }
        >
        <path
          className="st2"
          d="M1707.28,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="7"
          className={` ${getClassNames("GAMMA PSI", 7)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 7, "GAMMA PSI Seat 7")
          }
        >
        <path
          className="st2"
          d="M1854.4,1894.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="GAMMA PSI"
          data-seat="8"
          className={` ${getClassNames("GAMMA PSI", 8)}`}
          onClick={() =>
            handleClick("GAMMA PSI", 8, "GAMMA PSI Seat 8")
          }
        >
        <path
          className="st2"
          d="M1707.28,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle
          className="st2"
          cx="353.59"
          cy="2156.28"
          r="67.05"
          transform="translate(-1813.26 2437.92) rotate(-88.09)"
        />
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
          d="M353.59,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M353.59,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M457.62,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M249.55,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M427.15,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M280.03,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27h0Z"
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
          d="M427.15,2254.67c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M280.03,2107.54c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27h0Z"
        />
        </g>
        <circle className="st2" cx="930.95" cy="2156.28" r="67.05" />
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
          d="M930.95,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M930.95,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1034.98,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M826.91,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1004.51,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M857.39,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M1004.51,2254.67c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M857.39,2107.54c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1508.31" cy="2156.28" r="67.05" />
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
          d="M1508.31,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1508.31,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1612.34,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1404.27,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1581.87,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1434.75,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M1581.87,2254.67c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1434.75,2107.54c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="626.12" cy="2511.1" r="67.05" />
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
          d="M626.12,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M626.12,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M730.16,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M522.08,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M699.68,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M552.56,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M699.68,2609.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M552.56,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1203.48" cy="2511.1" r="67.05" />
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
          d="M1203.48,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1203.48,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1307.52,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1099.44,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1277.04,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1129.92,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M1277.04,2609.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M1129.92,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="1780.84" cy="2511.1" r="67.05" />
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
          d="M1780.84,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1780.84,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1884.88,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1676.8,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M1854.4,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M1707.28,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M1854.4,2609.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M1707.28,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g>
          <rect
            className="st2"
            x="409.61"
            y="272.21"
            width="625.77"
            height="203.97"
          />
          <rect
            className="st2"
            x="1099.06"
            y="272.21"
            width="625.77"
            height="203.97"
          />
        </g>
        <circle className="st2" cx="2404.49" cy="725.32" r="67.05" />
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
          d="M2404.49,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2404.49,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2508.52,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2300.45,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2478.05,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2478.05,823.71c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2981.85" cy="725.32" r="67.05" />
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
          d="M2981.85,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2981.85,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3085.88,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2877.81,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3055.41,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2908.28,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M3055.41,823.71c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2908.28,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3559.21" cy="725.32" r="67.05" />
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
          d="M3559.21,646.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3559.21,854.19c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3663.24,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3455.17,750.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3632.77,676.57c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3485.64,823.7c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M3632.77,823.71c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3485.64,676.57c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2677.02" cy="1080.13" r="67.05" />
         <g
          data-name="THETANU"
          data-seat="1"
          className={` ${getClassNames("THETANU", 1)}`}
          onClick={() =>
            handleClick("THETANU", 1, "THETANU Seat 1")
          }
        >
        <path
          className="st2"
          d="M2677.02,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="2"
          className={` ${getClassNames("THETANU", 2)}`}
          onClick={() =>
            handleClick("THETANU", 2, "THETANU Seat 2")
          }
        >
        <path
          className="st2"
          d="M2677.02,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="3"
          className={` ${getClassNames("THETANU", 3)}`}
          onClick={() =>
            handleClick("THETANU", 3, "THETANU Seat 3")
          }
        >
        <path
          className="st2"
          d="M2781.06,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="4"
          className={` ${getClassNames("THETANU", 4)}`}
          onClick={() =>
            handleClick("THETANU", 4, "THETANU Seat 4")
          }
        >
        <path
          className="st2"
          d="M2572.98,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="5"
          className={` ${getClassNames("THETANU", 5)}`}
          onClick={() =>
            handleClick("THETANU", 5, "THETANU Seat 5")
          }
        >
        <path
          className="st2"
          d="M2750.58,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="6"
          className={` ${getClassNames("THETANU", 6)}`}
          onClick={() =>
            handleClick("THETANU", 6, "THETANU Seat 6")
          }
        >
        <path
          className="st2"
          d="M2603.46,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="7"
          className={` ${getClassNames("THETANU", 7)}`}
          onClick={() =>
            handleClick("THETANU", 7, "THETANU Seat 7")
          }
        >
        <path
          className="st2"
          d="M2750.58,1178.52c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="THETANU"
          data-seat="8"
          className={` ${getClassNames("THETANU", 8)}`}
          onClick={() =>
            handleClick("THETANU", 8, "THETANU Seat 8")
          }
        >
        <path
          className="st2"
          d="M2603.46,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3254.38" cy="1080.13" r="67.05" />
        <g
          data-name="ALPHA SIGMA"
          data-seat="1"
          className={` ${getClassNames("ALPHA SIGMA", 1)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 1, "ALPHA SIGMA Seat 1")
          }
        >
        <path
          className="st2"
          d="M3254.38,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="2"
          className={` ${getClassNames("ALPHA SIGMA", 2)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 2, "ALPHA SIGMA Seat 2")
          }
        >
        <path
          className="st2"
          d="M3254.38,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="3"
          className={` ${getClassNames("ALPHA SIGMA", 3)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 3, "ALPHA SIGMA Seat 3")
          }
        >
        <path
          className="st2"
          d="M3358.42,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="4"
          className={` ${getClassNames("ALPHA SIGMA", 4)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 4, "ALPHA SIGMA Seat 4")
          }
        >
        <path
          className="st2"
          d="M3150.34,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="5"
          className={` ${getClassNames("ALPHA SIGMA", 5)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 5, "ALPHA SIGMA Seat 5")
          }
        >
        <path
          className="st2"
          d="M3327.94,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="6"
          className={` ${getClassNames("ALPHA SIGMA", 6)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 6, "ALPHA SIGMA Seat 6")
          }
        >
        <path
          className="st2"
          d="M3180.82,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="7"
          className={` ${getClassNames("ALPHA SIGMA", 7)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 7, "ALPHA SIGMA Seat 7")
          }
        >
        <path
          className="st2"
          d="M3327.94,1178.52c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="ALPHA SIGMA"
          data-seat="8"
          className={` ${getClassNames("ALPHA SIGMA", 8)}`}
          onClick={() =>
            handleClick("ALPHA SIGMA", 8, "ALPHA SIGMA Seat 8")
          }
        >
        <path
          className="st2"
          d="M3180.82,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3831.74" cy="1080.13" r="67.05" />
        <g
          data-name="NUIOTA"
          data-seat="1"
          className={` ${getClassNames("NUIOTA", 1)}`}
          onClick={() =>
            handleClick("NUIOTA", 1, "NUIOTA Seat 1")
          }
        >
        <path
          className="st2"
          d="M3831.74,1000.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
         <g
          data-name="NUIOTA"
          data-seat="2"
          className={` ${getClassNames("NUIOTA", 2)}`}
          onClick={() =>
            handleClick("NUIOTA", 2, "NUIOTA Seat 2")
          }
        >
        <path
          className="st2"
          d="M3831.74,1209c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="3"
          className={` ${getClassNames("NUIOTA", 3)}`}
          onClick={() =>
            handleClick("NUIOTA", 3, "NUIOTA Seat 3")
          }
        >
        <path
          className="st2"
          d="M3935.78,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
         <g
          data-name="NUIOTA"
          data-seat="4"
          className={` ${getClassNames("NUIOTA", 4)}`}
          onClick={() =>
            handleClick("NUIOTA", 4, "NUIOTA Seat 4")
          }
        >
        <path
          className="st2"
          d="M3727.7,1104.96c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="5"
          className={` ${getClassNames("NUIOTA", 5)}`}
          onClick={() =>
            handleClick("NUIOTA", 5, "NUIOTA Seat 5")
          }
        >
        <path
          className="st2"
          d="M3905.3,1031.39c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="6"
          className={` ${getClassNames("NUIOTA", 6)}`}
          onClick={() =>
            handleClick("NUIOTA", 6, "NUIOTA Seat 6")
          }
        >
        <path
          className="st2"
          d="M3758.18,1178.51c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="7"
          className={` ${getClassNames("NUIOTA", 7)}`}
          onClick={() =>
            handleClick("NUIOTA", 7, "NUIOTA Seat 7")
          }
        >
        <path
          className="st2"
          d="M3905.3,1178.52c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="NUIOTA"
          data-seat="8"
          className={` ${getClassNames("NUIOTA", 8)}`}
          onClick={() =>
            handleClick("NUIOTA", 8, "NUIOTA Seat 8")
          }
        >
        <path
          className="st2"
          d="M3758.18,1031.39c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2404.49" cy="1440.8" r="67.05" />
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
          d="M2404.49,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2404.49,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2508.52,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2300.45,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2478.05,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M2478.05,1539.19c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,1392.06c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2981.85" cy="1440.8" r="67.05" />
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
          d="M2981.85,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2981.85,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3085.88,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2877.81,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3055.41,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2908.28,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M3055.41,1539.19c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2908.28,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3559.21" cy="1440.8" r="67.05" />
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
          d="M3559.21,1361.6c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3559.21,1569.67c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3663.24,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3455.17,1465.63c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3632.77,1392.06c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3485.64,1539.18c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M3632.77,1539.19c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3485.64,1392.06c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2677.02" cy="1795.62" r="67.05" />
        <g
          data-name="BETA GAMMA"
          data-seat="1"
          className={` ${getClassNames("BETA GAMMA", 1)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 1, "BETA GAMMA Seat 1")
          }
        >
        <path
          className="st2"
          d="M2677.02,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="2"
          className={` ${getClassNames("BETA GAMMA", 2)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 2, "BETA GAMMA Seat 2")
          }
        >
        <path
          className="st2"
          d="M2677.02,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="3"
          className={` ${getClassNames("BETA GAMMA", 3)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 3, "BETA GAMMA Seat 3")
          }
        >
        <path
          className="st2"
          d="M2781.06,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="4"
          className={` ${getClassNames("BETA GAMMA", 4)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 4, "BETA GAMMA Seat 4")
          }
        >
        <path
          className="st2"
          d="M2572.98,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="5"
          className={` ${getClassNames("BETA GAMMA", 5)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 5, "BETA GAMMA Seat 5")
          }
        >
        <path
          className="st2"
          d="M2750.58,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
         <g
          data-name="BETA GAMMA"
          data-seat="6"
          className={` ${getClassNames("BETA GAMMA", 6)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 6, "BETA GAMMA Seat 6")
          }
        >
        <path
          className="st2"
          d="M2603.46,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="7"
          className={` ${getClassNames("BETA GAMMA", 7)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 7, "BETA GAMMA Seat 7")
          }
        >
        <path
          className="st2"
          d="M2750.58,1894.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="BETA GAMMA"
          data-seat="8"
          className={` ${getClassNames("BETA GAMMA", 8)}`}
          onClick={() =>
            handleClick("BETA GAMMA", 8, "BETA GAMMA Seat 8")
          }
        >
        <path
          className="st2"
          d="M2603.46,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3255.13" cy="1795.62" r="67.05" />
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
          d="M3254.38,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3254.38,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3358.42,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3150.34,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3327.94,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3180.82,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M3327.94,1894.01c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3180.82,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3831.74" cy="1795.62" r="67.05" />
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="1"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 1)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 1, "BETA IOTA EPSILON NU Seat 1")
          }
        >
        <path
          className="st2"
          d="M3831.74,1716.41c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="2"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 2)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 2, "BETA IOTA EPSILON NU Seat 2")
          }
        >
        <path
          className="st2"
          d="M3831.74,1924.48c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="3"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 3)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 3, "BETA IOTA EPSILON NU Seat 3")
          }
        >
        <path
          className="st2"
          d="M3935.78,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="4"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 4)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 4, "BETA IOTA EPSILON NU Seat 4")
          }
        >
        <path
          className="st2"
          d="M3727.7,1820.44c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="5"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 5)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 5, "BETA IOTA EPSILON NU Seat 5")
          }
        >
        <path
          className="st2"
          d="M3905.3,1746.87c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="6"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 6)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 6, "BETA IOTA EPSILON NU Seat 6")
          }
        >
        <path
          className="st2"
          d="M3758.18,1893.99c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="7"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 7)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 7, "BETA IOTA EPSILON NU Seat 7")
          }
        >
        <path
          className="st2"
          d="M3905.3,1894.01c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
         <g
          data-name="BETA IOTA EPSILON NU"
          data-seat="8"
          className={` ${getClassNames("BETA IOTA EPSILON NU", 8)}`}
          onClick={() =>
            handleClick("BETA IOTA EPSILON NU", 8, "BETA IOTA EPSILON NU Seat 8")
          }
        >
        <path
          className="st2"
          d="M3758.18,1746.87c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2404.49" cy="2156.28" r="67.05" />
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
          d="M2404.49,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2404.49,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2508.52,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2300.45,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M2478.05,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2478.05,2254.67c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M2330.92,2107.54c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2981.85" cy="2156.28" r="67.05" />
        <g
          data-name="EPSILONNA"
          data-seat="1"
          className={` ${getClassNames("EPSILONNA", 1)}`}
          onClick={() =>
            handleClick("EPSILONNA", 1, "EPSILONNA Seat 1")
          }
        >
        <path
          className="st2"
          d="M2981.85,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="2"
          className={` ${getClassNames("EPSILONNA", 2)}`}
          onClick={() =>
            handleClick("EPSILONNA", 2, "EPSILONNA Seat 2")
          }
        >
        <path
          className="st2"
          d="M2981.85,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="3"
          className={` ${getClassNames("EPSILONNA", 3)}`}
          onClick={() =>
            handleClick("EPSILONNA", 3, "EPSILONNA Seat 3")
          }
        >
        <path
          className="st2"
          d="M3085.88,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="4"
          className={` ${getClassNames("EPSILONNA", 4)}`}
          onClick={() =>
            handleClick("EPSILONNA", 4, "EPSILONNA Seat 4")
          }
        >
        <path
          className="st2"
          d="M2877.81,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="5"
          className={` ${getClassNames("EPSILONNA", 5)}`}
          onClick={() =>
            handleClick("EPSILONNA", 5, "EPSILONNA Seat 5")
          }
        >
        <path
          className="st2"
          d="M3055.41,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="6"
          className={` ${getClassNames("EPSILONNA", 6)}`}
          onClick={() =>
            handleClick("EPSILONNA", 6, "EPSILONNA Seat 6")
          }
        >
        <path
          className="st2"
          d="M2908.28,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="7"
          className={` ${getClassNames("EPSILONNA", 7)}`}
          onClick={() =>
            handleClick("EPSILONNA", 7, "EPSILONNA Seat 7")
          }
        >
        <path
          className="st2"
          d="M3055.41,2254.67c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="EPSILONNA"
          data-seat="8"
          className={` ${getClassNames("EPSILONNA", 8)}`}
          onClick={() =>
            handleClick("EPSILONNA", 8, "EPSILONNA Seat 8")
          }
        >
        <path
          className="st2"
          d="M2908.28,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3559.21" cy="2156.28" r="67.05" />
         <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="1"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 1)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 1, "FRANKLIN (LA) ALUMNI Seat 1")
          }
        >
        <path
          className="st2"
          d="M3559.21,2077.08c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="2"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 2)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 2, "FRANKLIN (LA) ALUMNI Seat 2")
          }
        >
        <path
          className="st2"
          d="M3559.21,2285.15c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="3"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 3)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 3, "FRANKLIN (LA) ALUMNI Seat 3")
          }
        >
        <path
          className="st2"
          d="M3663.24,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="4"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 4)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 4, "FRANKLIN (LA) ALUMNI Seat 4")
          }
        >
        <path
          className="st2"
          d="M3455.17,2181.11c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="5"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 5)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 5, "FRANKLIN (LA) ALUMNI Seat 5")
          }
        >
        <path
          className="st2"
          d="M3632.77,2107.54c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="6"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 6)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 6, "FRANKLIN (LA) ALUMNI Seat 6")
          }
        >
        <path
          className="st2"
          d="M3485.64,2254.66c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="7"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 7)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 7, "FRANKLIN (LA) ALUMNI Seat 7")
          }
        >
        <path
          className="st2"
          d="M3632.77,2254.67c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="FRANKLIN (LA) ALUMNI"
          data-seat="8"
          className={` ${getClassNames("FRANKLIN (LA) ALUMNI", 8)}`}
          onClick={() =>
            handleClick("FRANKLIN (LA) ALUMNI", 8, "FRANKLIN (LA) ALUMNI Seat 8")
          }
        >
        <path
          className="st2"
          d="M3485.64,2107.54c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="2677.02" cy="2511.1" r="67.05" />
        <g
          data-name="ALPHA"
          data-seat="1"
          className={` ${getClassNames("ALPHA", 1)}`}
          onClick={() =>
            handleClick("ALPHA", 1, "ALPHA Seat 1")
          }
        >
        <path
          className="st2"
          d="M2677.02,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="2"
          className={` ${getClassNames("ALPHA", 2)}`}
          onClick={() =>
            handleClick("ALPHA", 2, "ALPHA Seat 2")
          }
        >
        <path
          className="st2"
          d="M2677.02,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="3"
          className={` ${getClassNames("ALPHA", 3)}`}
          onClick={() =>
            handleClick("ALPHA", 3, "ALPHA Seat 3")
          }
        >
        <path
          className="st2"
          d="M2781.06,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="4"
          className={` ${getClassNames("ALPHA", 4)}`}
          onClick={() =>
            handleClick("ALPHA", 4, "ALPHA Seat 4")
          }
        >
        <path
          className="st2"
          d="M2572.98,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="5"
          className={` ${getClassNames("ALPHA", 5)}`}
          onClick={() =>
            handleClick("ALPHA", 5, "ALPHA Seat 5")
          }
        >
        <path
          className="st2"
          d="M2750.58,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="6"
          className={` ${getClassNames("ALPHA", 6)}`}
          onClick={() =>
            handleClick("ALPHA", 6, "ALPHA Seat 6")
          }
        >
        <path
          className="st2"
          d="M2603.46,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
         <g
          data-name="ALPHA"
          data-seat="7"
          className={` ${getClassNames("ALPHA", 7)}`}
          onClick={() =>
            handleClick("ALPHA", 7, "ALPHA Seat 7")
          }
        >
        <path
          className="st2"
          d="M2750.58,2609.49c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="ALPHA"
          data-seat="8"
          className={` ${getClassNames("ALPHA", 8)}`}
          onClick={() =>
            handleClick("ALPHA", 8, "ALPHA Seat 8")
          }
        >
        <path
          className="st2"
          d="M2603.46,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3254.38" cy="2511.1" r="67.05" />
        <g
          data-name="AKA"
          data-seat="1"
          className={` ${getClassNames("AKA", 1)}`}
          onClick={() =>
            handleClick("AKA", 1, "AKA Seat 1")
          }
        >
        <path
          className="st2"
          d="M3254.38,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="2"
          className={` ${getClassNames("AKA", 2)}`}
          onClick={() =>
            handleClick("AKA", 2, "AKA Seat 2")
          }
        >
        <path
          className="st2"
          d="M3254.38,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="3"
          className={` ${getClassNames("AKA", 3)}`}
          onClick={() =>
            handleClick("AKA", 3, "AKA Seat 3")
          }
        >
        <path
          className="st2"
          d="M3358.42,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="4"
          className={` ${getClassNames("AKA", 4)}`}
          onClick={() =>
            handleClick("AKA", 4, "AKA Seat 4")
          }
        >
        <path
          className="st2"
          d="M3150.34,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="5"
          className={` ${getClassNames("AKA", 5)}`}
          onClick={() =>
            handleClick("AKA", 5, "AKA Seat 5")
          }
        >
        <path
          className="st2"
          d="M3327.94,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="6"
          className={` ${getClassNames("AKA", 6)}`}
          onClick={() =>
            handleClick("AKA", 6, "AKA Seat 6")
          }
        >
        <path
          className="st2"
          d="M3180.82,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="7"
          className={` ${getClassNames("AKA", 7)}`}
          onClick={() =>
            handleClick("AKA", 7, "AKA Seat 7")
          }
        >
        <path
          className="st2"
          d="M3327.94,2609.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54,10.91-7.27,17.54-7.27,12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g
          data-name="AKA"
          data-seat="8"
          className={` ${getClassNames("AKA", 8)}`}
          onClick={() =>
            handleClick("AKA", 8, "AKA Seat 8")
          }
        >
        <path
          className="st2"
          d="M3180.82,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.67,4.67,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <circle className="st2" cx="3831.74" cy="2511.1" r="67.05" />
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
          d="M3831.74,2431.89c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3831.74,2639.97c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3935.78,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3727.7,2535.93c-13.69,0-24.81-11.12-24.81-24.81s11.12-24.81,24.81-24.81,24.81,11.12,24.81,24.81-11.12,24.81-24.81,24.81Z"
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
          d="M3905.3,2462.35c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.67,4.67-10.91,7.27-17.54,7.27Z"
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
          d="M3758.18,2609.47c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.68-4.68,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
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
          d="M3905.3,2609.49c-6.63,0-12.87-2.59-17.54-7.27-4.68-4.68-7.27-10.91-7.27-17.54s2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27c4.68,4.68,7.27,10.91,7.27,17.54s-2.59,12.87-7.27,17.54-10.91,7.27-17.54,7.27Z"
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
          d="M3758.18,2462.35c-6.63,0-12.87-2.59-17.54-7.27s-7.27-10.91-7.27-17.54,2.59-12.87,7.27-17.54c4.67-4.67,10.91-7.27,17.54-7.27s12.87,2.59,17.54,7.27,7.27,10.91,7.27,17.54-2.59,12.87-7.27,17.54c-4.68,4.68-10.91,7.27-17.54,7.27Z"
        />
        </g>
        <g>
          <rect
            className="st2"
            x="2460.5"
            y="272.21"
            width="625.77"
            height="203.97"
          />
          <rect
            className="st2"
            x="3149.95"
            y="272.21"
            width="625.77"
            height="203.97"
          />
        </g>
        <g className="st1">
          <text className="st0" transform="translate(300.46 725.42)">
            <tspan x="0" y="0">
              NATCHITOCHES
            </tspan>
          </text>
          <text className="st0" transform="translate(326.13 744.62)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(899.56 725.42)">
            <tspan x="0" y="0">
              RAYVILLE
            </tspan>
          </text>
          <text className="st0" transform="translate(903.5 744.62)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1464.45 725.42)">
            <tspan x="0" y="0">
              SHREVEPORT
            </tspan>
            <tspan x="16.39" y="19.2">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(573.38 1084.83)">
            <tspan x="0" y="0">
              THETA LAMBDA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1183.28 1084.83)">
            <tspan x="0" y="0">
              ETA PI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1752.37 1084.83)">
            <tspan x="0" y="0">
              PI DELTA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(588.04 1800.32)">
            <tspan x="0" y="0">
              NU OMEGA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1172.26 1800.32)">
            <tspan x="0" y="0">
              XI ALPHA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1741.21 1800.32)">
            <tspan x="0" y="0">
              GAMMA PSI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(588.37 2511.13)">
            <tspan x="0" y="0">
              OMEGA PSI
            </tspan>
          </text>
          <text className="st0" transform="translate(614.74 2530.33)">
            <tspan x="0" y="0">
              PHI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1473.72 2151.38)">
            <tspan x="0" y="0">
              TALLULAH
            </tspan>
          </text>
          <text className="st0" transform="translate(1481.75 2170.58)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(904.79 2151.38)">
            <tspan x="0" y="0">
              SLIDELL
            </tspan>
          </text>
          <text className="st0" transform="translate(903.78 2170.58)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(309.81 1435.9)">
            <tspan x="0" y="0">
              ALEXANDRIA
            </tspan>
            <tspan x="16.32" y="19.2">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(886.51 1435.9)">
            <tspan x="0" y="0">
              BOSSIER CITY
            </tspan>
            <tspan x="16.98" y="19.2">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1467.05 1435.9)">
            <tspan x="0" y="0">
              GRAMBLING
            </tspan>
            <tspan x="13.8" y="19.2">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1736.26 2506.2)">
            <tspan x="0" y="0">
              DELTA SIGMA
            </tspan>
          </text>
          <text className="st0" transform="translate(1760.22 2525.4)">
            <tspan x="0" y="0">
              THETA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(1173.64 2506.2)">
            <tspan x="0" y="0">
              ZETA PHI
            </tspan>
          </text>
          <text className="st0" transform="translate(1186.81 2525.4)">
            <tspan x="0" y="0">
              BETA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(314.54 2151.38)">
            <tspan x="0" y="0">
              HAMMOND
            </tspan>
          </text>
          <text className="st0" transform="translate(326.16 2170.58)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2363.85 720.42)">
            <tspan x="0" y="0">
              OPELOUSAS
            </tspan>
          </text>
          <text className="st0" transform="translate(2377.35 739.62)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3510.24 720.42)">
            <tspan x="0" y="0">
              BATON ROUGE
            </tspan>
          </text>
          <text className="st0" transform="translate(3532.56 739.62)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2945.11 720.42)">
            <tspan x="0" y="0">
              LAFAYETTE
            </tspan>
          </text>
          <text className="st0" transform="translate(2955.27 739.62)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3207.37 1084.83)">
            <tspan x="0" y="0">
              ALPHA SIGMA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2954.18 1435.9)">
            <tspan x="0" y="0">
              GRETNA
            </tspan>
          </text>
          <text className="st0" transform="translate(2954.27 1455.1)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2659.99 1790.72)">
            <tspan x="0" y="0">
              BETA
            </tspan>
          </text>
          <text className="st0" transform="translate(2649.31 1809.92)">
            <tspan x="0" y="0">
              GAMMA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3532.38 1435.9)">
            <tspan x="0" y="0">
              KENNER
            </tspan>
          </text>
          <text className="st0" transform="translate(3531.96 1455.1)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3221.54 1790.72)">
            <tspan x="0" y="0">
              OMICRON
            </tspan>
          </text>
          <text className="st0" transform="translate(3225.28 1809.92)">
            <tspan x="0" y="0">
              UPSILON
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3510.68 2151.38)">
            <tspan x="0" y="0">
              FRANKLIN (LA)
            </tspan>
          </text>
          <text className="st0" transform="translate(3531.78 2170.58)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2653.98 2515.8)">
            <tspan x="0" y="0">
              ALPHA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3797.88 1780.82)">
            <tspan x="0" y="0">
              BETA IOTA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2643.36 1084.83)">
            <tspan x="0" y="0">
              THETA NU
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3779.87 2506.2)">
            <tspan x="0" y="0">
              SIGMA GAMMA
            </tspan>
            <tspan x="36.84" y="19.2">
              RHO
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3790.37 1817.99)">
            <tspan x="0" y="0">
              EPSILON PHI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2940.48 2160.98)">
            <tspan x="0" y="0">
              EPSILON PHI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2355.14 2151.38)">
            <tspan x="0" y="0">
              LAKE CHARLES
            </tspan>
          </text>
          <text className="st0" transform="translate(2377.04 2170.58)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3240.17 2515.8)">
            <tspan x="0" y="0">
              AKA
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(2355.12 1435.9)">
            <tspan x="0" y="0">
              NEW ORLEANS
            </tspan>
          </text>
          <text className="st0" transform="translate(2376.96 1455.1)">
            <tspan x="0" y="0">
              ALUMNI
            </tspan>
          </text>
        </g>
        <g className="st1">
          <text className="st0" transform="translate(3804.11 1084.83)">
            <tspan x="0" y="0">
              NU IOTA
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Alumni3Layout;
