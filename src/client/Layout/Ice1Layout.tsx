import useApp from "@/context/useApp";
import useHybridLayout from "@/hooks/useHybridLayout";
import { AlumniTDistNames, ICE1DistNames, Ticket } from "@/lib/types";
import { extractConfirmed, extractSeatNos } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

type props = {
  tickets: Ticket[] | null;
  handleRefetch?: () => void;
  type?: string;
};

const Ice1Layout = ({ tickets }: props) => {
  const [tables, setTables] = useState<Ticket[] | null>(null);
  const { getItem } = useCart();
  const { handleAddToCart } = useHybridLayout();
  const { setToaster } = useApp();

  const getClassNames = (table: ICE1DistNames, seatNumber: any) => {
    const classes = ["ice-s "];
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

  const handleClick = (table: ICE1DistNames, seat: number, name: string) => {
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
          `${foundTicket?.name} - ${name} is already ${
            exact?.status == "Confirmed" ? "sold" : exact?.status
          }.`
        );
      } else {
        handleAddToCart(foundTicket, 1, seat, `${foundTicket?.name} - ${name}`);
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
    <div className="ice1-layout-wrapper">
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
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 2150.58 3047.76"
      >
        <g>
          <rect width="2150.58" height="3047.76" />
          <rect className="st10" y="2924.85" width="2150.58" height="36.98" />
          <rect className="st10" y="27.31" width="2150.58" height="36.98" />
        </g>

        <text
          className="st4"
          transform="translate(1595.84 172.49) scale(.69 1)"
        >
          <tspan x="0" y="0">
            4TH FLOOR
          </tspan>
        </text>
        <text className="st4" transform="translate(390.73 172.49) scale(.69 1)">
          <tspan x="0" y="0">
            5TH FLOOR
          </tspan>
        </text>
        <g  className={` ${getClassNames("4th Floor", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("4th Floor", 1, "Section 1")
          }>
          <path
            className="st10"
            d="M2032.14,193.71v532.39h-525.84V193.71h525.84M2038.14,187.71h-537.84v544.39h537.84V187.71h0Z"
          />
          <g>
            <rect
              className="st10"
              x="1629.25"
              y="613.57"
              width="279.95"
              height="57"
            />
            <text className="st6" transform="translate(1650.3 656.87)">
              <tspan x="0" y="0">
                LOUNGE
              </tspan>
            </text>
          </g>
          <text
            className="st7"
            transform="translate(1584.44 522.89) scale(.8 1)"
          >
            <tspan x="0" y="0">
              VIP
            </tspan>
          </text>
        </g>
        <path
          className="st10"
          d="M1057.24,193.71v532.39H71V193.71h986.23M1063.24,187.71H65v544.39h998.23V187.71h0Z"
        />
        <g className={` ${getClassNames("5th Floor", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("5th Floor", 1, "Section 1")
          }>
          <g>
            <rect
              className="st14"
              x="793.37"
              y="628.06"
              width="201.89"
              height="101.04"
            />
            <path
              className="st10"
              d="M992.26,631.06v95.04h-195.89v-95.04h195.89M998.26,625.06h-207.89v107.04h207.89v-107.04h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(864.85 705.88) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("5th Floor", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("5th Floor", 2, "Section 2")
          }>
          <g>
            <rect
              className="st14"
              x="572.27"
              y="628.06"
              width="201.89"
              height="101.04"
            />
            <path
              className="st10"
              d="M771.16,631.06v95.04h-195.89v-95.04h195.89M777.16,625.06h-207.89v107.04h207.89v-107.04h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(643.75 705.88) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("5th Floor", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("5th Floor", 3, "Section 3")
          }>
          <g>
            <rect
              className="st14"
              x="351.17"
              y="628.06"
              width="201.89"
              height="101.04"
            />
            <path
              className="st10"
              d="M550.06,631.06v95.04h-195.89v-95.04h195.89M556.06,625.06h-207.89v107.04h207.89v-107.04h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(422.65 705.88) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("5th Floor", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("5th Floor", 4, "Section 4")
          }>
          <g>
            <rect
              className="st14"
              x="130.07"
              y="628.06"
              width="201.89"
              height="101.04"
            />
            <path
              className="st10"
              d="M328.96,631.06v95.04h-195.89v-95.04h195.89M334.96,625.06H127.07v107.04h207.89v-107.04h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(201.55 705.88) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <path
          className="st10"
          d="M1057.24,864.92v532.39H71v-532.39h986.23M1063.24,858.92H65v544.39h998.23v-544.39h0Z"
        />
        <g>
          <path
            className="st12"
            d="M457.91,1374.49c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
          />
          <path
            className="st10"
            d="M457.91,1301.95c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M457.91,1295.95c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
          />
        </g>
        <g>
          <path
            className="st12"
            d="M545.46,1374.49c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
          />
          <path
            className="st10"
            d="M545.46,1301.95c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M545.46,1295.95c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
          />
        </g>
        <g>
          <path
            className="st12"
            d="M633.02,1374.49c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
          />
          <path
            className="st10"
            d="M633.02,1301.95c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M633.02,1295.95c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
          />
        </g>
        <g>
          <path
            className="st12"
            d="M720.57,1374.49c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
          />
          <path
            className="st10"
            d="M720.57,1301.95c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M720.57,1295.95c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
          />
        </g>
        <g>
          <path
            className="st12"
            d="M808.13,1374.49c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
          />
          <path
            className="st10"
            d="M808.13,1301.95c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M808.13,1295.95c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
          />
        </g>
        <g>
          <rect
            className="st10"
            x="382.02"
            y="1122"
            width="365.3"
            height="57"
          />
          <text className="st6" transform="translate(402.38 1165.3)">
            <tspan x="0" y="0">
              3RD FLOOR
            </tspan>
          </text>
        </g>
        <g
          className={` ${getClassNames("3rd Floor High-Top Tables", 8)}`}
          data-seat="8"
          onClick={() =>
            handleClick("3rd Floor High-Top Tables", 8, "Section 8")
          }
        >
          <g>
            <rect
              className="st16"
              x="68"
              y="974.42"
              width="123.84"
              height="106.62"
            />
            <path
              className="st10"
              d="M188.84,977.42v100.62h-117.84v-100.62h117.84M194.84,971.42H65v112.62h129.84v-112.62h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(97.46 1056.56) scale(.8 1)"
          >
            <tspan x="0" y="0">
              8
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("3rd Floor Bowling Lanes", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 1, "Section 1")
          }>
          <g>
            <rect
              className="st17"
              x="910.76"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M1014.1,864.92v151.39h-100.34v-151.39h100.34M1020.1,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text
            className="st3"
            transform="translate(934.46 968.55) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("3rd Floor Bowling Lanes", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 2, "Section 2")
          }>
          <g>
            <rect
              className="st17"
              x="787.99"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M891.34,864.92v151.39h-100.34v-151.39h100.34M897.34,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text className="st3" transform="translate(811.7 968.55) scale(.8 1)">
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("3rd Floor Bowling Lanes", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 3, "Section 3")
          }>
          <g>
            <rect
              className="st17"
              x="665.23"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M768.57,864.92v151.39h-100.34v-151.39h100.34M774.57,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text
            className="st3"
            transform="translate(688.94 968.55) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("3rd Floor Bowling Lanes", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 4, "Section 4")
          }>
          <g>
            <rect
              className="st17"
              x="542.46"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M645.81,864.92v151.39h-100.34v-151.39h100.34M651.81,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text
            className="st3"
            transform="translate(566.17 968.55) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("3rd Floor Bowling Lanes", 5)}`}
          data-seat="5"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 5, "Section 5")
          }>
          <g>
            <rect
              className="st17"
              x="419.7"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M523.04,864.92v151.39h-100.34v-151.39h100.34M529.04,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text
            className="st3"
            transform="translate(443.41 968.55) scale(.8 1)"
          >
            <tspan x="0" y="0">
              5
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("3rd Floor Bowling Lanes", 6)}`}
          data-seat="6"
          onClick={() =>
            handleClick("3rd Floor Bowling Lanes", 6, "Section 6")
          }>
          <g>
            <rect
              className="st17"
              x="296.93"
              y="861.92"
              width="106.35"
              height="157.39"
            />
            <path
              className="st10"
              d="M400.28,864.92v151.39h-100.34v-151.39h100.34M406.28,858.92h-112.34v163.39h112.34v-163.39h0Z"
            />
          </g>
          <text
            className="st3"
            transform="translate(320.64 968.55) scale(.8 1)"
          >
            <tspan x="0" y="0">
              6
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("3rd Floor High-Top Tables", 7)}`}
          data-seat="7"
          onClick={() =>
            handleClick("3rd Floor High-Top Tables", 7, "Section 7")
          }>
          <g>
            <rect
              className="st16"
              x="68"
              y="1177.37"
              width="123.84"
              height="106.62"
            />
            <path
              className="st10"
              d="M188.84,1180.37v100.62h-117.84v-100.62h117.84M194.84,1174.37H65v112.62h129.84v-112.62h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(97.46 1258.93) scale(.8 1)"
          >
            <tspan x="0" y="0">
              7
            </tspan>
          </text>
        </g>
        <path
          className="st10"
          d="M696.73,1494.44v1004.56H71v-1004.56h625.73M702.73,1488.44H65v1016.56h637.73v-1016.56h0Z"
        />
        <g>
          <rect
            className="st10"
            x="199.37"
            y="2392.56"
            width="365.3"
            height="57"
          />
          <text className="st6" transform="translate(224.39 2435.86)">
            <tspan x="0" y="0">
              1ST FLOOR
            </tspan>
          </text>
        </g>
        <g className={` ${getClassNames("1st Floor Tables", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("1st Floor Tables", 3, "Section 3")
          }>
          <g>
            <rect
              className="st0"
              x="68"
              y="1690.16"
              width="109.81"
              height="155.12"
            />
            <path
              className="st10"
              d="M174.81,1693.16v149.12h-103.81v-149.12h103.81M180.81,1687.16h-115.81v161.12h115.81v-161.12h0Z"
            />
          </g>
          <text className="st2" transform="translate(89.83 1796.3) scale(.8 1)">
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("1st Floor Booths", 1, "Section 1")
          }>
          <g>
            <path
              className="st13"
              d="M154.07,1615.05c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M154.07,1542.51c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M154.07,1536.51c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(136.81 1594.36) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("1st Floor Booths", 2, "Section 2")
          }>
          <g>
            <path
              className="st13"
              d="M240.73,1615.05c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M240.73,1542.51c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M240.73,1536.51c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(223.45 1594.36) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("1st Floor Booths", 3, "Section 3")
          }>
          <g>
            <path
              className="st13"
              d="M327.39,1615.05c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M327.39,1542.51c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M327.39,1536.51c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(310.1 1594.36) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("1st Floor Booths", 4, "Section 4")
          }>
          <g>
            <path
              className="st13"
              d="M414.05,1615.05c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M414.05,1542.51c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M414.05,1536.51c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(396.74 1594.36) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 5)}`}
          data-seat="5"
          onClick={() =>
            handleClick("1st Floor Booths", 5, "Section 5")
          }>
          <g>
            <path
              className="st13"
              d="M646.1,1615.05c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M646.1,1542.51c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M646.1,1536.51c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(628.83 1594.36) scale(.8 1)"
          >
            <tspan x="0" y="0">
              5
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Booths", 6)}`}
          data-seat="6"
          onClick={() =>
            handleClick("1st Floor Booths", 6, "Section 6")
          }>
          <g>
            <path
              className="st13"
              d="M646.1,1707.3c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M646.1,1634.76c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M646.1,1628.76c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st8"
            transform="translate(628.83 1684.93) scale(.8 1)"
          >
            <tspan x="0" y="0">
              6
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Tables", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("1st Floor Tables", 4, "Section 4")
          }>
          <g>
            <rect
              className="st0"
              x="237.72"
              y="1690.16"
              width="109.81"
              height="155.12"
            />
            <path
              className="st10"
              d="M344.52,1693.16v149.12h-103.81v-149.12h103.81M350.52,1687.16h-115.81v161.12h115.81v-161.12h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(263.15 1796.3) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Tables", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("1st Floor Tables", 1, "Section 1")
          }>
          <g>
            <rect
              className="st0"
              x="68"
              y="1920.39"
              width="109.81"
              height="155.12"
            />
            <path
              className="st10"
              d="M174.81,1923.39v149.12h-103.81v-149.12h103.81M180.81,1917.39h-115.81v161.12h115.81v-161.12h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(89.83 2025.45) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Tables", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("1st Floor Tables", 2, "Section 2")
          }>
          <g>
            <rect
              className="st0"
              x="237.72"
              y="1920.39"
              width="109.81"
              height="155.12"
            />
            <path
              className="st10"
              d="M344.52,1923.39v149.12h-103.81v-149.12h103.81M350.52,1917.39h-115.81v161.12h115.81v-161.12h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(263.15 2025.45) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("1st Floor Tables", 5)}`}
          data-seat="5"
          onClick={() =>
            handleClick("1st Floor Tables", 5, "Section 5")
          }>
          <g>
            <rect
              className="st0"
              x="589.92"
              y="1924.99"
              width="109.81"
              height="155.12"
            />
            <path
              className="st10"
              d="M696.73,1927.99v149.12h-103.81v-149.12h103.81M702.73,1921.99h-115.81v161.12h115.81v-161.12h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(616.34 2025.45) scale(.8 1)"
          >
            <tspan x="0" y="0">
              5
            </tspan>
          </text>
        </g>
        <text className="st1" transform="translate(756.6 2085.46) scale(.8 1)">
          <tspan x="0" y="0">
            DANCE
          </tspan>
          <tspan x="26.27" y="117.62">
            FLOOR
          </tspan>
        </text>
        <g>
          <g>
            <rect x="4.79" y="2754.75" width="329.69" height="173.1" />
            <path
              className="st10"
              d="M331.48,2757.75v167.1H7.79v-167.1h323.69M337.48,2751.75H1.79v179.1h335.69v-179.1h0Z"
            />
          </g>
          <text
            className="st5"
            transform="translate(67.35 2865.63) scale(.8 1)"
          >
            <tspan x="0" y="0">
              DOOR
            </tspan>
          </text>
        </g>
        <g>
          <g>
            <rect x="736.11" y="2754.75" width="381.29" height="173.1" />
            <path
              className="st10"
              d="M1114.4,2757.75v167.1h-375.29v-167.1h375.29M1120.4,2751.75h-387.29v179.1h387.29v-179.1h0Z"
            />
          </g>
          <text
            className="st5"
            transform="translate(808.93 2865.63) scale(.8 1)"
          >
            <tspan x="0" y="0">
              STAGE
            </tspan>
          </text>
        </g>
        <path
          className="st10"
          d="M2124.56,1494.44v1004.56h-625.73v-1004.56h625.73M2130.56,1488.44h-637.73v1016.56h637.73v-1016.56h0Z"
        />
        <g>
          <rect
            className="st10"
            x="1629.05"
            y="1417.11"
            width="365.3"
            height="57"
          />
          <text className="st6" transform="translate(1647.82 1460.41)">
            <tspan x="0" y="0">
              2ND FLOOR
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Yellow", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("2nd Floor Yellow", 1, "Section 1")
          }>
          <g>
            <path
              className="st13"
              d="M1700.97,1707.3c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M1700.97,1634.76c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M1700.97,1628.76c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st9"
            transform="translate(1683.7 1683.08) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Yellow", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("2nd Floor Yellow", 2, "Section 2")
          }>
          <g>
            <path
              className="st13"
              d="M1700.97,1819.25c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M1700.97,1746.71c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M1700.97,1740.71c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st9"
            transform="translate(1683.7 1795.93) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Yellow", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("2nd Floor Yellow", 4, "Section 4")
          }>
          <g>
            <path
              className="st13"
              d="M2030.12,1707.3c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M2030.12,1634.76c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M2030.12,1628.76c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st9"
            transform="translate(2012.86 1683.08) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Yellow", 5)}`}
          data-seat="5"
          onClick={() =>
            handleClick("2nd Floor Yellow", 5, "Section 5")
          }>
          <g>
            <path
              className="st13"
              d="M2030.12,1819.25c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M2030.12,1746.71c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M2030.12,1740.71c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st9"
            transform="translate(2012.86 1795.93) scale(.8 1)"
          >
            <tspan x="0" y="0">
              5
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Yellow", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("2nd Floor Yellow", 3, "Section 3")
          }>
          <g>
            <path
              className="st13"
              d="M1700.97,1931.2c-20.83,0-37.77-16.94-37.77-37.77s16.94-37.77,37.77-37.77,37.77,16.94,37.77,37.77-16.94,37.77-37.77,37.77Z"
            />
            <path
              className="st10"
              d="M1700.97,1858.66c19.2,0,34.77,15.57,34.77,34.77s-15.57,34.77-34.77,34.77-34.77-15.57-34.77-34.77,15.57-34.77,34.77-34.77M1700.97,1852.66c-22.48,0-40.77,18.29-40.77,40.77s18.29,40.77,40.77,40.77,40.77-18.29,40.77-40.77-18.29-40.77-40.77-40.77h0Z"
            />
          </g>
          <text
            className="st9"
            transform="translate(1683.7 1910.16) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Tables", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("2nd Floor Tables", 4, "Section 4")
          }>
          <g>
            <rect
              className="st18"
              x="1640.71"
              y="2065.88"
              width="345.55"
              height="130.26"
            />
            <path
              className="st10"
              d="M1983.26,2068.88v124.27h-339.55v-124.27h339.55M1989.26,2062.88h-351.55v136.27h351.55v-136.27h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1784.02 2157.01) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("2nd Floor Booths", 1, "Section 1")
          }>
          <g>
            <rect
              className="st11"
              x="1495.84"
              y="1871.94"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1599.9,1874.94v93.46h-101.06v-93.46h101.06M1605.9,1868.94h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1519.9 1949.02) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("2nd Floor Booths", 2, "Section 2")
          }>
          <g>
            <rect
              className="st11"
              x="1495.84"
              y="1778.48"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1599.9,1781.48v93.46h-101.06v-93.46h101.06M1605.9,1775.48h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1519.9 1850.75) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("2nd Floor Booths", 3, "Section 3")
          }>
          <g>
            <rect
              className="st11"
              x="1495.84"
              y="1685.02"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1599.9,1688.02v93.46h-101.06v-93.46h101.06M1605.9,1682.02h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1519.9 1758.47) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 4)}`}
          data-seat="4"
          onClick={() =>
            handleClick("2nd Floor Booths", 4, "Section 4")
          }>
          <g>
            <rect
              className="st11"
              x="1495.84"
              y="1591.57"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1599.9,1594.57v93.46h-101.06v-93.46h101.06M1605.9,1588.57h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1519.9 1664.19) scale(.8 1)"
          >
            <tspan x="0" y="0">
              4
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 6)}`}
          data-seat="6"
          onClick={() =>
            handleClick("2nd Floor Booths", 6, "Section 6")
          }>
          <g>
            <rect
              className="st11"
              x="1603.73"
              y="1491.44"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1707.79,1494.44v93.46h-101.06v-93.46h101.06M1713.79,1488.44h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1631.71 1564.02) scale(.8 1)"
          >
            <tspan x="0" y="0">
              6
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 5)}`}
          data-seat="5"
          onClick={() =>
            handleClick("2nd Floor Booths", 5, "Section 5")
          }>
          <g>
            <rect
              className="st11"
              x="1495.84"
              y="1491.44"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1599.9,1494.44v93.46h-101.06v-93.46h101.06M1605.9,1488.44h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1519.9 1564.02) scale(.8 1)"
          >
            <tspan x="0" y="0">
              5
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Booths", 7)}`}
          data-seat="7"
          onClick={() =>
            handleClick("2nd Floor Booths", 7, "Section 7")
          }>
          <g>
            <rect
              className="st11"
              x="1704.8"
              y="1491.44"
              width="107.06"
              height="99.46"
            />
            <path
              className="st10"
              d="M1808.86,1494.44v93.46h-101.06v-93.46h101.06M1814.86,1488.44h-113.06v105.46h113.06v-105.46h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1728.86 1564.02) scale(.8 1)"
          >
            <tspan x="0" y="0">
              7
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Tables", 1)}`}
          data-seat="1"
          onClick={() =>
            handleClick("2nd Floor Tables", 1, "Section 1")
          }>
          <g>
            <rect
              className="st18"
              x="1659.56"
              y="2251.76"
              width="87.02"
              height="212.47"
            />
            <path
              className="st10"
              d="M1743.58,2254.76v206.47h-81.02v-206.47h81.02M1749.58,2248.76h-93.02v218.47h93.02v-218.47h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1671.5 2383.28) scale(.8 1)"
          >
            <tspan x="0" y="0">
              1
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Tables", 2)}`}
          data-seat="2"
          onClick={() =>
            handleClick("2nd Floor Tables", 2, "Section 2")
          }>
          <g>
            <rect
              className="st18"
              x="1768.19"
              y="2251.76"
              width="87.02"
              height="212.47"
            />
            <path
              className="st10"
              d="M1852.21,2254.76v206.47h-81.02v-206.47h81.02M1858.21,2248.76h-93.02v218.47h93.02v-218.47h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1782.24 2383.28) scale(.8 1)"
          >
            <tspan x="0" y="0">
              2
            </tspan>
          </text>
        </g>
        <g  className={` ${getClassNames("2nd Floor Tables", 3)}`}
          data-seat="3"
          onClick={() =>
            handleClick("2nd Floor Tables", 3, "Section 3")
          }>
          <g>
            <rect
              className="st18"
              x="1876.82"
              y="2251.76"
              width="87.02"
              height="212.47"
            />
            <path
              className="st10"
              d="M1960.84,2254.76v206.47h-81.02v-206.47h81.02M1966.84,2248.76h-93.02v218.47h93.02v-218.47h0Z"
            />
          </g>
          <text
            className="st2"
            transform="translate(1892.97 2383.28) scale(.8 1)"
          >
            <tspan x="0" y="0">
              3
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Ice1Layout;
