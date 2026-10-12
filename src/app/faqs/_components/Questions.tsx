import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question:
      "Can I change, cancel, or get a refund for my tickets after an order is placed?",
    ans: (
      <>
        <div>
          <p>
            Since EazyTicks is a marketplace that lets fans of live events buy
            and sell tickets, we&apos;re unable to refund, cancel, or exchange
            tickets and we are not able to increase or decrease the amount of
            tickets ordered.
          </p>
          <p>
            The vendors that we list also have a general policy that all sales
            are final. If your event is canceled and not rescheduled, EazyTicks,
            in its sole discretion, will provide you with a full refund of the
            purchase price (refunded to the original payment method you used at
            checkout) or, subject to applicable state laws, issue you a credit
            for use on a future purchase
          </p>
        </div>
      </>
    ),
  },
  {
    id: 2,
    question:
      "How to Buy & Download your tickets from eazyticks.com in few step?",
    ans: (
      <div>
        <p>
          Please note for better user experience and tickets purchasing,
          Eazyticks required users to create an account with Eazyticks first.
        </p>
        <p>
          {" "}
          If you don&apos;t have an account with Eazyticks, please create one
          from <Link href="/account/signup">register page.</Link>
        </p>
        <p>
          You can also login/signup using google account.After login, you can
          search your event on eazyticks.com website, open the event you want to
          buy tickets for.
        </p>
        <p>
          On event detail page select &quot;Purchase Tickets&quot; to buy events
          tickets or select &quot;Buy Food & Drinks&quot; if you want to buy
          tickets for food & drinks.
        </p>
        <p>
          On event tickets page you can select number of tickets you want to buy
          and proceed to checkout. After successful checkout you will be
          redirected to the tickets page, you can view or download your tickets
          after selecting &quot;Print&quot; button.
        </p>
        <p>
          You can also view/download your tickets later following these steps
        </p>
        <ul>
          <li>
            Step 1: Login to your Eazyticks account from{" "}
            <Link href="/account/login">login page.</Link>
          </li>
          <li>
            Step 2: Navigate to tickets section from top menu after selecting
            &quot;Account&quot;
          </li>
          <li>
            Step 3: From tickets page view your tickets and download/ take
            screenshot or show directly at the event venue
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    question: "How to reset your account password?",
    ans: (
      <div>
        <p>
          Step 1: Go to{" "}
          <Link href="/account/forgetpassword">Forget Password</Link> page.
        </p>
        <p>
          Step 2: Enter your email address and click on “Send Reset Link”
          button.
        </p>
        <p>
          Step 3: Open your email address inbox and follow the reset password
          link. <br /> (NOTE: Please also check Spam folder if you don’t see any
          reset password email)
        </p>
      </div>
    ),
  },
  {
    id: 4,
    question: "When will I receive my tickets?",
    ans: (
      <div>
        <p>
          Although tickets can be delivered to your account instantly, there may
          be a period of time between your order confirmation and when you
          receive the tickets.
        </p>
        <p>
          {" "}
          You may not receive mobile transfer tickets until within 24 hours of
          the event due to delayed release policies that venues use to keep your
          tickets safe. Don&apos;t worry; as long as your order is confirmed,
          you will receive those tickets in time for the event.
        </p>
        <p>
          {" "}
          If you still haven&apos;t received your tickets within 24 hours of the
          event start, you can <Link href={"/contact-us"}>contact us</Link> and
          we&apos;ll help you out.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    question: "Can I trust the tickets sold on EazyTicks?",
    ans: (
      <div>
        <p>
          Absolutely! The tickets on EazyTicks are sold by licensed sellers,
          other EazyTicks customers, and sometimes the team&apos;s box office.
          All of the tickets sold on EazyTicks are backed by our Buyer
          Guarantee.{" "}
        </p>
        <p>
          {" "}
          If your event is canceled and not rescheduled, EazyTicks, in its sole
          discretion, will provide you with a full refund of the purchase price
          or, subject to applicable state laws, issue you a credit for use on a
          future purchase.{" "}
        </p>
        <p>
          {" "}
          If your tickets don&apos;t provide valid entry to your event or if a
          seller fails to deliver your tickets in time for an event, then we
          will work with you to make sure you receive the benefits of our Buyer
          Guarantee.
        </p>
        <p>
          {" "}
          This doesn&apos;t happen often but we want to make sure that
          you&apos;re covered if it does!
        </p>
      </div>
    ),
  },
  {
    id: 6,
    question: "What are the fees associated with ticket sales on EazyTicks?",
    ans: (
      <div>
        <p>
          At EazyTicks, we strive to provide transparency and flexibility in our
          ticketing services.{" "}
        </p>
        <p>
          {" "}
          We want to inform you that fees associated with ticket sales are
          subject to change based on the organizer and the specific event.{" "}
          <br /> We understand that each event is unique, and our fees may vary
          to accommodate different requirements and circumstances.{" "}
        </p>
        <p>
          {" "}
          Rest assured, we are committed to maintaining competitive pricing
          while offering the highest level of service to both organizers and
          attendees. <br /> If you have any questions or would like further
          clarification on our fee structure, please don&apos;t hesitate to
          reach out to our team.{" "}
        </p>{" "}
        We&apos;re here to support you every step of the way and ensure a
        seamless ticketing experience for your event. <br /> Thank you for
        choosing EazyTicks as your ticketing partner. We look forward to helping
        you make your event a success!
      </div>
    ),
  },
  {
    id: 7,
    question: "What happens if my check is not deposited within 60 days?",
    ans: (
      <div>
        <p>
          Any cheque that was mailed, picked, or delivered and not deposited
          within 60 days will be voided and not reissued!
        </p>
      </div>
    ),
  },
  {
    id: 8,
    question:
      "What is the return item policy for complimentary or gifted equipment from Eazy Ticks?",
    ans: (
      <div>
        <p>
        Organizations that receive complimentary or gifted equipment from
        Eazy Ticks, including POS machines, charging devices, iPads, Wi-Fi
        equipment, hotspots, or other related equipment, are permitted to use
        the equipment while actively utilizing the Eazy Ticks platform and
        services.
      </p>

      <p>
        If an organization discontinues use of Eazy Ticks, becomes inactive on
        the Eazy Ticks platform, or begins utilizing another ticketing or
        payment platform, all complimentary or gifted equipment provided by
        Eazy Ticks must be returned within two (2) calendar days.
      </p>

      <p>
        If the equipment is not returned within the two-day return period, the
        organization will be billed a late equipment fee of <strong>$100</strong>{" "}
        per item, per day, beginning on the third calendar day and continuing
        until all equipment is returned to Eazy Ticks.
      </p>

      <p>
        This policy applies to all complimentary or gifted Eazy Ticks equipment
        in the organization’s possession and is intended to ensure
        accountability for company-provided equipment.
      </p>
      </div>
    ),
  },
];

const Questions = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto mb-5 px-2 text-left">
        {questions?.map((item) => {
          return (
            <Accordion
              className="bg-white text-black md:px-2 px-1 rounded-sm mb-4 shadow border border-opacity-50"
              type="single"
              collapsible
              key={item?.id}
            >
              <AccordionItem
                value={`question-${item?.id}`}
                className="border-0 text-left md:p-2 p-1"
              >
                <AccordionTrigger className="lg:text-xl md:text-lg font-medium  text-left">
                  {item?.question}
                </AccordionTrigger>
                <AccordionContent className="md:text-lg text-sm rte">
                  {item?.ans}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
