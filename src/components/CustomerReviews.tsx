import React from "react";
import ReviewItem from "./ReviewItem";

const data = [
  {
    image:
      "https://res.cloudinary.com/eazy-ticks/image/upload/v1715774233/client-assets/Southern-University-Laboratory-School-Client-Success-Stories-EazyTicks-YouTube_hjbeh2.png",
    url: "bL7yufU3D-g",
  },
  {
    image:
      "https://res.cloudinary.com/eazy-ticks/image/upload/v1715774232/client-assets/Liberty-Magnet-High-School-Client-Success-Stories-EazyTicks-YouTube_xfb9gz.png",
    url: "tnBVE3KJaOI",
  },
  {
    image:
      "https://res.cloudinary.com/eazy-ticks/image/upload/v1715774549/client-assets/Belaire-Magnet-High-School-Client-Success-Stories-EazyTicks-YouTube_bswbzq.png",
    url: "PfE5vieAMLM",
  },
];

const CustomerReviews = () => {
  return (
    <div className="container py-16 sm:px-0 px-1">
      <div className="text-center mb-5">
        <div className="text text-black text-lg ">
          <h2 className="mb-0 text-center">HEAR FROM THE COMMUNITY</h2>
          <p>
            Check Out our wall of love where
            <strong className="red"> EazyTicks </strong>
            Community members share highlights of their homes.
          </p>
        </div>
      </div>
      <div className="px-4 py-2 mb-8 max-w-5xl mx-auto sm:overflow-hidden overflow-auto flex gap-4 justify-start sm:justify-center">
        {data?.map((item, index: number) => {
          return <ReviewItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CustomerReviews;
