"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? `ORD-${Date.now()}`;
  const org = searchParams.get("org") ?? "";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="osx-panel mx-auto w-full max-w-md rounded-[28px] border border-neutral-200/70 bg-white/70 px-8 py-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.14)] backdrop-blur-sm">
        {/* Animated check */}
        <div className="osx-fade osx-delay-1 relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
          <span className="osx-ring absolute inset-0 rounded-full bg-green-100" />
          <span className="osx-ring osx-ring-2 absolute inset-0 rounded-full bg-green-100" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-100 shadow-[0_8px_24px_-8px_rgba(40,199,111,0.35)]">
            <svg
              className="h-8 w-8"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="26"
                cy="26"
                r="24"
                stroke="#28C76F"
                strokeWidth="2.5"
                className="osx-draw-circle shop-check-circle"
              />
              <path
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                stroke="#28C76F"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="osx-draw-check shop-check-path"
              />
            </svg>
          </div>
        </div>

        <p className="osx-fade osx-delay-2 mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F45B2A]">
          Order confirmed
        </p>

        <h1 className="osx-fade osx-delay-2 mb-3 text-3xl font-bold tracking-tight text-foreground md:text-[2.25rem]">
          You&apos;re all set!
        </h1>

        <p className="osx-fade osx-delay-3 text-[15px] leading-relaxed text-muted-foreground">
          Thank you for your purchase. Your order has been submitted
          successfully.
        </p>

        {/* Order reference */}
        <div className="osx-fade osx-delay-4 mx-auto mt-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)]">
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Order Reference
            </p>
            <p className="mt-1.5 font-mono text-4xl font-bold tracking-tight text-[#F45B2A]">
              {ref}
            </p>

            {/* {org && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
                </svg>
                Organizer: {org}
              </div>
            )} */}
          </div>

          {/* Confirmation messaging */}
          <div className="flex items-start gap-2.5 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 text-left text-[13px] leading-relaxed text-muted-foreground">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F45B2A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>
              A confirmation email with your order details and receipt will be
              sent to your email address shortly.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="osx-fade osx-delay-5 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/shop/organizers"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F45B2A] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#e04d20] hover:shadow-md active:scale-[0.98] sm:w-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Continue Shopping
          </Link>
          {/* <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-neutral-50"
            onClick={() => window.print()}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Receipt
          </button> */}
        </div>

        {/* Back home */}
        <div className="osx-fade osx-delay-6 mt-7">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to EazyTicks Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        .osx-panel {
          animation: osx-panel-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .osx-fade {
          opacity: 0;
          animation: osx-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .osx-delay-1 { animation-delay: 0.08s; }
        .osx-delay-2 { animation-delay: 0.18s; }
        .osx-delay-3 { animation-delay: 0.26s; }
        .osx-delay-4 { animation-delay: 0.34s; }
        .osx-delay-5 { animation-delay: 0.44s; }
        .osx-delay-6 { animation-delay: 0.52s; }

        .osx-draw-circle {
          stroke-dasharray: 158;
          stroke-dashoffset: 158;
          animation: osx-draw 0.6s ease-out 0.15s forwards;
        }

        .osx-draw-check {
          stroke-dasharray: 34;
          stroke-dashoffset: 34;
          animation: osx-draw 0.35s ease-out 0.55s forwards;
        }

        .osx-ring {
          animation: osx-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.8s;
        }

        .osx-ring-2 {
          animation-delay: 1.9s;
        }

        @keyframes osx-panel-in {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes osx-fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes osx-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes osx-ping {
          0% {
            opacity: 0.45;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.9);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .osx-panel,
          .osx-fade,
          .osx-draw-circle,
          .osx-draw-check,
          .osx-ring {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

import ShopNav from "../_components/ShopNav";

export default function OrderSuccessPage() {
  return (
    <>
      <ShopNav />
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-3 border-[#F45B2A] border-t-transparent shop-spinner" />
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </>
  );
}
