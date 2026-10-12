"use client";
import { getSelectionData } from "@/helpers/businessRequests";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import SeatingLayout from "./SeatingLayout";
import './style.css';
import Banner from "../../_components/Banner";

type props = {
  content: any;
};

const SeatingLayoutPage = ({ content }: props) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { emptyCart } = useCart();
  const params = useParams();
  const slug = params?.slug;

  const getNewData = async () => {
    try {
      setLoading(true);
      const response: any = await getSelectionData(slug);
      //console.log('inside handleRefetch',response);
      if(response && response?.succeeded){
        setEvent(response?.data);
        setLoading(false);
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
    }
  }, [content]);
  useEffect(() => {
    emptyCart();
  }, []);
  //console.log(content,event);
  return (
    <div
      className={`selection--tamplate position-relative ${
        loading ? "small--loader" : ""
      }`}
    >
      <Banner event={event}/>
      <SeatingLayout event={event} handleRefetch={getNewData} />
    </div>
  );
};

export default SeatingLayoutPage;
