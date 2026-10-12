import React from "react";
import { notFound } from "next/navigation";
import PageError from "@/components/PageError";
import Index from "@/client/home/Index";
import { baseURL, normalizeResponse } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 0;

const getData = async () => {
  try {
    const res = await fetch(`${baseURL}/Event`);
    // if (!res.ok) {
    //   console.log(await res?.json());
    //   return notFound();
    // }
    const result = await res.json();
    return normalizeResponse(result);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const page = async () => {
  const response = await getData();
  if (!response || !response?.succeeded) {
    return <PageError error={response} />;
  }
  return <Index content={response?.data} />;
};

export default page;
