"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ScrollButton from "./ScrollButton";
import AboutSection from "./AboutSection";
import "@/assets/tickets.css";
import SectionLoader from "@/components/SectionLoader";
import SaveToCalender from "./SaveToCalender";
import BookingDetails from "./BookingDetails";
import EventDetails from "./EventDetails";
import ScrollToBottomIcon from "./ScrollToBottom";
import { useRouter, useSearchParams } from "next/navigation";
import PageError from "@/components/PageError";
import Banner from "./Banner";
import { Progress } from "@/components/ui/progress";
import AppleWallet from "./AppleWallet";
import { PurchaseResponse } from "@/lib/types";
import "./style.css";
import HeroBanner from "./HeroBanner";
import { baseURL, hasTicketsInOrder } from "@/lib/utils";
import OrderLoading from "./OrderLoading";
import RetryWidget from "./RetryWidget";
import useApp from "@/context/useApp";
import { ExampleOrderTicket } from "@/helpers/StaticData";
import DownloadButton from "./DownloadButton";

const MAX_RETRIES = 5;
const RETRY_SECONDS = 5;

const IndexThankYou = () => {
  const { isLoading } = useApp();
  const [content, setContent] = useState<PurchaseResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // Inner Widget Loading
  const [countdown, setCountdown] = useState(RETRY_SECONDS);
  const [retries, setRetries] = useState(0);
  const [widgetLoading, setWidgetLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const getData = async (searchParams: any) => {
    try {
      setLoading(true);
      const id = searchParams?.get("id") || searchParams?.get("Id");
      const sec = searchParams?.get("sec") || searchParams?.get("secret");
      //console.log(id,sec,searchParams)
      if (id && sec) {
        setProgress(30);
        const timer1 = setTimeout(() => setProgress(50), 500);
        const response = await fetch(
          `${baseURL}/tickets/myticket?id=${id}&secret=${sec}`
        );
        clearTimeout(timer1);
        setProgress(70);
        //console.log(response)
        if (!response?.ok) {
          setError(true);
          setWidgetLoading(true);
          return null;
        }
        const result = await response.json();
        if (result && result?.succeeded) {
          const { data } = result;
          const content = data;
          // example code here
          // let content =  data;
          // if (retries == 3) {
          //   content = data;
          // } else {
          //   content = ExampleOrderTicket;
          // }
          //setContent(ExampleOrderTicket);
          setContent(content);
          setError(false);
          setWidgetLoading(!hasTicketsInOrder(content));
        } else {
          console.log(result);
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      // Set progress to 100% when done
      //setProgress(100);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getData(searchParams);
  }, []);

  // retry effect: runs only while widgetLoading is true and there are remaining retries
  useEffect(() => {
    // clear any previous timer when widgetLoading toggles
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!widgetLoading) {
      // Reset countdown to default when widgetLoading turns false
      setCountdown(RETRY_SECONDS);
      return;
    }

    // If widgetLoading true but we've exhausted retries — stop and show error state
    if (retries >= MAX_RETRIES) {
      console.warn("Max retry attempts reached. Stopping auto-retries.");
      setWidgetLoading(false);
      return;
    }

    // Start countdown interval
    setCountdown(RETRY_SECONDS); // start fresh
    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [widgetLoading, retries]);

  // effect that watches countdown and handles when it reaches 0
  useEffect(() => {
    if (!widgetLoading) return;

    if (countdown <= 0) {
      // clear the interval (if any)
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // increment retries
      setRetries((prev) => {
        const next = prev + 1;

        if (next >= MAX_RETRIES || content?.event?.type == 'Online') {
          // we've reached the limit — stop retrying
          console.warn(`Auto-retry failed after ${next} attempts.`);
          setWidgetLoading(false);
          // Optionally show a user-facing message here via toaster
          return next;
        }

        // attempt re-fetch
        // re-run getData to try to fetch again
        getData(searchParams);

        // reset countdown for next attempt
        setCountdown(RETRY_SECONDS);

        return next;
      });
    }
    // only watch countdown (widgetLoading handled elsewhere)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  // keep widgetLoading in sync when content changes
  useEffect(() => {
    if (isLoading || loading) return;
    if (content?.event?.type == 'Online') {
      setWidgetLoading(false)
    } else {
      setWidgetLoading(!hasTicketsInOrder(content));
    }
  }, [content, isLoading, loading]);

  // cleanup any timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  //console.log(content);
  if (loading) {
    return (
      <div className="thank-you-template">
        <OrderLoading progress={progress} />
      </div>
    );
  }

  if (error || !content) return <PageError />;
  //console.log(content)
  //console.log(countdown, retries);
  //console.log(content?.event?.type);
  return (
    <div className="thank-you-template">
      <div className="container px-3 py-8">
        <ScrollToBottomIcon />
        <HeroBanner loading={widgetLoading} />
        <AppleWallet event={content?.event} loading={widgetLoading} />
        <div className="py-5">
          {widgetLoading ? (
            <RetryWidget countdown={countdown} event={content?.event} />
          ) : (
            <AboutSection
              tickets={content?.eventTickets}
              parkings={content?.parkingTickets}
              products={content?.shopItemTickets}
              event={content?.event}
              order={content}
            >
              <DownloadButton content={content} loading={widgetLoading} />
            </AboutSection>
          )}
        </div>
        <SaveToCalender event={content?.event} />
        <EventDetails
          extended={content?.extended}
          event={content?.event}
          loading={widgetLoading}
        >
          <DownloadButton content={content} loading={widgetLoading} />
        </EventDetails>
        <BookingDetails order={content} />
      </div>
      <script
        id="event-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
      />
      {/* <Banner event={content?.event} /> */}
    </div>
  );
};

export default IndexThankYou;
