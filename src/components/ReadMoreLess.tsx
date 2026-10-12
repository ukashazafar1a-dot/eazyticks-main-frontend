"use client";
import React, { useState, useMemo } from "react";

type props = {
  text: string;
  maxLength?: number;
  readMoreLabel?: string;
  readLessLabel?: string;
  className?: string;
  buttonClassName?: string;
};

const ReadMoreLess = ({
  text,
  maxLength = 100,
  readMoreLabel = "Read more",
  readLessLabel = "Read less",
  className = "",
  buttonClassName = "",
}: props) => {
  const [expanded, setExpanded] = useState(false);

  const safeText = useMemo(() => {
    if (typeof text !== "string") {
      console.error("ReadMoreLess: 'text' prop must be a string.");
      return "";
    }
    return text.trim();
  }, [text]);

  const isTruncated = safeText?.length > maxLength;

  const displayText = useMemo(() => {
    if (!isTruncated) return safeText;
    if (expanded) return safeText;
    return safeText.slice(0, maxLength).trim() + "...";
  }, [safeText, expanded, maxLength, isTruncated]);

  const toggle = () => setExpanded((prev) => !prev);

  if (!safeText) return null;

  return (
    <div className={`inline ${className}`}>
      <span className="text-xs text-gray-600">{displayText}</span>

      {isTruncated && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          className={`ml-1 text-xs text-primary hover:underline font-medium transition ${buttonClassName}`}
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      )}
    </div>
  );
};

export default ReadMoreLess;
