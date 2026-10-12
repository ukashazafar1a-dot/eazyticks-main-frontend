import React from 'react'
import SellTicketsOnline from './_components/SellTicketsOnline'

const description = `Sell tickets online with EZticks — the fastest way to create events, manage registrations, track ticket sales, and receive secure payouts. Start your event in minutes and grow your audience effortlessly.`

export const metadata = {
  title: `Sell Tickets Online | Create & Manage Events Easily on Eazyticks`,
  description,
  alternates: {
    canonical: "/sell-tickets-online",
  },
  openGraph: {
    title: `Sell Tickets Online | Create & Manage Events Easily on Eazyticks`,
    description,
    url: "/sell-tickets-online",
  },
  twitter: {
    title: `Sell Tickets Online | Create & Manage Events Easily on Eazyticks`,
    description
  },
};


const page = () => {
  return <SellTicketsOnline />
}

export default page