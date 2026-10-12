import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FunctionProps {
  children: any;
  title: any;
}


const GenralTooltip = ({ title, children }: FunctionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger> {children}</TooltipTrigger>
        <TooltipContent>{title} </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GenralTooltip;
