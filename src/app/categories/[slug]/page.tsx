import React from "react";
import ExploreEvents from "./_components/Index";
import PageError from "@/components/PageError";
import { baseURL } from "@/lib/utils";

export const runtime = "edge";
export const revalidate = 0;
const apiURL = `${baseURL}/Event/category?`;
const getData = async (slug: any) => {
  try {
    const res = await fetch(
      `${apiURL}categoryName=${slug}&sort=Date-Low&pageSize=12&pageNo=1`
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  // fetch data
  const slug = params?.slug;
  const category = await getData(slug);
  if (!category?.succeeded) {
    return {};
  }
  const { data } = category;
  const title = data?.name + " Events";
  const description = `Score the best seats to top ${data?.name} events! our ${data?.name} category offers a slam-dunk selection of tickets at unbeatable prices. Buy now and don't miss a minute of the action!`;
  const URL = `/categories/${slug}`;

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
    },
    twitter: {
      title,
      description,
    },
  };
}

const page = async ({ params }: any) => {
  const result = await getData(params.slug);
  if (!result || !result?.succeeded) return <PageError error={result}/>;
  return <ExploreEvents content={result?.data} />;
};

export default page;
