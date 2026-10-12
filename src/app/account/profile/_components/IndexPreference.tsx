"use client";
import React, { useEffect, useState } from "react";
import {
  getUserNotifications,
  updateFollowersNotification,
  updateMarketingNotification,
  updateWishlistNotification,
} from "@/helpers/businessRequests";
import PageError from "@/components/PageError";
import SectionLoader from "@/components/SectionLoader";
import UserNotifications from "./UserNotifications";
import AccountPage from "../AccountPage";
import useApp from "@/context/useApp";

const IndexPreference = () => {
  const [notifications, setNotifications] = useState({
    followingOrganizerNotification: false,
    wishlistNotification: false,
    marketingNotification: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setToaster } = useApp();
  const [updatingFollowingStatus, setUpdatingFollowingStatus] = useState(false);
  const [updatingWishlistStatus, setUpdatingWishlistStatus] = useState(false);
  const [updatingMarketingStatus, setUpdatingMarketingStatus] = useState(false);

  const handleFollowingChange = async function () {
    setUpdatingFollowingStatus(true);
    try {
      const { data: response } = await updateFollowersNotification();
      if (response && response?.succeeded) {
        await getData();
        setToaster(
          "success",
          response?.messages[0] || "Notification updated successfully."
        );
      } else {
        setUpdatingFollowingStatus(false);
      }
    } catch (error) {
      setUpdatingFollowingStatus(false);
    }
  };

  const handleWishlistChange = async function () {
    setUpdatingWishlistStatus(true);
    try {
      const { data: response } = await updateWishlistNotification();
      if (response && response?.succeeded) {
        await getData();
        setToaster(
          "success",
          response?.messages[0] || "Notification updated successfully."
        );
      } else {
        setUpdatingWishlistStatus(false);
      }
    } catch (error) {
      setUpdatingWishlistStatus(false);
    }
  };

  const handleMarketingChange = async function () {
    setUpdatingMarketingStatus(true);
    try {
      const { data: response } = await updateMarketingNotification();
      if (response && response?.succeeded) {
        await getData();
        setToaster(
          "success",
          response?.messages[0] || "Notification updated successfully."
        );
      } else {
        setUpdatingMarketingStatus(false);
      }
    } catch (error) {
      setUpdatingMarketingStatus(false);
    }
  };

  const getData = async () => {
    try {
      const { data: response } = await getUserNotifications();
      if (response && response?.succeeded) {
        setNotifications(response?.data);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AccountPage>
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <UserNotifications
          notifications={notifications}
          handleFollowingChange={handleFollowingChange}
          handleWishlistChange={handleWishlistChange}
          handleMarketingChange={handleMarketingChange}
          isUpdatingFollowing={updatingFollowingStatus}
          isUpdatingWishlist={updatingWishlistStatus}
          isUpdatingMarketing={updatingMarketingStatus}
        />
      )}
    </AccountPage>
  );
};

export default IndexPreference;
