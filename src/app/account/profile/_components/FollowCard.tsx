import React, { useEffect, useState } from "react";
import Link from "next/link";
import OrganizerFollowers from "@/components/OrganizerFollowers";
import FollowMe from "@/components/FollowMe";


interface FunctionProps {
  organizer: any;
}

const FollowCard = ({ organizer }: FunctionProps) => {
  const [totalFollowings, setTotalFollowings] = useState(0);

  const handleFollowingChange = function (isFollowing: any) {
    if (isFollowing) {
      setTotalFollowings(totalFollowings + 1);
    } else {
      setTotalFollowings(totalFollowings - 1);
    }
  };

  const renderMedia =  (image: any) => {
    let imgSrc: any = null;
    if (image) {
      imgSrc = image.split(";")?.pop();
    } else {
      imgSrc =
        "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png";
    }
    return (
      <img
        src={imgSrc}
        alt={
          organizer?.name
            ? `${organizer?.name} - Eazyticks Event - Eazyticks`
            : "Eazyticks Organizers"
        }
        loading="lazy"
      />
    );
  };

  useEffect(() => {
    setTotalFollowings(organizer?.followers);
  }, [organizer]);

  return (
    <div className="follow-card basis-full md:basis-1/2 w-full p-1">
      <div className="sc-main flex items-center justify-start gap-1 flex-col md:flex-row p-1 shadow rounded border border-gray-300">
        <div className="image--wrapper basis-full md:basis-1/3 w-full md:flex-shrink-0">
          <div className="card_media_wrapper min-h-[140px] flex items-center justify-center">
            <div className="overlay"></div>
            {renderMedia(organizer?.icon)}
          </div>
        </div>
        <div className="event-info basis-full w-full">
          <div className="one-lines">
            {organizer?.name}
          </div>
          <div className="mb-2">
            <OrganizerFollowers count={totalFollowings} />
          </div>
          <div className="btn-group flex items-center justify-start gap-2 flex-col md:flex-row">
            <FollowMe
              followed={organizer?.orgFollowStatus}
              orgId={organizer?.id}
              notifyOnUpdate={handleFollowingChange}
            />
            <Link
              href={`/organizers/${organizer?.id}`}
              className="btn btn--secondary"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowCard;
