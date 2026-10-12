import React from "react";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoMailOpenSharp } from "react-icons/io5";
import { MdWifiCalling3 } from "react-icons/md";
import NewsletterForm from "./NewsletterForm";
import { Site } from "@/helpers/Site";

const Footer = () => {
  return (
    <footer className="bg-footerBg text-footerText">
      <div className="container mx-auto py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          <div className="flex flex-col items-start">
            <Link href="/" className="block">
              <img
                src={"/logo.svg"}
                alt="Eazyticks logo"
                className="mb-4"
                loading="lazy"
              />
            </Link>

            <Link
              href="https://goo.gl/maps/9H433eS2cv3t8DZ16"
              target="_blank"
              className="block mb-4 py-1"
              rel="noopener noreferrer"
            >
              PO Box 45832, Baton Rouge, LA 70895
            </Link>

            <ul>
              <li className="mb-4">
                <Link
                  href="tel:+1 (202) 436 5839"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-start gap-2"
                >
                  <MdWifiCalling3 className="w-6 h-6 fill-primary" />
                  <span>(202) 436-5839</span>
                </Link>
              </li>
              <li className="mb-4 ">
                <Link
                  href="mailto:info@eazyticks.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-start gap-2"
                >
                  <IoMailOpenSharp className="w-6 h-6 fill-primary" />
                  <span>info@eazyticks.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__links">
            <h3 className="font-bold text-xl mb-4">Information</h3>
            <ul className="text-base">
              <li className="mb-4 ">
                <Link href="/sell-tickets-online">{`Sell Tickets Online`}</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/faqs">{`Faq's`}</Link>
              </li>

              <li className="mb-4 ">
                <Link href="/about-us">About Us</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/policies/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/policies/refund-policy">Refund Policy</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/policies/terms-conditions">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__links">
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="text-base">
              <li className="mb-4 ">
                <Link href="/account/signup">Sign Up</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/account/signin">Sign In</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/features">Features</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/browse-events">Browse Events</Link>
              </li>
              <li className="mb-4 ">
                <Link href="/ticket-finder">Find Your Ticket</Link>
              </li>
            </ul>
          </div>
          <div className="footer__apps">
            <h3 className="font-bold text-xl mb-4">Scanner Apps</h3>
            <p className="mb-4 md:pe-10 p-0">
              Apps are only available for event organizers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://apps.apple.com/us/app/eazy-ticks/id1597832096"
                target="_blank"
                title="Scanner app on ios"
                rel="opener referrer"
              >
                <img
                  src="/assets/images/iso.svg"
                  alt="IOS App icon - Eazyticks "
                  className="w-40 h-12 md:h-auto"
                  loading="lazy"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.ezyticks"
                target="_blank"
                rel="opener referrer"
                title="Scanner app on android"
              >
                <img
                  src="/assets/images/android.svg"
                  alt="Android App Icon - Eazyticks "
                  className="w-40 h-12 md:h-auto"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          <div className="footer_newlatter">
            <h3 className="font-bold text-xl mb-4">Join Our Newsletter!</h3>
            <NewsletterForm />
            <h3 className="font-bold text-xl mt-3 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Facebook"
                href={Site?.socialLinks?.facebook}
              >
                <FaFacebookSquare className="w-6 h-6 fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Twitter"
                href={Site?.socialLinks?.twitter}
              >
                <FaTwitter className="w-6 h-6 fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on instagram"
                href={Site?.socialLinks?.instagram}
              >
                <FaInstagram className="w-6 h-6 fill-primary" />
              </Link>
              <Link
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Subscribe on Youtube"
                href={Site?.socialLinks?.youtube}
              >
                <FaYoutube className="w-6 h-6 fill-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-footerText py-3">
        <div className="container mx-auto text-center">
          <Link href="/" className="block">
            &copy; {new Date().getFullYear()} {Site?.name}. All Rights Reserved.
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
