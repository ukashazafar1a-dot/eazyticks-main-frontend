'use client';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import Link from 'next/link';
import useApp from '@/context/useApp';
import EmptyTickets from './EmptyTickets';
import Tickets from './Tickets';
import ShopItems from './ShopItems';
import Deals from './Deals';
import { hasExtraFields } from '@/helpers/generals';
import PageError from '@/components/PageError';
import Banner from './Banner';
import Steps from './Steps';
import Totals from './Totals';
import StickyTotals from './StickyTotals';
import RefundPolicyModal from './RefundPolicyModal';
import SectionLoader from '@/components/SectionLoader';
import './style.css';
import '@/assets/eleven.css';
import '@/assets/ngo.css';
import '@/assets/zulu.css';
import '@/assets/jearly.css';
import '@/assets/new.css';
import { HybridEvent, Ticket } from '@/lib/types';
import useHybridEvent from '@/hooks/useHybridEvent';
import LayoutAction from '@/app/events/[slug]/layout/_components/layoutAction';
import StripeContainer from '../bookTicket/Stripe/StripeContainer';
import ExtraFields from './ExtraFields';
import CardFooter from './CardFooter';
import SeatingAction from '@/app/events/[slug]/booking/_components/SeatingAction';
import NoSeatingPlan from './NoSeatingPlan';
import { baseURL, returnSteps } from '@/lib/utils';
import EventCalenders from '../Calender/EventCalenders';
import ErrorBoundary from '@/components/ErrorBoundry';
import CalenderFallback from '../Calender/CalenderFallback';
import LayoutTicketType from '../Layout/LayoutTicketType';
import LayoutTicketTypeJearly from '../Layout/LayoutTicketTypeJearly';
import AusPart from '../Layout/AusPart';
import NewPart from '../Layout/NewPart';
import 'react-phone-number-input/style.css';

