import React, { Suspense } from "react";
import { FaPhone } from "react-icons/fa6";
import ContactUsForm from "./_components/ContactUsForm";
import Image from "next/image";
import SectionLoader from "@/components/SectionLoader";

const title = "Contact Us - Reach Out for Assistance - Eazyticks";
const description = `Have questions, feedback, or need assistance? Contact our dedicated team at EazyTicks. We're here to help and provide the support you need. Get in touch with us today.`;
const url = "/contact-us";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
  },
  twitter: {
    title,
    description,
  },
};

function ContactUsPage() {
  return (
    <div>
      <div className="md:min-h-[90vh] min-h-[50vh] relative flex items-center justify-center text-white w-full">
        <Image
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1682946616/ezt-frontend-client-assets/ContactBG_izb8u3.png"
          alt="Contact Us Page Banner - Eazyticks"
          loading="lazy"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="relative z-2 lg:w-3/6 w-full lg:p-0 px-8">
          <h1 className="mb-3 md:text-6xl text-4xl">Get in Touch</h1>
          <p className="mb-3 md:text-2xl text-lg ">PO Box No 45832</p>
          <p className="mb-3 md:text-2xl text-lg ">Baton Rouge, LA 70895</p>
          <p className="flex items-center justify-start gap-3 md:text-2xl text-lg">
            <FaPhone className="icon icon-phone stroke-white fill-white w-4 h-4" />
            <span>+(202) 436 5839</span>
          </p>
        </div>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <ContactUsForm />
      </Suspense>
    </div>
  );
}

export default ContactUsPage;
