import React from "react";
import IndexTicketDetails from "./_components/IndexEvent";
import { Site } from "@/helpers/Site";
import "@/assets/swiper.css";
import { normalizeResponse } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 0;
const apiSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/Event/Detail?`;

const getData = async (slug: any, secret = null) => {
  try {
    const data = await fetch(`${apiSlug}slug=${slug}&secret=${secret}`);
    //console.log(data);
    // if (!data?.ok) {
    //   const res = await data?.json();
    //   console.log(res);
    //   return null;
    // }
    const result = await data.json();
    return normalizeResponse(result,data?.status);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const slug = params.slug;
  const secret = searchParams?.sec;
  const result = await getData(slug, secret);
  //console.log(result)
  if (!result || !slug || !result?.succeeded) {
    return {};
  }
  const { data } = result;
  //console.log("result  data", data);
  const title = `${data?.name ? data?.name : slug} - Event`;
  const description = `${
    data?.name ? data?.name + " event organized by " : ""
  } ${
    data?.organizer?.name ? data?.organizer?.name : ""
  }. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/events/${data?.slug ? data?.slug : slug}`;
  const image = data?.images ? data.images[0] : Site?.logo;
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
  return <IndexTicketDetails content={result} />;
};
export default page;
