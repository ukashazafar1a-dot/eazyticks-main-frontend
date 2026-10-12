import React from "react";
import IndexThankYou from "./_components/IndexThankYou";

const title = `Thank You for Your Purchase! | Eazyticks`;
const description = `Thank you for completing your transaction on Eazyticks! We appreciate your support. Sit back, relax, and get ready to enjoy the upcoming event. Your ticket(s) are confirmed and will be sent to your email shortly. For any inquiries or assistance, feel free to contact our friendly customer support team. Thank you again for choosing Eazyticks!`;
const url = "/checkout/thank-you";

export const runtime = 'edge';
export const revalidate = 0;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props) {
  //console.log({ params, searchParams });
  let queryParams = searchParams ? searchParams : {};
  const queryString = new URLSearchParams(queryParams as any).toString();
  const fullUrl = `${url}?${queryString}`;
  //console.log("fullUrl", fullUrl);
  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
    },
    twitter: {
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
    },
  }
}

const page = () => {
  return <IndexThankYou />;
};

export default page;
