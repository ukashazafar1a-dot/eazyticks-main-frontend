import PageError from "@/components/PageError";
import React from "react";
import { Site } from "@/helpers/Site";
import IndexBookTicket from "@/client/Hybrid/IndexBookTicket";
import PrivateBookingPage from "../_components/PrivateBookingPage";
import { baseURL, normalizeResponse } from "@/lib/utils";
import EventCompleted from "./_components/EventCompleted";

export const runtime = "edge";
export const revalidate = 0;
const apiSlug = `${baseURL}/Event/Hybrid/tickets?`;

const getData = async (slug: any, secret = null) => {
  try {
    let params = ["slug=" + slug];
    if (secret) params.push("secret=" + secret);
    //params.join("&")
    const data = await fetch(`${apiSlug}slug=${slug}&secret=${secret}`);
    // if (!data?.ok) {
    //   const res = await data?.json();
    //   console.log(res);
    //   return null;
    // }
    //console.log(data)
    const result = await data.json();
    //console.log(result);
    return normalizeResponse(result,data?.status);
  } catch (error) {
    return null;
  }
};

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const { slug } = params;
  const result = await getData(slug, searchParams?.sec);
  //console.log(result);
  if (!result || !slug || !result.succeeded) {
    return {};
  }
  const { data } = result;
  if (!data) {
    return {};
  }
  //console.log("result  data", data);
  const title = `${data?.name ? data?.name : slug} - Event`;
  const description = `${data?.name ? data?.name : slug} event organized by ${
    data?.organizer?.name ? data?.organizer?.name : "Eazyticks"
  }. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/events/${slug}`;
  const image = data?.image ? data?.image : Site?.logo;
  return {
    title,
    description,
    alternates: {
      canonical: URL,
    },
    openGraph: {
      title,
      description,
      url: URL,
      images: [
        {
          url: image,
          width: 600,
          height: 800,
        },
      ],
    },
    twitter: {
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
    },
  };
}

const page = async ({ params, searchParams }: any) => {
  const result = await getData(params?.slug, searchParams?.sec);
  //console.log(result);
  if (!result) return <PageError error={result} />;
  if (result && !result?.succeeded) {
    if (result?.data) {
      if (result?.data?.status == "Completed") {
        return <EventCompleted />;
      } else {
        return <PrivateBookingPage />;
      }
    } else {
      return <PageError error={result} />;
    }
  } else {
    return <IndexBookTicket content={result?.data} />;
  }
};

export default page;
