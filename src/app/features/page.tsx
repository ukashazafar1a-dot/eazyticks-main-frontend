import React from "react";
import Banner from "./_components/Banner";
import Fcard from "./_components/Fcard";

const title = `Features of Eazyticks - Event Ticketing Made Simple - Eazyticks`;
const description = `Discover the robust features of Eazyticks that make event ticketing simple and efficient. From seamless ticket sales and secure transactions to event promotion and attendee management, our platform offers a comprehensive set of tools. Explore our features and take your event management to the next level with Eazyticks.`;
const url = "/features";
const data = [
  {
    id: 1,
    title: `Customizable Event Pages`,
    text: `Create stunning event pages that showcase your upcoming events in a professional and appealing format. Add images, descriptions, locations, and times for your events, and categorize them to make them easy for your audience to find.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683475146/ezt-frontend-client-assets/debit-card_1_asvvkp.png`,
  },
  {
    id: 2,
    title: `Scalable Ticketing Solutions`,
    text: `Whether you're planning a small gathering or a large-scale production, EazyTicks can accommodate your ticketing needs. We offer scalable solutions that grow with your events and make it easy for you to add more tickets or seats.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683475145/ezt-frontend-client-assets/debit-card_2_fajdws.png`,
  },
  {
    id: 3,
    title: `Affordable Pricing`,
    text: `EazyTicks charges a low fee of 2% + $1 for events that cost money, and a 3% credit card fee. You can choose to pay the fees yourself or pass them on to your buyers. With our affordable pricing, you can keep more of your profits while still enjoying all the benefits of a professional ticketing platform.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683475146/ezt-frontend-client-assets/debit-card_2_1_zzd0vs.png`,
  },
  {
    id: 4,
    title: `Mobile Ticketing and Check-In`,
    text: `Use our iOS and Android app to check people in at your events with our QR code scanner. With mobile ticketing and check-in, you can streamline your event management and provide a seamless experience for your attendees.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683475146/ezt-frontend-client-assets/debit-card_2_2_ml15zg.png`,
  },
  {
    id: 5,
    title: `Event Parking`,
    text: `We are excited to announce that Eazyticks now offers a convenient option for event organizers to sell parking tickets along with event tickets. This integrated feature allows organizers to streamline the ticketing process and provide a seamless experience for attendees.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/w_120,h_120/v1687113132/ezt-frontend-client-assets/parking_zsigeg.png`,
  },
  {
    id: 6,
    title: `Sell Products`,
    text: `In addition to selling event tickets and parking tickets together, we are excited to offer event organizers the option to sell products alongside ticket purchases. This feature allows organizers to expand their revenue streams and enhance the overall event experience for attendees.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/w_100,h_100/v1687113511/ezt-frontend-client-assets/dairy-products_1_w2kqqz.png`,
  },
  {
    id: 7,
    title: `POS SYSTEM`,
    text: `In addition to our ticketing and product sales features, we are pleased to offer a Point of Sale (POS) system upon request, and the best part is that it's completely free. Our POS system is designed to provide event organizers with a user-friendly and efficient way to manage on-site transactions during their events.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/w_100,h_100/v1687113132/ezt-frontend-client-assets/payment_xsnujv.png`,
  },
  {
    id: 8,
    title: `View and Print Tickets`,
    text: `View and print tickets directly from your dashboard with just a click of a button. Whether you're an admin or a buyer, you can easily access and reprint your ticket orders at any time.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683826439/ezt-frontend-client-assets/rocket_1_3_vzw0cm.png`,
  },
  {
    id: 9,
    title: `Upcoming Features`,
    text: `Our development team is constantly working on innovative features to make EazyTicks even better. Stay tuned for exciting updates, or request features you'd like to see.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/w_100,h_100/v1683826438/ezt-frontend-client-assets/rocket_1_6_dhaz3c.png`,
  },
  {
    id: 10,
    title: `24/7 Customer Support`,
    text: `Our customer success team is available 24/7 to provide support and answer any questions you may have. From basic inquiries to urgent issues, we're here to help you succeed with EazyTicks.`,
    image: `https://res.cloudinary.com/ddkdvh5ps/image/upload/w_100,h_100/v1684526009/ezt-frontend-client-assets/support_u2kkt0.png`,
  },
];
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

function featurePage() {
  return (
    <div className="features--template">
      <Banner />
      <div className="flex max-w-[1600px] justify-center gap-x-3 gap-y-14 mx-auto flex-wrap px-5 pb-8">
        {data?.map((item) => {
          return (
            <Fcard
              key={item?.id}
              title={item?.title}
              text={item?.text}
              image={item?.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default featurePage;
