import React from "react";
import Link from "next/link";
import PictureSection from "./PictureSection";
import PageError from "@/components/PageError";

const ClientStories = ({ data }: any) => {
  //console.log(data)
  return (
    <section className="client-stories_page">
      <div className="flex items-center justify-center min-h-[50vh] bg-primary text-white flex-col">
        <div className="text-center text-white">
          <h2 className="text-white mb-2">Client Success Stories</h2>
          <p className="text-lg">
            Be inspired by the success stories of event organizers who chose
            EazyTicks as their ticket to event success. <br />
            Discover how they made their events shine.
          </p>
        </div>
      </div>
      {data && data?.length > 0 ? (
        data?.map((item: any) => {
          return <PictureSection item={item} key={item?.id} />;
        })
      ) : (
        <PageError />
      )}
      <div className="flex items-center justify-center min-h-[50vh] flex-col text-center">
        <h2 className="mb-3 ">
          Join The<strong className="red"> EazyTicks </strong> Community
        </h2>
        <p className="mb-5">
          Join our thriving community of event organizers and experience the
          difference with <strong className="red"> EazyTicks</strong>.
          <br />
          <strong className="large mb-2 text-xl">#WHYNOTEAZYTICKS?</strong>
        </p>
        <Link href="/account/signup" className="btn btn--primary small-btn">
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default ClientStories;
