import Image from "next/image";
import React from "react";


const NoEvent = () => {
  return (
    <div className="text-center flex items-center justify-center mb-3 relative">
      <div className="content">
        <div className="image-wrapper relative">
          <Image
            src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683985032/ezt-frontend-client-assets/man_bvtjmv.png"
            alt="No Events Found - Eazyticks"
            width={300}
            height={300}
            className="mx-auto mb-3"
          />
        </div>
        <h3 className="mb-3">{`We couldn't find anything`}</h3>
        <p className="text-lg text-gray-700">Adjust your filters and try again.</p>
      </div>
    </div>
  );
};

export default NoEvent;
