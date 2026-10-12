"use client";

import * as htmlToImage from "html-to-image";
import moment from "moment";

// Add Postfixes to the cart ID's - Start

let ticketPf = "1",
  parkingPf = "2",
  shopPf = "3",
  dealsPf = "4";

export function AddIdPostFix(id, type) {
  switch (type) {
    case "tickets":
      return parseInt(id + ticketPf);
    case "parkings":
      return parseInt(id + parkingPf);
    case "shop":
      return parseInt(id + shopPf);
    case "deal":
      return parseInt(id + dealsPf);
    default:
      return id;
  }
}

export function removeIdPostFix(id, type) {
  switch (type) {
    case "tickets":
      return Math.floor(id / 10);
    case "parkings":
      return Math.floor(id / 10);
    case "shop":
      return Math.floor(id / 10);
    case "deal":
      return Math.floor(id / 10);
    default:
      return id;
  }
}

// Add Postfixes to the cart ID's - End

export function hasExtraFields(items) {
  let has = false;
  items.forEach((item) => {
    if (item?.extraFields?.length > 0) has = true;
  });
  return has;
}

export function getNonEmptyFields(obj) {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );
}

export function parseUrlParams(obj) {
  return Object.fromEntries([...obj]);
}

export function getObjectToParams(obj) {
  let value = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      value.push(key + "=" + obj[key]);
    }
  }
  return value.join("&");
}

export function setAllFieldsEmpty(obj) {
  let value = {};
  for (let key in obj) {
    value[key] = "";
  }
  return value;
}

export const openSidebar = () => {
  const sidebarMenu = document.getElementById("slide");
  const body = document.querySelector("body");
  if (sidebarMenu) {
    sidebarMenu.style.transition = "all 0.9s ease";
    sidebarMenu.style.transform = "translateX(0%)";
    if (body) {
      body.style.overflow = "hidden";
    }
    return true;
  }
  return false;
};

export const closeSidebar = () => {
  const sidebarMenu = document.getElementById("slide");
  const body = document.querySelector("body");
  if (sidebarMenu) {
    sidebarMenu.style.transition = "all 0.9s ease";
    sidebarMenu.style.transform = "translateX(100%)";
    if (body) {
      body.style.overflow = "auto";
    }
    return true;
  }
  return false;
};

export const sliderUp = () => {
  const slider = document.getElementById("SearchDrawer");
  if (slider) {
    slider.style.transition = "all 0.5s ease";
    slider.style.transform = "translateY(0%)";
  }
};

export const sliderDown = () => {
  const slider = document.getElementById("SearchDrawer");
  if (slider) {
    slider.style.transition = "all 0.5s ease";
    slider.style.transform = "translateY(100%)";
  }
};

export const scrollToTop = () => {
  if (typeof window !== undefined) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const getExtrafieldsFilteredOrder = (
  event,
  extraFields,
  email,
  cartTotal
) => {
  let tickets = [];
  let parking = [];
  let shopitems = [];
  let deals = [];

  extraFields.forEach((item) => {
    switch (item.type) {
      case "tickets": {
        const { type, ...otherFields } = item;
        tickets.push({
          ...otherFields,
          id: removeIdPostFix(item.id, item.type),
        });
        break;
      }
      case "parkings": {
        const { type, ...otherFields } = item;
        parking.push({
          ...otherFields,
          id: removeIdPostFix(item.id, item.type),
        });
        break;
      }
      case "shop":
        shopitems.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.qty,
          price: item.price,
        });
        break;

      default:
        break;
    }
  });

  const order = {
    email: email ? email : null,
    eventId: event.id,
    totalBill: cartTotal,
    tickets,
    parking,
    shopitems,
    deals,
  };
  return order;
};

export const getFilteredOrder = (event, items, email, cartTotal) => {
  let tickets = [];
  let parking = [];
  let shopitems = [];
  let deals = [];

  items.forEach((item) => {
    switch (item.type) {
      case "tickets":
        tickets.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.itemTotal,
        });
        break;
      case "parkings":
        parking.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.itemTotal,
        });
        break;
      case "shop":
        shopitems.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.itemTotal,
        });
        break;

      default:
        break;
    }
  });

  const order = {
    email: email ? email : null,
    eventId: event.id,
    totalBill: cartTotal,
    tickets,
    parking,
    shopitems,
    deals,
  };

  return order;
};

export const downloadTicket = async (elem, number) => {
  try {
    const dataUrl = await htmlToImage.toPng(elem, {
      style: {
        fontFamily: "sans-serif",
      },
    });
    // download image
    const link = document.createElement("a");
    link.download = "ticket#" + number + ".png";
    link.href = dataUrl;
    link.click();
    return Promise.resolve(true);
  } catch (error) {
    console.log("Error downloading ticket:", error);
    return Promise.reject(false);
  }
};

export const downloadAllTickets = async (elem) => {
  try {
    let index = 1;
    const allTickets = document.querySelectorAll(elem);
    for (const ticket of allTickets) {
      // Download ticket
      await downloadTicket(ticket, index);
      // Add delay before next (skip after last one)
      if (index < allTickets?.length) {
        await new Promise((res) => setTimeout(res, 500));
      }
      index++;
    }
    return Promise.resolve(true);
  } catch (error) {
    console.log("Error downloading all tickets:", error);
    return Promise.reject(false);
  }
};

