"use client";

import React, { useEffect, useState } from "react";
import { getOrderTickets } from "@/helpers/businessRequests";
import { useSearchParams } from "next/navigation";
import PageError from "@/components/PageError";
import SectionLoader from "@/components/SectionLoader";
import EventTickets from "./EventTickets";
import "@/assets/tickets.css";

function IndexMyOrder() {
  const params: any = useSearchParams();
  const orderId = params.get("orderId");
  const [order, setOrder] = useState({
    event: {},
    eventTickets: [],
    parkingTickets: [],
    shopItemTickets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      const { data:response } = await getOrderTickets(orderId);
      //console.log(response)
      if (response && response?.succeeded) {
        setOrder(response?.data);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <EventTickets order={order} />
      )}
    </div>
  );
}

export default IndexMyOrder;
