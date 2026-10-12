"use client";
import NoEvent from "./NoEvent";
import EventCardSearchPage from "./EventCardSearchPage";
import { SearchEventCard } from "@/lib/types";
import { useTheme } from "@/context/ThemeContext";

type props = {
  events: SearchEventCard[];
};

const SearchCard = ({ events }: props) => {
  const { toggleSearchDrawer, searchDrawer } = useTheme();
  //console.log(events);
  return (
    <div className="basis-full md:basis-8/12 mx-auto">
      {events && events?.length > 0 ? (
        <>
          {events?.map((event: any) => {
            return (
              <EventCardSearchPage
                event={event}
                key={event.slug}
                handleChange={() => toggleSearchDrawer(!searchDrawer)}
              />
            );
          })}
        </>
      ) : (
        <NoEvent />
      )}
    </div>
  );
};

export default SearchCard;
