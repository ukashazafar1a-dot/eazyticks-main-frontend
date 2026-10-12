"use client";
import { calculateFees, formatPrice } from "@/helpers/generals";
import React from "react";
import { useCart } from "react-use-cart";

const MiniCartDetail = ({ billType, fee }: any) => {
  const { items, cartTotal } = useCart();
  return (
    <div className="mini-cart-details">
      <div className="mini-cart-header">Your Tickets</div>
      <div className="st-cart-items">
        {items &&
          items?.map((item) => {
            return (
              <div className="cart--item-list" key={item?.id}>
                <p className="m-0 cart-item-title">{item?.name}</p>
                <div className="cart-item-actions">
                  <span>{formatPrice(item?.price)}</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="cart--total-in">
        <div className="tickets-card-item-price-container">
          <div className="cart--item-list">
            <span>Estimated Price</span>
            <span style={{ marginLeft: "0.8rem" }}>
              {formatPrice(cartTotal)}/-
            </span>
          </div>
          {billType && fee !== 0 && (
            <div className="cart--item-list" style={{ fontSize: "14px" }}>
              <span>Processing Fees</span>
              <span style={{ marginLeft: "0.8rem" }}>
                $ {calculateFees(items, fee).toFixed(2)}/-
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCartDetail;
