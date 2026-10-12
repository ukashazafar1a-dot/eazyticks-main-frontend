import PageError from "@/components/PageError";
import { baseURL } from "@/lib/utils";
import { permanentRedirect, redirect } from "next/navigation";
import React from "react";
import PrivateBookingPage from "../_components/PrivateBookingPage";
import ElevenLayout from "./_components/Index";

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
    const result = await response?.json();
    return result;
  } catch (error) {
    return null;
  }
};

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const slug = params.slug;
  const secret = searchParams?.sec;
  const result = await getData(slug, secret);
  if (!result || !slug || !result.succeeded) {
    return {};
  }
  const { data } = result;
  if (!data) {
    return {};
  }
  //console.log('result  data', result);
  const title = `${data?.name ? data?.name : slug} - Event`;
  const description = `${
    data?.name ? data?.name + " event organized by " : ""
  } ${
    data?.organizer?.name ? data?.organizer.name : ""
  }. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/events/${data?.slug ? data?.slug : slug}`;
  const AppLogo =
    "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png";
  const image = data?.images ? data?.images[0] : AppLogo;
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
  // const spSlug = process.env.NEXT_PUBLIC_ELEVEN_SLUG?.split(",");
  // if (!spSlug?.includes(String(result?.data?.id))) {
  //   redirect("/events/" + params?.slug + "/book-ticket");
  // }
  // if (result && !result?.succeeded) {
  //   return <PrivateBookingPage />;
  // } else {
  //   return <ElevenLayout content={result?.data} />;
  // }
};

export default page;
