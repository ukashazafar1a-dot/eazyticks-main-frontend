"use client";
import React, { useState, useEffect } from "react";
import useApp from "@/context/useApp";
import { FollowOrganizer, UnfollowOrganizer } from "@/helpers/businessRequests";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSvg from "@/components/LoadingSvg";
import LoginModal from "./LoginModal";

interface Provider {
  followed: boolean;
  orgId: number;
  notifyOnUpdate?: any;
  classess?: string;
}

function FollowMe({ followed, orgId, notifyOnUpdate, classess }: Provider) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, setToaster } = useApp();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isFollowed) {
      handleFollow();
      return;
    }
    setAnchorEl(event?.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFollowAndClose = () => {
    setAnchorEl(null);
    handleFollow();
  };

  const handleFollow = async () => {
    if (user) {
      // Follow the organzer
      setIsLoading(true);
      try {
        const { data: response }: any = isFollowed
          ? await UnfollowOrganizer(orgId)
          : await FollowOrganizer(orgId);
        //console.log(response);
        if (response && response?.succeeded) {
          setIsFollowed(!isFollowed);
          if (notifyOnUpdate) notifyOnUpdate(!isFollowed);
          setToaster(
            "success",
            response?.messages[0] || "Followed successful."
          );
          setIsLoading(false);
        } else {
          setToaster("error", response?.messages[0] || "Something went wrong!");
          setIsLoading(false);
        }
      } catch (error: any) {
        const { data } = error?.response;
        console.log(data);
        setToaster("error", "Something went wrong!.");
        setIsLoading(false);
      }
    } else {
      // Show login Modal
      setShowModal(true);
    }
  };

  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    setIsFollowed(followed);
    if (!user) setIsFollowed(false);
  }, [followed]);
  return (
    <div className={` followers-wrap`}>
      <LoginModal open={showModal} handleClose={handleClose} />
      {isLoading ? (
        <button className={`${classess ? classess : ""}  btn btn--primary`}>
          <span className="me-3">Follow Me</span>
          <LoadingSvg />
        </button>
      ) : isFollowed ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="btn btn--secondary w-full">
            Following
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleFollowAndClose}>
              Un-Follow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          className={`${classess ? classess : ""}  btn btn--primary`}
          onClick={handleClick}
        >
          Follow Me
        </button>
      )}
    </div>
  );
}

export default FollowMe;
