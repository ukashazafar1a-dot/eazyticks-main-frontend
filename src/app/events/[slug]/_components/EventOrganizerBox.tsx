"use client";
import FollowMe from "@/components/FollowMe";
import OrganizerFollowers from "@/components/OrganizerFollowers";
import OrganizerSocial from "@/components/OrganizerSocial";
import { Organizer } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";
type props = {
  organizer: Organizer;
};
const EventOrganizerBox = ({ organizer }: props) => {
  const [totalFollowings, setTotalFollowings] = useState(0);
  const renderImage = function (img: any) {
    if (!img)
      return (
        <img
          src={
            "https://res.cloudinary.com/ddkdvh5ps/image/upload/w_300/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
          }
          alt={organizer?.name}
          loading="lazy"
          className=""
        />
      );

    let src = img.split(";").pop();
    return <img src={src} alt={organizer?.name} loading="lazy" />;
  };
  const handleFollowingChange =  (isFollowing: any) => {
    if (isFollowing) {
      setTotalFollowings(totalFollowings + 1);
    } else {
      setTotalFollowings(totalFollowings - 1);
    }
  };
  return (
    <div className="bg-gray-100 text-black p-5 mb-8 w-full  rounded-sm">
      <div className="flex gap-2 items-center justify-center flex-wrap max-w-[900px] mx-auto ">
        <div className="relative md:basis-[49%] basis-full flex justify-center overflow-hidden h-[300px]">
          {renderImage(organizer?.icon)}
        </div>
        <div className="p-4 md:basis-[49%] basis-full">
          <h3 className="text-2xl md:text-left text-center">
            {organizer?.name}
          </h3>
          <OrganizerFollowers count={totalFollowings} />
          <OrganizerSocial organizer={organizer} page={"event"} />
          <div className="flex gap-2 items-center flex-wrap md:justify-start justify-center ">
            <div className="sm:flex-shrink flex-grow">
              <FollowMe
                followed={organizer?.orgFollowingStatus}
                orgId={organizer?.id}
                notifyOnUpdate={handleFollowingChange}
                classess="w-full"
              />
            </div>
            <div className="sm:flex-shrink flex-grow">
              <Link
                href={`/organizers/${organizer?.id}`}
                className="btn btn--secondary sm:w-auto w-full "
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerBox;
