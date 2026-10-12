"use client";
import React, { useEffect, useState } from "react";
import CardFooter from "./CardFooter";
import ShopItem from "./ShopItem";

interface FunctionProps {
  products: any;
  type: any;
}

function ShopItems({ products, type }: FunctionProps) {
  const [tickets, setTickets] = useState<Array<any>>([]);

  useEffect(() => {
    setTickets(products);
  }, [products]);

  return (
    <div className="card">
      <div className="body">
        {tickets &&
          tickets?.map((item: any, i: any) => {
            return <ShopItem key={i} item={item} />;
          })}
      </div>
      <CardFooter />
    </div>
  );
}

export default ShopItems;
