import { redirect } from "next/navigation";
import React from "react";
import EventSelectionPage from "./_components/Index";
import PageError from "@/components/PageError";
import PrivateBookingPage from "../_components/PrivateBookingPage";

export const runtime = "edge";
export const revalidate = 0;
const newSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/Event/Layout/tickets?`;

const getData = async (slug: any, secret: any = null) => {
  try {
    //console.log(slug, secret);
    const data = await fetch(
      `${newSlug}slug=${slug}&secret=${secret ? secret : ""}`
    );
    const result = await data.json();
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
  const description = `${data?.name} event organized by ${data?.organizer?.name}. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/events/${data?.slug ? data?.slug : slug}`;
  const AppLogo =
    "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png";
  const image = data?.image ? data?.image : AppLogo;
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
  if (!result) return <PageError />;
  //console.log(result);
  const spSlug = process.env.NEXT_PUBLIC_SP_SLUG?.split(",");
  if (!spSlug?.includes(String(result?.data?.id))) {
    redirect("/events/" + params?.slug + "/book-ticket");
  }
  if (result && !result?.succeeded) {
    return <PrivateBookingPage />;
  } else {
    return <EventSelectionPage content={result?.data} />;
  }
};

export default page;
