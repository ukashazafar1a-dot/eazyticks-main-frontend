"use client";
import { Event } from "@/lib/types";
import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { MdFlag } from "react-icons/md";
import { Site } from "@/helpers/Site";
import { toast } from "sonner";

type props = {
  event: Event;
};
const EventShareBox = ({ event }: props) => {
  const url = `${Site?.url}/events/` + event?.slug;
  const title = event?.name ? event?.name : "Event" + " - Eazyticks";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied');
    } catch (err) {
      toast.error('Unable to copy URL.')
    }
  }
  const showPolicy = event?.customSettings ?  event?.customSettings?.eventDetail?.showPolicy : true;
  return (
    <div className={`basis-full w-full text-end pb-5 ${!showPolicy ? '' : 'lg:basis-[30%]'}`}>
      <h3 className="md:text-3xl text-xl">Share With Others</h3>
      <div className="flex items-center justify-end gap-3 my-2">
        <a
          className="icon-item"
          href={`https://www.facebook.com/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on facebook"
        >
          <IoLogoFacebook className="icon icon-facebook text-primary" />
        </a>
        <a
          className="icon-item"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on linkedin"
        >
          <IoLogoLinkedin className="icon icon-linkdin text-primary" />
        </a>
        <a
          className="icon-item"
          href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on twitter"
        >
          <FaXTwitter className="icon icon-twitter text-primary" />
        </a>
        <a
          className="icon-item"
          href={`https://api.whatsapp.com/send?text=${title}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on whatsapp"
        >
          <IoLogoWhatsapp className="icon icon-whatsapp text-primary" />
        </a>
        <a
          className="icon-item"
          href={`mailto:?subject=${title}&body=${url} - ${title}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send on Email"
        >
          <MdEmail className="icon icon-email text-primary" />
        </a>
        <button
          type="button"
          className="icon-item copy"
          title="copy to clipboard"
          aria-label="copy to clipboard"
          data-link={url}
          onClick={(e) => copyLink()}
        >
          <IoCopyOutline className="icon icon-copy text-primary" />
        </button>
      </div>
      <div className="text-end">
        <a
          href={`mailto:info@eazyticks.com?subject=Report this Event ${title} - ${url}`}
          className="flex items-center justify-end gap-2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Report Event"
        >
          <span>Report Event</span>
          <MdFlag className="icon icon-flag text-primary" />
        </a>
      </div>
    </div>
  );
};

export default EventShareBox;
