"use client";
import PageError from "@/components/PageError";
import { getSelectionData } from "@/helpers/businessRequests";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import LayoutTable from "./LayoutTable";
import Banner from "../../_components/Banner";
import '@/assets/eleven.css';


const ElevenLayout = ({ content }: any) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const slug = params?.slug;

  const { emptyCart } = useCart();

  const getNewData = async () => {
    try {
      setLoading(true);
      const response: any = await getSelectionData(slug);
      //console.log(response);
      if (response) {
        setEvent(response);
        setLoading(false);
      } else {
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
  if (content?.status == "Error") return <PageError />;
  //console.log(event);
  return (
    <div
      className={`selection--tamplate position-relative ${
        loading ? "small--loader" : ""
      }`}
    >
      <Banner event={event} />
      <LayoutTable event={event} handleRefetch={getNewData} />
    </div>
  );
};

export default ElevenLayout;
