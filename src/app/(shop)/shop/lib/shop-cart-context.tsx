"use client";

/**
 * ShopCartContext — React context that wraps the organizer-scoped
 * localStorage cart service. Provides reactive state + helpers to all
 * shop components.
 *
 * The context is scoped to a single organizer at a time (set via
 * `setActiveOrganizer`). Switching organizers swaps the in-memory
 * items but does NOT lose data — everything is persisted in
 * localStorage under `shop_cart_{organizerCode}`.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  addItemToCart,
  clearCart,
  getCartItemCount,
  getCartTotal,
  loadCart,
  pruneExpiredCarts,
  removeItemFromCart,
  saveCart,
  updateItemQuantity as updateQty,
  getMostRecentCartCode,
  type ShopCartItem,
} from "./cart-storage";
import type { CheckoutModifierPayload } from "./types";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */

interface CartState {
  organizerCode: string;
  items: ShopCartItem[];
}

type CartAction =
  | { type: "SET_ORG"; orgCode: string; items: ShopCartItem[] }
  | { type: "SET_ITEMS"; items: ShopCartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ORG":
      return { organizerCode: action.orgCode, items: action.items };
    case "SET_ITEMS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context value                                                      */
/* ------------------------------------------------------------------ */

interface ShopCartContextValue {
  organizerCode: string;
  items: ShopCartItem[];
  totalItems: number;
  cartTotal: number;
  isEmpty: boolean;
  isHydrated: boolean;
  setActiveOrganizer: (code: string) => void;
  addItem: (item: Omit<ShopCartItem, "quantity">, qty?: number) => void;
  updateQuantity: (lineId: string, qty: number) => void;
  removeItem: (lineId: string) => void;
  emptyCart: () => void;
}

const ShopCartContext = createContext<ShopCartContextValue | undefined>(
  undefined
);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    organizerCode: "",
    items: [],
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Cleanup expired carts and load most recent cart on mount
  useEffect(() => {
    let isMounted = true;

    const initializeCart = () => {
      pruneExpiredCarts();

      // Auto-load most recent cart if available so it persists globally
      const recentCode = getMostRecentCartCode();
      if (!recentCode) {
        if (isMounted) {
          setIsHydrated(true);
        }
        return;
      }

      const cart = loadCart(recentCode);
      if (isMounted) {
        dispatch({
          type: "SET_ORG",
          orgCode: recentCode,
          items: cart?.items ?? [],
        });
        setIsHydrated(true);
      }
    };

    initializeCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const setActiveOrganizer = useCallback((code: string) => {
    const cart = loadCart(code);
    dispatch({ type: "SET_ORG", orgCode: code, items: cart?.items ?? [] });
  }, []);

  const addItem = useCallback(
    (item: Omit<ShopCartItem, "quantity">, qty: number = 1) => {
      const orgCode = state.organizerCode || item.organizerCode;
      if (!orgCode) return;
      const newItems = addItemToCart(
        orgCode,
        { ...item, quantity: qty } as ShopCartItem,
        qty
      );
      // Re-read from storage to guarantee consistency and activate
      const cart = loadCart(orgCode);
      dispatch({
        type: "SET_ORG",
        orgCode,
        items: cart?.items ?? newItems,
      });
    },
    [state.organizerCode]
  );

  const updateQuantity = useCallback(
    (lineId: string, qty: number) => {
      if (!state.organizerCode) return;
      const newItems = updateQty(state.organizerCode, lineId, qty);
      dispatch({ type: "SET_ITEMS", items: newItems });
    },
    [state.organizerCode]
  );

  const removeItem = useCallback(
    (lineId: string) => {
      if (!state.organizerCode) return;
      const newItems = removeItemFromCart(state.organizerCode, lineId);
      dispatch({ type: "SET_ITEMS", items: newItems });
    },
    [state.organizerCode]
  );

  const emptyCart = useCallback(() => {
    if (!state.organizerCode) return;
    clearCart(state.organizerCode);
    dispatch({ type: "SET_ITEMS", items: [] });
  }, [state.organizerCode]);

  const totalItems = useMemo(
    () => getCartItemCount(state.items),
    [state.items]
  );
  const cartTotal = useMemo(() => getCartTotal(state.items), [state.items]);

  const value: ShopCartContextValue = useMemo(
    () => ({
      organizerCode: state.organizerCode,
      items: state.items,
      totalItems,
      cartTotal,
      isEmpty: state.items.length === 0,
      isHydrated,
      setActiveOrganizer,
      addItem,
      updateQuantity,
      removeItem,
      emptyCart,
    }),
    [
      state.organizerCode,
      state.items,
      totalItems,
      cartTotal,
      isHydrated,
      setActiveOrganizer,
      addItem,
      updateQuantity,
      removeItem,
      emptyCart,
    ]
  );

  return (
    <ShopCartContext.Provider value={value}>
      {children}
    </ShopCartContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useShopCart(): ShopCartContextValue {
  const ctx = useContext(ShopCartContext);
  if (!ctx) {
    throw new Error("useShopCart must be used within a ShopCartProvider");
  }
  return ctx;
}
