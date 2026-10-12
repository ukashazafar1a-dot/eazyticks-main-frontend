"use client";
import React, { useEffect, useState } from "react";
import PageError from "@/components/PageError";
import { getUserOrders } from "@/helpers/businessRequests";
import EventCard from "./EventCard";
import NoOrder from "./NoOrder";
import SmallLoader from "@/components/loaders/SmallLoader";

const Tickets = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      const { data: response } = await getUserOrders();
      //console.log(response);
      if (response && response?.succeeded) {
        setOrders(response?.data);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <SmallLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <div>
          <h2 className=" sm:text-3xl text-2xl font-bold mb-4 ">Orders</h2>
          {orders?.length > 0 ? (
            orders.map((order: any) => {
              return <EventCard order={order} key={order.id} />;
            })
          ) : (
            <NoOrder message={`No Order Found.`} />
          )}
        </div>
      )}
    </>
  );
};

export default Tickets;
