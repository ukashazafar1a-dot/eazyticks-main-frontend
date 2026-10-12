import React, { Suspense } from "react";
import IndexOrganizerPage from "./_components/Index";
import Banner from "./_components/Banner";
import PageError from "@/components/PageError";
import SmallLoader from "@/components/loaders/SmallLoader";
import { baseURL } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 0;

async function getData(slug: any) {
  const sort = "Date-Low";
  try {
    const res = await fetch(
      `${baseURL}/Event/profile?Id=${slug}&OrderBy=${sort}`
    );
    if (!res?.ok) {
      return null;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const slug = params.orgId;
  const result = await getData(slug);
  if (!result && !result?.succeeded) {
    return {};
  }
  const { data } = result;
  const title = `${data.orgName} Events - Organizers`;
  const description = `Find the hottest events organized by ${data.orgName} all in one place. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  const URL = `/organizers/${data.id}`;
  const AppLogo =
    "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png";
  const image = data?.icon ? data?.icon.split(";").pop() : AppLogo;
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
          height: 300,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
    robots: {
      index: false,
      follow: true,
      nocache: false,
    },
  };
}

async function OrganizerPage({ params, searchParams }: any) {
  const response = await getData(params?.orgId);
  //console.log('here is the response',response);
  if (!response || !response?.succeeded) return <PageError error={response} />;
  return (
    <Suspense fallback={<SmallLoader />}>
      <div className="organizer-page-template">
        <Banner profile={response?.data} />
        <IndexOrganizerPage organizer={response?.data} />
      </div>
    </Suspense>
  );
}

export default OrganizerPage;
