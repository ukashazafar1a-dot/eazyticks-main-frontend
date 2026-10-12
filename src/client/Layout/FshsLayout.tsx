import { extractConfirmed, extractSeatNos } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import useHybridLayout from "@/hooks/useHybridLayout";
import { FSHSDistNames, Ticket } from "@/lib/types";
import useApp from "@/context/useApp";
import "@/assets/fshs.css";



type props = {
  tickets: Ticket[] | null;
  handleRefetch?: () => void;
  type?: string;
};


const MIN_ZOOM = 0.6;
const MAX_ZOOM = 8;
const ZOOM_STEP = 0.8;

const FshsLayout = ({ tickets }: props) => {
  const [tables, setTables] = useState<Ticket[] | null>(null);
  const [zoom, setZoom] = useState(1);
  const { getItem } = useCart();
  const { handleAddToCart } = useHybridLayout();
  const { setToaster } = useApp();

  const updateZoom = (delta: number) => {
    setZoom((prev) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta));
      return Number(next.toFixed(1));
    });
  };

  const resetZoom = () => setZoom(1);

  const getActualSeatNo = (tableNumber: number, seatNumber: number) =>
    (tableNumber - 1) * 10 + seatNumber;

  const getClassNames = (
    table: FSHSDistNames,
    tableNumber: number,
    seatNumber: number,
  ) => {
    const classes = ["tb-s "];
    const actualSeatNo = getActualSeatNo(tableNumber, seatNumber);
    const foundTicket = tables?.find((ticket) => {
      return ticket?.name.toLowerCase() === table.toLowerCase();
    });
    if (!foundTicket) {
      classes.push("not-found");
      return classes.join(" ");
    }
    const booked = extractSeatNos(foundTicket?.seats);
    const sold = extractConfirmed(foundTicket?.seats);
    if (booked?.includes(actualSeatNo)) {
      classes.push("booked");
    }
    if (sold?.includes(actualSeatNo)) {
      classes.push("sold");
    }
    const id = `t-${foundTicket?.id}-r-1-b-${actualSeatNo}`;
    if (getItem(id)) {
      classes.push("in-cart");
    }
    return classes.join(" ");
  };

  const handleClick = (
    table: FSHSDistNames,
    tableNumber: number,
    seat: number,
    name: string,
  ) => {
    const actualSeatNo = getActualSeatNo(tableNumber, seat);

    const foundTicket = tables?.find((ticket) => {
      //console.log(ticket?.name.toLowerCase(), table.toLowerCase());
      return ticket?.name.toLowerCase() === table.toLowerCase();
    });
    if (foundTicket) {
      const exact = foundTicket?.seats?.find(
        (tick) => Number(tick?.seatNo) === actualSeatNo,
      );
      //console.log(exact);
      if (
        (exact && exact?.status == "Confirmed") ||
        exact?.status == "Booked"
      ) {
        setToaster(
          "error",
          `${name} is already ${
            exact?.status == "Confirmed" ? "sold" : exact?.status
          }.`,
        );
      } else {
        handleAddToCart(foundTicket, 1, actualSeatNo, name);
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
    <div className="fshs-wrapper">
      <p className="md:hidden mb-3">
        <strong>Note:</strong> Scroll left/right and up/down to view the full
        seating chart. Tap a Dot on the seating chart to purchase a ticket.
      </p>
      <p className="hidden md:block mb-3 text-sm text-gray-600">
        <strong>Note:</strong> Use the zoom controls to inspect the seating
        chart, then click a Dot on the seating chart to purchase a ticket.
      </p>

      <div className="fshs-zoom-controls">
        <button
          type="button"
          id="btn-zoom-out"
          className="fshs-zoom-btn"
          onClick={() => updateZoom(-ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          id="btn-zoom-reset"
          className="fshs-zoom-btn fshs-zoom-btn--reset"
          onClick={resetZoom}
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <span className="fshs-zoom-level">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          id="btn-zoom-in"
          className="fshs-zoom-btn"
          onClick={() => updateZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
      <div className="fshs-svg-viewport overflow-auto w-full">
        <div
          className="fshs-svg-scaler min-w-[900px] md:min-w-0"
          style={{ width: `${zoom * 100}%` }}
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 3573.63 2382.42"
            className="block w-full h-auto"
          >
        <defs></defs>
        <rect className="st5" width="3573.63" height="2382.42" />
        <g>
          <rect
            className="st6"
            x="1797.17"
            y="1085.61"
            width="1349.9"
            height="793.05"
          />
          <path d="M3001.84,1261.31v-113.76h34.63c9.38,0,16.22,2.39,20.53,7.18,4.31,4.78,6.49,11.34,6.53,19.67l.29,53.13c0,11.38-2.23,19.85-6.68,25.42-4.45,5.57-11.63,8.35-21.53,8.35h-33.78ZM3027.12,1167.69v72.84c.14-.05.43-.07.86-.07.29,0,.82.02,1.61.07.79.05,1.42.07,1.89.07,4.81,0,7.21-2.02,7.21-6.07v-56.13c0-4.14-.65-6.99-1.96-8.53-1.31-1.55-3.58-2.32-6.82-2.32-.52,0-1.45.05-2.79.14Z" />
        </g>
        <g>
          <rect
            className="st0"
            x="414.48"
            y="227.35"
            width="1349.9"
            height="841.47"
          />
          <path d="M535.01,268.3l12.57,113.76h-24.28l-1.79-17.14h-12.71l-1.57,17.14h-24.42l12.85-113.76h39.35ZM516.23,289.65h-2.29l-3.36,54.56h9l-3.36-54.56Z" />
        </g>
        <g>
          <rect
            className="st2"
            x="1797.17"
            y="227.35"
            width="1349.9"
            height="841.47"
          />
          <path d="M3002.98,382.06v-113.76h34.06c8.9,0,15.5,1.96,19.78,5.89,4.29,3.93,6.43,10.63,6.43,20.1v4.93c0,.81-.08,2.07-.25,3.78s-.4,3.06-.71,4.03c-.31.98-.77,2.18-1.39,3.61-.62,1.43-1.38,2.6-2.29,3.5-.9.9-2.05,1.79-3.43,2.64s-2.98,1.5-4.78,1.93c2.62.62,4.86,1.69,6.71,3.21,1.86,1.52,3.26,3.13,4.21,4.82.95,1.69,1.7,3.77,2.25,6.25.55,2.48.87,4.55.96,6.21.09,1.67.14,3.67.14,6,0,6-.42,11.14-1.25,15.42-.83,4.28-2.27,8.1-4.32,11.46-2.05,3.36-4.89,5.86-8.53,7.5-3.64,1.64-8.15,2.46-13.53,2.46h-34.06ZM3027.55,311.14h5.14c1.24,0,2.25-.26,3.04-.79.79-.52,1.34-1.27,1.68-2.25.33-.98.55-1.86.64-2.64.09-.79.14-1.73.14-2.82v-11.28c0-3.62-1.79-5.43-5.36-5.43h-5.28v25.21ZM3027.55,328.85v32.99c1.14.1,1.97.14,2.5.14,6.52,0,9.78-2.81,9.78-8.43v-14.21c0-3.62-.61-6.27-1.82-7.96-1.21-1.69-3.16-2.53-5.82-2.53h-4.64Z" />
        </g>
        <g>
          <rect
            className="st11"
            x="414.48"
            y="1085.61"
            width="1349.9"
            height="793.05"
          />
          <path d="M546.72,1212.32v21.5c0,9.9-2.81,17.17-8.43,21.82-5.62,4.64-13.47,6.96-23.57,6.96-8.95,0-16.23-2.56-21.85-7.68-5.62-5.12-8.43-12.39-8.43-21.82v-52.77c0-11.28,2.49-19.72,7.46-25.32,4.97-5.59,12.77-8.39,23.39-8.39,4.33,0,8.33.54,12,1.61,3.67,1.07,6.92,2.65,9.75,4.75,2.83,2.1,5.06,4.84,6.68,8.25,1.62,3.4,2.43,7.32,2.43,11.75v20.07h-24.85v-13.21c0-6.81-2-10.21-6-10.21-2.38,0-3.95.75-4.71,2.25-.76,1.5-1.14,3.58-1.14,6.25v53.77c0,2.33.54,4.36,1.61,6.07,1.07,1.71,2.49,2.57,4.25,2.57,1.62,0,3.02-.63,4.21-1.89,1.19-1.26,1.79-3.51,1.79-6.75v-19.57h25.42Z" />
        </g>
        <g>
          <rect
            className="st15"
            x="414.48"
            y="1878.66"
            width="2732.59"
            height="448.14"
          />
          <g>
            <path d="M1520.91,2204.66h23.05v9.18h-13.46v19.99h9.99v8.97h-9.99v18.97h13.46v9.18h-23.05v-66.28Z" />
            <path d="M1567.21,2270.94l-6.53-29.17c-1.22-5.2-2.96-15.4-4.38-24.27.51,8.67.92,18.15.92,22.84v30.59h-8.26v-66.28h11.73l6.83,30.9c1.33,5.81,3.26,16.21,4.69,24.88-.41-8.26-.92-17.64-.92-22.94v-32.84h8.16v66.28h-12.24Z" />
            <path d="M1593,2213.83h-9.89v-9.18h29.37v9.18h-9.89v57.11h-9.59v-57.11Z" />
            <path d="M1616.05,2270.94v-66.28h19.38c6.12,0,8.57,3.06,8.57,10.61v24.27c0,4.59-1.33,7.44-4.38,8.67l6.02,22.74h-9.59l-5.61-21.72h-4.79v21.72h-9.59ZM1634.51,2240.04v-26.21h-8.87v26.21h8.87Z" />
            <path d="M1657.14,2270.94v-26.21l-10.81-40.08h9.79l5.71,28.04h.41l5.91-28.04h9.69l-11.12,40.08v26.21h-9.59Z" />
            <path d="M1697.72,2204.66h23.76v9.18h-14.17v21.41h10.81v8.97h-10.81v26.72h-9.59v-66.28Z" />
            <path d="M1725.15,2270.94v-66.28h19.38c6.12,0,8.57,3.06,8.57,10.61v24.27c0,4.59-1.33,7.44-4.38,8.67l6.02,22.74h-9.59l-5.61-21.72h-4.79v21.72h-9.59ZM1743.61,2240.04v-26.21h-8.87v26.21h8.87Z" />
            <path d="M1758.8,2259.93v-44.77c0-6.93,2.75-10.5,9.08-10.5h9.89c7.55,0,9.79,3.37,9.79,10.71v43.95c0,7.75-2.86,11.62-9.28,11.62h-10.5c-5.4,0-8.97-3.47-8.97-11.01ZM1778.08,2261.76v-47.93h-9.69v47.93h9.69Z" />
            <path d="M1828.35,2239.43c0-3.77.1-13.46.31-22.33-.71,6.42-1.63,13.97-2.45,20.4l-4.69,33.45h-12.13l-4.79-33.35c-1.12-7.75-2.04-15.7-2.75-22.23.2,9.28.51,20.19.51,24.07v31.51h-8.67v-66.28h14.07l7.55,55.07h.51l6.93-55.07h14.07v66.28h-8.46v-31.51Z" />
            <path d="M1887.79,2246.36v12.95c0,7.14-2.24,11.62-9.38,11.62h-9.79c-5.4,0-8.97-3.16-8.97-10.71v-46.09c0-6.63,2.75-9.48,9.08-9.48h9.28c8.06,0,9.79,3.37,9.79,10.71v10.3h-9.48v-11.83h-9.08v47.93h9.08v-15.4h9.48Z" />
            <path d="M1911.65,2257.07h-9.79l-1.33,13.87h-9.58l7.34-66.28h17.23l7.14,66.28h-9.69l-1.33-13.87ZM1902.78,2248.1h8.06l-3.16-33.65h-1.63l-3.26,33.65Z" />
            <path d="M1953.05,2259.31c0,7.65-2.75,11.62-9.18,11.62h-9.28c-5.41,0-8.97-3.47-8.97-11.12v-10.71h9.48v12.64h8.57v-14.99l-13.97-12.03c-3.06-2.24-4.08-4.18-4.08-8.67v-11.52c0-7.04,2.75-9.89,9.18-9.89h8.77c7.14,0,9.48,2.96,9.48,10.71v9.99h-9.38v-11.52h-8.57v12.85l13.97,11.73c3.06,2.35,3.98,4.28,3.98,8.77v12.13Z" />
            <path d="M1959.07,2204.66h9.69v66.28h-9.69v-66.28Z" />
            <path d="M1993.64,2270.94l-6.53-29.17c-1.22-5.2-2.96-15.4-4.39-24.27.51,8.67.92,18.15.92,22.84v30.59h-8.26v-66.28h11.73l6.83,30.9c1.33,5.81,3.26,16.21,4.69,24.88-.41-8.26-.92-17.64-.92-22.94v-32.84h8.16v66.28h-12.24Z" />
            <path d="M2012.09,2259.93v-44.77c0-6.93,2.75-10.5,9.08-10.5h9.89c7.55,0,9.79,3.37,9.79,10.71v43.95c0,7.75-2.86,11.62-9.28,11.62h-10.5c-5.4,0-8.97-3.47-8.97-11.01ZM2031.36,2261.76v-47.93h-9.69v47.93h9.69Z" />
          </g>
          <path
            className="st10"
            d="M1871.99,2085.6h8.28l-5,72.76h-193.62v-7.93h4.83c11.61,0,19.11-1.55,22.5-4.66,3.39-3.1,5.54-7.04,6.47-11.81.92-4.77,1.38-16.92,1.38-36.47v-114.66c0-17.82-.49-29.54-1.47-35.17-.98-5.63-3.22-9.57-6.72-11.81-3.51-2.24-10.89-3.36-22.16-3.36v-7.93h167.07l5.52,58.28h-8.1c-3.68-16.32-8.19-27.9-13.53-34.74-5.35-6.84-11.7-11.15-19.05-12.93-7.36-1.78-19.2-2.67-35.52-2.67h-32.41v98.11h24.83c11.38,0,19.34-.98,23.88-2.93,4.54-1.95,7.53-4.91,8.97-8.88,1.44-3.97,2.16-11.7,2.16-23.19h8.1v80h-8.1c0-12.99-1.09-21.7-3.28-26.12-2.19-4.42-5.38-7.3-9.57-8.62-4.2-1.32-11.29-1.98-21.29-1.98h-25.69v55.35c0,27.7,1.78,44,5.34,48.88,3.56,4.89,13.16,7.33,28.79,7.33h17.41c12.3,0,22.41-1.58,30.34-4.74,7.93-3.16,15.49-9.66,22.67-19.48,7.18-9.83,12.85-23.36,16.98-40.6Z"
          />
        </g>
        <g>
          <rect
            className="st13"
            x="476.44"
            y="41.46"
            width="2608.68"
            height="169.09"
          />
          <g>
            <path d="M1251.42,171.11c0,14.31-5.15,21.75-17.17,21.75h-17.36c-10.11,0-16.79-6.49-16.79-20.8v-20.03h17.75v23.66h16.03v-28.05l-26.14-22.52c-5.72-4.2-7.63-7.82-7.63-16.22v-21.56c0-13.17,5.15-18.51,17.17-18.51h16.41c13.36,0,17.74,5.53,17.74,20.03v18.7h-17.55v-21.56h-16.03v24.04l26.14,21.94c5.72,4.39,7.44,8.01,7.44,16.41v22.71Z" />
            <path d="M1275.46,86.01h-18.51v-17.17h54.95v17.17h-18.51v106.85h-17.94v-106.85Z" />
            <path d="M1347.77,166.91h-18.32l-2.48,25.95h-17.94l13.74-124.02h32.25l13.36,124.02h-18.13l-2.48-25.95ZM1331.17,150.12h15.07l-5.91-62.97h-3.05l-6.11,62.97Z" />
            <path d="M1409.58,104.52v-18.51h-16.98v89.68h17.36v-34.92h-7.44v-16.41h24.99v46.75c0,13.36-4.39,21.75-17.17,21.75h-18.89c-10.11,0-16.79-5.91-16.79-20.03v-86.24c0-12.4,5.15-17.74,16.98-17.74h18.13c14.5,0,17.74,6.3,17.74,20.03v15.65h-17.94Z" />
            <path d="M1438.77,68.84h43.12v17.17h-25.19v37.4h18.7v16.79h-18.7v35.49h25.19v17.17h-43.12v-124.02Z" />
            <path d="M1522.34,68.84h44.46v17.17h-26.52v40.07h20.23v16.79h-20.23v49.99h-17.94v-124.02Z" />
            <path d="M1573.28,172.25v-83.76c0-12.97,5.15-19.65,16.98-19.65h18.51c14.12,0,18.32,6.3,18.32,20.03v82.24c0,14.5-5.34,21.75-17.36,21.75h-19.65c-10.11,0-16.79-6.49-16.79-20.61ZM1609.34,175.69v-89.68h-18.13v89.68h18.13Z" />
            <path d="M1638.53,192.86v-124.02h36.25c11.45,0,16.03,5.72,16.03,19.84v45.41c0,8.59-2.48,13.93-8.2,16.22l11.26,42.55h-17.94l-10.49-40.64h-8.97v40.64h-17.94ZM1673.07,135.04v-49.04h-16.6v49.04h16.6Z" />
            <path d="M1768.27,192.86h-35.3v-124.02h35.49c12.21,0,16.6,6.49,16.6,19.84v29.57c0,5.72-1.91,9.92-5.72,12.02,4.58,2.29,6.49,7.06,6.49,14.88v28.43c0,10.5-4.96,19.27-17.55,19.27ZM1767.12,122.26v-36.63h-16.41v36.63h16.41ZM1768.08,176.07v-37.02h-17.36v37.02h17.36Z" />
            <path d="M1829.7,166.91h-18.32l-2.48,25.95h-17.93l13.74-124.02h32.25l13.36,124.02h-18.13l-2.48-25.95ZM1813.1,150.12h15.07l-5.91-62.97h-3.05l-6.1,62.97Z" />
            <path d="M1892.09,192.86l-12.21-54.57c-2.29-9.73-5.53-28.81-8.21-45.41.96,16.22,1.72,33.96,1.72,42.74v57.24h-15.45v-124.02h21.94l12.78,57.81c2.48,10.88,6.1,30.34,8.78,46.56-.76-15.46-1.72-33.01-1.72-42.93v-61.44h15.26v124.02h-22.9Z" />
            <path d="M1927,68.84h36.06c13.36,0,16.41,8.59,16.41,22.9v79.76c0,10.68-4.39,21.37-18.51,21.37h-33.96v-124.02ZM1961.73,175.69v-89.68h-16.79v89.68h16.79Z" />
            <path d="M2056.55,166.91h-18.32l-2.48,25.95h-17.93l13.74-124.02h32.25l13.36,124.02h-18.13l-2.48-25.95ZM2039.95,150.12h15.07l-5.91-62.97h-3.05l-6.1,62.97Z" />
            <path d="M2118.94,192.86l-12.21-54.57c-2.29-9.73-5.53-28.81-8.21-45.41.96,16.22,1.72,33.96,1.72,42.74v57.24h-15.45v-124.02h21.94l12.78,57.81c2.48,10.88,6.1,30.34,8.78,46.56-.76-15.46-1.72-33.01-1.72-42.93v-61.44h15.26v124.02h-22.9Z" />
            <path d="M2153.85,68.84h36.06c13.36,0,16.41,8.59,16.41,22.9v79.76c0,10.68-4.39,21.37-18.51,21.37h-33.96v-124.02ZM2188.58,175.69v-89.68h-16.79v89.68h16.79Z" />
            <path d="M2248.87,68.84h36.06c13.36,0,16.41,8.59,16.41,22.9v79.76c0,10.68-4.39,21.37-18.51,21.37h-33.96v-124.02ZM2283.59,175.69v-89.68h-16.79v89.68h16.79Z" />
            <path d="M2361.06,68.84v102.27c0,14.5-5.53,21.75-17.55,21.75h-15.84c-9.92,0-16.79-6.49-16.79-20.61v-24.99h17.74v28.43h14.5v-106.85h17.94Z" />
          </g>
        </g>
        <g>
          <rect
            className="st1"
            x="3313.99"
            y="220.29"
            width="133.84"
            height="518.33"
          />
          <g>
            <path d="M3350.09,451.16v-18.87h66.28v18.97c0,6.53-3.47,8.87-10.61,8.87h-15.81c-3.06,0-5.3-1.02-6.42-3.06-1.22,2.45-3.77,3.47-7.95,3.47h-15.19c-5.61,0-10.3-2.65-10.3-9.38ZM3359.07,451.05h19.78v-9.28h-19.78v9.28ZM3387.82,450.54h19.58v-8.77h-19.58v8.77Z" />
            <path d="M3363.96,483.99v-9.79l-13.87-1.33v-9.58l66.28,7.34v17.23l-66.28,7.14v-9.69l13.87-1.33ZM3372.93,475.12v8.06l33.65-3.16v-1.63l-33.65-3.26Z" />
            <path d="M3350.09,499.08h66.28v19.38c0,6.12-3.06,8.57-10.61,8.57h-24.27c-4.59,0-7.44-1.33-8.67-4.38l-22.74,6.02v-9.58l21.72-5.61v-4.79h-21.72v-9.59ZM3380.99,517.54h26.21v-8.87h-26.21v8.87Z" />
          </g>
        </g>
        <g>
          <rect
            className="st14"
            x="3313.99"
            y="849.8"
            width="133.84"
            height="1017.93"
          />
          <g>
            <path d="M3416.38,1183.69v23.76h-9.18v-14.17h-21.41v10.81h-8.97v-10.81h-26.72v-9.58h66.28Z" />
            <path d="M3361.11,1210.92h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.85-11.62-9.28v-10.5c0-5.41,3.47-8.97,11.01-8.97ZM3359.27,1230.19h47.93v-9.69h-47.93v9.69Z" />
            <path d="M3361.11,1245.59h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.86-11.62-9.28v-10.5c0-5.4,3.47-8.97,11.01-8.97ZM3359.27,1264.86h47.93v-9.69h-47.93v9.69Z" />
            <path d="M3416.38,1280.46v19.27c0,7.14-4.59,8.77-12.24,8.77h-42.63c-5.71,0-11.42-2.35-11.42-9.89v-18.15h66.28ZM3359.27,1299.02h47.93v-8.97h-47.93v8.97Z" />
            <path d="M3361.72,1358.06c-7.65,0-11.62-2.75-11.62-9.18v-9.28c0-5.4,3.47-8.97,11.12-8.97h10.71v9.48h-12.64v8.57h14.99l12.03-13.97c2.24-3.06,4.18-4.08,8.67-4.08h11.52c7.04,0,9.89,2.75,9.89,9.18v8.77c0,7.14-2.96,9.48-10.71,9.48h-9.99v-9.38h11.52v-8.57h-12.85l-11.73,13.97c-2.35,3.06-4.28,3.98-8.77,3.98h-12.13Z" />
            <path d="M3407.2,1370.91v-9.89h9.18v29.37h-9.18v-9.89h-57.11v-9.58h57.11Z" />
            <path d="M3363.96,1409.55v-9.79l-13.87-1.33v-9.58l66.28,7.34v17.23l-66.28,7.14v-9.69l13.87-1.33ZM3372.93,1400.68v8.06l33.65-3.16v-1.63l-33.65-3.26Z" />
            <path d="M3407.2,1428.92v-9.89h9.18v29.37h-9.18v-9.89h-57.11v-9.58h57.11Z" />
            <path d="M3416.38,1452.27v9.69h-66.28v-9.69h66.28Z" />
            <path d="M3361.11,1468.38h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.86-11.62-9.28v-10.5c0-5.4,3.47-8.97,11.01-8.97ZM3359.27,1487.66h47.93v-9.69h-47.93v9.69Z" />
            <path d="M3350.09,1521.51l29.17-6.53c5.2-1.22,15.4-2.96,24.27-4.39-8.67.51-18.15.92-22.84.92h-30.59v-8.26h66.28v11.73l-30.9,6.83c-5.81,1.33-16.21,3.26-24.88,4.69,8.26-.41,17.64-.92,22.94-.92h32.84v8.16h-66.28v-12.24Z" />
          </g>
        </g>
        <g>
          <rect
            className="st1"
            x="124.97"
            y="220.29"
            width="133.84"
            height="518.33"
          />
          <g>
            <path d="M161.07,451.16v-18.87h66.28v18.97c0,6.53-3.47,8.87-10.61,8.87h-15.81c-3.06,0-5.3-1.02-6.42-3.06-1.22,2.45-3.77,3.47-7.95,3.47h-15.19c-5.61,0-10.3-2.65-10.3-9.38ZM170.05,451.05h19.78v-9.28h-19.78v9.28ZM198.8,450.54h19.58v-8.77h-19.58v8.77Z" />
            <path d="M174.94,483.99v-9.79l-13.87-1.33v-9.58l66.28,7.34v17.23l-66.28,7.14v-9.69l13.87-1.33ZM183.92,475.12v8.06l33.65-3.16v-1.63l-33.65-3.26Z" />
            <path d="M161.07,499.08h66.28v19.38c0,6.12-3.06,8.57-10.61,8.57h-24.27c-4.59,0-7.44-1.33-8.67-4.38l-22.74,6.02v-9.58l21.72-5.61v-4.79h-21.72v-9.59ZM191.97,517.54h26.21v-8.87h-26.21v8.87Z" />
          </g>
        </g>
        <g>
          <rect
            className="st14"
            x="124.97"
            y="849.8"
            width="133.84"
            height="1017.93"
          />
          <g>
            <path d="M227.36,1183.69v23.76h-9.18v-14.17h-21.41v10.81h-8.97v-10.81h-26.72v-9.58h66.28Z" />
            <path d="M172.09,1210.92h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.85-11.62-9.28v-10.5c0-5.41,3.47-8.97,11.01-8.97ZM170.25,1230.19h47.93v-9.69h-47.93v9.69Z" />
            <path d="M172.09,1245.59h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.86-11.62-9.28v-10.5c0-5.4,3.47-8.97,11.01-8.97ZM170.25,1264.86h47.93v-9.69h-47.93v9.69Z" />
            <path d="M227.36,1280.46v19.27c0,7.14-4.59,8.77-12.24,8.77h-42.63c-5.71,0-11.42-2.35-11.42-9.89v-18.15h66.28ZM170.25,1299.02h47.93v-8.97h-47.93v8.97Z" />
            <path d="M172.7,1358.06c-7.65,0-11.62-2.75-11.62-9.18v-9.28c0-5.4,3.47-8.97,11.12-8.97h10.71v9.48h-12.64v8.57h14.99l12.03-13.97c2.24-3.06,4.18-4.08,8.67-4.08h11.52c7.04,0,9.89,2.75,9.89,9.18v8.77c0,7.14-2.96,9.48-10.71,9.48h-9.99v-9.38h11.52v-8.57h-12.85l-11.73,13.97c-2.35,3.06-4.28,3.98-8.77,3.98h-12.13Z" />
            <path d="M218.18,1370.91v-9.89h9.18v29.37h-9.18v-9.89h-57.11v-9.58h57.11Z" />
            <path d="M174.94,1409.55v-9.79l-13.87-1.33v-9.58l66.28,7.34v17.23l-66.28,7.14v-9.69l13.87-1.33ZM183.92,1400.68v8.06l33.65-3.16v-1.63l-33.65-3.26Z" />
            <path d="M218.18,1428.92v-9.89h9.18v29.37h-9.18v-9.89h-57.11v-9.58h57.11Z" />
            <path d="M227.36,1452.27v9.69h-66.28v-9.69h66.28Z" />
            <path d="M172.09,1468.38h44.77c6.93,0,10.5,2.75,10.5,9.08v9.89c0,7.55-3.37,9.79-10.71,9.79h-43.95c-7.75,0-11.62-2.86-11.62-9.28v-10.5c0-5.4,3.47-8.97,11.01-8.97ZM170.25,1487.66h47.93v-9.69h-47.93v9.69Z" />
            <path d="M161.07,1521.51l29.17-6.53c5.2-1.22,15.4-2.96,24.27-4.39-8.67.51-18.15.92-22.84.92h-30.59v-8.26h66.28v11.73l-30.9,6.83c-5.81,1.33-16.21,3.26-24.88,4.69,8.26-.41,17.64-.92,22.94-.92h32.84v8.16h-66.28v-12.24Z" />
          </g>
        </g>
        <g>
          <g>
            <g>
              <polyline
                className="st8"
                points="2266.05 1217.92 2303.78 1261.31 2266.05 1304.7"
              />
              <line
                className="st7"
                x1="2236.65"
                y1="1338.51"
                x2="1833.25"
                y2="1802.4"
              />
              <polyline
                className="st8"
                points="1818.55 1819.31 1780.82 1862.7 1743.08 1819.31"
              />
              <line
                className="st9"
                x1="1713.68"
                y1="1785.5"
                x2="1310.21"
                y2="1321.6"
              />
              <polyline
                className="st8"
                points="1295.51 1304.7 1257.77 1261.31 1295.51 1217.92"
              />
              <line
                className="st9"
                x1="1324.91"
                y1="1184.12"
                x2="1728.38"
                y2="720.21"
              />
              <polyline
                className="st8"
                points="1743.08 703.31 1780.82 659.92 1818.55 703.31"
              />
              <line
                className="st7"
                x1="1847.95"
                y1="737.12"
                x2="2251.35"
                y2="1201.02"
              />
            </g>
            <polygon
              className="st4"
              points="2235.73 1261.31 1786.82 1790.51 1315.28 1261.31 1780.82 732.11 2235.73 1261.31"
            />
          </g>
          <g>
            <path d="M1612.58,1228.2h19.27c7.14,0,8.77,4.59,8.77,12.24v42.63c0,5.71-2.35,11.42-9.89,11.42h-18.15v-66.28ZM1631.14,1285.3v-47.93h-8.97v47.93h8.97Z" />
            <path d="M1664.69,1280.61h-9.79l-1.33,13.87h-9.59l7.34-66.28h17.23l7.14,66.28h-9.69l-1.33-13.87ZM1655.81,1271.64h8.06l-3.16-33.65h-1.63l-3.26,33.65Z" />
            <path d="M1698.03,1294.48l-6.53-29.17c-1.22-5.2-2.96-15.4-4.38-24.27.51,8.67.92,18.15.92,22.84v30.59h-8.26v-66.28h11.73l6.83,30.9c1.33,5.81,3.26,16.21,4.69,24.88-.41-8.26-.92-17.64-.92-22.94v-32.84h8.16v66.28h-12.24Z" />
            <path d="M1744.63,1269.9v12.95c0,7.14-2.24,11.62-9.38,11.62h-9.79c-5.4,0-8.97-3.16-8.97-10.71v-46.09c0-6.63,2.75-9.48,9.08-9.48h9.28c8.06,0,9.79,3.37,9.79,10.71v10.3h-9.48v-11.83h-9.08v47.93h9.08v-15.4h9.48Z" />
            <path d="M1750.03,1228.2h23.05v9.18h-13.46v19.99h9.99v8.97h-9.99v18.97h13.46v9.18h-23.05v-66.28Z" />
            <path d="M1794.69,1228.2h23.76v9.18h-14.17v21.41h10.81v8.97h-10.81v26.72h-9.59v-66.28Z" />
            <path d="M1822.12,1228.2h9.59v57.11h13.97v9.18h-23.56v-66.28Z" />
            <path d="M1849.86,1283.47v-44.77c0-6.93,2.75-10.5,9.08-10.5h9.89c7.55,0,9.79,3.37,9.79,10.71v43.95c0,7.75-2.86,11.62-9.28,11.62h-10.5c-5.4,0-8.97-3.47-8.97-11.01ZM1869.13,1285.3v-47.93h-9.69v47.93h9.69Z" />
            <path d="M1884.53,1283.47v-44.77c0-6.93,2.75-10.5,9.08-10.5h9.89c7.55,0,9.79,3.37,9.79,10.71v43.95c0,7.75-2.86,11.62-9.28,11.62h-10.5c-5.4,0-8.97-3.47-8.97-11.01ZM1903.8,1285.3v-47.93h-9.69v47.93h9.69Z" />
            <path d="M1919.4,1294.48v-66.28h19.38c6.12,0,8.57,3.06,8.57,10.61v24.27c0,4.59-1.33,7.44-4.38,8.67l6.02,22.74h-9.58l-5.61-21.72h-4.79v21.72h-9.59ZM1937.86,1263.58v-26.21h-8.87v26.21h8.87Z" />
          </g>
        </g>
        <g>
          <circle className="st3" cx="789.68" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M789.24,1961.56h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 1, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  1,
                  "General Admission - E1 S1",
                )
              }
            >
              <circle className="st3" cx="790.34" cy="1913.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  2,
                  "General Admission - E1 S2",
                )
              }
            >
              <circle className="st3" cx="753.43" cy="1924.95" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  3,
                  "General Admission - E1 S3",
                )
              }
            >
              <circle className="st3" cx="730.36" cy="1956.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  4,
                  "General Admission - E1 S4",
                )
              }
            >
              <circle className="st3" cx="729.95" cy="1994.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  5,
                  "General Admission - E1 S5",
                )
              }
            >
              <circle className="st3" cx="752.36" cy="2026.23" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  6,
                  "General Admission - E1 S6",
                )
              }
            >
              <circle className="st3" cx="789.03" cy="2038.57" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  7,
                  "General Admission - E1 S7",
                )
              }
            >
              <circle className="st3" cx="825.94" cy="2027" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  8,
                  "General Admission - E1 S8",
                )
              }
            >
              <circle className="st3" cx="849.01" cy="1995.95" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  9,
                  "General Admission - E1 S9",
                )
              }
            >
              <circle className="st3" cx="849.42" cy="1957.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - E", 1, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  1,
                  10,
                  "General Admission - E1 S10",
                )
              }
            >
              <circle className="st3" cx="827.01" cy="1925.73" r="8.72" />
            </g>
          </g>

        </g>
       
        <g>
          <circle className="st3" cx="1005.33" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M997.23,1989.56v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 2, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  1,
                  "General Admission - E2 S1",
                )
              }
            >
              <circle className="st3" cx="1005.99" cy="1913.39" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  2,
                  "General Admission - E2 S2",
                )
              }
            >
              <circle className="st3" cx="969.07" cy="1924.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  3,
                  "General Admission - E2 S3",
                )
              }
            >
              <circle className="st3" cx="946" cy="1956.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  4,
                  "General Admission - E2 S4",
                )
              }
            >
              <circle className="st3" cx="945.6" cy="1994.69" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  5,
                  "General Admission - E2 S5",
                )
              }
            >
              <circle className="st3" cx="968" cy="2026.23" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  6,
                  "General Admission - E2 S6",
                )
              }
            >
              <circle className="st3" cx="1004.67" cy="2038.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  7,
                  "General Admission - E2 S7",
                )
              }
            >
              <circle className="st3" cx="1041.59" cy="2027" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  8,
                  "General Admission - E2 S8",
                )
              }
            >
              <circle className="st3" cx="1064.65" cy="1995.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  9,
                  "General Admission - E2 S9",
                )
              }
            >
              <circle className="st3" cx="1065.06" cy="1957.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 2, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  2,
                  10,
                  "General Admission - E2 S10",
                )
              }
            >
              <circle className="st3" cx="1042.65" cy="1925.73" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="789.68" cy="2144.17" r="50.52" />
          <path
            className="st5"
            d="M798.05,2147.64v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM786.85,2147.64h3.48v-12.73l-3.48,12.73Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 4, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  1,
                  "General Admission - E4 S1",
                )
              }
            >
              <circle className="st3" cx="790.34" cy="2081.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  2,
                  "General Admission - E4 S2",
                )
              }
            >
              <circle className="st3" cx="753.43" cy="2093.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  3,
                  "General Admission - E4 S3",
                )
              }
            >
              <circle className="st3" cx="730.36" cy="2124.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  4,
                  "General Admission - E4 S4",
                )
              }
            >
              <circle className="st3" cx="729.95" cy="2162.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  5,
                  "General Admission - E4 S5",
                )
              }
            >
              <circle className="st3" cx="752.36" cy="2194.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  6,
                  "General Admission - E4 S6",
                )
              }
            >
              <circle className="st3" cx="789.03" cy="2206.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  7,
                  "General Admission - E4 S7",
                )
              }
            >
              <circle className="st3" cx="825.94" cy="2195.19" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  8,
                  "General Admission - E4 S8",
                )
              }
            >
              <circle className="st3" cx="849.01" cy="2164.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  9,
                  "General Admission - E4 S9",
                )
              }
            >
              <circle className="st3" cx="849.42" cy="2125.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 4, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  4,
                  10,
                  "General Admission - E4 S10",
                )
              }
            >
              <circle className="st3" cx="827.01" cy="2093.92" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1005.33" cy="2144.17" r="50.52" />
          <path
            className="st5"
            d="M1005.62,2158.17c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 5, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  1,
                  "General Admission - E5 S1",
                )
              }
            >
              <circle className="st3" cx="1005.99" cy="2081.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  2,
                  "General Admission - E5 S2",
                )
              }
            >
              <circle className="st3" cx="969.07" cy="2093.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  3,
                  "General Admission - E5 S3",
                )
              }
            >
              <circle className="st3" cx="946" cy="2124.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  4,
                  "General Admission - E5 S4",
                )
              }
            >
              <circle className="st3" cx="945.6" cy="2162.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  5,
                  "General Admission - E5 S5",
                )
              }
            >
              <circle className="st3" cx="968" cy="2194.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  6,
                  "General Admission - E5 S6",
                )
              }
            >
              <circle className="st3" cx="1004.67" cy="2206.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  7,
                  "General Admission - E5 S7",
                )
              }
            >
              <circle className="st3" cx="1041.59" cy="2195.19" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  8,
                  "General Admission - E5 S8",
                )
              }
            >
              <circle className="st3" cx="1064.65" cy="2164.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  9,
                  "General Admission - E5 S9",
                )
              }
            >
              <circle className="st3" cx="1065.06" cy="2125.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 5, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  5,
                  10,
                  "General Admission - E5 S10",
                )
              }
            >
              <circle className="st3" cx="1042.65" cy="2093.92" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1220.97" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M1220.57,1989.9c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 3, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  1,
                  "General Admission - E3 S1",
                )
              }
            >
              <circle className="st3" cx="1221.63" cy="1913.39" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  2,
                  "General Admission - E3 S2",
                )
              }
            >
              <circle className="st3" cx="1184.72" cy="1924.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  3,
                  "General Admission - E3 S3",
                )
              }
            >
              <circle className="st3" cx="1161.65" cy="1956.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  4,
                  "General Admission - E3 S4",
                )
              }
            >
              <circle className="st3" cx="1161.24" cy="1994.69" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  5,
                  "General Admission - E3 S5",
                )
              }
            >
              <circle className="st3" cx="1183.65" cy="2026.23" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  6,
                  "General Admission - E3 S6",
                )
              }
            >
              <circle className="st3" cx="1220.32" cy="2038.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  7,
                  "General Admission - E3 S7",
                )
              }
            >
              <circle className="st3" cx="1257.23" cy="2027" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  8,
                  "General Admission - E3 S8",
                )
              }
            >
              <circle className="st3" cx="1280.3" cy="1995.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  9,
                  "General Admission - E3 S9",
                )
              }
            >
              <circle className="st3" cx="1280.71" cy="1957.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 3, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  3,
                  10,
                  "General Admission - E3 S10",
                )
              }
            >
              <circle className="st3" cx="1258.3" cy="1925.73" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2331" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M2331.23,1989.93c-1.04,0-1.98-.09-2.81-.26s-1.54-.41-2.12-.69-1.08-.67-1.49-1.14-.75-.96-.99-1.47-.44-1.1-.58-1.8-.23-1.37-.28-2.02-.07-1.4-.07-2.24v-6.17c0-1.23,0-2.16.02-2.78s.07-1.47.18-2.54.26-1.9.47-2.47.52-1.23.93-1.98.91-1.3,1.5-1.67,1.35-.69,2.27-.97,1.97-.41,3.16-.41c.88,0,1.77.12,2.68.37s1.76.6,2.56,1.07,1.44,1.09,1.94,1.86.75,1.63.75,2.58v3.25h-6.49v-.62c0-.33,0-.62,0-.84s-.04-.51-.09-.83-.13-.59-.24-.8-.26-.38-.47-.54-.45-.23-.75-.23c-.35,0-.65.06-.9.17s-.43.24-.55.38-.22.33-.28.56-.1.42-.11.54,0,.3,0,.51v5.08l.11-.19c.07-.12.19-.26.35-.44.18-.18.39-.35.63-.52s.58-.32,1-.44.88-.18,1.37-.18c2.37,0,4.02.67,4.96,2s1.42,3.47,1.42,6.42c0,1.11-.06,2.1-.19,2.96s-.36,1.71-.7,2.56-.81,1.54-1.4,2.09-1.37,1-2.34,1.34-2.12.51-3.45.51ZM2329.46,1979.49v2.71c0,1.48.52,2.21,1.55,2.21.63,0,1.06-.29,1.28-.88.15-.4.23-1.17.23-2.32v-1.39c0-1.64-.47-2.46-1.42-2.46-1.09,0-1.63.71-1.63,2.13Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 6, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  1,
                  "General Admission - E6 S1",
                )
              }
            >
              <circle className="st3" cx="2331.65" cy="1913.39" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  2,
                  "General Admission - E6 S2",
                )
              }
            >
              <circle className="st3" cx="2294.74" cy="1924.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  3,
                  "General Admission - E6 S3",
                )
              }
            >
              <circle className="st3" cx="2271.67" cy="1956.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  4,
                  "General Admission - E6 S4",
                )
              }
            >
              <circle className="st3" cx="2271.26" cy="1994.69" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  5,
                  "General Admission - E6 S5",
                )
              }
            >
              <circle className="st3" cx="2293.67" cy="2026.23" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  6,
                  "General Admission - E6 S6",
                )
              }
            >
              <circle className="st3" cx="2330.34" cy="2038.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  7,
                  "General Admission - E6 S7",
                )
              }
            >
              <circle className="st3" cx="2367.25" cy="2027" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  8,
                  "General Admission - E6 S8",
                )
              }
            >
              <circle className="st3" cx="2390.32" cy="1995.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  9,
                  "General Admission - E6 S9",
                )
              }
            >
              <circle className="st3" cx="2390.73" cy="1957.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 6, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  6,
                  10,
                  "General Admission - E6 S10",
                )
              }
            >
              <circle className="st3" cx="2368.32" cy="1925.73" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2546.64" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M2540.22,1989.54c.12-1.41.31-2.78.58-4.12s.59-2.66.98-3.96.81-2.58,1.3-3.84,1-2.51,1.56-3.75c.4-.84.74-1.58,1.04-2.2s.54-1.16.75-1.62.38-.84.52-1.15.26-.58.35-.8.17-.41.22-.55.1-.28.13-.41h-8.74v-5.57h15.61v4.48c-.07.56-.22,1.15-.45,1.75s-.5,1.25-.82,1.93-.67,1.42-1.06,2.21-.79,1.63-1.19,2.55c-.4.95-.8,1.95-1.2,3.01s-.78,2.19-1.12,3.42-.65,2.55-.91,3.97-.44,2.98-.54,4.67h-7Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 7, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  1,
                  "General Admission - E7 S1",
                )
              }
            >
              <circle className="st3" cx="2547.3" cy="1913.39" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  2,
                  "General Admission - E7 S2",
                )
              }
            >
              <circle className="st3" cx="2510.38" cy="1924.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  3,
                  "General Admission - E7 S3",
                )
              }
            >
              <circle className="st3" cx="2487.31" cy="1956.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  4,
                  "General Admission - E7 S4",
                )
              }
            >
              <circle className="st3" cx="2486.91" cy="1994.69" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  5,
                  "General Admission - E7 S5",
                )
              }
            >
              <circle className="st3" cx="2509.32" cy="2026.23" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  6,
                  "General Admission - E7 S6",
                )
              }
            >
              <circle className="st3" cx="2545.98" cy="2038.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  7,
                  "General Admission - E7 S7",
                )
              }
            >
              <circle className="st3" cx="2582.9" cy="2027" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  8,
                  "General Admission - E7 S8",
                )
              }
            >
              <circle className="st3" cx="2605.97" cy="1995.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  9,
                  "General Admission - E7 S9",
                )
              }
            >
              <circle className="st3" cx="2606.37" cy="1957.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 7, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  7,
                  10,
                  "General Admission - E7 S10",
                )
              }
            >
              <circle className="st3" cx="2583.96" cy="1925.73" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2762.29" cy="2144.17" r="50.52" />
          <g>
            <path
              className="st5"
              d="M2752.41,2129.75h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st5"
              d="M2760.33,2149.28v-11.02c0-2.92.7-5.11,2.09-6.57s3.42-2.19,6.08-2.19,4.72.73,6.12,2.19,2.09,3.65,2.09,6.57v11.02c0,1.23-.16,2.35-.47,3.35s-.73,1.83-1.26,2.5-1.15,1.22-1.85,1.67-1.45.78-2.21.98-1.57.3-2.4.3-1.63-.1-2.4-.3-1.51-.52-2.21-.98-1.33-1.01-1.85-1.67-.95-1.49-1.26-2.5-.47-2.12-.47-3.35ZM2770.05,2149.89v-12.38c0-.3,0-.55,0-.73s-.04-.41-.1-.69-.14-.49-.24-.65-.25-.3-.45-.41-.45-.18-.74-.18-.54.06-.74.18-.35.25-.45.41-.18.38-.24.65-.09.5-.1.69,0,.42,0,.73v12.38c0,.66.16,1.16.48,1.52s.67.54,1.05.54.72-.18,1.05-.54.48-.86.48-1.52Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - E", 10, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  1,
                  "General Admission - E10 S1",
                )
              }
            >
              <circle className="st3" cx="2762.94" cy="2081.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  2,
                  "General Admission - E10 S2",
                )
              }
            >
              <circle className="st3" cx="2726.03" cy="2093.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  3,
                  "General Admission - E10 S3",
                )
              }
            >
              <circle className="st3" cx="2702.96" cy="2124.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  4,
                  "General Admission - E10 S4",
                )
              }
            >
              <circle className="st3" cx="2702.55" cy="2162.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  5,
                  "General Admission - E10 S5",
                )
              }
            >
              <circle className="st3" cx="2724.96" cy="2194.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  6,
                  "General Admission - E10 S6",
                )
              }
            >
              <circle className="st3" cx="2761.63" cy="2206.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  7,
                  "General Admission - E10 S7",
                )
              }
            >
              <circle className="st3" cx="2798.54" cy="2195.19" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  8,
                  "General Admission - E10 S8",
                )
              }
            >
              <circle className="st3" cx="2821.61" cy="2164.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  9,
                  "General Admission - E10 S9",
                )
              }
            >
              <circle className="st3" cx="2822.02" cy="2125.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 10, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  10,
                  10,
                  "General Admission - E10 S10",
                )
              }
            >
              <circle className="st3" cx="2799.61" cy="2093.92" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2546.64" cy="2144.17" r="50.52" />
          <path
            className="st5"
            d="M2546.6,2158.07c-1.05,0-2.08-.13-3.08-.38s-1.88-.64-2.65-1.17-1.39-1.19-1.86-2-.7-1.75-.7-2.86v-2.29h6.54l-.02,1.04c0,.23.04.45.12.66s.19.39.33.54.31.28.5.37.4.13.61.13c.19,0,.38-.04.57-.11s.37-.2.53-.36.28-.37.38-.61.14-.53.14-.87v-3.96c-.41.45-.93.79-1.55,1.02s-1.25.35-1.88.35c-.95,0-1.76-.11-2.44-.32s-1.25-.5-1.71-.88-.83-.82-1.1-1.34-.48-1.08-.62-1.71-.24-1.28-.28-1.99-.06-1.42-.06-2.16c0-.89.05-1.75.15-2.57s.27-1.59.52-2.31.57-1.38.98-1.97.91-1.1,1.53-1.51,1.34-.74,2.19-.98,1.82-.35,2.94-.35c1.63,0,2.97.24,4.02.72s1.88,1.16,2.48,2.03,1.02,1.92,1.25,3.13.34,2.55.34,4.02v5.91c0,.98-.02,1.98-.07,2.99s-.16,1.98-.33,2.93-.44,1.83-.78,2.66-.82,1.56-1.42,2.17-1.36,1.1-2.26,1.46-1.99.54-3.27.54ZM2545.03,2139.36c.01.43.03.84.06,1.21s.09.7.19.97.25.47.46.62.5.19.87.16c1.05,0,1.58-.88,1.58-2.65v-1.79c0-.89-.11-1.58-.33-2.08s-.62-.75-1.22-.75c-.34,0-.62.08-.83.24s-.38.36-.49.62-.2.54-.25.86-.07.64-.08.96,0,.62,0,.91.02.54.02.74Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 9, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  1,
                  "General Admission - E9 S1",
                )
              }
            >
              <circle className="st3" cx="2547.3" cy="2081.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  2,
                  "General Admission - E9 S2",
                )
              }
            >
              <circle className="st3" cx="2510.38" cy="2093.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  3,
                  "General Admission - E9 S3",
                )
              }
            >
              <circle className="st3" cx="2487.31" cy="2124.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  4,
                  "General Admission - E9 S4",
                )
              }
            >
              <circle className="st3" cx="2486.91" cy="2162.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  5,
                  "General Admission - E9 S5",
                )
              }
            >
              <circle className="st3" cx="2509.32" cy="2194.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  6,
                  "General Admission - E9 S6",
                )
              }
            >
              <circle className="st3" cx="2545.98" cy="2206.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  7,
                  "General Admission - E9 S7",
                )
              }
            >
              <circle className="st3" cx="2582.9" cy="2195.19" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  8,
                  "General Admission - E9 S8",
                )
              }
            >
              <circle className="st3" cx="2605.97" cy="2164.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  9,
                  "General Admission - E9 S9",
                )
              }
            >
              <circle className="st3" cx="2606.37" cy="2125.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 9, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  9,
                  10,
                  "General Admission - E9 S10",
                )
              }
            >
              <circle className="st3" cx="2583.96" cy="2093.92" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2762.29" cy="1975.98" r="50.52" />
          <path
            className="st5"
            d="M2762.29,1961.3c1.31,0,2.47.14,3.47.41s1.85.71,2.53,1.32,1.21,1.38,1.56,2.33.53,2.1.53,3.45c0,.43-.01.91-.04,1.43s-.12,1.03-.27,1.54-.42.97-.77,1.41-.87.78-1.54,1.04c.67.29,1.18.66,1.54,1.09s.62.93.78,1.5.26,1.2.29,1.89.04,1.44.04,2.25c0,1.55-.15,2.88-.44,4.01s-.77,2.05-1.42,2.78-1.49,1.27-2.52,1.62-2.28.53-3.74.53-2.71-.18-3.74-.53-1.87-.89-2.52-1.62-1.12-1.65-1.41-2.78-.44-2.46-.44-4.01c0-.81.01-1.56.04-2.25s.13-1.32.29-1.89.42-1.07.78-1.5.87-.8,1.54-1.09c-.67-.26-1.18-.6-1.54-1.04s-.62-.9-.77-1.41-.25-1.02-.27-1.54-.04-1-.04-1.43c0-1.35.18-2.5.53-3.45s.87-1.73,1.55-2.33,1.53-1.04,2.53-1.32,2.16-.41,3.47-.41ZM2762.29,1984.31c1.12,0,1.69-.99,1.69-2.97,0-.63,0-1.23-.03-1.79s-.08-1.05-.18-1.46-.27-.74-.5-.98-.55-.36-.97-.36-.75.12-.98.36-.39.57-.5.98-.17.9-.19,1.46-.03,1.16-.03,1.79c0,1.98.56,2.97,1.69,2.97ZM2762.29,1966.46c-.33,0-.6.09-.81.26s-.38.4-.5.66-.21.55-.25.86-.07.61-.07.89c0,1.91.54,2.87,1.63,2.87s1.63-.96,1.63-2.87c0-.28-.02-.58-.07-.89s-.13-.6-.26-.86-.29-.48-.5-.66-.48-.26-.81-.26Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - E", 8, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  1,
                  "General Admission - E8 S1",
                )
              }
            >
              <circle className="st3" cx="2762.94" cy="1913.39" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  2,
                  "General Admission - E8 S2",
                )
              }
            >
              <circle className="st3" cx="2726.03" cy="1924.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  3,
                  "General Admission - E8 S3",
                )
              }
            >
              <circle className="st3" cx="2702.96" cy="1956.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  4,
                  "General Admission - E8 S4",
                )
              }
            >
              <circle className="st3" cx="2702.55" cy="1994.69" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  5,
                  "General Admission - E8 S5",
                )
              }
            >
              <circle className="st3" cx="2724.96" cy="2026.23" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  6,
                  "General Admission - E8 S6",
                )
              }
            >
              <circle className="st3" cx="2761.63" cy="2038.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  7,
                  "General Admission - E8 S7",
                )
              }
            >
              <circle className="st3" cx="2798.54" cy="2027" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  8,
                  "General Admission - E8 S8",
                )
              }
            >
              <circle className="st3" cx="2821.61" cy="1995.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  9,
                  "General Admission - E8 S9",
                )
              }
            >
              <circle className="st3" cx="2822.02" cy="1957.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - E", 8, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - E",
                  8,
                  10,
                  "General Admission - E8 S10",
                )
              }
            >
              <circle className="st3" cx="2799.61" cy="1925.73" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <g>
            <circle className="st3" cx="1027.29" cy="317.21" r="50.99" />
            <path
              className="st12"
              d="M1026.85,301.3h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 1, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  1,
                  "General Admission - A1 S1",
                )
              }
            >
              <circle className="st3" cx="1027.95" cy="254.62" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  2,
                  "General Admission - A1 S2",
                )
              }
            >
              <circle className="st3" cx="991.03" cy="266.19" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  3,
                  "General Admission - A1 S3",
                )
              }
            >
              <circle className="st3" cx="967.97" cy="297.24" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  4,
                  "General Admission - A1 S4",
                )
              }
            >
              <circle className="st3" cx="967.56" cy="335.93" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  5,
                  "General Admission - A1 S5",
                )
              }
            >
              <circle className="st3" cx="989.97" cy="367.46" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  6,
                  "General Admission - A1 S6",
                )
              }
            >
              <circle className="st3" cx="1026.63" cy="379.81" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  7,
                  "General Admission - A1 S7",
                )
              }
            >
              <circle className="st3" cx="1063.55" cy="368.24" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  8,
                  "General Admission - A1 S8",
                )
              }
            >
              <circle className="st3" cx="1086.62" cy="337.18" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  9,
                  "General Admission - A1 S9",
                )
              }
            >
              <circle className="st3" cx="1087.03" cy="298.5" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 1, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  1,
                  10,
                  "General Admission - A1 S10",
                )
              }
            >
              <circle className="st3" cx="1064.62" cy="266.96" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="901.81" cy="427.12" r="50.99" />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 2, 1)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  1,
                  "General Admission - A2 S1",
                )
              }
            >
              <circle className="st3" cx="902.47" cy="364.52" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 2, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  2,
                  "General Admission - A2 S2",
                )
              }
            >
              <circle className="st3" cx="865.55" cy="376.09" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  3,
                  "General Admission - A2 S3",
                )
              }
            >
              <circle className="st3" cx="842.49" cy="407.15" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  4,
                  "General Admission - A2 S4",
                )
              }
            >
              <circle className="st3" cx="842.08" cy="445.83" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  5,
                  "General Admission - A2 S5",
                )
              }
            >
              <circle className="st3" cx="864.49" cy="477.37" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  6,
                  "General Admission - A2 S6",
                )
              }
            >
              <circle className="st3" cx="901.15" cy="489.71" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  7,
                  "General Admission - A2 S7",
                )
              }
            >
              <circle className="st3" cx="938.07" cy="478.14" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  8,
                  "General Admission - A2 S8",
                )
              }
            >
              <circle className="st3" cx="961.14" cy="447.09" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  9,
                  "General Admission - A2 S9",
                )
              }
            >
              <circle className="st3" cx="961.55" cy="408.4" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 2, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  2,
                  10,
                  "General Admission - A2 S10",
                )
              }
            >
              <circle className="st3" cx="939.14" cy="376.86" r="8.72" />
            </g>
          </g>
          <path
            className="st12"
            d="M893.72,439.2v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
          />
        </g>
        <g>
          <g>
            <circle className="st3" cx="1144.12" cy="427.12" r="50.99" />
            <path
              className="st12"
              d="M1143.71,439.54c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 3, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  1,
                  "General Admission - A3 S1",
                )
              }
            >
              <circle className="st3" cx="1144.78" cy="364.52" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  2,
                  "General Admission - A3 S2",
                )
              }
            >
              <circle className="st3" cx="1107.86" cy="376.09" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  3,
                  "General Admission - A3 S3",
                )
              }
            >
              <circle className="st3" cx="1084.79" cy="407.15" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  4,
                  "General Admission - A3 S4",
                )
              }
            >
              <circle className="st3" cx="1084.39" cy="445.83" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  5,
                  "General Admission - A3 S5",
                )
              }
            >
              <circle className="st3" cx="1106.79" cy="477.37" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  6,
                  "General Admission - A3 S6",
                )
              }
            >
              <circle className="st3" cx="1143.46" cy="489.71" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  7,
                  "General Admission - A3 S7",
                )
              }
            >
              <circle className="st3" cx="1180.38" cy="478.14" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  8,
                  "General Admission - A3 S8",
                )
              }
            >
              <circle className="st3" cx="1203.44" cy="447.09" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  9,
                  "General Admission - A3 S9",
                )
              }
            >
              <circle className="st3" cx="1203.85" cy="408.4" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 3, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  3,
                  10,
                  "General Admission - A3 S10",
                )
              }
            >
              <circle className="st3" cx="1181.44" cy="376.86" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="799.83" cy="543.08" r="50.99" />
          <path
            className="st12"
            d="M808.2,545.05v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM797,545.05h3.48v-12.73l-3.48,12.73Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 4, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  1,
                  "General Admission - A4 S1",
                )
              }
            >
              <circle className="st3" cx="800.49" cy="480.48" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  2,
                  "General Admission - A4 S2",
                )
              }
            >
              <circle className="st3" cx="763.58" cy="492.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  3,
                  "General Admission - A4 S3",
                )
              }
            >
              <circle className="st3" cx="740.51" cy="523.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  4,
                  "General Admission - A4 S4",
                )
              }
            >
              <circle className="st3" cx="740.1" cy="561.79" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  5,
                  "General Admission - A4 S5",
                )
              }
            >
              <circle className="st3" cx="762.51" cy="593.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  6,
                  "General Admission - A4 S6",
                )
              }
            >
              <circle className="st3" cx="799.18" cy="605.67" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  7,
                  "General Admission - A4 S7",
                )
              }
            >
              <circle className="st3" cx="836.09" cy="594.1" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  8,
                  "General Admission - A4 S8",
                )
              }
            >
              <circle className="st3" cx="859.16" cy="563.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  9,
                  "General Admission - A4 S9",
                )
              }
            >
              <circle className="st3" cx="859.57" cy="524.36" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 4, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  4,
                  10,
                  "General Admission - A4 S10",
                )
              }
            >
              <circle className="st3" cx="837.16" cy="492.83" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1027.29" cy="543.08" r="50.99" />
          <path
            className="st12"
            d="M1027.58,555.58c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 5, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  1,
                  "General Admission - A5 S1",
                )
              }
            >
              <circle className="st3" cx="1027.95" cy="480.48" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  2,
                  "General Admission - A5 S2",
                )
              }
            >
              <circle className="st3" cx="991.03" cy="492.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  3,
                  "General Admission - A5 S3",
                )
              }
            >
              <circle className="st3" cx="967.97" cy="523.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  4,
                  "General Admission - A5 S4",
                )
              }
            >
              <circle className="st3" cx="967.56" cy="561.79" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  5,
                  "General Admission - A5 S5",
                )
              }
            >
              <circle className="st3" cx="989.97" cy="593.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  6,
                  "General Admission - A5 S6",
                )
              }
            >
              <circle className="st3" cx="1026.63" cy="605.67" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  7,
                  "General Admission - A5 S7",
                )
              }
            >
              <circle className="st3" cx="1063.55" cy="594.1" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  8,
                  "General Admission - A5 S8",
                )
              }
            >
              <circle className="st3" cx="1086.62" cy="563.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  9,
                  "General Admission - A5 S9",
                )
              }
            >
              <circle className="st3" cx="1087.03" cy="524.36" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 5, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  5,
                  10,
                  "General Admission - A5 S10",
                )
              }
            >
              <circle className="st3" cx="1064.62" cy="492.83" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1254.75" cy="543.08" r="50.99" />
          <path
            className="st12"
            d="M1254.99,555.53c-1.04,0-1.98-.09-2.81-.26s-1.54-.41-2.12-.69-1.08-.67-1.49-1.14-.75-.96-.99-1.47-.44-1.1-.58-1.8-.23-1.37-.28-2.02-.07-1.4-.07-2.24v-6.17c0-1.23,0-2.16.02-2.78s.07-1.47.18-2.54.26-1.9.47-2.47.52-1.23.93-1.98.91-1.3,1.5-1.67,1.35-.69,2.27-.97,1.97-.41,3.16-.41c.88,0,1.77.12,2.68.37s1.76.6,2.56,1.07,1.44,1.09,1.94,1.86.75,1.63.75,2.58v3.25h-6.49v-.62c0-.33,0-.62,0-.84s-.04-.51-.09-.83-.13-.59-.24-.8c-.11-.21-.26-.38-.47-.54s-.45-.23-.75-.23c-.35,0-.65.06-.9.17-.25.11-.43.24-.55.38s-.22.33-.28.56-.1.42-.11.54,0,.3,0,.51v5.08l.11-.19c.07-.12.19-.26.35-.44.18-.18.39-.35.63-.52s.58-.32,1-.44.88-.18,1.37-.18c2.37,0,4.02.67,4.97,2s1.42,3.47,1.42,6.42c0,1.11-.06,2.1-.18,2.96s-.36,1.71-.7,2.56-.81,1.54-1.4,2.09-1.37,1-2.34,1.34-2.12.51-3.45.51ZM1253.21,545.09v2.71c0,1.48.52,2.21,1.55,2.21.63,0,1.06-.29,1.28-.88.15-.4.23-1.17.23-2.32v-1.39c0-1.64-.47-2.46-1.42-2.46-1.09,0-1.63.71-1.63,2.13Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 6, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  1,
                  "General Admission - A6 S1",
                )
              }
            >
              <circle className="st3" cx="1255.41" cy="480.48" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  2,
                  "General Admission - A6 S2",
                )
              }
            >
              <circle className="st3" cx="1218.49" cy="492.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  3,
                  "General Admission - A6 S3",
                )
              }
            >
              <circle className="st3" cx="1195.43" cy="523.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  4,
                  "General Admission - A6 S4",
                )
              }
            >
              <circle className="st3" cx="1195.02" cy="561.79" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  5,
                  "General Admission - A6 S5",
                )
              }
            >
              <circle className="st3" cx="1217.43" cy="593.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  6,
                  "General Admission - A6 S6",
                )
              }
            >
              <circle className="st3" cx="1254.09" cy="605.67" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  7,
                  "General Admission - A6 S7",
                )
              }
            >
              <circle className="st3" cx="1291.01" cy="594.1" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  8,
                  "General Admission - A6 S8",
                )
              }
            >
              <circle className="st3" cx="1314.08" cy="563.05" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  9,
                  "General Admission - A6 S9",
                )
              }
            >
              <circle className="st3" cx="1314.48" cy="524.36" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 6, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  6,
                  10,
                  "General Admission - A6 S10",
                )
              }
            >
              <circle className="st3" cx="1292.07" cy="492.83" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="702.64" cy="659.92" r="50.99" />
          <path
            className="st12"
            d="M696.22,671.99c.12-1.41.31-2.78.58-4.12s.59-2.66.98-3.96.81-2.58,1.3-3.84,1-2.51,1.56-3.75c.4-.84.74-1.58,1.04-2.2s.54-1.16.75-1.62.38-.84.52-1.15.26-.58.35-.8.17-.41.22-.55.1-.28.13-.41h-8.74v-5.57h15.61v4.48c-.07.56-.22,1.15-.45,1.75s-.5,1.25-.82,1.93-.67,1.42-1.06,2.21-.79,1.63-1.19,2.55c-.4.95-.8,1.95-1.2,3.01s-.78,2.19-1.12,3.42-.65,2.55-.91,3.97-.44,2.98-.54,4.67h-7Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 7, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  1,
                  "General Admission - A7 S1",
                )
              }
            >
              <circle className="st3" cx="703.3" cy="597.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  2,
                  "General Admission - A7 S2",
                )
              }
            >
              <circle className="st3" cx="666.38" cy="608.9" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  3,
                  "General Admission - A7 S3",
                )
              }
            >
              <circle className="st3" cx="643.31" cy="639.96" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  4,
                  "General Admission - A7 S4",
                )
              }
            >
              <circle className="st3" cx="642.91" cy="678.64" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  5,
                  "General Admission - A7 S5",
                )
              }
            >
              <circle className="st3" cx="665.32" cy="710.18" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  6,
                  "General Admission - A7 S6",
                )
              }
            >
              <circle className="st3" cx="701.98" cy="722.52" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  7,
                  "General Admission - A7 S7",
                )
              }
            >
              <circle className="st3" cx="738.9" cy="710.95" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  8,
                  "General Admission - A7 S8",
                )
              }
            >
              <circle className="st3" cx="761.97" cy="679.89" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  9,
                  "General Admission - A7 S9",
                )
              }
            >
              <circle className="st3" cx="762.37" cy="641.21" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 7, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  7,
                  10,
                  "General Admission - A7 S10",
                )
              }
            >
              <circle className="st3" cx="739.96" cy="609.67" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="918.98" cy="659.92" r="50.99" />
          <path
            className="st12"
            d="M918.98,643.74c1.31,0,2.47.14,3.47.41s1.85.71,2.53,1.32,1.2,1.38,1.56,2.33.53,2.1.53,3.45c0,.43-.01.91-.04,1.43s-.11,1.03-.27,1.54-.42.97-.77,1.41-.87.78-1.54,1.04c.67.29,1.18.66,1.54,1.09s.62.93.78,1.5.26,1.2.29,1.89.04,1.44.04,2.25c0,1.55-.15,2.88-.44,4.01s-.76,2.05-1.42,2.78-1.49,1.27-2.52,1.62-2.28.53-3.74.53-2.71-.18-3.74-.53-1.87-.89-2.52-1.62-1.12-1.65-1.42-2.78-.44-2.46-.44-4.01c0-.81.01-1.56.04-2.25s.13-1.32.29-1.89.42-1.07.78-1.5.87-.8,1.54-1.09c-.67-.26-1.18-.6-1.54-1.04s-.62-.9-.77-1.41-.25-1.02-.27-1.54-.04-1-.04-1.43c0-1.35.18-2.5.53-3.45s.87-1.73,1.56-2.33,1.53-1.04,2.53-1.32,2.16-.41,3.47-.41ZM918.98,666.75c1.12,0,1.69-.99,1.69-2.97,0-.63,0-1.23-.03-1.79s-.08-1.05-.18-1.46-.27-.74-.5-.98-.55-.36-.98-.36-.75.12-.98.36-.4.57-.5.98-.17.9-.18,1.46-.03,1.16-.03,1.79c0,1.98.56,2.97,1.69,2.97ZM918.98,648.91c-.33,0-.6.09-.81.26s-.38.4-.5.66-.21.55-.25.86-.07.61-.07.89c0,1.91.54,2.87,1.63,2.87s1.63-.96,1.63-2.87c0-.28-.02-.58-.07-.89s-.13-.6-.25-.86-.29-.48-.5-.66-.48-.26-.81-.26Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 8, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  1,
                  "General Admission - A8 S1",
                )
              }
            >
              <circle className="st3" cx="919.64" cy="597.33" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  2,
                  "General Admission - A8 S2",
                )
              }
            >
              <circle className="st3" cx="882.73" cy="608.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  3,
                  "General Admission - A8 S3",
                )
              }
            >
              <circle className="st3" cx="859.66" cy="639.96" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  4,
                  "General Admission - A8 S4",
                )
              }
            >
              <circle className="st3" cx="859.25" cy="678.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  5,
                  "General Admission - A8 S5",
                )
              }
            >
              <circle className="st3" cx="881.66" cy="710.18" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  6,
                  "General Admission - A8 S6",
                )
              }
            >
              <circle className="st3" cx="918.33" cy="722.52" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  7,
                  "General Admission - A8 S7",
                )
              }
            >
              <circle className="st3" cx="955.24" cy="710.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  8,
                  "General Admission - A8 S8",
                )
              }
            >
              <circle className="st3" cx="978.31" cy="679.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  9,
                  "General Admission - A8 S9",
                )
              }
            >
              <circle className="st3" cx="978.72" cy="641.21" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 8, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  8,
                  10,
                  "General Admission - A8 S10",
                )
              }
            >
              <circle className="st3" cx="956.31" cy="609.67" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1135.33" cy="659.92" r="50.99" />
          <path
            className="st12"
            d="M1135.28,672.33c-1.05,0-2.08-.13-3.08-.38s-1.88-.64-2.65-1.17-1.39-1.19-1.86-2-.7-1.75-.7-2.86v-2.29h6.54l-.02,1.04c0,.23.04.45.12.66s.19.39.33.54.31.28.5.37.4.13.61.13c.19,0,.38-.04.57-.11s.37-.2.53-.36.28-.37.38-.61.14-.53.14-.87v-3.96c-.41.45-.93.79-1.55,1.02s-1.25.35-1.88.35c-.95,0-1.76-.11-2.44-.32s-1.25-.5-1.71-.88-.83-.82-1.1-1.34-.48-1.08-.62-1.71-.24-1.28-.28-1.99-.06-1.42-.06-2.16c0-.89.05-1.75.15-2.57s.27-1.59.52-2.31.57-1.38.98-1.97.91-1.1,1.53-1.51,1.34-.74,2.19-.98,1.82-.35,2.94-.35c1.63,0,2.97.24,4.02.72s1.88,1.16,2.48,2.03,1.02,1.92,1.25,3.13.34,2.55.34,4.02v5.91c0,.98-.02,1.98-.07,2.99s-.16,1.98-.33,2.93-.44,1.83-.78,2.66-.82,1.56-1.42,2.17-1.36,1.1-2.26,1.46-1.99.54-3.27.54ZM1133.72,653.62c.01.43.03.84.06,1.21s.09.7.19.97.25.47.46.62.5.19.87.16c1.05,0,1.58-.88,1.58-2.65v-1.79c0-.89-.11-1.58-.33-2.08s-.62-.75-1.22-.75c-.34,0-.62.08-.83.24s-.38.36-.49.62-.2.54-.25.86-.07.64-.08.96,0,.62,0,.91.02.54.02.74Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - A", 9, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  1,
                  "General Admission - A9 S1",
                )
              }
            >
              <circle className="st3" cx="1135.99" cy="597.33" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  2,
                  "General Admission - A9 S2",
                )
              }
            >
              <circle className="st3" cx="1099.07" cy="608.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  3,
                  "General Admission - A9 S3",
                )
              }
            >
              <circle className="st3" cx="1076" cy="639.96" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  4,
                  "General Admission - A9 S4",
                )
              }
            >
              <circle className="st3" cx="1075.6" cy="678.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  5,
                  "General Admission - A9 S5",
                )
              }
            >
              <circle className="st3" cx="1098" cy="710.18" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  6,
                  "General Admission - A9 S6",
                )
              }
            >
              <circle className="st3" cx="1134.67" cy="722.52" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  7,
                  "General Admission - A9 S7",
                )
              }
            >
              <circle className="st3" cx="1171.59" cy="710.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  8,
                  "General Admission - A9 S8",
                )
              }
            >
              <circle className="st3" cx="1194.65" cy="679.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  9,
                  "General Admission - A9 S9",
                )
              }
            >
              <circle className="st3" cx="1195.06" cy="641.21" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 9, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  9,
                  10,
                  "General Admission - A9 S10",
                )
              }
            >
              <circle className="st3" cx="1172.65" cy="609.67" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1347.35" cy="659.92" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1337.47,644.01h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1345.4,663.54v-11.02c0-2.92.7-5.11,2.09-6.57s3.42-2.19,6.08-2.19,4.72.73,6.12,2.19,2.09,3.65,2.09,6.57v11.02c0,1.23-.16,2.35-.47,3.35s-.73,1.83-1.26,2.5-1.15,1.22-1.85,1.67-1.45.78-2.21.98-1.57.3-2.4.3-1.63-.1-2.4-.3-1.51-.52-2.21-.98-1.33-1.01-1.85-1.67-.95-1.49-1.26-2.5-.47-2.12-.47-3.35ZM1355.12,664.15v-12.38c0-.3,0-.55,0-.73s-.04-.41-.1-.69-.14-.49-.24-.65-.25-.3-.45-.41-.45-.18-.74-.18-.54.06-.74.18-.35.25-.45.41-.18.38-.24.65-.09.5-.1.69,0,.42,0,.73v12.38c0,.66.16,1.16.48,1.52s.67.54,1.05.54.72-.18,1.05-.54.48-.86.48-1.52Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 10, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  1,
                  "General Admission - A10 S1",
                )
              }
            >
              <circle className="st3" cx="1348.01" cy="597.33" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  2,
                  "General Admission - A10 S2",
                )
              }
            >
              <circle className="st3" cx="1311.09" cy="608.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  3,
                  "General Admission - A10 S3",
                )
              }
            >
              <circle className="st3" cx="1288.02" cy="639.96" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  4,
                  "General Admission - A10 S4",
                )
              }
            >
              <circle className="st3" cx="1287.61" cy="678.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  5,
                  "General Admission - A10 S5",
                )
              }
            >
              <circle className="st3" cx="1310.02" cy="710.18" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  6,
                  "General Admission - A10 S6",
                )
              }
            >
              <circle className="st3" cx="1346.69" cy="722.52" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  7,
                  "General Admission - A10 S7",
                )
              }
            >
              <circle className="st3" cx="1383.6" cy="710.95" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  8,
                  "General Admission - A10 S8",
                )
              }
            >
              <circle className="st3" cx="1406.67" cy="679.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  9,
                  "General Admission - A10 S9",
                )
              }
            >
              <circle className="st3" cx="1407.08" cy="641.21" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - A", 10, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  10,
                  10,
                  "General Admission - A10 S10",
                )
              }
            >
              <circle className="st3" cx="1384.67" cy="609.67" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="804.37" cy="783.1" r="50.99" />
          <g>
            <path
              className="st12"
              d="M797.69,767.18h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M810.17,767.18h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 11, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  1,
                  "General Admission - A11 S1",
                )
              }
            >
              <circle className="st3" cx="805.03" cy="720.51" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  2,
                  "General Admission - A11 S2",
                )
              }
            >
              <circle className="st3" cx="768.11" cy="732.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  3,
                  "General Admission - A11 S3",
                )
              }
            >
              <circle className="st3" cx="745.04" cy="763.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  4,
                  "General Admission - A11 S4",
                )
              }
            >
              <circle className="st3" cx="744.64" cy="801.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  5,
                  "General Admission - A11 S5",
                )
              }
            >
              <circle className="st3" cx="767.05" cy="833.35" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  6,
                  "General Admission - A11 S6",
                )
              }
            >
              <circle className="st3" cx="803.71" cy="845.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  7,
                  "General Admission - A11 S7",
                )
              }
            >
              <circle className="st3" cx="840.63" cy="834.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  8,
                  "General Admission - A11 S8",
                )
              }
            >
              <circle className="st3" cx="863.7" cy="803.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  9,
                  "General Admission - A11 S9",
                )
              }
            >
              <circle className="st3" cx="864.1" cy="764.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 11, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  11,
                  10,
                  "General Admission - A11 S10",
                )
              }
            >
              <circle className="st3" cx="841.69" cy="732.85" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1027.29" cy="783.1" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1017.81,767.18h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26-.24.11-.7.25-1.37.42s-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1025.44,795.19v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 12, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  1,
                  "General Admission - A12 S1",
                )
              }
            >
              <circle className="st3" cx="1027.95" cy="720.51" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  2,
                  "General Admission - A12 S2",
                )
              }
            >
              <circle className="st3" cx="991.03" cy="732.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  3,
                  "General Admission - A12 S3",
                )
              }
            >
              <circle className="st3" cx="967.97" cy="763.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  4,
                  "General Admission - A12 S4",
                )
              }
            >
              <circle className="st3" cx="967.56" cy="801.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  5,
                  "General Admission - A12 S5",
                )
              }
            >
              <circle className="st3" cx="989.97" cy="833.35" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  6,
                  "General Admission - A12 S6",
                )
              }
            >
              <circle className="st3" cx="1026.63" cy="845.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  7,
                  "General Admission - A12 S7",
                )
              }
            >
              <circle className="st3" cx="1063.55" cy="834.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  8,
                  "General Admission - A12 S8",
                )
              }
            >
              <circle className="st3" cx="1086.62" cy="803.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  9,
                  "General Admission - A12 S9",
                )
              }
            >
              <circle className="st3" cx="1087.03" cy="764.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 12, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  12,
                  10,
                  "General Admission - A12 S10",
                )
              }
            >
              <circle className="st3" cx="1064.62" cy="732.85" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1241.91" cy="783.1" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1232.38,767.18h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1247.74,795.52c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 13, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  1,
                  "General Admission - A13 S1",
                )
              }
            >
              <circle className="st3" cx="1242.57" cy="720.51" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  2,
                  "General Admission - A13 S2",
                )
              }
            >
              <circle className="st3" cx="1205.65" cy="732.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  3,
                  "General Admission - A13 S3",
                )
              }
            >
              <circle className="st3" cx="1182.58" cy="763.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  4,
                  "General Admission - A13 S4",
                )
              }
            >
              <circle className="st3" cx="1182.17" cy="801.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  5,
                  "General Admission - A13 S5",
                )
              }
            >
              <circle className="st3" cx="1204.58" cy="833.35" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  6,
                  "General Admission - A13 S6",
                )
              }
            >
              <circle className="st3" cx="1241.25" cy="845.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  7,
                  "General Admission - A13 S7",
                )
              }
            >
              <circle className="st3" cx="1278.16" cy="834.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  8,
                  "General Admission - A13 S8",
                )
              }
            >
              <circle className="st3" cx="1301.23" cy="803.07" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  9,
                  "General Admission - A13 S9",
                )
              }
            >
              <circle className="st3" cx="1301.64" cy="764.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 13, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  13,
                  10,
                  "General Admission - A13 S10",
                )
              }
            >
              <circle className="st3" cx="1279.23" cy="732.85" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="918.98" cy="900.79" r="50.99" />
          <g>
            <path
              className="st12"
              d="M909.18,884.88h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M933.59,902.77v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM922.39,902.77h3.48v-12.73l-3.48,12.73Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 14, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  1,
                  "General Admission - A14 S1",
                )
              }
            >
              <circle className="st3" cx="919.64" cy="838.2" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  2,
                  "General Admission - A14 S2",
                )
              }
            >
              <circle className="st3" cx="882.73" cy="849.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  3,
                  "General Admission - A14 S3",
                )
              }
            >
              <circle className="st3" cx="859.66" cy="880.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  4,
                  "General Admission - A14 S4",
                )
              }
            >
              <circle className="st3" cx="859.25" cy="919.51" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  5,
                  "General Admission - A14 S5",
                )
              }
            >
              <circle className="st3" cx="881.66" cy="951.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  6,
                  "General Admission - A14 S6",
                )
              }
            >
              <circle className="st3" cx="918.33" cy="963.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  7,
                  "General Admission - A14 S7",
                )
              }
            >
              <circle className="st3" cx="955.24" cy="951.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  8,
                  "General Admission - A14 S8",
                )
              }
            >
              <circle className="st3" cx="978.31" cy="920.76" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  9,
                  "General Admission - A14 S9",
                )
              }
            >
              <circle className="st3" cx="978.72" cy="882.08" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 14, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  14,
                  10,
                  "General Admission - A14 S10",
                )
              }
            >
              <circle className="st3" cx="956.31" cy="850.54" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1135.33" cy="900.79" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1125.76,884.88h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1141.86,913.3c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - A", 15, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  1,
                  "General Admission - A15 S1",
                )
              }
            >
              <circle className="st3" cx="1135.99" cy="838.2" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  2,
                  "General Admission - A15 S2",
                )
              }
            >
              <circle className="st3" cx="1099.07" cy="849.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  3,
                  "General Admission - A15 S3",
                )
              }
            >
              <circle className="st3" cx="1076" cy="880.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  4,
                  "General Admission - A15 S4",
                )
              }
            >
              <circle className="st3" cx="1075.6" cy="919.51" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  5,
                  "General Admission - A15 S5",
                )
              }
            >
              <circle className="st3" cx="1098" cy="951.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  6,
                  "General Admission - A15 S6",
                )
              }
            >
              <circle className="st3" cx="1134.67" cy="963.39" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  7,
                  "General Admission - A15 S7",
                )
              }
            >
              <circle className="st3" cx="1171.59" cy="951.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  8,
                  "General Admission - A15 S8",
                )
              }
            >
              <circle className="st3" cx="1194.65" cy="920.76" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  9,
                  "General Admission - A15 S9",
                )
              }
            >
              <circle className="st3" cx="1195.06" cy="882.08" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - A", 15, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - A",
                  15,
                  10,
                  "General Admission - A15 S10",
                )
              }
            >
              <circle className="st3" cx="1172.65" cy="850.54" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <g>
            <circle className="st3" cx="2489.61" cy="317.15" r="50.99" />
            <path
              className="st12"
              d="M2489.17,301.23h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 1, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  1,
                  "General Admission - B1 S1",
                )
              }
            >
              <circle className="st3" cx="2490.27" cy="254.55" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  2,
                  "General Admission - B1 S2",
                )
              }
            >
              <circle className="st3" cx="2453.35" cy="266.12" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  3,
                  "General Admission - B1 S3",
                )
              }
            >
              <circle className="st3" cx="2430.28" cy="297.18" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  4,
                  "General Admission - B1 S4",
                )
              }
            >
              <circle className="st3" cx="2429.88" cy="335.86" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  5,
                  "General Admission - B1 S5",
                )
              }
            >
              <circle className="st3" cx="2452.29" cy="367.4" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  6,
                  "General Admission - B1 S6",
                )
              }
            >
              <circle className="st3" cx="2488.95" cy="379.74" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  7,
                  "General Admission - B1 S7",
                )
              }
            >
              <circle className="st3" cx="2525.87" cy="368.17" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  8,
                  "General Admission - B1 S8",
                )
              }
            >
              <circle className="st3" cx="2548.94" cy="337.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  9,
                  "General Admission - B1 S9",
                )
              }
            >
              <circle className="st3" cx="2549.34" cy="298.43" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 1, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  1,
                  10,
                  "General Admission - B1 S10",
                )
              }
            >
              <circle className="st3" cx="2526.93" cy="266.89" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2364.13" cy="427.05" r="50.99" />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 2, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  1,
                  "General Admission - B2 S1",
                )
              }
            >
              <circle className="st3" cx="2364.79" cy="364.46" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  2,
                  "General Admission - B2 S2",
                )
              }
            >
              <circle className="st3" cx="2327.87" cy="376.02" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  3,
                  "General Admission - B2 S3",
                )
              }
            >
              <circle className="st3" cx="2304.8" cy="407.08" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  4,
                  "General Admission - B2 S4",
                )
              }
            >
              <circle className="st3" cx="2304.4" cy="445.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  5,
                  "General Admission - B2 S5",
                )
              }
            >
              <circle className="st3" cx="2326.81" cy="477.3" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  6,
                  "General Admission - B2 S6",
                )
              }
            >
              <circle className="st3" cx="2363.47" cy="489.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  7,
                  "General Admission - B2 S7",
                )
              }
            >
              <circle className="st3" cx="2400.39" cy="478.07" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  8,
                  "General Admission - B2 S8",
                )
              }
            >
              <circle className="st3" cx="2423.46" cy="447.02" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  9,
                  "General Admission - B2 S9",
                )
              }
            >
              <circle className="st3" cx="2423.86" cy="408.33" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 2, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  2,
                  10,
                  "General Admission - B2 S10",
                )
              }
            >
              <circle className="st3" cx="2401.45" cy="376.8" r="8.72" />
            </g>
          </g>
          <path
            className="st12"
            d="M2356.04,439.13v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
          />
        </g>
        <g>
          <g>
            <circle className="st3" cx="2606.44" cy="427.05" r="50.99" />
            <path
              className="st12"
              d="M2606.03,439.47c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 3, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  1,
                  "General Admission - B3 S1",
                )
              }
            >
              <circle className="st3" cx="2607.1" cy="364.46" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  2,
                  "General Admission - B3 S2",
                )
              }
            >
              <circle className="st3" cx="2570.18" cy="376.02" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  3,
                  "General Admission - B3 S3",
                )
              }
            >
              <circle className="st3" cx="2547.11" cy="407.08" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  4,
                  "General Admission - B3 S4",
                )
              }
            >
              <circle className="st3" cx="2546.7" cy="445.76" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  5,
                  "General Admission - B3 S5",
                )
              }
            >
              <circle className="st3" cx="2569.11" cy="477.3" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  6,
                  "General Admission - B3 S6",
                )
              }
            >
              <circle className="st3" cx="2605.78" cy="489.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  7,
                  "General Admission - B3 S7",
                )
              }
            >
              <circle className="st3" cx="2642.69" cy="478.07" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  8,
                  "General Admission - B3 S8",
                )
              }
            >
              <circle className="st3" cx="2665.76" cy="447.02" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  9,
                  "General Admission - B3 S9",
                )
              }
            >
              <circle className="st3" cx="2666.17" cy="408.33" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 3, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  3,
                  10,
                  "General Admission - B3 S10",
                )
              }
            >
              <circle className="st3" cx="2643.76" cy="376.8" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2262.15" cy="543.01" r="50.99" />
          <path
            className="st12"
            d="M2270.52,544.99v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM2259.32,544.99h3.48v-12.73l-3.48,12.73Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 4, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  1,
                  "General Admission - B4 S1",
                )
              }
            >
              <circle className="st3" cx="2262.81" cy="480.42" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  2,
                  "General Admission - B4 S2",
                )
              }
            >
              <circle className="st3" cx="2225.89" cy="491.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  3,
                  "General Admission - B4 S3",
                )
              }
            >
              <circle className="st3" cx="2202.83" cy="523.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  4,
                  "General Admission - B4 S4",
                )
              }
            >
              <circle className="st3" cx="2202.42" cy="561.72" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  5,
                  "General Admission - B4 S5",
                )
              }
            >
              <circle className="st3" cx="2224.83" cy="593.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  6,
                  "General Admission - B4 S6",
                )
              }
            >
              <circle className="st3" cx="2261.49" cy="605.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  7,
                  "General Admission - B4 S7",
                )
              }
            >
              <circle className="st3" cx="2298.41" cy="594.03" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  8,
                  "General Admission - B4 S8",
                )
              }
            >
              <circle className="st3" cx="2321.48" cy="562.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  9,
                  "General Admission - B4 S9",
                )
              }
            >
              <circle className="st3" cx="2321.89" cy="524.29" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 4, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  4,
                  10,
                  "General Admission - B4 S10",
                )
              }
            >
              <circle className="st3" cx="2299.48" cy="492.76" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2489.61" cy="543.01" r="50.99" />
          <path
            className="st12"
            d="M2489.9,555.52c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 5, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  1,
                  "General Admission - B5 S1",
                )
              }
            >
              <circle className="st3" cx="2490.27" cy="480.42" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  2,
                  "General Admission - B5 S2",
                )
              }
            >
              <circle className="st3" cx="2453.35" cy="491.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  3,
                  "General Admission - B5 S3",
                )
              }
            >
              <circle className="st3" cx="2430.28" cy="523.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  4,
                  "General Admission - B5 S4",
                )
              }
            >
              <circle className="st3" cx="2429.88" cy="561.72" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  5,
                  "General Admission - B5 S5",
                )
              }
            >
              <circle className="st3" cx="2452.29" cy="593.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  6,
                  "General Admission - B5 S6",
                )
              }
            >
              <circle className="st3" cx="2488.95" cy="605.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  7,
                  "General Admission - B5 S7",
                )
              }
            >
              <circle className="st3" cx="2525.87" cy="594.03" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  8,
                  "General Admission - B5 S8",
                )
              }
            >
              <circle className="st3" cx="2548.94" cy="562.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  9,
                  "General Admission - B5 S9",
                )
              }
            >
              <circle className="st3" cx="2549.34" cy="524.29" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 5, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  5,
                  10,
                  "General Admission - B5 S10",
                )
              }
            >
              <circle className="st3" cx="2526.93" cy="492.76" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2717.07" cy="543.01" r="50.99" />
          <path
            className="st12"
            d="M2717.31,555.46c-1.04,0-1.98-.09-2.81-.26s-1.54-.41-2.12-.69-1.08-.67-1.49-1.14-.75-.96-.99-1.47-.44-1.1-.58-1.8-.23-1.37-.28-2.02-.07-1.4-.07-2.24v-6.17c0-1.23,0-2.16.02-2.78s.07-1.47.18-2.54.26-1.9.47-2.47.52-1.23.93-1.98.91-1.3,1.5-1.67,1.35-.69,2.27-.97,1.97-.41,3.16-.41c.88,0,1.77.12,2.68.37s1.76.6,2.56,1.07,1.44,1.09,1.94,1.86.75,1.63.75,2.58v3.25h-6.49v-.62c0-.33,0-.62,0-.84s-.04-.51-.09-.83-.13-.59-.24-.8c-.11-.21-.26-.38-.47-.54s-.45-.23-.75-.23c-.35,0-.65.06-.9.17-.25.11-.43.24-.55.38s-.22.33-.28.56-.1.42-.11.54,0,.3,0,.51v5.08l.11-.19c.07-.12.19-.26.35-.44.18-.18.39-.35.63-.52s.58-.32,1-.44.88-.18,1.37-.18c2.37,0,4.02.67,4.97,2s1.42,3.47,1.42,6.42c0,1.11-.06,2.1-.18,2.96s-.36,1.71-.7,2.56-.81,1.54-1.4,2.09-1.37,1-2.34,1.34-2.12.51-3.45.51ZM2715.53,545.02v2.71c0,1.48.52,2.21,1.55,2.21.63,0,1.06-.29,1.28-.88.15-.4.23-1.17.23-2.32v-1.39c0-1.64-.47-2.46-1.42-2.46-1.09,0-1.63.71-1.63,2.13Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 6, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  1,
                  "General Admission - B6 S1",
                )
              }
            >
              <circle className="st3" cx="2717.73" cy="480.42" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  2,
                  "General Admission - B6 S2",
                )
              }
            >
              <circle className="st3" cx="2680.81" cy="491.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  3,
                  "General Admission - B6 S3",
                )
              }
            >
              <circle className="st3" cx="2657.74" cy="523.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  4,
                  "General Admission - B6 S4",
                )
              }
            >
              <circle className="st3" cx="2657.34" cy="561.72" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  5,
                  "General Admission - B6 S5",
                )
              }
            >
              <circle className="st3" cx="2679.74" cy="593.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  6,
                  "General Admission - B6 S6",
                )
              }
            >
              <circle className="st3" cx="2716.41" cy="605.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  7,
                  "General Admission - B6 S7",
                )
              }
            >
              <circle className="st3" cx="2753.33" cy="594.03" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  8,
                  "General Admission - B6 S8",
                )
              }
            >
              <circle className="st3" cx="2776.39" cy="562.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  9,
                  "General Admission - B6 S9",
                )
              }
            >
              <circle className="st3" cx="2776.8" cy="524.29" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 6, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  6,
                  10,
                  "General Admission - B6 S10",
                )
              }
            >
              <circle className="st3" cx="2754.39" cy="492.76" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2164.96" cy="659.86" r="50.99" />
          <path
            className="st12"
            d="M2158.54,671.92c.12-1.41.31-2.78.58-4.12s.59-2.66.98-3.96.81-2.58,1.3-3.84,1-2.51,1.56-3.75c.4-.84.74-1.58,1.04-2.2s.54-1.16.75-1.62.38-.84.52-1.15.26-.58.35-.8.17-.41.22-.55.1-.28.13-.41h-8.74v-5.57h15.61v4.48c-.07.56-.22,1.15-.45,1.75s-.5,1.25-.82,1.93-.67,1.42-1.06,2.21-.79,1.63-1.19,2.55c-.4.95-.8,1.95-1.2,3.01s-.78,2.19-1.12,3.42-.65,2.55-.91,3.97-.44,2.98-.54,4.67h-7Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 7, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  1,
                  "General Admission - B7 S1",
                )
              }
            >
              <circle className="st3" cx="2165.62" cy="597.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  2,
                  "General Admission - B7 S2",
                )
              }
            >
              <circle className="st3" cx="2128.7" cy="608.83" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  3,
                  "General Admission - B7 S3",
                )
              }
            >
              <circle className="st3" cx="2105.63" cy="639.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  4,
                  "General Admission - B7 S4",
                )
              }
            >
              <circle className="st3" cx="2105.22" cy="678.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  5,
                  "General Admission - B7 S5",
                )
              }
            >
              <circle className="st3" cx="2127.63" cy="710.11" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  6,
                  "General Admission - B7 S6",
                )
              }
            >
              <circle className="st3" cx="2164.3" cy="722.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  7,
                  "General Admission - B7 S7",
                )
              }
            >
              <circle className="st3" cx="2201.22" cy="710.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  8,
                  "General Admission - B7 S8",
                )
              }
            >
              <circle className="st3" cx="2224.28" cy="679.82" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  9,
                  "General Admission - B7 S9",
                )
              }
            >
              <circle className="st3" cx="2224.69" cy="641.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 7, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  7,
                  10,
                  "General Admission - B7 S10",
                )
              }
            >
              <circle className="st3" cx="2202.28" cy="609.6" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2381.3" cy="659.86" r="50.99" />
          <path
            className="st12"
            d="M2381.3,643.68c1.31,0,2.47.14,3.47.41s1.85.71,2.53,1.32,1.2,1.38,1.56,2.33.53,2.1.53,3.45c0,.43-.01.91-.04,1.43s-.11,1.03-.27,1.54-.42.97-.77,1.41-.87.78-1.54,1.04c.67.29,1.18.66,1.54,1.09s.62.93.78,1.5.26,1.2.29,1.89.04,1.44.04,2.25c0,1.55-.15,2.88-.44,4.01s-.76,2.05-1.42,2.78-1.49,1.27-2.52,1.62-2.28.53-3.74.53-2.71-.18-3.74-.53-1.87-.89-2.52-1.62-1.12-1.65-1.42-2.78-.44-2.46-.44-4.01c0-.81.01-1.56.04-2.25s.13-1.32.29-1.89.42-1.07.78-1.5.87-.8,1.54-1.09c-.67-.26-1.18-.6-1.54-1.04s-.62-.9-.77-1.41-.25-1.02-.27-1.54-.04-1-.04-1.43c0-1.35.18-2.5.53-3.45s.87-1.73,1.56-2.33,1.53-1.04,2.53-1.32,2.16-.41,3.47-.41ZM2381.3,666.68c1.12,0,1.69-.99,1.69-2.97,0-.63,0-1.23-.03-1.79s-.08-1.05-.18-1.46-.27-.74-.5-.98-.55-.36-.98-.36-.75.12-.98.36-.4.57-.5.98-.17.9-.18,1.46-.03,1.16-.03,1.79c0,1.98.56,2.97,1.69,2.97ZM2381.3,648.84c-.33,0-.6.09-.81.26s-.38.4-.5.66-.21.55-.25.86-.07.61-.07.89c0,1.91.54,2.87,1.63,2.87s1.63-.96,1.63-2.87c0-.28-.02-.58-.07-.89s-.13-.6-.25-.86-.29-.48-.5-.66-.48-.26-.81-.26Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 8, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  1,
                  "General Admission - B8 S1",
                )
              }
            >
              <circle className="st3" cx="2381.96" cy="597.26" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  2,
                  "General Admission - B8 S2",
                )
              }
            >
              <circle className="st3" cx="2345.04" cy="608.83" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  3,
                  "General Admission - B8 S3",
                )
              }
            >
              <circle className="st3" cx="2321.98" cy="639.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  4,
                  "General Admission - B8 S4",
                )
              }
            >
              <circle className="st3" cx="2321.57" cy="678.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  5,
                  "General Admission - B8 S5",
                )
              }
            >
              <circle className="st3" cx="2343.98" cy="710.11" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  6,
                  "General Admission - B8 S6",
                )
              }
            >
              <circle className="st3" cx="2380.64" cy="722.45" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  7,
                  "General Admission - B8 S7",
                )
              }
            >
              <circle className="st3" cx="2417.56" cy="710.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  8,
                  "General Admission - B8 S8",
                )
              }
            >
              <circle className="st3" cx="2440.63" cy="679.82" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  9,
                  "General Admission - B8 S9",
                )
              }
            >
              <circle className="st3" cx="2441.03" cy="641.14" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - B", 8, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  8,
                  10,
                  "General Admission - B8 S10",
                )
              }
            >
              <circle className="st3" cx="2418.63" cy="609.6" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2597.65" cy="659.86" r="50.99" />
          <path
            className="st12"
            d="M2597.6,672.26c-1.05,0-2.08-.13-3.08-.38s-1.88-.64-2.65-1.17-1.39-1.19-1.86-2-.7-1.75-.7-2.86v-2.29h6.54l-.02,1.04c0,.23.04.45.12.66s.19.39.33.54.31.28.5.37.4.13.61.13c.19,0,.38-.04.57-.11s.37-.2.53-.36.28-.37.38-.61.14-.53.14-.87v-3.96c-.41.45-.93.79-1.55,1.02s-1.25.35-1.88.35c-.95,0-1.76-.11-2.44-.32s-1.25-.5-1.71-.88-.83-.82-1.1-1.34-.48-1.08-.62-1.71-.24-1.28-.28-1.99-.06-1.42-.06-2.16c0-.89.05-1.75.15-2.57s.27-1.59.52-2.31.57-1.38.98-1.97.91-1.1,1.53-1.51,1.34-.74,2.19-.98,1.82-.35,2.94-.35c1.63,0,2.97.24,4.02.72s1.88,1.16,2.48,2.03,1.02,1.92,1.25,3.13.34,2.55.34,4.02v5.91c0,.98-.02,1.98-.07,2.99s-.16,1.98-.33,2.93-.44,1.83-.78,2.66-.82,1.56-1.42,2.17-1.36,1.1-2.26,1.46-1.99.54-3.27.54ZM2596.04,653.55c.01.43.03.84.06,1.21s.09.7.19.97.25.47.46.62.5.19.87.16c1.05,0,1.58-.88,1.58-2.65v-1.79c0-.89-.11-1.58-.33-2.08s-.62-.75-1.22-.75c-.34,0-.62.08-.83.24s-.38.36-.49.62-.2.54-.25.86-.07.64-.08.96,0,.62,0,.91.02.54.02.74Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - B", 9, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  1,
                  "General Admission - B9 S1",
                )
              }
            >
              <circle className="st3" cx="2598.3" cy="597.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  2,
                  "General Admission - B9 S2",
                )
              }
            >
              <circle className="st3" cx="2561.39" cy="608.83" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  3,
                  "General Admission - B9 S3",
                )
              }
            >
              <circle className="st3" cx="2538.32" cy="639.89" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  4,
                  "General Admission - B9 S4",
                )
              }
            >
              <circle className="st3" cx="2537.91" cy="678.57" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  5,
                  "General Admission - B9 S5",
                )
              }
            >
              <circle className="st3" cx="2560.32" cy="710.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  6,
                  "General Admission - B9 S6",
                )
              }
            >
              <circle className="st3" cx="2596.99" cy="722.45" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  7,
                  "General Admission - B9 S7",
                )
              }
            >
              <circle className="st3" cx="2633.9" cy="710.88" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  8,
                  "General Admission - B9 S8",
                )
              }
            >
              <circle className="st3" cx="2656.97" cy="679.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  9,
                  "General Admission - B9 S9",
                )
              }
            >
              <circle className="st3" cx="2657.38" cy="641.14" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 9, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  9,
                  10,
                  "General Admission - B9 S10",
                )
              }
            >
              <circle className="st3" cx="2634.97" cy="609.6" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2809.66" cy="659.86" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2799.79,643.94h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2807.71,663.47v-11.02c0-2.92.7-5.11,2.09-6.57s3.42-2.19,6.08-2.19,4.72.73,6.12,2.19,2.09,3.65,2.09,6.57v11.02c0,1.23-.16,2.35-.47,3.35s-.73,1.83-1.26,2.5-1.15,1.22-1.85,1.67-1.45.78-2.21.98-1.57.3-2.4.3-1.63-.1-2.4-.3-1.51-.52-2.21-.98-1.33-1.01-1.85-1.67-.95-1.49-1.26-2.5-.47-2.12-.47-3.35ZM2817.43,664.08v-12.38c0-.3,0-.55,0-.73s-.04-.41-.1-.69-.14-.49-.24-.65-.25-.3-.45-.41-.45-.18-.74-.18-.54.06-.74.18-.35.25-.45.41-.18.38-.24.65-.09.5-.1.69,0,.42,0,.73v12.38c0,.66.16,1.16.48,1.52s.67.54,1.05.54.72-.18,1.05-.54.48-.86.48-1.52Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 10, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  1,
                  "General Admission - B10 S1",
                )
              }
            >
              <circle className="st3" cx="2810.32" cy="597.26" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  2,
                  "General Admission - B10 S2",
                )
              }
            >
              <circle className="st3" cx="2773.41" cy="608.83" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  3,
                  "General Admission - B10 S3",
                )
              }
            >
              <circle className="st3" cx="2750.34" cy="639.89" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  4,
                  "General Admission - B10 S4",
                )
              }
            >
              <circle className="st3" cx="2749.93" cy="678.57" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  5,
                  "General Admission - B10 S5",
                )
              }
            >
              <circle className="st3" cx="2772.34" cy="710.11" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  6,
                  "General Admission - B10 S6",
                )
              }
            >
              <circle className="st3" cx="2809.01" cy="722.45" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  7,
                  "General Admission - B10 S7",
                )
              }
            >
              <circle className="st3" cx="2845.92" cy="710.88" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  8,
                  "General Admission - B10 S8",
                )
              }
            >
              <circle className="st3" cx="2868.99" cy="679.82" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  9,
                  "General Admission - B10 S9",
                )
              }
            >
              <circle className="st3" cx="2869.4" cy="641.14" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 10, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  10,
                  10,
                  "General Admission - B10 S10",
                )
              }
            >
              <circle className="st3" cx="2846.99" cy="609.6" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2266.69" cy="783.03" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2260.01,767.12h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2272.49,767.12h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 11, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  1,
                  "General Admission - B11 S1",
                )
              }
            >
              <circle className="st3" cx="2267.35" cy="720.44" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  2,
                  "General Admission - B11 S2",
                )
              }
            >
              <circle className="st3" cx="2230.43" cy="732.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  3,
                  "General Admission - B11 S3",
                )
              }
            >
              <circle className="st3" cx="2207.36" cy="763.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  4,
                  "General Admission - B11 S4",
                )
              }
            >
              <circle className="st3" cx="2206.95" cy="801.75" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  5,
                  "General Admission - B11 S5",
                )
              }
            >
              <circle className="st3" cx="2229.36" cy="833.28" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  6,
                  "General Admission - B11 S6",
                )
              }
            >
              <circle className="st3" cx="2266.03" cy="845.63" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  7,
                  "General Admission - B11 S7",
                )
              }
            >
              <circle className="st3" cx="2302.95" cy="834.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  8,
                  "General Admission - B11 S8",
                )
              }
            >
              <circle className="st3" cx="2326.01" cy="803" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  9,
                  "General Admission - B11 S9",
                )
              }
            >
              <circle className="st3" cx="2326.42" cy="764.32" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 11, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  11,
                  10,
                  "General Admission - B11 S10",
                )
              }
            >
              <circle className="st3" cx="2304.01" cy="732.78" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2489.61" cy="783.03" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2480.13,767.12h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26-.24.11-.7.25-1.37.42s-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2487.76,795.12v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 12, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  1,
                  "General Admission - B12 S1",
                )
              }
            >
              <circle className="st3" cx="2490.27" cy="720.44" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  2,
                  "General Admission - B12 S2",
                )
              }
            >
              <circle className="st3" cx="2453.35" cy="732.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  3,
                  "General Admission - B12 S3",
                )
              }
            >
              <circle className="st3" cx="2430.28" cy="763.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  4,
                  "General Admission - B12 S4",
                )
              }
            >
              <circle className="st3" cx="2429.88" cy="801.75" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  5,
                  "General Admission - B12 S5",
                )
              }
            >
              <circle className="st3" cx="2452.29" cy="833.28" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  6,
                  "General Admission - B12 S6",
                )
              }
            >
              <circle className="st3" cx="2488.95" cy="845.63" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  7,
                  "General Admission - B12 S7",
                )
              }
            >
              <circle className="st3" cx="2525.87" cy="834.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  8,
                  "General Admission - B12 S8",
                )
              }
            >
              <circle className="st3" cx="2548.94" cy="803" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  9,
                  "General Admission - B12 S9",
                )
              }
            >
              <circle className="st3" cx="2549.34" cy="764.32" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 12, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  12,
                  10,
                  "General Admission - B12 S10",
                )
              }
            >
              <circle className="st3" cx="2526.93" cy="732.78" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2704.22" cy="783.03" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2694.7,767.12h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2710.06,795.45c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 13, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  1,
                  "General Admission - B13 S1",
                )
              }
            >
              <circle className="st3" cx="2704.88" cy="720.44" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  2,
                  "General Admission - B13 S2",
                )
              }
            >
              <circle className="st3" cx="2667.97" cy="732.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  3,
                  "General Admission - B13 S3",
                )
              }
            >
              <circle className="st3" cx="2644.9" cy="763.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  4,
                  "General Admission - B13 S4",
                )
              }
            >
              <circle className="st3" cx="2644.49" cy="801.75" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  5,
                  "General Admission - B13 S5",
                )
              }
            >
              <circle className="st3" cx="2666.9" cy="833.28" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  6,
                  "General Admission - B13 S6",
                )
              }
            >
              <circle className="st3" cx="2703.57" cy="845.63" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  7,
                  "General Admission - B13 S7",
                )
              }
            >
              <circle className="st3" cx="2740.48" cy="834.06" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  8,
                  "General Admission - B13 S8",
                )
              }
            >
              <circle className="st3" cx="2763.55" cy="803" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  9,
                  "General Admission - B13 S9",
                )
              }
            >
              <circle className="st3" cx="2763.96" cy="764.32" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 13, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  13,
                  10,
                  "General Admission - B13 S10",
                )
              }
            >
              <circle className="st3" cx="2741.55" cy="732.78" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2381.3" cy="900.72" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2371.49,884.81h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2395.91,902.7v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM2384.71,902.7h3.48v-12.73l-3.48,12.73Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 14, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  1,
                  "General Admission - B14 S1",
                )
              }
            >
              <circle className="st3" cx="2381.96" cy="838.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  2,
                  "General Admission - B14 S2",
                )
              }
            >
              <circle className="st3" cx="2345.04" cy="849.7" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  3,
                  "General Admission - B14 S3",
                )
              }
            >
              <circle className="st3" cx="2321.98" cy="880.76" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  4,
                  "General Admission - B14 S4",
                )
              }
            >
              <circle className="st3" cx="2321.57" cy="919.44" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  5,
                  "General Admission - B14 S5",
                )
              }
            >
              <circle className="st3" cx="2343.98" cy="950.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  6,
                  "General Admission - B14 S6",
                )
              }
            >
              <circle className="st3" cx="2380.64" cy="963.32" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  7,
                  "General Admission - B14 S7",
                )
              }
            >
              <circle className="st3" cx="2417.56" cy="951.75" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  8,
                  "General Admission - B14 S8",
                )
              }
            >
              <circle className="st3" cx="2440.63" cy="920.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  9,
                  "General Admission - B14 S9",
                )
              }
            >
              <circle className="st3" cx="2441.03" cy="882.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 14, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  14,
                  10,
                  "General Admission - B14 S10",
                )
              }
            >
              <circle className="st3" cx="2418.63" cy="850.47" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2597.65" cy="900.72" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2588.08,884.81h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2604.18,913.23c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - B", 15, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  1,
                  "General Admission - B15 S1",
                )
              }
            >
              <circle className="st3" cx="2598.3" cy="838.13" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  2,
                  "General Admission - B15 S2",
                )
              }
            >
              <circle className="st3" cx="2561.39" cy="849.7" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  3,
                  "General Admission - B15 S3",
                )
              }
            >
              <circle className="st3" cx="2538.32" cy="880.76" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  4,
                  "General Admission - B15 S4",
                )
              }
            >
              <circle className="st3" cx="2537.91" cy="919.44" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  5,
                  "General Admission - B15 S5",
                )
              }
            >
              <circle className="st3" cx="2560.32" cy="950.98" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  6,
                  "General Admission - B15 S6",
                )
              }
            >
              <circle className="st3" cx="2596.99" cy="963.32" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  7,
                  "General Admission - B15 S7",
                )
              }
            >
              <circle className="st3" cx="2633.9" cy="951.75" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  8,
                  "General Admission - B15 S8",
                )
              }
            >
              <circle className="st3" cx="2656.97" cy="920.69" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  9,
                  "General Admission - B15 S9",
                )
              }
            >
              <circle className="st3" cx="2657.38" cy="882.01" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - B", 15, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - B",
                  15,
                  10,
                  "General Admission - B15 S10",
                )
              }
            >
              <circle className="st3" cx="2634.97" cy="850.47" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <g>
            <circle className="st3" cx="2606.58" cy="1179.74" r="50.99" />
            <path
              className="st12"
              d="M2606.14,1163.82h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 1, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  1,
                  "General Admission - D1 S1",
                )
              }
            >
              <circle className="st3" cx="2607.24" cy="1117.15" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  2,
                  "General Admission - D1 S2",
                )
              }
            >
              <circle className="st3" cx="2570.32" cy="1128.72" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  3,
                  "General Admission - D1 S3",
                )
              }
            >
              <circle className="st3" cx="2547.25" cy="1159.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  4,
                  "General Admission - D1 S4",
                )
              }
            >
              <circle className="st3" cx="2546.85" cy="1198.46" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  5,
                  "General Admission - D1 S5",
                )
              }
            >
              <circle className="st3" cx="2569.26" cy="1229.99" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  6,
                  "General Admission - D1 S6",
                )
              }
            >
              <circle className="st3" cx="2605.92" cy="1242.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  7,
                  "General Admission - D1 S7",
                )
              }
            >
              <circle className="st3" cx="2642.84" cy="1230.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  8,
                  "General Admission - D1 S8",
                )
              }
            >
              <circle className="st3" cx="2665.91" cy="1199.71" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  9,
                  "General Admission - D1 S9",
                )
              }
            >
              <circle className="st3" cx="2666.31" cy="1161.03" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - D", 1, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  1,
                  10,
                  "General Admission - D1 S10",
                )
              }
            >
              <circle className="st3" cx="2643.9" cy="1129.49" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2481.1" cy="1289.64" r="50.99" />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 2, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  1,
                  "General Admission - D2 S1",
                )
              }
            >
              <circle className="st3" cx="2481.76" cy="1227.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  2,
                  "General Admission - D2 S2",
                )
              }
            >
              <circle className="st3" cx="2444.84" cy="1238.62" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  3,
                  "General Admission - D2 S3",
                )
              }
            >
              <circle className="st3" cx="2421.77" cy="1269.68" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  4,
                  "General Admission - D2 S4",
                )
              }
            >
              <circle className="st3" cx="2421.37" cy="1308.36" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  5,
                  "General Admission - D2 S5",
                )
              }
            >
              <circle className="st3" cx="2443.78" cy="1339.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  6,
                  "General Admission - D2 S6",
                )
              }
            >
              <circle className="st3" cx="2480.44" cy="1352.24" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  7,
                  "General Admission - D2 S7",
                )
              }
            >
              <circle className="st3" cx="2517.36" cy="1340.67" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  8,
                  "General Admission - D2 S8",
                )
              }
            >
              <circle className="st3" cx="2540.43" cy="1309.61" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  9,
                  "General Admission - D2 S9",
                )
              }
            >
              <circle className="st3" cx="2540.83" cy="1270.93" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 2, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  2,
                  10,
                  "General Admission - D2 S10",
                )
              }
            >
              <circle className="st3" cx="2518.42" cy="1239.39" r="8.72" />
            </g>
          </g>
          <path
            className="st12"
            d="M2473.01,1301.73v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
          />
        </g>
        <g>
          <g>
            <circle className="st3" cx="2723.41" cy="1289.64" r="50.99" />
            <path
              className="st12"
              d="M2723,1302.06c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 3, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  1,
                  "General Admission - D3 S1",
                )
              }
            >
              <circle className="st3" cx="2724.07" cy="1227.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  2,
                  "General Admission - D3 S2",
                )
              }
            >
              <circle className="st3" cx="2687.15" cy="1238.62" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  3,
                  "General Admission - D3 S3",
                )
              }
            >
              <circle className="st3" cx="2664.08" cy="1269.68" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  4,
                  "General Admission - D3 S4",
                )
              }
            >
              <circle className="st3" cx="2663.67" cy="1308.36" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  5,
                  "General Admission - D3 S5",
                )
              }
            >
              <circle className="st3" cx="2686.08" cy="1339.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  6,
                  "General Admission - D3 S6",
                )
              }
            >
              <circle className="st3" cx="2722.75" cy="1352.24" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  7,
                  "General Admission - D3 S7",
                )
              }
            >
              <circle className="st3" cx="2759.66" cy="1340.67" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  8,
                  "General Admission - D3 S8",
                )
              }
            >
              <circle className="st3" cx="2782.73" cy="1309.61" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  9,
                  "General Admission - D3 S9",
                )
              }
            >
              <circle className="st3" cx="2783.14" cy="1270.93" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 3, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  3,
                  10,
                  "General Admission - D3 S10",
                )
              }
            >
              <circle className="st3" cx="2760.73" cy="1239.39" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2379.12" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M2387.49,1407.58v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM2376.29,1407.58h3.48v-12.73l-3.48,12.73Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 4, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  1,
                  "General Admission - D4 S1",
                )
              }
            >
              <circle className="st3" cx="2379.78" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  2,
                  "General Admission - D4 S2",
                )
              }
            >
              <circle className="st3" cx="2342.86" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  3,
                  "General Admission - D4 S3",
                )
              }
            >
              <circle className="st3" cx="2319.8" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  4,
                  "General Admission - D4 S4",
                )
              }
            >
              <circle className="st3" cx="2319.39" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  5,
                  "General Admission - D4 S5",
                )
              }
            >
              <circle className="st3" cx="2341.8" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  6,
                  "General Admission - D4 S6",
                )
              }
            >
              <circle className="st3" cx="2378.46" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  7,
                  "General Admission - D4 S7",
                )
              }
            >
              <circle className="st3" cx="2415.38" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  8,
                  "General Admission - D4 S8",
                )
              }
            >
              <circle className="st3" cx="2438.45" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  9,
                  "General Admission - D4 S9",
                )
              }
            >
              <circle className="st3" cx="2438.86" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 4, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  4,
                  10,
                  "General Admission - D4 S10",
                )
              }
            >
              <circle className="st3" cx="2416.45" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2606.58" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M2606.87,1418.11c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 5, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  1,
                  "General Admission - D5 S1",
                )
              }
            >
              <circle className="st3" cx="2607.24" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  2,
                  "General Admission - D5 S2",
                )
              }
            >
              <circle className="st3" cx="2570.32" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  3,
                  "General Admission - D5 S3",
                )
              }
            >
              <circle className="st3" cx="2547.25" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  4,
                  "General Admission - D5 S4",
                )
              }
            >
              <circle className="st3" cx="2546.85" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  5,
                  "General Admission - D5 S5",
                )
              }
            >
              <circle className="st3" cx="2569.26" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  6,
                  "General Admission - D5 S6",
                )
              }
            >
              <circle className="st3" cx="2605.92" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  7,
                  "General Admission - D5 S7",
                )
              }
            >
              <circle className="st3" cx="2642.84" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  8,
                  "General Admission - D5 S8",
                )
              }
            >
              <circle className="st3" cx="2665.91" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  9,
                  "General Admission - D5 S9",
                )
              }
            >
              <circle className="st3" cx="2666.31" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 5, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  5,
                  10,
                  "General Admission - D5 S10",
                )
              }
            >
              <circle className="st3" cx="2643.9" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2834.04" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M2834.28,1418.06c-1.04,0-1.98-.09-2.81-.26s-1.54-.41-2.12-.69-1.08-.67-1.49-1.14-.75-.96-.99-1.47-.44-1.1-.58-1.8-.23-1.37-.28-2.02-.07-1.4-.07-2.24v-6.17c0-1.23,0-2.16.02-2.78s.07-1.47.18-2.54.26-1.9.47-2.47.52-1.23.93-1.98.91-1.3,1.5-1.67,1.35-.69,2.27-.97,1.97-.41,3.16-.41c.88,0,1.77.12,2.68.37s1.76.6,2.56,1.07,1.44,1.09,1.94,1.86.75,1.63.75,2.58v3.25h-6.49v-.62c0-.33,0-.62,0-.84s-.04-.51-.09-.83-.13-.59-.24-.8c-.11-.21-.26-.38-.47-.54s-.45-.23-.75-.23c-.35,0-.65.06-.9.17-.25.11-.43.24-.55.38s-.22.33-.28.56-.1.42-.11.54,0,.3,0,.51v5.08l.11-.19c.07-.12.19-.26.35-.44.18-.18.39-.35.63-.52s.58-.32,1-.44.88-.18,1.37-.18c2.37,0,4.02.67,4.97,2s1.42,3.47,1.42,6.42c0,1.11-.06,2.1-.18,2.96s-.36,1.71-.7,2.56-.81,1.54-1.4,2.09-1.37,1-2.34,1.34-2.12.51-3.45.51ZM2832.5,1407.62v2.71c0,1.48.52,2.21,1.55,2.21.63,0,1.06-.29,1.28-.88.15-.4.23-1.17.23-2.32v-1.39c0-1.64-.47-2.46-1.42-2.46-1.09,0-1.63.71-1.63,2.13Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 6, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  1,
                  "General Admission - D6 S1",
                )
              }
            >
              <circle className="st3" cx="2834.7" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  2,
                  "General Admission - D6 S2",
                )
              }
            >
              <circle className="st3" cx="2797.78" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  3,
                  "General Admission - D6 S3",
                )
              }
            >
              <circle className="st3" cx="2774.71" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  4,
                  "General Admission - D6 S4",
                )
              }
            >
              <circle className="st3" cx="2774.31" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  5,
                  "General Admission - D6 S5",
                )
              }
            >
              <circle className="st3" cx="2796.71" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  6,
                  "General Admission - D6 S6",
                )
              }
            >
              <circle className="st3" cx="2833.38" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  7,
                  "General Admission - D6 S7",
                )
              }
            >
              <circle className="st3" cx="2870.3" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  8,
                  "General Admission - D6 S8",
                )
              }
            >
              <circle className="st3" cx="2893.36" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  9,
                  "General Admission - D6 S9",
                )
              }
            >
              <circle className="st3" cx="2893.77" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 6, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  6,
                  10,
                  "General Admission - D6 S10",
                )
              }
            >
              <circle className="st3" cx="2871.36" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2281.93" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M2275.51,1534.52c.12-1.41.31-2.78.58-4.12s.59-2.66.98-3.96.81-2.58,1.3-3.84,1-2.51,1.56-3.75c.4-.84.74-1.58,1.04-2.2s.54-1.16.75-1.62.38-.84.52-1.15.26-.58.35-.8.17-.41.22-.55.1-.28.13-.41h-8.74v-5.57h15.61v4.48c-.07.56-.22,1.15-.45,1.75s-.5,1.25-.82,1.93-.67,1.42-1.06,2.21-.79,1.63-1.19,2.55c-.4.95-.8,1.95-1.2,3.01s-.78,2.19-1.12,3.42-.65,2.55-.91,3.97-.44,2.98-.54,4.67h-7Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 7, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  1,
                  "General Admission - D7 S1",
                )
              }
            >
              <circle className="st3" cx="2282.59" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  2,
                  "General Admission - D7 S2",
                )
              }
            >
              <circle className="st3" cx="2245.67" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  3,
                  "General Admission - D7 S3",
                )
              }
            >
              <circle className="st3" cx="2222.6" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  4,
                  "General Admission - D7 S4",
                )
              }
            >
              <circle className="st3" cx="2222.19" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  5,
                  "General Admission - D7 S5",
                )
              }
            >
              <circle className="st3" cx="2244.6" cy="1572.7" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  6,
                  "General Admission - D7 S6",
                )
              }
            >
              <circle className="st3" cx="2281.27" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  7,
                  "General Admission - D7 S7",
                )
              }
            >
              <circle className="st3" cx="2318.19" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  8,
                  "General Admission - D7 S8",
                )
              }
            >
              <circle className="st3" cx="2341.25" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  9,
                  "General Admission - D7 S9",
                )
              }
            >
              <circle className="st3" cx="2341.66" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 7, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  7,
                  10,
                  "General Admission - D7 S10",
                )
              }
            >
              <circle className="st3" cx="2319.25" cy="1472.2" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2498.27" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M2498.27,1506.27c1.31,0,2.47.14,3.47.41s1.85.71,2.53,1.32,1.2,1.38,1.56,2.33.53,2.1.53,3.45c0,.43-.01.91-.04,1.43s-.11,1.03-.27,1.54-.42.97-.77,1.41-.87.78-1.54,1.04c.67.29,1.18.66,1.54,1.09s.62.93.78,1.5.26,1.2.29,1.89.04,1.44.04,2.25c0,1.55-.15,2.88-.44,4.01s-.76,2.05-1.42,2.78-1.49,1.27-2.52,1.62-2.28.53-3.74.53-2.71-.18-3.74-.53-1.87-.89-2.52-1.62-1.12-1.65-1.42-2.78-.44-2.46-.44-4.01c0-.81.01-1.56.04-2.25s.13-1.32.29-1.89.42-1.07.78-1.5.87-.8,1.54-1.09c-.67-.26-1.18-.6-1.54-1.04s-.62-.9-.77-1.41-.25-1.02-.27-1.54-.04-1-.04-1.43c0-1.35.18-2.5.53-3.45s.87-1.73,1.56-2.33,1.53-1.04,2.53-1.32,2.16-.41,3.47-.41ZM2498.27,1529.28c1.12,0,1.69-.99,1.69-2.97,0-.63,0-1.23-.03-1.79s-.08-1.05-.18-1.46-.27-.74-.5-.98-.55-.36-.98-.36-.75.12-.98.36-.4.57-.5.98-.17.9-.18,1.46-.03,1.16-.03,1.79c0,1.98.56,2.97,1.69,2.97ZM2498.27,1511.44c-.33,0-.6.09-.81.26s-.38.4-.5.66-.21.55-.25.86-.07.61-.07.89c0,1.91.54,2.87,1.63,2.87s1.63-.96,1.63-2.87c0-.28-.02-.58-.07-.89s-.13-.6-.25-.86-.29-.48-.5-.66-.48-.26-.81-.26Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 8, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  1,
                  "General Admission - D8 S1",
                )
              }
            >
              <circle className="st3" cx="2498.93" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  2,
                  "General Admission - D8 S2",
                )
              }
            >
              <circle className="st3" cx="2462.01" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  3,
                  "General Admission - D8 S3",
                )
              }
            >
              <circle className="st3" cx="2438.95" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  4,
                  "General Admission - D8 S4",
                )
              }
            >
              <circle className="st3" cx="2438.54" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  5,
                  "General Admission - D8 S5",
                )
              }
            >
              <circle className="st3" cx="2460.95" cy="1572.70" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  6,
                  "General Admission - D8 S6",
                )
              }
            >
              <circle className="st3" cx="2497.61" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  7,
                  "General Admission - D8 S7",
                )
              }
            >
              <circle className="st3" cx="2534.53" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  8,
                  "General Admission - D8 S8",
                )
              }
            >
              <circle className="st3" cx="2557.60" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  9,
                  "General Admission - D8 S9",
                )
              }
            >
              <circle className="st3" cx="2558.00" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 8, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  8,
                  10,
                  "General Admission - D8 S10",
                )
              }
            >
              <circle className="st3" cx="2535.60" cy="1472.20" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2714.62" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M2714.57,1534.85c-1.05,0-2.08-.13-3.08-.38s-1.88-.64-2.65-1.17-1.39-1.19-1.86-2-.7-1.75-.7-2.86v-2.29h6.54l-.02,1.04c0,.23.04.45.12.66s.19.39.33.54.31.28.5.37.4.13.61.13c.19,0,.38-.04.57-.11s.37-.2.53-.36.28-.37.38-.61.14-.53.14-.87v-3.96c-.41.45-.93.79-1.55,1.02s-1.25.35-1.88.35c-.95,0-1.76-.11-2.44-.32s-1.25-.5-1.71-.88-.83-.82-1.1-1.34-.48-1.08-.62-1.71-.24-1.28-.28-1.99-.06-1.42-.06-2.16c0-.89.05-1.75.15-2.57s.27-1.59.52-2.31.57-1.38.98-1.97.91-1.1,1.53-1.51,1.34-.74,2.19-.98,1.82-.35,2.94-.35c1.63,0,2.97.24,4.02.72s1.88,1.16,2.48,2.03,1.02,1.92,1.25,3.13.34,2.55.34,4.02v5.91c0,.98-.02,1.98-.07,2.99s-.16,1.98-.33,2.93-.44,1.83-.78,2.66-.82,1.56-1.42,2.17-1.36,1.1-2.26,1.46-1.99.54-3.27.54ZM2713.01,1516.15c.01.43.03.84.06,1.21s.09.7.19.97.25.47.46.62.5.19.87.16c1.05,0,1.58-.88,1.58-2.65v-1.79c0-.89-.11-1.58-.33-2.08s-.62-.75-1.22-.75c-.34,0-.62.08-.83.24s-.38.36-.49.62-.2.54-.25.86-.07.64-.08.96,0,.62,0,.91.02.54.02.74Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - D", 9, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  1,
                  "General Admission - D9 S1",
                )
              }
            >
              <circle className="st3" cx="2715.28" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  2,
                  "General Admission - D9 S2",
                )
              }
            >
              <circle className="st3" cx="2678.36" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  3,
                  "General Admission - D9 S3",
                )
              }
            >
              <circle className="st3" cx="2655.29" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  4,
                  "General Admission - D9 S4",
                )
              }
            >
              <circle className="st3" cx="2654.88" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  5,
                  "General Admission - D9 S5",
                )
              }
            >
              <circle className="st3" cx="2677.29" cy="1572.70" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  6,
                  "General Admission - D9 S6",
                )
              }
            >
              <circle className="st3" cx="2713.96" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  7,
                  "General Admission - D9 S7",
                )
              }
            >
              <circle className="st3" cx="2750.87" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  8,
                  "General Admission - D9 S8",
                )
              }
            >
              <circle className="st3" cx="2773.94" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  9,
                  "General Admission - D9 S9",
                )
              }
            >
              <circle className="st3" cx="2774.35" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 9, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  9,
                  10,
                  "General Admission - D9 S10",
                )
              }
            >
              <circle className="st3" cx="2751.94" cy="1472.20" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2926.63" cy="1522.45" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2916.76,1506.54h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2924.68,1526.06v-11.02c0-2.92.7-5.11,2.09-6.57s3.42-2.19,6.08-2.19,4.72.73,6.12,2.19,2.09,3.65,2.09,6.57v11.02c0,1.23-.16,2.35-.47,3.35s-.73,1.83-1.26,2.5-1.15,1.22-1.85,1.67-1.45.78-2.21.98-1.57.3-2.4.3-1.63-.1-2.4-.3-1.51-.52-2.21-.98-1.33-1.01-1.85-1.67-.95-1.49-1.26-2.5-.47-2.12-.47-3.35ZM2934.4,1526.68v-12.38c0-.3,0-.55,0-.73s-.04-.41-.1-.69-.14-.49-.24-.65-.25-.3-.45-.41-.45-.18-.74-.18-.54.06-.74.18-.35.25-.45.41-.18.38-.24.65-.09.5-.1.69,0,.42,0,.73v12.38c0,.66.16,1.16.48,1.52s.67.54,1.05.54.72-.18,1.05-.54.48-.86.48-1.52Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 10, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  1,
                  "General Admission - D10 S1",
                )
              }
            >
              <circle className="st3" cx="2927.29" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  2,
                  "General Admission - D10 S2",
                )
              }
            >
              <circle className="st3" cx="2890.38" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  3,
                  "General Admission - D10 S3",
                )
              }
            >
              <circle className="st3" cx="2867.31" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  4,
                  "General Admission - D10 S4",
                )
              }
            >
              <circle className="st3" cx="2866.9" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  5,
                  "General Admission - D10 S5",
                )
              }
            >
              <circle className="st3" cx="2889.31" cy="1572.7" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  6,
                  "General Admission - D10 S6",
                )
              }
            >
              <circle className="st3" cx="2925.98" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  7,
                  "General Admission - D10 S7",
                )
              }
            >
              <circle className="st3" cx="2962.89" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  8,
                  "General Admission - D10 S8",
                )
              }
            >
              <circle className="st3" cx="2985.96" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  9,
                  "General Admission - D10 S9",
                )
              }
            >
              <circle className="st3" cx="2986.37" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 10, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  10,
                  10,
                  "General Admission - D10 S10",
                )
              }
            >
              <circle className="st3" cx="2963.96" cy="1472.2" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2383.66" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2376.98,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2389.46,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 11, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  1,
                  "General Admission - D11 S1",
                )
              }
            >
              <circle className="st3" cx="2384.32" cy="1583.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  2,
                  "General Admission - D11 S2",
                )
              }
            >
              <circle className="st3" cx="2347.4" cy="1594.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  3,
                  "General Admission - D11 S3",
                )
              }
            >
              <circle className="st3" cx="2324.33" cy="1625.66" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  4,
                  "General Admission - D11 S4",
                )
              }
            >
              <circle className="st3" cx="2323.92" cy="1664.34" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  5,
                  "General Admission - D11 S5",
                )
              }
            >
              <circle className="st3" cx="2346.33" cy="1695.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  6,
                  "General Admission - D11 S6",
                )
              }
            >
              <circle className="st3" cx="2383" cy="1708.22" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  7,
                  "General Admission - D11 S7",
                )
              }
            >
              <circle className="st3" cx="2419.92" cy="1696.65" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  8,
                  "General Admission - D11 S8",
                )
              }
            >
              <circle className="st3" cx="2442.98" cy="1665.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  9,
                  "General Admission - D11 S9",
                )
              }
            >
              <circle className="st3" cx="2443.39" cy="1626.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 11, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  11,
                  10,
                  "General Admission - D11 S10",
                )
              }
            >
              <circle className="st3" cx="2420.98" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2606.58" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2597.1,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26-.24.11-.7.25-1.37.42s-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2604.73,1657.71v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 12, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  1,
                  "General Admission - D12 S1",
                )
              }
            >
              <circle className="st3" cx="2607.24" cy="1583.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  2,
                  "General Admission - D12 S2",
                )
              }
            >
              <circle className="st3" cx="2570.32" cy="1594.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  3,
                  "General Admission - D12 S3",
                )
              }
            >
              <circle className="st3" cx="2547.25" cy="1625.66" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  4,
                  "General Admission - D12 S4",
                )
              }
            >
              <circle className="st3" cx="2546.85" cy="1664.34" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  5,
                  "General Admission - D12 S5",
                )
              }
            >
              <circle className="st3" cx="2569.26" cy="1695.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  6,
                  "General Admission - D12 S6",
                )
              }
            >
              <circle className="st3" cx="2605.92" cy="1708.22" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  7,
                  "General Admission - D12 S7",
                )
              }
            >
              <circle className="st3" cx="2642.84" cy="1696.65" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  8,
                  "General Admission - D12 S8",
                )
              }
            >
              <circle className="st3" cx="2665.91" cy="1665.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  9,
                  "General Admission - D12 S9",
                )
              }
            >
              <circle className="st3" cx="2666.31" cy="1626.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 12, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  12,
                  10,
                  "General Admission - D12 S10",
                )
              }
            >
              <circle className="st3" cx="2643.9" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2821.19" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2811.67,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2827.03,1658.05c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 13, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  1,
                  "General Admission - D13 S1",
                )
              }
            >
              <circle className="st3" cx="2821.85" cy="1583.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  2,
                  "General Admission - D13 S2",
                )
              }
            >
              <circle className="st3" cx="2784.94" cy="1594.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  3,
                  "General Admission - D13 S3",
                )
              }
            >
              <circle className="st3" cx="2761.87" cy="1625.66" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  4,
                  "General Admission - D13 S4",
                )
              }
            >
              <circle className="st3" cx="2761.46" cy="1664.34" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  5,
                  "General Admission - D13 S5",
                )
              }
            >
              <circle className="st3" cx="2783.87" cy="1695.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  6,
                  "General Admission - D13 S6",
                )
              }
            >
              <circle className="st3" cx="2820.54" cy="1708.22" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  7,
                  "General Admission - D13 S7",
                )
              }
            >
              <circle className="st3" cx="2857.45" cy="1696.65" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  8,
                  "General Admission - D13 S8",
                )
              }
            >
              <circle className="st3" cx="2880.52" cy="1665.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  9,
                  "General Admission - D13 S9",
                )
              }
            >
              <circle className="st3" cx="2880.93" cy="1626.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 13, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  13,
                  10,
                  "General Admission - D13 S10",
                )
              }
            >
              <circle className="st3" cx="2858.52" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2498.27" cy="1763.32" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2488.46,1747.4h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2512.88,1765.3v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM2501.68,1765.3h3.48v-12.73l-3.48,12.73Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 14, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  1,
                  "General Admission - D14 S1",
                )
              }
            >
              <circle className="st3" cx="2498.93" cy="1700.73" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  2,
                  "General Admission - D14 S2",
                )
              }
            >
              <circle className="st3" cx="2462.01" cy="1712.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  3,
                  "General Admission - D14 S3",
                )
              }
            >
              <circle className="st3" cx="2438.95" cy="1743.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  4,
                  "General Admission - D14 S4",
                )
              }
            >
              <circle className="st3" cx="2438.54" cy="1782.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  5,
                  "General Admission - D14 S5",
                )
              }
            >
              <circle className="st3" cx="2460.95" cy="1813.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  6,
                  "General Admission - D14 S6",
                )
              }
            >
              <circle className="st3" cx="2497.61" cy="1825.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  7,
                  "General Admission - D14 S7",
                )
              }
            >
              <circle className="st3" cx="2534.53" cy="1814.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  8,
                  "General Admission - D14 S8",
                )
              }
            >
              <circle className="st3" cx="2557.6" cy="1783.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  9,
                  "General Admission - D14 S9",
                )
              }
            >
              <circle className="st3" cx="2558" cy="1744.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 14, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  14,
                  10,
                  "General Admission - D14 S10",
                )
              }
            >
              <circle className="st3" cx="2535.6" cy="1713.07" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="2714.62" cy="1763.32" r="50.99" />
          <g>
            <path
              className="st12"
              d="M2705.05,1747.4h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M2721.15,1775.83c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - D", 15, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  1,
                  "General Admission - D15 S1",
                )
              }
            >
              <circle className="st3" cx="2715.28" cy="1700.73" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  2,
                  "General Admission - D15 S2",
                )
              }
            >
              <circle className="st3" cx="2678.36" cy="1712.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  3,
                  "General Admission - D15 S3",
                )
              }
            >
              <circle className="st3" cx="2655.29" cy="1743.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  4,
                  "General Admission - D15 S4",
                )
              }
            >
              <circle className="st3" cx="2654.88" cy="1782.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  5,
                  "General Admission - D15 S5",
                )
              }
            >
              <circle className="st3" cx="2677.29" cy="1813.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  6,
                  "General Admission - D15 S6",
                )
              }
            >
              <circle className="st3" cx="2713.96" cy="1825.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  7,
                  "General Admission - D15 S7",
                )
              }
            >
              <circle className="st3" cx="2750.87" cy="1814.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  8,
                  "General Admission - D15 S8",
                )
              }
            >
              <circle className="st3" cx="2773.94" cy="1783.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  9,
                  "General Admission - D15 S9",
                )
              }
            >
              <circle className="st3" cx="2774.35" cy="1744.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - D", 15, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - D",
                  15,
                  10,
                  "General Admission - D15 S10",
                )
              }
            >
              <circle className="st3" cx="2751.94" cy="1713.07" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <g>
            <circle className="st3" cx="911.26" cy="1179.74" r="50.99" />
            <path
              className="st12"
              d="M910.82,1163.82h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 1, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  1,
                  "General Admission - C1 S1",
                )
              }
            >
              <circle className="st3" cx="911.91" cy="1117.15" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  2,
                  "General Admission - C1 S2",
                )
              }
            >
              <circle className="st3" cx="875" cy="1128.72" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  3,
                  "General Admission - C1 S3",
                )
              }
            >
              <circle className="st3" cx="851.93" cy="1159.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  4,
                  "General Admission - C1 S4",
                )
              }
            >
              <circle className="st3" cx="851.52" cy="1198.46" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  5,
                  "General Admission - C1 S5",
                )
              }
            >
              <circle className="st3" cx="873.93" cy="1229.99" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  6,
                  "General Admission - C1 S6",
                )
              }
            >
              <circle className="st3" cx="910.6" cy="1242.33" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  7,
                  "General Admission - C1 S7",
                )
              }
            >
              <circle className="st3" cx="947.51" cy="1230.77" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  8,
                  "General Admission - C1 S8",
                )
              }
            >
              <circle className="st3" cx="970.58" cy="1199.71" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  9,
                  "General Admission - C1 S9",
                )
              }
            >
              <circle className="st3" cx="970.99" cy="1161.03" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 1, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  1,
                  10,
                  "General Admission - C1 S10",
                )
              }
            >
              <circle className="st3" cx="948.58" cy="1129.49" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="785.78" cy="1289.64" r="50.99" />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 2, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  1,
                  "General Admission - C2 S1",
                )
              }
            >
              <circle className="st3" cx="786.43" cy="1227.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  2,
                  "General Admission - C2 S2",
                )
              }
            >
              <circle className="st3" cx="749.52" cy="1238.62" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  3,
                  "General Admission - C2 S3",
                )
              }
            >
              <circle className="st3" cx="726.45" cy="1269.68" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  4,
                  "General Admission - C2 S4",
                )
              }
            >
              <circle className="st3" cx="726.04" cy="1308.36" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  5,
                  "General Admission - C2 S5",
                )
              }
            >
              <circle className="st3" cx="748.45" cy="1339.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  6,
                  "General Admission - C2 S6",
                )
              }
            >
              <circle className="st3" cx="785.12" cy="1352.24" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  7,
                  "General Admission - C2 S7",
                )
              }
            >
              <circle className="st3" cx="822.03" cy="1340.67" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  8,
                  "General Admission - C2 S8",
                )
              }
            >
              <circle className="st3" cx="845.1" cy="1309.61" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  9,
                  "General Admission - C2 S9",
                )
              }
            >
              <circle className="st3" cx="845.51" cy="1270.93" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 2, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  2,
                  10,
                  "General Admission - C2 S10",
                )
              }
            >
              <circle className="st3" cx="823.1" cy="1239.39" r="8.72" />
            </g>
          </g>
          <path
            className="st12"
            d="M777.68,1301.73v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
          />
        </g>
        <g>
          <g>
            <circle className="st3" cx="1028.08" cy="1289.64" r="50.99" />
            <path
              className="st12"
              d="M1027.68,1302.06c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 3, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  1,
                  "General Admission - C3 S1",
                )
              }
            >
              <circle className="st3" cx="1028.74" cy="1227.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  2,
                  "General Admission - C3 S2",
                )
              }
            >
              <circle className="st3" cx="991.82" cy="1238.62" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  3,
                  "General Admission - C3 S3",
                )
              }
            >
              <circle className="st3" cx="968.76" cy="1269.68" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  4,
                  "General Admission - C3 S4",
                )
              }
            >
              <circle className="st3" cx="968.35" cy="1308.36" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  5,
                  "General Admission - C3 S5",
                )
              }
            >
              <circle className="st3" cx="990.76" cy="1339.9" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  6,
                  "General Admission - C3 S6",
                )
              }
            >
              <circle className="st3" cx="1027.42" cy="1352.24" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  7,
                  "General Admission - C3 S7",
                )
              }
            >
              <circle className="st3" cx="1064.34" cy="1340.67" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  8,
                  "General Admission - C3 S8",
                )
              }
            >
              <circle className="st3" cx="1087.41" cy="1309.61" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  9,
                  "General Admission - C3 S9",
                )
              }
            >
              <circle className="st3" cx="1087.81" cy="1270.93" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 3, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  3,
                  10,
                  "General Admission - C3 S10",
                )
              }
            >
              <circle className="st3" cx="1065.41" cy="1239.39" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="683.8" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M692.16,1407.58v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM680.97,1407.58h3.48v-12.73l-3.48,12.73Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 4, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  1,
                  "General Admission - C4 S1",
                )
              }
            >
              <circle className="st3" cx="684.46" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  2,
                  "General Admission - C4 S2",
                )
              }
            >
              <circle className="st3" cx="647.54" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  3,
                  "General Admission - C4 S3",
                )
              }
            >
              <circle className="st3" cx="624.47" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  4,
                  "General Admission - C4 S4",
                )
              }
            >
              <circle className="st3" cx="624.06" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  5,
                  "General Admission - C4 S5",
                )
              }
            >
              <circle className="st3" cx="646.47" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  6,
                  "General Admission - C4 S6",
                )
              }
            >
              <circle className="st3" cx="683.14" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  7,
                  "General Admission - C4 S7",
                )
              }
            >
              <circle className="st3" cx="720.06" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  8,
                  "General Admission - C4 S8",
                )
              }
            >
              <circle className="st3" cx="743.12" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  9,
                  "General Admission - C4 S9",
                )
              }
            >
              <circle className="st3" cx="743.53" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 4, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  4,
                  10,
                  "General Admission - C4 S10",
                )
              }
            >
              <circle className="st3" cx="721.12" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="911.26" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M911.55,1418.11c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 5, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  1,
                  "General Admission - C5 S1",
                )
              }
            >
              <circle className="st3" cx="911.91" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  2,
                  "General Admission - C5 S2",
                )
              }
            >
              <circle className="st3" cx="875" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  3,
                  "General Admission - C5 S3",
                )
              }
            >
              <circle className="st3" cx="851.93" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  4,
                  "General Admission - C5 S4",
                )
              }
            >
              <circle className="st3" cx="851.52" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  5,
                  "General Admission - C5 S5",
                )
              }
            >
              <circle className="st3" cx="873.93" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  6,
                  "General Admission - C5 S6",
                )
              }
            >
              <circle className="st3" cx="910.6" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  7,
                  "General Admission - C5 S7",
                )
              }
            >
              <circle className="st3" cx="947.51" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  8,
                  "General Admission - C5 S8",
                )
              }
            >
              <circle className="st3" cx="970.58" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  9,
                  "General Admission - C5 S9",
                )
              }
            >
              <circle className="st3" cx="970.99" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 5, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  5,
                  10,
                  "General Admission - C5 S10",
                )
              }
            >
              <circle className="st3" cx="948.58" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1138.71" cy="1405.61" r="50.99" />
          <path
            className="st12"
            d="M1138.95,1418.06c-1.04,0-1.98-.09-2.81-.26s-1.54-.41-2.12-.69-1.08-.67-1.49-1.14-.75-.96-.99-1.47-.44-1.1-.58-1.8-.23-1.37-.28-2.02-.07-1.4-.07-2.24v-6.17c0-1.23,0-2.16.02-2.78s.07-1.47.18-2.54.26-1.9.47-2.47.52-1.23.93-1.98.91-1.3,1.5-1.67,1.35-.69,2.27-.97,1.97-.41,3.16-.41c.88,0,1.77.12,2.68.37s1.76.6,2.56,1.07,1.44,1.09,1.94,1.86.75,1.63.75,2.58v3.25h-6.49v-.62c0-.33,0-.62,0-.84s-.04-.51-.09-.83-.13-.59-.24-.8c-.11-.21-.26-.38-.47-.54s-.45-.23-.75-.23c-.35,0-.65.06-.9.17-.25.11-.43.24-.55.38s-.22.33-.28.56-.1.42-.11.54,0,.3,0,.51v5.08l.11-.19c.07-.12.19-.26.35-.44.18-.18.39-.35.63-.52s.58-.32,1-.44.88-.18,1.37-.18c2.37,0,4.02.67,4.97,2s1.42,3.47,1.42,6.42c0,1.11-.06,2.1-.18,2.96s-.36,1.71-.7,2.56-.81,1.54-1.4,2.09-1.37,1-2.34,1.34-2.12.51-3.45.51ZM1137.18,1407.62v2.71c0,1.48.52,2.21,1.55,2.21.63,0,1.06-.29,1.28-.88.15-.4.23-1.17.23-2.32v-1.39c0-1.64-.47-2.46-1.42-2.46-1.09,0-1.63.71-1.63,2.13Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 6, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  1,
                  "General Admission - C6 S1",
                )
              }
            >
              <circle className="st3" cx="1139.37" cy="1343.01" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  2,
                  "General Admission - C6 S2",
                )
              }
            >
              <circle className="st3" cx="1102.46" cy="1354.58" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  3,
                  "General Admission - C6 S3",
                )
              }
            >
              <circle className="st3" cx="1079.39" cy="1385.64" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  4,
                  "General Admission - C6 S4",
                )
              }
            >
              <circle className="st3" cx="1078.98" cy="1424.32" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  5,
                  "General Admission - C6 S5",
                )
              }
            >
              <circle className="st3" cx="1101.39" cy="1455.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  6,
                  "General Admission - C6 S6",
                )
              }
            >
              <circle className="st3" cx="1138.06" cy="1468.2" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  7,
                  "General Admission - C6 S7",
                )
              }
            >
              <circle className="st3" cx="1174.97" cy="1456.63" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  8,
                  "General Admission - C6 S8",
                )
              }
            >
              <circle className="st3" cx="1198.04" cy="1425.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  9,
                  "General Admission - C6 S9",
                )
              }
            >
              <circle className="st3" cx="1198.45" cy="1386.89" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 6, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  6,
                  10,
                  "General Admission - C6 S10",
                )
              }
            >
              <circle className="st3" cx="1176.04" cy="1355.35" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="586.6" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M580.19,1534.52c.12-1.41.31-2.78.58-4.12s.59-2.66.98-3.96.81-2.58,1.3-3.84,1-2.51,1.56-3.75c.4-.84.74-1.58,1.04-2.2s.54-1.16.75-1.62.38-.84.52-1.15.26-.58.35-.8.17-.41.22-.55.1-.28.13-.41h-8.74v-5.57h15.61v4.48c-.07.56-.22,1.15-.45,1.75s-.5,1.25-.82,1.93-.67,1.42-1.06,2.21-.79,1.63-1.19,2.55c-.4.95-.8,1.95-1.2,3.01s-.78,2.19-1.12,3.42-.65,2.55-.91,3.97-.44,2.98-.54,4.67h-7Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 7, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  1,
                  "General Admission - C7 S1",
                )
              }
            >
              <circle className="st3" cx="587.26" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  2,
                  "General Admission - C7 S2",
                )
              }
            >
              <circle className="st3" cx="550.34" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  3,
                  "General Admission - C7 S3",
                )
              }
            >
              <circle className="st3" cx="527.28" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  4,
                  "General Admission - C7 S4",
                )
              }
            >
              <circle className="st3" cx="526.87" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  5,
                  "General Admission - C7 S5",
                )
              }
            >
              <circle className="st3" cx="549.28" cy="1572.7" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  6,
                  "General Admission - C7 S6",
                )
              }
            >
              <circle className="st3" cx="585.94" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  7,
                  "General Admission - C7 S7",
                )
              }
            >
              <circle className="st3" cx="622.86" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  8,
                  "General Admission - C7 S8",
                )
              }
            >
              <circle className="st3" cx="645.93" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  9,
                  "General Admission - C7 S9",
                )
              }
            >
              <circle className="st3" cx="646.34" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 7, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  7,
                  10,
                  "General Admission - C7 S10",
                )
              }
            >
              <circle className="st3" cx="623.93" cy="1472.2" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="802.95" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M802.95,1506.27c1.31,0,2.47.14,3.47.41s1.85.71,2.53,1.32,1.2,1.38,1.56,2.33.53,2.1.53,3.45c0,.43-.01.91-.04,1.43s-.11,1.03-.27,1.54-.42.97-.77,1.41-.87.78-1.54,1.04c.67.29,1.18.66,1.54,1.09s.62.93.78,1.5.26,1.2.29,1.89.04,1.44.04,2.25c0,1.55-.15,2.88-.44,4.01s-.76,2.05-1.42,2.78-1.49,1.27-2.52,1.62-2.28.53-3.74.53-2.71-.18-3.74-.53-1.87-.89-2.52-1.62-1.12-1.65-1.42-2.78-.44-2.46-.44-4.01c0-.81.01-1.56.04-2.25s.13-1.32.29-1.89.42-1.07.78-1.5.87-.8,1.54-1.09c-.67-.26-1.18-.6-1.54-1.04s-.62-.9-.77-1.41-.25-1.02-.27-1.54-.04-1-.04-1.43c0-1.35.18-2.5.53-3.45s.87-1.73,1.56-2.33,1.53-1.04,2.53-1.32,2.16-.41,3.47-.41ZM802.95,1529.28c1.12,0,1.69-.99,1.69-2.97,0-.63,0-1.23-.03-1.79s-.08-1.05-.18-1.46-.27-.74-.5-.98-.55-.36-.98-.36-.75.12-.98.36-.4.57-.5.98-.17.9-.18,1.46-.03,1.16-.03,1.79c0,1.98.56,2.97,1.69,2.97ZM802.95,1511.44c-.33,0-.6.09-.81.26s-.38.4-.5.66-.21.55-.25.86-.07.61-.07.89c0,1.91.54,2.87,1.63,2.87s1.63-.96,1.63-2.87c0-.28-.02-.58-.07-.89s-.13-.6-.25-.86-.29-.48-.5-.66-.48-.26-.81-.26Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 8, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  1,
                  "General Admission - C8 S1",
                )
              }
            >
              <circle className="st3" cx="803.61" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  2,
                  "General Admission - C8 S2",
                )
              }
            >
              <circle className="st3" cx="766.69" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  3,
                  "General Admission - C8 S3",
                )
              }
            >
              <circle className="st3" cx="743.62" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  4,
                  "General Admission - C8 S4",
                )
              }
            >
              <circle className="st3" cx="743.21" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  5,
                  "General Admission - C8 S5",
                )
              }
            >
              <circle className="st3" cx="765.62" cy="1572.70" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  6,
                  "General Admission - C8 S6",
                )
              }
            >
              <circle className="st3" cx="802.29" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  7,
                  "General Admission - C8 S7",
                )
              }
            >
              <circle className="st3" cx="839.21" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  8,
                  "General Admission - C8 S8",
                )
              }
            >
              <circle className="st3" cx="862.27" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  9,
                  "General Admission - C8 S9",
                )
              }
            >
              <circle className="st3" cx="862.68" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 8, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  8,
                  10,
                  "General Admission - C8 S10",
                )
              }
            >
              <circle className="st3" cx="840.27" cy="1472.20" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1019.29" cy="1522.45" r="50.99" />
          <path
            className="st12"
            d="M1019.25,1534.85c-1.05,0-2.08-.13-3.08-.38s-1.88-.64-2.65-1.17-1.39-1.19-1.86-2-.7-1.75-.7-2.86v-2.29h6.54l-.02,1.04c0,.23.04.45.12.66s.19.39.33.54.31.28.5.37.4.13.61.13c.19,0,.38-.04.57-.11s.37-.2.53-.36.28-.37.38-.61.14-.53.14-.87v-3.96c-.41.45-.93.79-1.55,1.02s-1.25.35-1.88.35c-.95,0-1.76-.11-2.44-.32s-1.25-.5-1.71-.88-.83-.82-1.1-1.34-.48-1.08-.62-1.71-.24-1.28-.28-1.99-.06-1.42-.06-2.16c0-.89.05-1.75.15-2.57s.27-1.59.52-2.31.57-1.38.98-1.97.91-1.1,1.53-1.51,1.34-.74,2.19-.98,1.82-.35,2.94-.35c1.63,0,2.97.24,4.02.72s1.88,1.16,2.48,2.03,1.02,1.92,1.25,3.13.34,2.55.34,4.02v5.91c0,.98-.02,1.98-.07,2.99s-.16,1.98-.33,2.93-.44,1.83-.78,2.66-.82,1.56-1.42,2.17-1.36,1.1-2.26,1.46-1.99.54-3.27.54ZM1017.68,1516.15c.01.43.03.84.06,1.21s.09.7.19.97.25.47.46.62.5.19.87.16c1.05,0,1.58-.88,1.58-2.65v-1.79c0-.89-.11-1.58-.33-2.08s-.62-.75-1.22-.75c-.34,0-.62.08-.83.24s-.38.36-.49.62-.2.54-.25.86-.07.64-.08.96,0,.62,0,.91.02.54.02.74Z"
          />
          <g>
            <g
              className={`${getClassNames("General Admission - C", 9, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  1,
                  "General Admission - C9 S1",
                )
              }
            >
              <circle className="st3" cx="1019.95" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  2,
                  "General Admission - C9 S2",
                )
              }
            >
              <circle className="st3" cx="983.03" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  3,
                  "General Admission - C9 S3",
                )
              }
            >
              <circle className="st3" cx="959.97" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  4,
                  "General Admission - C9 S4",
                )
              }
            >
              <circle className="st3" cx="959.56" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  5,
                  "General Admission - C9 S5",
                )
              }
            >
              <circle className="st3" cx="981.97" cy="1572.70" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  6,
                  "General Admission - C9 S6",
                )
              }
            >
              <circle className="st3" cx="1018.63" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  7,
                  "General Admission - C9 S7",
                )
              }
            >
              <circle className="st3" cx="1055.55" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  8,
                  "General Admission - C9 S8",
                )
              }
            >
              <circle className="st3" cx="1078.62" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  9,
                  "General Admission - C9 S9",
                )
              }
            >
              <circle className="st3" cx="1079.02" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 9, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  9,
                  10,
                  "General Admission - C9 S10",
                )
              }
            >
              <circle className="st3" cx="1056.62" cy="1472.20" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1231.31" cy="1522.45" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1221.43,1506.54h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1229.36,1526.06v-11.02c0-2.92.7-5.11,2.09-6.57s3.42-2.19,6.08-2.19,4.72.73,6.12,2.19,2.09,3.65,2.09,6.57v11.02c0,1.23-.16,2.35-.47,3.35s-.73,1.83-1.26,2.5-1.15,1.22-1.85,1.67-1.45.78-2.21.98-1.57.3-2.4.3-1.63-.1-2.4-.3-1.51-.52-2.21-.98-1.33-1.01-1.85-1.67-.95-1.49-1.26-2.5-.47-2.12-.47-3.35ZM1239.08,1526.68v-12.38c0-.3,0-.55,0-.73s-.04-.41-.1-.69-.14-.49-.24-.65-.25-.3-.45-.41-.45-.18-.74-.18-.54.06-.74.18-.35.25-.45.41-.18.38-.24.65-.09.5-.1.69,0,.42,0,.73v12.38c0,.66.16,1.16.48,1.52s.67.54,1.05.54.72-.18,1.05-.54.48-.86.48-1.52Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 10, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  1,
                  "General Admission - C10 S1",
                )
              }
            >
              <circle className="st3" cx="1231.97" cy="1459.86" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  2,
                  "General Admission - C10 S2",
                )
              }
            >
              <circle className="st3" cx="1195.05" cy="1471.43" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  3,
                  "General Admission - C10 S3",
                )
              }
            >
              <circle className="st3" cx="1171.98" cy="1502.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  4,
                  "General Admission - C10 S4",
                )
              }
            >
              <circle className="st3" cx="1171.58" cy="1541.17" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  5,
                  "General Admission - C10 S5",
                )
              }
            >
              <circle className="st3" cx="1193.99" cy="1572.70" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  6,
                  "General Admission - C10 S6",
                )
              }
            >
              <circle className="st3" cx="1230.65" cy="1585.05" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  7,
                  "General Admission - C10 S7",
                )
              }
            >
              <circle className="st3" cx="1267.57" cy="1573.48" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  8,
                  "General Admission - C10 S8",
                )
              }
            >
              <circle className="st3" cx="1290.64" cy="1542.42" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  9,
                  "General Admission - C10 S9",
                )
              }
            >
              <circle className="st3" cx="1291.04" cy="1503.74" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 10, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  10,
                  10,
                  "General Admission - C10 S10",
                )
              }
            >
              <circle className="st3" cx="1268.63" cy="1472.20" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="688.33" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M681.65,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M694.13,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 11, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  1,
                  "General Admission - C11 S1",
                )
              }
            >
              <circle className="st3" cx="688.99" cy="1583.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  2,
                  "General Admission - C11 S2",
                )
              }
            >
              <circle className="st3" cx="652.07" cy="1594.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  3,
                  "General Admission - C11 S3",
                )
              }
            >
              <circle className="st3" cx="629.01" cy="1625.66" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  4,
                  "General Admission - C11 S4",
                )
              }
            >
              <circle className="st3" cx="628.6" cy="1664.34" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  5,
                  "General Admission - C11 S5",
                )
              }
            >
              <circle className="st3" cx="651.01" cy="1695.88" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  6,
                  "General Admission - C11 S6",
                )
              }
            >
              <circle className="st3" cx="687.67" cy="1708.22" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  7,
                  "General Admission - C11 S7",
                )
              }
            >
              <circle className="st3" cx="724.59" cy="1696.65" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  8,
                  "General Admission - C11 S8",
                )
              }
            >
              <circle className="st3" cx="747.66" cy="1665.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  9,
                  "General Admission - C11 S9",
                )
              }
            >
              <circle className="st3" cx="748.07" cy="1626.91" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 11, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  11,
                  10,
                  "General Admission - C11 S10",
                )
              }
            >
              <circle className="st3" cx="725.66" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="911.26" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M901.77,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26-.24.11-.7.25-1.37.42s-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M909.4,1657.71v-1.44c0-.83.08-1.69.25-2.58.25-1.29.64-2.48,1.18-3.56s1.17-2.11,1.88-3.07,1.49-1.88,2.33-2.77,1.67-1.77,2.5-2.65c.49-.53.88-1.11,1.16-1.76s.42-1.38.42-2.21c0-.79-.12-1.41-.36-1.87s-.68-.69-1.31-.69c-1.03,0-1.55.89-1.55,2.67v2.62h-6.5l-.07-.79c.01-1.58.13-3,.34-4.26s.63-2.32,1.23-3.19,1.44-1.53,2.5-2,2.44-.69,4.14-.69c1.31,0,2.47.19,3.48.57s1.85.92,2.54,1.63,1.21,1.55,1.56,2.55.54,2.12.54,3.36-.21,2.46-.64,3.57-.98,2.13-1.64,3.04c-.54.76-1.1,1.45-1.67,2.07s-1.14,1.22-1.7,1.82-1.09,1.22-1.61,1.85-.98,1.35-1.39,2.14h8.44v5.66h-16.05Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 12, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  1,
                  "General Admission - C12 S1",
                )
              }
            >
              <circle className="st3" cx="911.91" cy="1583.04" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  2,
                  "General Admission - C12 S2",
                )
              }
            >
              <circle className="st3" cx="875" cy="1594.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  3,
                  "General Admission - C12 S3",
                )
              }
            >
              <circle className="st3" cx="851.93" cy="1625.66" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  4,
                  "General Admission - C12 S4",
                )
              }
            >
              <circle className="st3" cx="851.52" cy="1664.34" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  5,
                  "General Admission - C12 S5",
                )
              }
            >
              <circle className="st3" cx="873.93" cy="1695.88" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  6,
                  "General Admission - C12 S6",
                )
              }
            >
              <circle className="st3" cx="910.6" cy="1708.22" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  7,
                  "General Admission - C12 S7",
                )
              }
            >
              <circle className="st3" cx="947.51" cy="1696.65" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  8,
                  "General Admission - C12 S8",
                )
              }
            >
              <circle className="st3" cx="970.58" cy="1665.6" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  9,
                  "General Admission - C12 S9",
                )
              }
            >
              <circle className="st3" cx="970.99" cy="1626.91" r="8.72" />
            </g>

            <g
              className={`${getClassNames("General Admission - C", 12, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  12,
                  10,
                  "General Admission - C12 S10",
                )
              }
            >
              <circle className="st3" cx="948.58" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1125.87" cy="1645.63" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1116.34,1629.71h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1131.71,1658.05c-1.3,0-2.44-.14-3.42-.43s-1.79-.74-2.44-1.35-1.14-1.4-1.47-2.35-.49-2.09-.49-3.41v-2.71h6.35v2.72c0,.26.02.51.05.75s.11.45.24.63.3.33.54.43.55.16.95.16c.29,0,.54-.04.74-.11s.36-.23.49-.45.22-.54.28-.95.09-.96.09-1.63c0-.53-.04-1.03-.13-1.52s-.23-.91-.43-1.27-.47-.65-.81-.87-.76-.33-1.27-.33c-.13,0-.24,0-.34,0s-.18.01-.25.03v-5.4c1.04,0,1.85-.22,2.43-.67s.86-1.22.86-2.32c0-1.35-.5-2.02-1.51-2.02-.43,0-.76.06-.99.19s-.39.29-.49.49-.16.42-.17.67-.02.49-.02.74v.91h-6.4l-.04-1.05c-.01-1.35.16-2.5.51-3.45s.87-1.72,1.56-2.32,1.53-1.03,2.54-1.3,2.16-.4,3.46-.4,2.37.15,3.36.45,1.81.76,2.49,1.37,1.19,1.39,1.54,2.33.53,2.04.53,3.32c0,.64-.04,1.26-.11,1.85s-.22,1.13-.43,1.63-.5.93-.88,1.31-.87.68-1.48.89c.79.38,1.38.81,1.79,1.31s.7,1.05.88,1.64.27,1.23.28,1.9.02,1.36.02,2.07c0,1.34-.15,2.53-.45,3.59s-.78,1.95-1.45,2.67-1.54,1.28-2.6,1.67-2.36.58-3.88.58Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 13, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  1,
                  "General Admission - C13 S1",
                )
              }
            >
              <circle className="st3" cx="1126.53" cy="1583.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  2,
                  "General Admission - C13 S2",
                )
              }
            >
              <circle className="st3" cx="1089.61" cy="1594.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  3,
                  "General Admission - C13 S3",
                )
              }
            >
              <circle className="st3" cx="1066.54" cy="1625.66" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  4,
                  "General Admission - C13 S4",
                )
              }
            >
              <circle className="st3" cx="1066.14" cy="1664.34" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  5,
                  "General Admission - C13 S5",
                )
              }
            >
              <circle className="st3" cx="1088.55" cy="1695.88" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  6,
                  "General Admission - C13 S6",
                )
              }
            >
              <circle className="st3" cx="1125.21" cy="1708.22" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  7,
                  "General Admission - C13 S7",
                )
              }
            >
              <circle className="st3" cx="1162.13" cy="1696.65" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  8,
                  "General Admission - C13 S8",
                )
              }
            >
              <circle className="st3" cx="1185.2" cy="1665.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  9,
                  "General Admission - C13 S9",
                )
              }
            >
              <circle className="st3" cx="1185.6" cy="1626.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 13, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  13,
                  10,
                  "General Admission - C13 S10",
                )
              }
            >
              <circle className="st3" cx="1163.19" cy="1595.38" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="802.95" cy="1763.32" r="50.99" />
          <g>
            <path
              className="st12"
              d="M793.14,1747.4h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M817.55,1765.3v5.36h-1.23v4.76h-6.49v-4.76h-9.53v-4.69l6.21-18.54h9.81v17.88h1.23ZM806.36,1765.3h3.48v-12.73l-3.48,12.73Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 14, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  1,
                  "General Admission - C14 S1",
                )
              }
            >
              <circle className="st3" cx="803.61" cy="1700.73" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  2,
                  "General Admission - C14 S2",
                )
              }
            >
              <circle className="st3" cx="766.69" cy="1712.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  3,
                  "General Admission - C14 S3",
                )
              }
            >
              <circle className="st3" cx="743.62" cy="1743.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  4,
                  "General Admission - C14 S4",
                )
              }
            >
              <circle className="st3" cx="743.21" cy="1782.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  5,
                  "General Admission - C14 S5",
                )
              }
            >
              <circle className="st3" cx="765.62" cy="1813.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  6,
                  "General Admission - C14 S6",
                )
              }
            >
              <circle className="st3" cx="802.29" cy="1825.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  7,
                  "General Admission - C14 S7",
                )
              }
            >
              <circle className="st3" cx="839.21" cy="1814.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  8,
                  "General Admission - C14 S8",
                )
              }
            >
              <circle className="st3" cx="862.27" cy="1783.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  9,
                  "General Admission - C14 S9",
                )
              }
            >
              <circle className="st3" cx="862.68" cy="1744.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 14, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  14,
                  10,
                  "General Admission - C14 S10",
                )
              }
            >
              <circle className="st3" cx="840.27" cy="1713.07" r="8.72" />
            </g>
          </g>
        </g>
        <g>
          <circle className="st3" cx="1019.29" cy="1763.32" r="50.99" />
          <g>
            <path
              className="st12"
              d="M1009.72,1747.4h4.97v28h-6.56v-20.39c-.14.07-.33.16-.57.26s-.7.25-1.37.42-1.3.26-1.89.26v-4.8c.33,0,.78-.09,1.35-.26s1.17-.42,1.79-.72,1.15-.7,1.6-1.2.67-1.02.67-1.58Z"
            />
            <path
              className="st12"
              d="M1025.82,1775.83c-1.23,0-2.36-.14-3.39-.41s-1.92-.7-2.66-1.27-1.33-1.3-1.75-2.18-.63-1.92-.63-3.11v-3.23h6.43v1.51c0,.75.06,1.33.17,1.75s.25.72.41.92.34.32.54.36.37.06.54.06c.63,0,1.06-.21,1.29-.62s.34-.98.34-1.72v-3.8c0-.35-.01-.69-.04-1.03s-.1-.64-.21-.91-.27-.5-.48-.69-.5-.29-.86-.33c-1.17,0-1.76.77-1.76,2.3h-5.68v-16.03h14.75v5.85h-8.88l.02,3.73c.62-.57,1.64-.86,3.06-.86.9,0,1.7.13,2.38.4s1.28.62,1.78,1.06.91.97,1.25,1.56.6,1.23.79,1.91.33,1.37.41,2.08.12,1.41.12,2.09c0,.9-.04,1.79-.12,2.66s-.23,1.7-.45,2.49-.52,1.51-.9,2.18-.86,1.24-1.45,1.72-1.29.86-2.11,1.13-1.79.41-2.9.41Z"
            />
          </g>
          <g>
            <g
              className={`${getClassNames("General Admission - C", 15, 1)}`}
              data-seat="1"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  1,
                  "General Admission - C15 S1",
                )
              }
            >
              <circle className="st3" cx="1019.95" cy="1700.73" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 2)}`}
              data-seat="2"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  2,
                  "General Admission - C15 S2",
                )
              }
            >
              <circle className="st3" cx="983.03" cy="1712.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 3)}`}
              data-seat="3"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  3,
                  "General Admission - C15 S3",
                )
              }
            >
              <circle className="st3" cx="959.97" cy="1743.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 4)}`}
              data-seat="4"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  4,
                  "General Admission - C15 S4",
                )
              }
            >
              <circle className="st3" cx="959.56" cy="1782.04" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 5)}`}
              data-seat="5"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  5,
                  "General Admission - C15 S5",
                )
              }
            >
              <circle className="st3" cx="981.97" cy="1813.57" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 6)}`}
              data-seat="6"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  6,
                  "General Admission - C15 S6",
                )
              }
            >
              <circle className="st3" cx="1018.63" cy="1825.91" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 7)}`}
              data-seat="7"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  7,
                  "General Admission - C15 S7",
                )
              }
            >
              <circle className="st3" cx="1055.55" cy="1814.35" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 8)}`}
              data-seat="8"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  8,
                  "General Admission - C15 S8",
                )
              }
            >
              <circle className="st3" cx="1078.62" cy="1783.29" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 9)}`}
              data-seat="9"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  9,
                  "General Admission - C15 S9",
                )
              }
            >
              <circle className="st3" cx="1079.02" cy="1744.6" r="8.72" />
            </g>
            <g
              className={`${getClassNames("General Admission - C", 15, 10)}`}
              data-seat="10"
              onClick={() =>
                handleClick(
                  "General Admission - C",
                  15,
                  10,
                  "General Admission - C15 S10",
                )
              }
            >
              <circle className="st3" cx="1056.62" cy="1713.07" r="8.72" />
            </g>
          </g>
        </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FshsLayout;