import IndexBookTicket from "@/client/bookTicket/IndexBookTicket";
import PageError from "@/components/PageError";
import React from "react";
import PrivateBookingPage from "../_components/PrivateBookingPage";
import { permanentRedirect } from "next/navigation";

export const runtime = "edge";
export const revalidate = 0;
const apiSlug = `${process.env.NEXT_PUBLIC_API_URL}/api/Event/tickets?`;

const getData = async function (slug: any, secret = null) {
  try {
    let params = ["slug=" + slug];
    if (secret) params.push("secret=" + secret);
    //params.join("&")
    const data = await fetch(`${apiSlug}slug=${slug}&secret=${secret}`);
    //console.log(data)
    const result = await data.json();
    //console.log(result);
    return result;
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
  const description = `${data?.name} event organized by ${data?.organizer?.name}. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/events/${slug}`;
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
  permanentRedirect(
    `/events/${params?.slug}/checkout${
      searchParams?.sec ? `?sec=${searchParams?.sec}` : ""
    }`
  );
  //const result = await getData(params?.slug, searchParams?.sec);
  //console.log(result);
  // if (!result) return <PageError message={JSON.stringify(result)} />;
  // if (result && !result?.succeeded) {
  //   return <PrivateBookingPage />;
  // } else {
  //   return <IndexBookTicket content={result?.data} />;
  // }
};

export default page;
