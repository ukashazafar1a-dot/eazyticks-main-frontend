"use client";
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";

interface Provider {
  handleLocationChange: any;
  location: any;
}

function SearchLocation({ handleLocationChange, location }: Provider) {
  const { setPreciseLocation } = useTheme();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetLocation = () => {
    setPreciseLocation();
    handleClose();
  };

  const handleOnClick = () => {
    setTimeout(() => {
      setShow(true)
    }, 1000);
  }

  return (
    <div className="flex items-center justify-start gap-2 relative">
      <h2 className="sm-max:text-3xl sm-max:whitespace-nowrap">Popular in</h2>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="input--field border-0 border-b w-fit"
        placeholder="Search for location"
        value={location}
        onChange={(e: any) => handleLocationChange(e.target.value)}
      />
      <DropdownMenu open={show} onOpenChange={(value) => setShow(value)} modal={show}>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div
              onClick={handleSetLocation}
              className="flex items-center justify-start gap-2"
            >
              <IoLocationSharp />
              <span> Use my pricise location</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SearchLocation;
