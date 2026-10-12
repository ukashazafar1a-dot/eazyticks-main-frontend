"use client";
import React, { useEffect, useState } from "react";
import { findTickets, getAllEvents } from "@/helpers/businessRequests";
import "./style.css";
import SelectField from "@/components/SelectField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TicketFinder = () => {
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [responseStatus, setResponseStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const onOptionChange = (value: any) => {
    setSelectEvent(value);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !selectEvent) return;
    try {
      setIsLoading(true);
      setResponseStatus("");
      const response = await findTickets(email, selectEvent?.value);
      //console.log(response)
      if (response && response?.succeeded) {
        setResponseStatus("Success");
        setEmail("");
        setSelectEvent("");
        setIsLoading(false);
      } else {
        setResponseStatus("Error");
        setEmail("");
        setSelectEvent("");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setResponseStatus("Error");
      setEmail("");
      setSelectEvent("");
      setIsLoading(false);
    }
  };

  const setup = async () => {
    const response = await getAllEvents();
    //console.log(response);
    if (response && response?.succeeded) {
      const { data } = response;
      const formatedEvents = data?.map((event: any) => {
        return { value: event?.id, label: event?.name };
      });
      const sortedEvents = formatedEvents.sort((a: any, b: any) => {
        if (a?.label > b?.label) return 1;
        if (a?.label < b?.label) return -1;
        return 0;
      });
      setEvents(sortedEvents ? sortedEvents : formatedEvents);
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="py-10">
      <div className="md:px-2 px-2">
        <div className="max-w-screen-lg bg-gray-100/70 shadow-sm p-7 rounded-lg m-auto border border-gray-200">
          <div className="info">
            <h2 className="text-3xl mb-2">Resend My Tickets</h2>
            <p className="text-base mb-3">
              Regain Access to Your Tickets by adding your email and selecting
              the right event.
            </p>
          </div>
          {responseStatus === "Success" && (
            <div className="mb-3 p-3 border border-green-500 font-medium text-green-600 rounded">
              <p>Ticket has been sent Successfully to your email.</p>
            </div>
          )}
          {responseStatus === "Error" && (
            <div className="mb-3 p-3 border border-red-500 font-medium text-red-600 rounded">
              <p>There is no Ticket available for this email.</p>
            </div>
          )}
          <form
            className="form"
            id="ticketFinderForm"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="flex items-center md:flex-nowrap flex-wrap justify-between gap-2 mb-4">
              <div className="w-full flex-grow">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  id="email"
                  placeholder="Enter your email"
                  className="bg-white border border-gray-300 rounded-sm email"
                  required
                />
              </div>
              <div className="w-full flex-grow">
                {loading ? (
                  <>
                    <div className="w-full">
                      <span className="h-10 rounded w-full animate-pulse bg-gray-300 block mt-6">
                        <span></span>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-medium opacity-0">Select Event</div>
                    <SelectField
                      name="Event"
                      options={events}
                      onChange={onOptionChange}
                      selected={selectEvent ? selectEvent : null}
                    />
                  </>
                )}
              </div>
            </div>
          </form>
          <div className="cta-action">
            <button
              className="btn btn--secondary"
              type="submit"
              form="ticketFinderForm"
            >
              <span>Find Tickets</span>
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-2 !w-5 !h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketFinder;
