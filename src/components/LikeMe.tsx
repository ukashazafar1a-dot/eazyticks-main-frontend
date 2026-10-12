"use client";
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { LikeEvent, UnlikeEvent } from "@/helpers/businessRequests";
import useApp from "@/context/useApp";
import { FaHeart } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Provider {
  liked: boolean;
  eventSlug: number | String;
  classes?: any;
  show?: boolean;
}

function LikeMe({ liked, eventSlug, classes, show = true }: Provider) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, setToaster,wishlists } = useApp();

  const handleLike = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const { data:response } = isLiked
          ? await UnlikeEvent(eventSlug)
          : await LikeEvent(eventSlug);
          //console.log(response)
        if (response && response?.succeeded) {
          setIsLiked(!isLiked);
          setToaster("success", response?.messages[0] || 'Add in your wishlist.');
          setIsLoading(false);
        } else {
          setToaster("error", response?.messages[0] || 'Something went wrong!');
          setIsLoading(false);
        }
      } catch (error: any) {
        const { data } = error?.response;
        setToaster("error", data?.message || "Something went wrong!");
        setIsLoading(false);
      }
    } else {
      setShowModal(true);
    }
  };

  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    setIsLiked(liked);
    if (!user) setIsLiked(false);
  }, [liked, user]);

  useEffect(() => {
    if(wishlists && eventSlug){
      const done = wishlists?.includes(eventSlug);
      if(done){
        setIsLiked(true);
      }
    }
  }, [wishlists])
  
  if (!show) return;

  return (
    <>
      <LoginModal open={showModal} handleClose={handleClose} />
      <div
        className={`absolute -top-4 right-2 bg-white text-theme-primary p-1 shadow-md rounded-full cursor-pointer z-5 flex items-center justify-center ${
          classes ? classes : ""
        }`}
        onClick={() => handleLike()}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-primary" />
        ) : isLiked ? (
          <FaHeart className="w-5 h-5 fill-primary " />
        ) : (
          <IoMdHeartEmpty className="w-5 h-5 text-primary " />
        )}
      </div>
    </>
  );
}

export default LikeMe;
