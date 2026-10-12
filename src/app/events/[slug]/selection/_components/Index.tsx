"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import SelectionTable from "./SelectionTable";
import { useParams } from "next/navigation";
import { useCart } from "react-use-cart";
import { getSelectionData } from "@/helpers/businessRequests";
import PageError from "@/components/PageError";
import Banner from "../../_components/Banner";

const EventSelectionPage = ({ content }: any) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const slug = params?.slug;

  const { emptyCart } = useCart();

  const getNewData = async () => {
    try {
      setLoading(true);
      const response: any = await getSelectionData(slug);
      //console.log(response);
      if(response && response?.succeeded){
        setEvent(response?.data);
        setLoading(false);
        setError(false); 
      }else{
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (content) {
      setEvent(content);
      setError(false);
    } else {
      setError(true);
    }
  }, [content]);

  useEffect(() => {
    emptyCart();
  }, []);
  //console.log(event)
  return (
    <div
      className={`selection--tamplate position-relative ${
        loading ? "small--loader" : ""
      }`}
    >
      {error ? (
        <PageError />
      ) : (
        <>
          <Banner event={event} />
          <SelectionTable event={event} handleRefetch={getNewData} />
        </>
      )}
    </div>
  );
};

export default EventSelectionPage;