const FranklinLayout = dynamic(() => import('../Layout/FranklinLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const SULayout = dynamic(() => import('../Layout/SULayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const SuParkLayout = dynamic(() => import('../Layout/SuParkLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const NGOLayout = dynamic(() => import('../Layout/NGOLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const NGOLayout02 = dynamic(() => import('../Layout/NGOLayout02'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const ZULULayout01 = dynamic(() => import('../Layout/ZULULayout01'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const PolarisLayout = dynamic(() => import('../Layout/PolarisLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const JearlyLayout = dynamic(() => import('../Layout/JearlyLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const LogansLayout = dynamic(() => import('../Layout/LogansLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const AsuLayout = dynamic(() => import('../Layout/AsuLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const NewLayout = dynamic(() => import('../Layout/NewLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const NineCasino = dynamic(() => import('../Layout/NineCasino'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const GalleryFourten = dynamic(() => import('../Layout/GalleryFourten'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const KappaOneLayout = dynamic(() => import('../Layout/KappaOneLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const BWineBarLayout = dynamic(() => import('../Layout/BWineBarLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const AlumniLayout = dynamic(() => import('../Layout/AlumniLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const Alumni2Layout = dynamic(() => import('../Layout/Alumni2Layout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const Alumni3Layout = dynamic(() => import('../Layout/Alumni3Layout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const Ice1Layout = dynamic(() => import('../Layout/Ice1Layout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const Logans1Layout = dynamic(() => import('../Layout/Logans1Layout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const SnlLayout = dynamic(() => import('../Layout/SnlLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const BrunchLayout = dynamic(() => import('../Layout/BrunchLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const Layoutannual = dynamic(() => import('../Layout/Layoutannual'), {
  loading: () => <SectionLoader />,
  ssr: false,
});
const FshsLayout = dynamic(() => import('../Layout/FshsLayout'), {
  loading: () => <SectionLoader />,
  ssr: false,
});

type props = {
  content: HybridEvent | null;
};

const hasNoTickets = (tickets: Ticket[]) => !tickets || tickets.length <= 0;

const hasNoNormalTickets = (normalTickets: any) => {
  return (
    !normalTickets ||
    (hasNoTickets(normalTickets.tickets) &&
      hasNoTickets(normalTickets.parkings) &&
      hasNoTickets(normalTickets.eventShopItems))
  );
};

const IndexBookTicket = ({ content }: props) => {
  const params = useParams();
  const { items, emptyCart } = useCart();
  const { step, stage, changeStage, changeStep } = useHybridEvent();
  const {
    placeHybridOrder,
    setToaster,
    clientSecret,
    orderPlaced,
    orderFailed,
    setClientSecret,
    setOrderPlaced,
  } = useApp();
  const [event, setEvent] = useState<HybridEvent | null>(null);
  const [openmodel, setOpenmodel] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [extraFields, setExtraFields] = useState<any>(null);
  const searchParams = useSearchParams();
  const [trigger, setTrigger] = useState(false);
  const slug = params?.slug;
  const secret = searchParams?.get('sec') || '';

  const getNewData = async () => {
    try {
      setLoading(true);
      const result: any = await fetch(
        `${baseURL}/Event/Hybrid/tickets?slug=${slug}&secret=${secret}`,
      );
      if (!result?.ok) {
        return null;
      }
      const response = await result?.json();
      //console.log(response);
      if (response && response?.succeeded) {
        const { data } = response;
        if (data) {
          setEvent(data);
          setIsLoading(false);
          setClientSecret(undefined);
          setExtraFields(null);
          setOrderPlaced(false);
          setLoading(false);
          if (content?.layoutTickets && content?.layoutTickets?.length > 0) {
            changeStep('layout');
          }
          changeStage('tickets');
          emptyCart();
        } else {
          setIsError(true);
          setIsLoading(false);
          setLoading(false);
        }
      } else {
        setIsError(true);
        setIsLoading(false);
        setLoading(false);
      }
      setReloadPage(!reloadPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const renderCards = () => {
    if (!event) return;
    const { layoutTickets, normalTickets, templateId } = event;
    if (hasNoTickets(layoutTickets) && hasNoNormalTickets(normalTickets)) {
      return <EmptyTickets />;
    }
    // console.log("layoutTickets", layoutTickets);
    const renderLayoutByTemplateId = () => {
      switch (templateId) {
        case 'default':
          return <NoSeatingPlan />;
        case 'aus':
          return (
            <>
              {/* <LayoutTicketType /> */}
              <NewLayout tickets={layoutTickets} type="layout">
                <NewPart />
              </NewLayout>
            </>
          );
        case 'eleven':
          return (
            <>
              <LayoutTicketType />
              <LayoutAction tickets={layoutTickets} type="layout" />
            </>
          );
        case 'plaquimine':
          return <SeatingAction distributions={layoutTickets} />;
        case 'southern':
          return <NoSeatingPlan />;
        case 'franklin':
          return (
            <>
              <LayoutTicketType />
              <FranklinLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'brunch':
          return (
            <>
              <LayoutTicketType />
              <BrunchLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'su':
          return (
            <>
              <LayoutTicketType />
              <SULayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'snl':
          return (
            <>
              <LayoutTicketType />
              <SnlLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'suparking':
          return (
            <>
              <LayoutTicketType />
              <SuParkLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'ngo':
          return (
            <>
              <LayoutTicketType />
              <NGOLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'ngo-02':
          return (
            <>
              <LayoutTicketType />
              <NGOLayout02 tickets={layoutTickets} type="layout" />
            </>
          );
        case 'zulu-layout':
          return (
            <>
              <LayoutTicketType />
              <ZULULayout01 tickets={layoutTickets} type="layout" />
            </>
          );
        case 'polaris':
          return (
            <>
              <LayoutTicketType />
              <PolarisLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'annual':
          return (
            <>
              <LayoutTicketType />
              <Layoutannual tickets={layoutTickets} type="layout" />
            </>
          );
        case 'jearly-layout':
          return (
            <>
              <LayoutTicketTypeJearly />
              <JearlyLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'logans':
          return (
            <>
              <LayoutTicketType />
              <LogansLayout
                tickets={layoutTickets}
                type="layout"
                changeStep={changeStep}
              />
            </>
          );
        case 'logans1':
          return (
            <>
              <LayoutTicketType />
              <Logans1Layout tickets={layoutTickets} type="layout" />
            </>
          );
        case '9-casino':
          return (
            <>
              <LayoutTicketType />
              <NineCasino tickets={layoutTickets} type="layout" />
            </>
          );
        case 'gallery-14':
          return (
            <>
              <LayoutTicketType />
              <GalleryFourten tickets={layoutTickets} type="layout" />
            </>
          );
        case 'kappa-1':
          return (
            <>
              <LayoutTicketType />
              <KappaOneLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'BWineBar':
          return (
            <>
              <LayoutTicketType />
              <BWineBarLayout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'AlumniT':
          return (
            <>
              <LayoutTicketType />
              <Alumni3Layout tickets={layoutTickets} type="layout" />
              {/* <Ice1Layout tickets={layoutTickets} type="layout" /> */}
            </>
          );
        case 'ICE-1':
          return (
            <>
              <LayoutTicketType />
              <Ice1Layout tickets={layoutTickets} type="layout" />
            </>
          );
        case 'FSHS':
          return (
            <>
              <LayoutTicketType />
              <FshsLayout tickets={layoutTickets} type="layout" />
            </>
          );
        default:
          return (
            <>
              <NoSeatingPlan />
            </>
          );
      }
    };
    const renderLayoutParkingByTemplateId = () => {
      switch (templateId) {
        case 'default':
          return <NoSeatingPlan />;
        case 'aus':
          return (
            <>
              {/* <LayoutTicketType /> */}
              <AsuLayout tickets={normalTickets?.parkings} type="layout">
                <AusPart />
              </AsuLayout>
            </>
          );
        default:
          return <NoSeatingPlan />;
      }
    };
    switch (step) {
      case 'layout':
        return renderLayoutByTemplateId();
      case 'tickets':
        return (
          <Tickets
            items={normalTickets?.tickets}
            type="tickets"
            soldOut={event?.showSoldOut}
            event={event}
          />
        );
      // return <Deals/>
      case 'parking':
        if (templateId && templateId === 'aus') {
          return renderLayoutParkingByTemplateId();
        }
        return (
          <Tickets
            items={normalTickets?.parkings}
            type="parkings"
            event={event}
          />
        );
      case 'shop':
        return (
          <ShopItems products={normalTickets?.eventShopItems} type="shops" />
        );
      case 'deals':
        return <Deals />;
      default:
        return <p></p>;
    }
  };

  function renderStages() {
    switch (stage) {
      case 'tickets':
        return (
          <div className="st-first basis-full md:basis-[66%] md:pe-4 pe-0 w-full">
            {renderCards()}
            {event?.layoutTickets &&
            hasNoTickets(event?.layoutTickets) &&
            hasNoNormalTickets(event?.normalTickets) ? (
              <></>
            ) : (
              <CardFooter event={event} changeStep={changeStep} step={step} />
            )}
          </div>
        );
      case 'extraFields':
        return (
          <div className="st-first basis-full md:basis-[66%] px-0 md:px-4 ">
            <ExtraFields
              onStageChange={changeStage}
              setFields={setExtraFields}
              shouldMount={trigger}
            />
          </div>
        );
      case 'checkout':
        if (!clientSecret) return;
        return (
          <div className="st-first basis-full md:basis-[66%] sm:px-4 p-0">
            <StripeContainer
              setActiveStage={changeStage}
              slug={slug}
              onCancelChange={() => changeStage('cancel')}
              onComplete={() => changeStage('success')}
            />
          </div>
        );
      case 'success':
        return (
          <div className="st-first basis-full mx-auto text-center px-4 py-12 max-w-screen-lg">
            <h2 className="mb-3">Order placed successfully!</h2>
            <h4 className="text-lg text-primary font-medium">
              Thank You For Choosing EazyTicks
            </h4>
            <div className="rte">{`Your ticket purchase was successful. A copy of your tickets has been sent to your email as an attachment. 
    You can also view and download your tickets directly on the next page.`}</div>
          </div>
        );
      case 'failed':
        return (
          <div className="st-first basis-full px-4 info-message mx-auto text-center max-w-screen-lg">
            <h2 className="mb-3">Something went wrong!</h2>
            <p className="mb-3">
              Something went wrong, If the issue persists, please reach out to
              our{' '}
              <Link className="heighlighted" href={'/contact-us'}>
                support team
              </Link>{' '}
              for assistance.
            </p>
            <Link
              href={'/events/' + slug}
              className="btn mx-auto"
              style={{ width: '15rem' }}
            >
              Event Details
            </Link>
          </div>
        );
      case 'cancel':
        return (
          <div className="st-first basis-full max-w-screen-lg px-4 info-message mx-auto text-center">
            <div className="p-3 order-message text-center">
              <h2 className="mb-3">Order Canceled Successfully.</h2>
              <div className="rte">{`Your order has been successfully canceled. We're sorry to see you go! If you have any questions or change your mind, feel free to reach out to us.`}</div>
            </div>
          </div>
        );
      default:
        return '';
    }
  }

  const handleProceed = () => {
    //console.log(activeStage, hasExtraFields(items), items);
    if (stage === 'tickets' && hasExtraFields(items)) {
      changeStage('extraFields');
    } else if (stage === 'tickets' && !hasExtraFields(items)) {
      setOpenmodel(true);
    } else if (stage === 'extraFields' && extraFields) {
      setOpenmodel(true);
    } else if (hasExtraFields(items) && !extraFields) {
      //console.log('is this here',extraFields);
      var form: any = document.getElementById('extrafields-form');
      if (form) {
        if (form?.checkValidity()) {
          setTrigger(true);
          return;
        } else {
          form?.reportValidity();
          setTrigger(false);
          return;
        }
      }
      return;
    }
  };

  const handlePlaceOrder = async (user: any) => {
    try {
      setIsProceeding(true);
      const object = {
        ...user,
        eventId: event?.id,
      };
      //console.log(object)
      //console.log(event, extraFields);
      const response: any = await placeHybridOrder(object, extraFields?.fields);
      //console.log(response);
      if (response && response?.succeeded) {
        // setToaster(
        //   "success",
        //   response?.messages[0] ||
        //     "Order place successfully. Please pay you amount"
        // );
      } else {
        setReloadPage(!reloadPage);
        setToaster(
          'error',
          response?.messages[0] ||
            'Sorry some item(s) are out of stock. Please refill with updated items!',
        );
      }
      setIsProceeding(false);
    } catch (error) {
      setIsProceeding(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      changeStage('checkout');
    }
  }, [clientSecret]);

  useEffect(() => {
    if (extraFields) {
      setOpenmodel(true);
    }
  }, [extraFields]);

  useEffect(() => {
    if (orderPlaced) changeStage('success');
  }, [orderPlaced]);

  useEffect(() => {
    if (orderFailed) changeStage('failed');
  }, [orderFailed]);

  useEffect(() => {
    if (reloadPage) {
      getNewData();
    }
  }, [reloadPage]);

  useEffect(() => {
    if (content) {
      setEvent(content);
      setIsLoading(false);
      setClientSecret(undefined);
      setExtraFields(null);
      setOrderPlaced(false);
      if (content?.layoutTickets && content?.layoutTickets?.length > 0) {
        changeStep('layout');
      } else {
        const totalSteps = returnSteps(content);
        if (totalSteps) {
          changeStep(totalSteps[0]);
        } else {
          changeStep('tickets');
        }
      }
      changeStage('tickets');
      emptyCart();
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, [content]);

  useEffect(() => {
    emptyCart();
  }, []);

  if (isLoading) return <SectionLoader />;
  if (isError || !event) return <PageError error={content} />;
  //console.log(content);
  return (
    <div
      className="template--hybrid"
      data-slug={event?.id}
      data-layout={event?.templateId}
    >
      <style jsx global>{`
        :root {
          --event-primary-color: ${event?.customSettings?.eventDetail
            .backgroundColor || 'var(--colorThemePrimary)'};
          --event-primary-text-color: ${event?.customSettings?.eventDetail
            .textColor || 'white'};
          --checkout-dist-color: ${event?.customSettings?.checkout?.distBgClr ||
          'var(--colorThemePrimary)'};
        }
      `}</style>
      <Banner event={event} />
      {event?.calendar && (
        <ErrorBoundary
          fallback={<CalenderFallback calendar={event?.calendar} />}
        >
          <div className="container px-3 py-3">
            <EventCalenders data={event?.calendar} slug={slug as string} />
          </div>
        </ErrorBoundary>
      )}
      <div
        className={`max-w-screen-xl mx-auto event-${event ? event?.id : ''}`}
      >
        <div className={`relative ${loading ? 'small--loader' : ''}`}>
          {stage === 'tickets' && (
            <div className="steps-container py-4">
              <Steps event={event} activeStep={step} changeStep={changeStep} />
            </div>
          )}
          <div className="flex flex-wrap px-4 py-8 relative gap-3 md:gap-0 ">
            {renderStages()}
            {(stage === 'tickets' ||
              stage === 'checkout' ||
              stage === 'extraFields') && (
              <div className="rounded-lg overflow-hidden border border-1 flex-grow  bg-[#f4f4f4] h-full sticky top-0  basis-full md:basis-[34%]">
                <Totals
                  open={openmodel}
                  closemodel={setOpenmodel}
                  handleProceed={handleProceed}
                  isProceeding={isProceeding}
                  stage={stage}
                  event={event}
                />
              </div>
            )}
          </div>
          <div className="sticky-totals">
            <StickyTotals
              open={openmodel}
              closemodel={setOpenmodel}
              handleProceed={handleProceed}
              isProceeding={isProceeding}
              stage={stage}
              fee={event?.fee}
            />
          </div>
          <RefundPolicyModal
            handlePlaceOrder={handlePlaceOrder}
            open={openmodel}
            closemodel={setOpenmodel}
          />
        </div>
      </div>
      {event && (
        <script
          type="application/json"
          id="event-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(event),
          }}
        />
      )}
    </div>
  );
};

export default IndexBookTicket;
