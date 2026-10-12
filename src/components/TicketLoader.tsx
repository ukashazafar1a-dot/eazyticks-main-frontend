import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import useApp from "@/context/useApp";

const TicketLoader = () => {
  const { tkLoading } = useApp();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = 375;
  const messages = [
    "Processing Your Order...",
    "Generating Your Tickets...",
    "Almost There...",
    "Redirection to Your Tickets...",
  ];

  useEffect(() => {
    let messageInterval: any;
    if (tkLoading) {
      messageInterval = setInterval(() => {
        setMessageIndex((prevIndex) => {
          if (prevIndex < messages.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(messageInterval);
            return prevIndex;
          }
        });
      }, timer);
    }
    return () => clearInterval(messageInterval);
  }, [tkLoading]);

  useEffect(() => {
    let progressInterval: any;
    if (tkLoading) {
      setProgress(0); // Reset progress when tkLoading becomes true
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            // Add any additional actions needed when progress reaches 100%
            return 100;
          }
          return prevProgress + 100 / (messages.length - 1); // Progress increments according to the number of messages
        });
      }, timer);
    }
    return () => clearInterval(progressInterval);
  }, [tkLoading]);

  return (
    <Dialog open={tkLoading}>
      <DialogContent className="text-center tld-main">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-1">
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
              className="w-12 h-12"
            >
              <path
                fill="var(--colorThemePrimary)"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          <DialogTitle className="md:text-2xl !mb-0 !mt-0">
            Order Successful!
          </DialogTitle>
          <DialogDescription className="!mb-3 !mt-0">
            {messages[messageIndex]}
          </DialogDescription>
          <Progress value={progress} className="!mb-3" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TicketLoader;
