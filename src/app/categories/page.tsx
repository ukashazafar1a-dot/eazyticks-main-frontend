import React from "react";
import Banner from "./_components/Banner";
import CategoriesFlex from "@/components/CategoriesFlex";

export const runtime = "edge";

async function getData() {
  try {
    // Avoid passing RequestInit.cache (unsupported in Cloudflare Workers)
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/Event");
    if (!res.ok) {
      console.log("Failed to fetch data", res);
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  // fetch data
  const category = await getData();
  if (!category) {
    return {};
  }
  const title = "Categories";
  const description = `Score the best seats to top events! our categories offers a slam-dunk selection of tickets at unbeatable prices. Buy now and don't miss a minute of the action!`;
  const URL = `/categories`;
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

async function ExploreEvents() {
  const response = await getData();
  const { categories } = response;
  //console.log(categories);
  return (
    <div className="categories--template">
      <Banner />
      {categories?.length > 0 && (
        <p className="container mx-auto py-3">
          {categories?.length}
          {categories?.length === 1 ? " Category" : " Categories"}
        </p>
      )}
      {categories?.length > 0 && <CategoriesFlex categories={categories} />}
    </div>
  );
}

export default ExploreEvents;