export const getAddress = function (event) {
  let addressString = event?.address;
  if (event?.city) addressString += ", " + event?.city;
  if (event?.state) addressString += ", " + event?.state;
  if (event?.country) addressString += ", " + event?.country;
  return addressString;
};

export const getTodayDate = function () {
  return moment(new Date()).format("MM/DD/YYYY");
};

export const getDaysRange = function (days) {
  const today = new Date();
  // ✅ Get the first day of the current week (Sunday)
  let firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
  firstDay = moment(firstDay).format("YYYY-MM-DD");
  // ✅ Get the last day of the current week (Saturday)
  let lastDay = new Date(
    today.setDate(today.getDate() - today.getDay() + (days - 1))
  );
  lastDay = moment(lastDay).format("YYYY-MM-DD");

  return {
    firstDay,
    lastDay,
  };
};

export const getImgSrcs = (src) => {
  if (!src) return null;
  let w256 = src.replace("upload/", "upload/f_auto,w_256/");
  let w512 = src.replace("upload/", "upload/f_auto,w_512/");
  let w768 = src.replace("upload/", "upload/f_auto,w_786/");
  let w1024 = src.replace("upload/", "upload/f_auto,w_1024/");
  let w1280 = src.replace("upload/", "upload/f_auto,w_1280/");
  let srcset =
    w256 +
    " 256w," +
    w512 +
    " 512w," +
    w768 +
    " 768w," +
    w1024 +
    " 1024w," +
    w1280 +
    " 1280w";
  src = w512;
  return { srcset, src };
};

export const getImgSets = (src, type) => {
  if (!src) return null;
  let w750 = src.replace("upload/", "upload/f_auto,w_750/");
  let w2048 = src.replace("upload/", "upload/f_auto,w_2048/");
  if (type === "width") {
    let srcset =
      "image-set(url('" + w750 + "') 750w, url('" + w2048 + "') 2048w)";
    src = "url(" + w750 + ")";
    return { srcset, src };
  } else {
    let srcset = "url(" + w750 + ") 1x, url(" + w2048 + ") 2x";
    src = "url(" + w750 + ")";
    return { srcset, src };
  }
};

export const calculateFees = function (items, fee) {
  let totalFee = 0,
    shopItemsFee = 0;
  if (fee === 0) return 0;
  items.forEach((item) => {
    if (item.itemTotal === 0) return;
    if (item.type === "shop") {
      shopItemsFee = fee;
      totalFee += (5 * item.itemTotal) / 100;
    } else {
      totalFee += item.quantity * fee;
      totalFee += (5 * item.itemTotal) / 100;
    }
  });
  return totalFee + shopItemsFee;
};

export const isDeviceMobile = function () {
  if (typeof window !== undefined) {
    return window.innerWidth < 768 ? true : false;
  }
  return true;
};

export const formatPrice = (price) => {
  if (price) {
    // Create a new Intl.NumberFormat object with options for USD currency formatting
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    // Use the formatter to format the price
    return formatter.format(price);
  } else {
    return null;
  }
};

export const returnLayoutOrderObject = (eventId, email, extraInfos) => {
  const transformedItems = extraInfos?.map((item) => ({
    row: item?.row,
    seatNo: item?.seatNo,
    distributionId: item?.distributionId,
    extrafields: item?.extraFields,
  }));
  const newData = {
    email,
    eventId,
    seats: transformedItems,
  };
  return newData;
};

export const returnHybridObject = (user, items) => {
  let layouts = [];
  let normal = {};
  let tickets = [];
  let parking = [];
  let shopitems = [];
  let deals = [];
  //console.log('here are the items you sent',items)
  items.forEach((item) => {
    switch (item.type) {
      case "layout":
        layouts.push({
          row: item?.row,
          seatNo: item?.seatNo,
          distributionId: item?.distributionId,
          extrafields:
            item?.extraFields && item?.extraFields[0]
              ? item?.extraFields[0]
              : [],
        });
        break;
      case "tickets":
        tickets.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.price,
          extraFields: item?.extraFields,
        });
        break;
      case "parkings":
        parking.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.price,
          extraFields: item?.extraFields,
        });
        break;
      case "shop":
        shopitems.push({
          id: removeIdPostFix(item.id, item.type),
          name: item.name,
          qty: item.quantity,
          price: item.price,
        });
        break;

      default:
        break;
    }
  });

  if (
    tickets?.length === 0 &&
    parking?.length === 0 &&
    shopitems?.length === 0 &&
    deals?.length === 0
  ) {
    normal = null;
  } else {
    normal = { tickets, parking, shopitems, deals };
  }
  const order = {
    eventId: user?.eventId,
    email: user?.email ? user?.email : null,
    firstName: user?.firstName ? user?.firstName : null,
    lastName: user?.lastName ? user?.lastName : null,
    phoneNumber: user?.phoneNumber ? user?.phoneNumber : null,
    normal,
    layout: layouts && layouts?.length > 0 ? { seats: layouts } : null,
  };

  return order;
};
