import LikeMe from "@/components/LikeMe";
import { Event } from "@/lib/types";
import React from "react";
import RenderTicket from "./RenderTicket";
import { getValueOrDefault, returnSettings } from "@/lib/utils";
import translation from "@/lib/translate";

type props = {
  event: Event;
};

const EventTicketsBox = ({ event }: props) => {
  return (
    <div className="basis-full lg:basis-[30%] w-full rounded">
      {returnSettings(
        event?.customSettings,
        event?.customSettings?.eventDetail?.showWishlist,
        <>
          {!event?.status && (
            <div className="dw-btn mb-3 relative pb-2">
              <LikeMe liked={event?.wishlistStatus} eventSlug={event?.slug} />
            </div>
          )}
        </>
      )}
      <div className="shadow-xl p-2">
        <div className="border-dotted border-2 p-3">
          {returnSettings(
            event?.customSettings,
            event?.customSettings?.eventDetail?.showTicketsPrice,
            <>
            {!event?.status && (
                <div className="price-table">
                  {event?.ticketStartingPrice > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base">
                        {getValueOrDefault(
                          event?.customSettings?.eventDetail?.ticketPriceText,
                          translation?.event.eventTicketsText
                        )}
                      </div>
                      <div className="text-base">
                        {`$ ` + event?.ticketStartingPrice}
                      </div>
                    </div>
                  )}
                  {event?.parkingStartingPrice > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base">
                        {getValueOrDefault(
                          event?.customSettings?.eventDetail?.parkingPriceText,
                          translation?.event.eventParkingText
                        )}
                      </div>
                      <div className="text-base">
                        {`$ ` + event?.parkingStartingPrice}
                      </div>
                    </div>
                  )}
                  {event?.foodAndDrinksStartingPrice > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base">
                        {getValueOrDefault(
                          event?.customSettings?.eventDetail?.shopPriceText,
                          translation?.event.eventShopText
                        )}
                      </div>
                      <div className="text-base">
                        {`$ ` + event?.foodAndDrinksStartingPrice}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          <RenderTicket event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventTicketsBox;
