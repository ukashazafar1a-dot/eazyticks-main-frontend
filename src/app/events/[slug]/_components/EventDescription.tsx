"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import parse from "html-react-parser";
type props = {
  description?: string | null;
};
const EventDescription = ({ description }: props) => {
  if (!description) return;
  return (
    <Accordion
      type="single"
      className="mb-3  border p-3 rounded"
      collapsible
      defaultValue="description"
    >
      <AccordionItem value="description" className="border-0">
        <AccordionTrigger className="p-0 text-lg font-bold">
          Event Description
        </AccordionTrigger>
        <AccordionContent className="py-3">
          <div className="prose max-w-full">{parse(description)}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EventDescription;
