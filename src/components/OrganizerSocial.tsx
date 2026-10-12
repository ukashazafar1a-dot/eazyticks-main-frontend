"use client";
import React, { useEffect, useState } from "react";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

interface FunctionProps {
  organizer: any;
  page: any;
}

const OrganizerSocial = ({ organizer, page }: FunctionProps) => {
  //console.log("ORganizer",organizer)
  const [twitter, setTwitter] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [insta, setInsta] = useState(null);
  const [whatsapp, setWhatsapp] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);

  useEffect(() => {
    if (page == "event") {
      setTwitter(organizer?.twitter);
      setFacebook(organizer?.facebook);
      setInsta(organizer?.instagram);
      setWhatsapp(organizer?.whatsapp);
      setLinkedIn(organizer?.linkedIn);
    } else {
      setTwitter(organizer?.socialLinks?.Twitter);
      setFacebook(organizer?.socialLinks?.Facebook);
      setInsta(organizer?.socialLinks?.Instagram);
      setWhatsapp(organizer?.socialLinks?.Whatsapp);
      setLinkedIn(organizer?.socialLinks?.LinkedIn);
    }
  }, [organizer]);

  return (
    <>
      {(twitter || facebook || insta || whatsapp || linkedIn) && (
        <div className="flex md:items-center items-start justify-start  gap-2 flex-col md:flex-row text-left mb-4">
          <div className="title">Follow Us On:</div>
          <div className="flex items-center justify-start gap-3 flex-wrap text-primary">
            {facebook && (
              <a
                className="icon-item"
                href={`${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="follow on facebook"
              >
                <IoLogoFacebook className="icon icon-facebook fill-primary" />
              </a>
            )}
            {linkedIn && (
              <a
                className="icon-item"
                href={`${linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="follow on linkedin"
              >
                <IoLogoLinkedin className="icon icon-linkdin fill-primary" />
              </a>
            )}
            {twitter && (
              <a
                className="icon-item"
                href={`${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="follow on twitter"
              >
                <FaXTwitter className="icon icon-twitter fill-primary" />
              </a>
            )}
            {insta && (
              <a
                className="icon-item"
                href={`${insta}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="follow on instagram"
              >
                <IoLogoInstagram className="icon icon-insta fill-primary" />
              </a>
            )}
            {whatsapp && (
              <a
                className="icon-item"
                href={`${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="chat on whatsapp"
              >
                <IoLogoWhatsapp className="icon icon-whatsapp fill-primary" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizerSocial;
