
import Link from "next/link";
import React from "react";
import Banner from "./_components/Banner";
import PageError from "@/components/PageError";
export const runtime = 'edge'
const getData = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/blogs"
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const page = async () => {
  const data = await getData();
  //console.log(data);
  if(!data) return <PageError/>;
  return (
    <div>
      <Banner/>
      <h2 className="h2 text-center py-5">Eazyticks Help Center</h2>
      <div className="card__wrapper">
        {data?.map((item: any, i: number) => {
          return (
            <div className="card_items" key={i}>
              <div className="card__icon">
                <img src={item.imageUrl} alt="Rocket Image" />
              </div>
              <div className="card__heading">
                <Link href={"/blogs/" + item.slug}>{item.name}</Link>
              </div>
            </div>
          );
        })}
        {data?.map((item: any, index: number) => {
          return (
            <div className="card_items" key={index}>
              <div className="card__icon">
                <img src={item.imgsrc} alt="Rocket Image" />
              </div>
              <div className="card__heading">{item.title}</div>
            </div>
          );
        })}
      </div>
      <div className="question--wrapper bg-[#EFEFEF]">
        <div className="question--title center">
          Still have questions?
          <span className="clr--text">
            <Link href="/contact-us"> Contact us. </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
