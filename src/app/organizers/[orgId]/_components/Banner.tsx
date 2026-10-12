"use client";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import OrganizerDescription from "./OrganizerDescription";
import NoticeModal from "./NoticeModal";
import OrganizerFollowers from "@/components/OrganizerFollowers";
import FollowMe from "@/components/FollowMe";
import OrganizerSocial from "@/components/OrganizerSocial";
import { OrganizerObj } from "@/lib/types";
import PageError from "@/components/PageError";

interface FunctionProps {
  profile?: OrganizerObj;
}

const Banner = ({ profile }: FunctionProps) => {
  const [totalFollowings, setTotalFollowings] = useState(0);
  const handleFollowingChange = function (isFollowing: any) {
    if (isFollowing) {
      setTotalFollowings(totalFollowings + 1);
    } else {
      setTotalFollowings(totalFollowings - 1);
    }
  };
  
  useEffect(() => {
    if(profile){
      setTotalFollowings(profile?.followingCount);
    }
  }, [profile]);
  if (!profile) return <PageError />;
  //console.log(profile);
  return (
    <div
      className="py-8 px-3 bg-secondary text-white "
      data-organizer-id={profile?.id}
    >
      <div
        className="flex items-center justify-start gap-3 md:gap-0 space-x-3 p-3 rounded-sm flex-wrap max-w-[800px] mx-auto mb-3 w-full"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="organizer-icon md:basis-[30%] basis-full w-2/4">
          <img
            src={
              profile?.icon
                ? profile?.icon.split(";").pop()
                : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
            }
            alt={
              (profile?.orgName ? profile?.orgName : "Organizer") +
              " - Eazyticks"
            }
            loading="lazy"
            className="max-h-80 mx-auto"
          />
        </div>
        <div className="md:basis-[68%] basis-full w-full overflow-hidden">
          {profile?.isNoticeActive && profile?.notice && <NoticeModal text={profile?.notice} />}
          <h2 className="text-white md:text-3xl text-2xl w-full">
            {profile?.orgName ? profile?.orgName : "Eazyticks"}
          </h2>
          <div className="flex items-center gap-4 my-2">
            <OrganizerFollowers count={totalFollowings} />
            <FollowMe
              orgId={profile?.id}
              followed={profile?.isFollowing}
              notifyOnUpdate={handleFollowingChange}
              classess="!bg-white !font-semibold !text-xs !py-1 !px-3 !rounded-full !text-primary !border-0"
            />
          </div>
          <div className="mb-3">
            <a
              href={`mailto:${profile?.email}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white"
            >
              <span>
                <MdEmail className="icon icon-email" />
              </span>
              <span className="text-white">{profile?.email}</span>
            </a>
          </div>
          <OrganizerSocial organizer={profile} page={"organizer"} />
        </div>
      </div>
      {profile?.aboutUs && (
        <OrganizerDescription description={profile?.aboutUs} />
      )}
    </div>
  );
};

export default Banner;
