"use client";
import "./style.css";
import EventMedia from "./EventMedia";
import EventDetailBox from "./EventDetailBox";
import EventTicketsBox from "./EventTicketsBox";
import EventPolicy from "./EventPolicy";
import EventShareBox from "./EventShareBox";
import EventOrganizerBox from "./EventOrganizerBox";
import { Event } from "@/lib/types";
import RelatedEvents from "./RelatedEvents";
import { useEffect, useState } from "react";
import PageError from "@/components/PageError";
import PrivateEventPage from "./PrivateEventPage";
import EventSkelton from "./EventSkelton";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundry";
import CalenderFallback from "@/client/Calender/CalenderFallback";
import EventNotFound from "./EventNotFound";

type props = {
  content: any;
};

const EventDescription = dynamic(() => import("./EventDescription"), {
  ssr: false,
});
const EventLocation = dynamic(() => import("./EventLocation"), {
  loading: () => <Skeleton className="h-24 w-full rounded-xl my-3" />,
  ssr: false,
});
const EventCalenders = dynamic(
  () => import("../../../../client/Calender/EventCalenders"),
  {
    loading: () => <Skeleton className="h-24 w-full rounded-xl my-3" />,
    ssr: false,
  }
);

const IndexTicketDetails = ({ content }: props) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (content && content?.succeeded) {
      setEvent(content?.data);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [content]);
  //console.log(content);
  if (content && content?.status !== 200) {
    return <EventNotFound eventDetails={content} />;
  }
  if (content && !content?.succeeded) {
    //console.log(content);
    return <PrivateEventPage />;
  }
  //console.log(event);
  return (
    <div className="event-detail-page">
      <style jsx global>{`
        :root {
          --event-primary-color: ${event?.customSettings?.eventDetail
            .backgroundColor || "var(--colorThemePrimary)"};
          --event-primary-text-color: ${event?.customSettings?.eventDetail
            .textColor || "white"};
        }
      `}</style>
      {loading ? (
        <EventSkelton />
      ) : error ? (
        <PageError error={content} />
      ) : (
        <div className={""}>
          {!event ? (
            <PageError error={content} />
          ) : (
            <>
              <EventMedia event={event} />
              <div className="container">
                <div className="ticket-date flex items-center justify-between w-full gap-5 flex-col lg:flex-row px-0 py-8 md:pb-4 md:pt-8">
                  <EventDetailBox event={event} />
                  <EventTicketsBox event={event} />
                </div>
                {event?.calendar && (
                  <ErrorBoundary
                    fallback={<CalenderFallback calendar={event?.calendar} />}
                  >
                    <EventCalenders data={event?.calendar} slug={event?.slug} />
                  </ErrorBoundary>
                )}
                <div className="py-10">
                  {event?.descriptions && (
                    <EventDescription description={event?.descriptions} />
                  )}
                </div>
                <EventLocation event={event} />
                <div className="py-8 flex items-start justify-between w-full flex-wrap mb-4">
                  <EventPolicy policy={event?.buyerPolicy} event={event}/>
                  <EventShareBox event={event} />
                  <EventOrganizerBox organizer={event?.organizer} />
                </div>
              </div>
              <RelatedEvents events={event?.events} />
              {event && (
                <script
                  type="application/json"
                  id="event-data"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(event),
                  }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IndexTicketDetails;
