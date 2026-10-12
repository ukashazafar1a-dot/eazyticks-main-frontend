"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useApp from "@/context/useApp";
import {
  getUserProfile,
  updateUserProfileImage,
} from "@/helpers/businessRequests";
import LoadingSvg from "@/components/LoadingSvg";
import { IoCameraOutline } from "react-icons/io5";
type props = {
  image: string | null | undefined;
};
const UpdateUserImage = ({ image }: props) => {
  const { updateUserProfile: updateContext, setToaster } = useApp();
  const [picture, setPicture] = useState("");
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const first = React.useRef<HTMLInputElement>(null);
  const [responseMessage, setResponseMessage] = useState({
    status: "success",
    message: "",
  });

  const updateImageUrl = function (image: any) {
    if (!image) return;
    let src = image.split(";").pop();
    setPicture(src);
  };
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      updateImage(event.target.files[0]);
    }
  };
  const handleClick = () => {
    if (first.current) {
      first.current.click();
    }
  };
  async function getUser() {
    try {
      const { data } = await getUserProfile();
      return data;
    } catch (error) {
      return null;
    }
  }
  async function updateImage(file: any) {
    setIsUpdatingImage(true);
    try {
      const { data } = await updateUserProfileImage(file);
      if (data?.status === "Success") {
        const resp: any = await getUser();
        if (resp) {
          let name = resp?.firstName + " " + resp?.lastName;
          updateContext(name, resp?.image);
        }
        setResponseMessage({
          status: "success",
          message: data.message,
        });
        setIsUpdatingImage(false);
      } else {
        setToaster("error", "Something went wrong!");
        throw new Error("Something went wrong while updating profile");
      }
    } catch (error) {
      setIsUpdatingImage(false);
      setResponseMessage({
        status: "error",
        message: "Fialed to update image!",
      });
      setToaster("error", "Something went wrong!");
    }
  }
  return (
    <div className="relative mb-5 account-image">
      <Avatar className="w-20 h-20" onClick={handleClick}>
        {isUpdatingImage && (
          <div className="logo-updating">
            <LoadingSvg width="80px" height="auto" />
          </div>
        )}
        <AvatarImage
          className="w-20 h-20 "
          src={
            picture
              ? picture
              : image
              ? image.split(";").pop()
              : "https://res.cloudinary.com/eazy-ticks/image/upload/w_80,h_80/v1715679506/client-assets/27470334_7309681_sqhpiw.jpg"
          }
        />
      </Avatar>

      <IoCameraOutline className="icon icon-camera absolute left-12 bottom-0 z-2 bg-white rounded-full shadow" />
      <div className="icon-wrap">
        <input
          type="file"
          name="profile-picture"
          className="absolute inset-0 w-full h-full opacity-0"
          accept="image/png, image/jpeg,image/jpg"
          ref={first}
          onChange={(e) => onImageChange(e)}
          disabled={isUpdatingImage}
        />
      </div>
    </div>
  );
};

export default UpdateUserImage;
