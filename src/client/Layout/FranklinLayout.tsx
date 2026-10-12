"use client";
import useApp from "@/context/useApp";
import useElevenLayout from "@/hooks/useElevenLayout";
import { Ticket } from "@/lib/types";
import { extractConfirmed, extractSeatNos, returnSeatArray } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

type props = {
  tickets: Ticket[] | null;
  handleRefetch?: () => void;
  type?: string;
};

const FranklinLayout = ({ handleRefetch, tickets, type }: props) => {
  const [firstticket, setFirstTicket] = useState<Ticket | null>(null);
  const { getItem } = useCart();
  const { handleAddToCart } = useElevenLayout();
  const { setToaster } = useApp();

  const getClassNames = (ticket: Ticket | null, seatNumber: any) => {
    const classes = [" "];
    if (!ticket) return;
    const booked = extractSeatNos(ticket?.seats);
    const sold = extractConfirmed(ticket?.seats);
    if (booked?.includes(seatNumber)) {
      classes.push("booked");
    }

    if (sold?.includes(seatNumber)) {
      classes.push("sold");
    }
    let id = `t-${ticket?.id}-r-1-b-${seatNumber}`;
    if (getItem(id)) {
      classes.push("in-cart");
    }

    return classes.join(" ");
  };
  const handleClick = (ticket: Ticket | null, seat: any) => {
    if (!ticket) return;
    const exact = ticket?.seats?.find((tick) => tick?.seatNo == seat);
    if (exact && exact?.status == "Available") {
      handleAddToCart(ticket, 1, seat);
    } else {
      setToaster("error", `This Section is already ${exact?.status}.`);
    }
  };

  useEffect(() => {
    if (tickets && tickets?.length > 0) {
      const one = tickets[0];
      if (one) {
        const newObject = {
          ...one,
          seats: returnSeatArray(one, 40, 0),
        };
        setFirstTicket(newObject);
      }
    }
  }, [tickets]);
  //console.log(firstticket);
  return (
    <div className="fl-wrapper">
      <p className="md-max:block hidden mb-3 w-full">
        <strong>Note: </strong>
        {`BE SURE TO SCROLL LEFT TO RIGHT ON THE SCREEN TO
        VIEW ALL SEATING. Click the numbered section to purchase VIP Section.`}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 1048.31 720"
        className="franklin-layout"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="765.7"
            y1="605.97"
            x2="1029.63"
            y2="605.97"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#f43930" />
            <stop offset="1" stop-color="#ff904e" />
          </linearGradient>
        </defs>
        <g>
          <g id="Layer_1">
            <g id="BG">
              <rect className="cls-3" x="0" width="1048.32" height="720" />
              <g id="Blocks">
                <line className="cls-12" x1="908.9" x2="908.9" y2="720" />
                <line className="cls-12" x1="798.59" x2="798.59" y2="720" />
                <line className="cls-12" x1="1019.21" x2="1019.21" y2="720" />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="118.99"
                  x2="0"
                  y2="118.99"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="230.12"
                  x2="0"
                  y2="230.12"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="118.99"
                  x2="0"
                  y2="118.99"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="230.12"
                  x2="0"
                  y2="230.12"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="7.86"
                  x2="0"
                  y2="7.86"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="341.25"
                  x2="0"
                  y2="341.25"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="452.39"
                  x2="0"
                  y2="452.39"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="563.52"
                  x2="0"
                  y2="563.52"
                />
                <line
                  className="cls-12"
                  x1="1048.31"
                  y1="674.65"
                  x2="0"
                  y2="674.65"
                />
                <line className="cls-12" x1="688.28" x2="688.28" y2="720" />
                <line className="cls-12" x1="577.97" x2="577.97" y2="720" />
                <line className="cls-12" x1="467.66" x2="467.66" y2="720" />
                <line className="cls-12" x1="357.35" x2="357.35" y2="720" />
                <line className="cls-12" x1="247.04" x2="247.04" y2="720" />
                <line className="cls-12" x1="136.73" x2="136.73" y2="720" />
                <line className="cls-12" x1="26.42" x2="26.42" y2="720" />
              </g>
            </g>
            <rect
              className="cls-4"
              x="493.2"
              y="107.16"
              width="227.85"
              height="477.25"
            />
            <rect
              className="cls-5"
              x="765.7"
              y="524.6"
              width="263.92"
              height="162.73"
            />
            <rect
              className="cls-11"
              x="974.59"
              y="275.77"
              width="32.36"
              height="174.6"
            />
            <rect
              className="cls-11"
              x="554.67"
              y="-39.34"
              width="32.36"
              height="174.6"
              transform="translate(618.82 -522.89) rotate(90)"
            />
            <rect
              className="cls-10"
              x="758"
              y="46.16"
              width="248.96"
              height="138.65"
            />
            <rect
              className="cls-11"
              x="515.9"
              y="566.61"
              width="36.48"
              height="221.39"
              transform="translate(1211.44 143.16) rotate(90)"
            />
            <rect
              className="cls-11"
              x="8.28"
              y="313.79"
              width="36.48"
              height="114.14"
              transform="translate(53.04 741.73) rotate(180)"
            />
            <g>
              <g id="GUOVSj">
                <g>
                  <path
                    className="cls-15"
                    d="M718.66,687.33c-.08.22-.22.44-.22.66-.02,2.56-.01,5.12-.01,7.67,0,.22,0,.43-.01.64-.08,1.06-.92,1.84-1.93,1.81-1.03-.03-1.84-.82-1.85-1.89-.02-2.63,0-5.26,0-7.89,0-.28,0-.57,0-.94h-4.63c1.28-5.8,2.74-11.45,3.97-17.14-.1-.03-.2-.06-.3-.09-.1.26-.23.52-.3.79-.62,2.59-1.23,5.18-1.86,7.77-.23.96-.83,1.38-1.69,1.22-.76-.14-1.23-.85-1.04-1.76.6-2.86,1.17-5.74,1.88-8.58.59-2.37,2.86-4.01,5.32-4.02,1.74,0,3.49,0,5.23,0,2.45.01,4.7,1.66,5.32,4.02.72,2.76,1.36,5.54,2.01,8.32.23.97-.23,1.79-1.05,1.99-.97.24-1.7-.24-1.97-1.35-.62-2.57-1.23-5.14-1.84-7.7-.06-.24-.16-.47-.24-.7-.08,0-.16.02-.23.02,0,.22-.04.44,0,.64,1.14,4.86,2.28,9.72,3.43,14.59.15.62.27,1.24.42,1.93h-4.24v.82c0,2.53-.05,5.07.02,7.6.04,1.43-.86,2.31-1.97,2.33-1.17.01-1.92-.94-1.92-2.36,0-2.51,0-5.02,0-7.53,0-.26,0-.52,0-.78-.1-.04-.2-.07-.3-.11Z"
                  />
                  <path
                    className="cls-15"
                    d="M697.47,684.03c0,3.92,0,7.84,0,11.76,0,1.65-1.33,2.67-2.81,2.22-.94-.29-1.53-1.14-1.53-2.26,0-4.54,0-9.08-.01-13.63,0-.29-.16-.58-.25-.88-.11.3-.3.59-.3.89-.02,4.54-.01,9.08-.01,13.63,0,.94-.37,1.67-1.22,2.1-.77.39-1.58.37-2.21-.2-.41-.37-.65-.95-.87-1.48-.11-.26-.05-.61-.05-.92,0-7.67,0-15.35-.01-23.02,0-.3-.18-.6-.28-.91-.08.3-.21.59-.22.89-.02,2.39,0,4.78-.01,7.17,0,1.1-.67,1.82-1.67,1.82-.97,0-1.65-.69-1.65-1.76-.01-3.71-.02-7.41,0-11.12,0-1.73,1.21-2.92,2.94-2.92,3.71-.01,7.41-.01,11.12,0,1.7,0,2.91,1.18,2.92,2.87.02,3.73.02,7.46,0,11.19,0,1.06-.69,1.75-1.67,1.74-.98,0-1.65-.71-1.65-1.76,0-2.44,0-4.88,0-7.31,0-.17.03-.34-.01-.5-.03-.11-.15-.2-.23-.3-.09.09-.24.17-.26.28-.04.21-.02.43-.02.64,0,3.92,0,7.84,0,11.76Z"
                  />
                  <path
                    className="cls-15"
                    d="M696.96,660.86c-.07,2.31-2.02,4.19-4.27,4.11-2.32-.08-4.19-2.02-4.12-4.27.08-2.31,2.02-4.19,4.27-4.12,2.3.07,4.19,2.02,4.12,4.27Z"
                  />
                  <path
                    className="cls-15"
                    d="M722.69,660.92c0,2.32-1.85,4.18-4.16,4.19-2.3,0-4.17-1.88-4.17-4.18,0-2.3,1.88-4.2,4.17-4.2,2.29,0,4.16,1.88,4.16,4.19Z"
                  />
                </g>
              </g>
              <line
                className="cls-13"
                x1="705.47"
                y1="698.07"
                x2="705.47"
                y2="656.66"
              />
              <rect
                className="cls-13"
                x="679.88"
                y="651.78"
                width="51.16"
                height="51.16"
                rx="5.24"
                ry="5.24"
              />
            </g>
            <g>
              <g id="GUOVSj-2" data-name="GUOVSj">
                <g>
                  <path
                    className="cls-15"
                    d="M98.07,690.82c-.06.17-.17.34-.17.51-.01,1.99,0,3.97,0,5.96,0,.17,0,.33,0,.5-.07.83-.72,1.43-1.5,1.41-.8-.02-1.43-.64-1.44-1.47-.02-2.04,0-4.08,0-6.13,0-.22,0-.44,0-.73h-3.59c1-4.5,2.13-8.89,3.09-13.31-.08-.02-.16-.05-.24-.07-.08.2-.18.4-.23.61-.48,2.01-.96,4.03-1.44,6.04-.18.75-.64,1.07-1.31.95-.59-.11-.95-.66-.81-1.36.46-2.22.91-4.45,1.46-6.66.46-1.84,2.22-3.12,4.13-3.12,1.36,0,2.71,0,4.07,0,1.9,0,3.65,1.29,4.13,3.12.56,2.14,1.06,4.31,1.56,6.46.18.76-.18,1.39-.81,1.55-.75.19-1.32-.19-1.53-1.04-.48-1.99-.95-3.99-1.43-5.98-.04-.19-.12-.36-.18-.55-.06,0-.12.01-.18.02,0,.17-.03.34,0,.5.88,3.78,1.77,7.55,2.66,11.33.11.48.21.96.33,1.5h-3.29v.64c0,1.97-.04,3.94.01,5.9.03,1.11-.67,1.8-1.53,1.81-.91.01-1.49-.73-1.49-1.84,0-1.95,0-3.9,0-5.85,0-.2,0-.4,0-.61-.08-.03-.16-.06-.23-.09Z"
                  />
                  <path
                    className="cls-15"
                    d="M81.62,688.26c0,3.04,0,6.09,0,9.13,0,1.28-1.03,2.07-2.18,1.72-.73-.22-1.19-.89-1.19-1.75,0-3.53,0-7.06-.01-10.58,0-.23-.13-.45-.19-.68-.08.23-.23.46-.23.69-.02,3.53,0,7.05-.01,10.58,0,.73-.29,1.3-.95,1.63-.6.31-1.23.29-1.72-.15-.32-.28-.5-.74-.68-1.15-.09-.21-.04-.48-.04-.72,0-5.96,0-11.92-.01-17.88,0-.23-.14-.47-.22-.7-.06.23-.17.46-.17.69-.01,1.86,0,3.71,0,5.57,0,.85-.52,1.41-1.3,1.41-.76,0-1.28-.54-1.28-1.36,0-2.88-.01-5.76,0-8.63,0-1.35.94-2.27,2.28-2.27,2.88-.01,5.76-.01,8.63,0,1.32,0,2.26.92,2.27,2.23.02,2.9.01,5.79,0,8.69,0,.82-.54,1.36-1.3,1.35-.76,0-1.28-.55-1.28-1.37,0-1.89,0-3.79,0-5.68,0-.13.02-.27-.01-.39-.02-.09-.12-.16-.18-.24-.07.07-.18.13-.2.21-.03.16-.02.33-.02.5,0,3.04,0,6.09,0,9.13Z"
                  />
                  <path
                    className="cls-15"
                    d="M81.22,670.26c-.06,1.8-1.57,3.25-3.32,3.19-1.8-.06-3.26-1.57-3.2-3.31.06-1.79,1.57-3.25,3.32-3.2,1.79.06,3.25,1.57,3.2,3.32Z"
                  />
                  <path
                    className="cls-15"
                    d="M101.21,670.31c0,1.81-1.43,3.25-3.23,3.25-1.78,0-3.24-1.46-3.24-3.25,0-1.79,1.46-3.26,3.24-3.26,1.78,0,3.23,1.46,3.23,3.26Z"
                  />
                </g>
              </g>
              <line
                className="cls-14"
                x1="87.83"
                y1="699.16"
                x2="87.83"
                y2="667"
              />
              <rect
                className="cls-14"
                x="67.96"
                y="663.21"
                width="39.74"
                height="39.74"
                rx="5.24"
                ry="5.24"
              />
            </g>
            <g className="first-tickets">
              <g
                data-seat="35"
                className={`fl-2 block ${getClassNames(firstticket, 35)}`}
                onClick={() => handleClick(firstticket, 35)}
              >
                <circle cx="51.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(40.9 81.58)">
                  <tspan x="0" y="0">
                    35
                  </tspan>
                </text>
              </g>
              <g
                data-seat="29"
                className={`fl-2 block ${getClassNames(firstticket, 29)}`}
                onClick={() => handleClick(firstticket, 29)}
              >
                <circle cx="115.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(104.9 81.58)">
                  <tspan x="0" y="0">
                    29
                  </tspan>
                </text>
              </g>
              <g
                data-seat="23"
                className={`fl-2 block ${getClassNames(firstticket, 23)}`}
                onClick={() => handleClick(firstticket, 23)}
              >
                <circle cx="184.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(173.9 81.58)">
                  <tspan x="0" y="0">
                    23
                  </tspan>
                </text>
              </g>
              <g
                data-seat="17"
                className={`fl-2 block ${getClassNames(firstticket, 17)}`}
                onClick={() => handleClick(firstticket, 17)}
              >
                <circle cx="251.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(240.9 81.58)">
                  <tspan x="0" y="0">
                    17
                  </tspan>
                </text>
              </g>
              <g
                data-seat="11"
                className={`fl-2 block ${getClassNames(firstticket, 11)}`}
                onClick={() => handleClick(firstticket, 11)}
              >
                <circle cx="318.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(307.9 81.58)">
                  <tspan x="0" y="0">
                    11
                  </tspan>
                </text>
              </g>
              <g
                data-seat="5"
                className={`fl-2 block ${getClassNames(firstticket, 5)}`}
                onClick={() => handleClick(firstticket, 5)}
              >
                <circle cx="385.06" cy="76.7" r="30.89" />
                <text className="cls-1" transform="translate(379.98 81.58)">
                  <tspan x="0" y="0">
                    5
                  </tspan>
                </text>
              </g>
              <g
                data-seat="36"
                className={`fl-2 block ${getClassNames(firstticket, 36)}`}
                onClick={() => handleClick(firstticket, 36)}
              >
                <circle cx="51.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(40.9 190.93)">
                  <tspan x="0" y="0">
                    36
                  </tspan>
                </text>
              </g>
              <g
                data-seat="37"
                className={`fl-2 block ${getClassNames(firstticket, 37)}`}
                onClick={() => handleClick(firstticket, 37)}
              >
                <circle cx="51.06" cy="282.9" r="30.89" />
                <text className="cls-1" transform="translate(40.9 287.77)">
                  <tspan x="0" y="0">
                    37
                  </tspan>
                </text>
              </g>
              <g
                data-seat="31"
                className={`fl-2 block ${getClassNames(firstticket, 31)}`}
                onClick={() => handleClick(firstticket, 31)}
              >
                <circle cx="118.26" cy="282.9" r="30.89" />
                <text className="cls-1" transform="translate(108.1 287.77)">
                  <tspan x="0" y="0">
                    31
                  </tspan>
                </text>
              </g>
              <g
                data-seat="25"
                className={`fl-2 block ${getClassNames(firstticket, 25)}`}
                onClick={() => handleClick(firstticket, 25)}
              >
                <circle cx="188.03" cy="281.9" r="30.89" />
                <text className="cls-1" transform="translate(177.86 286.77)">
                  <tspan x="0" y="0">
                    25
                  </tspan>
                </text>
              </g>
              <g
                data-seat="13"
                className={`fl-2 block ${getClassNames(firstticket, 13)}`}
                onClick={() => handleClick(firstticket, 13)}
              >
                <circle cx="315.58" cy="281.9" r="30.89" />
                <text className="cls-1" transform="translate(305.42 286.77)">
                  <tspan x="0" y="0">
                    13
                  </tspan>
                </text>
              </g>
              <g
                data-seat="7"
                className={`fl-2 block ${getClassNames(firstticket, 7)}`}
                onClick={() => handleClick(firstticket, 7)}
              >
                <circle cx="381.59" cy="281.9" r="30.89" />
                <text className="cls-1" transform="translate(376.5 286.77)">
                  <tspan x="0" y="0">
                    7
                  </tspan>
                </text>
              </g>
              <g
                data-seat="2"
                className={`fl-2 block ${getClassNames(firstticket, 2)}`}
                onClick={() => handleClick(firstticket, 2)}
              >
                <circle cx="436.86" cy="229.26" r="30.89" />
                <text className="cls-1" transform="translate(431.78 234.13)">
                  <tspan x="0" y="0">
                    2
                  </tspan>
                </text>
              </g>
              <g
                data-seat="19"
                className={`fl-2 block ${getClassNames(firstticket, 19)}`}
                onClick={() => handleClick(firstticket, 19)}
              >
                <circle cx="257.57" cy="292.17" r="29.6" />
                <text className="cls-2" transform="translate(247.83 296.84)">
                  <tspan x="0" y="0">
                    19
                  </tspan>
                </text>
              </g>
              <g
                data-seat="30"
                className={`fl-2 block ${getClassNames(firstticket, 30)}`}
                onClick={() => handleClick(firstticket, 30)}
              >
                <circle cx="115.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(104.9 190.93)">
                  <tspan x="0" y="0">
                    30
                  </tspan>
                </text>
              </g>
              <g
                data-seat="24"
                className={`fl-2 block ${getClassNames(firstticket, 24)}`}
                onClick={() => handleClick(firstticket, 24)}
              >
                <circle cx="184.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(173.9 190.93)">
                  <tspan x="0" y="0">
                    24
                  </tspan>
                </text>
              </g>
              <g
                data-seat="18"
                className={`fl-2 block ${getClassNames(firstticket, 18)}`}
                onClick={() => handleClick(firstticket, 18)}
              >
                <circle cx="251.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(240.9 190.93)">
                  <tspan x="0" y="0">
                    18
                  </tspan>
                </text>
              </g>
              <g
                data-seat="12"
                className={`fl-2 block ${getClassNames(firstticket, 12)}`}
                onClick={() => handleClick(firstticket, 12)}
              >
                <circle cx="318.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(307.9 190.93)">
                  <tspan x="0" y="0">
                    12
                  </tspan>
                </text>
              </g>
              <g
                data-seat="6"
                className={`fl-2 block ${getClassNames(firstticket, 6)}`}
                onClick={() => handleClick(firstticket, 6)}
              >
                <circle cx="385.06" cy="186.05" r="30.89" />
                <text className="cls-1" transform="translate(379.98 190.93)">
                  <tspan x="0" y="0">
                    6
                  </tspan>
                </text>
              </g>
              <g
                data-seat="1"
                className={`fl-2 block ${getClassNames(firstticket, 1)}`}
                onClick={() => handleClick(firstticket, 1)}
              >
                <circle cx="435.79" cy="131.38" r="30.89" />
                <text className="cls-1" transform="translate(430.71 136.25)">
                  <tspan x="0" y="0">
                    1
                  </tspan>
                </text>
              </g>
            </g>
            <g className="second-tickets">
              <g
                data-seat="38"
                className={`fl-2 block ${getClassNames(firstticket, 38)}`}
                onClick={() => handleClick(firstticket, 38)}
              >
                <circle cx="41.56" cy="458.4" r="30.89" />
                <text className="cls-1" transform="translate(31.4 463.28)">
                  <tspan x="0" y="0">
                    38
                  </tspan>
                </text>
              </g>
              <g
                data-seat="32"
                className={`fl-2 block ${getClassNames(firstticket, 32)}`}
                onClick={() => handleClick(firstticket, 32)}
              >
                <circle cx="109.06" cy="459.28" r="30.89" />
                <text className="cls-1" transform="translate(98.89 464.16)">
                  <tspan x="0" y="0">
                    32
                  </tspan>
                </text>
              </g>
              <g
                data-seat="26"
                className={`fl-2 block ${getClassNames(firstticket, 26)}`}
                onClick={() => handleClick(firstticket, 26)}
              >
                <circle cx="180.06" cy="458.4" r="30.89" />
                <text className="cls-1" transform="translate(169.9 463.28)">
                  <tspan x="0" y="0">
                    26
                  </tspan>
                </text>
              </g>
              <g
                data-seat="20"
                className={`fl-2 block ${getClassNames(firstticket, 20)}`}
                onClick={() => handleClick(firstticket, 20)}
              >
                <circle cx="255.06" cy="459.28" r="30.89" />
                <text className="cls-1" transform="translate(244.89 464.16)">
                  <tspan x="0" y="0">
                    20
                  </tspan>
                </text>
              </g>
              <g
                data-seat="14"
                className={`fl-2 block ${getClassNames(firstticket, 14)}`}
                onClick={() => handleClick(firstticket, 14)}
              >
                <circle cx="323.27" cy="459.28" r="30.89" />
                <text className="cls-1" transform="translate(313.11 464.16)">
                  <tspan x="0" y="0">
                    14
                  </tspan>
                </text>
              </g>
              <g
                data-seat="8"
                className={`fl-2 block ${getClassNames(firstticket, 8)}`}
                onClick={() => handleClick(firstticket, 8)}
              >
                <circle cx="387.06" cy="459.28" r="30.89" />
                <text className="cls-1" transform="translate(381.98 464.16)">
                  <tspan x="0" y="0">
                    8
                  </tspan>
                </text>
              </g>
              <g
                data-seat="39"
                className={`fl-2 block ${getClassNames(firstticket, 39)}`}
                onClick={() => handleClick(firstticket, 39)}
              >
                <circle cx="41.56" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(31.4 552.25)">
                  <tspan x="0" y="0">
                    39
                  </tspan>
                </text>
              </g>
              <g
                data-seat="40"
                className={`fl-2 block ${getClassNames(firstticket, 40)}`}
                onClick={() => handleClick(firstticket, 40)}
              >
                <circle cx="48.31" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(38.14 641.03)">
                  <tspan x="0" y="0">
                    40
                  </tspan>
                </text>
              </g>
              <g
                data-seat="34"
                className={`fl-2 block ${getClassNames(firstticket, 34)}`}
                onClick={() => handleClick(firstticket, 34)}
              >
                <circle cx="118.26" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(108.1 641.03)">
                  <tspan x="0" y="0">
                    34
                  </tspan>
                </text>
              </g>
              <g
                data-seat="28"
                className={`fl-2 block ${getClassNames(firstticket, 28)}`}
                onClick={() => handleClick(firstticket, 28)}
              >
                <circle cx="185.47" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(175.3 641.03)">
                  <tspan x="0" y="0">
                    28
                  </tspan>
                </text>
              </g>
              <g
                data-seat="22"
                className={`fl-2 block ${getClassNames(firstticket, 22)}`}
                onClick={() => handleClick(firstticket, 22)}
              >
                <circle cx="255.06" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(244.89 641.03)">
                  <tspan x="0" y="0">
                    22
                  </tspan>
                </text>
              </g>
              <g
                data-seat="16"
                className={`fl-2 block ${getClassNames(firstticket, 16)}`}
                onClick={() => handleClick(firstticket, 16)}
              >
                <circle cx="323.27" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(313.11 641.03)">
                  <tspan x="0" y="0">
                    16
                  </tspan>
                </text>
              </g>
              <g
                data-seat="10"
                className={`fl-2 block ${getClassNames(firstticket, 10)}`}
                onClick={() => handleClick(firstticket, 10)}
              >
                <circle cx="390.91" cy="636.16" r="30.89" />
                <text className="cls-1" transform="translate(380.75 641.03)">
                  <tspan x="0" y="0">
                    10
                  </tspan>
                </text>
              </g>
              <g
                data-seat="4"
                className={`fl-2 block ${getClassNames(firstticket, 4)}`}
                onClick={() => handleClick(firstticket, 4)}
              >
                <circle cx="446.19" cy="597.62" r="30.89" />
                <text className="cls-1" transform="translate(441.1 602.5)">
                  <tspan x="0" y="0">
                    4
                  </tspan>
                </text>
              </g>
              <g
                data-seat="33"
                className={`fl-2 block ${getClassNames(firstticket, 33)}`}
                onClick={() => handleClick(firstticket, 33)}
              >
                <circle cx="115.95" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(105.79 552.25)">
                  <tspan x="0" y="0">
                    33
                  </tspan>
                </text>
              </g>
              <g
                data-seat="27"
                className={`fl-2 block ${getClassNames(firstticket, 27)}`}
                onClick={() => handleClick(firstticket, 27)}
              >
                <circle cx="184.06" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(173.9 552.25)">
                  <tspan x="0" y="0">
                    27
                  </tspan>
                </text>
              </g>
              <g
                data-seat="21"
                className={`fl-2 block ${getClassNames(firstticket, 21)}`}
                onClick={() => handleClick(firstticket, 21)}
              >
                <circle cx="255.06" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(244.89 552.25)">
                  <tspan x="0" y="0">
                    21
                  </tspan>
                </text>
              </g>
              <g
                data-seat="15"
                className={`fl-2 block ${getClassNames(firstticket, 15)}`}
                onClick={() => handleClick(firstticket, 15)}
              >
                <circle cx="321.17" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(311.01 552.25)">
                  <tspan x="0" y="0">
                    15
                  </tspan>
                </text>
              </g>
              <g
                data-seat="9"
                className={`fl-2 block ${getClassNames(firstticket, 9)}`}
                onClick={() => handleClick(firstticket, 9)}
              >
                <circle cx="387.06" cy="547.37" r="30.89" />
                <text className="cls-1" transform="translate(381.98 552.25)">
                  <tspan x="0" y="0">
                    9
                  </tspan>
                </text>
              </g>
              <g
                data-seat="3"
                className={`fl-2 block ${getClassNames(firstticket, 3)}`}
                onClick={() => handleClick(firstticket, 3)}
              >
                <circle cx="446.19" cy="501.96" r="30.89" />
                <text className="cls-1" transform="translate(441.1 506.84)">
                  <tspan x="0" y="0">
                    3
                  </tspan>
                </text>
              </g>
            </g>
            <text className="cls-9" transform="translate(14.66 375.33)">
              <tspan x="0" y="0">
                TV
              </tspan>
            </text>
            <text className="cls-9" transform="translate(978.92 367.54)">
              <tspan x="0" y="0">
                TV
              </tspan>
            </text>
            <text className="cls-8" transform="translate(528.5 329.89)">
              <tspan x="0" y="0">
                DANCE
              </tspan>
              <tspan x="1.24" y="53.07">
                FLOOR
              </tspan>
            </text>
            <text
              className="cls-9"
              transform="translate(575.32 59.82) rotate(-90)"
            >
              <tspan x="0" y="0">
                TV
              </tspan>
            </text>
            <text className="cls-9" transform="translate(446.01 681.77)">
              <tspan x="0" y="0">
                ENTRANCE DOORS
              </tspan>
            </text>
            <text className="cls-6" transform="translate(781.81 611.58)">
              <tspan x="0" y="0">
                CATERING SECTION
              </tspan>
            </text>
            <text className="cls-7" transform="translate(794.39 85.98)">
              <tspan x="0" y="0">
                FRANKLIN ALUMNI
              </tspan>
              <tspan x="-9.48" y="22.71">
                CHAPTER OF KAPPA
              </tspan>
              <tspan x="37.3" y="45.42">
                ALPHA PSI
              </tspan>
              <tspan x="72.52" y="68.13">
                VIP
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default FranklinLayout;
