"use client";
import * as React from "react";
import { Switch } from "@/components/ui/switch";

interface Provider {
  isChecked?: boolean;
  isUpdating?: boolean;
  handleChange?: any;
}

const OnOffSwitch = ({ isChecked, isUpdating, handleChange }: Provider) => {
  return (
    <div
      className={`flex items-center space-x-2 relative ${
        isUpdating ? "small--loader" : ""
      }`}
    >
      <Switch
        id="airplane-mode"
        onChange={handleChange}
        checked={isChecked}
        onCheckedChange={handleChange}
      />
    </div>
  );
};
export default OnOffSwitch;
