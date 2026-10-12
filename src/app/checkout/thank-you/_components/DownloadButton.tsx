"use client";
import SubmitBtn from "@/components/SubmitBtn";
import { useTheme } from "@/context/ThemeContext";
import useApp from "@/context/useApp";
import { downloadAllTickets } from "@/helpers/generals";
import { useQueryParams } from "@/hooks/useQueryParams";
import { PurchaseResponse } from "@/lib/types";
import { hasTicketsInOrder } from "@/lib/utils";
import React, { useEffect } from "react";
import { toast } from "sonner";

type props = {
  content: PurchaseResponse | null;
  loading: boolean;
};
const DownloadButton = ({ content, loading }: props) => {
  const { ticketDownloading, setTicketDownloading } = useTheme();
  const { getQueryParam, setQueryParam } = useQueryParams();
  const { setToaster } = useApp();

  const handleDownloadAll = async () => {
    // prevent if already downloading
    if (ticketDownloading) return;

    const tickets = document.querySelectorAll(".ticket");
    if (!tickets || tickets?.length === 0) {
      setToaster("error", "No tickets available for download");
      return;
    }
    setTicketDownloading(true);

    try {
      const result = await downloadAllTickets(".ticket");
      if (result) {
        setToaster("success", "Tickets downloaded successfully");
      } else {
        setToaster("error", "Failed to download tickets");
      }
    } catch (error) {
      console.error("Download error:", error);
      setToaster(
        "error",
        "An unexpected error occurred while downloading tickets"
      );
    } finally {
      setTicketDownloading(false);
    }
  };

  useEffect(() => {
    const downloadTicket = async () => {
      if (ticketDownloading || (window as any).__autoDownloadTriggered) return; // prevent auto-trigger during an ongoing download

      const autoDownload = getQueryParam("autoDownload");

      if (autoDownload === "false") {
        setQueryParam("autoDownload", "false");
        return;
      }

      setQueryParam("autoDownload", "true");
      setTicketDownloading(true);

      // Mark global flag
      (window as any).__autoDownloadTriggered = true;

      const toastId = toast.loading("Downloading Your Tickets");
      const result = await downloadAllTickets(".ticket");

      if (result) {
        toast.success("Your tickets have been downloaded successfully!", {
          id: toastId,
        });
        setQueryParam("autoDownload", "false");
      } else {
        toast.error("There was an error downloading your tickets.", {
          id: toastId,
        });
        setQueryParam("autoDownload", "true");
      }
      setTicketDownloading(false);
    };
    if (!loading && content?.event?.type !== "Online") {
      setTimeout(() => {
        downloadTicket();
      }, 2000);
    }
  }, [loading]);

  if (!hasTicketsInOrder(content)) {
    return <></>;
  }

  return (
    <>
      {content?.event?.type !== "Online" && (
        <SubmitBtn
          loading={ticketDownloading}
          onClick={() => handleDownloadAll()}
          disabled={ticketDownloading}
        >
          Download Tickets
        </SubmitBtn>
      )}
    </>
  );
};

export default DownloadButton;
