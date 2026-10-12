import PageError from "@/components/PageError";
import { Site } from "@/helpers/Site";
import { permanentRedirect, redirect } from "next/navigation";
import React from "react";
import SeatingLayoutPage from "./_components/Index";
import { returnDescription } from "@/app/actions";
import PrivateBookingPage from "../_components/PrivateBookingPage";
import { baseURL } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 0;

const getData = async (slug: any, secret: any = null) => {
  try {
    //console.log(slug, secret);
    const response = await fetch(
      `${baseURL}/Event/layout/tickets?slug=${slug}&secret=${
        secret ? secret : ""
      }`
    );
    if (!response?.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
};

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const slug = params.slug;
  const secret = searchParams?.sec;
  const result = await getData(slug, secret);
  //console.log(result);
  if (!result || !slug || !result.succeeded) {
    return {};
  }
  const { data } = result;
  if (!data) {
    return {};
  }
  //console.log('result  data', result);
  const title = `${data.name ? data?.name : slug} - Event`;
  const description = returnDescription(data?.name, data?.organizer?.name);
  const URL = `/events/${slug}`;
  const image = data?.images ? data?.images[0] : Site?.logo;
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
  permanentRedirect(
    `/events/${params?.slug}/checkout${
      searchParams?.sec ? `?sec=${searchParams?.sec}` : ""
    }`
  );
  // const result = await getData(params?.slug, searchParams?.sec);
  // if (!result) return <PageError />;
  // //console.log(result);
  // const slSlug = process.env.NEXT_PUBLIC_SL_SLUG?.split(",");
  // if (!slSlug?.includes(String(result?.data?.id))) {
  //   redirect("/events/" + params?.slug + "/book-ticket");
  // }
  // if (result && !result?.succeeded) {
  //   return <PrivateBookingPage />;
  // } else {
  //   return <SeatingLayoutPage content={result?.data} />;
  // }
};

export default page;
