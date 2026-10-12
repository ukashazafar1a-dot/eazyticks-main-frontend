import OnOffSwitch from "@/components/OnOffSwitch";
import React from "react";


interface Provider {
  notifications: any;
  handleFollowingChange: any;
  handleWishlistChange: any;
  handleMarketingChange: any;
  isUpdatingFollowing: boolean;
  isUpdatingWishlist: boolean;
  isUpdatingMarketing: boolean;
}

const UserNotifications = ({
  notifications,
  handleFollowingChange,
  handleMarketingChange,
  handleWishlistChange,
  isUpdatingFollowing,
  isUpdatingMarketing,
  isUpdatingWishlist,
}: Provider) => {
  const followingOrganizerNotification: any =
    notifications?.followingOrganizerNotification;
  const wishlistNotification: any = notifications?.wishlistNotification;
  const marketingNotification: any = notifications?.marketingNotification;

  return (
    <div className="py-8">
      <h2 className="sm:text-3xl text-2xl font-bold mb-4">Manage Notifications</h2>
      <div className="nt-main">
        <div className="nt-item flex justify-between items-center sm-max:flex-wrap gap-2 mb-2 pb-2 border-black border-opacity-30 border-b">
          <div className="nt-item-text text-base ">
            Would you like to notify For Every New Event Published By Followed
            Organizer?
          </div>
          <div className="ni-item-switch flex items-center justify-center gap-4">
            <span>No</span>
            <OnOffSwitch
              isChecked={followingOrganizerNotification}
              handleChange={handleFollowingChange}
              isUpdating={isUpdatingFollowing}
            />
            <span>Yes</span>
          </div>
        </div>
        <div className="nt-item flex justify-between items-center sm-max:flex-wrap gap-2 mb-2 pb-2 border-black border-opacity-30 border-b">
          <div className="nt-item-text text-base ">
            Would you like to receive emails about events taking
            place in your area?
          </div>
          <div className="ni-item-switch flex items-center justify-center gap-4">
            <span>No</span>
            <OnOffSwitch
              isChecked={wishlistNotification}
              isUpdating={isUpdatingWishlist}
              handleChange={handleWishlistChange}
            />
            <span>Yes</span>
          </div>
        </div>
        <div className="nt-item flex justify-between items-center sm-max:flex-wrap gap-2 mb-2 pb-2 border-black border-opacity-30 border-b">
          <div className="nt-item-text text-base ">
            Would you like to receive emails from our website to stay updated
            and receive promotional offers?
          </div>
          <div className="ni-item-switch flex items-center justify-center gap-4">
            <span>No</span>
            <OnOffSwitch
              isChecked={marketingNotification}
              isUpdating={isUpdatingMarketing}
              handleChange={handleMarketingChange}
            />
            <span>Yes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
