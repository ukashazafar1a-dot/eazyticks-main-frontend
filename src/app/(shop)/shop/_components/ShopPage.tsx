"use client";

import React, { useState } from "react";
import Hero from "./Hero";
import Organizers from "./Organizers";
import { Organizer } from "@/lib/shopTypes";

import ShopNav from "./ShopNav";

interface ShopPageProps {
  organizers: {
    data?: {
      items?: Organizer[];
    };
  };
}

const ShopPage = ({ organizers }: ShopPageProps) => {
  const items = organizers?.data?.items ?? [];
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Hero searchValue={searchQuery} onSearchChange={setSearchQuery} />
      <ShopNav />
      <Organizers data={items} searchQuery={searchQuery} />
    </div>
  );
};

export default ShopPage;
