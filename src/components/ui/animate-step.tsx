import * as React from "react";

import { cn } from "@/lib/utils";

const AnimateSteps = React.forwardRef<
HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
));
AnimateSteps.displayName = "AnimateSteps";
interface AnimateStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number; // Add the custom step property
}
const AnimateWrapper = React.forwardRef<HTMLDivElement, AnimateStepProps>(
  ({ className, style, step, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex transition-transform duration-500 ease-in-out",
        className
      )}
      style={{
        transform: `translateX(-${step * 100}%)`,
        ...style,
      }}
      {...props}
    />
  )
);
AnimateWrapper.displayName = "AnimateWrapper";

const AnimateStep = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-shrink-0 w-full", className)} {...props} />
));
AnimateStep.displayName = "AnimateStep";

export { AnimateSteps, AnimateStep,AnimateWrapper };
